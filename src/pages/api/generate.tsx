import { NextApiRequest, NextApiResponse } from "next";
import { stringify } from "graph-object-notation";
import {
  pokemons,
  types,
  attacks,
  typesPerType,
  attacksPerName,
  pokemonPerId,
  pokemonPerName,
} from "~/data/gon";

export default function Gon(req: NextApiRequest, res: NextApiResponse) {
  return res.send(
    stringify({
      pokemons,
      types,
      attacks,
      typesPerType,
      attacksPerName,
      pokemonPerId,
      pokemonPerName,
    })
  );
}
