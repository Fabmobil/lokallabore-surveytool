import WeiterButton from "../../components/WeiterButton";
import TextInput from "../../components/TextInput";

function Screen({ onSubmit, data, nextRoute }) {
  function hasUserAnswered() {
    return !!data;
  }

  return (
    <>
      <p>Wie lautet die Postleitzahl deines Heimatortes?</p>
      <TextInput value={data} onChange={(val) => onSubmit(val)} />
      <WeiterButton disabled={!hasUserAnswered()} navigateTo={nextRoute} />
    </>
  );
}

export default Screen;
