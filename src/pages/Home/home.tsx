import homem from "../../assets/images/homem-home.png";
import mulher from "../../assets/images/mulher-home.png";
import malas from "../../assets/images/icons/malas.png";
import passaporte from "../../assets/images/icons/passaporte.png";

import "./index.css";
import { Link } from "react-router-dom";

export function Home() {
  return (
    <div className="pageHome">
      <div className="containerHome">
        <img
          className="ilustracaoMain"
          src={mulher}
          alt="ilustracao de um homem"
        />

        <div className="opcoesContainer">
          <Link className="cardOpcao" to="/opcoes-mala">
            <h2>Arrume sua Mala</h2>
            <img src={malas} alt="ilustracai de uma mala" />
          </Link>

          <Link className="cardOpcao" to="">
            <h2>Verifique seu Visto</h2>
            <img src={passaporte} alt="ilustracao de um passaporte" />
          </Link>
        </div>

        <img
          className="ilustracaoMain"
          src={homem}
          alt="ilustracao de uma mulher"
        />
      </div>
    </div>
  );
}
