import { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
  useNavigate,
} from "react-router-dom";
import Axios from "axios";
import { LoginCadastro } from "./pages/loginCadastro";
import { Home } from "./pages/Home/home";
import { BagagemVirtual } from "./pages/bagagemVirtual/bagagemVirtual";
import { NotFound } from "./components/notFound/notFound";
import { OpcoesMala } from "./pages/opcoesmala/opcoesMala";

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

  const validateToken = () => {
    const token = localStorage.getItem("token");

    if (token) {
      Axios.get("http://localhost:5000/pagina-protegida", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => {
          // O token é válido, o usuário está autenticado
          console.log(response.data);
        })
        .catch(() => {
          // Ocorreu um erro ou o token é inválido, volta para pagina de login
          navigate("/login", { replace: true });
        });
    } else {
      // Token não encontrado no localStorage
      console.log("Token não encontrado");
    }
  };

  validateToken();

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
        <>
          <Route path="/bagagem-virtual" element={<BagagemVirtual />} />
          <Route path="/opcoes-mala" element={<OpcoesMala />} />
        </>
      )}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
