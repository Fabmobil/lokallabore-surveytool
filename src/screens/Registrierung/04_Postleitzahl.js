import WeiterButton from "../../components/WeiterButton";
import TextInput from "../../components/TextInput";

function Screen({ onSubmit, data, nextRoute }) {
  function hasUserAnswered() {
    return !!data && data.length === 5 && parseInt(data) > 0;
  }

  return (
    <>
      <p>Wie lautet die Postleitzahl deines Heimatortes?</p>
      <div className="vertical-center">
        <TextInput
          maxLength={5}
          pattern="[0-9]{5}"
          value={data}
          onChange={(val) => onSubmit(val)}
        />
      </div>
      <WeiterButton disabled={!hasUserAnswered()} navigateTo={nextRoute} />
    </>
  );
}

export default Screen;
