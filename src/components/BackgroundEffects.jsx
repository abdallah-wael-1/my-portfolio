import React, { useEffect, useRef } from "react";

export default function BackgroundEffects({ dark }) {
  const canvasRef = useRef(null);
  const mouse     = useRef({ x: -9999, y: -9999 });
  const animId    = useRef(null);
  const dotsRef   = useRef([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    const GAP = 32;

    const buildDots = () => {
      dotsRef.current = [];
      const cols = Math.ceil(canvas.width  / GAP) + 1;
      const rows = Math.ceil(canvas.height / GAP) + 1;
      for (let c = 0; c < cols; c++) {
        for (let r = 0; r < rows; r++) {
          dotsRef.current.push({ x: c * GAP, y: r * GAP });
        }
      }
    };

    const resize = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
      buildDots();
    };
    resize();
    window.addEventListener("resize", resize);

    const onMove  = (e) => { mouse.current.x = e.clientX; mouse.current.y = e.clientY; };
    const onLeave = ()  => { mouse.current.x = -9999;     mouse.current.y = -9999; };
    window.addEventListener("mousemove",  onMove);
    window.addEventListener("mouseleave", onLeave);

    const RADIUS   = 140;
    const MAX_GROW = 3.8;

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const mx = mouse.current.x;
      const my = mouse.current.y;

      const baseR     = dark ? 1.15 : 1.2;
      const baseAlpha = dark ? 0.14  : 0.22;
      const glowAlpha = dark ? 0.75  : 0.70;
      const colorBase = dark ? "77,171,247" : "25,118,210";
      const colorGlow = dark ? "77,171,247" : "25,118,210";

      dotsRef.current.forEach((d) => {
        const dx   = mx - d.x;
        const dy   = my - d.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const t    = Math.max(0, 1 - dist / RADIUS);

        const size  = baseR + t * MAX_GROW;
        const alpha = baseAlpha + t * (glowAlpha - baseAlpha);

        ctx.beginPath();
        ctx.arc(d.x, d.y, size, 0, Math.PI * 2);
        ctx.fillStyle = t > 0
          ? `rgba(${colorGlow},${alpha})`
          : `rgba(${colorBase},${baseAlpha})`;
        ctx.fill();
      });

      animId.current = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animId.current);
      window.removeEventListener("resize",     resize);
      window.removeEventListener("mousemove",  onMove);
      window.removeEventListener("mouseleave", onLeave);
    };
  }, [dark]);

  const bgColor = dark ? "#000000" : "#e7e8ea";

  return (
    <>
      {/* Solid base colour */}
      <div style={{
        position: "fixed", inset: 0,
        background: bgColor,
        zIndex: -2,
        transition: "background 0.5s",
      }} />

      {/* Interactive dot canvas */}
      <canvas
        ref={canvasRef}
        style={{
          position: "fixed", top: 0, left: 0,
          width: "100vw", height: "100vh",
          pointerEvents: "none",
          zIndex: -1,
        }}
      />
    </>
  );
}