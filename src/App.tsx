import { BrowserRouter, Route, Routes } from "react-router-dom";

import Layout from "./components/layout";
import { SEGMENTS } from "./constants/navigation";
import DashboardPage from "./pages/dashboard";
import MecPage from "./pages/mec";
import SimulationListPage from "./pages/simulation";
import SimulationCreatePage from "./pages/simulation/create";
import SimulationDetailPage from "./pages/simulation/detail";
import TemplatePage from "./pages/template";
import TemplateCreatePage from "./pages/template/create";

import "./App.css";

function AppRoutes() {
  return (
    <Routes>
      <Route path={SEGMENTS.absolute.home} element={<DashboardPage />} />
      <Route path={SEGMENTS.absolute.simulation}>
        <Route index element={<SimulationListPage />} />
        <Route path={SEGMENTS.relative.create} element={<SimulationCreatePage />} />
        <Route path=":id" element={<SimulationDetailPage />} />
      </Route>
      <Route path={SEGMENTS.absolute.template}>
        <Route index element={<TemplatePage />} />
        <Route path={SEGMENTS.relative.create} element={<TemplateCreatePage />} />
      </Route>
      <Route path={SEGMENTS.absolute.mec} element={<MecPage />} />
    </Routes>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <AppRoutes />
      </Layout>
    </BrowserRouter>
  );
}

export default App;
