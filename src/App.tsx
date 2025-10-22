import { BrowserRouter, Route, Routes } from "react-router-dom";

import Layout from "./components/layout";
import { SEGMENTS } from "./constants/navigation";
import LoginPage from "./pages/(auth)/login";
import SignupPage from "./pages/(auth)/signup";
import DashboardPage from "./pages/dashboard";
import MecPage from "./pages/mec";
import SimulationListPage from "./pages/simulation";
import SimulationCreatePage from "./pages/simulation/create";
import SimulationDetailPage from "./pages/simulation/detail";
import SimulationResultPage from "./pages/simulation/result";
import TemplatePage from "./pages/template";
import TemplateCreatePage from "./pages/template/create";
import TemplateEditPage from "./pages/template/edit";

import "./App.css";

function AppRoutes() {
  return (
    <Routes>
      <Route path={SEGMENTS.absolute.home} element={<DashboardPage />} />
      <Route path={SEGMENTS.absolute.simulation}>
        <Route index element={<SimulationListPage />} />
        <Route path={SEGMENTS.relative.create} element={<SimulationCreatePage />} />
        <Route path=":simulationId" element={<SimulationDetailPage />} />
        <Route path=":simulationId/result/:executionId" element={<SimulationResultPage />} />
      </Route>
      <Route path={SEGMENTS.absolute.template}>
        <Route index element={<TemplatePage />} />
        <Route path={SEGMENTS.relative.create} element={<TemplateCreatePage />} />
        <Route path={`:id/${SEGMENTS.relative.edit}`} element={<TemplateEditPage />} />
      </Route>
      <Route path={SEGMENTS.absolute.mec} element={<MecPage />} />
      <Route path={SEGMENTS.absolute.signup} element={<SignupPage />} />
      <Route path={SEGMENTS.absolute.login} element={<LoginPage />} />
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
