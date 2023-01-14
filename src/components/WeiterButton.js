import ButtonNext from "./ButtonNext";

function WeiterButton({ disabled, navigateTo, text, style, onClick, inner }) {
  return (
    <ButtonNext
      disabled={disabled}
      to={navigateTo}
      className={"md:w-64 ml-auto flex-shrink-0"}
      style={style}
      onClick={onClick}
      inner={inner}
    >
      {text || "weiter"}
    </ButtonNext>
  );
}

export default WeiterButton;
