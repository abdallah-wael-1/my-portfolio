import React from "react";
import { Box, Typography, Button, Container, IconButton, Chip, useTheme } from "@mui/material";
import { motion } from "framer-motion";
import { useTypewriter } from "../components/Typing.jsx";
import { useLang } from "../context/LanguageContext.jsx";

import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import GitHubIcon           from "@mui/icons-material/GitHub";
import LinkedInIcon         from "@mui/icons-material/LinkedIn";
import EmailIcon            from "@mui/icons-material/Email";
import FacebookIcon         from "@mui/icons-material/Facebook";
import DownloadIcon         from "@mui/icons-material/Download";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import Myphoto from "../assets/images/my-photo2.jpg";

export default function Hero() {
  const { tr, isRtl } = useLang();
  const theme = useTheme();
  const dark = theme.palette.mode === "dark";
  const typedText = useTypewriter(tr.hero.name, 72);
  const typedSub  = useTypewriter(typedText.length === tr.hero.name.length ? tr.hero.role : "", 44);
  // update social link colors for contrast
  const socialLinks = [
    { icon: <GitHubIcon />,    href: "https://github.com/abdallah-wael-1",                    color: dark ? "#a0b4c8" : "#24292e", label: "GitHub"   },
    { icon: <LinkedInIcon />,  href: "https://www.linkedin.com/in/abdallah-wael-56a215357",   color: "#4dabf7", label: "LinkedIn" },
    { icon: <EmailIcon />,     href: "mailto:abdallahelsadany18@gmail.com",                   color: "#ff7043", label: "Email"   },
    { icon: <FacebookIcon />,  href: "https://www.facebook.com/share/17PC2dYvi6/",            color: "#1877f2", label: "Facebook"},
    { icon: <WhatsAppIcon />, href: "https://wa.me/201022283412", color: "#25d366", label: "WhatsApp" },
  ];

  return (
    <Container maxWidth="lg" id="hero" sx={{ pt: "130px", pb: "80px", position: "relative" }}>

      {/* ── CARD ── */}
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          alignItems: "center",
          justifyContent: "space-between",

          // Glass card — adapts to both modes via theme
          bgcolor: "background.paper",
          // backdropFilter: "blur(18px) saturate(160%)",
          p: { xs: 3, md: 6 },
          borderRadius: "28px",
          border: "1px solid",
          borderColor: (theme) =>
            theme.palette.mode === "dark"
              ? "rgba(79,195,247,0.12)"
              : "rgba(25,118,210,0.14)",
          boxShadow: (theme) =>
            theme.palette.mode === "dark"
              ? "0 8px 48px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.04)"
              : "0 8px 40px rgba(25,118,210,0.1), inset 0 1px 0 rgba(255,255,255,0.9)",
          gap: 4,
          position: "relative",
          overflow: "hidden",

          // subtle inner glow strip top
          "&::before": {
          content: '""',
          position: "absolute",
          inset: 0,
            background: (theme) =>
              theme.palette.mode === "dark"
                ? "linear-gradient(135deg, rgba(25,118,210,0.06) 0%, rgba(124,77,255,0.04) 100%)"
                : "linear-gradient(90deg,transparent,rgba(25,118,210,0.25),transparent)",
          },
        }}
      >
        {/* ── LEFT ── */}
        <Box
          component={motion.div}
          initial={{ opacity: 0, x: isRtl ? 40 : -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          sx={{ flex: 1, textAlign: { xs: "center", md: isRtl ? "right" : "left" } }}
        >
          {/* Available badge */}
          <Chip
            icon={
              <FiberManualRecordIcon sx={{
                fontSize: "9px !important",
                color: "#4caf50 !important",
                animation: "heroPulse 2s ease-in-out infinite",
              }} />
            }
            label={tr.hero.available}
            size="small"
            sx={{
              mb: 3,
              background: "rgba(76,175,80,0.1)",
              border: "1px solid rgba(76,175,80,0.4)",
              color: "#4caf50",
              fontWeight: 700,
              fontSize: "0.76rem",
              letterSpacing: 0.4,
            }}
          />

          <Typography sx={{
            color: "text.secondary",
            mb: 0.5, fontWeight: 500, fontSize: ".95rem",
          }}>
            {tr.hero.greeting}
          </Typography>

          {/* Typed name */}
          <Typography variant="h2" sx={{
            fontWeight: 900,
            lineHeight: 1.1, mb: 1.5,
            fontSize: { xs: "2rem", md: "3rem" },
            background: (theme) =>
              theme.palette.mode === "dark"
                ? "linear-gradient(135deg, #e8f4ff 0%, #4dabf7 55%, #1976d2 100%)"
                : "linear-gradient(135deg, #0d47a1 0%, #1976d2 50%, #42a5f5 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            minHeight: 60,
          }}>
            {typedText}
            <span style={{
              marginLeft: 2,
              animation: "heroBlink 1s step-end infinite",
              WebkitTextFillColor: "#4dabf7",
            }}>|</span>
          </Typography>

          {/* Typed role */}
          <Typography sx={{
            color: "primary.main",
            fontWeight: 700, mb: 1,
            minHeight: 36,
            fontSize: { xs: "1.05rem", md: "1.3rem" },
          }}>
            {typedSub}
          </Typography>

          <Typography sx={{
            color: "text.secondary", mb: 4,
            fontSize: "0.93rem", lineHeight: 1.7,
          }}>
            {tr.hero.sub}
          </Typography>

          {/* CTAs */}
          <Box sx={{
            display: "flex", gap: 2, flexWrap: "wrap",
            justifyContent: { xs: "center", md: isRtl ? "flex-end" : "flex-start" },
          }}>
            <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
              <Button
                variant="contained" size="large"
                onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior:"smooth" })}
                sx={{
                  textTransform: "none", fontWeight: 700,
                  px: 3.5, py: 1.4, borderRadius: "14px", fontSize: ".93rem",
                  background: "linear-gradient(135deg,#1565c0,#1976d2,#42a5f5)",
                  boxShadow: "0 6px 22px rgba(25,118,210,0.4)",
                  "&:hover": { boxShadow: "0 8px 30px rgba(25,118,210,0.55)" },
                }}
              >
                {tr.hero.cta} →
              </Button>
            </motion.div>

            <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
              <Button
                variant="outlined" size="large"
                startIcon={<DownloadIcon />}
                onClick={() => {
                  const link = document.createElement("a");
                  link.href = "/Abdallah_Wael.pdf";
                  link.download = "Abdallah_Wael.pdf";
                  document.body.appendChild(link);
                  link.click();
                  document.body.removeChild(link);
                }}
                sx={{
                  textTransform: "none", fontWeight: 600,
                  px: 3, py: 1.4, borderRadius: "14px", fontSize: ".93rem",
                  borderColor: "rgba(77,171,247,0.45)",
                  color: (theme) => theme.palette.mode === "dark" ? "#4dabf7" : "#1565c0",
                  "&:hover": {
                    borderColor: "#1976d2",
                    background: (theme) =>
                      theme.palette.mode === "dark"
                        ? "rgba(77,171,247,0.08)"
                        : "rgba(25,118,210,0.06)",
                  },
                }}
              >
                {tr.hero.download}
              </Button>
            </motion.div>
          </Box>

          {/* Social icons */}
          <Box sx={{
            mt: 4, display: "flex", gap: 1.2,
            justifyContent: { xs:"center", md: isRtl ? "flex-end" : "flex-start" },
          }}>
            {socialLinks.map((s, i) => (
              <motion.div key={i} whileHover={{ y: -4, scale: 1.1 }} transition={{ type:"spring", stiffness:300 }}>
                <IconButton
                  component="a" href={s.href} target="_blank" aria-label={s.label}
                  sx={{
                    color: s.color,
                    border: "1.5px solid",
                    borderColor: (theme) =>
                      theme.palette.mode === "dark"
                        ? "rgba(255,255,255,0.09)"
                        : "rgba(0,0,0,0.1)",
                    borderRadius: "12px", p: 1.1,
                    transition: "all 0.22s",
                    "&:hover": {
                      borderColor: s.color,
                      boxShadow: `0 4px 16px ${s.color}40`,
                      background: `${s.color}14`,
                    },
                  }}
                >
                  {s.icon}
                </IconButton>
              </motion.div>
            ))}
          </Box>
        </Box>

        {/* ── RIGHT – Photo ── */}
        <Box
          component={motion.div}
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          sx={{ flex: "0 0 auto", textAlign: "center", mt: { xs: 2, md: 0 } }}
        >
          <Box sx={{ position: "relative", display: "inline-block" }}>
            {/* Glow ring */}
            <Box sx={{
              position: "absolute", inset: -8,
              borderRadius: "26px",
              background: "linear-gradient(135deg,#1565c0,#7c4dff,#4dabf7)",
              opacity: (theme) => theme.palette.mode === "dark" ? 0.4 : 0.2,
              filter: "blur(14px)",
              zIndex: 0,
            }} />
            <motion.img
              src={Myphoto}
              alt="Eng. Abdullah"
              animate={{ y: [0, -8, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              style={{
                borderRadius: "22px",
                maxWidth: "360px",
                width: "100%",
                display: "block",
                position: "relative", zIndex: 1,
                boxShadow: "0 16px 50px rgba(0,0,0,0.45)",
              }}
            />
          </Box>
        </Box>
      </Box>

      {/* ── Scroll indicator ── */}
      <Box
        onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
        sx={{
          display: "flex", flexDirection: "column", alignItems: "center",
          mt: 5, cursor: "pointer", gap: 0.5,
          "&:hover .scroll-arrow": { borderColor: "#4dabf7", opacity: 1 },
        }}
      >
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="scroll-arrow"
            animate={{ opacity: [0.2, 1, 0.2] }}
            transition={{ repeat: Infinity, duration: 1.4, delay: i * 0.22, ease: "easeInOut" }}
            style={{
              width: 14, height: 14,
              borderRight: "2.5px solid rgba(77,171,247,0.7)",
              borderBottom: "2.5px solid rgba(77,171,247,0.7)",
              transform: "rotate(45deg)",
              borderRadius: "0 0 2px 0",
              transition: "border-color 0.2s",
            }}
          />
        ))}
      </Box>

      <style>{`
        @keyframes heroBlink  { 0%,100%{opacity:1} 50%{opacity:0} }
        @keyframes heroPulse  { 0%,100%{opacity:1} 50%{opacity:0.35} }
      `}</style>
    </Container>
  );
}