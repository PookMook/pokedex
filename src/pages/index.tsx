import React, { useState, useEffect } from "react";
import { parse } from "graph-object-notation";

import { Pokemon } from "~/types";

export default function Home() {
  const [pokemons, setPokemons] = useState<Pokemon[] | null>(null);

  useEffect(() => {
    fetch("/api/gon")
      .then((r) => r.text())
      .then((r) => {
        const parsed = parse(r);
        const { pokemons }: { pokemons: Pokemon[] } = parsed.data;
        setPokemons(pokemons);
      });
  }, []);

  return (
    <>
      <h1>Pokedex</h1>
      {pokemons !== null ? (
        <ul>
          {pokemons.map((p) => (
            <li key={p.name}>{p.name}</li>
          ))}
        </ul>
      ) : (
        <p>loading</p>
      )}
    </>
  );
}
