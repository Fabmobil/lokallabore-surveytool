import ButtonNext from "../../components/ButtonNext";

function Screen({ globalData }) {
  return (
    <>
      <p>
        Danke <strong>Nickname</strong> für deine Mühe! Als Dank gibts hier für
        dich einen supernicen Emoji-Maker
      </p>
      <ButtonNext to="/">Log Out</ButtonNext>
    </>
  );
}

export default Screen;
