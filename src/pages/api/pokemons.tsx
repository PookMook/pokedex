import { NextApiRequest, NextApiResponse } from "next";
import data from "data/pokemons.json";

export default function PokemonsAPI(req: NextApiRequest, res: NextApiResponse) {
  return res.json(data);
}
