import "../opcoesmala/style.css";
import MalaDespachada from "../../assets/images/suitcase 1.png";
import MaladeMao from "../../assets/images/mala-de-viagem 2.png";
import ArtigoPessoal from "../../assets/images/mochila 1.png";
import fechar from "../../assets/images/icons/botao-fechar.png";
import logo from "../../assets/images/logo-preta.png"
import { useState } from "react";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import { NavBar } from "../../components/NavBar";

export function OpcoesMala() {
  const [openName, SetOpenName] = useState<boolean>(false);
  const [selectedButton, setSelectedButton] = useState<string>("");
  const [inputValue, setInputValue] = useState<string>("");
  const navigate = useNavigate();

  const handleButtonClick = (buttonName: string) => {
    setSelectedButton(buttonName);
  };

  const handleOpenNameSelect = () => {
    SetOpenName(!openName);
  };

  const handleInputChange = (e: any) => {
    setInputValue(e.target.value);
  };

  const postMala = () => {
    const token = localStorage.getItem("token");
    localStorage.setItem("idMala", "");

    if (inputValue.length > 0) {
      Axios.post(
        "http://localhost:5000/malaUsuario",
        {
          nome: inputValue,
          tipo: selectedButton,
          peso: 0,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      handleOpenNameSelect();
      navigate("/bagagem-virtual");
    }
  };

  return (
    <>
    <NavBar img={logo} />
      <div className="Pagina">
        <h1>Escolha o Tipo de Mala</h1>

        <div className="conteinerOpcoesMala">
          <button
            className={
              selectedButton == "Mala Despachada"
                ? "buttonSelected cardOpcoesMala"
                : "cardOpcoesMala"
            }
            onClick={() => handleButtonClick("Mala Despachada")}
          >
            <img src={MalaDespachada} alt="Texto Alternativo" />
            <div className="containerConteudoOpcoesMala">
              <h2> Mala Despachada</h2>
              <p>
                Suporta até 23 kg contando o peso da mala e necessita despachar
              </p>
            </div>
          </button>

          <button
            className={
              selectedButton == "Mala de Mao"
                ? "buttonSelected cardOpcoesMala"
                : "cardOpcoesMala"
            }
            onClick={() => handleButtonClick("Mala de Mao")}
          >
            <img src={MaladeMao} alt="Texto Alternativo" />
            <div className="containerConteudoOpcoesMala">
              <h2> Mala de Mão </h2>
              <p>
                {" "}
                Suporta até 10 kg contando o peso da mala respeitando as
                dimensões de acordo com a sua pesagem.
              </p>
            </div>
          </button>

          <button
            className={
              selectedButton == "Artigo Pessoal"
                ? "buttonSelected cardOpcoesMala"
                : "cardOpcoesMala"
            }
            onClick={() => handleButtonClick("Artigo Pessoal")}
          >
            <img src={ArtigoPessoal} alt="Texto Alternativo" />
            <div className="containerConteudoOpcoesMala">
              <h2> Artigo Pessoal </h2>
              <p>
                {" "}
                Suporta até 10 kg contando o peso da mala respeitando as
                dimensões de acordo com a sua pesagem.
              </p>
            </div>
          </button>

          <button className="confirmar" onClick={handleOpenNameSelect}>
            {" "}
            Confirmar{" "}
          </button>
        </div>

        {openName && selectedButton && (
          <div className="darkBackground">
            <div className="selecionarNome">
              <img src={fechar} alt="fechar" onClick={handleOpenNameSelect} />
              <h2>Insira o nome da sua mala</h2>
              <div className="nomeInputContainer">
                <span>nome: </span>
                <input
                  maxLength={20}
                  type="text"
                  onChange={handleInputChange}
                />
              </div>
              <button className="buttonContinuar" onClick={postMala}>
                Continuar
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
