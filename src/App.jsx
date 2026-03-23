import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import Calculator from './pages/Calculator';
import Budget from './pages/Budget';
import Navbar from "./components/Navbar";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/calculator" element={<Calculator />} />
        <Route path="/budget" element={<Budget />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App