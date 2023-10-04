import { InventoryCard } from "../inventoryCard/inventoryCard";
import "./style.css";
import fechar from "../../assets/images/icons/botao-fechar.png";
import { useEffect, useState } from "react";
import Axios from "axios";

export function Inventario(props) {
  const [data, setData] = useState([{
    nome: "",
    imagem: "",
    peso: 0,
    quantidade: 0,
  }]);

  useEffect(() => {
    //bucando o array de categorias do servidor
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const idMala = Number(localStorage.getItem("idMala"));

        const response = await Axios.get(`http://localhost:5000/bagagem?id=${idMala}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setData(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  

  const handleSavedItems = () =>{
    if(data){
      data.map((item) => (
        <InventoryCard item={item} key={item.nome} />
      ))
    }
  }

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
        {
          data[0].nome != "" && data.map((item) => (
            <InventoryCard item={item} key={item.nome} />
          ))
        }
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
