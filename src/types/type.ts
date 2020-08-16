import { Pokemon } from "./pokemon";

export type Type = {
  name: string;
  effectiveAgainst: Pokemon[];
  weakAgainst: Pokemon[];
};
