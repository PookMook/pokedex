import React from "react";
import { GetStaticProps } from "next";
import { parse } from "graph-object-notation";

import { Pokemon } from "~/types";

export default function Home({ gon }: { gon: string }) {
  const { pokemons } = parse(gon).data;
  return (
    <>
      <h1>Pokedex</h1>
      {true && (
        <ul>
          {pokemons.map((p: Pokemon) => (
            <li key={p.name}>{p.name}</li>
          ))}
        </ul>
      )}
    </>
  );
}

export const getStaticProps: GetStaticProps = async (context) => {
  const gon: string = await fetch("http://localhost:3000/api/gon").then((r) =>
    r.text()
  );
  return { props: { gon } };
};
