import SingleChoice from "../../components/SingleChoiceTool";
import VerticalGrid from "../../components/VerticalGrid";
import { useNavigate } from "react-router-dom";

const ANSWER_OPTIONS = [
  "maximal 1 Stunde",
  "1-3 Stunden",
  "3-5 Stunden",
  "Den ganzen Tag",
];

function Screen({ onSubmit, data, nextRoute }) {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col flex-grow">
      <p>Was denkst du, wie lange du heute bleiben möchtest?</p>
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
    </div>
  );
}

export default Screen;
