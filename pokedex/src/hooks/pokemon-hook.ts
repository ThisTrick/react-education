import { useQuery } from "@tanstack/react-query";
import {
  fetchPokemonList,
  fetchTypes,
  fetchPokemonByNameOrId,
  fetchPokemonByType,
  fetchPokemonByColor,
  fetchColors,
  fetchHabitats,
  fetchPokemonByHabitat,
} from "../api/pokemon-api.ts";

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

export function usePokemonColors() {
  return useQuery({
    queryKey: ["pokemonColors"],
    queryFn: fetchColors,
  });
}

export function usePokemonByNameOrId(nameOrId: string | number) {
  return useQuery({
    queryKey: ["pokemon", nameOrId],
    queryFn: () => fetchPokemonByNameOrId(nameOrId),
  });
}

export function usePokemonByType(
  typeName: string,
  limit: number = 20,
  offset: number = 0
) {
  return useQuery({
    queryKey: ["pokemonByType", typeName, limit, offset],
    queryFn: () => fetchPokemonByType(typeName, limit, offset),
  });
}

export function usePokemonByColor(
  colorName: string,
  limit: number = 20,
  offset: number = 0
) {
  return useQuery({
    queryKey: ["pokemonByColor", colorName, limit, offset],
    queryFn: () => fetchPokemonByColor(colorName, limit, offset),
  });
}

export function usePokemonHabitats() {
  return useQuery({
    queryKey: ["pokemonHabitats"],
    queryFn: fetchHabitats,
  });
}

export function usePokemonByHabitat(
  habitatName: string,
  limit: number = 20,
  offset: number = 0
) {
  return useQuery({
    queryKey: ["pokemonByHabitat", habitatName, limit, offset],
    queryFn: () => fetchPokemonByHabitat(habitatName, limit, offset),
  });
}
