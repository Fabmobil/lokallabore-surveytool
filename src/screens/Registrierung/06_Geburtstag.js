import WeiterButton from "../../components/WeiterButton";
import VerticalGrid from "../../components/VerticalGrid";
import TextInput from "../../components/TextInput";

function prefixWithZero(numberString) {
  if (!numberString) return "";
  return numberString.length > 1 ? numberString : `0${numberString}`;
}

function Screen({ onSubmit, data, nextRoute }) {
  function hasUserAnswered() {
    if (!data) return false;
    if (!("day" in data) || !("month" in data) || !("year" in data))
      return false;
    if (!data.day.match(/^[0-9]{2}$/)) return false;
    if (!data.month.match(/^[0-9]{2}$/)) return false;
    if (!data.year.match(/^[0-9]{4}$/)) return false;
    return true;
  }
  console.log("data", data);
  return (
    <>
      <p>Wann hast du Geburtstag? Damit meldest du dich künftig an.</p>
      <div className="vertical-center">
        <VerticalGrid>
          {/*Tag, Monat, Jahr */}
          <TextInput
            placeholder="31"
            pattern="[0-9]{2}"
            minLength={2}
            maxLength={2}
            value={data && data.day ? data.day : ""}
            onChange={(val) => onSubmit({ ...data, day: val })}
            onBlur={() => onSubmit({ ...data, day: prefixWithZero(data.day) })}
          />
          <TextInput
            placeholder="01"
            pattern="[0-9]{2}"
            minLength={2}
            maxLength={2}
            value={data && data.month ? data.month : ""}
            onChange={(val) => onSubmit({ ...data, month: val })}
            onBlur={() =>
              onSubmit({ ...data, month: prefixWithZero(data.month) })
            }
          />
          <TextInput
            placeholder="2001"
            pattern="[0-9]{4}"
            minLength={4}
            maxLength={4}
            value={data && data.year ? data.year : ""}
            onChange={(val) => onSubmit({ ...data, year: val })}
          />
          <WeiterButton
            disabled={!hasUserAnswered()}
            navigateTo={nextRoute}
            style={{ position: "static" }}
          />
        </VerticalGrid>
      </div>
    </>
  );
}

export default Screen;
