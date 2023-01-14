import WeiterButton from "../../../components/WeiterButton";
import TextInput from "../../../components/TextInput";
import RobiGif from "../../../components/RobiGif";

function Screen({ onSubmit, data, nextRoute }) {
  function hasUserAnswered() {
    return !!data;
  }

  return (
    <>
      <p>Hast du Favoriten unter den Techniken, Tools und Programmen?</p>
      <div className="vertical-center">
        <TextInput value={data} onChange={(val) => onSubmit(val)} />
      </div>
      <RobiGif
        className="w-64"
        style={{
          transform: "matrix(-0.96, 0.27, 0.27, 0.96, 0, 0)",
        }}
      />

      <WeiterButton disabled={!hasUserAnswered()} navigateTo={nextRoute} />
    </>
  );
}

export default Screen;
