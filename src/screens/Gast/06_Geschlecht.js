import WeiterButton from "../../components/WeiterButton";
import MultipleChoiceTool from "../../components/MultipleChoiceTool";
import TextInput from "../../components/TextInput";
import VerticalGrid from "../../components/VerticalGrid";

const ANSWER_OPTIONS = ["männlich", "weiblich", "divers", "keine Angabe"];

function changePredefinedValues(data, vals) {
  return { ...data, predefinedValues: vals };
}

function changeFreeValue(data, val) {
  return { ...data, freeValue: val };
}

function Screen({ onSubmit, data, nextRoute }) {
  function hasUserAnswered() {
    if (data && data.predefinedValues && data.predefinedValues.length > 0) {
      return true;
    }
    if (data && data.freeValue && data.freeValue.length > 0) {
      return true;
    }
    return false;
  }
  return (
    <>
      <p>Was ist dein Geschlecht?</p>
      <VerticalGrid>
        <MultipleChoiceTool
          options={ANSWER_OPTIONS}
          onChange={(vals) => onSubmit(changePredefinedValues(data, vals))}
          data={(data && data.predefinedValues) || null}
        />
        <TextInput
          value={(data && data.freeValue) || ""}
          onChange={(val) => onSubmit(changeFreeValue(data, val))}
        />
      </VerticalGrid>

      <WeiterButton disabled={!hasUserAnswered()} navigateTo={nextRoute} />
    </>
  );
}

export default Screen;
