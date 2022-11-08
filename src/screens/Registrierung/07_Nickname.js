import WeiterButton from "../../components/WeiterButton";
import TextInput from "../../components/TextInput";
import { useNavigate } from "react-router-dom";

function Screen({ onSubmit, data, nextRoute, onNicknameSubmit }) {
  function hasUserAnswered() {
    return !!data;
  }
  const navigate = useNavigate();

  return (
    <>
      <p>
        Gib dir einen coolen Spitznamen! Damit meldest du dich künftig an.{" "}
        <strong>PS: Vergiss ihn nicht :)</strong>{" "}
      </p>
      <div className="vertical-center">
        <TextInput value={data} onChange={(val) => onSubmit(val)} />
      </div>
      <WeiterButton
        disabled={!hasUserAnswered()}
        onClick={() => {
          try {
            onNicknameSubmit();
          } catch {
            alert("Es ist etwas schief gegangen");
            window.setTimeout(() => {
              navigate("/");
            }, 200);
          }
        }}
        navigateTo={nextRoute}
      />
    </>
  );
}

export default Screen;
