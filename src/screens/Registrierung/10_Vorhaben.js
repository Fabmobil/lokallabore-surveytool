import WeiterButton from "../../components/WeiterButton";
import TextInput from "../../components/TextInput";

function Screen({ onSubmit, data, nextRoute }) {
  function hasUserAnswered() {
    return !!data;
  }

  return (
    <>
      <p>Was möchtest du hier gerne machen?</p>
      <div className="flex flex-grow flex-col justify-center">
        <TextInput value={data} onChange={(val) => onSubmit(val)} />
      </div>
      <WeiterButton disabled={!hasUserAnswered()} navigateTo={nextRoute} />
    </>
  );
}

export default Screen;
