import React from "react";
import { Box, Typography, Link, IconButton, useTheme } from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";
import { FaLinkedin, FaEnvelope, FaWhatsapp } from "react-icons/fa";
import { motion } from "framer-motion";
import { useLang } from "../context/LanguageContext.jsx";

export default function Footer() {
  const { tr, isRtl } = useLang();
  const theme = useTheme();
  const dark = theme.palette.mode === "dark";
  const year = new Date().getFullYear();

  const socials = [
    { icon: <FaLinkedin size={18} />,          href: "https://www.linkedin.com/in/abdallah-wael-56a215357", color: "#4dabf7",                label: "LinkedIn" },
    { icon: <GitHubIcon sx={{fontSize:18}} />, href: "https://github.com/abdallah-wael-1",                  color: dark?"#e0e0e0":"#24292e", label: "GitHub"   },
    { icon: <FaEnvelope size={18} />,          href: "mailto:abdallahelsadany18@gmail.com",                  color: "#ff5722",                label: "Email"    },
    { icon: <FaWhatsapp size={18} />,          href: "https://wa.me/201022283412",                           color: "#25d366",                label: "WhatsApp" },
  ];
  
  return (
    <Box component="footer" sx={{ bgcolor:"background.paper", py:4, px:{ xs:2, md:6 }, borderTop:"1px solid rgba(25,118,210,0.12)" }}>
      <Box sx={{ maxWidth:"1000px", margin:"0 auto", display:"flex", flexDirection:{ xs:"column", sm:"row" }, alignItems:"center", justifyContent:"space-between", gap:2, textAlign:{ xs:"center", sm:isRtl?"right":"left" } }}>
        
        {/* Left: Name + rights */}
        <Box>
          <Typography sx={{ fontWeight:700, fontSize:"1rem", color:"text.primary", mb:0.3 }}>{tr.hero.name}</Typography>
          <Typography sx={{ fontSize:"0.78rem", color:"text.secondary" }}>© {year} · {tr.footer.rights}</Typography>
        </Box>

        {/* Right: Social icons */}
        <Box sx={{ display:"flex", gap:1.2, alignItems:"center" }}>
          {socials.map((s,i) => (
            <motion.div key={i} whileHover={{ y:-4, scale:1.12 }} transition={{ type:"spring", stiffness:300 }}>
              <Link href={s.href} target={s.href.startsWith("mailto")?undefined:"_blank"} aria-label={s.label}>
                <IconButton size="small" sx={{
                  color: s.color,
                  border: "1.5px solid rgba(255,255,255,0.08)",
                  borderRadius: "10px", p:1,
                  transition: "all 0.25s",
                  // WhatsApp gets a special glow
                  ...(s.label === "WhatsApp" && {
                    border: "1.5px solid rgba(37,211,102,0.35)",
                    boxShadow: "0 0 10px rgba(37,211,102,0.15)",
                  }),
                  "&:hover": {
                    borderColor: s.color,
                    background: `${s.color}18`,
                    boxShadow: `0 4px 14px ${s.color}33`,
                  },
                }}>
                  {s.icon}
                </IconButton>
              </Link>
            </motion.div>
          ))}
        </Box>
      </Box>
    </Box>
  );
}