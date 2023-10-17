import WeiterButton from "../../components/WeiterButton";
import MultipleChoiceTool from "../../components/MultipleChoiceTool";
import VerticalGrid from "../../components/VerticalGrid";

const ANSWER_OPTIONS = ["divers", "weiblich", "männlich", "keine Angabe"];

function changePredefinedValues(data, vals) {
  return { ...data, predefinedValues: vals };
}

function Screen({ onSubmit, data, nextRoute }) {
  function hasUserAnswered() {
    if (data && data.predefinedValues && data.predefinedValues.length > 0) {
      return true;
    }
    return false;
  }
  return (
    <>
      <p>Was ist dein Geschlecht?</p>

      <VerticalGrid className="flex-grow overflow-auto">
        <MultipleChoiceTool
          options={ANSWER_OPTIONS}
          onChange={(vals) => onSubmit(changePredefinedValues(data, vals))}
          data={(data && data.predefinedValues) || null}
        />
        <WeiterButton
          disabled={!hasUserAnswered()}
          style={{ position: "relative", right: "auto", bottom: "auto" }}
          navigateTo={nextRoute}
        />
      </VerticalGrid>
    </>
  );
}

export default Screen;
