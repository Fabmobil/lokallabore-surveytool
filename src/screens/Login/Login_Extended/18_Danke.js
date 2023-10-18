import ButtonNext from "../../../components/ButtonNext";
import RobiGif from "../../../components/RobiGif";

function Screen({ globalData }) {
  return (
    <>
      <p>
        Danke! <br />
        Viel Spaß im Lokallabor!
      </p>
      <RobiGif
        className={"fixed w-96 bottom-20"}
        style={{ transform: "rotate(20.25deg)", marginLeft: -67 }}
      />
      <ButtonNext to="/">Log Out</ButtonNext>
    </>
  );
}

export default Screen;
