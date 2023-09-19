import "./style.css";

import add from "../../assets/images/icons/add.png";
import sub from "../../assets/images/icons/sub.png";
import { useState } from "react";
import Axios from "axios";

export function InventoryCard({ item }) {
  const [selectedProduct, setSelectedProduct] = useState<any>({
    //estado onde vai ser armazenado o item clicado
    nome: "",
    imagem: "",
    peso: 0,
    quantidade: 0,
    tipos: [],
  });

  const [quantity, setQuantity] = useState(item.quantidade);

  console.log(item.peso);

  const increaseQuantity = () => {
    const newQuantity = quantity + 1;
    setQuantity(newQuantity);
  };

  const decreaseQuantity = () => {
    if (quantity > 0) {
      const newQuantity = quantity - 1;
      setQuantity(newQuantity);
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

  const postItens = () => {
    const token = localStorage.getItem("token");

  Axios.post("http://localhost:5000/bagagem", {
  nome: item.nome,
  peso: item.peso,
  imagem: "imagem.png",
  quantidade: quantity,
}, {
  headers: {
    'Authorization': `Bearer ${token}`,
  },
})
  };
  







  return (
    <div onClick={() => setSelectedProduct(item)} className="inventoryCard">
      <h4>{item.nome}</h4>
      <img src={item.imagem} alt="" />
      <div className="inputInventoryContainer">
        <button onClick={increaseQuantity}>
          <img src={add} alt="Increase" />
        </button>
        <div>{quantity}</div>
        <button onClick={decreaseQuantity}>
          <img src={sub} alt="Decrease" />
        </button>
      </div>
      <span>{calculateWeight(quantity)}</span>
    </div>
  );
}
