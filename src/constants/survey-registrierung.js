import S01Start from "../screens/Registrierung/01_Start";
import S02Ort from "../screens/Registrierung/02_Ort";
import S03Besuch from "../screens/Registrierung/03_Besuch";
import S04Postleitzahl from "../screens/Registrierung/04_Postleitzahl";
import S05Geschlecht from "../screens/Registrierung/05_Geschlecht";
import S06Geburtstag from "../screens/Registrierung/06_Geburtstag";
import S07Nickname from "../screens/Registrierung/07_Nickname";
import S08Danke from "../screens/Registrierung/08_Danke";
import S09Grund from "../screens/Registrierung/09_Grund";
import S10Vorhaben from "../screens/Registrierung/10_Vorhaben";
import S11Betreuende from "../screens/Registrierung/11_Betreuende";
import S12Werbung from "../screens/Registrierung/12_Werbung";
import S13Teilnahme from "../screens/Registrierung/13_Teilnahme";
import S14Sonstiges from "../screens/Registrierung/14_Sonstiges";
import S15Logout from "../screens/Registrierung/15_Logout";

const SURVEY_REGISTRIERUNG = {
  baseUrl: "registrierung",
  surveyItems: [
    {
      questionId: "start",
      screenComponent: S01Start,
    },
    {
      questionId: "ort",
      screenComponent: S02Ort,
    },
    {
      questionId: "besuch",
      screenComponent: S03Besuch,
    },
    {
      questionId: "postleitzahl",
      screenComponent: S04Postleitzahl,
    },
    {
      questionId: "geschlecht",
      screenComponent: S05Geschlecht,
    },
    {
      questionId: "geburtstag",
      screenComponent: S06Geburtstag,
    },
    {
      questionId: "nickname",
      screenComponent: S07Nickname,
    },
    {
      questionId: "danke",
      screenComponent: S08Danke,
    },
    {
      questionId: "grund",
      screenComponent: S09Grund,
    },
    {
      questionId: "vorhaben",
      screenComponent: S10Vorhaben,
    },
    {
      questionId: "betreuende",
      screenComponent: S11Betreuende,
    },
    {
      questionId: "werbung",
      screenComponent: S12Werbung,
    },
    {
      questionId: "teilnahme",
      screenComponent: S13Teilnahme,
    },
    {
      questionId: "sonstiges",
      screenComponent: S14Sonstiges,
    },
    {
      questionId: "logout",
      screenComponent: S15Logout,
    },
  ],
};

export default SURVEY_REGISTRIERUNG;
