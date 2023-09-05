import "./style.css";

import { NavbarBagagem } from "../../components/navbarBagagem/navbarBagagem";
import { Bagagem } from "../../components/bagagem/bagagem";
import { MenuBagagem } from "../../components/menuBagagem/menuBagagem";
import { searchContext } from "../../context/searchContext";
import { categoryContext } from "../../context/categoryContext";
import { itemContext } from "../../context/itemContext";
import { baggageContext } from "../../context/baggageContext";
import { useState } from "react";

export function BagagemVirtual() {
  const [search, setSearch] = useState<string>("");
  const [category, setCategory] = useState<string>("roupas");
  const [item, setItem] = useState<any>([]);
  const [closeInfo, setCloseInfo] = useState<any>(false)

  return (
    <baggageContext.Provider value={closeInfo}>
      <itemContext.Provider value={item}>
        <categoryContext.Provider value={category}>
          <searchContext.Provider value={search}>
            <>
              <NavbarBagagem setSearch={setSearch} setCategory={setCategory} />
              <div className="bagagemContainer">
                <Bagagem closeInfo={closeInfo} item={item}/>
                <MenuBagagem closeInfo={closeInfo} setCloseInfo={setCloseInfo} itens={item} setItem={setItem} />
              </div>
            </>
          </searchContext.Provider>
        </categoryContext.Provider>
      </itemContext.Provider>
    </baggageContext.Provider>
  );
}
