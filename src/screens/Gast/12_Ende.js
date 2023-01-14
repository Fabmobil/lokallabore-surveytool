import ButtonNext from "../../components/ButtonNext";
import RobiGif from "../../components/RobiGif";

function Screen({ globalData }) {
  return (
    <>
      <p>
        <span className="font-bold">Dankeschön!</span>
        <br />
        <br />
        Dankeschön! Viel Spaß auf der Veranstaltung des Lokallabors!
      </p>
      <RobiGif
        style={{ transform: "rotate(2.2deg)" }}
        className={"fixed top-48 right-0 w-80"}
      />
      <ButtonNext to="/">Fertig!</ButtonNext>
    </>
  );
}

export default Screen;
