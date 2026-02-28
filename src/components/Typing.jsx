import { useState, useEffect } from "react";

export function useTypewriter(text = "", speed = 100) {
  const [output, setOutput] = useState("");

  useEffect(() => {
    setOutput("");

    if (!text) return;

    let i = 0;
    const tick = () => {
      if (i >= text.length) return;
      i++;
      setOutput(text.slice(0, i));
      timer = setTimeout(tick, speed);
    };

    let timer = setTimeout(tick, speed);
    return () => clearTimeout(timer);
  }, [text, speed]);

  return output;
}