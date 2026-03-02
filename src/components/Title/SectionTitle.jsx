import React, { useRef, useState, useEffect } from "react";
import { Box, Typography, useTheme } from "@mui/material";

export default function SectionTitle({ text }) {
  const theme   = useTheme();
  const dark    = theme.palette.mode === "dark";
  const accent  = dark ? "#4dabf7" : "#1565c0";
  const fg      = dark ? "#ffffff" : "#0d1b2e";

  const ref     = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  // Shared animation styles — only play when visible
  const anim = (name, duration, delay, extra = {}) =>
    visible
      ? { animation: `${name} ${duration} cubic-bezier(0.22,1,0.36,1) forwards ${delay}`, ...extra }
      : { opacity: 0, ...extra };

  return (
    <Box
      ref={ref}
      sx={{
        display:       "flex",
        flexDirection: "column",
        alignItems:    "center",
        mb:            { xs: "48px", md: "64px" },
      }}
    >
      {/* ── Title box ── */}
      <Box
        sx={{
          position: "relative",
          px:       { xs: "20px", sm: "32px", md: "44px" },
          py:       { xs: "8px",  md: "12px" },
          overflow: "hidden",

          // Border
          "&::before": {
            content:      '""',
            position:     "absolute",
            inset:        0,
            borderRadius: "12px",
            border:       "2px solid transparent",
            background:   `linear-gradient(${dark ? "#0d1b2e" : "#f0f4fa"}, ${dark ? "#0d1b2e" : "#f0f4fa"}) padding-box,
                           linear-gradient(135deg, ${accent}, ${dark ? "#a78bfa" : "#5c35cc"}, ${accent}) border-box`,
            opacity:      0,
            ...(visible && {
              animation: "borderFade 0.6s ease forwards 0.1s",
            }),
            "@keyframes borderFade": {
              from: { opacity: 0, transform: "scale(0.94)" },
              to:   { opacity: 1, transform: "scale(1)"    },
            },
          },

          // Shimmer
          "&::after": {
            content:    '""',
            position:   "absolute",
            top:        0,
            left:       "-60%",
            width:      "60%",
            height:     "100%",
            background: `linear-gradient(90deg, transparent, ${accent}22, transparent)`,
            ...(visible && {
              animation: "shimmer 3s ease-in-out infinite 1s",
            }),
            "@keyframes shimmer": {
              "0%":   { left: "-60%"  },
              "100%": { left: "120%"  },
            },
          },
        }}
      >
        <Typography
          component="h2"
          sx={{
            fontFamily:    "'Bebas Neue', sans-serif",
            fontSize:      { xs: "38px", sm: "52px", md: "64px" },
            letterSpacing: { xs: "4px", md: "6px" },
            textTransform: "uppercase",
            lineHeight:    1,
            color:         fg,
            position:      "relative",
            zIndex:        1,
            opacity:       0,
            ...(visible && {
              animation: "textReveal 0.7s cubic-bezier(0.22,1,0.36,1) forwards 0.3s",
            }),
            "@keyframes textReveal": {
              from: { opacity: 0, transform: "translateY(12px)" },
              to:   { opacity: 1, transform: "translateY(0)"    },
            },
          }}
        >
          {text}
        </Typography>
      </Box>

      {/* ── Underline — same width as the box above ── */}
      <Box sx={{ position: "relative", alignSelf: "center" }}>
        <Box
          sx={{
            mt:           "10px",
            height:       "3px",
            width:         "460px",
            borderRadius: "99px",
            background:   `linear-gradient(90deg, transparent, ${accent}, ${dark ? "#a78bfa" : "#5c35cc"}, ${accent}, transparent)`,
            boxShadow:    `0 0 12px ${accent}88`,
            transition:   visible ? "width 0.9s cubic-bezier(0.22,1,0.36,1) 0.75s" : "none",
            // match box padding so underline width = title box width
            minWidth:     0,
          }}
        />

        {/* Dots at ends */}
        <Box
          sx={{
            display:         "flex",
            justifyContent:  "space-between",
            mt:              "6px",
            px:              "2px",
            opacity:         0,
            ...(visible && {
              animation: "dotsFade 0.5s ease forwards 1.5s",
            }),
            "@keyframes dotsFade": {
              from: { opacity: 0 },
              to:   { opacity: 1 },
            },
          }}
        >
          {[0, 1].map((i) => (
            <Box
              key={i}
              sx={{
                width:        "5px",
                height:       "5px",
                borderRadius: "50%",
                background:   accent,
                boxShadow:    `0 0 8px ${accent}`,
                ...(visible && {
                  animation: `dotPulse 2s ease-in-out infinite ${i * 0.4}s`,
                }),
                "@keyframes dotPulse": {
                  "0%,100%": { opacity: 0.4, transform: "scale(1)"   },
                  "50%":     { opacity: 1,   transform: "scale(1.5)" },
                },
              }}
            />
          ))}
        </Box>
      </Box>

    </Box>
  );
}