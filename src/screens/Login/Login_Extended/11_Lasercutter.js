import SingleChoice from "../../../components/SingleChoiceTool";
import VerticalGrid from "../../../components/VerticalGrid";
import { useNavigate } from "react-router-dom";

const ANSWER_OPTIONS = ["Absolut", "nö", "noch nicht probiert"];

function Screen({ onSubmit, data, nextRoute }) {
  const navigate = useNavigate();
  return (
    <>
      <p>Lasercutter...dein Ding?</p>
      <div className="vertical-center">
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
      </div>
    </>
  );
}

export default Screen;
