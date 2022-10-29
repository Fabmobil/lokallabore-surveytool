import ButtonNext from "../components/ButtonNext";
import VerticalGrid from "../components/VerticalGrid";

function Screen() {
  return (
    <div className="bg-gray -m-6 h-screen">
      <VerticalGrid>
        <ButtonNext to="/registrierung/start">Registrierung</ButtonNext>
        <ButtonNext to="/login/anmeldung">Login</ButtonNext>
        <ButtonNext to="/zugast/start">Ich bin zu Gast</ButtonNext>
      </VerticalGrid>
    </div>
  );
}

export default Screen;
