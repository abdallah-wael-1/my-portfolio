import React, { useState, useEffect } from "react";
import { IconButton, Box, Tooltip } from "@mui/material";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { motion, AnimatePresence } from "framer-motion";
import { useLang } from "../context/LanguageContext.jsx";

export default function ScrollToTop({ showAfter = 300 }) {
  const { isRtl } = useLang();
  const [visible, setVisible] = useState(false);
  const [scrollPercent, setScrollPercent] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setVisible(scrolled > showAfter);
      setScrollPercent(docHeight > 0 ? (scrolled / docHeight) * 100 : 0);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [showAfter]);

  const scrollTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  const radius = 26;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (scrollPercent / 100) * circumference;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.7 }}
          transition={{ duration: 0.2, type: "spring", stiffness: 300 }}
          style={{
            position: "fixed",
            right: isRtl ? "auto" : 28,
            left: isRtl ? 28 : "auto",
            bottom: 28,
            zIndex: 1400,
          }}
        >
          <Tooltip title="Back to top" placement={isRtl ? "right" : "left"}>
            <Box onClick={scrollTop} sx={{ position: "relative", width: 56, height: 56, cursor: "pointer" }}>
              {/* SVG progress ring */}
              <svg
                width={56}
                height={56}
                style={{ position: "absolute", top: 0, left: 0, transform: "rotate(-90deg)" }}
              >
                <circle cx="28" cy="28" r={radius} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="3" />
                <circle
                  cx="28" cy="28" r={radius}
                  fill="none"
                  stroke="url(#prog)"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeDasharray={circumference}
                  strokeDashoffset={offset}
                  style={{ transition: "stroke-dashoffset 0.2s" }}
                />
                <defs>
                  <linearGradient id="prog" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#1976d2" />
                    <stop offset="100%" stopColor="#4dabf7" />
                  </linearGradient>
                </defs>
              </svg>

              <IconButton
                size="small"
                aria-label="scroll to top"
                sx={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%,-50%)",
                  width: 44,
                  height: 44,
                  bgcolor: "background.paper",
                  border: "1px solid rgba(25,118,210,0.2)",
                  color: "primary.main",
                  boxShadow: "0 4px 20px rgba(0,0,0,0.25)",
                  transition: "all 0.2s",
                  "&:hover": {
                    bgcolor: "primary.main",
                    color: "#fff",
                    transform: "translate(-50%,-50%) scale(1.1)",
                  },
                }}
              >
                <KeyboardArrowUpIcon />
              </IconButton>
            </Box>
          </Tooltip>
        </motion.div>
      )}
    </AnimatePresence>
  );
}