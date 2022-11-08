import { useRef, useState, useEffect } from "react";

function VerticalGrid({ children, style, className }) {
  return (
    <div className={className}>
      <div className="grid grid-cols-2 gap-y-5 overflow-y-scroll mx-auto max-w-2xl">
        {children}
      </div>
    </div>
  );
}

export default VerticalGrid;
