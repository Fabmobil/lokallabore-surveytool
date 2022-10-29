import SingleChoice from "../../components/SingleChoiceTool";
import { useNavigate } from "react-router-dom";
import VerticalGrid from "../../components/VerticalGrid";

const ANSWER_OPTIONS = ["1", "2-3", "mehr als 3"];

function Screen({ onSubmit, data, nextRoute }) {
  const navigate = useNavigate();
  return (
    <>
      <p>Wieviele Betreuende sind heute im Lokallabor? </p>
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
    </>
  );
}

export default Screen;
