import { Card, Flex, Spin } from "antd";

import { usePokemonList, usePokemonByNameOrId, usePokemonByType } from "../hooks/pokemon-hook.ts";

import "./PokedexContent.css";
import PokemonTypes from "./common/PokemonTypes.tsx";

interface PokemonCardImageProps {
  alt?: string;
  imageUrl?: string;
}

function PokemonCardImage({
  alt = "example",
  imageUrl,
}: PokemonCardImageProps) {
  return (
    <div className="pokemon-card-cover">
      <img alt={alt} src={imageUrl} className="pokemon-card-image" />
    </div>
  );
}

interface Pokemon {
  id: number;
  name: string;
  types: string[];
  image: string;
}

interface Type {
  id: number;
  name: string;
  image: string;
}

interface PokemonCardProps extends Pokemon {
  typeList: Type[];
}

function PokemonCard({
  name = "Pokémon Name",
  types = ["Grass", "Poison"],
  id = 1,
  image = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png",
  typeList,
}: PokemonCardProps) {
  return (
    <Card
      key={id}
      hoverable
      className="pokemon-card"
      cover={<PokemonCardImage imageUrl={image} alt={name} />}
    >
      <div className="pokemon-card-content">
        <h3 className="pokemon-card-title">
          #{id} {name}
        </h3>
        <PokemonTypes types={types} typeList={typeList} />
      </div>
    </Card>
  );
}

interface Filter {
  idOrName?: string | number | undefined;
  selectedType?: string | undefined;
}

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
