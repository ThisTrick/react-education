import { Tag } from "antd";

import type { Habitat } from "../../interfaces.ts";
import { HABITAT_COLORS } from "../../utils/const.ts";

import "./PokemonHabitatTag.css";

interface PokemonHabitatTagProps {
  habitatName: string;
  habitatList: Habitat[];
}

export default function PokemonHabitatTag({
  habitatName,
}: PokemonHabitatTagProps) {
  // Normalize habitatName to use underscores for color lookup
  const normalizedName = habitatName.replace(/-/g, "_");
  const habitatColor = HABITAT_COLORS[normalizedName];

  const displayName = habitatName
    .replace(/_/g, "-")
    .split("-")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join("-");

  return (
    <Tag
      className="pokemon-habitat-tag"
      variant="solid"
      color={habitatColor?.bg}
      style={{ color: habitatColor?.text }}
    >
      {displayName}
    </Tag>
  );
}
