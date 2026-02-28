import React, { useState, useMemo } from "react";
import { Box, Typography, Grid, Container } from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import SectionTitle from "../components/Title/SectionTitle.jsx";
import { useLang } from "../context/LanguageContext.jsx";

// Images 
import FoodLover  from "../assets/images/food-lover.png";
import Kasper     from "../assets/images/kasper-project.png";
import Elzero     from "../assets/images/elzero-project.png";
import Dashboard  from "../assets/images/Dashbord.png";
import Airline    from "../assets/images/airline-website.png";
import Ecommerce  from "../assets/images/e-commerce.png";
import Hospital   from "../assets/images/hospital-project.png";
import Guess      from "../assets/images/guess-word.png";
import Form       from "../assets/images/form.png";
import Art        from "../assets/images/art-house.png";
import Platform   from "../assets/images/platform.png";
import Prayer     from "../assets/images/paryer-times.png";
import Todo       from "../assets/images/to-do-list.png";
import AwStudio   from "../assets/images/aw-studio.png";
import CoursesApp from "../assets/images/courses-app.png";
import Bondi      from "../assets/images/bondi.png";
import Tailwind from "../assets/images/Tailwind.png"

// Data 
const allProjects = [
  { id:1,  title:"Art House E-Commerce", cat:"React",      image:Art,        link:"https://shahdahmedmahmoud.github.io/Phase-one-project-iti/", featured:false, desc:"Full e-commerce SPA built with React. Includes cart, filters, and responsive design." },
  { id:2,  title:"Dynamic Platform",     cat:"React",      image:Platform,   link:"https://lovely-cat-b984cb.netlify.app/",                     featured:false, desc:"Multi-page React platform with dynamic routing, modern UI components and animations." },
  { id:3,  title:"Prayer Times App",     cat:"React",      image:Prayer,     link:"https://ubiquitous-lamington-d3afa6.netlify.app/",           featured:false, desc:"Real-time prayer times using geolocation API with clean, minimal UI." },
  { id:4,  title:"Dynamic To-Do List",   cat:"React",      image:Todo,       link:"https://superb-empanada-dffcac.netlify.app/",                featured:false, desc:"Feature-rich To-Do app with local storage, drag & drop and filters." },
  { id:5,  title:"AW Studio",            cat:"JavaScript", image:AwStudio,   link:"https://abdallah-wael-1.github.io/aw-studio/",               featured:false, desc:"Creative agency landing page with smooth animations and scroll effects." },
  { id:6,  title:"Advanced Form",        cat:"JavaScript", image:Form,       link:"https://abdallah-wael12.github.io/my-website-5/",            featured:false, desc:"Multi-step form with full validation, dynamic fields and error handling." },
  { id:7,  title:"Airline Website",      cat:"JavaScript", image:Airline,    link:"https://abdallah-wael-1.github.io/helwan-wings/",            featured:false, desc:"Airline booking UI with search, flight cards and responsive layout." },
  { id:8,  title:"E-Commerce Shop",      cat:"JavaScript", image:Ecommerce,  link:"https://abdallah-wael-1.github.io/CS-Fashion-Shop/",         featured:false, desc:"Fashion store with product grid, cart system and category filters." },
  { id:9,  title:"Hospital Website",     cat:"JavaScript", image:Hospital,   link:"https://abdallah-wael-1.github.io/Hospital-Project/",        featured:false, desc:"Hospital website with departments, doctors section and appointment UI." },
  { id:10, title:"Guess The Word Game",  cat:"JavaScript", image:Guess,      link:"https://abdallah-wael-1.github.io/Guess-The-Word/",          featured:false, desc:"Fun browser word-guessing game with hints, lives and score tracking." },
  { id:11, title:"Food Lover",           cat:"HTML & CSS", image:FoodLover,  link:"https://abdallah-wael12.github.io/my-web-site-3/",           featured:false, desc:"Restaurant landing page with hero, menu section and CSS animations." },
  { id:12, title:"Kasper Website",       cat:"HTML & CSS", image:Kasper,     link:"https://abdallah-wael12.github.io/my-website-2/",            featured:false, desc:"Creative agency website clone with pixel-perfect CSS layouts." },
  { id:13, title:"Elzero Website",       cat:"HTML & CSS", image:Elzero,     link:"https://abdallah-wael12.github.io/my-web/",                  featured:false, desc:"Full multi-section website with flexbox, grid and hover effects." },
  { id:14, title:"Advanced Dashboard",   cat:"HTML & CSS", image:Dashboard,  link:"https://marwan-wael-1.github.io/Dashboard_1/",               featured:false, desc:"Admin dashboard UI with charts, tables and sidebar navigation." },
  {id: 15, title: "Bondi Website",       cat: "HTML & CSS",image: Bondi,     link: "https://abdallah-wael-1.github.io/Bondi/",                             featured: false,desc: "Modern landing page clone with clean, responsive design."},
  { id:16, title:"Tailwind Website",     cat:"HTML & CSS", image:Tailwind,   link:"https://abdallah-wael-1.github.io/First_Tailwind/",                   featured:false, desc:"Sleek Tailwind CSS landing page with modern layout, smooth responsiveness and clean visual hierarchy." },
  { id:17, title:"CoursesApp",           cat:"MERN",       image:CoursesApp, link:"https://courses-project-front.vercel.app/",                  featured:false, desc:"Full-stack courses platform built with MongoDB, Express, React & Node.js. Features auth, course management and modern UI." },
];

const catMeta = {
  "React":      { color:"#4dabf7", bg:"rgba(79,195,247,0.12)",  glow:"rgba(79,195,247,0.25)",  emoji:"⚛️" },
  "JavaScript": { color:"#efd81d", bg:"rgba(239,216,29,0.1)",   glow:"rgba(239,216,29,0.2)",   emoji:"🟨" },
  "HTML & CSS": { color:"#ff7043", bg:"rgba(255,112,67,0.1)",   glow:"rgba(255,112,67,0.2)",   emoji:"🎨" },
  "MERN":       { color:"#69f0ae", bg:"rgba(105,240,174,0.1)",  glow:"rgba(105,240,174,0.2)",  emoji:"🌿" },
};

// ─── Filter Tabs 
function FilterTabs({ options, selected, onSelect }) {
  return (
    <Box sx={{ display:"flex", justifyContent:"center", gap:1.2, flexWrap:"wrap", mb:7 }}>
      {options.map((opt) => {
        const isActive = selected === opt.key;
        const meta = opt.key !== "All" ? catMeta[opt.key] : null;
        return (
          <motion.div key={opt.key} whileHover={{ scale:1.05 }} whileTap={{ scale:.95 }}>
            <Box
              onClick={() => onSelect(opt.key)}
              sx={{
                display:"flex", alignItems:"center", gap:.8,
                px:2.2, py:1,
                borderRadius:"12px",
                border:"1.5px solid",
                borderColor: isActive ? (meta?.color || "#4dabf7") : "rgba(255,255,255,0.08)",
                background: isActive ? (meta ? meta.bg : "rgba(77,171,247,0.12)") : "transparent",
                color: isActive ? (meta?.color || "#4dabf7") : "text.secondary",
                fontWeight: isActive ? 700 : 500,
                fontSize:".85rem",
                cursor:"pointer",
                transition:"all .22s",
                userSelect:"none",
                boxShadow: isActive ? `0 4px 18px ${meta?.glow || "rgba(77,171,247,0.2)"}` : "none",
                "&:hover": {
                  borderColor: meta?.color || "#4dabf7",
                  color: meta?.color || "#4dabf7",
                },
              }}
            >
              {opt.emoji && <span style={{ fontSize:14 }}>{opt.emoji}</span>}
              {opt.label}
              <Box sx={{
                ml:.4, px:.9, py:.15, borderRadius:"6px",
                background: isActive ? "rgba(0,0,0,0.15)" : "rgba(255,255,255,0.06)",
                fontSize:".7rem", fontWeight:700, color:"inherit",
              }}>
                {opt.count}
              </Box>
            </Box>
          </motion.div>
        );
      })}
    </Box>
  );
}

// ─── Small card 
function SmallCard({ project, idx }) {
  const [hovered, setHovered] = useState(false);
  const { tr } = useLang();
  const meta = catMeta[project.cat];

  return (
    <motion.div
      layout
      initial={{ opacity:0, y:24 }}
      animate={{ opacity:1, y:0 }}
      exit={{ opacity:0, scale:.94 }}
      transition={{ duration:.4, delay: idx * .06 }}
      style={{ height:"100%" }}
    >
      <Box
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        sx={{
          bgcolor:"background.paper",
          border:"1px solid",
          borderColor: hovered ? meta.color + "44" : "rgba(255,255,255,0.06)",
          borderRadius:"18px", overflow:"hidden",
          boxShadow: hovered ? `0 14px 40px ${meta.glow}` : "0 2px 14px rgba(0,0,0,.18)",
          transition:"all .32s cubic-bezier(.4,0,.2,1)",
          transform: hovered ? "translateY(-6px)" : "none",
          display:"flex", flexDirection:"column",
          height:"100%",
          position:"relative",
          "&::before": {
            content:'""', position:"absolute", inset:0, pointerEvents:"none",
            borderRadius:"18px", opacity: hovered ? 1 : 0,
            background:`linear-gradient(135deg, ${meta.color}08, transparent)`,
            transition:"opacity .3s",
          },
        }}
      >
        {/* Image */}
        <Box sx={{ height:160, overflow:"hidden", position:"relative", flexShrink:0 }}>
          <Box
            component="img" src={project.image} alt={project.title}
            sx={{
              width:"100%", height:"100%", objectFit:"cover",
              transform: hovered ? "scale(1.06)" : "scale(1)",
              transition:"transform .5s ease",
            }}
          />
          {/* Category badge */}
          <Box sx={{
            position:"absolute", top:10, right:10,
            px:1.2, py:.3, borderRadius:"7px",
            background: meta.bg, backdropFilter:"blur(6px)",
            border:`1px solid ${meta.color}44`,
            display:"flex", alignItems:"center", gap:.4,
          }}>
            <span style={{ fontSize:11 }}>{meta.emoji}</span>
            <Typography sx={{ fontSize:".65rem", fontWeight:700, color:meta.color }}>
              {project.cat}
            </Typography>
          </Box>
          <Box sx={{
            position:"absolute", bottom:0, left:0, right:0, height:48,
            background:"linear-gradient(to top, rgba(0,0,0,.55), transparent)",
          }} />
        </Box>

        {/* Body */}
        <Box sx={{ p:2, flexGrow:1, display:"flex", flexDirection:"column", justifyContent:"space-between" }}>
          <Box>
            <Typography sx={{ fontWeight:700, fontSize:".88rem", color:"text.primary", lineHeight:1.3, mb:.6 }}>
              {project.title}
            </Typography>
            <Typography sx={{ fontSize:".75rem", color:"text.secondary", lineHeight:1.65, mb:1.5 }}>
              {project.desc}
            </Typography>
          </Box>

          <Box
            component="a" href={project.link} target="_blank" rel="noopener noreferrer"
            sx={{
              display:"inline-flex", alignItems:"center", gap:.5, alignSelf:"flex-start",
              px:1.5, py:.6, borderRadius:"9px",
              background: hovered ? `linear-gradient(135deg,#1565c0,#4dabf7)` : "transparent",
              border: hovered ? "1px solid transparent" : `1px solid ${meta.color}44`,
              color: hovered ? "#fff" : meta.color,
              textDecoration:"none",
              fontSize:".72rem", fontWeight:700,
              transition:"all .25s",
              "&:hover": { boxShadow:`0 4px 12px ${meta.glow}` },
            }}
          >
            {tr.projects.view} <OpenInNewIcon sx={{ fontSize:12 }} />
          </Box>
        </Box>
      </Box>
    </motion.div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────
export default function Projects() {
  const { tr } = useLang();
  const [selected, setSelected] = useState("All");

  const catFilters = ["All", "React", "JavaScript", "HTML & CSS", "MERN"];

  const filterOptions = catFilters.map((key) => ({
    key,
    label: tr.projects.filters[catFilters.indexOf(key)],
    emoji: key === "All" ? "✨" : catMeta[key]?.emoji,
    count: key === "All" ? allProjects.length : allProjects.filter(p => p.cat === key).length,
  }));

  const filtered = useMemo(
    () => selected === "All" ? allProjects : allProjects.filter(p => p.cat === selected),
    [selected]
  );

  return (
    <Box id="projects" sx={{ py:12 }}>
      <SectionTitle text={tr.projects.title} />
      <FilterTabs options={filterOptions} selected={selected} onSelect={setSelected} />

      <Container maxWidth="xl" disableGutters sx={{ px:{ xs:2, md:6 } }}>
        <AnimatePresence mode="popLayout">
          <Grid container spacing={3} justifyContent="center" key={selected}>
            {filtered.map((p, i) => (
              <Box key={p.id} width="500px">
                <SmallCard project={p} idx={i} />
              </Box>
            ))}
          </Grid>
        </AnimatePresence>
      </Container>
    </Box>
  );
}