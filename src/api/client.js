import axios from "axios";

class ApiClient {
  createUserID(nickname, geburtstag) {
    if (!nickname || !geburtstag) {
      throw Error("Can't create nickname");
    }
    return `${nickname}${geburtstag.day}${geburtstag.month}${geburtstag.year}`;
  }

  userDoesExist(userID) {
    if (!userID) throw Error("No userID given");
    return axios
      .get("/api/user-exists.php", { params: { userID } })
      .then((res) => res.data);
  }

  registerUser(userID) {
    return axios.post("/api/register-user.php", { userID }).catch((err) => {
      if (err.response && err.response.status === 409) {
        const conflict = new Error("User exists");
        conflict.code = "USER_EXISTS";
        throw conflict;
      }
      throw err;
    });
  }

  incrementNumberOfVisits(userID) {
    return axios.post("/api/increment-visits.php", { userID });
  }

  postAnswersRegistrierung(data) {
    return axios.post("/api/answers-registrierung.php", data);
  }

  postAnswersLogin(data) {
    return axios.post("/api/answers-login.php", data);
  }

  postAnswersGuest(data) {
    return axios.post("/api/answers-guest.php", data);
  }
}

export default ApiClient;
