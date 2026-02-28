import React from "react";
import { Box, Typography, Grid, Avatar } from "@mui/material";
import { motion } from "framer-motion";
import SectionTitle from "../components/Title/SectionTitle.jsx";
import { useLang } from "../context/LanguageContext.jsx";
import MyPhoto from "../assets/images/my-photo.jpg";

// ── Soft skills data ──────────────────────────────────────────────────────────
const softSkills = [
  { emoji: "🧠", en: "Problem Solver",  ar: "حل المشكلات"    },
  { emoji: "⚡", en: "Fast Learner",    ar: "سريع التعلم"     },
  { emoji: "🤝", en: "Team Player",     ar: "عمل جماعي"       },
  { emoji: "🎯", en: "Detail-Oriented", ar: "دقة في التفاصيل" },
  { emoji: "💡", en: "Creative Thinker",ar: "تفكير إبداعي"    },
  { emoji: "🚀", en: "Self-Motivated",  ar: "طموح ومبادر"     },
];

export default function About() {
  const { tr, isRtl, lang } = useLang();
  const ar = lang === "ar";

  return (
    <Box id="about" sx={{ py: 12 }}>
      <SectionTitle text={tr.about.title} />

      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          alignItems: { xs: "center", md: "flex-start" },
          justifyContent: "center",
          textAlign: { xs: "center", md: isRtl ? "right" : "left" },
          bgcolor: "background.paper",
          p: { xs: 3, md: 6 },
          borderRadius: "28px",
          gap: { xs: 4, md: 6 },
          boxShadow: "0 8px 40px rgba(0,0,0,0.2)",
          border: "1px solid rgba(25,118,210,0.1)",
          maxWidth: "1000px",
          margin: "0 auto",
        }}
      >
        {/* ── LEFT: Photo + Stats ── */}
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 3, flexShrink: 0 }}>
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Box sx={{ position: "relative" }}>
              <Box sx={{
                position: "absolute", inset: -4, borderRadius: "50%",
                background: "linear-gradient(135deg, #1976d2, #7c4dff)",
                opacity: 0.3, filter: "blur(10px)",
              }} />
              <Avatar
                src={MyPhoto}
                alt="Abdallah Wael"
                sx={{
                  width: { xs: 160, md: 200 },
                  height: { xs: 160, md: 200 },
                  border: "3px solid",
                  borderColor: "primary.main",
                  boxShadow: "0 0 28px rgba(25,118,210,0.3)",
                  position: "relative",
                }}
              />
            </Box>
          </motion.div>

          {/* Stats */}
          <Grid container spacing={1.5} sx={{ maxWidth: 220 }}>
            {tr.about.stats.map((stat, i) => (
              <Grid item xs={6} key={i}>
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 + 0.3, duration: 0.4 }}
                >
                  <Box sx={{
                    textAlign: "center", p: 1.5, borderRadius: "14px",
                    border: "1px solid rgba(25,118,210,0.2)",
                    background: "rgba(25,118,210,0.05)",
                    transition: "all 0.2s",
                    "&:hover": { background: "rgba(25,118,210,0.1)", transform: "scale(1.04)" },
                  }}>
                    <Typography sx={{ fontSize: "1.4rem", fontWeight: 800, color: "primary.main", lineHeight: 1 }}>
                      {stat.value}
                    </Typography>
                    <Typography sx={{ fontSize: "0.65rem", color: "text.secondary", mt: 0.3, fontWeight: 500 }}>
                      {stat.label}
                    </Typography>
                  </Box>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* ── RIGHT: Text + Soft Skills ── */}
        <Box sx={{ flex: 1 }}>
          <motion.div
            initial={{ opacity: 0, x: isRtl ? -30 : 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {/* Bio */}
            <Typography
              variant="body1"
              sx={{ fontSize: { xs: "0.95rem", md: "1.05rem" }, color: "text.secondary", lineHeight: 1.9, mb: 4 }}
            >
              {tr.about.body}
            </Typography>

            {/* Soft skills label */}
            <Typography sx={{
              fontSize: "0.85rem", fontWeight: 700, color: "text.primary",
              mb: 2, letterSpacing: 0.5, textTransform: "uppercase",
            }}>
              {ar ? "ما يميزني" : "What defines me"}
            </Typography>

            {/* Soft skill chips */}
            <Box sx={{
              display: "flex", gap: 1.2, flexWrap: "wrap",
              justifyContent: { xs: "center", md: isRtl ? "flex-end" : "flex-start" },
            }}>
              {softSkills.map((s, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 + 0.2, duration: 0.35 }}
                  whileHover={{ y: -4, scale: 1.06 }}
                >
                  <Box sx={{
                    display: "flex", alignItems: "center", gap: 0.8,
                    px: 1.8, py: 0.9,
                    borderRadius: "12px",
                    border: "1px solid rgba(25,118,210,0.15)",
                    background: "rgba(25,118,210,0.05)",
                    cursor: "default",
                    transition: "all 0.22s",
                    "&:hover": {
                      borderColor: "rgba(77,171,247,0.4)",
                      background: "rgba(77,171,247,0.08)",
                    },
                  }}>
                    <Typography sx={{ fontSize: "1rem", lineHeight: 1 }}>{s.emoji}</Typography>
                    <Typography sx={{
                      fontSize: "0.78rem", fontWeight: 600,
                      color: "text.primary", letterSpacing: 0.2,
                    }}>
                      {ar ? s.ar : s.en}
                    </Typography>
                  </Box>
                </motion.div>
              ))}
            </Box>

          </motion.div>
        </Box>
      </Box>
    </Box>
  );
}