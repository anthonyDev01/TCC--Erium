import homem from "../../assets/images/homem-home.png";
import mulher from "../../assets/images/mulher-home.png";
import malas from "../../assets/images/icons/malas.png";
import passaporte from "../../assets/images/icons/passaporte.png";
import logo from "../../assets/images/logo-preta.png"

import "./index.css";
import { Link } from "react-router-dom";
import { OpcaoHome } from "../../components/opcaoHome/opcaoHome";
import { useState } from "react";
import { NavBar } from "../../components/NavBar";

export function Home() {
  const [closeOpcao, setCloseOpcao] = useState<boolean>(false);

  const handleOpcaoHome = () => {
    setCloseOpcao(!closeOpcao);
  };

  return (
    <>
      <NavBar img={logo} />
      <div className="pageHome">
        <div className="containerHome">
          <img
            className="ilustracaoMain"
            src={mulher}
            alt="ilustracao de um homem"
          />

          <div className="opcoesContainer">
            <div className="cardOpcao" onClick={handleOpcaoHome}>
              <h2>Arrume sua Mala</h2>
              <img src={malas} alt="ilustracao de uma mala" />
            </div>

            {closeOpcao && <OpcaoHome setCloseOpcao={setCloseOpcao} />}

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
    </>
  );
}
