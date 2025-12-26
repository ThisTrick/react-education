import { mapToPokemon, fetchPokemonDetailsUrl } from "./utils.ts";

import { POKEMON_API_BASE_URL } from "../utils/const";

import type { Pokemon, Type } from "../interfaces";



export async function fetchTypes(): Promise<Type[]> {
  const response = await fetch(`${POKEMON_API_BASE_URL}/type`);
  if (!response.ok) {
    throw new Error("Failed to fetch Pokémon types");
  }
  const data = await response.json();

  return Promise.all(
    data.results.filter((typeInfo: { name: string; url: string }) => typeInfo.name !== "unknown" && typeInfo.name !== "stellar")
    .map(async (typeInfo: { name: string; url: string }) => {
      try {
        const typeDetailsResponse = await fetch(typeInfo.url);
        if (!typeDetailsResponse.ok) {
          throw new Error(`Failed to fetch ${typeInfo.name}`);
        }
        const details = await typeDetailsResponse.json();

        return {
          id: details.id,
          name: details.name,
          image: details.sprites["generation-viii"]["sword-shield"].name_icon,
        } as Type;
      } catch (error) {
        console.error(`Error fetching ${name}:`, error);
        throw error;
      }
    })
  );
}

interface PokemonListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Array<{
    name: string;
    url: string;
  }>;
}

export async function fetchPokemonList(
  limit: number = 20,
  offset: number
): Promise<Pokemon[]> {
  const response = await fetch(
    `${POKEMON_API_BASE_URL}/pokemon?limit=${limit}&offset=${offset}`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch Pokémon list");
  }
  const data = (await response.json()) as PokemonListResponse;

  return Promise.all(
    data.results.map(async (pokemonInfo) => {
      try {
        return await fetchPokemonDetailsUrl(pokemonInfo.url);
      } catch (error) {
        console.error(`Error fetching ${pokemonInfo.name}:`, error);
        throw error;
      }
    })
  );
}

export async function fetchPokemonByNameOrId(
  nameOrId: string | number
): Promise<Pokemon[]> {
  const response = await fetch(`${POKEMON_API_BASE_URL}/pokemon/${nameOrId}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch Pokémon with name or ID: ${nameOrId}`);
  }
  const details = await response.json();
  return [mapToPokemon(details)];
}

export async function fetchPokemonByType(
  typeName: string,
  limit: number = 24,
  offset: number = 0
): Promise<Pokemon[]> {
  const response = await fetch(`${POKEMON_API_BASE_URL}/type/${typeName}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch Pokémon of type: ${typeName}`);
  }
  const data = await response.json();

  const slicedPokemon = data.pokemon.slice(offset, offset + limit);

  return Promise.all(
    slicedPokemon.map(
      async (pokemonInfo: { pokemon: { name: string; url: string } }) => {
        try {
          return await fetchPokemonDetailsUrl(pokemonInfo.pokemon.url);
        } catch (error) {
          console.error(`Error fetching ${pokemonInfo.pokemon.name}:`, error);
          throw error;
        }
      }
    )
  );
}
