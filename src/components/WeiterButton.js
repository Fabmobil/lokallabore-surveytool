import ButtonNext from "./ButtonNext";

function WeiterButton({ disabled, navigateTo, text, style }) {
  return (
    <ButtonNext
      disabled={disabled}
      to={navigateTo || "#"}
      className="w-44 ml-auto"
      style={style}
    >
      {text || "weiter"}
    </ButtonNext>
  );
}

export default WeiterButton;
