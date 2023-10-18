import { useNavigate } from "react-router-dom";
import WeiterButton from "../../components/WeiterButton";
import TextInput from "../../components/TextInput";
import RobiGif from "../../components/RobiGif";
import RobiFlameGif from "../../assets/robi-gifs/Robi_flamme-min.gif";
import SURVEY_LOGIN_EXTENDED from "../../constants/survey-login-extended";

function exposeExtendedSurvey(globalData) {
  if (process.env.REACT_APP_ENABLE_EXTENDED) {
    //For testing reasons...
    return true;
  }
  if (globalData.isBetreuerin === true) {
    //Biz logic: Betreuerinnen never get to see the extended survey
    return false;
  }
  const previousNumberOfVisits = globalData.numberOfVisits;
  if (!previousNumberOfVisits) return false;
  const currentVisitNo = previousNumberOfVisits + 1; //; it is previous one +1 because current not yet submitted
  return currentVisitNo % 3 === 0; //expose extended on every 3rd! visit
}

const firstRouteExtendedSurvey =
  "/" +
  SURVEY_LOGIN_EXTENDED.baseUrl +
  "/" +
  SURVEY_LOGIN_EXTENDED.surveyItems[0].questionId;

function Screen({ onSubmit, data, nextRoute, onFinalSubmit, globalData }) {
  const extended = exposeExtendedSurvey(globalData);
  const navigate = useNavigate();
  return (
    <>
      <p>Hast du Verbesserungswünsche? </p>
      <div className="vertical-center">
        <TextInput value={data} onChange={(val) => onSubmit(val)} />
        <RobiGif
          src={RobiFlameGif}
          className={"w-72"}
          style={{ transform: "rotate(30deg)" }}
        />
      </div>

      <WeiterButton
        text={!extended ? "Und fertig!" : ""}
        onClick={
          extended
            ? () => {}
            : () => {
                onFinalSubmit().then(() => {
                  navigate(nextRoute);
                });
              }
        }
        navigateTo={extended ? firstRouteExtendedSurvey : undefined}
      />
    </>
  );
}

export default Screen;
