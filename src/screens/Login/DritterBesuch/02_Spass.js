import WeiterButton from "../../../components/WeiterButton";
import Slider from "../../../components/Slider";
import imageTop from "../../../assets/robo-thumbsup.png";
import imageBottom from "../../../assets/robo-thumbsdown.png";

function Screen({ onSubmit, data, nextRoute }) {
  function hasUserAnswered() {
    return !isNaN(data);
  }

  return (
    <>
      <p>Wie viel Spaß hattest du bisher im Lokallabor? </p>
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
