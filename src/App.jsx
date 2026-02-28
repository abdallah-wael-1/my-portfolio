import React, { useState } from "react";
import Navbar            from "./components/Navbar.jsx";
import Hero              from "./pages/Hero.jsx";
import StatsSection      from "./components/StatsSection.jsx";
import Projects          from "./pages/Projects.jsx";
import Timeline          from "./components/Timeline.jsx";
import Skills            from "./pages/Skills.jsx";
import About             from "./pages/About.jsx";
import Contact           from "./pages/Contact.jsx";
import Footer            from "./components/Footer.jsx";
import ScrollToTop       from "./components/ScrollToTop.jsx";
import Loader            from "./components/Loader.jsx";
import BackgroundEffects from "./components/BackgroundEffects.jsx";
import FloatingContact   from "./components/FloatingContact.jsx";
import { useLang }       from "./context/LanguageContext.jsx";

function App({ currentMode, toggleMode }) {
  const [loading, setLoading] = useState(true);
  const { isRtl } = useLang();
  const dark = currentMode === "dark";
  if (loading) return <Loader onComplete={() => setLoading(false)} />;

  return (
    <div dir={isRtl ? "rtl" : "ltr"} style={{ position: "relative" }}>
      {/* ── Global background effects ── */}
      <BackgroundEffects dark={dark} />

      <div style={{ position: "relative", zIndex: 1 }}>
        <Navbar currentMode={currentMode} toggleMode={toggleMode} />
          <Hero />
          <StatsSection isRtl={isRtl} />
          <Projects />
          <Timeline />
          <Skills />
          <About />
          <Contact />
          <Footer />
        <ScrollToTop showAfter={250} />
        <FloatingContact />
      </div>
    </div>
  );
}

export default App;