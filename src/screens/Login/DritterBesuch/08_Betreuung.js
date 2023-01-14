import WeiterButton from "../../../components/WeiterButton";
import Slider from "../../../components/Slider";
import imageTop from "../../../assets/happy.png";
import imageBottom from "../../../assets/unhappy.png";

function Screen({ onSubmit, data, nextRoute }) {
  function hasUserAnswered() {
    return !isNaN(data);
  }

  return (
    <>
      <p>Und wie findest du die Betreuung so im Lokallabor? </p>
      <Slider
        onChange={onSubmit}
        value={isNaN(data) ? 0 : data}
        imgTop={imageTop}
        imgBottom={imageBottom}
      />
      <WeiterButton disabled={!hasUserAnswered()} navigateTo={nextRoute} />
    </>
  );
}

export default Screen;
