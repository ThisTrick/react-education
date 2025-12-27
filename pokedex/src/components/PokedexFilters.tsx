import { Input, Flex, Button } from "antd";
import { SearchOutlined, ClearOutlined } from "@ant-design/icons";

import { TypeSelect, ColorSelect } from "./filters";
import type { Type, Color } from "../interfaces.ts";

import "./PokedexFilters.css";

interface PokedexFiltersProps {
  typeList?: Type[];
  selectedType?: string;
  colorList?: Color[];
  selectedColor?: string;  
  onSearch: (value: string | number | undefined) => void;
  onTypeSelect?: (typeId: number) => void;
  onColorSelect?: (colorId: number) => void;
}

export default function PokedexFilters({
  typeList,
  selectedType,
  colorList,
  selectedColor,
  onSearch,
  onTypeSelect,
  onColorSelect,
}: PokedexFiltersProps) {
  const handleSearch = (value: string) => {
    if (value.trim() === "") {
      onSearch(undefined);
    } else {
      onSearch(value);
    }
  };

  const handleClearAll = () => {
    onSearch(undefined);
    onTypeSelect?.(-1);
    onColorSelect?.(-1);
  };

  return (
    <Flex vertical gap="medium">
      <Input
        size="large"
        placeholder="Search Pokémon"
        prefix={<SearchOutlined />}
        onPressEnter={(e) => handleSearch(e.currentTarget.value)}
        allowClear
        onClear={() => onSearch(undefined)}
      />
      <TypeSelect
        typeList={typeList}
        selectedType={selectedType}
        onTypeSelect={onTypeSelect}
      />
      <ColorSelect
        colorList={colorList}
        selectedColor={selectedColor}
        onColorSelect={onColorSelect}
      />
      <Button 
        type="primary" 
        danger 
        size="large"
        icon={<ClearOutlined />}
        onClick={handleClearAll}
        block
      >
        Clear All Filters
      </Button>
    </Flex>
  );
}
