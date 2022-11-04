import SingleChoice from "../../../components/SingleChoiceTool";
import VerticalGrid from "../../../components/VerticalGrid";
import { useNavigate } from "react-router-dom";

const ANSWER_OPTIONS = ["Ja", "Nein", "Weiß nicht"];

function Screen({ onSubmit, data, nextRoute }) {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col flex-grow">
      <p>
        Und so generell...bist du mit dem Angebot des Lokallabors zufrieden?
      </p>
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
