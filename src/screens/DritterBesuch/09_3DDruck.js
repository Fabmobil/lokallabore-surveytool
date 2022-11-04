import WeiterButton from "../../components/WeiterButton";
import Slider from "../../components/Slider";
import imageTop from "../../assets/robo-thumbsup.png";
import imageBottom from "../../assets/robo-thumbsdown.png";

function Screen({ onSubmit, data, nextRoute }) {
  function hasUserAnswered() {
    return !!data;
  }

  return (
    <>
      <p>Wie spannend findest du 3D-Druck?</p>
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
