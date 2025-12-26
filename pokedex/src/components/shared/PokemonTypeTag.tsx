import { Tag } from "antd";
import type { Type } from "../../interfaces";

import './PokemonTypeTag.css'

interface PokemonTypeTagProps {
    typeName: string;
    typeList: Type[];
}

export default function PokemonTypeTag({ typeName, typeList }: PokemonTypeTagProps) {
    const typeData = typeList.find((type) => type.name === typeName);

    return (
        <Tag className="pokemon-type-tag">
            <img
                src={typeData?.image}
                alt={typeName}
                title={typeName}
            />
        </Tag>
    );
}
