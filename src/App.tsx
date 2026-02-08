import "./style/App.css";
import MainLayout from "./components/layout/MainLayout";
import LazyRouter from "./router/LazyRouter";
function App() {
  return (

          <MainLayout>
            <LazyRouter />
          </MainLayout>

  );
}

export default App;
