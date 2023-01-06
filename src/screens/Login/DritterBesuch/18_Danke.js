import ButtonNext from "../../../components/ButtonNext";
import emojiHappy from "../../../assets/happy.png";

function Screen({ globalData }) {
  return (
    <>
      <p>
        Danke <span className="font-bold">{globalData.nickname}</span>! <br />
        Viel Spaß im Lokallabor!
      </p>
      <img alt="" src={emojiHappy} className="w-12 ml-auto mt-6" />
      <ButtonNext to="/">Log Out</ButtonNext>
    </>
  );
}

export default Screen;
