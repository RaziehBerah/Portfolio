import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import PhotographyPage from "./pages/PhotographyPage";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/photography" element={<PhotographyPage />} />
    </Routes>
  );
}