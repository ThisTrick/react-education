import type { Type } from "../../interfaces";
import { PokemonTypeTag } from "../shared";

import "./PokemonTypes.css";

interface PokemonTypesProps {
  types: string[];
  typeList: Type[];
}

export default function PokemonTypes({ types, typeList }: PokemonTypesProps) {
  return (
    <div className="pokemon-types">
      {types.map((t) => (
        <PokemonTypeTag key={t} typeName={t} typeList={typeList} />
      ))}
    </div>
  );
}
