import WeiterButton from "../../components/WeiterButton";
import TextInput from "../../components/TextInput";
import { useNavigate } from "react-router-dom";

//nur kleinbuchstaben und keine zahlen und keine sonderzeichen
const nickNamePattern = /^[a-z]{2,15}$/

function Screen({ onSubmit, data, nextRoute, onNicknameSubmit }) {
  function hasUserAnswered() {
    return !!data && nickNamePattern.test(data);
  }
  const navigate = useNavigate();

  return (
    <>
      <p>
        Gib dir einen coolen Spitznamen! Damit meldest du dich künftig an.{" "}
        <br /><br />
        <span className="font-bold">PS: Vergiss ihn nicht :)</span>
      </p>
      <div className="vertical-center">
        <TextInput value={data} onChange={(val) => onSubmit(val)} />
        <div className="text-xs mt-6">
          Nur Kleinbuchstaben! Keine Zahlen / Sonderzeichen! Mindestens 2 Zeichen! Maximal 15 Zeichen! </div>
      </div>
      <WeiterButton
        disabled={!hasUserAnswered()}
        onClick={() => {
          onNicknameSubmit().then(() => { navigate(nextRoute) })
        }}
      />
    </>
  );
}

export default Screen;
