import "./style.css";
import { useState, useEffect, useContext } from "react";
import Axios from "axios";

const pathImage = "http://localhost:5000/imagens/"; //caminho das imagens
import setaDireita from "../../assets/images/icons/seta-direita.png";
import setaEsquerda from "../../assets/images/icons/seta-esquerda.png";
import fechar from "../../assets/images/icons/botao-fechar.png";
import { searchContext } from "../../context/searchContext";
import { categoryContext } from "../../context/categoryContext";
import { baggageContext } from "../../context/baggageContext";

interface Roupa {
  nome: string;
  imagem: string;
  peso: number;
  tipos?: Array<Tipo>; // Se tipos for opcional
}

interface Tipo {
  nome: string;
  peso: number;
}

interface MenuBagagemProps {
  setItem: React.Dispatch<React.SetStateAction<Object>>;
  itens: Array<any>;
  closeInfo: React.Dispatch<React.SetStateAction<any>>;
  setCloseInfo: React.Dispatch<React.SetStateAction<any>>;
}

export function MenuBagagem(props: MenuBagagemProps) {
  const [data, setData] = useState<Array<any>>([]); //estado para armazenar o array inteiro de categorias

  const [amount, setAmount] = useState<number>(0); //estado para armazenar a quantidade de itens selecionados
  const [index, setIndex] = useState<number>(0); //estado para armazenar o index do array de tipos dos itens
  const [selectedProduct, setSelectedProduct] = useState<any>({
    //estado onde vai ser armazenado o item clicado
    nome: "",
    imagem: "",
    peso: 0,
    tipos: [],
  });

  const search = useContext(searchContext);
  const category = useContext(categoryContext);
  const closeInfo = useContext(baggageContext);

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

  const roupas = data.length > 0 ? data[0][category] : [];
  const lowerSearch = search.toLowerCase();

  const filteredData = roupas.filter((roupa: Roupa) =>
    roupa.nome.toLowerCase().includes(lowerSearch)
  );

  //funcao para pegar os valores do item que foi clicado
  const handleCardClick = (item: any) => {
    setSelectedProduct(item);
    setAmount(0);
    props.setCloseInfo(true);
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

  const addItem = () => {
    const type = selectedProduct.tipos;
    const nome = type ? type[index].nome : selectedProduct.nome;
    const imagem = `${pathImage}${selectedProduct.imagem}`;
    const peso = type ? type[index].peso : selectedProduct.peso;
    const itens = props.itens;

    const found = itens.find((item) => {
      if (item.nome == nome) {
        return true;
      }
    });

    if (itens.length == 0) { 
      const newItem = {
        nome,
        imagem,
        peso,
        quantidade: amount,
      };

      props.setItem((prevState) => [...prevState, newItem]);
      props.setCloseInfo(false);
    }

    if (itens.length != 0 && !found) {
      console.log("entro1");
      const newItem = {
        nome,
        imagem,
        peso,
        quantidade: amount,
      };

      props.setItem((prevState) => [...prevState, newItem]);
      props.setCloseInfo(false);
    }

    if (itens.length != 0 && found) {
      console.log("entro2");
      // Se 'found' for verdadeiro, aumente a quantidade do item existente em 1
      const updatedItems = itens.map((item) => {
        if (item.nome === nome) {
          // Se o nome do item for igual ao 'nome' que você deseja atualizar
          // Aumente a quantidade em 1
          return {
            ...item,
            quantidade: item.quantidade += amount,
          };
        }
        return item;
      });

      // Atualize o estado 'itens' com os itens atualizados
      props.setItem(updatedItems);
      
    }
  };

  return (
    <div className="menuContainer">
      {selectedProduct.nome !== "" && (
        <div
          className={
            closeInfo
              ? "infoProduto showInfoProduto"
              : "infoProduto hiddenInfoProduto"
          }
        >
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
                <button className="arrow" onClick={() => handleType("remove")}>
                  <img src={setaEsquerda}></img>
                </button>
                <div className="typeContainer">
                  <div className="types">
                    {selectedProduct.tipos[index].nome}
                  </div>
                </div>
                <button className="arrow" onClick={() => handleType("add")}>
                  <img src={setaDireita}></img>
                </button>
              </div>
            )}
            <button className="btnAdicionar" onClick={addItem}>
              Adicionar
            </button>
          </div>
          <span className="pesoInfo">Peso: {calculateWeight(amount)}</span>
          <div className="close" onClick={() => props.setCloseInfo(false)}>
            <img src={fechar} alt="" />
          </div>
        </div>
      )}

      <div className="menuBagagem">
        {data.length > 0 ? ( //verificando se o array é vazio ou nao
          filteredData.map(
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
