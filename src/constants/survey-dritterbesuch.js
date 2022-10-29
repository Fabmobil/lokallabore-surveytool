import S01BevorDuGehst from "../screens/DritterBesuch/01_BevorDuGehst";
import S02Spass from "../screens/DritterBesuch/02_Spass";
import S03Interesse from "../screens/DritterBesuch/03_Interesse";
import S04Angebot from "../screens/DritterBesuch/04_Angebot";
import S05Verbesserungsideen from "../screens/DritterBesuch/05_Verbesserungsideen";
import S06Technologien from "../screens/DritterBesuch/06_Technologien";
import S07Favoriten from "../screens/DritterBesuch/07_Favoriten";
import S08Betreuung from "../screens/DritterBesuch/08_Betreuung";
import S093DDruck from "../screens/DritterBesuch/09_3DDruck";
import S10VR from "../screens/DritterBesuch/10_VR";
import S11Lasercutter from "../screens/DritterBesuch/11_Lasercutter";
import S123DModelling from "../screens/DritterBesuch/12_3DModelling";
import S13Mikroelektronik from "../screens/DritterBesuch/13_Mikroelektronik";
import S14Programmieren from "../screens/DritterBesuch/14_Programmieren";
import S15Erwartungen from "../screens/DritterBesuch/15_Erwartungen";
import S16IdeenDrosos from "../screens/DritterBesuch/16_IdeenDrosos";
import S17Sonstiges from "../screens/DritterBesuch/17_Sonstiges";
import S18Danke from "../screens/DritterBesuch/18_Danke";

const SURVEY_REGISTRIERUNG = {
  baseUrl: "dritter-besuch",
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
    },
    {
      questionId: "danke",
      screenComponent: S18Danke,
    },
  ],
};

export default SURVEY_REGISTRIERUNG;
