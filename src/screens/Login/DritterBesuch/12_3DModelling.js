import WeiterButton from "../../../components/WeiterButton";
import Slider from "../../../components/Slider";
import imageTop from "../../../assets/herz.png";

function Screen({ onSubmit, data, nextRoute }) {
  function hasUserAnswered() {
    return !!data;
  }

  return (
    <>
      <p>3D-Modelling rockt?</p>
      <Slider
        onChange={onSubmit}
        value={isNaN(data) ? 0 : data}
        imgTop={imageTop}
      />
      <WeiterButton disabled={!hasUserAnswered()} navigateTo={nextRoute} />
    </>
  );
}

export default Screen;
