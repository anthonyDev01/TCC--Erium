import { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { LoginCadastro } from "./pages/loginCadastro";
import { Home } from "./pages/home";
import { BagagemVirtual } from "./pages/bagagemVirtual/bagagemVirtual";
import { NotFound } from "./components/notFound/notFound";

function App() {
  return (
    <Router>
      <AuthChecker />
    </Router>
  );
}

function AuthChecker() {
  const isAuthenticated = !!localStorage.getItem("token");
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token && location.pathname !== "/login") {
      navigate("/login", { replace: true });
    }
  }, [location, navigate]);

  return (
    <Routes>
      <Route path="/login" element={<LoginCadastro />} />
      {isAuthenticated ? (
        <Route path="/" element={<Home />} />
      ) : (
        <Route path="" element={<Navigate to="/login" replace />} />
      )}
      {isAuthenticated && (
        <Route path="/bagagem-virtual" element={<BagagemVirtual />} />
      )}
      <Route path="" element={<NotFound />} />
    </Routes>
  );
}

export default App;
