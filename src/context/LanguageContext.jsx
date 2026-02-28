import React, { createContext, useContext, useState } from "react";
import { translations } from "../utils/i18n.js";

const LanguageContext = createContext(null);

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState("en");

  const toggleLang = () => setLang((prev) => (prev === "en" ? "ar" : "en"));

  const tr = translations[lang];
  const isRtl = lang === "ar";

  return (
    <LanguageContext.Provider value={{ lang, toggleLang, tr, isRtl }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLang() {
  return useContext(LanguageContext);
}