import WeiterButton from "../../components/WeiterButton";
import MultipleChoiceTool from "../../components/MultipleChoiceTool";
import VerticalGrid from "../../components/VerticalGrid";

const ANSWER_OPTIONS = [
  "Interesse an Digitaltechnik",
  "Hauptsache mal was los",
  "Schulische Verpflichtung",
  "Wurde mitgeschleppt",
  "Freunde treffen",
  "Sonstiges...",
];

function Screen({ onSubmit, data, nextRoute }) {
  function hasUserAnswered() {
    if (data && data.length > 0) {
      return true;
    }
    return false;
  }
  return (
    <>
      <p>Warum bist du heute hier?</p>
      <div className="vertical-center">
        <VerticalGrid>
          <MultipleChoiceTool
            options={ANSWER_OPTIONS}
            onChange={onSubmit}
            data={data}
          />
        </VerticalGrid>
      </div>

      <WeiterButton disabled={!hasUserAnswered()} navigateTo={nextRoute} />
    </>
  );
}

export default Screen;
