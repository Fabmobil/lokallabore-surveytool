import WeiterButton from "../../components/WeiterButton";
import TextInput from "../../components/TextInput";

function Screen({ onSubmit, data, nextRoute }) {
  return (
    <>
      <p>Sonst noch was? </p>
      <TextInput value={data} onChange={(val) => onSubmit(val)} />
      <WeiterButton navigateTo={nextRoute} />
    </>
  );
}

export default Screen;
