import data from "data/pokemons.json";

export default function pokemons(req, res) {
  const attacks = data
    .map((p) => p.attacks)
    .map((a) => [...a.fast, ...a.special])
    .reduce((val, acc) => [...val, ...acc]);

  let attacksByName = {};
  attacks.forEach((a) => (attacksByName[a.name] = a));

  const uniqueAttacks: {
    name: string;
    type: string;
    damage: number;
  }[] = Object.values(attacksByName);
  let attacksByType = {};
  uniqueAttacks.forEach(
    (a) =>
      (attacksByType[a.type] = attacksByType[a.type]
        ? [...attacksByType[a.type], a]
        : [a])
  );

  return res.json({ attacks: uniqueAttacks, attacksByName, attacksByType });
}
