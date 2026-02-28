import React from "react";
import { Box, Typography, Container } from "@mui/material";
import { motion } from "framer-motion";
import SectionTitle from "./Title/SectionTitle.jsx";
import { useLang } from "../context/LanguageContext.jsx";

const timelineData = [
  {
    year: "2024",
    titleEn: "Started Web Development",
    titleAr: "بداية تعلم تطوير الويب",
    descEn:  "Learned the fundamentals of HTML, CSS, and basic JavaScript. Built my first static websites and landing pages.",
    descAr:  "تعلمت أساسيات HTML وCSS وJavaScript الأساسي. بنيت أول مواقعي الثابتة.",
    icon: "🌱",
    color: "#4caf50",
    tags: ["HTML5", "CSS3", "Basic JS"],
  },
  {
    year: "2025",
    titleEn: "JavaScript & Interactivity",
    titleAr: "JavaScript والتفاعلية",
    descEn:  "Dove deep into JavaScript, DOM manipulation, APIs, and built multiple interactive projects including games and dynamic UIs.",
    descAr:  "غصت في JavaScript والـ DOM والـ APIs وبنيت مشاريع تفاعلية متعددة.",
    icon: "⚡",
    color: "#efd81d",
    tags: ["JavaScript", "APIs", "DOM", "Bootstrap"],
  },
  {
    year: "2025",
    titleEn: "React.js & Modern Tooling",
    titleAr: "React.js والأدوات الحديثة",
    descEn:  "Mastered React.js with hooks, state management, and component architecture. Built full SPAs and team projects using MUI and Tailwind.",
    descAr:  "أتقنت React.js مع الـ hooks وإدارة الـ state. بنيت تطبيقات ووجهة واحدة.",
    icon: "⚛️",
    color: "#4dabf7",
    tags: ["React.js", "Tailwind", "MUI", "Git"],
  },
  {
    year: "2026",
    titleEn: "Building Real-World Projects",
    titleAr: "بناء مشاريع حقيقية",
    descEn:  "Working on professional portfolios, collaboration projects, and continually expanding into backend and full-stack territory.",
    descAr:  "أعمل على مشاريع احترافية وتوسيع مهاراتي نحو الـ full-stack.",
    icon: "🚀",
    color: "#7c4dff",
    tags: ["Full-Stack", "Node.js", "Freelance"],
  },
];

export default function Timeline() {
  const { tr, isRtl } = useLang();

  return (
    <Box id="timeline" sx={{ py: 12, position: "relative" }}>
      <SectionTitle text={isRtl ? "مسيرتي" : "My Journey"} />

      <Container maxWidth="md" sx={{ position: "relative" }}>
        {/* Center line */}
        <Box
          sx={{
            position: "absolute",
            left:  isRtl ? "auto" : "50%",
            right: isRtl ? "50%" : "auto",
            top: 0, bottom: 0,
            width: 2,
            background: "linear-gradient(to bottom, transparent, rgba(25,118,210,0.5), transparent)",
            transform: "translateX(-50%)",
            display: { xs: "none", md: "block" },
          }}
        />

        <Box sx={{ display: "flex", flexDirection: "column", gap: 5 }}>
          {timelineData.map((item, i) => {
            const isLeft = i % 2 === 0;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: isRtl ? (isLeft ? 40 : -40) : (isLeft ? -40 : 40) }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.55, delay: 0.1 }}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: { xs: "column", md: "row" },
                    justifyContent: isLeft ? "flex-start" : "flex-end",
                    position: "relative",
                  }}
                >
                  {/* Card */}
                  <Box
                    sx={{
                      width: { xs: "100%", md: "44%" },
                      bgcolor: "background.paper",
                      border: "1px solid",
                      borderColor: `${item.color}33`,
                      borderRadius: "20px",
                      p: 3,
                      position: "relative",
                      transition: "all 0.3s ease",
                      "&:hover": {
                        transform: "translateY(-4px)",
                        boxShadow: `0 16px 40px ${item.color}20`,
                        borderColor: `${item.color}66`,
                      },
                      "&::before": {
                        content: '""',
                        position: "absolute",
                        top: 0, left: 0, right: 0,
                        height: 3,
                        background: `linear-gradient(90deg, ${item.color}, ${item.color}44)`,
                        borderRadius: "20px 20px 0 0",
                      },
                    }}
                  >
                    {/* Year + Icon */}
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 1.5 }}>
                      <Box
                        sx={{
                          width: 40, height: 40, borderRadius: "12px",
                          background: `${item.color}18`,
                          border: `1.5px solid ${item.color}44`,
                          display: "flex", alignItems: "center", justifyContent: "center",
                          fontSize: 20,
                        }}
                      >
                        {item.icon}
                      </Box>
                      <Typography sx={{ fontWeight: 800, fontSize: "1.1rem", color: item.color }}>
                        {item.year}
                      </Typography>
                    </Box>

                    <Typography sx={{ fontWeight: 700, fontSize: "1rem", color: "text.primary", mb: 1, lineHeight: 1.4 }}>
                      {isRtl ? item.titleAr : item.titleEn}
                    </Typography>

                    <Typography sx={{ fontSize: "0.85rem", color: "text.secondary", lineHeight: 1.75, mb: 2 }}>
                      {isRtl ? item.descAr : item.descEn}
                    </Typography>

                    {/* Tags */}
                    <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
                      {item.tags.map((tag, ti) => (
                        <Box
                          key={ti}
                          sx={{
                            px: 1.2, py: 0.3,
                            borderRadius: "6px",
                            background: `${item.color}12`,
                            border: `1px solid ${item.color}33`,
                            fontSize: "0.7rem",
                            fontWeight: 600,
                            color: item.color,
                            letterSpacing: 0.3,
                          }}
                        >
                          {tag}
                        </Box>
                      ))}
                    </Box>
                  </Box>

                  {/* Center dot (desktop) */}
                  <Box
                    sx={{
                      display: { xs: "none", md: "flex" },
                      position: "absolute",
                      left: "50%", top: "28px",
                      transform: "translateX(-50%)",
                      width: 14, height: 14,
                      borderRadius: "50%",
                      background: item.color,
                      border: "3px solid",
                      borderColor: "background.default",
                      boxShadow: `0 0 12px ${item.color}88`,
                      zIndex: 2,
                    }}
                  />
                </Box>
              </motion.div>
            );
          })}
        </Box>
      </Container>
    </Box>
  );
}