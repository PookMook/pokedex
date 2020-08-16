import data from "~/data/pokemons.json";

// in cm
type Height = string;

// in g
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
});
const attacks: Attack[] = Object.values(attacksPerName);

// Create pokemons
let pokemonsPerName = [];
// Bulbasaur : {...Pokemon}

data.forEach((p) => {
  const thisPokemon = {
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
});

export default function Gon(req, res) {
  return res.json(data);
}
