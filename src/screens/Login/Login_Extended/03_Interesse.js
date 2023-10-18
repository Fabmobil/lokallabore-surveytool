import SingleChoice from "../../../components/SingleChoiceTool";
import VerticalGrid from "../../../components/VerticalGrid";
import { useNavigate } from "react-router-dom";

const ANSWER_OPTIONS = ["Yesss", "Nö", "Hatte ich schon vorher"];

function Screen({ onSubmit, data, nextRoute }) {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col flex-grow">
      <p>
        Hat das Lokallabor dein Interesse für digitale Technologien geweckt?
      </p>
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
