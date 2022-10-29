import WeiterButton from "../../components/WeiterButton";
import Slider from "../../components/Slider";

function Screen({ onSubmit, data, nextRoute }) {
  function hasUserAnswered() {
    return !!data;
  }

  return (
    <>
      <p>Lasercutter...dein Ding?</p>
      <Slider onChange={onSubmit} value={isNaN(data) ? 0 : data} />
      <WeiterButton disabled={!hasUserAnswered()} navigateTo={nextRoute} />
    </>
  );
}

export default Screen;
