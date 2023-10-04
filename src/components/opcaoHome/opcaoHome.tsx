import "./style.css";
import fechar from "../../assets/images/icons/fechar.png"
import malas from "../../assets/images/icons/malas-de-viagem.png"
import adicionar from "../../assets/images/icons/adicionar.png"
import { Link } from "react-router-dom";

interface OpcaoHomeProps {
    setCloseOpcao: React.Dispatch<React.SetStateAction<boolean>>;
    
  }

export function OpcaoHome(props: OpcaoHomeProps) {
  return (
    <div className="darkBackground">
      <div className="containerOpcaoHome">

      <img className="fecharOpcaosMala" src={fechar} alt="fechar" onClick={() => props.setCloseOpcao(false)}/>

        <Link className="cardOpcaoHome" to="/opcoes-mala">
        <h3>Criar nova mala</h3>
            <img src={adicionar} alt="" />
        </Link>

        <Link className="cardOpcaoHome" to="/malas-salvas">
            <h3>Malas salvas</h3>
            <img src={malas} alt="malas" />
        </Link>

      </div>
    </div>
  );
}
