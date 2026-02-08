import "./style/App.css";
import MainLayout from "./components/layout/MainLayout";
import LazyRouter from "./router/LazyRouter";
import { BrowserRouter } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <MainLayout>
        <LazyRouter />
      </MainLayout>
    </BrowserRouter>
  );
}

export default App;
