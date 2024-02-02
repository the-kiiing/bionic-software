import { Routes, Route } from "react-router-dom";
import Tb from "./Tb";
import Navbar from "./Navbar";

export default function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Tb />} />
      </Routes>
    </div>
  );
}
