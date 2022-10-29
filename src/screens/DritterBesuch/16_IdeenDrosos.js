import SingleChoice from "../../components/SingleChoiceTool";
import VerticalGrid from "../../components/VerticalGrid";
import { useNavigate } from "react-router-dom";

const ANSWER_OPTIONS = [
  "Viel besser/einfacher",
  "besser/einfacher",
  "gleichgeblieben",
  "schlechter/schwieriger",
  "viel schlechter/schwieriger",
];

function Screen({ onSubmit, data, nextRoute }) {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col flex-grow">
      <p>Du kommst zu neuen Ideen...</p>
      <div className="flex-grow flex justify-center">
        <VerticalGrid className="flex-grow">
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
