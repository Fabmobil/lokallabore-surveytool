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
      <RobiGif />
      <ButtonNext to="/">Fertig!</ButtonNext>
    </>
  );
}

export default Screen;
