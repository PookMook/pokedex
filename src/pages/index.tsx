import React from "react";
import { GetStaticProps } from "next";
import { parse } from "graph-object-notation";

export default function Home({ gon }) {
  const { pokemons } = parse(gon).data;
  return (
    <>
      <h1>Pokedex</h1>
      {true && (
        <ul>
          {pokemons.map((p) => (
            <li key={p.name}>{p.name}</li>
          ))}
        </ul>
      )}
    </>
  );
}

export const getStaticProps: GetStaticProps = async (context) => {
  const gon = await fetch("http://localhost:3000/api/gon").then((r) =>
    r.text()
  );
  return { props: { gon } };
};
