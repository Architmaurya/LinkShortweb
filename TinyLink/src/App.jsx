import { Routes, Route } from "react-router-dom";
import Home from "./pages/ShortenerPage";
import RedirectPage from "./pages/RedirectPage";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/:shortId" element={<RedirectPage />} />
    </Routes>
  );
}
