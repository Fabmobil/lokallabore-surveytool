import WeiterButton from "../../components/WeiterButton";

import TextInput from "../../components/TextInput";

function Screen({ onSubmit, data, nextRoute }) {
  function hasUserAnswered() {
    if (!data) return false;
    return !!data.day && !!data.month && !!data.year;
  }
  return (
    <>
      <p>Wann hast du Geburtstag? Damit meldest du dich künftig an.</p>
      {/*Tag, Monat, Jahr */}
      <TextInput
        placeholder="Tag"
        value={data && data.day ? data.day : ""}
        onChange={(val) => onSubmit({ ...data, day: val })}
      />
      <TextInput
        placeholder="Monat"
        value={data && data.month ? data.month : ""}
        onChange={(val) => onSubmit({ ...data, month: val })}
      />
      <TextInput
        placeholder="Jahr"
        value={data && data.year ? data.year : ""}
        onChange={(val) => onSubmit({ ...data, year: val })}
      />
      <WeiterButton disabled={!hasUserAnswered()} navigateTo={nextRoute} />
    </>
  );
}

export default Screen;
