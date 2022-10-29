import classNames from "classnames";

function TextInput({ value, style, onChange, className, ...otherProps }) {
  return (
    <input
      type="text"
      className={classNames(
        "h-16 w-full border-2 border-black text-inherit text-center",
        className
      )}
      value={value}
      onChange={(e) => {
        onChange(e.target.value);
      }}
      {...otherProps}
    ></input>
  );
}

export default TextInput;
