import { useNavigate } from "react-router-dom";
import Button from "./Button";

function ButtonNext({
  disabled,
  to,
  onClick = () => {},
  children,
  className,
  style,
}) {
  const navigate = useNavigate();
  return (
    <Button
      className={[className]}
      disabled={disabled}
      style={style}
      onClick={() => {
        if (disabled) return;
        onClick();
        navigate(to);
      }}
    >
      {children || "..."}
    </Button>
  );
}

export default ButtonNext;
