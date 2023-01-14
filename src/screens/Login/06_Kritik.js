import { useNavigate } from "react-router-dom";
import WeiterButton from "../../components/WeiterButton";
import TextInput from "../../components/TextInput";
import RobiGif from "../../components/RobiGif";
import RobiFlameGif from "../../assets/robi-gifs/Robi_flamme-min.gif";
import SURVEY_LOGIN_DRITTERBESUCH from "../../constants/survey-login-dritterbesuch";

function isThirdVisit(globalData) {
  if (process.env.REACT_APP_ENABLETHIRDVISIT) {
    return true;
  }
  const numberOfVisits = globalData.numberOfVisits;
  if (!numberOfVisits) return false;
  return (numberOfVisits + 1) % 3 === 0; //current one = +1 because not yet submitted
}

const firstRouteThirdVisit =
  "/" +
  SURVEY_LOGIN_DRITTERBESUCH.baseUrl +
  "/" +
  SURVEY_LOGIN_DRITTERBESUCH.surveyItems[0].questionId;

function Screen({ onSubmit, data, nextRoute, onFinalSubmit, globalData }) {
  const isThird = isThirdVisit(globalData);
  const navigate = useNavigate();
  return (
    <>
      <p>Hast du Verbesserungswünsche? </p>
      <div className="vertical-center">
        <TextInput value={data} onChange={(val) => onSubmit(val)} />
        <RobiGif src={RobiFlameGif} style={{ transform: "rotate(30deg)" }} />
      </div>

      <WeiterButton
        text={!isThird ? "Und fertig!" : ""}
        onClick={
          isThird
            ? () => {}
            : () => {
                onFinalSubmit().then(() => {
                  navigate(nextRoute);
                });
              }
        }
        navigateTo={isThird ? firstRouteThirdVisit : undefined}
      />
    </>
  );
}

export default Screen;
