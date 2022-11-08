import ButtonNext from "./ButtonNext";

function WeiterButton({ disabled, navigateTo, text, style, onClick }) {
  return (
    <ButtonNext
      disabled={disabled}
      to={navigateTo || "#"}
      className="w-44 md:w-64 ml-auto"
      style={style}
      onClick={onClick}
    >
      {text || "weiter"}
    </ButtonNext>
  );
}

export default WeiterButton;
