import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./styles/index.css";
import Home from "./pages/Home";
import Background from "./components/Background";
import { Toaster } from "@/components/ui/sonner";

function App() {
  document.documentElement.classList.add("dark");
  return (
    <>
      <Toaster position="top-right" />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
      <Background />
    </>
  );
}

export default App;
