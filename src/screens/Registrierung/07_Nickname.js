import WeiterButton from "../../components/WeiterButton";
import TextInput from "../../components/TextInput";

function Screen({ onSubmit, data, nextRoute }) {
  function hasUserAnswered() {
    return !!data;
  }

  return (
    <>
      <p>
        Gib dir einen coolen Spitznamen! Damit meldest du dich künftig an.{" "}
        <strong>PS: Vergiss ihn nicht :)</strong>{" "}
      </p>
      <div className="vertical-center">
        <TextInput value={data} onChange={(val) => onSubmit(val)} />
      </div>
      <WeiterButton disabled={!hasUserAnswered()} navigateTo={nextRoute} />
    </>
  );
}

export default Screen;
