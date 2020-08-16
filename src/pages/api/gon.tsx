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
  // This will crash cause of the circular structure
  // return res.json(pokemons)
  // import GON.stringify and send GON string out
  return res.send(
    stringify(
      {
        pokemons,
        types,
        attacks,
        typesPerType,
        attacksPerName,
        pokemonPerId,
        pokemonPerName,
      },
      null,
      1
    )
  );
}
