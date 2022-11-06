import ButtonNext from "../components/ButtonNext";
import VerticalGrid from "../components/VerticalGrid";

function Screen() {
  return (
    <div className="bg-gray -m-6 md:-m-16 -mb-44 flex-grow flex flex-col justify-center">
      <VerticalGrid className="w-full px-4">
        <ButtonNext to="/registrierung/start" normalPositioning>
          Registrierung
        </ButtonNext>
        <ButtonNext to="/login/anmeldung" normalPositioning>
          Login
        </ButtonNext>
        <ButtonNext to="/gast/start" normalPositioning>
          Ich bin zu Gast
        </ButtonNext>
        <div className="grid grid-cols-3 gap-6 fixed w-full left-0 bottom-0">
          <div className="Logo Logo--palm flex-grow"></div>
          <div className="Logo Logo--drosos flex-grow"></div>
          <div className="Logo Logo--beisheim flex-grow"></div>
        </div>
      </VerticalGrid>
    </div>
  );
}

export default Screen;
