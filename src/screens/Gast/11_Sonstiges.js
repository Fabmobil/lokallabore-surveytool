import WeiterButton from "../../components/WeiterButton";
import TextInput from "../../components/TextInput";
import RobiGif from "../../components/RobiGif";
import RobiFlameGif from "../../assets/robi-gifs/Robi_flamme-min.gif";

function Screen({ onSubmit, onFinalSubmit, data, nextRoute }) {
  return (
    <>
      <p>Sonst noch was?</p>
      <div className="vertical-center">
        <TextInput value={data} onChange={(val) => onSubmit(val)} />
      </div>
      <RobiGif src={RobiFlameGif} />
      <WeiterButton onClick={onFinalSubmit} navigateTo={nextRoute} />
    </>
  );
}

export default Screen;
