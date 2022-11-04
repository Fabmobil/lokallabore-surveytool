import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import StartScreen from "./screens/0_Start";
import SURVEY_REGISTRIERUNG from "./constants/survey-registrierung";
import SURVEY_LOGIN from "./constants/survey-login";
import SURVEY_LOGIN_DRITTERBESUCH from "./constants/survey-login-dritterbesuch";
import SURVEY_GUEST from "./constants/survey-guest";

class App extends React.Component {
  constructor(props) {
    super(props);
    //this.firebaseClient = new FirebaseClient();
    this.state = {
      surveyAnswersRegistrierung: {},
      surveyAnswersLogin: {},
      surveyAnswersThirdVisit: {},
      surveyAnswersGuest: {},
    };
  }

  resetSurveyData() {
    this.setState({
      surveyAnswersRegistrierung: {},
      surveyAnswersLogin: {},
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

  getNextRoute(schema, i) {
    if (i + 1 < schema.surveyItems.length) {
      return "/" + schema.baseUrl + "/" + schema.surveyItems[i + 1].questionId;
    }
    return "/";
  }

  render() {
    return (
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <Layout
                onLogoClick={() => {
                  this.resetSurveyData();
                }}
              />
            }
          >
            <Route path="" element={<StartScreen />} />
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
                    onFinalSubmit={
                      item.isFinal && (() => this.onFinalSubmitRegistrierung())
                    }
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
                    onFinalSubmit={
                      item.isFinal && (() => this.onFinalSubmitLogin())
                    }
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
                    onFinalSubmit={
                      item.isFinal && (() => this.onFinalSubmitLogin())
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
                      item.isFinal && (() => this.onFinalSubmitGuest())
                    }
                  ></item.screenComponent>
                }
              />
            ))}
          </Route>
        </Routes>
      </BrowserRouter>
    );
  }
}

export default App;
