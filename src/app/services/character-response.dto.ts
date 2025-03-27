import { Character } from "./character.interface";

/** API response structure for character listings */
export interface CharacterResponse {
  info: {
    count: number;
    pages: number;
    next: string | null;
    prev: string | null;
  };
  results: Character[];
}
