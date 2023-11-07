import "./style.css";
import ok from "../../assets/images/ok.png";
import alerta from "../../assets/images/alerta.png";
import ultrapassou from "../../assets/images/ultrapassou.png";
import close from "../../assets/images/icons/botao-fechar.png";
import { motion } from "framer-motion";

interface InfoCard {
  status: String;
  handleInfoCardClick: () => void;
}

export const InfoCard = ({ status, handleInfoCardClick }: InfoCard) => {
  const infoCard = {
    title: "Status da Bagagem",

    ok: {
      menssage:
        "Olá, viajante! Boas notícias, o peso da sua mala está dentro das normas dos aeroportos. Ela está prontinha para seguir a viagem!",
      image: ok,
    },

    alerta: {
      menssage:
        "Olá, viajante! Sua mala está quase alcançando o limite de 26 kg, mas não se preocupe. Você pode evitar taxas extras escolhendo itens mais leves ou compartilhando o peso com outra mala.",
      image: alerta,
    },
    ultrapassou: {
      menssage:
        "Olá, viajante! Parece que você ultrapassou o limite de peso estabelecido pelos aeroportos. Lembre-se de que taxas adicionais serão aplicadas. Talvez seja uma boa ideia repensar o que levar.",
      image: ultrapassou,
    },
  };

  const handleMensagem = () => {
    if (status == "ok") return infoCard.ok.menssage;
    if (status == "alerta") return infoCard.alerta.menssage;
    if (status == "ultrapassou") return infoCard.ultrapassou.menssage;
  };

  const handleImage = () => {
    if (status == "ok") return infoCard.ok.image;
    if (status == "alerta") return infoCard.alerta.image;
    if (status == "ultrapassou") return infoCard.ultrapassou.image;
  };

  const handleClasse = () => {
    if (status == "ok") return "cardOk";
    if (status == "alerta") return "cardAlerta";
    if (status == "ultrapassou") return "cardUltrapassou";
  };

  return (
    <motion.div
      className={`infoCard ` + handleClasse()}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -40 }}
      transition={{ duration: 0.5 }}
    >
      <h2>{infoCard.title}</h2>
      <p>{handleMensagem()}</p>
      <motion.img
        src={handleImage()}
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.5, y: -40 }}
        transition={{ duration: 0.5 }}
        alt="icon"
      />

      <div className="closeInfoCard" onClick={handleInfoCardClick}>
        <img src={close} alt="fechar" />
      </div>
    </motion.div>
  );
};
