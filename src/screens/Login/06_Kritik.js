import WeiterButton from "../../components/WeiterButton";
import TextInput from "../../components/TextInput";
import RobiGif from "../../components/RobiGif";
import RobiFlameGif from "../../assets/robi-gifs/Robi_flamme-min.gif";
import SURVEY_LOGIN_DRITTERBESUCH from "../../constants/survey-login-dritterbesuch";
import { useState, useEffect } from "react";


function isThirdVisit(nVisits) {
  if (!nVisits) return false
  return nVisits % 3 === 0;
}

const firstRouteThirdVisit =
  "/" +
  SURVEY_LOGIN_DRITTERBESUCH.baseUrl +
  "/" +
  SURVEY_LOGIN_DRITTERBESUCH.surveyItems[0].questionId;

function Screen({ onSubmit, data, nextRoute, onFinalSubmit, firebaseClient }) {
  const [numberVisits, setNumberVisits] = useState(false);

  useEffect(() => {
    const nVisits = firebaseClient.getNumberOfVisits('alexa05041987')
    setNumberVisits(nVisits);
  }, []);

  return (
    <>
      <p>Hast du Verbesserungswünsche? </p>
      <div className="vertical-center">
        <TextInput value={data} onChange={(val) => onSubmit(val)} />
        <RobiGif src={RobiFlameGif} style={{ transform: "rotate(30deg)" }} />
      </div>

      <WeiterButton
        disabled={numberVisits == false}
        onClick={isThirdVisit(numberVisits) ? () => { } : onFinalSubmit}
        navigateTo={isThirdVisit(numberVisits) ? firstRouteThirdVisit : nextRoute}
      />
    </>
  );
}

export default Screen;
