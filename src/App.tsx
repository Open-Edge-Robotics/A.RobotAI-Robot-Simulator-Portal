import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";

import SimulationPage from "./pages/Simulation";
import HomePage from "./pages/Home";
import Layout from "./components/layout";
import TemplatePage from "./pages/Template";
import MecPage from "./pages/Mec";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/simulation" element={<SimulationPage />} />
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
    </BrowserRouter>
  );
}

export default App;
