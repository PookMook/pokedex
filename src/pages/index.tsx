import React, { useState, useEffect } from "react";
import { parse } from "graph-object-notation";

import { Pokemon } from "~/types";

export default function Home() {
  const [pokemons, setPokemons] = useState<Pokemon[] | null>(null);

  useEffect(() => {
    fetch("/api/gon")
      .then((r) => r.text())
      .then((r) => {
        const pokemons: Pokemon[] = parse(r).data.pokemons;
        setPokemons(pokemons);
      });
  }, []);

  return (
    <>
      <h1>Pokedex</h1>
      {pokemons && (
        <ul>
          {pokemons.map((p: Pokemon) => (
            <li key={p.name}>{p.name}</li>
          ))}
        </ul>
      )}
    </>
  );
}
