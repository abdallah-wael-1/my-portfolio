import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "@mui/material";
import myLogo from "../assets/images/my-logo.png";
import { useLang } from "../context/LanguageContext.jsx";

// ── Stages ────────────────────────────────────────────────────────────────────
const STAGES = [
  { label:"Initializing...",   target:20,  duration:480 },
  { label:"Loading assets...", target:45,  duration:700 },
  { label:"Building UI...",    target:72,  duration:620 },
  { label:"Almost ready...",   target:92,  duration:500 },
  { label:"Done!",             target:100, duration:300 },
];

function Particle({ x, y, size, delay, color }) {
  return (
    <motion.div
      initial={{ opacity:0, scale:0 }}
      animate={{ opacity:[0,0.8,0], scale:[0,1,0], y:[0,-50] }}
      transition={{ duration:2.4, delay, repeat:Infinity, repeatDelay:Math.random()*2+1, ease:"easeOut" }}
      style={{ position:"absolute", left:`${x}%`, top:`${y}%`, width:size, height:size, borderRadius:"50%", background:color, filter:`blur(${size/3}px)`, pointerEvents:"none" }}
    />
  );
}

function ScanLine({ isDark }) {
  return (
    <motion.div
      animate={{ top:["0%","100%","0%"] }}
      transition={{ duration:3.5, repeat:Infinity, ease:"linear" }}
      style={{ position:"absolute", left:0, right:0, height:1, background:isDark
        ? "linear-gradient(90deg,transparent,rgba(77,171,247,0.15),rgba(77,171,247,0.5),rgba(77,171,247,0.15),transparent)"
        : "linear-gradient(90deg,transparent,rgba(29,99,168,0.1),rgba(29,99,168,0.35),rgba(29,99,168,0.1),transparent)",
        pointerEvents:"none", zIndex:1 }}
    />
  );
}

function GridBg({ isDark }) {
  const lc = isDark ? "rgba(77,171,247,0.05)" : "rgba(29,99,168,0.06)";
  return (
    <svg style={{ position:"absolute", inset:0, width:"100%", height:"100%", pointerEvents:"none" }} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="lgrid" width="52" height="52" patternUnits="userSpaceOnUse">
          <path d="M 52 0 L 0 0 0 52" fill="none" stroke={lc} strokeWidth="1"/>
        </pattern>
        <radialGradient id="vig" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="transparent"/>
          <stop offset="100%" stopColor={isDark?"rgba(6,8,18,0.94)":"rgba(240,244,255,0.94)"}/>
        </radialGradient>
      </defs>
      <rect width="100%" height="100%" fill="url(#lgrid)"/>
      <rect width="100%" height="100%" fill="url(#vig)"/>
    </svg>
  );
}

function OrbitDot({ radius, duration, startAngle, size, color }) {
  return (
    <motion.div animate={{ rotate:360 }} transition={{ repeat:Infinity, duration, ease:"linear" }}
      style={{ position:"absolute", inset:-radius, pointerEvents:"none" }}>
      <div style={{ position:"absolute", top:"50%", left:"50%", width:size, height:size, borderRadius:"50%", background:color, boxShadow:`0 0 ${size*3}px ${color}`, transform:`rotate(${startAngle}deg) translateX(${radius}px) rotate(-${startAngle}deg) translate(-50%,-50%)` }}/>
    </motion.div>
  );
}

export default function Loader({ onComplete }) {
  const theme  = useTheme();
  const isDark = theme.palette.mode === "dark";
  const { tr } = useLang();

  const accent  = isDark ? "#4dabf7" : "#1d63a8";
  const accent2 = isDark ? "#38d9a9" : "#0d9488";
  const textPri = isDark ? "#e8f1ff" : "#0f1a2e";
  const bg      = isDark ? "#060812" : "#f0f4ff";

  const [progress,   setProgress]   = useState(0);
  const [stageIndex, setStageIndex] = useState(0);
  const [stageLabel, setStageLabel] = useState(STAGES[0].label);
  const [done,       setDone]       = useState(false);

  useEffect(() => {
    let cancelled = false;
    let currentStage = 0;
    let currentProgress = 0;

    const runStage = () => {
      if (cancelled || currentStage >= STAGES.length) return;
      const stage    = STAGES[currentStage];
      const start    = currentProgress;
      const end      = stage.target;
      const steps    = 28;
      const stepTime = stage.duration / steps;

      setStageLabel(stage.label);
      setStageIndex(currentStage);

      let step = 0;
      const interval = setInterval(() => {
        if (cancelled) { clearInterval(interval); return; }
        step++;
        const eased = 1 - Math.pow(1 - step/steps, 3);
        setProgress(Math.round(start + (end - start) * eased));

        if (step >= steps) {
          clearInterval(interval);
          currentProgress = end;
          currentStage++;
          if (currentStage >= STAGES.length) {
            setTimeout(() => {
              if (!cancelled) setDone(true);
              if (!cancelled && onComplete) setTimeout(onComplete, 600);
            }, 450);
          } else {
            setTimeout(runStage, 150);
          }
        }
      }, stepTime);
    };

    const boot = setTimeout(runStage, 250);
    return () => { cancelled = true; clearTimeout(boot); };
  }, []);

  const particles = [
    { x:10, y:22, size:5, delay:0.0, color:isDark?"rgba(77,171,247,0.8)":"rgba(29,99,168,0.6)"   },
    { x:85, y:16, size:4, delay:0.5, color:isDark?"rgba(56,217,169,0.8)":"rgba(13,148,136,0.6)"  },
    { x:20, y:75, size:5, delay:1.1, color:isDark?"rgba(77,171,247,0.6)":"rgba(29,99,168,0.5)"   },
    { x:90, y:68, size:6, delay:0.3, color:isDark?"rgba(56,217,169,0.6)":"rgba(13,148,136,0.5)"  },
    { x:52, y:90, size:4, delay:1.7, color:isDark?"rgba(255,255,255,0.3)":"rgba(29,99,168,0.3)"  },
    { x:4,  y:52, size:5, delay:0.8, color:isDark?"rgba(77,171,247,0.5)":"rgba(29,99,168,0.4)"   },
    { x:72, y:85, size:3, delay:2.0, color:isDark?"rgba(56,217,169,0.5)":"rgba(13,148,136,0.4)"  },
  ];

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          key="loader"
          initial={{ opacity:1 }}
          exit={{ opacity:0, filter:"blur(14px)", scale:1.05 }}
          transition={{ duration:0.6, ease:"easeInOut" }}
          style={{ position:"fixed", inset:0, background:bg, display:"flex", justifyContent:"center", alignItems:"center", flexDirection:"column", zIndex:9999, overflow:"hidden" }}
        >
          <style>{`@import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;700;800&family=DM+Mono:wght@400;500&display=swap');`}</style>

          <GridBg isDark={isDark}/>
          <ScanLine isDark={isDark}/>
          {particles.map((p,i) => <Particle key={i} {...p}/>)}

          {/* Ambient orbs */}
          <motion.div animate={{ scale:[1,1.2,1], opacity:[0.15,0.3,0.15] }} transition={{ duration:4.5, repeat:Infinity, ease:"easeInOut" }}
            style={{ position:"absolute", width:440, height:440, borderRadius:"50%", background:`radial-gradient(circle, ${accent}55 0%, transparent 70%)`, pointerEvents:"none", filter:"blur(32px)", top:"50%", left:"50%", transform:"translate(-50%,-50%)" }}/>
          <motion.div animate={{ scale:[1,1.25,1], opacity:[0.08,0.18,0.08] }} transition={{ duration:6, repeat:Infinity, ease:"easeInOut", delay:1.2 }}
            style={{ position:"absolute", width:300, height:300, borderRadius:"50%", background:`radial-gradient(circle, ${accent2}55 0%, transparent 70%)`, pointerEvents:"none", filter:"blur(26px)", top:"42%", left:"55%", transform:"translate(-50%,-50%)" }}/>

          {/* Page corner brackets */}
          {[
            { top:16, left:16,    borderTop:`1.5px solid ${accent}`,  borderLeft:`1.5px solid ${accent}`,   borderRadius:"6px 0 0 0" },
            { bottom:16, right:16, borderBottom:`1.5px solid ${accent}`, borderRight:`1.5px solid ${accent}`, borderRadius:"0 0 6px 0" },
            { top:16, right:16,   borderTop:`1.5px solid ${accent2}`, borderRight:`1.5px solid ${accent2}`, borderRadius:"0 6px 0 0" },
            { bottom:16, left:16,  borderBottom:`1.5px solid ${accent2}`,borderLeft:`1.5px solid ${accent2}`, borderRadius:"0 0 0 6px" },
          ].map((s,i) => (
            <motion.div key={i} initial={{ opacity:0, scale:0.5 }} animate={{ opacity:1, scale:1 }}
              transition={{ delay:0.15+i*0.06, duration:0.35, ease:[0.34,1.56,0.64,1] }}
              style={{ position:"absolute", width:22, height:22, pointerEvents:"none", ...s }}/>
          ))}

          {/* Logo */}
          <motion.div initial={{ opacity:0, scale:0.55 }} animate={{ opacity:1, scale:1 }}
            transition={{ duration:0.5, ease:[0.34,1.56,0.64,1] }}
            style={{ position:"relative", width:"clamp(90px,22vw,130px)", height:"clamp(90px,22vw,130px)", marginBottom:24 }}
          >
            <motion.div animate={{ rotate:360 }} transition={{ repeat:Infinity, duration:18, ease:"linear" }}
              style={{ position:"absolute", inset:-16, borderRadius:"50%", border:`1px dashed ${isDark?"rgba(77,171,247,0.18)":"rgba(29,99,168,0.15)"}`, pointerEvents:"none" }}/>
            <motion.div animate={{ rotate:360 }} transition={{ repeat:Infinity, duration:2.5, ease:"linear" }}
              style={{ position:"absolute", inset:-6, borderRadius:"50%", border:"2px solid transparent", borderTopColor:accent, borderLeftColor:accent, filter:`drop-shadow(0 0 5px ${accent}88)` }}/>
            <motion.div animate={{ rotate:-360 }} transition={{ repeat:Infinity, duration:1.8, ease:"linear" }}
              style={{ position:"absolute", inset:6, borderRadius:"50%", border:"2px solid transparent", borderRightColor:accent2, borderBottomColor:accent2, filter:`drop-shadow(0 0 4px ${accent2}88)` }}/>

            <OrbitDot radius={72} duration={4.5} startAngle={0}   size={6} color={accent} />
            <OrbitDot radius={72} duration={4.5} startAngle={180} size={4} color={accent2}/>
            <OrbitDot radius={58} duration={3.2} startAngle={90}  size={4} color={accent} />

            <motion.div
              animate={{ boxShadow:[`0 0 16px ${accent}44`,`0 0 30px ${accent}88`,`0 0 16px ${accent}44`] }}
              transition={{ duration:2.2, repeat:Infinity, ease:"easeInOut" }}
              style={{ position:"absolute", inset:0, borderRadius:"50%", overflow:"hidden", border:`2px solid ${isDark?"rgba(77,171,247,0.28)":"rgba(29,99,168,0.18)"}` }}
            >
              <img src={myLogo} alt={tr.hero.name} style={{ width:"100%", height:"100%", objectFit:"cover" }}/>
            </motion.div>

            {[
              { top:-12, left:-12,    borderTop:`2px solid ${accent}`,  borderLeft:`2px solid ${accent}`,   borderRadius:"4px 0 0 0" },
              { bottom:-12, right:-12, borderBottom:`2px solid ${accent}`, borderRight:`2px solid ${accent}`, borderRadius:"0 0 4px 0" },
              { top:-12, right:-12,   borderTop:`2px solid ${accent2}`, borderRight:`2px solid ${accent2}`, borderRadius:"0 4px 0 0" },
              { bottom:-12, left:-12,  borderBottom:`2px solid ${accent2}`,borderLeft:`2px solid ${accent2}`, borderRadius:"0 0 0 4px" },
            ].map((s,i) => (
              <motion.div key={i} initial={{ opacity:0, scale:0 }} animate={{ opacity:1, scale:1 }}
                transition={{ delay:0.35+i*0.07, duration:0.28 }}
                style={{ position:"absolute", width:12, height:12, ...s }}/>
            ))}
          </motion.div>

          {/* Name */}
          <motion.div style={{ display:"flex", gap:1, flexWrap:"wrap", justifyContent:"center", marginBottom:10, padding:"0 16px", maxWidth:"90vw" }}>
            {String(tr.hero.name).split("").map((char,i) => (
              <motion.span key={i}
                initial={{ opacity:0, y:20 }}
                animate={{ opacity:1, y:0 }}
                transition={{ delay:0.32+i*0.038, duration:0.36, ease:[0.22,1,0.36,1] }}
                style={{ fontSize:char===" "?"clamp(0.8rem,4vw,1.5rem)":"clamp(1.1rem,5.5vw,2rem)", fontWeight:800, color:textPri, fontFamily:"'Syne',sans-serif", letterSpacing:"-0.01em", lineHeight:1 }}
              >
                {char===" " ? "\u00A0" : char}
              </motion.span>
            ))}
          </motion.div>

          {/* Divider */}
          <motion.div initial={{ scaleX:0 }} animate={{ scaleX:1 }} transition={{ delay:0.88, duration:0.4, ease:"easeOut" }}
            style={{ width:200, height:1, background:`linear-gradient(90deg,transparent,${accent},${accent2},transparent)`, marginBottom:10, transformOrigin:"center" }}/>

          {/* Role */}
          <motion.p initial={{ opacity:0, letterSpacing:"0.3em" }} animate={{ opacity:1, letterSpacing:"0.14em" }}
            transition={{ delay:0.96, duration:0.55, ease:"easeOut" }}
            style={{ fontSize:"0.7rem", fontWeight:500, color:accent, fontFamily:"'DM Mono',monospace", textTransform:"uppercase", margin:0 }}
          >
            {`< ${tr.hero.role} />`}
          </motion.p>

          {/* Progress */}
          <motion.div initial={{ opacity:0, y:12 }} animate={{ opacity:1, y:0 }} transition={{ delay:1.05, duration:0.4 }}
            style={{ marginTop:30, width:"min(220px, 80vw)", display:"flex", flexDirection:"column", gap:8 }}
          >
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
              <AnimatePresence mode="wait">
                <motion.span key={stageLabel}
                  initial={{ opacity:0, x:-6 }} animate={{ opacity:1, x:0 }} exit={{ opacity:0, x:6 }}
                  transition={{ duration:0.18 }}
                  style={{ fontSize:"0.6rem", fontFamily:"'DM Mono',monospace", color:isDark?"rgba(232,241,255,0.38)":"rgba(15,26,46,0.38)", textTransform:"uppercase", letterSpacing:"0.06em" }}
                >
                  {stageLabel}
                </motion.span>
              </AnimatePresence>
              <motion.span style={{ fontSize:"0.7rem", fontFamily:"'DM Mono',monospace", fontWeight:500, color:done?accent2:accent, letterSpacing:"0.04em", minWidth:36, textAlign:"right" }}>
                {progress}%
              </motion.span>
            </div>

            <div style={{ width:"100%", height:3, borderRadius:99, background:isDark?"rgba(255,255,255,0.06)":"rgba(0,0,0,0.07)", overflow:"hidden", position:"relative" }}>
              <motion.div
                animate={{ width:`${progress}%` }}
                transition={{ duration:0.15, ease:"easeOut" }}
                style={{ height:"100%", borderRadius:99, background:`linear-gradient(90deg,${accent},${accent2})`, boxShadow:`0 0 8px ${accent}88`, position:"relative", overflow:"hidden" }}
              >
                {!done && (
                  <motion.div animate={{ x:["-100%","220%"] }} transition={{ duration:0.9, repeat:Infinity, ease:"easeInOut" }}
                    style={{ position:"absolute", inset:0, background:"linear-gradient(90deg,transparent,rgba(255,255,255,0.4),transparent)", borderRadius:99 }}/>
                )}
              </motion.div>
            </div>

            <div style={{ display:"flex", justifyContent:"space-between", paddingTop:2 }}>
              {STAGES.map((_,i) => (
                <motion.div key={i}
                  animate={{ background:i<=stageIndex?accent:isDark?"rgba(255,255,255,0.1)":"rgba(0,0,0,0.1)", boxShadow:i===stageIndex?`0 0 6px ${accent}`:"none" }}
                  transition={{ duration:0.25 }}
                  style={{ width:5, height:5, borderRadius:"50%" }}
                />
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}