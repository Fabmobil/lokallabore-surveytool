import { initializeApp } from "firebase/app";
import { getDatabase, ref, push, set } from "firebase/database"; //import getterFunction of database service
import firebaseConfig from "./config.js";

class Client {
  constructor() {
    this.app = initializeApp(firebaseConfig);
    // Require firebase services
    this.db = getDatabase(this.app);
    this.dbRef = ref(this.db);
  }

  // get() {
  //   get(child(this.dbRef, `foo`))
  //     .then((snapshot) => {
  //       if (snapshot.exists()) {
  //         console.log(snapshot.val());
  //       } else {
  //         console.log("No data available");
  //       }
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //     });
  // }

  postAnswersRegistrierung(data) {
    const answerListRef = ref(this.db, "answersRegistrierung");
    const newAnswerRef = push(answerListRef);
    return set(newAnswerRef, data);
  }

  postAnswersLogin(data) {
    const answerListRef = ref(this.db, "answersLogin");
    const newAnswerRef = push(answerListRef);
    return set(newAnswerRef, data);
  }

  postAnswersGuest(data) {
    const answerListRef = ref(this.db, "answersGuest");
    const newAnswerRef = push(answerListRef);
    return set(newAnswerRef, data);
  }

  postUser(data) {
    const userListRef = ref(this.db, "users");
    const newUserRef = push(userListRef);
    return set(newUserRef, data);
  }
}

export default Client;
