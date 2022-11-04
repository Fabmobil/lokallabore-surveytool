import WeiterButton from "../../components/WeiterButton";
import TextInput from "../../components/TextInput";
import RobiGif from "../../components/RobiGif";
import RobiSliderGif from "../../assets/robi-gifs/Robi_slider-min.gif";

function Screen({ onSubmit, data, nextRoute }) {
  function hasUserAnswered() {
    return !!data;
  }

  return (
    <>
      <p>Was möchtest du hier gerne machen?</p>
      <TextInput value={data} onChange={(val) => onSubmit(val)} />
      <RobiGif
        src={RobiSliderGif}
        style={{ width: 263, transform: "rotate(159.46deg)" }}
      />
      <WeiterButton disabled={!hasUserAnswered()} navigateTo={nextRoute} />
    </>
  );
}

export default Screen;
