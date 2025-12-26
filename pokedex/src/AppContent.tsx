import { useState } from "react";
import { Layout, Pagination, Spin } from "antd";

import PokedexHeader from "./components/PokedexHeader.tsx";
import PokedexFilters from "./components/PokedexFilters.tsx";
import PokedexContent from "./components/content/PokedexContent.tsx";

import { usePokemonTypes } from "./hooks/pokemon-hook.ts";

const LIMIT = 24;

export default function AppContent() {
  const [currentPage, setCurrentPage] = useState(1);

  const offset = (currentPage - 1) * LIMIT;
  const handlePaginationChange = (page: number) => {
    setCurrentPage(page);
  };

  const [idOrNameFilter, setIdOrNameFilter] = useState<
    string | number | undefined
  >(undefined);

  const [selectedType, setSelectedType] = useState<string | undefined>(
    undefined
  );

  const {
    data: typeList,
    isLoading: typesLoading,
    error: typesError,
  } = usePokemonTypes();

  if (typesLoading) return <Spin />;
  if (typesError) return <div>Error loading pokémon</div>;

  typeList?.map((type) => console.log(type.name));

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Layout.Header
        style={{ width: "100%", padding: 0, boxSizing: "border-box" }}
      >
        <PokedexHeader
          title="POKEDEX"
          onThemaChange={(checked: boolean) =>
            console.log(`switch to ${checked}`)
          }
        />
      </Layout.Header>
      <Layout>
        <Layout.Sider width={400}>
          <PokedexFilters
            typeList={typeList}
            selectedType={selectedType}
            onSearch={setIdOrNameFilter}
            onTypeSelect={setSelectedType}
          />
        </Layout.Sider>
        <Layout.Content style={{ margin: "16px" }}>
          <PokedexContent
            limit={LIMIT}
            offset={offset}
            filter={{ idOrName: idOrNameFilter, selectedType: selectedType }}
            typeList={typeList}
          />
        </Layout.Content>
      </Layout>
      <Layout.Footer>
        <Pagination
          align="center"
          current={currentPage}
          total={1025}
          pageSize={LIMIT}
          onChange={handlePaginationChange}
        />
      </Layout.Footer>
    </Layout>
  );
}
