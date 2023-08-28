import "./style.css";
import mala from "../../assets/images/mala.png";
import { useContext, useState } from "react";
import { Inventario } from "../inventario/inventario";


export function Bagagem({item}) {
  const [inventoryClick, setInventoryClick] = useState<Boolean>(false);

  
  const handleClickInventory = () => {
    setInventoryClick(!inventoryClick);
    
    
  };

  return (
    <div className="bagagem">
      <img src={mala} alt="" onClick={handleClickInventory} />

      <Inventario item={item} inventoryClick={inventoryClick} setInventoryClick={setInventoryClick}/>

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
