import { useNavigate } from "react-router-dom";
import Button from "../../../components/Button";
import WeiterButton from "../../../components/WeiterButton";
import Slider from "../../../components/Slider";
import imageTop from "../../../assets/herz.png";
import DoubleButtonRow from "../../../components/DoubleButtonRow";

const ANSWER_OPTION = "Nie probiert";

function Screen({ onSubmit, data, nextRoute }) {
  const navigate = useNavigate();

  function hasUserAnswered() {
    return !isNaN(data) || data === ANSWER_OPTION;
  }

  return (
    <>
      <p>3D-Modelling rockt?</p>
      <Slider
        onChange={onSubmit}
        value={isNaN(data) ? 0 : data}
        imgTop={imageTop}
        imgBottom={
          "data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=oo"
        }
      />
      <DoubleButtonRow>
        <Button
          isActive={data === ANSWER_OPTION}
          onClick={() => {
            onSubmit(ANSWER_OPTION);
            setTimeout(() => navigate(nextRoute), 500);
          }}
          className="border-r-0"
        >
          Nie probiert
        </Button>
        <WeiterButton
          inner
          disabled={!hasUserAnswered()}
          navigateTo={nextRoute}
          style={{ marginLeft: 0 }}
        />
      </DoubleButtonRow>
    </>
  );
}

export default Screen;
