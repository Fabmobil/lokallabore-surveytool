import SingleChoice from "../../components/SingleChoiceTool";
import TextInput from "../../components/TextInput";
import WeiterButton from "../../components/WeiterButton";
import VerticalDoubleGrid from "../../components/VerticalDoubleGrid";

const ANSWER_OPTIONS = ["nein", "einmal", "öfter", "regelmäßig"];

function Screen({ onSubmit, data, nextRoute }) {
  function handleSingleChoice(val) {
    onSubmit({ predefinedValue: val, freeValue: "" });
  }

  function handleFreeValueInput(val) {
    onSubmit({ freeValue: val });
  }

  function hasUserAnswered() {
    if (data && data.predefinedValue && data.predefinedValue.length > 0) {
      return true;
    }
    if (data && data.freeValue && data.freeValue.length > 0) {
      return true;
    }
    return false;
  }

  return (
    <>
      <p>Warst du vorher schonmal im Lokallabor?</p>
      <div className="vertical-center">
        <VerticalDoubleGrid>
          <SingleChoice
            options={ANSWER_OPTIONS}
            answer={data && data.predefinedValue}
            onSelect={handleSingleChoice}
          />
          <TextInput
            className="col-span-2"
            value={data ? data.freeValue : ""}
            onChange={handleFreeValueInput}
          />
        </VerticalDoubleGrid>
      </div>

      <WeiterButton disabled={!hasUserAnswered()} navigateTo={nextRoute} />
    </>
  );
}

export default Screen;
