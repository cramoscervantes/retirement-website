import { HashRouter, Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import Calculator from './pages/Calculator';
import Budget from './pages/Budget';
import Navbar from "./components/Navbar";

function App() {
  return (
    <HashRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/calculator" element={<Calculator />} />
        <Route path="/budget" element={<Budget />} />
      </Routes>
    </HashRouter>
  )
}

export default App