import { useState } from "react";
import { CadastroContainer } from "../components/cadastroContainer";
import { LoginContainer } from "../components/loginContainer";
import { Overlay } from "../components/overlay";

export function LoginCadastro() {
  const [active, setActive] = useState<boolean>(false);

  function handleActive(){
    setActive(!active);
  }

  return (
    <div className="pageLoginCadastro">
      <div className={"containerLoginCadastro " + (active ? "rightPanelActive" : "")}>
        <CadastroContainer />
        <LoginContainer />
        <Overlay handleActive={handleActive} />
      </div>
    </div>
  );
}
