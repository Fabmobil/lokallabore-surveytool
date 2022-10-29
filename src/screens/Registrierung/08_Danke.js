import ButtonNext from "../../components/ButtonNext";

function Screen({ globalData, nextRoute }) {
  return (
    <>
      <p>
        Danke {globalData.nickname}! Dein Lokallabore-Account wurde erfolgreich
        erstellt! Weil die App neu für dich ist, hätten wir noch kurz ein paar
        Fragen
      </p>
      <ButtonNext to={nextRoute}>Na klar!</ButtonNext>
    </>
  );
}

export default Screen;
