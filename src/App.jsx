import { Routes, Route } from "react-router-dom";
import Tb from "./Tb";
import Fb from "./Fb";
import Ab from "./Ab";
import Navbar from "./Navbar";

export default function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Tb />} />
        <Route path="/fb" element={<Fb />} />
        <Route path="/ab" element={<Ab />} />
      </Routes>
    </div>
  );
}
