import "./style/App.css";
import MainLayout from "./components/layout/main/MainLayout";
import LazyRouter from "./components/router/LazyRouter";
import { ThemeProvider } from "./components/hooks/theme/ThemeContext";
import { queryClient } from "./setting/reactQuery/QueryClient";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { ActiveButtonProvider } from "./components/context/ActiveButtonContext";

function App() {
  return (
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
        <ActiveButtonProvider>
          <MainLayout>
            <LazyRouter />
          </MainLayout>
        </ActiveButtonProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
