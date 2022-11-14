import ButtonNext from "../../components/ButtonNext";
import RobiGif from "../../components/RobiGif";

function Screen({ globalData, onLogout }) {
  return (
    <>
      <p>
        Danke <span className="font-bold">{globalData.nickname}</span>! <br />
        Viel Spaß im Lokallabor!
      </p>
      <RobiGif style={{ transform: "rotate(30deg)" }} />
      <ButtonNext to="/" onClick={onLogout}>Log Out</ButtonNext>
    </>
  );
}

export default Screen;
