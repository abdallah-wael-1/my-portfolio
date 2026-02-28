import React, { useRef, useState, useEffect } from "react";
import { Box, Typography, Grid, Container } from "@mui/material";
import { motion } from "framer-motion";

const stats = [
  { value: 14,  suffix: "+", label: "Projects Completed",  labelAr: "مشروع مكتمل",    icon: "🚀", color: "#4dabf7" },
  { value: 2,   suffix: "+", label: "Years Experience",    labelAr: "سنوات خبرة",      icon: "⚡", color: "#7c4dff" },
  { value: 10,  suffix: "+", label: "Technologies",        labelAr: "تقنية مستخدمة",   icon: "🛠️", color: "#4caf50" },
  { value: 100, suffix: "%", label: "Passion & Dedication",labelAr: "شغف وتفاني",       icon: "❤️", color: "#ff5722" },
];

function AnimatedCounter({ target, suffix, active }) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!active) return;
    let start = 0;
    const step = Math.ceil(target / 50);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else setCount(start);
    }, 28);
    return () => clearInterval(timer);
  }, [active, target]);
  return <>{count}{suffix}</>;
}

export default function StatsSection({ isRtl }) {
  const ref = useRef(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setActive(true); },
      { threshold: 0.3 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <Box
      ref={ref}
      sx={{
        py: 10,
        position: "relative",
        overflow: "hidden",
        "&::before": {
          content: '""',
          position: "absolute",
          inset: 0,
          background: "linear-gradient(135deg, rgba(25,118,210,0.06) 0%, rgba(124,77,255,0.04) 100%)",
          zIndex: 0,
        },
      }}
    >
      <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
        <Grid container spacing={3} justifyContent="center">
          {stats.map((s, i) => (
            <Grid item xs={6} md={3} key={i}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <Box
                  sx={{
                    textAlign: "center",
                    p: 3.5,
                    borderRadius: "24px",
                    border: "1px solid",
                    borderColor: (theme) =>
                      theme.palette.mode === "dark" ? `${s.color}22` : `${s.color}33`,
                    bgcolor: "background.paper",
                    backdropFilter: "blur(14px)",
                    position: "relative",
                    overflow: "hidden",
                    transition: "all 0.35s ease",
                    cursor: "default",
                    boxShadow: (theme) =>
                      theme.palette.mode === "dark"
                        ? "none"
                        : "0 4px 20px rgba(0,0,0,0.06)",
                    "&:hover": {
                      transform: "translateY(-8px)",
                      boxShadow: `0 20px 50px ${s.color}28`,
                      borderColor: `${s.color}66`,
                    },
                    "&::before": {
                      content: '""',
                      position: "absolute",
                      top: 0, left: 0, right: 0,
                      height: 3,
                      background: `linear-gradient(90deg, ${s.color}, ${s.color}55)`,
                      borderRadius: "24px 24px 0 0",
                    },
                  }}
                >
                  {/* Icon */}
                  <Box sx={{ fontSize: 36, mb: 1.5, lineHeight: 1 }}>{s.icon}</Box>

                  {/* Counter */}
                  <Typography
                    sx={{
                      fontSize: "clamp(2rem, 4vw, 3rem)",
                      fontWeight: 900,
                      color: s.color,
                      lineHeight: 1,
                      mb: 1,
                      fontVariantNumeric: "tabular-nums",
                    }}
                  >
                    <AnimatedCounter target={s.value} suffix={s.suffix} active={active} />
                  </Typography>

                  <Typography sx={{ fontSize: "0.85rem", color: "text.secondary", fontWeight: 500, lineHeight: 1.3 }}>
                    {isRtl ? s.labelAr : s.label}
                  </Typography>
                </Box>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}