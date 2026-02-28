import { useState, useEffect } from "react";
import {
  Box, Drawer, List, ListItem, ListItemButton,
  ListItemText, ListItemIcon, Tooltip, Typography,
} from "@mui/material";
import MenuIcon        from "@mui/icons-material/Menu";
import HomeIcon        from "@mui/icons-material/Home";
import InfoIcon        from "@mui/icons-material/Info";
import WorkIcon        from "@mui/icons-material/Work";
import TimelineIcon from "@mui/icons-material/Timeline";
import BuildIcon       from "@mui/icons-material/Build";
import ContactMailIcon from "@mui/icons-material/ContactMail";
import DarkModeIcon    from "@mui/icons-material/DarkMode";
import LightModeIcon   from "@mui/icons-material/LightMode";
import CloseIcon       from "@mui/icons-material/Close";
import { motion, AnimatePresence } from "framer-motion";
import { alpha }       from "@mui/material/styles";

import logoImage from "../assets/images/my-logo.png";
import { useLang } from "../context/LanguageContext.jsx";

export default function Navbar({ currentMode, toggleMode }) {
  const { tr, lang, toggleLang, isRtl } = useLang();
  const [open, setOpen]         = useState(false);
  const [active, setActive]     = useState("hero");
  const [scrolled, setScrolled] = useState(false);
  const [scrollPct, setScrollPct] = useState(0);
  const dark = currentMode === "dark";

  const navLinks = [
          { id: "hero",     label: tr.nav.hero,     icon: <HomeIcon sx={{ fontSize: 14 }} />        },
          { id: "projects", label: tr.nav.projects, icon: <WorkIcon sx={{ fontSize: 14 }} />        },
          { id: "timeline", label: tr.nav.journey, icon: <TimelineIcon sx={{ fontSize: 14 }} /> },
          { id: "skills",   label: tr.nav.skills,   icon: <BuildIcon sx={{ fontSize: 14 }} />       },
          { id: "about",    label: tr.nav.about,    icon: <InfoIcon sx={{ fontSize: 14 }} />        },
          { id: "contact",  label: tr.nav.contact,  icon: <ContactMailIcon sx={{ fontSize: 14 }} /> },
        ];

  // ── Scroll listeners ──────────────────────────────────────────────────────
  useEffect(() => {
    const fn = () => {
      setScrolled(window.scrollY > 30);
      const docH = document.documentElement.scrollHeight - window.innerHeight;
      setScrollPct(docH > 0 ? (window.scrollY / docH) * 100 : 0);
    };
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  // ── Active section observer ───────────────────────────────────────────────
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) setActive(e.target.id); }),
      { rootMargin: "-40% 0px -55% 0px" }
    );
    navLinks.forEach(({ id }) => { const el = document.getElementById(id); if (el) obs.observe(el); });
    return () => obs.disconnect();
  }, [tr]);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.pageYOffset - 80, behavior: "smooth" });
    setOpen(false);
  };

  // ── Tokens ────────────────────────────────────────────────────────────────
  const glass  = dark ? "rgba(8,13,26,0.85)"   : "rgba(245,248,255,0.90)";
  const border = dark ? "rgba(77,171,247,0.13)" : "rgba(25,118,210,0.12)";
  const txtCol = dark ? "#c9e4ff"               : "#1a2a45";
  const accent = "#4dabf7";

  return (
    <>
      {/* ══════════ HEADER BAR ══════════ */}
      <Box
        component="header"
        sx={{
          position: "fixed", top: 0, left: 0, right: 0, zIndex: 1300,
          height: 64,
          display: "flex", alignItems: "center", justifyContent: "space-between",
          px: { xs: 2, md: "5%" },
          background: scrolled ? glass : "transparent",
          backdropFilter: scrolled ? "blur(22px) saturate(180%)" : "none",
          borderBottom: scrolled ? `1px solid ${border}` : "1px solid transparent",
          transition: "background .4s, backdrop-filter .4s, border-color .4s",
          overflow: "hidden", 
        }}
      >
        <Box sx={{
          position: "absolute", bottom: 0, left: 0,
          width: "100%", height: "2px",
          background: dark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.05)",
          zIndex: 2,
        }}>
          <motion.div
            animate={{ width: `${scrollPct}%` }}
            transition={{ duration: 0.1, ease: "linear" }}
            style={{
              height: "100%",
              background: `linear-gradient(90deg, ${accent}, #38d9a9)`,
              boxShadow: `0 0 8px ${accent}66`,
              borderRadius: "0 2px 2px 0",
            }}
          />
        </Box>

        {/* ─── Logo ─── */}
        <Box
          onClick={() => scrollTo("hero")}
          sx={{ display: "flex", alignItems: "center", gap: 1.4, cursor: "pointer", userSelect: "none" }}
        >
          {/* Logo with pulse ring on active=hero */}
          <Box sx={{ position: "relative", flexShrink: 0 }}>
            {active === "hero" && (
              <motion.div
                animate={{ scale: [1, 1.45, 1], opacity: [0.6, 0, 0.6] }}
                transition={{ duration: 2.2, repeat: Infinity, ease: "easeOut" }}
                style={{
                  position: "absolute", inset: -4, borderRadius: "50%",
                  border: `1.5px solid ${accent}`,
                  pointerEvents: "none",
                }}
              />
            )}
            <Box
              component="img"
              src={logoImage}
              alt="AW"
              sx={{
                width: 38, height: 38, borderRadius: "50%", objectFit: "cover",
                border: `2px solid ${active === "hero" ? accent : "rgba(77,171,247,0.4)"}`,
                boxShadow: `0 0 ${active === "hero" ? 18 : 10}px rgba(77,171,247,0.25)`,
                transition: "all .35s",
                "&:hover": { transform: "scale(1.1) rotate(8deg)", boxShadow: "0 0 22px rgba(77,171,247,0.5)" },
              }}
            />
          </Box>

          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            <Typography sx={{
              fontWeight: 800, fontSize: ".9rem", color: txtCol,
              lineHeight: 1.1, letterSpacing: .3,
              fontFamily: "'Syne', sans-serif",
            }}>
               {tr.hero.name}
            </Typography>
            <Typography sx={{
              fontSize: ".58rem", color: accent,
              letterSpacing: 2, textTransform: "uppercase", fontWeight: 600,
              fontFamily: "'DM Mono', monospace",
            }}>
               {tr.hero.role}
            </Typography>
          </Box>
        </Box>

        {/* ─── Pill nav (desktop) ─── */}
        <Box sx={{
          display: { xs: "none", md: "flex" },
          alignItems: "center", gap: .4,
          background: dark ? "rgba(255,255,255,0.03)" : "rgba(25,118,210,0.04)",
          border: `1px solid ${border}`,
          borderRadius: "50px",
          px: .8, py: .5,
        }}>
          {navLinks.map((link) => {
            const isActive = active === link.id;
            return (
              <Box key={link.id} sx={{ position: "relative", cursor: "pointer" }} onClick={() => scrollTo(link.id)}>
                {isActive && (
                  <motion.div
                    layoutId="pill"
                    style={{
                      position: "absolute", inset: 0, borderRadius: 50,
                      background: dark
                        ? "linear-gradient(135deg,rgba(25,118,210,.28),rgba(77,171,247,.18))"
                        : "linear-gradient(135deg,rgba(25,118,210,.15),rgba(77,171,247,.1))",
                      border: "1px solid rgba(77,171,247,.3)",
                    }}
                    transition={{ type: "spring", stiffness: 420, damping: 32 }}
                  />
                )}
                <Box sx={{
                  position: "relative", zIndex: 1,
                  display: "flex", alignItems: "center", gap: .55,
                  px: 1.6, py: .8, borderRadius: "50px",
                  color: isActive ? accent : txtCol,
                  fontSize: ".8rem", fontWeight: isActive ? 700 : 500,
                  letterSpacing: .15, transition: "color .2s", userSelect: "none",
                  "&:hover": { color: accent },
                }}>
                  {link.icon}
                  {link.label}
                </Box>
              </Box>
            );
          })}
        </Box>

        {/* ─── Right controls ─── */}
        <Box sx={{ display: "flex", alignItems: "center", gap: .8 }}>
          {/* Language */}
          <Tooltip title={tr.nav.langToggle}>
            <Box onClick={toggleLang} sx={{
              px: 1.4, py: .6, borderRadius: "10px",
              border: `1.5px solid ${border}`,
              cursor: "pointer", fontSize: ".76rem", fontWeight: 700,
              color: accent, letterSpacing: .5, userSelect: "none",
              fontFamily: "'DM Mono', monospace",
              transition: "background .2s, border-color .2s",
              "&:hover": { background: "rgba(77,171,247,.1)", borderColor: accent },
            }}>
              {lang === "en" ? "ع" : "EN"}
            </Box>
          </Tooltip>

          {/* Dark/Light */}
          <Tooltip title={dark ? tr.nav.themeLight : tr.nav.themeDark}>
            <Box onClick={toggleMode} sx={{
              width: 34, height: 34, borderRadius: "10px",
              border: `1.5px solid ${border}`,
              display: "flex", alignItems: "center", justifyContent: "center",
              cursor: "pointer",
              color: dark ? "#ffd600" : "#1976d2",
              transition: "all .25s",
              "&:hover": {
                background: dark ? "rgba(255,214,0,.1)" : "rgba(25,118,210,.08)",
                borderColor: dark ? "rgba(255,214,0,.5)" : "rgba(25,118,210,.4)",
                transform: "rotate(22deg)",
              },
            }}>
              {dark ? <LightModeIcon sx={{ fontSize: 17 }} /> : <DarkModeIcon sx={{ fontSize: 17 }} />}
            </Box>
          </Tooltip>

          {/* Mobile burger */}
          <Box onClick={() => setOpen(true)} sx={{
            display: { xs: "flex", md: "none" },
            width: 34, height: 34, borderRadius: "10px",
            border: `1.5px solid ${border}`,
            alignItems: "center", justifyContent: "center",
            cursor: "pointer", color: txtCol,
            transition: "background .2s",
            "&:hover": { background: "rgba(77,171,247,.08)" },
          }}>
            <MenuIcon sx={{ fontSize: 19 }} />
          </Box>
        </Box>
      </Box>

      {/* ══════════ MOBILE DRAWER — premium rebuild ══════════ */}
      <Drawer
        anchor={isRtl ? "left" : "right"}
        open={open}
        onClose={() => setOpen(false)}
        PaperProps={{
          sx: {
            width: 290,
            background: "transparent",
            boxShadow: "none",
            border: "none",
          },
        }}
        // Darker backdrop
        slotProps={{ backdrop: { sx: { backdropFilter: "blur(6px)", background: "rgba(2,6,18,0.65)" } } }}
      >
        {/* Inner glass card */}
        <Box sx={{
          height: "100%",
          background: dark
            ? "linear-gradient(160deg, rgba(8,14,30,0.98) 0%, rgba(6,10,22,0.99) 100%)"
            : "linear-gradient(160deg, rgba(248,251,255,0.99) 0%, rgba(238,245,255,0.99) 100%)",
          borderLeft: !isRtl ? `1px solid ${border}` : "none",
          borderRight: isRtl  ? `1px solid ${border}` : "none",
          display: "flex", flexDirection: "column",
          position: "relative", overflow: "hidden",
        }}>

          {/* Subtle background glow */}
          <Box sx={{
            position: "absolute", top: -60, right: -60,
            width: 220, height: 220, borderRadius: "50%",
            background: `radial-gradient(circle, ${alpha(accent, 0.12)} 0%, transparent 70%)`,
            pointerEvents: "none",
          }} />
          <Box sx={{
            position: "absolute", bottom: 40, left: -40,
            width: 160, height: 160, borderRadius: "50%",
            background: `radial-gradient(circle, rgba(56,217,169,0.07) 0%, transparent 70%)`,
            pointerEvents: "none",
          }} />

          {/* ── Drawer header ── */}
          <Box sx={{
            px: 3, pt: 3.5, pb: 2.5,
            display: "flex", alignItems: "center", justifyContent: "space-between",
            borderBottom: `1px solid ${border}`,
            position: "relative", zIndex: 1,
          }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1.4 }}>
              <Box sx={{ position: "relative" }}>
                <Box
                  component="img" src={logoImage} alt="AW"
                  sx={{ width: 40, height: 40, borderRadius: "50%", objectFit: "cover", border: `2px solid ${alpha(accent, 0.5)}`, boxShadow: `0 0 14px ${alpha(accent, 0.2)}` }}
                />
                {/* Online dot */}
                <Box sx={{
                  position: "absolute", bottom: 1, right: 1,
                  width: 9, height: 9, borderRadius: "50%",
                  background: "#22d3a0",
                  border: `2px solid ${dark ? "#080e1e" : "#f8fbff"}`,
                  boxShadow: "0 0 6px rgba(34,211,160,0.7)",
                }} />
              </Box>
              <Box>
                <Typography sx={{
                  fontWeight: 800, fontSize: '.88rem', color: txtCol,
                  fontFamily: "'Syne', sans-serif", lineHeight: 1.2,
                }}>
                  {tr.hero.name}
                </Typography>
                <Typography sx={{
                  fontSize: '.58rem', color: accent,
                  letterSpacing: 1.8, textTransform: 'uppercase', fontWeight: 600,
                  fontFamily: "'DM Mono', monospace",
                }}>
                  {tr.hero.role}
                </Typography>
              </Box>
            </Box>

            {/* Close button */}
            <Box onClick={() => setOpen(false)} sx={{
              width: 32, height: 32, borderRadius: "9px",
              border: `1px solid ${border}`,
              display: "flex", alignItems: "center", justifyContent: "center",
              cursor: "pointer", color: txtCol,
              transition: "all .2s",
              "&:hover": { background: "rgba(77,171,247,.1)", borderColor: accent, color: accent, transform: "rotate(90deg)" },
            }}>
              <CloseIcon sx={{ fontSize: 16 }} />
            </Box>
          </Box>

          {/* ── Nav links ── */}
          <List sx={{ px: 2, pt: 2, flex: 1, position: "relative", zIndex: 1 }}>
            {navLinks.map((link, idx) => {
              const isActive = active === link.id;
              return (
                <motion.div
                  key={link.id}
                  initial={{ opacity: 0, x: isRtl ? -20 : 20 }}
                  animate={{ opacity: open ? 1 : 0, x: open ? 0 : (isRtl ? -20 : 20) }}
                  transition={{ delay: idx * 0.06 + 0.1, duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                >
                  <ListItem disablePadding sx={{ mb: .8 }}>
                    <ListItemButton
                      onClick={() => scrollTo(link.id)}
                      sx={{
                        borderRadius: "14px", py: 1.4, px: 1.8,
                        position: "relative", overflow: "hidden",
                        background: isActive
                          ? dark ? "rgba(77,171,247,.1)" : "rgba(25,118,210,.07)"
                          : "transparent",
                        border: `1px solid ${isActive ? alpha(accent, 0.22) : "transparent"}`,
                        transition: "all .22s",
                        "&:hover": {
                          background: dark ? "rgba(77,171,247,.07)" : "rgba(25,118,210,.05)",
                          border: `1px solid ${alpha(accent, 0.15)}`,
                          transform: "translateX(3px)",
                        },
                      }}
                    >
                      {/* Active left accent bar */}
                      {isActive && (
                        <Box sx={{
                          position: "absolute",
                          [isRtl ? "right" : "left"]: 0,
                          top: "20%", bottom: "20%",
                          width: 3, borderRadius: 99,
                          background: `linear-gradient(180deg, ${accent}, #38d9a9)`,
                          boxShadow: `0 0 8px ${accent}88`,
                        }} />
                      )}

                      <ListItemIcon sx={{
                        color: isActive ? accent : alpha(txtCol, 0.55),
                        minWidth: 34,
                        transition: "color .2s",
                      }}>
                        {link.icon}
                      </ListItemIcon>

                      <ListItemText
                        primary={link.label}
                        primaryTypographyProps={{
                          fontSize: ".88rem",
                          fontWeight: isActive ? 700 : 500,
                          color: isActive ? accent : txtCol,
                          letterSpacing: .2,
                        }}
                      />

                      {/* Chevron for active */}
                      {isActive && (
                        <Box sx={{ fontSize: ".6rem", color: alpha(accent, 0.5), fontFamily: "'DM Mono', monospace" }}>
                          ●
                        </Box>
                      )}
                    </ListItemButton>
                  </ListItem>
                </motion.div>
              );
            })}
          </List>

          {/* ── Drawer footer ── */}
          <Box sx={{
            px: 3, py: 2.5,
            borderTop: `1px solid ${border}`,
            display: "flex", alignItems: "center", justifyContent: "space-between",
            position: "relative", zIndex: 1,
          }}>
            {/* Scroll progress mini */}
            <Box sx={{ display: "flex", flexDirection: "column", gap: .6 }}>
              <Typography sx={{ fontSize: ".58rem", color: alpha(txtCol, 0.35), fontFamily: "'DM Mono', monospace", textTransform: "uppercase", letterSpacing: 1 }}>
                Progress
              </Typography>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Box sx={{ width: 80, height: 2, borderRadius: 99, background: dark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.07)", overflow: "hidden" }}>
                  <motion.div
                    animate={{ width: `${scrollPct}%` }}
                    transition={{ duration: 0.15, ease: "linear" }}
                    style={{ height: "100%", background: `linear-gradient(90deg, ${accent}, #38d9a9)`, borderRadius: 99 }}
                  />
                </Box>
                <Typography sx={{ fontSize: ".6rem", color: accent, fontFamily: "'DM Mono', monospace", fontWeight: 600 }}>
                  {Math.round(scrollPct)}%
                </Typography>
              </Box>
            </Box>

            {/* Theme + Lang controls */}
            <Box sx={{ display: "flex", gap: .8 }}>
              <Box onClick={toggleLang} sx={{
                px: 1.2, py: .55, borderRadius: "8px",
                border: `1.5px solid ${border}`,
                cursor: "pointer", fontSize: ".72rem", fontWeight: 700,
                color: accent, userSelect: "none",
                fontFamily: "'DM Mono', monospace",
                "&:hover": { background: "rgba(77,171,247,.1)", borderColor: accent },
              }}>
                {lang === "en" ? "ع" : "EN"}
              </Box>
              <Box onClick={toggleMode} sx={{
                width: 30, height: 30, borderRadius: "8px",
                border: `1.5px solid ${border}`,
                display: "flex", alignItems: "center", justifyContent: "center",
                cursor: "pointer",
                color: dark ? "#ffd600" : "#1976d2",
                "&:hover": { background: dark ? "rgba(255,214,0,.1)" : "rgba(25,118,210,.08)" },
              }}>
                {dark ? <LightModeIcon sx={{ fontSize: 15 }} /> : <DarkModeIcon sx={{ fontSize: 15 }} />}
              </Box>
            </Box>
          </Box>
        </Box>
      </Drawer>
    </>
  );
}