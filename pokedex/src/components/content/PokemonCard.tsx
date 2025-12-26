import { Card } from "antd";
import PokemonTypes from "../shared/PokemonTypes.tsx";
import type { Pokemon, Type } from "../../interfaces.ts";

import "./PokemonCard.css";

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

interface PokemonCardProps extends Pokemon {
  typeList: Type[];
}

export default function PokemonCard({
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
