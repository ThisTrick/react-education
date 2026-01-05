import { Tag } from "antd";

import { POKEMON_COLORS } from "../../utils/const.ts";

import "./PokemonColorTag.css";

interface PokemonColorTypeProps {
    colorName: string;
}

export default function PokemonColorTag({ colorName }: PokemonColorTypeProps) {
    const color = POKEMON_COLORS[colorName];

    return (
        <Tag 
            className="pokemon-color-type" 
            variant="solid" 
            color={color?.bg}
            style={{ color: color?.text }}
        >
            {colorName}
        </Tag>
    );
}
