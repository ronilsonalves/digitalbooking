import { Router } from "./routes";
import { QueryClient, QueryClientProvider } from 'react-query';

import { RootHooks } from './hooks/rootHooks';

import "./styles/globalStyles.scss";

const queryClient = new QueryClient();

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RootHooks>
        <Router/>
      </RootHooks>
    </QueryClientProvider>
  );
}
