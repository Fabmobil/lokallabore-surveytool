import ButtonNext from "../../components/ButtonNext";
import RobiGif from "../../components/RobiGif";

function Screen({ globalData, onLogout }) {
  return (
    <>
      <p>
        Danke <span className="font-bold">{globalData.nickname}</span>! <br />
        Viel Spaß im Lokallabor!
      </p>
      <RobiGif className="w-80" style={{ transform: "rotate(20.25deg)" }} />
      <ButtonNext to="/" onClick={onLogout}>
        Log Out
      </ButtonNext>
    </>
  );
}

export default Screen;
