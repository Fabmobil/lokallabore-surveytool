import { initializeApp } from "firebase/app";
import { getDatabase, ref, push, set, get, child, increment } from "firebase/database"; //import getterFunction of database service
import firebaseConfig from "./config.js";

class Client {
  constructor() {
    this.app = initializeApp(firebaseConfig);
    // Require firebase services
    this.db = getDatabase(this.app);
    this.dbRef = ref(this.db);
  }

  createUserID(nickname, geburtstag) {
    if (!nickname || !geburtstag) { throw Error("Can't create nickname") }
    return `${nickname}${geburtstag.day}${geburtstag.month}${geburtstag.year}`;
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

  postUser(userId) {
    return set(ref(this.db, 'users/' + userId), {
      numberOfVisits: 1,
    });
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

  incrementNumberOfVisits(userId) {
    const db = getDatabase();
    return set(ref(db, 'users/' + userId), {
      numberOfVisits: increment(1),
    });
  }

  getNumberOfVisits(userId) {
    const db = getDatabase();
    return get(ref(db, 'users/' + userId)).then(snapshot => {
      if (snapshot.exists() && snapshot.val()) {
        return snapshot.val().numberOfVisits;
      }
      return undefined
    });
  }

  logVisit(userId) {
    set(ref(this.db, 'visitsByUserId/' + userId), {
      hello: "world"
    });

  }

}

export default Client;
