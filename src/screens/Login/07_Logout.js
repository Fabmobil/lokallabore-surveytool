import ButtonNext from "../../components/ButtonNext";
import RobiGif from "../../components/RobiGif";

function Screen({ globalData }) {
  return (
    <>
      <p>
        Danke <strong>Nickname</strong> für deine Anmeldung! <br />
        <br />
        Logge dich aus und genieße deinen Aufenthalt im Lokallabor!
      </p>
      <RobiGif style={{ transform: "rotate(2.2deg)", width: 331 }} />
      <ButtonNext to="/">Log Out</ButtonNext>
    </>
  );
}

export default Screen;
