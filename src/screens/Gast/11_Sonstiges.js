import WeiterButton from "../../components/WeiterButton";
import TextInput from "../../components/TextInput";
import RobiGif from "../../components/RobiGif";
import RobiFlameGif from "../../assets/robi-gifs/Robi_flamme-min.gif";

function Screen({ onSubmit, data, nextRoute }) {
  return (
    <>
      <p>Sonst noch was?</p>
      <TextInput value={data} onChange={(val) => onSubmit(val)} />
      <RobiGif src={RobiFlameGif} />
      <WeiterButton navigateTo={nextRoute} />
    </>
  );
}

export default Screen;
