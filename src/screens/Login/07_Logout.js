import ButtonNext from "../../components/ButtonNext";
import RobiGif from "../../components/RobiGif";
import SURVEY_LOGIN_DRITTERBESUCH from "../../constants/survey-login-dritterbesuch";

const isThirdVisit = true; //TODO add logic
const firstRouteThirdVisit =
  "/" +
  SURVEY_LOGIN_DRITTERBESUCH.baseUrl +
  "/" +
  SURVEY_LOGIN_DRITTERBESUCH.surveyItems[0].questionId;

const nextRoute = isThirdVisit ? firstRouteThirdVisit : "/";

function Screen({ globalData }) {
  return (
    <>
      <p>
        Danke <strong>Nickname</strong> für deine Anmeldung! <br />
        <br />
        Logge dich aus und genieße deinen Aufenthalt im Lokallabor!
      </p>
      <RobiGif style={{ transform: "rotate(2.2deg)", width: 331 }} />
      <ButtonNext to={nextRoute}>Log Out</ButtonNext>
    </>
  );
}

export default Screen;
