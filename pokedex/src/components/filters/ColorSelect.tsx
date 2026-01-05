import type { Item, Color } from "../../interfaces.ts";

import FilterSelector from "./FilterSelector.tsx";
import { PokemonColorTag } from "../shared";

interface ColorSelectProps {
  colorList?: Color[];
  selectedColor?: string;
  onColorSelect?: (colorId: number) => void;
}

export default function ColorSelect({
  colorList,
  selectedColor,
  onColorSelect,
}: ColorSelectProps) {
  const handleColorSelect = (id: number) => {
    if (onColorSelect) {
      onColorSelect(id);
    }
  };

  const selectedColorId = colorList?.find((c) => c.name === selectedColor)?.id;
  
  return (
    <FilterSelector
      titleVisibility={true}
      title="Filter by Color"
      items={colorList || []}
      selectedItemId={selectedColorId}
      onSelect={(id) => {
        handleColorSelect(id);
      }}
    >
      {(item: Item) => (
        <PokemonColorTag colorName={item.name} />
      )}
    </FilterSelector>
  );
}
