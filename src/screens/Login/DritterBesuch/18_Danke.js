import ButtonNext from "../../../components/ButtonNext";
import emojiHappy from "../../../assets/happy.png";

function Screen({ globalData }) {
  return (
    <>
      <p>
        Danke <span className="font-bold">{globalData.nickname}</span> für deine Mühe! <br />
        <br />
        Als Dank gibts hier für dich einen supernicen Emoji-Maker
      </p>
      <img alt="" src={emojiHappy} className="w-12 ml-auto mt-6" />
      <ButtonNext to="/">Log Out</ButtonNext>
    </>
  );
}

export default Screen;
