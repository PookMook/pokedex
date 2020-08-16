import { NextApiRequest, NextApiResponse } from "next";
import { stringify } from "graph-object-notation";
import data from "~/data/pokemons.json";

// in m
type Height = string;

// in kg
type Weight = string;
type Type = {
  name: string;
};
type Attack = {
  name: string;
  type: Type;
  damage: number;
};
type Pokemon = {
  id: number;
  name: string;
  classification: string;
  types: Type[];
  resistant: Type[];
  weaknesses: Type[];
  weight: {
    minimum: Weight;
    maximum: Weight;
  };
  height: {
    minimum: Height;
    maximum: Height;
  };
  fleeRate: number;
  evolutionRequirements?: {
    amount: number;
    name: string;
  };
  previousEvolutions: Pokemon[];
  evolutions: Pokemon[];
  maxCP: number;
  maxHP: number;
  attacks: {
    fast: Attack[];
    special: Attack[];
  };
};

// Create types
const typesPerType = {};

data.forEach((p) => {
  p.types.forEach((t) => {
    typesPerType[t] = { name: t };
  });
});

const types: Type[] = Object.values(typesPerType);

// Create attacks
let attacksPerName = {
  // Tackle : {name:"Tackle", type: types.Normal, damage:12 }
};

data.forEach((p) => {
  p.attacks.fast.forEach((f) => {
    attacksPerName[f.name] = { ...f, type: typesPerType[f.type] };
  });
  p.attacks.special.forEach((s) => {
    attacksPerName[s.name] = { ...s, type: typesPerType[s.type] };
  });
});
const attacks: Attack[] = Object.values(attacksPerName);

// Create pokemons
let pokemonsPerName = {};
let pokemonsPerId = {};
// Bulbasaur : {...Pokemon}

data.forEach((p) => {
  pokemonsPerName[p.name] = {
    id: Number(p.id),
    name: p.name,
    classification: p.classification,
    types: p.types.map((t) => typesPerType[t]),
    resistant: p.resistant.map((t) => typesPerType[t]),
    weaknesses: p.weaknesses.map((t) => typesPerType[t]),
    weight: {
      minimum: p.weight.minimum,
      maximum: p.weight.maximum,
    },
    height: {
      minimum: p.height.minimum,
      maximum: p.height.maximum,
    },
    fleeRate: p.fleeRate,
    evolutionRequirements: p.evolutionRequirements
      ? {
          amount: p.evolutionRequirements.amount,
          name: p.evolutionRequirements.name,
        }
      : undefined,
    previousEvolutions: [],
    evolutions: [],
    maxCP: p.maxCP,
    maxHP: p.maxHP,
    attacks: {
      fast: p.attacks.fast.map((f) => attacksPerName[f.name]),
      special: p.attacks.special.map((s) => attacksPerName[s.name]),
    },
  };
  pokemonsPerId[Number(p.id)] = pokemonsPerName[p.name];
});
const pokemons: Pokemon[] = Object.values(pokemonsPerId);

data.forEach((p) => {
  pokemonsPerName[p.name]["evolutions"] = p.evolutions?.map(
    (e) => pokemonsPerName[e.name]
  );
  pokemonsPerName[p.name]["previousEvolutions"] = p[
    "Previous evolution(s)"
  ]?.map((e) => pokemonsPerName[e.name]);
});

export default function Gon(req: NextApiRequest, res: NextApiResponse) {
  // This will crash cause of the circular structure
  // return res.json(pokemons)
  // import GON.stringify and send GON string out
  return res.send(
    stringify(
      {
        pokemons,
        types,
        attacks,
        typesPerType,
        attacksPerName,
        pokemonsPerId,
        pokemonsPerName,
      },
      null,
      1
    )
  );
}
