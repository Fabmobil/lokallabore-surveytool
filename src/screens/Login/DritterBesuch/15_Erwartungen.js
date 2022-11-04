import WeiterButton from "../../../components/WeiterButton";
import Slider from "../../../components/Slider";
import imageTop from "../../../assets/happy.png";
import imageBottom from "../../../assets/unhappy.png";

function Screen({ onSubmit, data, nextRoute }) {
  function hasUserAnswered() {
    return !!data;
  }

  return (
    <>
      <p>Erfüllt das Lokallabor deine Erwartungen?</p>
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
