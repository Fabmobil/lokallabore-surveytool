import ButtonNext from "./ButtonNext";
import classNames from "classnames"

function WeiterButton({ disabled, navigateTo, text, style, onClick, inner }) {
  return (
    <ButtonNext
      disabled={disabled}
      to={navigateTo}
      className={"w-44 md:w-64 ml-auto flex-shrink-0"}
      style={style}
      onClick={onClick}
      inner={inner}
    >
      {text || "weiter"}
    </ButtonNext>
  );
}

export default WeiterButton;
