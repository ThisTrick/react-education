import "./FilterSelector.css";
import FilterContainer from "./FilterContainer";

import type { Item } from "../../interfaces.ts";

interface FilterSelectorProps {
  titleVisibility?: boolean;
  title?: string;
  items: Item[];
  selectedItemId?: number;
  onSelect?: (value: number) => void;
  children: (item: Item) => React.ReactNode;
}

export default function FilterSelector({ titleVisibility, title, children, onSelect, items, selectedItemId }: FilterSelectorProps) {
  const handleSelect = (id: number) => {
    if (onSelect) {
      onSelect(id);
    }
  };

  return <FilterContainer titleVisibility={titleVisibility} title={title}>
    <div className="type-buttons">
            {items?.map((item) => (
            <button
              key={item.id}
              className={`type-button ${selectedItemId === item.id ? 'active' : ''}`}
              onClick={() => handleSelect(item.id)}
            >
              {children(item)}
            </button>
          ))}
          </div>
    </FilterContainer>;
}
