import "./style.css";
import happySuitCase from "../../assets/images/happySuitCase.png";
import { motion } from "framer-motion";

interface PopupSaveProps {
  setPopupOpen: React.Dispatch<React.SetStateAction<Boolean>>;
  popupOpen: Boolean;
}

export function PopupSave({ setPopupOpen, popupOpen }: PopupSaveProps) {
  return (
    <div className="popupsSaveBackground">
      <motion.div
        className="popupsSave"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -40 }}
        transition={{ duration: 0.5 }}
      >
        <h3>Sua mala foi salva com sucesso!</h3>
        <motion.img
          src={happySuitCase}
          alt=""
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5, y: -40 }}
          transition={{ duration: 0.5 }}
        />
        <motion.button
          onClick={() => setPopupOpen(false)}
          whileHover={{ scale: 1.1 }}
        >
          <span>Confirmar</span>
        </motion.button>
      </motion.div>
    </div>
  );
}
