import WeiterButton from "../../components/WeiterButton";
import Slider from "../../components/Slider";

function Screen({ onSubmit, data, nextRoute }) {
  function hasUserAnswered() {
    return !!data;
  }

  return (
    <>
      <p>Magst du Mikroelektronik?</p>
      <Slider onChange={onSubmit} value={isNaN(data) ? 0 : data} />
      <WeiterButton disabled={!hasUserAnswered()} navigateTo={nextRoute} />
    </>
  );
}

export default Screen;
