import type { Item, Habitat } from "../../interfaces.ts";

import { FilterSelector } from "../filters";
import { PokemonHabitatTag } from "../shared";

interface HabitatSelectProps {
  habitatList?: Habitat[];
  selectedHabitat?: string;
  onHabitatSelect?: (habitatId: number) => void;
}

export default function HabitatSelect({
  habitatList,
  selectedHabitat,
  onHabitatSelect,
}: HabitatSelectProps) {
  const handleHabitatSelect = (id: number) => {
    if (onHabitatSelect) {
      onHabitatSelect(id);
    }
  };

  const selectedHabitatId = habitatList?.find((h) => h.name === selectedHabitat)?.id;

  return (
    <FilterSelector
      titleVisibility={true}
      title="Filter by Habitat"
      items={habitatList || []}
      selectedItemId={selectedHabitatId}
      onSelect={(id) => {
        handleHabitatSelect(id);
      }}
    >
      {(item: Item) => (
        <PokemonHabitatTag habitatList={habitatList || []} habitatName={item.name} />
      )}
    </FilterSelector>
  );
}

