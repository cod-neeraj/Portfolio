import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./Home";
import ProjectDetails from "./components/ProjectDetails"

function App() {
  return (
    <Routes>
      {/* Home Page */}
      <Route path="/" element={<Home />} />
      <Route path="/project/:id" element={<ProjectDetails />} />
    </Routes>
  );
}

export default App;