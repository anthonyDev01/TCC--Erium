import { InventoryCard } from "../inventoryCard/inventoryCard";
import "./style.css";
import fechar from "../../assets/images/icons/botao-fechar.png";
import { useEffect, useState } from "react";
import Axios from "axios";

export function Inventario(props) {
  const [savedItens, SetsavedItens] = useState([
    {
      nome: "",
      imagem: "",
      peso: 0,
      quantidade: 0,
    },
  ]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const idMala = Number(localStorage.getItem("idMala"));

        const response = await Axios.get(
          `http://localhost:5000/bagagem?id=${idMala}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        SetsavedItens(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const handleRemoveItem = (itemToRemove: any) => {
    const updatedItems = props.item.filter((item) => item !== itemToRemove);
    props.setItems(updatedItems);
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
          <InventoryCard
            item={item}
            key={item.nome}
            onRemove={handleRemoveItem}
            aumentarQuantidade={props.aumentarQuantidade}
            diminuirQuantidade={props.diminuirQuantidade}
          />
        ))}
        {savedItens[0].nome != "" &&
          savedItens.map((item) => (
            <InventoryCard
              item={item}
              key={item.nome}
              onRemove={handleRemoveItem}
              aumentarQuantidade={props.aumentarQuantidade}
              diminuirQuantidade={props.diminuirQuantidade}
            />
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
