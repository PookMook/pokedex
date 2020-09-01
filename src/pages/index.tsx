import React, { useState, useEffect } from "react";
import { parse } from "graph-object-notation";
import styled from "styled-components";
import { Pokemon } from "~/types";
import PokemonDisplay from "~/components/pokemons/index";

export default function Home() {
  const [pokemons, setPokemons] = useState<Pokemon[] | null>(null);
  const [search, setSearch] = useState<string>("");

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
    <App>
      <h1>Pokedex</h1>
      <input
        type="text"
        placeholder="Search Pokemon by name"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      {pokemons !== null ? (
        <ul>
          {pokemons
            .filter((p) => p.name.toLowerCase().includes(search.toLowerCase()))
            .map((p) => (
              <PokemonDisplay pokemon={p} key={p.name} as="li" />
            ))}
        </ul>
      ) : (
        <p>loading</p>
      )}
    </App>
  );
}

const App = styled.main`
  color: #303030;
  --clickable: green;
`;
