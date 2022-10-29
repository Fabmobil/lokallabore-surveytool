import ButtonNext from "../../components/ButtonNext";

function Screen({ globalData }) {
  return (
    <>
      <p>
        Danke <strong>Nickname</strong> für deine Anmeldung! <br />
        <br />
        Logge dich aus und genieße deinen Aufenthalt im Lokallabor!
      </p>
      <ButtonNext to="/">Log Out</ButtonNext>
    </>
  );
}

export default Screen;
