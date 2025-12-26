import { Input, Flex, Select } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import type { SelectProps } from "antd";
import type { Type } from "../interfaces.ts";

import "./PokedexFilters.css";
import PokemonTypeTag from "./shared/PokemonTypeTag.tsx";

type TagRender = SelectProps["tagRender"];

interface PokedexFiltersProps {
  typeList?: Type[];
  onSearch: (value: string | number | undefined) => void;
  onTypeSelect?: (typeName: string) => void;
}

export default function PokedexFilters({
  typeList,
  onSearch,
  onTypeSelect,
}: PokedexFiltersProps) {
  const options: SelectProps["options"] = typeList?.map((type) => ({
    label: <PokemonTypeTag typeList={typeList ?? []} typeName={type.name} />,
    value: type.name,
  })) ?? [];

  const tagRender: TagRender = (props) => {
    const { value } = props;
    return <PokemonTypeTag typeList={typeList ?? []} typeName={value} />;
  };

  const handleSearch = (value: string) => {
    if (value.trim() === "") {
      onSearch(undefined);
    } else {
      onSearch(value);
    }
  };

  const handleTypeSelect = (value: string) => {
    if (onTypeSelect) {
      onTypeSelect(value);
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
      <h3 style={{ color: "#000" }}>Filter by Type</h3>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Select
          tagRender={tagRender}
          options={options}
          style={{ width: '60%' }}
          onSelect={handleTypeSelect}
        />
      </div>
    </Flex>
  );
}
