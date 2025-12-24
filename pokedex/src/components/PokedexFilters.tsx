import { Input, Flex } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import "./PokedexFilters.css";


export default function PokedexFilters() {
  
  
  
  return (
    <Flex vertical gap="middle">
      <Input
        size="large"
        placeholder="Search Pokémon"
        prefix={<SearchOutlined />}
      />
      </Flex>
  );
}
