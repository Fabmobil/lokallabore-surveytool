import { useNavigate } from "react-router-dom";
import Button from "./Button";

function ButtonNext({
  disabled,
  to,
  onClick = () => {
    console.log("click");
  },
  children,
  className,
  style,
  normalPositioning,
  inner,
}) {
  const navigate = useNavigate();
  console.log(inner);
  return (
    <Button
      className={[
        className,
        { "w-44 md:w-64": !normalPositioning },
        {
          "fixed bottom-4 md-h:bottom-14 right-6": !normalPositioning && !inner,
        },
        { "ml-auto": inner },
      ]}
      disabled={disabled}
      style={style}
      onClick={() => {
        if (disabled) return;
        if (to) {
          onClick();
          navigate(to);
        } else {
          onClick();
        }
      }}
    >
      {children || "..."}
    </Button>
  );
}

export default ButtonNext;
