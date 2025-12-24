import { useQuery } from "@tanstack/react-query";
import { fetchPokemonList, fetchTypes, fetchPokemonByNameOrId, fetchPokemonByType } from "../api/pokemon-api.ts";

export function usePokemonList(limit: number = 20, offset: number = 0) {
  return useQuery({
    queryKey: ["pokemon", limit, offset],
    queryFn: () => fetchPokemonList(limit, offset),
  });
}

export function usePokemonTypes() {
  return useQuery({
    queryKey: ["pokemonTypes"],
    queryFn: fetchTypes,
  });
}

export function usePokemonByNameOrId(nameOrId: string | number) {
  return useQuery({
    queryKey: ["pokemon", nameOrId],
    queryFn: () => fetchPokemonByNameOrId(nameOrId),
  });
}

export function usePokemonByType(typeName: string, limit: number = 20, offset: number = 0) {
  return useQuery({
    queryKey: ["pokemonByType", typeName, limit, offset],
    queryFn: () => fetchPokemonByType(typeName, limit, offset),
  });
}
