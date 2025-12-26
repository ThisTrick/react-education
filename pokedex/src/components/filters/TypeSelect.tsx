import type { Type } from "../../interfaces.ts";


import PokemonTypeTag from "../shared/PokemonTypeTag.tsx";

import "./TypeSelect.css";

interface TypeSelectProps {
  typeList?: Type[];
  selectedType?: string;
  onTypeSelect?: (typeName: string) => void;
}

export default function TypeSelect({ typeList, selectedType, onTypeSelect }: TypeSelectProps) {
  const handleTypeSelect = (value: string) => {
    if (onTypeSelect) {
      onTypeSelect(value);
    }
  };

  return (
    <div className="type-select-container">
      <h3>Filter by Type</h3>
      <div className="type-buttons">
        {typeList?.map((type) => (
        <button
          key={type.name}
          className={`type-button ${selectedType === type.name ? 'active' : ''}`}
          onClick={() => handleTypeSelect(type.name)}
        >
          <PokemonTypeTag typeList={typeList} typeName={type.name} />
        </button>
      ))}
      </div>
    </div>
  );
}
