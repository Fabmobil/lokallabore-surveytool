import { useNavigate } from "react-router-dom";
import WeiterButton from "../../../components/WeiterButton";
import TextInput from "../../../components/TextInput";

function Screen({ onSubmit, data, nextRoute, onFinalSubmit }) {
  const navigate = useNavigate()
  return (
    <>
      <p>Sonst noch was? </p>
      <div className="vertical-center">
        <TextInput value={data} onChange={(val) => onSubmit(val)} />
      </div>
      <WeiterButton onClick={() => onFinalSubmit().then(() => { navigate(nextRoute) })} text="Und fertig!" />
    </>
  );
}

export default Screen;
