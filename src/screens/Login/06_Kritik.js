import WeiterButton from "../../components/WeiterButton";
import TextInput from "../../components/TextInput";
import RobiGif from "../../components/RobiGif";
import RobiFlameGif from "../../assets/robi-gifs/Robi_flamme-min.gif";
import SURVEY_LOGIN_DRITTERBESUCH from "../../constants/survey-login-dritterbesuch";

const isThirdVisit = true; //TODO add logic
const firstRouteThirdVisit =
  "/" +
  SURVEY_LOGIN_DRITTERBESUCH.baseUrl +
  "/" +
  SURVEY_LOGIN_DRITTERBESUCH.surveyItems[0].questionId;

function Screen({ onSubmit, data, nextRoute, onFinalSubmit }) {
  return (
    <>
      <p>Hast du Verbesserungswünsche? </p>
      <div className="vertical-center">
        <TextInput value={data} onChange={(val) => onSubmit(val)} />
        <RobiGif src={RobiFlameGif} style={{ transform: "rotate(30deg)" }} />
      </div>

      <WeiterButton
        onClick={isThirdVisit ? () => { } : onFinalSubmit}
        navigateTo={isThirdVisit ? firstRouteThirdVisit : nextRoute}
      />
    </>
  );
}

export default Screen;
