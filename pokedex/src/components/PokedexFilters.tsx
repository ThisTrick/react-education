import { Input, Flex } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import "./PokedexFilters.css";

interface PokedexFiltersProps {
  onSearch: (value: string | number | undefined) => void;
}

export default function PokedexFilters({ onSearch }: PokedexFiltersProps) {
  const handleSearch = (value: string) => {
    if (value.trim() === '') {
      onSearch(undefined);
    } else {
      onSearch(value);
    }
  };

  return (
    <Flex vertical gap="middle">
      <Input
        size="large"
        placeholder="Search Pokémon"
        prefix={<SearchOutlined />}
        onPressEnter={(e) => handleSearch(e.currentTarget.value)}
        allowClear
        onClear={() => onSearch(undefined)}
      />
    </Flex>
  );
}
