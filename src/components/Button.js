import React from "react";
import classnames from "classnames";

function Button({ disabled, className, onClick, style, isActive, children }) {
  return (
    <div
      onClick={onClick}
      className={classnames(
        "max-w-4xl text-2xl border-black border-2 h-16 flex items-center justify-center cursor-pointer px-4",
        { "text-gray cursor-not-allowed": disabled },
        { "bg-white": !isActive },
        { "text-white bg-black": isActive },
        className
      )}
      style={style}
    >
      {children || "..."}
    </div>
  );
}

export default Button;

/*
.Fabutton {
  background-color: white;
  border: 2px solid black;
  height: var(--button-height-short);
  max-width: var(--button-max-width);
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  cursor: pointer;
}*/
