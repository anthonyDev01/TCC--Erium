import "./style.css";

import add from "../../assets/images/icons/add.png";
import sub from "../../assets/images/icons/sub.png";
import { useState } from "react";

export function InventoryCard({
  item,
  onRemove,
  aumentarQuantidade,
  diminuirQuantidade,
}) {
  const [quantity, setQuantity] = useState(item.quantidade);

  const increaseQuantity = () => {
    const newQuantity = quantity + 1;
    aumentarQuantidade();
    setQuantity(newQuantity);
  };

  const decreaseQuantity = () => {
    if (quantity > 0) {
      const newQuantity = quantity - 1;
      setQuantity(newQuantity);
      diminuirQuantidade()
      if (newQuantity === 0) {
        onRemove(item);
      }
    }
  };

  const calculateWeight = (qtd: number) => {
    let weight = item.peso * qtd;

    if (weight >= 1000) {
      const weightKg = (weight / 1000).toFixed(1);
      return `${weightKg} kg`;
    } else {
      const weightG = weight.toFixed(1);
      return `${weightG} g`;
    }
  };

  return (
    <div className="inventoryCard">
      <h4>{item.nome}</h4>
      <img src={item.imagem} alt="" />
      <div className="inputInventoryContainer">
        <button onClick={decreaseQuantity}>
          <img src={sub} alt="Decrease" />
        </button>

        <div>{quantity}</div>
        <button onClick={increaseQuantity}>
          <img src={add} alt="Increase" />
        </button>
      </div>
      <span>{calculateWeight(quantity)}</span>
    </div>
  );
}
