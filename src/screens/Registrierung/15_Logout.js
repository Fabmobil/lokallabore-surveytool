import ButtonNext from "../../components/ButtonNext";
import RobiGif from "../../components/RobiGif";

function Screen({ globalData }) {
  return (
    <>
      <p>
        Danke <strong>{globalData.nickname || " "}</strong>! <br />
        Viel Spaß im Lokallabor!
      </p>
      <RobiGif style={{ transform: "rotate(30deg)" }} />
      <ButtonNext to="/">Log Out</ButtonNext>
    </>
  );
}

export default Screen;
