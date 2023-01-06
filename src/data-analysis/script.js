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
  console.log("Number of answers: ", dataLength);
  const mostRecent = data[dataLength - 1];
  console.log("Most recent answer: ", mostRecent.date);
  //Sanity Checks
  console.log("-- Sanity checks...");
  //SC1: Are there entries without userID (those cant be matched)?
  const entriesWithUserId = data.filter((el) => "userID" in el);
  const entriesWithoutUserId = data.filter((el) => !("userID" in el));
  console.log("Entries with user ID: ", entriesWithUserId.length);
  console.log("Entries without user ID: ", entriesWithoutUserId.length);
  //SC2: How many entries exist by the same user? (we expect 1)
  const entriesPerUserName = groupBy(entriesWithUserId, "userID"); // how many entries exist by the same user? (we expect 1)
  const usersWithMoreThanOneEntry = [];
  Object.keys(entriesPerUserName).forEach((user) => {
    if (entriesPerUserName[user].length > 1) {
      usersWithMoreThanOneEntry.push({
        [user]: entriesPerUserName[user].length,
      });
    }
  });
  console.log("Users with more than 1 entry: ", usersWithMoreThanOneEntry);
}

function sortByDate(arr) {
  arr.sort(
    (el1, el2) => new Date(el1.date).valueOf() - new Date(el2.date).valueOf()
  );
}

function doData(data) {
  console.log("... Lokallabore Data Analysis... ");
  const users = Object.keys(data["users"]);
  const answersRegistrierung = Object.values(data["answersRegistrierung"]);
  const answersLogin = Object.values(data["answersLogin"]);
  const answersGuest = Object.values(data["answersGuest"]);
  sortByDate(answersRegistrierung);
  sortByDate(answersLogin);
  sortByDate(answersGuest);
  console.log("Number of users: ", users.length);
  console.log("--------- Analytics Answers/Registrierung --------- ");
  analyzeAnswerSet(answersRegistrierung);
  console.log("--------- Analytics Answers/Login --------- ");
  analyzeAnswerSet(answersLogin);
  console.log("--------- Analytics Answers/Guest --------- ");
  analyzeAnswerSet(answersGuest);
  return {
    dataRegistrierung: answersRegistrierung,
    dataLogin: answersLogin,
    dataGuest: answersGuest,
  };
}

export default doData;
