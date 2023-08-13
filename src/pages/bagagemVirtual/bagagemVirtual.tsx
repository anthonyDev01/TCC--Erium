import "./style.css";

import { NavbarBagagem } from "../../components/navbarBagagem/navbarBagagem";
import { Bagagem } from "../../components/bagagem/bagagem";
import { MenuBagagem } from "../../components/menuBagagem/menuBagagem";
import { searchContext } from "../../context/searchContext";
import { categoryContext } from "../../context/categoryContext";
import { useState } from "react";

export function BagagemVirtual() {
  const [search, setSearch] = useState<string>("");
  const [category, setCategory] = useState<string>("roupas");

  return (
    <categoryContext.Provider value={category}>
      <searchContext.Provider value={search}>
        <>
          <NavbarBagagem setSearch={setSearch} setCategory={setCategory} />
          <div className="bagagemContainer">
            <Bagagem />
            <MenuBagagem />
          </div>
        </>
      </searchContext.Provider>
    </categoryContext.Provider>
  );
}
