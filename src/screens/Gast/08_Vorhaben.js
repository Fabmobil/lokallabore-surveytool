import { useRef, useState, useEffect } from "react";
import WeiterButton from "../../components/WeiterButton";
import TextInput from "../../components/TextInput";
import RobiGif from "../../components/RobiGif";
import RobiSliderGif from "../../assets/robi-gifs/Robi_slider-min.gif";

const robiWidth = 200;

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
      <p>Was möchtest du hier gerne machen?</p>
      <div className="vertical-center" ref={containerRef}>
        <TextInput value={data} onChange={(val) => onSubmit(val)} />
      </div>
      <RobiGif
        className="fixed"
        src={RobiSliderGif}
        style={{
          width: robiWidth,
          transform: "rotate(159.46deg)",
          left: robiX + 42,
          top: robiY - 30,
        }}
      />
      <WeiterButton disabled={!hasUserAnswered()} navigateTo={nextRoute} />
    </>
  );
}

export default Screen;
