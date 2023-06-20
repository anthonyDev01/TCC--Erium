import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { LoginCadastro } from "./pages/loginCadastro";
import { Home } from "./pages/home";
import { BagagemVirtual } from "./pages/bagagemVirtual/bagagemVirtual";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginCadastro />} />
        <Route path="/bagagem-virtual" element={<BagagemVirtual />} />
      </Routes>
    </Router>
  );
}

export default App;
