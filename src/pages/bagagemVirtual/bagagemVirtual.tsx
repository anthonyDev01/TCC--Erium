import "./style.css";

import { NavbarBagagem } from "../../components/navbarBagagem/navbarBagagem";
import { Bagagem } from "../../components/bagagem/bagagem";
import { MenuBagagem } from "../../components/menuBagagem/menuBagagem";

export function BagagemVirtual() {
  return (
    <div>
      <NavbarBagagem />
      <div className="bagagemContainer">
        <Bagagem />
        <MenuBagagem />
      </div>
    </div>
  );
}
