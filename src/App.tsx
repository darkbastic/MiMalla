import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import MallaPage from "./pages/MallaPage";

function App() {
  return (
    <div
      style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
    >
      <Navbar />
      <main style={{ flexGrow: 1, padding: "1rem" }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="crear-malla" element={<MallaPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
