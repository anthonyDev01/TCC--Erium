import { useState } from "react";
import { MoreButton } from "../moreButton/index";
import "./style.css";
import { Link } from "react-router-dom";

export function NavBar(props: any) {
  const [active, setActive] = useState("navbar");

  const handleNav = () => {
    active === "navbar" ? setActive("navbarDrop") : setActive("navbar");
  };

  return (
    <div className={active}>
      <div className="menuDrop">
        <MoreButton handleNav={handleNav} />

        <h3>Menu</h3>
      </div>

      <div className="containerNavBar">
        <Link to="/">
          <img src={props.img} />
        </Link>

        <ul>
          <li>
            <Link to="/">Inicio</Link>
          </li>
          <li>
            <Link to="/">Visto</Link>
          </li>
          <li>
            <Link to="/malas-salvas">Minhas Malas</Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
