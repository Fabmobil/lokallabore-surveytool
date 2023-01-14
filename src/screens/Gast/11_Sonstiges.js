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
      <RobiGif
        src={RobiFlameGif}
        className="fixed h-60 md-h:h-72"
        style={{ transform: "rotate(30deg)", bottom: 30, left: -20 }}
      />
      <WeiterButton onClick={onFinalSubmit} navigateTo={nextRoute} />
    </>
  );
}

export default Screen;
