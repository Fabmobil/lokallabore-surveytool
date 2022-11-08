import S01Anmeldung from "../screens/Login/01_Anmeldung";
import S02Ort from "../screens/Login/02_Ort";
import S03Betreuende from "../screens/Login/03_Betreuende";
import S04Vorhaben from "../screens/Login/04_Vorhaben";
import S05Dauer from "../screens/Login/05_Dauer";
import S06Kritik from "../screens/Login/06_Kritik";
import S07Logout from "../screens/Login/07_Logout";

const SURVEY_LOGIN = {
  baseUrl: "login",
  surveyItems: [
    {
      questionId: "anmeldung",
      screenComponent: S01Anmeldung,
    },
    {
      questionId: "ort",
      screenComponent: S02Ort,
    },
    {
      questionId: "betreuende",
      screenComponent: S03Betreuende,
    },
    {
      questionId: "vorhaben",
      screenComponent: S04Vorhaben,
    },
    {
      questionId: "dauer",
      screenComponent: S05Dauer,
    },
    {
      questionId: "kritik",
      screenComponent: S06Kritik,
      isFinal: true,
    },
    {
      questionId: "logout",
      screenComponent: S07Logout,
    },
  ],
};

export default SURVEY_LOGIN;
