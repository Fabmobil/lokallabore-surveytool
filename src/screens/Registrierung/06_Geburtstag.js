import WeiterButton from "../../components/WeiterButton";
import VerticalGrid from "../../components/VerticalGrid";
import TextInput from "../../components/TextInput";

function Screen({ onSubmit, data, nextRoute }) {
  function hasUserAnswered() {
    if (!data) return false;
    return !!data.day && !!data.month && !!data.year;
  }
  return (
    <>
      <p>Wann hast du Geburtstag? Damit meldest du dich künftig an.</p>
      <div className="vertical-center">
        <VerticalGrid>
          {/*Tag, Monat, Jahr */}
          <TextInput
            placeholder="Tag"
            pattern="[0-9]{2}"
            maxLength={2}
            value={data && data.day ? data.day : ""}
            onChange={(val) => onSubmit({ ...data, day: val })}
          />
          <TextInput
            placeholder="Monat"
            pattern="[0-9]{2}"
            maxLength={2}
            value={data && data.month ? data.month : ""}
            onChange={(val) => onSubmit({ ...data, month: val })}
          />
          <TextInput
            placeholder="Jahr"
            pattern="[0-9]{4}"
            maxLength={4}
            value={data && data.year ? data.year : ""}
            onChange={(val) => onSubmit({ ...data, year: val })}
          />
        </VerticalGrid>
      </div>
      <WeiterButton disabled={!hasUserAnswered()} navigateTo={nextRoute} />
    </>
  );
}

export default Screen;
