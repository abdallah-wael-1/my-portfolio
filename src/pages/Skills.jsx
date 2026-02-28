import React, { useRef, useState, useEffect } from "react";
import { Box, Typography, useTheme } from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import SectionTitle from "../components/Title/SectionTitle.jsx";
import { useLang } from "../context/LanguageContext.jsx";

// ── Icons ─────────────────────────────────────────────────────────────────────
import { FaReact, FaHtml5, FaCss3Alt, FaGitAlt, FaGithub, FaBootstrap, FaNodeJs, FaDatabase, FaJava } from "react-icons/fa";
import { SiJavascript, SiTailwindcss, SiMui, SiMongodb, SiExpress, SiMysql, SiCplusplus } from "react-icons/si";
import { VscCode } from "react-icons/vsc";
import { TbBrandCpp } from "react-icons/tb";
import { MdOutlineAccountTree } from "react-icons/md";

// ── Skills data ───────────────────────────────────────────────────────────────
const SKILLS = [
  // Front-End
  { name:"React.js",     icon:<FaReact />,            color:"#4dabf7", level:90, cat:"Frontend", tag:"SPA / Hooks / Router"         },
  { name:"JavaScript",   icon:<SiJavascript />,       color:"#efd81d", level:85, cat:"Frontend", tag:"ES6+ / Async / DOM"           },
  { name:"HTML5",        icon:<FaHtml5 />,             color:"#ff5722", level:95, cat:"Frontend", tag:"Semantic / Accessible"        },
  { name:"CSS3",         icon:<FaCss3Alt />,           color:"#2196f3", level:90, cat:"Frontend", tag:"Flexbox / Grid / Animations"  },
  { name:"Tailwind CSS", icon:<SiTailwindcss />,       color:"#38bdf8", level:85, cat:"Frontend", tag:"Utility-first / Responsive"   },
  { name:"Material UI",  icon:<SiMui />,               color:"#007fff", level:80, cat:"Frontend", tag:"Components / Theming"         },
  { name:"Bootstrap",    icon:<FaBootstrap />,         color:"#7952b3", level:75, cat:"Frontend", tag:"Grid / Components"            },
  // Back-End & DB
  { name:"Node.js",      icon:<FaNodeJs />,            color:"#6cc24a", level:70, cat:"Backend",  tag:"REST APIs / Middleware"       },
  { name:"Express.js",   icon:<SiExpress />,           color:"#aaaaaa", level:70, cat:"Backend",  tag:"Routing / Auth / CORS"       },
  { name:"MongoDB",      icon:<SiMongodb />,           color:"#69f0ae", level:70, cat:"Backend",  tag:"NoSQL / Mongoose"            },
  { name:"SQL",          icon:<FaDatabase />,          color:"#f9a825", level:75, cat:"Backend",  tag:"Queries / Joins / Indexing"  },
  { name:"MySQL",        icon:<SiMysql />,             color:"#00758f", level:75, cat:"Backend",  tag:"Relational DB / CRUD"        },
  // CS Fundamentals
  { name:"C",            icon:<TbBrandCpp />,          color:"#a8c0d6", level:75, cat:"CS",       tag:"Pointers / Memory / Structs" },
  { name:"Java",         icon:<FaJava />,              color:"#f89820", level:70, cat:"CS",       tag:"OOP / Collections / Swing"   },
  { name:"OOP",          icon:<MdOutlineAccountTree />,color:"#ce93d8", level:80, cat:"CS",       tag:"Inheritance / Polymorphism"  },
  // Tools
  { name:"Git",          icon:<FaGitAlt />,            color:"#f34f29", level:80, cat:"Tools",    tag:"Branching / Merging / CI"    },
  { name:"GitHub",       icon:<FaGithub />,            color:"#aaaaaa", level:80, cat:"Tools",    tag:"PRs / Actions / Pages"       },
  { name:"VS Code",      icon:<VscCode />,             color:"#0078d7", level:85, cat:"Tools",    tag:"Extensions / Shortcuts"      },
];

const CAT_ORDER  = ["Frontend", "Backend", "CS", "Tools"];
const CAT_LABELS = { Frontend:"⚡ Front-End", Backend:"🔧 Back-End & DB", CS:"🎓 CS Fundamentals", Tools:"🛠 Tools" };

// ── Category colors per mode ──────────────────────────────────────────────────
const useCatColor = () => {
  const theme = useTheme();
  const dark  = theme.palette.mode === "dark";
  return {
    Frontend: dark ? "#4dabf7" : "#1565c0",
    Backend:  dark ? "#00ff84" : "#1b7a3e",
    CS:       dark ? "#bb00dc" : "#7b1fa2",
    Tools:    dark ? "#f34f29" : "#c1370a",
  };
};

// ── Single skill card ─────────────────────────────────────────────────────────
function SkillCard({ skill, index, animate, hoveredId, setHoveredId }) {
  const isHovered = hoveredId === skill.name;
  const isFaded   = hoveredId !== null && !isHovered;
  const theme     = useTheme();
  const dark      = theme.palette.mode === "dark";

  let color = skill.color;
  if (!dark && (color === "#aaaaaa" || color === "#e0e0e0")) color = "#555";
  if (!dark && color === "#efd81d") color = "#c9960a";
  if (!dark && color === "#a8c0d6") color = "#4a6fa5";
  if (!dark && color === "#69f0ae") color = "#1b7a3e";
  if (!dark && color === "#ce93d8") color = "#7b1fa2";

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      animate={animate ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }}
      transition={{ duration: 0.45, delay: index * 0.055 }}
      onMouseEnter={() => setHoveredId(skill.name)}
      onMouseLeave={() => setHoveredId(null)}
      style={{ position: "relative" }}
    >
      <Box sx={{
        position: "relative",
        borderRadius: "18px",
        p: 2.2,
        cursor: "default",
        overflow: "hidden",
        border: "1px solid",
        borderColor: isHovered ? `${color}55` : dark ? "rgba(255,255,255,0.06)" : "rgba(25,118,210,0.2)",
        background: dark
          ? isHovered ? "rgba(10,18,36,0.95)" : "rgba(255,255,255,0.02)"
          : isHovered ? "#ffffff" : "#e8eef8",
        boxShadow: isHovered
          ? `0 16px 48px ${color}35, 0 0 0 1px ${color}28`
          : dark ? "none" : "0 2px 10px rgba(0,0,0,0.12)",
        opacity: isFaded ? 0.5 : 1,
        filter: isFaded ? "blur(0.8px)" : "none",
        transform: isHovered ? "translateY(-8px)" : "translateY(0)",
        transition: "all 0.35s cubic-bezier(0.4,0,0.2,1)",
        zIndex: isHovered ? 2 : 1,
      }}>
        {isHovered && (
          <Box sx={{
            position: "absolute", inset: 0, pointerEvents: "none",
            background: `radial-gradient(ellipse at 30% 30%, ${color}18 0%, transparent 65%)`,
            borderRadius: "18px",
          }} />
        )}

        <Box sx={{ display: "flex", alignItems: "center", gap: 1.4, mb: 1.6, position: "relative" }}>
          <motion.div
            animate={isHovered ? { rotate: [0, -12, 12, 0], scale: 1.25 } : { rotate: 0, scale: 1 }}
            transition={{ duration: 0.4 }}
            style={{ fontSize: 30, color, lineHeight: 1, display: "flex", flexShrink: 0 }}
          >
            {skill.icon}
          </motion.div>

          <Box sx={{ flex: 1, minWidth: 0 }}>
            <Typography sx={{
              fontWeight: 700, fontSize: ".9rem",
              color: isHovered ? color : (dark ? "#c9e4ff" : "#1a2a45"),
              transition: "color .22s", lineHeight: 1.2,
            }}>
              {skill.name}
            </Typography>
            <AnimatePresence>
              {isHovered && (
                <motion.div
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.2 }}
                >
                  <Typography sx={{
                    fontSize: ".62rem", color, fontFamily: "'DM Mono', monospace",
                    letterSpacing: ".04em", mt: .3, whiteSpace: "nowrap",
                    overflow: "hidden", textOverflow: "ellipsis",
                  }}>
                    {skill.tag}
                  </Typography>
                </motion.div>
              )}
            </AnimatePresence>
          </Box>

          <Typography sx={{
            fontSize: ".8rem", fontWeight: 800,
            color: isHovered ? color : (dark ? "text.secondary" : "#4a5568"),
            transition: "color .22s", flexShrink: 0,
          }}>
            {skill.level}%
          </Typography>
        </Box>

        <Box sx={{
          height: 5, borderRadius: 99,
          background: dark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.08)",
          overflow: "hidden",
        }}>
          <motion.div
            initial={{ width: 0 }}
            animate={animate ? { width: `${skill.level}%` } : { width: 0 }}
            transition={{ duration: 1.1, delay: index * 0.055 + 0.3, ease: [0.4, 0, 0.2, 1] }}
            style={{
              height: "100%",
              borderRadius: 99,
              background: `linear-gradient(90deg, ${color}88, ${color})`,
              boxShadow: isHovered ? `0 0 10px ${color}88` : "none",
              transition: "box-shadow .25s",
            }}
          />
        </Box>
      </Box>
    </motion.div>
  );
}

// ── Category group ────────────────────────────────────────────────────────────
function CatGroup({ cat, skills, animate, hoveredId, setHoveredId }) {
  const theme     = useTheme();
  const dark      = theme.palette.mode === "dark";
  const CAT_COLOR = useCatColor();
  const col       = CAT_COLOR[cat];

  return (
    <Box sx={{ mb: 6 }}>
      <Box sx={{
        display: "inline-flex", alignItems: "center", gap: 1,
        mb: 3, px: 1.8, py: .7, borderRadius: "12px",
        border: `1px solid ${col}44`,
        background: dark ? `${col}0f` : `${col}18`,
      }}>
        <Box sx={{ width: 6, height: 6, borderRadius: "50%", background: col, boxShadow: `0 0 8px ${col}` }} />
        <Typography sx={{
          fontSize: ".72rem", fontWeight: 700, color: col,
          textTransform: "uppercase", letterSpacing: "0.1em",
          fontFamily: "'DM Mono', monospace",
        }}>
          {CAT_LABELS[cat]}
        </Typography>
      </Box>

      <Box sx={{
        display: "grid",
        gridTemplateColumns: { xs: "1fr 1fr", sm: "repeat(3, 1fr)", md: "repeat(4, 1fr)" },
        gap: 2,
      }}>
        {skills.map((s, i) => (
          <SkillCard
            key={s.name} skill={s} index={i}
            animate={animate}
            hoveredId={hoveredId}
            setHoveredId={setHoveredId}
          />
        ))}
      </Box>
    </Box>
  );
}

// ── Main ──────────────────────────────────────────────────────────────────────
export default function Skills() {
  const { tr } = useLang();
  const theme  = useTheme();
  const dark   = theme.palette.mode === "dark";
  const [animate, setAnimate]     = useState(false);
  const [hoveredId, setHoveredId] = useState(null);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setAnimate(true); },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <Box id="skills" ref={ref} sx={{ py: 12 }}>
      <SectionTitle text={tr.skills.title} />

      {/* ── Animated subtitle ── */}
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 2, mb: 8 }}>
        <Box sx={{ height: "2px", width: 70, background: `linear-gradient(90deg, transparent, ${dark ? "#4dabf7" : "#1565c0"})` }} />
        <Typography sx={{
          fontSize: { xs: ".85rem", md: ".95rem" },
          fontWeight: 700,
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          fontFamily: "'DM Mono', monospace",
          background: dark
            ? "linear-gradient(90deg, #4dabf7, #a78bfa, #4dabf7)"
            : "linear-gradient(90deg, #1565c0, #6a1b9a, #1565c0)",
          backgroundSize: "200% auto",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          animation: "gradientMove 3s linear infinite",
          "@keyframes gradientMove": {
            "0%":   { backgroundPosition: "0% center" },
            "100%": { backgroundPosition: "200% center" },
          },
        }}>
          {tr.skills.sub}
        </Typography>
        <Box sx={{ height: "2px", width: 70, background: `linear-gradient(90deg, ${dark ? "#4dabf7" : "#1565c0"}, transparent)` }} />
      </Box>

      <Box sx={{ maxWidth: "1000px", margin: "0 auto", px: { xs: 2, md: 3 } }}>
        {CAT_ORDER.map((cat) => (
          <CatGroup
            key={cat}
            cat={cat}
            skills={SKILLS.filter(s => s.cat === cat)}
            animate={animate}
            hoveredId={hoveredId}
            setHoveredId={setHoveredId}
          />
        ))}
      </Box>
    </Box>
  );
}