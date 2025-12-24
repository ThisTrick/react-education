import { useState } from "react";
import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { Layout, Pagination } from "antd";

import PokedexHeader from "./components/PokedexHeader.tsx";
import PokedexFilters from "./components/PokedexFilters.tsx";
import PokedexContent from "./components/PokedexContent.tsx";

import "./App.css";

const queryClient = new QueryClient();
const LIMIT = 24;

function App() {
  const [currentPage, setCurrentPage] = useState(1);

  const offset = (currentPage - 1) * LIMIT;
  const handlePaginationChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <QueryClientProvider client={queryClient}>
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
          <Layout.Sider>
            <PokedexFilters />
          </Layout.Sider>
          <Layout.Content style={{ margin: "16px" }}>
            <PokedexContent limit={LIMIT} offset={offset} />
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
    </QueryClientProvider>
  );
}

export default App;
