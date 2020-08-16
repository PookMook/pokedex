import { NextApiRequest, NextApiResponse } from "next";
import gon from "~/data/pokemons.gon";
/* import { stringify } from "graph-object-notation";
import {
  pokemons,
  types,
  attacks,
  typesPerType,
  attacksPerName,
  pokemonPerId,
  pokemonPerName,
} from "~/data/gon"; */

export default function Gon(req: NextApiRequest, res: NextApiResponse) {
  /*
 ==== 
 Used to generate ~/data/pokemons.gon and ~/data/pokemonGon.ts
 Not live atm because of sideEffect of the stringify function

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
  ); */
  res.send(gon);
}
