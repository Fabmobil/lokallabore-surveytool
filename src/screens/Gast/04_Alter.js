import { useRef, useState, useEffect } from "react";
import WeiterButton from "../../components/WeiterButton";
import TextInput from "../../components/TextInput";
import RobiGif from "../../components/RobiGif";
import RobiLongarmTouchGif from "../../assets/robi-gifs/Robi_longarmtouch-min.gif";

const robiWidth = 332;

function Screen({ onSubmit, data, nextRoute }) {
  function hasUserAnswered() {
    return !!data;
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

  return (
    <>
      <p>Wie alt bist du?</p>
      <div className="vertical-center">
        <div ref={containerRef}>
          <TextInput value={data} onChange={(val) => onSubmit(val)} />
        </div>
      </div>
      <RobiGif
        className="fixed"
        src={RobiLongarmTouchGif}
        style={{ width: robiWidth, left: robiX, top: robiY - 90 }}
      />
      <WeiterButton disabled={!hasUserAnswered()} navigateTo={nextRoute} />
    </>
  );
}

export default Screen;
