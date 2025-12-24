import { Card, Flex, Tag, Spin } from "antd";
import { usePokemonList, usePokemonTypes } from "../hooks/pokemon-hook.ts";

import "./PokedexContent.css";

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
        <div className="pokemon-card-types">
          {types.map((t) => (
            <Tag key={t} className="pokemon-type-tag">
              <img
                src={typeList.find((type) => type.name === t)?.image}
                alt={t}
              />
            </Tag>
          ))}
        </div>
      </div>
    </Card>
  );
}

interface PokedexContentProps {
  limit: number;
  offset: number;
}

export default function PokedexContent({ limit, offset }: PokedexContentProps) {
  const { data: pokemonList, isLoading, error } = usePokemonList(limit, offset);
  const {
    data: typeList,
    isLoading: typesLoading,
    error: typesError,
  } = usePokemonTypes();

  if (isLoading || typesLoading) return <Spin />;
  if (error || typesError) return <div>Error loading pokémon</div>;

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
