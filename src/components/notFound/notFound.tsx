import "./style.css";
import { Link } from "react-router-dom";



export function NotFound(){
    return(
        <div>
        <h1>404 - Página não encontrada</h1>
        <p>A página "{location.pathname}" não existe.</p>
        <p>
          <Link to="/">Ir para a página inicial</Link>
        </p>
      </div>
    )
}