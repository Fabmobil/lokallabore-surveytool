import ButtonNext from "../../../components/ButtonNext";

function Screen({ nextRoute }) {
  return (
    <div>
      <p>
        Bevor du gehst würden wir dich gern noch etwas fragen :) <br />
        <br />
        Geht auch ganz schnell!
      </p>
      <ButtonNext to={nextRoute} className="fixed bottom-14 right-6">
        Okay
      </ButtonNext>
    </div>
  );
}

export default Screen;
