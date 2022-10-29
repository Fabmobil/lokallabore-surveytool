import ButtonNext from "../../components/ButtonNext";

function Screen({ nextRoute }) {
  return (
    <div>
      <p>
        <strong> Hey! Willkommen in den Lokallaboren! </strong>
        <br />
        <br /> Die Lokallabore sind mittlerweile feste Orte und wir würden
        natürlich noch gerne wissen, wie du mit dem Lokallabore-Projekt so
        zufrieden bist und wie du das Angebot nutzt.
        <br />
        <br />
        Deshalb gibts hier eine schicke App mit Fragen, die du beantwortest und
        uns damit sehr weiterhilfst einzuschätzen, wie nice und gigantisch das
        Lokallabore- Netzwerk noch werden kann! 🔥🔥🔥{" "}
      </p>
      <ButtonNext to={nextRoute} className="fixed bottom-14 right-6">
        Alles klar!
      </ButtonNext>
    </div>
  );
}

export default Screen;
