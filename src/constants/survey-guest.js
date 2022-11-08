import S01Start from "../screens/Gast/01_Start";
import S02Ort from "../screens/Gast/02_Ort";
import S03Besuch from "../screens/Gast/03_Besuch";
import S04Alter from "../screens/Gast/04_Alter";
import S05Postleitzahl from "../screens/Gast/05_Postleitzahl";
import S06Geschlecht from "../screens/Gast/06_Geschlecht";
import S07Grund from "../screens/Gast/07_Grund";
import S08Vorhaben from "../screens/Gast/08_Vorhaben";
import S09Werbung from "../screens/Gast/09_Werbung";
import S10Teilhabe from "../screens/Gast/10_Teilhabe";
import S11Sonstiges from "../screens/Gast/11_Sonstiges";
import S12Ende from "../screens/Gast/12_Ende";

const SURVEY_GUEST = {
  baseUrl: "gast",
  surveyItems: [
    { questionId: "start", screenComponent: S01Start },
    { questionId: "ort", screenComponent: S02Ort },
    { questionId: "besuch", screenComponent: S03Besuch },
    { questionId: "alter", screenComponent: S04Alter },
    { questionId: "postleitzahl", screenComponent: S05Postleitzahl },
    { questionId: "geschlecht", screenComponent: S06Geschlecht },
    { questionId: "grund", screenComponent: S07Grund },
    { questionId: "vorhaben", screenComponent: S08Vorhaben },
    { questionId: "werbung", screenComponent: S09Werbung },
    { questionId: "teilhabe", screenComponent: S10Teilhabe },
    { questionId: "sonstiges", screenComponent: S11Sonstiges, isFinal: true },
    { questionId: "ende", screenComponent: S12Ende },
  ],
};

export default SURVEY_GUEST;
