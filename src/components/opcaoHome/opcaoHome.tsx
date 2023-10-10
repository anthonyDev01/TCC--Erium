import "./style.css";
import fechar from "../../assets/images/icons/fechar.png";
import malas from "../../assets/images/icons/malas-de-viagem.png";
import adicionar from "../../assets/images/icons/adicionar.png";
import { Link } from "react-router-dom";

import { motion } from "framer-motion";

interface OpcaoHomeProps {
  setCloseOpcao: React.Dispatch<React.SetStateAction<boolean>>;
}

export function OpcaoHome(props: OpcaoHomeProps) {
  return (
    <div className="darkBackground">
      <motion.div
        className="containerOpcaoHome"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -50, transition: { duration: 0.2 } }}
        transition={{ duration: 0.5 }}
      >
        <img
          className="fecharOpcaosMala"
          src={fechar}
          alt="fechar"
          onClick={() => props.setCloseOpcao(false)}
        />

        <motion.div
          className="cardOpcaoHome"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -80, transition: { duration: 0.3 } }}
          transition={{ duration: 0.5 }}
        >
          <Link className="cardOpcaoHomeLink" to="/opcoes-mala">
            <h3>Criar nova mala</h3>
            <motion.img
              src={adicionar}
              alt=""
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5, y: -40 }}
              transition={{ duration: 0.3 }}
            />
          </Link>
        </motion.div>

        <motion.div
          className="cardOpcaoHome"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -80, transition: { duration: 0.3 } }}
          transition={{ duration: 0.5 }}
        >
          <Link className="cardOpcaoHomeLink" to="/malas-salvas">
            <h3>Malas salvas</h3>
            <motion.img
              src={malas}
              alt=""
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5, y: -40 }}
              transition={{ duration: 0.3 }}
            />
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
}
