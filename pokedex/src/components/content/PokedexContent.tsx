import { Flex, Spin } from "antd";
import { PokemonCard } from "../content";

import type { Type, Filter } from "../../interfaces.ts";
import {
  usePokemonList,
  usePokemonByNameOrId,
  usePokemonByType,
  usePokemonByColor,
  usePokemonByHabitat
} from "../../hooks/pokemon-hook.ts";

import "./PokedexContent.css";

interface PokedexContentProps {
  limit: number;
  offset: number;
  filter?: Filter;
  typeList?: Type[];
}

export default function PokedexContent({
  limit,
  offset,
  filter,
  typeList,
}: PokedexContentProps) {
  const {
    data: pokemonList,
    isLoading,
    error,
  } = filter?.selectedType
    ? usePokemonByType(filter.selectedType, limit, offset)
    : filter?.idOrName
    ? usePokemonByNameOrId(filter.idOrName)
    : filter?.selectedColor
    ? usePokemonByColor(filter.selectedColor, limit, offset)
    : filter?.selectedHabitat
    ? usePokemonByHabitat(filter.selectedHabitat, limit, offset)
    : usePokemonList(limit, offset);

  if (isLoading) return <Spin />;
  if (error) return <div>Error loading pokémon: {error.message}</div>;

  return (
    <Flex
      justify="space-between"
      gap="middle"
      wrap="wrap"
      className="pokemon-flex"
    >
      {pokemonList?.map((pokemon) => (
        <PokemonCard typeList={typeList || []} key={pokemon.id} {...pokemon} />
      ))}
    </Flex>
  );
}
