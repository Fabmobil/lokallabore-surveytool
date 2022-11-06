import WeiterButton from "../../components/WeiterButton";
import MultipleChoiceTool from "../../components/MultipleChoiceTool";
import VerticalGrid from "../../components/VerticalGrid";

const ANSWER_OPTIONS = [
  "Freund*innen",
  "Verwandte",
  "Schule",
  "Soziale Medien",
  "Zeitung oder Radio",
  "Sonstiges",
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
      <p>Wie hast du vom Lokallabor gehört?</p>
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
