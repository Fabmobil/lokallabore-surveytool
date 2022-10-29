import ButtonNext from "../../components/ButtonNext";

function Screen({ globalData }) {
  return (
    <>
      <p>
        Danke <strong>{globalData.nickname || " "}</strong>! <br />
        Viel Spaß im Lokallabor!
      </p>
      <ButtonNext to="/">Log Out</ButtonNext>
    </>
  );
}

export default Screen;
