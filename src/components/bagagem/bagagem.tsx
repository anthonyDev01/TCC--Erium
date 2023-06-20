import "./style.css";
import mala from "../../assets/images/mala.png";

export function Bagagem() {
  return (
    <div className="bagagem">
      <img src={mala} alt="" />
      <div className="ContainerConteudo">
        <p>
          Peso Aproximado: <span className="peso">16kg </span>
        </p>
        <p>
          Itens: <span>30</span>
        </p>
      </div>
    </div>
  );
}
