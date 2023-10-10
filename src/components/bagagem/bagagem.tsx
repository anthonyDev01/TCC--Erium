import "./style.css";
import malaFechada from "../../assets/images/malaFechada.png";
import malaAberta from "../../assets/images/mala.png";
import happySuitCase from "../../assets/images/happySuitCase.png";

import { useState } from "react";
import { Inventario } from "../inventario/inventario";
import Axios from "axios";
import { PopupSave } from "../popupSave/popupSave";
import { motion, AnimatePresence } from "framer-motion";

interface Item {
  nome: string;
  peso: number;
  imagem: string;
  quantidade: number;
}

interface BagagemProps {
  item: Item[];
  closeInfo: React.Dispatch<React.SetStateAction<any>>;
}

export function Bagagem(props: BagagemProps) {
  const [inventoryClick, setInventoryClick] = useState<Boolean>(false);
  const [popupOpen, setPopupOpen] = useState<Boolean>(false);

  const handleClickInventory = () => {
    setInventoryClick(!inventoryClick);
  };

  const handleClickPopup = () => {
    setPopupOpen(!popupOpen);
  };

  const postItens = async () => {
    const itens = props.item;
    const token = localStorage.getItem("token");
    const idMala = localStorage.getItem("idMala");
    if (itens.length > 0) {
      try {
        await Axios.post(
          `http://localhost:5000/bagagem?id=${idMala}`,
          {
            idMala: idMala,
            itens: itens,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setInventoryClick(false);
        handleClickPopup();
      } catch (error) {
        console.error("Erro ao salvar itens:", error);
      }
    }
  };

  const getPeso = () => {
    const itens = props.item;
    const umKilo = 1000;
    let peso = 0;

    for (let item of itens) {
      peso += item.peso * item.quantidade;
    }

    if (peso >= umKilo) {
      const pesoKg = (peso / umKilo).toFixed(1);
      return `${pesoKg} kg`;
    } else {
      const pesoG = peso.toFixed(1);
      return `${pesoG} g`;
    }
  };

  const getQuantidade = () => {
    const itens = props.item;
    let quantidade = 0;

    for (let item of itens) {
      quantidade += item.quantidade;
    }

    return quantidade;
  };

  return (
    <div className="bagagem">
      <img
        src={
          props.closeInfo == true || inventoryClick == true
            ? malaAberta
            : malaFechada
        }
        alt=""
        onClick={handleClickInventory}
      />

      <Inventario
        item={props.item}
        inventoryClick={inventoryClick}
        setInventoryClick={setInventoryClick}
      />

      <div className="ContainerConteudo">
        <div className="pesoItem">
          <p>
            Peso Aproximado: <span className="peso">{getPeso()}</span>
          </p>
          <p>
            Itens: <span>{getQuantidade()}</span>
          </p>
        </div>
        <button className="btnSalvar" onClick={postItens}>
          {" "}
          Salvar
        </button>
      </div>

      <AnimatePresence>
        {popupOpen && (
          <PopupSave setPopupOpen={setPopupOpen} popupOpen={popupOpen} />
        )}
      </AnimatePresence>
    </div>
  );
}
