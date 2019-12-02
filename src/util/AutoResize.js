import React, { useState, useRef, useEffect } from "react";

export default function AutoResize({ children }) {
  const ref = useRef(null);
  const [width, setWidth] = useState(0);
  const { current: onResize } = useRef(() => {
    setWidth(ref.current.clientWidth);
  });

  useEffect(() => {
    onResize();

    window.addEventListener("resize", onResize);

    return () => window.removeEventListener("resize", onResize);
  }, [onResize, width]);

  return (
    <div ref={ref} style={{ overflow: "hidden", width: "100%" }}>
      {children({ width })}
    </div>
  );
}
