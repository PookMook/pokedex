import data from "data/pokemons.json";

export default function pokemons(req, res) {
  return res.json(data);
}
