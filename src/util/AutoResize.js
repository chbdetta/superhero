import React, { useState, useRef, useEffect, useCallback } from "react";

export default function AutoResize(
  { children, width: containerWidth } = { width: "100%" }
) {
  const ref = useRef(null);
  const [width, setWidth] = useState(null);
  const onResize = useCallback(() => {
    setWidth(ref.current.clientWidth);
  }, [ref]);

  useEffect(() => {
    onResize();

    window.addEventListener("resize", onResize);

    return () => window.removeEventListener("resize", onResize);
  }, [onResize, width]);

  return (
    <div ref={ref} style={{ overflow: "hidden", width: containerWidth }}>
      {width && children({ width })}
    </div>
  );
}
