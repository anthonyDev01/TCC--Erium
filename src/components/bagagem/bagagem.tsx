import "./style.css";
import malaFechada from "../../assets/images/malaFechada.png";
import malaAberta from "../../assets/images/mala.png";
import { useState } from "react";
import { Inventario } from "../inventario/inventario";


interface BagagemProps {
  item: React.Dispatch<React.SetStateAction<any>>;
  closeInfo: React.Dispatch<React.SetStateAction<any>>;

}

export function Bagagem(props: BagagemProps) {
  const [inventoryClick, setInventoryClick] = useState<Boolean>(false);

  const handleClickInventory = () => {
    setInventoryClick(!inventoryClick);
    
    
  };

  return (
    <div className="bagagem">
      <img src={props.closeInfo == true || inventoryClick == true ? malaAberta : malaFechada} alt="" onClick={handleClickInventory} />

      <Inventario item={props.item} inventoryClick={inventoryClick} setInventoryClick={setInventoryClick}/>

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
