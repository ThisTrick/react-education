import { useQuery } from "@tanstack/react-query";
import { fetchPokemonList, fetchTypes } from "../api/pokemon-api.ts";

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
