import { InventoryCard } from "../inventoryCard/inventoryCard";
import "./style.css";
import fechar from "../../assets/images/icons/botao-fechar.png";


export function Inventario(props) {

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
