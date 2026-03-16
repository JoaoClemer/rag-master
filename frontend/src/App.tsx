import { BrowserRouter, Routes, Route } from "react-router-dom";
import DashboardPage from "./pages/DashboardPage";
import KnowledgeBaseDetailsPage from "./pages/KnowledgeBaseDetailsPage";
import ChatPlaygroundPage from "./pages/ChatPlaygroundPage";
import RetrievalInspectorPage from "./pages/RetrievalInspectorPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/knowledge-base" element={<KnowledgeBaseDetailsPage />} />
        <Route path="/playground" element={<ChatPlaygroundPage />} />
        <Route path="/inspector" element={<RetrievalInspectorPage />} />
      </Routes>
    </BrowserRouter>
  );
}
