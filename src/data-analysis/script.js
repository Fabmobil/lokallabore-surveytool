import { DateTime } from "luxon";
const logs = [];

function logWhatsHappening(...args) {
  const logLine = args.join(" ");
  console.log(logLine);
  logs.push(logLine);
}

const groupBy = (array, key) => {
  return array.reduce((result, currentValue) => {
    (result[currentValue[key]] = result[currentValue[key]] || []).push(
      currentValue
    );
    return result;
  }, {});
};

function analyzeAnswerSet(data) {
  const dataLength = data.length;
  logWhatsHappening("Number of answers: ", dataLength);
  const mostRecent = data[dataLength - 1];
  logWhatsHappening("Most recent answer: ", JSON.stringify(mostRecent.date));
  //Sanity Checks
  //Sanity Check 1: Are there entries without userID (those cant be matched)?
  const entriesWithUserId = data.filter((el) => "userID" in el);
  const entriesWithoutUserId = data.filter((el) => !("userID" in el));
  logWhatsHappening("Entries with user ID: ", entriesWithUserId.length);
  logWhatsHappening("Entries without user ID: ", entriesWithoutUserId.length);
  //Sanity Check 2: How many entries exist by the same user? (we expect 1)
  const entriesPerUserName = groupBy(entriesWithUserId, "userID"); // how many entries exist by the same user? (we expect 1)
  const usersWithMoreThanOneEntry = [];
  Object.keys(entriesPerUserName).forEach((user) => {
    if (entriesPerUserName[user].length > 1) {
      usersWithMoreThanOneEntry.push({
        [user]: entriesPerUserName[user].length,
      });
    }
  });
  logWhatsHappening(
    "Users with more than 1 entry: ",
    JSON.stringify(usersWithMoreThanOneEntry)
  );
}

function sortByDate(arr) {
  arr.sort(
    (el1, el2) => new Date(el1.date).valueOf() - new Date(el2.date).valueOf()
  );
}

function convertUTCDatesToSaxonyTime(arr) {
  arr.forEach((el) => {
    el.date = DateTime.fromISO(el.date, {
      zone: "Europe/Paris",
    });
  });
}

function cleanAnswerSetGuest(arr) {
  arr.forEach((el) => {
    if (el.besuch) {
      const dataBesuch = `${[el.besuch.predefinedValue, el.besuch.freeValue]
        .filter(Boolean)
        .join(",")}`;
      el.besuch = dataBesuch;
    }
    if (el.geschlecht) {
      const dataGeschlecht = `${[
        (el.geschlecht.predefinedValues || []).join(","),
        el.geschlecht.freeValue,
      ]
        .filter(Boolean)
        .join(",")}`;
      el.geschlecht = dataGeschlecht;
    }
  });
}

function cleanAnswerSetRegistrierung(arr) {
  //besuch, geburtstag, geschlecht
  arr.forEach((el) => {
    if (el.besuch) {
      const dataBesuch = `${[el.besuch.predefinedValue, el.besuch.freeValue]
        .filter(Boolean)
        .join(",")}`;
      el.besuch = dataBesuch;
    }
    if (el.geschlecht) {
      const dataGeschlecht = `${[
        (el.geschlecht.predefinedValues || []).join(","),
        el.geschlecht.freeValue,
      ]
        .filter(Boolean)
        .join(",")}`;
      el.geschlecht = dataGeschlecht;
    }
  });
}

function cleanAnswerSetLogin(arr) {
  arr.forEach((el) => {
    if (el.technologien) {
      const dataTechnologien = `${[
        el.technologien.predefinedValue,
        el.technologien.freeValue,
      ]
        .filter(Boolean)
        .join(",")}`;
      el.technologien = dataTechnologien;
    }
    if (el.verbesserung) {
      const dataVerbesserung = `${[
        (el.verbesserung.predefinedValues || []).join(","),
        el.verbesserung.freeValue,
      ]
        .filter(Boolean)
        .join(",")}`;
      el.verbesserung = dataVerbesserung;
    }
  });
}

function doData(data, setInfo) {
  logWhatsHappening("LOKALLABORE DATA ANALYTICS");
  const users = Object.keys(data["users"]);
  const answersRegistrierung = Object.values(data["answersRegistrierung"]);
  const answersLogin = Object.values(data["answersLogin"]);
  const answersGuest = Object.values(data["answersGuest"]);
  cleanAnswerSetRegistrierung(answersRegistrierung);
  cleanAnswerSetLogin(answersLogin);
  cleanAnswerSetGuest(answersGuest);
  sortByDate(answersRegistrierung);
  sortByDate(answersLogin);
  sortByDate(answersGuest);
  convertUTCDatesToSaxonyTime(answersRegistrierung);
  convertUTCDatesToSaxonyTime(answersLogin);
  convertUTCDatesToSaxonyTime(answersGuest);
  logWhatsHappening("--------- Analytics Dataset USERS --------- ");
  logWhatsHappening("Number of registered users", users.length);
  logWhatsHappening("--------- Analytics Answers/Registrierung --------- ");
  analyzeAnswerSet(answersRegistrierung);
  logWhatsHappening("--------- Analytics Answers/Login --------- ");
  analyzeAnswerSet(answersLogin);
  logWhatsHappening("--------- Analytics Answers/Guest --------- ");
  analyzeAnswerSet(answersGuest);
  setInfo(logs);
  return {
    dataRegistrierung: answersRegistrierung,
    dataLogin: answersLogin,
    dataGuest: answersGuest,
  };
}

export default doData;
