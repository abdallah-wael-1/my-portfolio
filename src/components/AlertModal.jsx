// src/components/AlertModal.jsx
import React, { useState, useCallback } from "react";
import { Box, Typography, Button, useTheme } from "@mui/material";
import { alpha } from "@mui/material/styles";
import { motion, AnimatePresence } from "framer-motion";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import ErrorOutlineIcon       from "@mui/icons-material/ErrorOutline";
import WarningAmberIcon       from "@mui/icons-material/WarningAmber";

// ─── Hook ─────────────────────────────────────────────────────────────────────
const defaultState = {
  open: false, type: "success",
  title: "", html: "", confirmText: "OK", onConfirm: null,
};

export function useAlert() {
  const [state, setState] = useState(defaultState);

  const fire = useCallback(({
    title = "", html = "", icon = "success",
    confirmButtonText = "OK", onConfirm,
  } = {}) => {
    setState({ open: true, type: icon, title, html, confirmText: confirmButtonText, onConfirm: onConfirm ?? null });
  }, []);

  const close = useCallback(() => {
    setState(s => ({ ...s, open: false }));
  }, []);

  return { alertState: state, fire, close };
}

// ─── Icons
const META = {
  success: { Icon: CheckCircleOutlineIcon, color: "#22c55e", glow: "rgba(34,197,94,0.22)"  },
  error:   { Icon: ErrorOutlineIcon,       color: "#ef4444", glow: "rgba(239,68,68,0.22)"  },
  warning: { Icon: WarningAmberIcon,       color: "#f59e0b", glow: "rgba(245,158,11,0.22)" },
};

// ─── Component ────────────────────────────────────────────────────────────────
export default function AlertModal({ state, onClose }) {
  const theme = useTheme();
  const dark  = theme.palette.mode === "dark";

  if (!state) return null;
  const { open, type, title, html, confirmText, onConfirm } = state;
  const { Icon, color, glow } = META[type] || META.success;

  const handleConfirm = () => {
    onClose();
    if (onConfirm) onConfirm();
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* ── Backdrop ── */}
          <motion.div
            key="alert-bd"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={handleConfirm}
            style={{
              position: "fixed", inset: 0, zIndex: 9000,
              background: dark ? "rgba(2,5,18,0.82)" : "rgba(10,20,50,0.50)",
              backdropFilter: "blur(10px) saturate(60%)",
            }}
          />

          {/* ── Card ── */}
          <div style={{
            position: "fixed",
            inset: 0,
            zIndex: 9001,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            pointerEvents: "none",
          }}>
          <motion.div
            key="alert-card"
            initial={{ opacity: 0, scale: 0.88, y: 20 }}
            animate={{ opacity: 1, scale: 1,    y: 0  }}
            exit={{   opacity: 0, scale: 0.92,  y: 12 }}
            transition={{ type: "spring", stiffness: 300, damping: 26 }}
            style={{
              width: "min(520px, 92vw)",
              pointerEvents: "all",
            }}
          >
            <Box sx={{
              borderRadius: "26px",
              overflow: "hidden",
              position: "relative",
              // ── Theme-aware background ──
              background: dark
                ? "linear-gradient(160deg, rgba(10,16,34,0.99) 0%, rgba(6,11,24,1) 100%)"
                : "linear-gradient(160deg, #ffffff 0%, #f2f7ff 100%)",
              border: `1px solid ${alpha(color, dark ? 0.2 : 0.25)}`,
              boxShadow: dark
                ? `0 30px 80px rgba(0,0,0,0.65), 0 0 0 1px ${alpha(color, 0.1)}`
                : `0 20px 55px rgba(0,0,0,0.13), 0 0 0 1px ${alpha(color, 0.15)}`,
            }}>

              {/* Top accent line */}
              <Box sx={{
                height: 3,
                background: `linear-gradient(90deg, transparent 0%, ${color} 50%, transparent 100%)`,
              }} />

              {/* Ambient top glow */}
              <Box sx={{
                position: "absolute", top: -50, left: "50%",
                transform: "translateX(-50%)",
                width: 220, height: 220, borderRadius: "50%",
                background: `radial-gradient(circle, ${glow} 0%, transparent 68%)`,
                filter: "blur(22px)",
                pointerEvents: "none",
              }} />

              {/* Content */}
              <Box sx={{ px: 5, pt: 5, pb: 4.5, textAlign: "center", position: "relative" }}>

                {/* Icon bubble */}
                <motion.div
                  initial={{ scale: 0, rotate: -25 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: "spring", stiffness: 280, damping: 18, delay: 0.08 }}
                  style={{ display: "inline-flex", marginBottom: 20 }}
                >
                  <Box sx={{
                    width: 88, height: 88, borderRadius: "50%",
                    background: alpha(color, dark ? 0.13 : 0.1),
                    border: `2px solid ${alpha(color, 0.28)}`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    boxShadow: `0 0 28px ${glow}`,
                  }}>
                    <Icon sx={{ fontSize: 48, color }} />
                  </Box>
                </motion.div>

                {/* Title */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15, duration: 0.3 }}
                >
                  <Typography sx={{
                    fontWeight: 800, fontSize: "1.4rem",
                    color: dark ? "#e6f0ff" : "#0d1a30",
                    mb: 1.2, lineHeight: 1.3,
                    fontFamily: "'Syne', sans-serif",
                    letterSpacing: "-.01em",
                  }}>
                    {title}
                  </Typography>
                </motion.div>

                {/* Body HTML */}
                {html && (
                  <motion.div
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.22, duration: 0.28 }}
                  >
                    <Typography
                      component="div"
                      sx={{
                        fontSize: ".95rem", lineHeight: 1.75, mb: 3.5,
                        color: dark ? "rgba(190,215,255,0.65)" : "rgba(25,45,90,0.6)",
                        "& b": {
                          fontWeight: 700,
                          color: dark ? "#c9e0ff" : "#1a2d55",
                        },
                      }}
                      dangerouslySetInnerHTML={{ __html: html }}
                    />
                  </motion.div>
                )}

                {/* Button */}
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.28, duration: 0.26 }}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <Button
                    fullWidth
                    onClick={handleConfirm}
                    sx={{
                      py: 1.45, borderRadius: "14px",
                      fontWeight: 700, fontSize: ".92rem",
                      textTransform: "none", letterSpacing: ".02em",
                      color: "#fff",
                      background: `linear-gradient(135deg, ${alpha(color, 0.85)}, ${color})`,
                      boxShadow: `0 6px 22px ${glow}`,
                      border: "none",
                      transition: "box-shadow .22s ease",
                      "&:hover": {
                        background: `linear-gradient(135deg, ${color}, ${alpha(color, 0.9)})`,
                        boxShadow: `0 10px 32px ${glow}`,
                      },
                    }}
                  >
                    {confirmText}
                  </Button>
                </motion.div>

              </Box>
            </Box>
          </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}