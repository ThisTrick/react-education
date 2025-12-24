import { Card, Flex, Tag, Spin } from "antd";
import { usePokemonList } from "../hooks/pokemon-hook.ts";

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
      <img
        alt={alt}
        src={imageUrl}
        className="pokemon-card-image"
      />
    </div>
  );
}

const typeColors: Record<string, string> = {
  normal: "default",
  fire: "red",
  water: "blue",
  electric: "gold",
  grass: "green",
  ice: "cyan",
  fighting: "volcano",
  poison: "purple",
  ground: "orange",
  flying: "blue",
  psychic: "magenta",
  bug: "lime",
  rock: "brown",
  ghost: "purple",
  dragon: "purple",
  dark: "black",
  steel: "silver",
  fairy: "magenta",
};

interface Pokemon {
  id: number;
  name: string;
  types: string[];
  image: string;
}

interface PokemonCardProps extends Pokemon {}

function PokemonCard({
  name = "Pokémon Name",
  types = ["Grass", "Poison"],
  id = 1,
  image = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png",
}: PokemonCardProps) {
  return (
    <Card
      key={id}
      hoverable
      className="pokemon-card"
      cover={<PokemonCardImage imageUrl={image} alt={name} />}
    >
      <div className="pokemon-card-content">
        <h3 className="pokemon-card-title">#{id} {name}</h3>
        <div className="pokemon-card-types">
          {types.map((t) => (
            <Tag key={t} color={typeColors[t.toLowerCase()]} className="pokemon-type-tag">
              {t}
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
 
  if (isLoading) return <Spin />;
  if (error) return <div>Error loading pokémon</div>;

  return (
    <Flex justify="space-between" gap="middle" wrap="wrap" className="pokemon-flex">
      {pokemonList?.map((pokemon) => (
        <PokemonCard key={pokemon.id} {...pokemon} />
      ))}
    </Flex>
  );
}
