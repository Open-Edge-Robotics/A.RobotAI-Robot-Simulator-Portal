import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";

import HomePage from "./pages/home";
import Layout from "./components/layout";
import TemplatePage from "./pages/template";
import MecPage from "./pages/mec";
import SimulationPage from "./pages/simulation";
import SimulationCreatePage from "./pages/simulation/create";
import { ToastProvider } from "innogrid-ui";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/simulation">
        <Route index element={<SimulationPage />} />
        <Route path="create" element={<SimulationCreatePage />} />
      </Route>
      <Route path="/template" element={<TemplatePage />} />
      <Route path="/mec" element={<MecPage />} />
    </Routes>
  );
}

function App() {
  return (
    <BrowserRouter>
      <ToastProvider>
        <Layout>
          <AppRoutes />
        </Layout>
      </ToastProvider>
    </BrowserRouter>
  );
}

export default App;
