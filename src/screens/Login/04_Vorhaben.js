import { useRef, useState, useEffect } from "react";
import WeiterButton from "../../components/WeiterButton";
import TextInput from "../../components/TextInput";
import RobiGif from "../../components/RobiGif";
import RobiLongarmTouchGif from "../../assets/robi-gifs/Robi_longarmtouch-min.gif";
import MultipleChoiceTool from "../../components/MultipleChoiceTool";
import VerticalGrid from "../../components/VerticalGrid";

const robiWidth = 332;

function Screen({ onSubmit, data, nextRoute }) {
  function hasUserAnswered() {
    if (data && data.predefinedValues && data.predefinedValues.length > 0) {
      return true;
    }
    if (data && data.freeValue && data.freeValue.length > 0) {
      return true;
    }
    return false;
  }

  const containerRef = useRef(null);
  const [robiY, setRobiY] = useState(0);
  const [robiX, setRobiX] = useState(0);

  function updateRobiX() {
    const textBox = containerRef.current.firstElementChild;
    const target = textBox.getBoundingClientRect().x + textBox.offsetWidth / 2;
    setRobiX(target - robiWidth + 80);
  }

  function updateRobiY() {
    const textBox = containerRef.current.firstElementChild;
    setRobiY(textBox.offsetTop + textBox.offsetHeight);
  }

  useEffect(() => {
    updateRobiX();
    updateRobiY();

    const resizeListener = () => {
      updateRobiX();
      updateRobiY();
    };
    window.addEventListener("resize", resizeListener);
    return () => {
      window.removeEventListener("resize", resizeListener);
    };
  }, [data]);

  function changePredefinedValues(data, vals) {
    return { ...data, predefinedValues: vals };
  }
  function changeFreeValue(data, val) {
    return { ...data, freeValue: val };
  }

  return (
    <>
      <p>Was möchtest du heute gerne machen?</p>
      <div ref={containerRef} className="vertical-center">
        <VerticalGrid>
          <MultipleChoiceTool
            options={["Freies Arbeiten"]}
            onChange={(vals) => onSubmit(changePredefinedValues(data, vals))}
            data={(data && data.predefinedValues) || null}
          />
          <TextInput
            placeholder="Ich möchte..."
            value={(data && data.freeValue) || ""}
            onChange={(val) => onSubmit(changeFreeValue(data, val))}
          />
        </VerticalGrid>
      </div>
      <WeiterButton disabled={!hasUserAnswered()} navigateTo={nextRoute} />
      <RobiGif
        className="fixed"
        src={RobiLongarmTouchGif}
        style={{ width: robiWidth, left: robiX, top: robiY - 90 }}
      />
    </>
  );
}

export default Screen;
