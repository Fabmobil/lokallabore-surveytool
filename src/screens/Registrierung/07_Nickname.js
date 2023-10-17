import WeiterButton from "../../components/WeiterButton";
import TextInput from "../../components/TextInput";
import { useNavigate } from "react-router-dom";

const REGULAR_EXPRESSION = /^[a-z,ä,ö,ü,-]{2,15}$/;

function Screen({ onSubmit, data, nextRoute, onNicknameSubmit }) {
  function hasUserAnswered() {
    return !!data && REGULAR_EXPRESSION.test(data);
  }
  const navigate = useNavigate();

  return (
    <>
      <p>
        Was ist dein Vorname? Damit meldest du dich künftig an. <br />
        <br />
        <span className="font-bold">PS: Vergiss ihn nicht :)</span>
      </p>
      <div className="vertical-center">
        <TextInput value={data} onChange={(val) => onSubmit(val)} />
        <div className="text-xs mt-6">
          <ul style={{ listStyle: "none" }}>
            <li>Nur Kleinbuchstaben!</li>
            <li>Keine Zahlen / Sonderzeichen!</li>
            <li>Bindestriche sind okay</li>
            <li>Keine Leerzeichen</li>
            <li>Mindestens 2 Zeichen!</li>
            <li>Maximal 15 Zeichen!</li>
          </ul>
        </div>
      </div>
      <WeiterButton
        disabled={!hasUserAnswered()}
        onClick={() => {
          onNicknameSubmit().then(() => {
            navigate(nextRoute);
          });
        }}
      />
    </>
  );
}

export default Screen;
