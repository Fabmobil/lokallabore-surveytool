import SingleChoice from "../../components/SingleChoiceTool";
import { useNavigate } from "react-router-dom";
import VerticalGrid from "../../components/VerticalGrid";

const SPECIAL_ANSWER = "Ich bin Betreuer*in";
const ANSWER_OPTIONS = ["1", "2-3", "mehr als 3", SPECIAL_ANSWER];

function Screen({ onSubmit, data, nextRoute, globalData, setStateFlag }) {
  console.log("globalData", globalData);
  const navigate = useNavigate();
  return (
    <>
      <p>Wieviele Betreuende sind heute im Lokallabor? </p>
      <div className="vertical-center">
        <VerticalGrid>
          <SingleChoice
            answer={data}
            options={ANSWER_OPTIONS}
            onSelect={(answer) => {
              if (answer === SPECIAL_ANSWER) {
                setStateFlag("IS_BETREUERIN", true);
              }
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
