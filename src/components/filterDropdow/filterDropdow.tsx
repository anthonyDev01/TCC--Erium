import "./style.css";
import botaoFechar from "../../assets/images/icons/botao-fechar.png";

interface filterDropdowProps {
  handleDropdow: () => void;
  setCategory: React.Dispatch<React.SetStateAction<string>>;
}

export function FilterDropdow(props: filterDropdowProps) {
  return (
    <div className="filterDropdow">
      <div className="close">
        <img
          src={botaoFechar}
          alt="botao para fechar"
          onClick={props.handleDropdow}
        />
      </div>
      <div className="filterOptions" onClick={props.handleDropdow}>
        <span onClick={() => props.setCategory("roupas")}>Roupas</span>
        <span onClick={() => props.setCategory("eletronicos")}>eletronicos</span>
        <span onClick={() => props.setCategory("acessorios")}>acessorios</span>
        <span onClick={() => props.setCategory("higiene")}>Higiene</span>
        <span onClick={() => props.setCategory("medicamentos")}>Medicamentos</span>
        <span onClick={() => props.setCategory("esportivos")}>Esportivos</span>
        <span onClick={() => props.setCategory("outros")}>Outros</span>
      </div>
    </div>
  );
}
