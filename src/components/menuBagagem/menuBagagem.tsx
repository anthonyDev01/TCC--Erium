import "./style.css";
import { useState, useEffect } from "react";
import Axios from "axios";

const pathImage = "http://localhost:5000/imagens/"; //caminho das imagens
import setaDireita from "../../assets/images/icons/seta-direita.png";
import setaEsquerda from "../../assets/images/icons/seta-esquerda.png";

export function MenuBagagem() {
  const [data, setData] = useState<Array<any>>([]); //estado para armazenar o array inteiro de categorias
  const [filter, setFilter] = useState();
  const [selectedProduct, setSelectedProduct] = useState<any>({
    //estado onde vai ser armazenado o item clicado
    nome: "",
    imagem: "",
    peso: "",
    tipos: [],
  });

  const [amount, setAmount] = useState<number>(0); //estado para armazenar a quantidade de itens selecionados
  const [index, setIndex] = useState<number>(0); //estado para armazenar o index do array de tipos dos itens

  useEffect(() => {
    //bucando o array de categorias do servidor
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await Axios.get(
          "http://localhost:5000/pagina-protegida",
          {
            headers: {
              Authorization: `Bearer ${token}`, // validando permissao para acessar a rota
            },
          }
        );
        setData(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  //funcao para pegar os valores do item que foi clicado
  const handleCardClick = (item: any) => {
    setSelectedProduct(item);
    setAmount(0);
  };

  //funcao responsavel por calcular o peso do dos itens
  const calculateWeight = (qtd: number) => {
    let weight = selectedProduct.peso * qtd;
    const type = selectedProduct.tipos;

    if (type) {
      weight = type[index].peso * qtd;
    }

    if (weight >= 1000) {
      // verificando se o valor chegou em kilos ou esta em gramas
      const weightKg = (weight / 1000).toFixed(1);
      return `${weightKg} kg`;
    } else {
      const weightG = weight.toFixed(1);
      return `${weightG} g`;
    }
  };

  //funcao para controlar os tipos do produto (ex: calca tem os tipos: calca leg, c. moletom...)
  const handleType = (condition: string) => {
    const type = selectedProduct.tipos;
    const length = type.length - 1;

    if (condition === "add") {
      if (index < length) {
        setIndex(index + 1);
        setAmount(0);
      }
    }
    if (condition === "remove") {
      if (index > 0) {
        setIndex(index - 1);
        setAmount(0);
      }
    }
  };

  return (
    <div className="menuContainer">
      {selectedProduct.nome != "" && (
        <div className="infoProduto">
          <div className="imageContainer">
            <img src={`${pathImage}${selectedProduct.imagem}`} alt="" />
          </div>
          <div className="inputContainer">
            <h2>{selectedProduct.nome}</h2>

            <div className="subInputContainer">
              <input
                type="number"
                value={amount}
                onChange={(event) => {
                  const value = parseInt(event.target.value);
                  const newValue = value >= 0 ? value : 0;
                  setAmount(newValue);
                }}
              />
            </div>
            {selectedProduct.tipos && ( // se o item selecionado tiver tipos mostro os tipos na tela
              <div className="tipo">
                <button className="right" onClick={() => handleType("remove")}>
                  <img src={setaEsquerda}></img>
                </button>
                <div className="typeContainer">
                  <div className="types">
                    {selectedProduct.tipos[index].nome}
                  </div>
                </div>
                <button className="left" onClick={() => handleType("add")}>
                  <img src={setaDireita}></img>
                </button>
              </div>
            )}
            <button className="btnAdicionar">Adicionar</button>
          </div>
          <span>Peso: {calculateWeight(amount)}</span>
        </div>
      )}

      <div className="menuBagagem">
        {data.length > 0 ? ( //verificando se o array é vazio ou nao
          data[0].roupas.map(
            (
              item: any // renderizando os itens do menu
            ) => (
              <div
                key={item.nome}
                className="card"
                onClick={() => handleCardClick(item)}
              >
                <img src={`${pathImage}${item.imagem}`} alt="" />
                <span>{item.nome}</span>
              </div>
            )
          )
        ) : (
          <p>Carregando...</p>
        )}
      </div>
    </div>
  );
}
