import { mapToPokemon, fetchPokemonDetailsUrl } from "./utils.ts";

import { POKEMON_API_BASE_URL, POKEMON_COLORS } from "../utils/const";

import type { Pokemon, Type, Color, Habitat } from "../interfaces";

export async function fetchTypes(): Promise<Type[]> {
  const response = await fetch(`${POKEMON_API_BASE_URL}/type`);
  if (!response.ok) {
    throw new Error("Failed to fetch Pokémon types");
  }
  const data = await response.json();

  return Promise.all(
    data.results
      .filter(
        (typeInfo: { name: string; url: string }) =>
          typeInfo.name !== "unknown" && typeInfo.name !== "stellar"
      )
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

export async function fetchColors(): Promise<Color[]> {
  const response = await fetch(`${POKEMON_API_BASE_URL}/pokemon-color`);
  if (!response.ok) {
    throw new Error("Failed to fetch Pokémon colors");
  }
  const data = await response.json();

  return data.results.map(
    (colorInfo: { name: string; url: string }, index: number) => {
      const { bg, text } = POKEMON_COLORS[colorInfo.name];
      return {
        id: index,
        name: colorInfo.name,
        bgHex: bg,
        textHex: text,
      } as Color;
    }
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

export async function fetchPokemonByColor(
  colorName: string,
  limit: number = 24,
  offset: number = 0
): Promise<Pokemon[]> {
  const response = await fetch(
    `${POKEMON_API_BASE_URL}/pokemon-color/${colorName}`
  );
  if (!response.ok) {
    throw new Error(`Failed to fetch Pokémon of color: ${colorName}`);
  }
  const data = await response.json();

  const slicedPokemon = data.pokemon_species.slice(offset, offset + limit);

  return Promise.all(
    slicedPokemon.map(
      async (pokemonInfo: { name: string; url: string }) => {
        try {
          // pokemon_species URL повертає species, потрібно отримати pokemon з неї
          const speciesResponse = await fetch(pokemonInfo.url);
          const speciesData = await speciesResponse.json();
          const pokemonUrl = speciesData.varieties[0].pokemon.url;
          return await fetchPokemonDetailsUrl(pokemonUrl);
        } catch (error) {
          console.error(`Error fetching ${pokemonInfo.name}:`, error);
          throw error;
        }
      }
    )
  );
}

export async function fetchHabitats(): Promise<Habitat[]> {
  const response = await fetch(`${POKEMON_API_BASE_URL}/pokemon-habitat`);
  if (!response.ok) {
    throw new Error("Failed to fetch Pokémon habitats");
  }
  const data = await response.json();

  return data.results.map(
    (habitatInfo: { name: string; url: string }, index: number) => ({
      id: index,
      name: habitatInfo.name,
    } as Habitat)
  );
}

export async function fetchPokemonByHabitat(
  habitatName: string,
  limit: number = 24,
  offset: number = 0
): Promise<Pokemon[]> {
  const response = await fetch(
    `${POKEMON_API_BASE_URL}/pokemon-habitat/${habitatName}`
  );
  if (!response.ok) {
    throw new Error(`Failed to fetch Pokémon of habitat: ${habitatName}`);
  }
  const data = await response.json();

  const slicedPokemon = data.pokemon_species.slice(offset, offset + limit);

  return Promise.all(
    slicedPokemon.map(
      async (pokemonInfo: { name: string; url: string }) => {
        try {
          // pokemon_species URL повертає species, потрібно отримати pokemon з неї
          const speciesResponse = await fetch(pokemonInfo.url);
          const speciesData = await speciesResponse.json();
          const pokemonUrl = speciesData.varieties[0].pokemon.url;
          return await fetchPokemonDetailsUrl(pokemonUrl);
        } catch (error) {
          console.error(`Error fetching ${pokemonInfo.name}:`, error);
          throw error;
        }
      }
    )
  );
}

