import data from "~/data/pokemons.json";

import {
  Pokemon,
  PokemonPerName,
  PokemonPerId,
  Type,
  TypePerType,
  Attack,
  AttackPerName,
} from "~/types";

//const data = JSON.parse(JSON.stringify(json));

// Create types
const typesPerType: TypePerType = {};

data.forEach((p) => {
  p.types.forEach((t) => {
    typesPerType[t] = { name: t, effectiveAgainst: [], weakAgainst: [] };
  });
  p.resistant.forEach((t) => {
    typesPerType[t] = { name: t, effectiveAgainst: [], weakAgainst: [] };
  });
  p.weaknesses.forEach((t) => {
    typesPerType[t] = { name: t, effectiveAgainst: [], weakAgainst: [] };
  });
});

const types: Type[] = Object.values(typesPerType);

// Create attacks
let attacksPerName: AttackPerName = {
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
let pokemonPerName: PokemonPerName = {};
let pokemonPerId: PokemonPerId = {};
// Bulbasaur : {...Pokemon}

data.forEach((p) => {
  pokemonPerName[p.name] = {
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
  pokemonPerId[Number(p.id)] = pokemonPerName[p.name];
});
const pokemons: Pokemon[] = Object.values(pokemonPerId);

// All entities are created, let's populate the edges of the graph
data.forEach((p) => {
  p.weaknesses.forEach((w) => {
    typesPerType[w]["effectiveAgainst"].push(pokemonPerName[p.name]);
  });
  p.resistant.forEach((r) => {
    typesPerType[r]["weakAgainst"].push(pokemonPerName[p.name]);
  });

  if (p.evolutions) {
    pokemonPerName[p.name]["evolutions"] = p.evolutions.map(
      (e) => pokemonPerName[e.name]
    );
  }
  if (p["Previous evolution(s)"]) {
    pokemonPerName[p.name]["previousEvolutions"] = p[
      "Previous evolution(s)"
    ].map((e) => pokemonPerName[e.name]);
  }
});

export {
  pokemons,
  types,
  attacks,
  typesPerType,
  attacksPerName,
  pokemonPerId,
  pokemonPerName,
};
