import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import Layout2 from "./Layout2";
import StartScreen from "./screens/0_Start";
import SURVEY_REGISTRIERUNG from "./constants/survey-registrierung";
import SURVEY_LOGIN from "./constants/survey-login";
import SURVEY_LOGIN_DRITTERBESUCH from "./constants/survey-login-dritterbesuch";
import SURVEY_GUEST from "./constants/survey-guest";
import FirebaseClient from "./firebase/client";
import AlertLayer from "./AlertLayer";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.firebaseClient = new FirebaseClient();
    this.state = {
      surveyAnswersRegistrierung: {},
      surveyAnswersLogin: {},
      surveyAnswersGuest: {},
      error: null,
    };
  }

  getValueOrNone(surveyState, val1, val2) {
    try {
      return val2 ? surveyState[val1][val2] : surveyState[val1]
    } catch {
      return undefined
    }
  }

  resetSurveyData() {
    this.setState({
      surveyAnswersRegistrierung: {},
      surveyAnswersLogin: {},
      surveyAnswersGuest: {},
    });
  }

  logAnswerRegistrierung(questionId, answer) {
    this.setState(
      {
        ...this.state,
        surveyAnswersRegistrierung: {
          ...this.state.surveyAnswersRegistrierung,
          [questionId]: answer,
        },
      },
      () => {
        console.log(this.state);
      }
    );
  }

  logAnswerLogin(questionId, answer) {
    this.setState(
      {
        ...this.state,
        surveyAnswersLogin: {
          ...this.state.surveyAnswersLogin,
          [questionId]: answer,
        },
      },
      () => {
        console.log(this.state);
      }
    );
  }

  logAnswerGuest(questionId, answer) {
    this.setState(
      {
        ...this.state,
        surveyAnswersGuest: {
          ...this.state.surveyAnswersGuest,
          [questionId]: answer,
        },
      },
      () => {
        console.log(this.state);
      }
    );
  }

  submitAllAnswersRegistrierung() {
    const data = {
      ...this.state.surveyAnswersRegistrierung,
      date: new Date().toLocaleString(),
    };
    console.log("submitted data", data);
    this.firebaseClient
      .postAnswersRegistrierung(data)
      .catch((err) => alert("Etwas ist schief gelaufen.."));
  }

  submitAllAnswersLogin() {
    const data = {
      ...this.state.surveyAnswersLogin,
      date: new Date().toLocaleString(),
    };
    console.log("submitted data", data);
    return this.firebaseClient
      .postAnswersLogin(data)
      .catch((err) => alert("Etwas ist schief gelaufen.."));
  }

  reportError(errorCode) {
    this.setState({ ...this.state, error: errorCode })
  }

  clearError() {
    this.setState({ ...this.state, error: null })
  }

  createNewUser() {
    const { nickname, geburtstag } = this.state.surveyAnswersRegistrierung;
    const userID = this.firebaseClient.createUserID(nickname, geburtstag);

    return this.firebaseClient.userDoesExist(userID).then((doesExist) => {
      if (doesExist) {
        this.reportError('USER_EXISTS');
        throw Error();
      } else {
        this.firebaseClient
          .postUser(userID);
        this.logAnswerRegistrierung('userID', userID)
      }
    });
  }

  submitAllAnswersGuest() {
    const data = {
      ...this.state.surveyAnswersGuest,
      date: new Date().toLocaleString(),
    };
    console.log("submitted data", data);
    this.firebaseClient
      .postAnswersGuest(data)
      .catch((err) => alert("Etwas ist schief gelaufen.."));
  }

  onFinalSubmitRegistrierung() {
    this.submitAllAnswersRegistrierung();
  }

  onFinalSubmitGuest() {
    this.submitAllAnswersGuest();
    this.resetSurveyData();
  }

  onFinalSubmitLogin() {
    console.log("ofsli")
    return this.submitAllAnswersLogin()
      .then(() => { this.resetSurveyData(); console.log("reset!") })
      .then(() => { this.firebaseClient.incrementNumberOfVisits(this.state.surveyAnswersLogin.userID) });
  }

  getNextRoute(schema, i) {
    if (i + 1 < schema.surveyItems.length) {
      return "/" + schema.baseUrl + "/" + schema.surveyItems[i + 1].questionId;
    }
    return "/";
  }

  saveNumberOfVisits(userId) {
    this.firebaseClient.getNumberOfVisits(userId)
      .then((number) => { this.logAnswerLogin("calculatedNumberOfVisits", number) })
  }

  render() {
    return (<>
      <AlertLayer error={this.state.error} onCloseClick={() => this.clearError()} onAbandonConfirmClick={() => { this.resetSurveyData(); window.location = "/" }} />
      <BrowserRouter>
        <Routes>
          <Route path="" element={<Layout2 />}>
            <Route path="" element={<StartScreen />}></Route>
          </Route>
          <Route
            path="/"
            element={
              <Layout
                onLogoClick={(e) => {
                  e.preventDefault();
                  this.reportError('ABANDON')
                }}
              />
            }
          >

            {SURVEY_REGISTRIERUNG.surveyItems.map((item, i) => (
              <Route
                key={item.questionId}
                path={`${SURVEY_REGISTRIERUNG.baseUrl}/${item.questionId}`}
                element={
                  <item.screenComponent
                    nextRoute={this.getNextRoute(SURVEY_REGISTRIERUNG, i)}
                    onSubmit={(data) => {
                      this.logAnswerRegistrierung(item.questionId, data);
                    }}
                    data={
                      this.state.surveyAnswersRegistrierung[item.questionId]
                    }
                    globalData={{
                      nickname:
                        this.state.surveyAnswersRegistrierung["nickname"],
                    }}
                    onNicknameSubmit={() => this.createNewUser()}
                    onFinalSubmit={
                      () => this.onFinalSubmitRegistrierung()
                    }
                    onLogout={() => this.resetSurveyData()}

                  ></item.screenComponent>
                }
              />
            ))}

            {SURVEY_LOGIN.surveyItems.map((item, i) => (
              <Route
                key={item.questionId}
                path={`${SURVEY_LOGIN.baseUrl}/${item.questionId}`}
                element={
                  <item.screenComponent
                    nextRoute={this.getNextRoute(SURVEY_LOGIN, i)}
                    onSubmit={(data) => {
                      this.logAnswerLogin(item.questionId, data);
                    }}
                    data={this.state.surveyAnswersLogin[item.questionId]}
                    globalData={{
                      nickname: this.getValueOrNone(this.state.surveyAnswersLogin, "anmeldung", "nickname"),
                      numberOfVisits: this.state.surveyAnswersLogin['calculatedNumberOfVisits']
                    }}
                    onLogin={(userId) => { this.logAnswerLogin('userID', userId); this.saveNumberOfVisits(userId); }}
                    onFinalSubmit={
                      () => this.onFinalSubmitLogin()
                    }
                    firebaseClient={this.firebaseClient}
                    onError={(errorCode) => this.reportError(errorCode)}
                  ></item.screenComponent>
                }
              />
            ))}

            {SURVEY_LOGIN_DRITTERBESUCH.surveyItems.map((item, i) => (
              <Route
                key={item.questionId}
                path={`${SURVEY_LOGIN_DRITTERBESUCH.baseUrl}/${item.questionId}`}
                element={
                  <item.screenComponent
                    nextRoute={this.getNextRoute(SURVEY_LOGIN_DRITTERBESUCH, i)}
                    onSubmit={(data) => {
                      this.logAnswerLogin(item.questionId, data);
                    }}
                    data={this.state.surveyAnswersLogin[item.questionId]}
                    globalData={{
                      nickname: this.getValueOrNone(this.state.surveyAnswersLogin, "anmeldung", "nickname")
                    }}
                    onFinalSubmit={
                      () => this.onFinalSubmitLogin()
                    }
                  ></item.screenComponent>
                }
              />
            ))}

            {SURVEY_GUEST.surveyItems.map((item, i) => (
              <Route
                key={item.questionId}
                path={`${SURVEY_GUEST.baseUrl}/${item.questionId}`}
                element={
                  <item.screenComponent
                    nextRoute={this.getNextRoute(SURVEY_GUEST, i)}
                    onSubmit={(data) => {
                      this.logAnswerGuest(item.questionId, data);
                    }}
                    data={this.state.surveyAnswersGuest[item.questionId]}
                    onFinalSubmit={
                      () => this.onFinalSubmitGuest()
                    }
                  ></item.screenComponent>
                }
              />
            ))}
          </Route>
        </Routes>
      </BrowserRouter></>
    );
  }
}

export default App;
