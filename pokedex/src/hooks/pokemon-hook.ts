import { useQuery } from "@tanstack/react-query";
import { fetchPokemonList } from "../api/pokemon-api.ts";

export function usePokemonList(limit: number = 20, offset: number = 0) {
  return useQuery({
    queryKey: ["pokemon", limit, offset],
    queryFn: () => fetchPokemonList(limit, offset),
  });
}
