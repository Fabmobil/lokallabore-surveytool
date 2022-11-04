import ButtonNext from "../../components/ButtonNext";
import emojiHappy from "../../assets/happy.png";

function Screen({ globalData }) {
  return (
    <>
      <p>
        Danke <strong>Nickname</strong> für deine Mühe! <br />
        <br />
        Als Dank gibts hier für dich einen supernicen Emoji-Maker
      </p>
      <img alt="" src={emojiHappy} />
      <ButtonNext to="/">Log Out</ButtonNext>
    </>
  );
}

export default Screen;
