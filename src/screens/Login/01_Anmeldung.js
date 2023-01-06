import WeiterButton from "../../components/WeiterButton";
import VerticalGrid from "../../components/VerticalGrid";
import TextInput from "../../components/TextInput";
import { useNavigate } from "react-router";

function Screen({
  onSubmit,
  data,
  nextRoute,
  firebaseClient,
  onLogin,
  onError = () => {},
}) {
  const navigate = useNavigate();
  function hasUserAnswered() {
    if (!data) return false;
    if (!data.day.match(/^[0-9]{2}$/)) return false;
    if (!data.month.match(/^[0-9]{2}$/)) return false;
    if (!data.year.match(/^[0-9]{4}$/)) return false;
    return !!data.nickname && !!data.day && !!data.month && !!data.year;
  }
  return (
    <>
      <p>Melde dich mit deinem Spitznamen und Geburtstag an :)</p>
      <div className="vertical-center">
        <VerticalGrid>
          <TextInput
            placeholder="Nickname"
            value={data && data.nickname ? data.nickname : ""}
            onChange={(val) => onSubmit({ ...data, nickname: val })}
          />
          {/*Tag, Monat, Jahr */}
          <TextInput
            placeholder="TT"
            minLength={2}
            maxLength={2}
            value={data && data.day ? data.day : ""}
            onChange={(val) => onSubmit({ ...data, day: val })}
          />
          <TextInput
            placeholder="MM"
            minLength={2}
            maxLength={2}
            value={data && data.month ? data.month : ""}
            onChange={(val) => onSubmit({ ...data, month: val })}
          />
          <TextInput
            placeholder="JJJJ"
            minLength={4}
            maxLength={4}
            value={data && data.year ? data.year : ""}
            onChange={(val) => onSubmit({ ...data, year: val })}
          />
        </VerticalGrid>
      </div>
      <WeiterButton
        disabled={!hasUserAnswered()}
        onClick={() => {
          const userID = firebaseClient.createUserID(data.nickname, {
            day: data.day,
            month: data.month,
            year: data.year,
          });
          return firebaseClient
            .userDoesExist(userID)
            .then((doesExist) => {
              if (!doesExist) {
                onError("USER_EXISTS_NOT");
                throw Error();
              }
              onLogin(userID);
            })
            .then(() => {
              navigate(nextRoute);
            })
            .catch((err) => console.log("Error", err));
        }}
      />
    </>
  );
}

export default Screen;
