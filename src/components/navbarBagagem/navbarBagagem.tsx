import "./style.css";
import filtro from "../../assets/images/icons/filtro.png";
import lupa from "../../assets/images/icons/lupa.png";
import { useContext, useState } from "react";
import { searchContext } from "../../context/searchContext";
import { FilterDropdow } from "../filterDropdow/filterDropdow";

interface NavbarBagagemProps {
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  setCategory: React.Dispatch<React.SetStateAction<string>>;
}

export function NavbarBagagem(props: NavbarBagagemProps) {
  const search = useContext(searchContext);
  const [showDropdow, setShowDropdow] = useState<boolean>(false);

  const handleDropdow = () => {
    setShowDropdow(!showDropdow);
  };

  return (
    <>
      <div className="navbarBagagem">
        <div className="navMala"></div>
        <div className="navMenu">
          <img src={filtro} alt="" onClick={handleDropdow} />
          <div>
            <img src={lupa} alt="lupa" />
            <input
              type="text"
              value={search}
              placeholder="Procure aqui"
              onChange={(ev) => props.setSearch(ev.target.value)}
            />
          </div>
        </div>
      </div>
      {showDropdow == true && (
        <FilterDropdow
          handleDropdow={handleDropdow}
          setCategory={props.setCategory}
        />
      )}
    </>
  );
}
