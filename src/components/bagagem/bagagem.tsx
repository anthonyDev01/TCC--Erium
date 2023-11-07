import "./style.css";
import malaFechada from "../../assets/images/malaFechada.png";
import malaAberta from "../../assets/images/mala.png";

import { useEffect, useState } from "react";
import { Inventario } from "../inventario/inventario";
import Axios from "axios";
import { PopupSave } from "../popupSave/popupSave";
import { AnimatePresence } from "framer-motion";
import { InfoSvgIcon } from "../infoSvgIcon/infoSvgIcon";
import { InfoCard } from "../infoCard/infoCard";

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
  const [tipoMala, setTipoMala] = useState<String>("");
  const [peso, setPeso] = useState<String>("");
  const [quantidadeMala, setQuantidadeMala] = useState<Number>();
  const [infoCardClick, setInfoCardClick] = useState<Boolean>(false);
  const [savedData, setSavedData] = useState([]);

  useEffect(() => {
    const calcularPeso = () => {
      const peso = localStorage.getItem("peso");
      setQuantidadeMala(getQuantidade() + 1);
      console.log(quantidadeMala);
      
      setPeso(peso);
    };

    calcularPeso();
  }, [localStorage.getItem("peso")]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const id = localStorage.getItem("idMala");

    const fetchTipoBagagem = async () => {
      await Axios.get(`http://localhost:5000/bagagem-tipo?id=${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then((response) => {
        setTipoMala(response.data[0].tipoBagagem);
      });
    };

    const fetchItensSalvo = async () => {
      await Axios.get(`http://localhost:5000/bagagem?id=${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then((response) => {
        setSavedData(response.data);
      });
    };

    fetchItensSalvo();
    fetchTipoBagagem();
  }, []);

  const handleClickInventory = () => {
    setInventoryClick(!inventoryClick);
  };

  const handleInfoCardClick = () => {
    setInfoCardClick(!infoCardClick);
  };

  const handleSuitcaseInfo = (peso: String) => {
    var status = "";

    if (tipoMala == "Mala Despachada") {
      if (peso >= 26000) status = "ultrapassou";
      if (peso >= 23000 && peso <= 26000) status = "alerta";
      if (peso < 23000) status = "ok";
    }

    return status;
  };

  const handleColor = () => {
    const status = handleSuitcaseInfo(peso);

    if (status == "ultrapassou") return "vermelho";
    if (status == "alerta") return "amarelo";
    if (status == "ok") return "verde";
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
        const salvarItens = () => {
          Axios.post(
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
        };

        const salvarMala = () => {
          Axios.put(
            `http://localhost:5000/mala-peso-quantidade?id=${idMala}`,
            {
              idMala: idMala,
              peso: getPesoString(),
              quantidade: getQuantidade(),
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
        };

        salvarMala();
        salvarItens();
      } catch (error) {
        console.error("Erro ao salvar itens:", error);
      }
    }
  };

  const getPesoString = () => {
    const itens = [...props.item, ...savedData];
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

  const getPesoNumber = () => {
    const itens = [...props.item, ...savedData];
    let peso = 0;

    for (let item of itens) {
      peso += item.peso * item.quantidade;
    }

    localStorage.setItem("peso", peso.toString());

    return peso;
  };

  getPesoNumber();

  const getQuantidade = () => {
    const itens = [...props.item, ...savedData];
    let quantidade = 0;

    for (let item of itens) {
      quantidade += item.quantidade;
    }

    return quantidade;
  };

  const diminuirQuantidade = () =>{
    setQuantidadeMala(getQuantidade() - 1)
  }

  const aumentarQuantidade = () =>{
    setQuantidadeMala(getQuantidade() + 1)
  }

  return (
    <div className="bagagem">
      <div className="malaIconContainer">
        <InfoSvgIcon
          handleInfoCardClick={handleInfoCardClick}
          status={handleSuitcaseInfo(peso)}
        />
        <img
          src={
            props.closeInfo == true || inventoryClick == true
              ? malaAberta
              : malaFechada
          }
          alt=""
          onClick={handleClickInventory}
        />
      </div>

      <Inventario
        item={props.item}
        inventoryClick={inventoryClick}
        setInventoryClick={setInventoryClick}
        aumentarQuantidade={aumentarQuantidade}
        diminuirQuantidade={diminuirQuantidade}
      />

      <div className="ContainerConteudo">
        <div className="pesoItem">
          <p>
            Peso Aproximado:{" "}
            <span className={handleColor()}>{getPesoString()}</span>
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

      <AnimatePresence>
        {infoCardClick && (
          <InfoCard
            status={handleSuitcaseInfo(peso)}
            handleInfoCardClick={handleInfoCardClick}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
