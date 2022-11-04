import SingleChoice from "../../../components/SingleChoiceTool";
import { useNavigate } from "react-router-dom";
import VerticalGrid from "../../../components/VerticalGrid";
import RobiGif from "../../../components/RobiGif";
import RobiTastaturAgroGif from "../../../assets/robi-gifs/Robi_tastatur_agro-min.gif";

const ANSWER_OPTIONS = [
  "Gefällt mir",
  "Nicht so  meins",
  "noch nicht probiert",
];

function Screen({ onSubmit, data, nextRoute }) {
  const navigate = useNavigate();
  return (
    <>
      <p>Wie findest du programmieren? </p>
      <VerticalGrid>
        <SingleChoice
          answer={data}
          options={ANSWER_OPTIONS}
          onSelect={(answer) => {
            onSubmit(answer);
            setTimeout(() => navigate(nextRoute), 500);
          }}
        />
      </VerticalGrid>
      <RobiGif
        src={RobiTastaturAgroGif}
        style={{ transform: "rotate(12.74deg)" }}
      />
    </>
  );
}

export default Screen;
