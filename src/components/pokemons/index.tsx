import React from "react";
import { Pokemon } from "~/types/pokemon";

export default function PokemonDisplay({ pokemon }: { pokemon: Pokemon }) {
  return (
    <article>
      <h1>{pokemon.name}</h1>
      <h2>Resistant against</h2>
      <ul>
        {pokemon.resistant.map((r) => (
          <li key={r.name}>{r.name}</li>
        ))}
      </ul>
      <h2>Weak against</h2>
      <ul>
        {pokemon.weaknesses.map((w) => (
          <li key={w.name}>{w.name}</li>
        ))}
      </ul>
      <p>
        {pokemon.weight.minimum} - {pokemon.weight.maximum}
      </p>
      <p>
        {pokemon.height.minimum} - {pokemon.height.maximum}
      </p>
    </article>
  );
}
