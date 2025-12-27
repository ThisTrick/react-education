import { useState } from "react";
import { Layout, Pagination, Spin } from "antd";

import PokedexHeader from "./components/PokedexHeader.tsx";
import PokedexFilters from "./components/PokedexFilters.tsx";
import PokedexContent from "./components/content/PokedexContent.tsx";

import { usePokemonTypes, usePokemonColors, usePokemonHabitats } from "./hooks/pokemon-hook.ts";

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

  const [selectedTypeId, setSelectedTypeId] = useState<number | undefined>(
    undefined
  );

  const [selectedColorId, setSelectedColorId] = useState<number | undefined>(
    undefined
  );

  const [selectedHabitatId, setSelectedHabitatId] = useState<number | undefined>(
    undefined
  );

  const {
    data: typeList,
    isLoading: typesLoading,
    error: typesError,
  } = usePokemonTypes();

  const {
    data: colorList,
    isLoading: colorsLoading,
    error: colorsError,
  } = usePokemonColors();

  const {
    data: habitatList,
    isLoading: habitatsLoading,
    error: habitatsError,
  } = usePokemonHabitats();

  if (typesLoading || colorsLoading || habitatsLoading) return <Spin size="large" spinning />;
  if (typesError || colorsError || habitatsError) return <div>Error loading pokémon</div>;

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
            selectedType={typeList?.find(t => t.id === selectedTypeId)?.name}
            colorList={colorList}
            selectedColor={colorList?.find(c => c.id === selectedColorId)?.name}
            habitatList={habitatList}
            selectedHabitat={habitatList?.find(h => h.id === selectedHabitatId)?.name}
            onColorSelect={setSelectedColorId}
            onSearch={setIdOrNameFilter}
            onTypeSelect={setSelectedTypeId}
            onHabitatSelect={setSelectedHabitatId}
          />
        </Layout.Sider>
        <Layout.Content style={{ margin: "16px" }}>
          <PokedexContent
            limit={LIMIT}
            offset={offset}
            filter={{ idOrName: idOrNameFilter, selectedType: typeList?.find(t => t.id === selectedTypeId)?.name, selectedColor: colorList?.find(c => c.id === selectedColorId)?.name, selectedHabitat: habitatList?.find(h => h.id === selectedHabitatId)?.name }}
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
