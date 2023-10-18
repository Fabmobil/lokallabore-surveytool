import S01BevorDuGehst from "../screens/Login/Login_Extended/01_BevorDuGehst";
import S02Spass from "../screens/Login/Login_Extended/02_Spass";
import S03Interesse from "../screens/Login/Login_Extended/03_Interesse";
import S04Angebot from "../screens/Login/Login_Extended/04_Angebot";
import S05Verbesserungsideen from "../screens/Login/Login_Extended/05_Verbesserungsideen";
import S06Technologien from "../screens/Login/Login_Extended/06_Technologien";
import S07Favoriten from "../screens/Login/Login_Extended/07_Favoriten";
import S08Betreuung from "../screens/Login/Login_Extended/08_Betreuung";
import S093DDruck from "../screens/Login/Login_Extended/09_3DDruck";
import S10VR from "../screens/Login/Login_Extended/10_VR";
import S11Lasercutter from "../screens/Login/Login_Extended/11_Lasercutter";
import S123DModelling from "../screens/Login/Login_Extended/12_3DModelling";
import S13Mikroelektronik from "../screens/Login/Login_Extended/13_Mikroelektronik";
import S14Programmieren from "../screens/Login/Login_Extended/14_Programmieren";
import S15Erwartungen from "../screens/Login/Login_Extended/15_Erwartungen";
import S16IdeenDrosos from "../screens/Login/Login_Extended/16_IdeenDrosos";
import S17Sonstiges from "../screens/Login/Login_Extended/17_Sonstiges";
import S18Danke from "../screens/Login/Login_Extended/18_Danke";

const SURVEY_LOGIN_DRITTERBESUCH = {
  baseUrl: "login",
  surveyItems: [
    {
      questionId: "bevor-du-gehst",
      screenComponent: S01BevorDuGehst,
    },
    {
      questionId: "spass",
      screenComponent: S02Spass,
    },
    {
      questionId: "interesse",
      screenComponent: S03Interesse,
    },
    {
      questionId: "angebot",
      screenComponent: S04Angebot,
    },
    {
      questionId: "verbesserung",
      screenComponent: S05Verbesserungsideen,
    },
    {
      questionId: "technologien",
      screenComponent: S06Technologien,
    },
    {
      questionId: "favoriten",
      screenComponent: S07Favoriten,
    },
    {
      questionId: "betreuung",
      screenComponent: S08Betreuung,
    },
    {
      questionId: "3d-druck",
      screenComponent: S093DDruck,
    },
    {
      questionId: "vr",
      screenComponent: S10VR,
    },
    {
      questionId: "lasercutter",
      screenComponent: S11Lasercutter,
    },
    {
      questionId: "3d-modelling",
      screenComponent: S123DModelling,
    },
    {
      questionId: "mikroelektronik",
      screenComponent: S13Mikroelektronik,
    },
    {
      questionId: "programmieren",
      screenComponent: S14Programmieren,
    },
    {
      questionId: "erwartungen",
      screenComponent: S15Erwartungen,
    },
    {
      questionId: "ideen",
      screenComponent: S16IdeenDrosos,
    },
    {
      questionId: "sonstiges",
      screenComponent: S17Sonstiges,
      isFinal: true,
    },
    {
      questionId: "danke",
      screenComponent: S18Danke,
    },
  ],
};

export default SURVEY_LOGIN_DRITTERBESUCH;
