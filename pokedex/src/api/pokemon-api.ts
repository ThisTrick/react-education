const POKEMON_API_BASE_URL = "https://pokeapi.co/api/v2";

interface Pokemon {
  id: number;
  name: string;
  types: string[];
  image: string;
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
        const pokemonDetailsResponse = await fetch(pokemonInfo.url);
        if (!pokemonDetailsResponse.ok) {
          throw new Error(`Failed to fetch ${pokemonInfo.name}`);
        }
        const details = await pokemonDetailsResponse.json();
        return {
          id: details.id,
          name: details.name,
          types: details.types.map((typeInfo: any) => typeInfo.type.name),
          image: details.sprites.other?.["official-artwork"]?.front_default,
        } as Pokemon;
      } catch (error) {
        console.error(`Error fetching ${pokemonInfo.name}:`, error);
        throw error;
      }
    })
  );
}
