import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import Layout from "./components/layout";
import DashboardPage from "./pages/dashboard";
import MecPage from "./pages/mec";
import SimulationListPage from "./pages/simulation";
import SimulationCreatePage from "./pages/simulation/create";
import SimulationDetailPage from "./pages/simulation/detail";
import SimulationEditPage from "./pages/simulation/edit";
import TemplatePage from "./pages/template";

import "./App.css";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<DashboardPage />} />
      <Route path="/simulation">
        <Route index element={<SimulationListPage />} />
        <Route path="create" element={<SimulationCreatePage />} />
        <Route path=":id" element={<SimulationDetailPage />} />
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
      <Layout>
        <AppRoutes />
      </Layout>
      <ToastContainer position="top-center" newestOnTop autoClose={3000} />
    </BrowserRouter>
  );
}

export default App;
