import { initializeApp } from "firebase/app";
import { getDatabase, ref, push, set, get, child } from "firebase/database"; //import getterFunction of database service
import firebaseConfig from "./config.js";

class Client {
  constructor() {
    this.app = initializeApp(firebaseConfig);
    // Require firebase services
    this.db = getDatabase(this.app);
    this.dbRef = ref(this.db);
  }

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

  userDoesExist(userId) {
    return get(child(this.dbRef, `users`)).then((snapshot) => {
      if (!userId) throw Error("No userID given");
      if (snapshot.exists()) {
        try {
          return Object.values(snapshot.val()).includes(userId);
        } catch {
          throw Error;
        }
      } else {
        throw Error;
      }
    });
  }
}

export default Client;
