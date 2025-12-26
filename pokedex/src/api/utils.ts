import type { Pokemon } from "../interfaces";

export function mapToPokemon(details: any): Pokemon {
  return {
    id: details.id,
    name: details.name,
    types: details.types.map((typeInfo: any) => typeInfo.type.name),
    image: details.sprites.other?.["official-artwork"]?.front_default,
  } as Pokemon;
}

export async function fetchPokemonDetailsUrl(url: string): Promise<Pokemon> {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Failed to fetch Pokémon details");
    }
    const details = await response.json();
    return mapToPokemon(details);
}
