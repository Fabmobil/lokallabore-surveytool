import WeiterButton from "../../components/WeiterButton";
import TextInput from "../../components/TextInput";

function Screen({ onSubmit, data, nextRoute }) {
  const hasUserAnswered = () => {
    if (!data) return false;
    if (!data.match(/^[0-9]{5}$/)) return false;
    return true;
  };

  return (
    <>
      <p>Wie lautet die Postleitzahl deines Heimatortes?</p>
      <div className="vertical-center">
        <TextInput
          minLength="5"
          maxLength="5"
          pattern={/[0-9]{5}/}
          value={data}
          onChange={(val) => onSubmit(val)}
        />
      </div>
      <WeiterButton disabled={!hasUserAnswered()} navigateTo={nextRoute} />
    </>
  );
}

export default Screen;
