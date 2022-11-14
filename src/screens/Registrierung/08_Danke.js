import ButtonNext from "../../components/ButtonNext";
import { ReactComponent as LoveEyesEmoji } from "../../assets/love-eyes.svg";

function Screen({ globalData, nextRoute }) {
  return (
    <>
      <p>
        Danke <span className="font-bold">{globalData.nickname}</span>! <br /> Dein
        Lokallabore-Account wurde erfolgreich erstellt! <br />
        <br />
        Weil die App neu für dich ist, hätten wir noch kurz ein paar Fragen
      </p>
      <LoveEyesEmoji
        style={{ marginLeft: "auto", marginRight: 47, marginBottom: 50 }}
      />
      <ButtonNext to={nextRoute}>Na klar!</ButtonNext>
    </>
  );
}

export default Screen;
