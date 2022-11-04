import ButtonNext from "../components/ButtonNext";
import VerticalGrid from "../components/VerticalGrid";

function Screen() {
  return (
    <div className="bg-gray -m-6 h-screen">
      <VerticalGrid>
        <ButtonNext to="/registrierung/start">Registrierung</ButtonNext>
        <ButtonNext to="/login/anmeldung">Login</ButtonNext>
        <ButtonNext to="/zugast/start">Ich bin zu Gast</ButtonNext>
        <div className="grid grid-cols-3 gap-6">
          <div className="Logo Logo--palm flex-grow"></div>
          <div className="Logo Logo--drosos flex-grow"></div>
          <div className="Logo Logo--beisheim flex-grow"></div>
        </div>
      </VerticalGrid>
    </div>
  );
}

export default Screen;
