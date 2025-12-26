import { Flex, Spin } from "antd";
import PokemonCard from "../content/PokemonCard.tsx";

import type { Type, Filter } from "../../interfaces.ts";
import {
  usePokemonList,
  usePokemonByNameOrId,
  usePokemonByType,
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
    : usePokemonList(limit, offset);

  if (isLoading) return <Spin />;
  if (error) return <div>Error loading pokémon</div>;

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
