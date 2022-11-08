import WeiterButton from "../../components/WeiterButton";
import TextInput from "../../components/TextInput";

function Screen({ onSubmit, onFinalSubmit, data, nextRoute }) {
  return (
    <>
      <p>Sonst noch was?</p>
      <div className="vertical-center">
        <TextInput value={data} onChange={(val) => onSubmit(val)} />
      </div>
      <WeiterButton onClick={onFinalSubmit} navigateTo={nextRoute} />
    </>
  );
}

export default Screen;
