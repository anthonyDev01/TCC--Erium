type ButtonProps = {
  title: string;
  handleActive?: () => void;
  typeButton: "button" | "submit" | "reset";
};

export function ButtonLoginCadastro(props: ButtonProps) {
  return (
    <button
      type={props.typeButton}
      onClick={props.handleActive}
      className="buttonLoginCadastro"
    >
      {props.title}
    </button>
  );
}
