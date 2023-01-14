import WeiterButton from "../../../components/WeiterButton";
import Slider from "../../../components/Slider";
import imageTop from "../../../assets/herz.png";

function Screen({ onSubmit, data, nextRoute }) {
  function hasUserAnswered() {
    return !isNaN(data);
  }

  return (
    <>
      <p>3D-Modelling rockt?</p>
      <Slider
        onChange={onSubmit}
        value={isNaN(data) ? 0 : data}
        imgTop={imageTop}
        imgBottom={
          "data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=oo"
        }
      />
      <WeiterButton disabled={!hasUserAnswered()} navigateTo={nextRoute} />
    </>
  );
}

export default Screen;
