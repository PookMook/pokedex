import { Pokemon as PokemonImport } from "./pokemon";
import { Attack as AttackImport } from "./attack";
import { Type as TypeImport } from "./type";

// A bit ghetto for now

export type Pokemon = PokemonImport;
export type PokemonPerName = Record<string, Pokemon>;
export type PokemonPerId = Record<number, Pokemon>;

export type Attack = AttackImport;
export type AttackPerName = Record<string, AttackImport>;

export type Type = TypeImport;
export type TypePerType = Record<string, TypeImport>;
export type HtmlElementString = "article" | "li";
