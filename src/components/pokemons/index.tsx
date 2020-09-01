import React, { useState } from "react";
import { Pokemon, HtmlElementString } from "~/types";
import styled from "styled-components";

import { ClickableTitle } from "~/components/layouts";

export default function PokemonDisplay({
  pokemon,
  as = "article",
  open = false,
}: {
  pokemon: Pokemon;
  as?: HtmlElementString;
  open?: boolean;
}) {
  const [openState, setOpen] = useState<boolean>(open);

  return (
    <PokemonWrapper as={as}>
      <ClickableTitle onClick={() => setOpen(!openState)}>
        {pokemon.name}
      </ClickableTitle>
      {openState && (
        <>
          <h3>Resistant against</h3>
          <ul>
            {pokemon.resistant.map((r) => (
              <li key={r.name}>{r.name}</li>
            ))}
          </ul>
          <h3>Weak against</h3>
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
        </>
      )}
    </PokemonWrapper>
  );
}

const PokemonWrapper = styled.article`
  border: 1px solid #000000;
`;
