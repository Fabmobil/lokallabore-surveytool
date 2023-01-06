import { useRef, useState, useEffect } from "react";

/* UX Hack: This creates a SCROLL AFFORDANCE for the user by manipulating the container height:
which makes elements half visible  */
function calculateMargin(outerEl, innerEl) {
  if (!outerEl && !innerEl) {
    return;
  }
  const GAP_HEIGHT = window.innerWidth < 768 ? 20 : 24; //corresponds to Tailwind values: md-breakpoint, gap-5 and gap-6
  const ITEM_HEIGHT = [...innerEl.children][0].clientHeight; //assumes that all items have same height...
  const SAFE_ZONE = 20;

  const hasOverflow = outerEl.scrollHeight > outerEl.clientHeight;
  let margin = 0;
  if (hasOverflow) {
    const rest = outerEl.clientHeight % (ITEM_HEIGHT + GAP_HEIGHT);
    if (rest < SAFE_ZONE) {
      margin = rest + GAP_HEIGHT + SAFE_ZONE;
    }
    if (rest > ITEM_HEIGHT - SAFE_ZONE) {
      margin = rest - SAFE_ZONE;
    }
  }
  return margin;
}

function VerticalGrid({ children = [], className }) {
  const containerRef = useRef(null);
  const containerInnerRef = useRef(null);
  const [marginBottom, setMarginBottom] = useState(0);

  function mh() {
    const margin = calculateMargin(
      containerRef.current,
      containerInnerRef.current
    );
    setMarginBottom(margin);
  }

  useEffect(() => {
    window.setTimeout(mh, 200);
    window.addEventListener("resize", mh);
    return () => {
      window.removeEventListener("resize", mh);
    };
  }, []);

  return (
    <div
      className={className}
      ref={containerRef}
      style={{ marginBottom: marginBottom }}
    >
      <div
        className="grid gap-5 md:gap-6 max-w-md flex-grow"
        ref={containerInnerRef}
      >
        {children}
      </div>
    </div>
  );
}

export default VerticalGrid;
