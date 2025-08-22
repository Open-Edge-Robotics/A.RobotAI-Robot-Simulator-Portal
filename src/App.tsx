import { BrowserRouter, Route, Routes } from "react-router-dom";

import { ToastProvider } from "innogrid-ui";

import Layout from "./components/layout";
import DashboardPage from "./pages/dashboard";
import MecPage from "./pages/mec";
import SimulationPage from "./pages/simulation";
import SimulationCreatePage from "./pages/simulation/create";
import SimulationEditPage from "./pages/simulation/edit";
import TemplatePage from "./pages/template";

import "./App.css";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<DashboardPage />} />
      <Route path="/simulation">
        <Route index element={<SimulationPage />} />
        <Route path="create" element={<SimulationCreatePage />} />
        <Route path=":id/edit" element={<SimulationEditPage />} />
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
