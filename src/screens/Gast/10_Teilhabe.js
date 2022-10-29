import SingleChoice from "../../components/SingleChoiceTool";
import { useNavigate } from "react-router-dom";
import VerticalGrid from "../../components/VerticalGrid";

const ANSWER_OPTIONS = [
  "Bin schon regelmäßig da",
  "Bock auf eigene Projekte",
  "Jo, würde gern was reißen",
  "Will unverbindlich bleiben",
  "Weiß noch nicht",
  "Nee, lass mal",
];

function Screen({ onSubmit, data, nextRoute }) {
  const navigate = useNavigate();
  return (
    <>
      <p>Möchtest du dich längerfristig im Lokallabor engagieren? </p>
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
