import "./style.css";
import MalaDespachada from "../../assets/images/suitcase 1.png";
import MaladeMao from "../../assets/images/mala-de-viagem 2.png";
import ArtigoPessoal from "../../assets/images/mochila 1.png";
import logo from "../../assets/images/logo-preta.png";
import { useEffect, useState } from "react";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import { NavBar } from "../../components/NavBar";

export const MalasSalvas = () => {
  const [data, setData] = useState<Array<any>>([]);
  const [selectId, SetSelectId] = useState<string>("");
  const [pressedCard, setPressedCard] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    //bucando o array de categorias do servidor
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await Axios.get("http://localhost:5000/malaUsuario", {
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

  const handleImgMalasSalvas = (tipo: string) => {
    if (tipo == "Mala Despachada") return MalaDespachada;
    if (tipo == "Artigo Pessoal") return ArtigoPessoal;
    if (tipo === "Mala de Mao") return MaladeMao;
  };

  const goToBagagemVirtual = () => {
    navigate("/bagagem-virtual");
  };

  const postIdMalas = async () => {
    localStorage.setItem("idMala", selectId);
    goToBagagemVirtual();
  };

  const handleClickCard = (idBagagem) => {
    if (idBagagem == pressedCard) {
      setPressedCard(null);
    } else {
      setPressedCard(idBagagem);
    }
  };

  return (
    <>
      <NavBar img={logo} />

      <div className="Pagina">
        <h1>Malas Salvas</h1>
        <div className="containerMalasSalvas">
          <div className="containerCardsMalaSalva">
            {data.map((mala) => (
              <div
                onClick={() => {
                  SetSelectId(mala.idBagagem);
                  handleClickCard(mala.idBagagem);
                }}
                key={mala.idBagagem}
                className={`cardMalaSalva ${
                  pressedCard == mala.idBagagem ? "pressedCardMala" : ""
                }`}
              >
                <img
                  className="ImgMalasSalvas"
                  src={handleImgMalasSalvas(mala.tipoBagagem)}
                  alt=""
                />
                <div className="conteudocardMalaSalva">
                  <h4>{mala.nomeBagagem}</h4>
                  <div className="infoMalasSalvas">
                    <h5>Tipo da mala: </h5>
                    <span>{mala.tipoBagagem}</span>
                  </div>
                  <div className="infoMalasSalvas">
                    <h5>Qtd de Itens: </h5>
                    <span>{mala.qtdItens}</span>
                  </div>
                  <div className="infoMalasSalvas">
                    <h5>Peso: </h5>
                    <span>{mala.pesoBagagem}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <button onClick={postIdMalas} className="btnSalvar btnMalasSalvas">
            Continuar
          </button>
        </div>
      </div>
    </>
  );
};
