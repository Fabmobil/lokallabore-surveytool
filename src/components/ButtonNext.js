import { useNavigate } from "react-router-dom";
import Button from "./Button";

function ButtonNext({
  disabled,
  to,
  onClick = () => {},
  children,
  className,
  style,
  normalPositioning,
}) {
  const navigate = useNavigate();
  return (
    <Button
      className={[
        className,
        { "fixed bottom-14 right-6 w-44 md:w-64": !normalPositioning },
      ]}
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
