import type { Item, Type } from "../../interfaces.ts";

import { FilterSelector } from "../filters";
import { PokemonTypeTag } from "../shared";

interface TypeSelectProps {
  typeList?: Type[];
  selectedType?: string;
  onTypeSelect?: (typeId: number) => void;
}

export default function TypeSelect({
  typeList,
  selectedType,
  onTypeSelect,
}: TypeSelectProps) {
  const handleTypeSelect = (id: number) => {
    if (onTypeSelect) {
      onTypeSelect(id);
    }
  };

  const selectedTypeId = typeList?.find((t) => t.name === selectedType)?.id;

  return (
    <FilterSelector
      titleVisibility={true}
      title="Filter by Type"
      items={typeList || []}
      selectedItemId={selectedTypeId}
      onSelect={(id) => {
        handleTypeSelect(id);
      }}
    >
      {(item: Item) => (
        <PokemonTypeTag typeList={typeList || []} typeName={item.name} />
      )}
    </FilterSelector>
  );
}
