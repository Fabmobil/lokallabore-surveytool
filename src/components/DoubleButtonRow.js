function DoubleButtonRow({ children }) {
  return (
    <div
      className={
        "flex fixed bottom-4 md-h:bottom-14 right-6 left-6 justify-between"
      }
    >
      {children}
    </div>
  );
}

export default DoubleButtonRow;
