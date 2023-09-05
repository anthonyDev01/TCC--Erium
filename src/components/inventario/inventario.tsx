import { InventoryCard } from "../inventoryCard/inventoryCard";
import "./style.css";
import fechar from "../../assets/images/icons/botao-fechar.png";
import Axios from "axios";

export function Inventario(props) {
  const postItens = () => {
    const itens = props.item;

    for (let item of itens) {
      Axios.post("http://localhost:5000/bagagem", {
        nome: item.nome,
        peso: item.peso,
        imagem: "imagem.png",
        quantidade: item.quantidade,
      })
        .then((response) => {
          console.log("Requisição POST bem-sucedida:", response.data);
        })
        .catch((error) => {
          console.error("Erro na requisição POST:", error);
        });
    }
  };

  return (
    <div
      className={
        props.inventoryClick
          ? "inventario showInventory"
          : "inventario hiddenInventory"
      }
    >
      <div className="inventioCards">
        {props.item.map((item) => (
          <InventoryCard item={item} key={item.nome} />
        ))}
        <div
          className="closeInventory"
          onClick={() => props.setInventoryClick(false)}
        >
          <img src={fechar} alt="" />
        </div>
      </div>
    </div>
  );
}
