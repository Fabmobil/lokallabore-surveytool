import classNames from "classnames";
import robiHeartDefaultGif from "../assets/robi-gifs/Robi_heart-min.gif";

function RobiGif({ src, style, className }) {
  return (
    <div
      className={classNames("RobiGif pointer-events-none", className)}
      style={style}
    >
      <img src={src || robiHeartDefaultGif} style={{ height: "100%" }} alt="" />
    </div>
  );
}

export default RobiGif;
