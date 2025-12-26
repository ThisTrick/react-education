import { Input, Flex } from "antd";
import { SearchOutlined } from "@ant-design/icons";

import { TypeSelect } from "./filters";
import type { Type } from "../interfaces.ts";

import "./PokedexFilters.css";

interface PokedexFiltersProps {
  typeList?: Type[];
  selectedType?: string;
  onSearch: (value: string | number | undefined) => void;
  onTypeSelect?: (typeId: number) => void;
}

export default function PokedexFilters({
  typeList,
  selectedType,
  onSearch,
  onTypeSelect,
}: PokedexFiltersProps) {
  const handleSearch = (value: string) => {
    if (value.trim() === "") {
      onSearch(undefined);
    } else {
      onSearch(value);
    }
  };

  return (
    <Flex vertical>
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
    </Flex>
  );
}
