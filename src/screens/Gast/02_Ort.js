import SingleChoice from "../../components/SingleChoiceTool";
import VerticalGrid from "../../components/VerticalGrid";
import { useNavigate } from "react-router-dom";
import LOKALLABOR_LOCATIONS from "../../constants/lokallabor-locations";

const ANSWER_OPTIONS = LOKALLABOR_LOCATIONS;

function Screen({ onSubmit, data, nextRoute }) {
  const navigate = useNavigate();
  return (
    <>
      <p>In welchem Lokallabor bist du gerade?</p>

      <VerticalGrid className="flex-grow overflow-auto">
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
