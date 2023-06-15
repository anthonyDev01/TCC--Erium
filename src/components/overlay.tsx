import { ButtonLoginCadastro } from "./buttonLoginCadastro";

type overlayProps = {
  handleActive: () => void;
};

export function Overlay(props: overlayProps) {
  return (
    <div className="overlayContainer ">
      <div className="overlay">
        <div className="overlayPanel overlayEsquerda">
          <h1>Bem-Vindo</h1>
          <p>
            Se você já possui uma conta, conecte-se e aproveite a nossa
            plataforma
          </p>
          <ButtonLoginCadastro
            handleActive={props.handleActive}
            title="Login"
            typeButton="button"
          />
        </div>
        <div className="overlayPanel overlayDireita">
          <h1>Faça Parte</h1>
          <p>
            Se você ainda não possui uma conta, realize o seu cadastro e comece
            a utilizar a nossa plataforma
          </p>
          <ButtonLoginCadastro
            handleActive={props.handleActive}
            title="Cadastre-se"
            typeButton="button"
          />
        </div>
      </div>
    </div>
  );
}
