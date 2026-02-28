import React, { useState } from "react";
import { Box, TextField, Button, Typography, IconButton, useTheme } from "@mui/material";
import { alpha } from "@mui/material/styles";
import { motion, AnimatePresence } from "framer-motion";
import { useLang } from "../context/LanguageContext.jsx";
import AlertModal, { useAlert } from "./AlertModal.jsx";
import CloseIcon        from "@mui/icons-material/Close";
import SendIcon         from "@mui/icons-material/Send";
import ChatBubbleIcon   from "@mui/icons-material/ChatBubble";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowBackIcon    from "@mui/icons-material/ArrowBack";
import CheckCircleIcon  from "@mui/icons-material/CheckCircle";

// ─── Services data ────────────────────────────────────────────────────────────
const services = [
  { key:"website",   en:"Website",       ar:"موقع ويب",       icon:"🌐", color:"#4dabf7", descEn:"Full responsive site",    descAr:"موقع متجاوب متكامل"  },
  { key:"app",       en:"Web App",       ar:"تطبيق ويب",       icon:"⚛️", color:"#61dafb", descEn:"React SPA / Dashboard",   descAr:"تطبيق React تفاعلي"   },
  { key:"landing",   en:"Landing Page",  ar:"صفحة هبوط",       icon:"🚀", color:"#ff9800", descEn:"High-converting page",    descAr:"صفحة تسويقية محترفة"  },
  { key:"ui",        en:"UI/UX Design",  ar:"تصميم واجهات",    icon:"🎨", color:"#e040fb", descEn:"Figma → pixel-perfect",   descAr:"تصميم احترافي بـ Figma"},
  { key:"freelance", en:"Freelance",     ar:"مشروع حر",         icon:"💼", color:"#69f0ae", descEn:"Custom task / project",   descAr:"مهمة حسب الطلب"      },
  { key:"other",     en:"Just saying hi",ar:"مجرد تحية",        icon:"👋", color:"#ffd740", descEn:"Let's just chat!",        descAr:"فقط أريد التحدث!"    },
];

function ServiceCard({ s, selected, onClick, lang, idx }) {
  const theme = useTheme();
  const isSelected = selected === s.key;
  return (
    <motion.div initial={{ opacity:0, y:8 }} animate={{ opacity:1, y:0 }} transition={{ delay:idx*0.04, duration:0.28 }}>
      <Box onClick={onClick} role="button" tabIndex={0} aria-pressed={isSelected} sx={{
        p:{xs:1.5,md:2}, borderRadius:2, cursor:"pointer", textAlign:"center",
        border:`1px solid ${alpha(theme.palette.divider,0.08)}`,
        background:theme.palette.background.paper,
        transition:"transform 0.28s ease, box-shadow 0.28s ease, border-color 0.28s ease",
        "&:hover":{ transform:"translateY(-6px)", boxShadow:theme.shadows[6], borderColor:alpha(theme.palette.primary.main,0.22) },
        ...(isSelected && { borderColor:alpha(theme.palette.primary.main,0.26), background:alpha(theme.palette.primary.main,0.04) }),
      }}>
        <Box sx={{ fontSize:{xs:22,md:26}, lineHeight:1, mb:1 }}>{s.icon}</Box>
        <Typography sx={{ fontSize:{xs:".78rem",md:".9rem"}, fontWeight:700, color:theme.palette.text.primary }}>
          {lang==="ar" ? s.ar : s.en}
        </Typography>
        <Typography sx={{ fontSize:".68rem", color:theme.palette.text.secondary, display:{xs:"none",sm:"block"} }}>
          {lang==="ar" ? s.descAr : s.descEn}
        </Typography>
      </Box>
    </motion.div>
  );
}

export default function FloatingContact() {
  const { tr, isRtl, lang } = useLang();
  const ar = lang === "ar";
  const theme = useTheme();
  const { alertState, fire, close } = useAlert();

  const [open, setOpen]       = useState(false);
  const [service, setService] = useState("");
  const [step, setStep]       = useState(1);
  const [form, setForm]       = useState({ name:"", email:"", message:"", subject:"" });
  const [sent, setSent]       = useState(false);
  const [loading, setLoading] = useState(false);
  const [focused, setFocused] = useState("");
  const [errors, setErrors]   = useState({});

  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const validateForm = () => {
    const e = {};
    if (!form.name.trim())                    e.name    = ar ? "الاسم مطلوب"        : "Name is required";
    else if (form.name.trim().length < 2)     e.name    = ar ? "حرفين على الأقل"    : "At least 2 characters";
    if (!form.email.trim())                   e.email   = ar ? "البريد مطلوب"       : "Email is required";
    else if (!emailRegex.test(form.email))    e.email   = ar ? "صيغة غير صحيحة"    : "Invalid email format";
    if (!form.message.trim())                 e.message = ar ? "الرسالة مطلوبة"    : "Message is required";
    else if (form.message.trim().length < 10) e.message = ar ? "10 أحرف على الأقل" : "At least 10 characters";
    else if (form.message.length > 500)       e.message = ar ? "500 حرف كحد أقصى"  : "Max 500 characters";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleOpen = () => { setOpen(true); setStep(1); setSent(false); setService(""); setErrors({}); };
  const handleClose = () => {
    setOpen(false);
    setTimeout(() => {
      setStep(1); setService("");
      setForm({ name:"", email:"", message:"", subject:"" });
      setSent(false); setErrors({});
    }, 400);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setLoading(true);
    try {
      const payload = {
        name:    form.name.trim(),
        email:   form.email.trim(),
        message: form.message.trim(),
        subject: service ? `[${service}] ${form.subject||"Quick Contact"}` : (form.subject||"Quick Contact"),
      };
      const res  = await fetch(`${API_URL}/api/contact`, {
        method:"POST", headers:{"Content-Type":"application/json"}, body:JSON.stringify(payload),
      });
      const data = await res.json();
      if (data.success) {
        setSent(true);
        fire({
          icon:"success",
          title: ar ? `شكرًا، ${form.name}!` : `Thank you, ${form.name}!`,
          html:  ar ? "<b>تم إرسال رسالتك بنجاح. ستتلقى ردًا قريبًا.</b>"
                    : "<b>Your message was sent successfully. I'll get back to you shortly.</b>",
          confirmButtonText: ar ? "إغلاق" : "Close",
        });
        setTimeout(handleClose, 3500);
      } else {
        fire({ icon:"error", title: ar?"خطأ":"Error", html:`<b>${data.message||(ar?"حدث خطأ":"Something went wrong")}</b>`, confirmButtonText: ar?"حسناً":"OK" });
      }
    } catch {
      fire({ icon:"error", title: ar?"خطأ في الاتصال":"Connection Error", html: ar?"<b>فشل الاتصال بالخادم.</b>":"<b>Could not reach the server.</b>", confirmButtonText: ar?"حسناً":"OK" });
    } finally {
      setLoading(false);
    }
  };

  const inputSx = (field) => ({
    "& .MuiOutlinedInput-root": {
      borderRadius:12,
      background: focused===field ? alpha(theme.palette.action.selected,0.06) : theme.palette.background.paper,
      transition:"all .18s ease",
      "& fieldset":{ borderColor: focused===field ? alpha(theme.palette.primary.main,0.32) : alpha(theme.palette.divider,0.06), borderWidth: focused===field?1.6:1 },
      "&:hover fieldset":{ borderColor:alpha(theme.palette.primary.main,0.18) },
    },
    "& .MuiInputLabel-root":{ color:theme.palette.text.secondary, fontSize:".9rem" },
    "& .MuiInputLabel-root.Mui-focused":{ color:theme.palette.primary.main },
    "& .MuiOutlinedInput-input":{ color:theme.palette.text.primary },
  });

  const selService = services.find(s => s.key === service);

  return (
    <>
      <AlertModal state={alertState} onClose={close} />

      {/* Backdrop */}
      <AnimatePresence>
        {open && (
          <motion.div key="fc-bd" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} transition={{duration:.3}}
            onClick={handleClose}
            style={{ position:"fixed", inset:0, zIndex:1450, background:"rgba(2,5,16,0.85)", backdropFilter:"blur(10px) saturate(50%)" }}
          />
        )}
      </AnimatePresence>

      {/* Bottom Sheet */}
      <AnimatePresence>
        {open && (
          <motion.div key="fc-sheet"
            initial={{y:"100%",opacity:.5}} animate={{y:0,opacity:1}} exit={{y:"100%",opacity:0}}
            transition={{type:"spring",stiffness:240,damping:26}}
            style={{ position:"fixed", left:0, right:0, bottom:0, zIndex:1500, height:"min(660px, 90vh)" }}
          >
            <Box sx={(t) => ({
              height:"100%",
              background: t.palette.mode==="dark" ? t.palette.background.paper : t.palette.common.white,
              borderRadius:"20px 20px 0 0", overflow:"hidden",
              display:"flex", flexDirection:"column",
              boxShadow:t.shadows[8], position:"relative",
              borderTop:`1px solid ${alpha(t.palette.divider,0.04)}`,
            })}>
              <Box sx={{ position:"absolute", top:10, left:"50%", transform:"translateX(-50%)", width:40, height:4, borderRadius:2, background:alpha(theme.palette.divider,0.08), zIndex:3 }} />

              {/* Header */}
              <Box sx={(t) => ({ position:"relative", zIndex:2, px:{xs:3,md:6}, pt:4, pb:2.5, display:"flex", alignItems:"center", justifyContent:"space-between", borderBottom:`1px solid ${alpha(t.palette.divider,0.06)}`, flexShrink:0 })}>
                <Box sx={{ display:"flex", alignItems:"center", gap:2 }}>
                  <Box sx={(t) => ({ width:46, height:46, borderRadius:12, background:t.palette.primary.main, display:"flex", alignItems:"center", justifyContent:"center", color:t.palette.common.white, fontSize:20 })}>💬</Box>
                  <Box>
                    <Typography sx={{ color:theme.palette.text.primary, fontWeight:800, lineHeight:1.2, fontSize:{xs:"1rem",md:"1.15rem"} }}>{ar?"تواصل سريع":"Quick Contact"}</Typography>
                    <Typography sx={{ fontSize:".72rem", color:theme.palette.text.secondary, mt:.4 }}>{ar?"متاح الآن — يرد بسرعة":"Online — typically replies quickly"}</Typography>
                  </Box>
                </Box>
                <Box sx={{ display:"flex", alignItems:"center", gap:2 }}>
                  <Box sx={{ display:"flex", gap:.6, alignItems:"center" }}>
                    {[1,2].map(s => (
                      <Box key={s} sx={(t) => ({ height:6, borderRadius:3, width:step===s?28:8, background:step>=s?t.palette.primary.main:alpha(t.palette.text.primary,0.06), transition:"all .28s ease" })} />
                    ))}
                  </Box>
                  <IconButton onClick={handleClose} size="small" sx={(t) => ({ color:t.palette.text.secondary, borderRadius:1 })}>
                    <CloseIcon fontSize="small" />
                  </IconButton>
                </Box>
              </Box>

              {/* Body */}
              <Box sx={{ flex:1, overflow:"hidden", position:"relative", zIndex:2 }}>
                <AnimatePresence mode="wait">

                  {sent && (
                    <motion.div key="success" initial={{opacity:0,y:8}} animate={{opacity:1,y:0}} exit={{opacity:0}} transition={{duration:0.28}}
                      style={{ height:"100%", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", padding:"36px 20px", textAlign:"center" }}>
                      <CheckCircleIcon sx={{ fontSize:64, color:theme.palette.success.main, mb:1 }} />
                      <Typography sx={{ fontWeight:800, color:theme.palette.text.primary, mb:1, fontSize:{xs:"1.2rem",md:"1.6rem"} }}>{ar?"تم الإرسال":"Message Sent"}</Typography>
                      <Typography sx={{ color:theme.palette.text.secondary, maxWidth:420, fontSize:{xs:".95rem",md:"1rem"}, lineHeight:1.6 }}>{ar?"شكرًا، سأعاود التواصل معك قريبًا.":"Thanks — I'll get back to you shortly."}</Typography>
                    </motion.div>
                  )}

                  {!sent && step===1 && (
                    <motion.div key="step1" initial={{opacity:0,x:ar?40:-40}} animate={{opacity:1,x:0}} exit={{opacity:0,x:ar?40:-40}} transition={{duration:.28}} style={{height:"100%",overflowY:"auto"}}>
                      <Box sx={{ px:{xs:3,md:6}, py:3, display:"flex", flexDirection:"column", height:"100%" }}>
                        <Box sx={{ mb:3 }}>
                          <Typography sx={{ fontWeight:800, color:theme.palette.text.primary, mb:.5, fontSize:{xs:"1rem",md:"1.15rem"} }}>{ar?"بماذا أستطيع مساعدتك؟":"What can I help you with?"}</Typography>
                          <Typography sx={{ fontSize:".86rem", color:theme.palette.text.secondary }}>{ar?"اختر نوع الخدمة لأساعدك بشكل أفضل":"Pick a category for a better tailored response"}</Typography>
                        </Box>
                        <Box sx={{ display:"grid", gridTemplateColumns:{xs:"repeat(2,1fr)",sm:"repeat(3,1fr)",md:"repeat(6,1fr)"}, gap:{xs:1.2,md:1.5}, mb:"auto" }}>
                          {services.map((s,i) => <ServiceCard key={s.key} s={s} selected={service} onClick={()=>setService(s.key)} lang={lang} idx={i} />)}
                        </Box>
                        <Box sx={{ pt:3 }}>
                          <Button fullWidth variant="contained" color="primary" disabled={!service} onClick={()=>setStep(2)}
                            endIcon={ar?<ArrowBackIcon />:<ArrowForwardIcon />}
                            sx={{ textTransform:"none", fontWeight:700, py:1.5, borderRadius:2 }}>
                            {ar?"متابعة":"Continue"}
                          </Button>
                        </Box>
                      </Box>
                    </motion.div>
                  )}

                  {!sent && step===2 && (
                    <motion.div key="step2" initial={{opacity:0,x:ar?-40:40}} animate={{opacity:1,x:0}} exit={{opacity:0,x:ar?-40:40}} transition={{duration:.28}} style={{height:"100%",overflowY:"auto"}}>
                      <Box sx={{ px:{xs:3,md:6}, py:3, height:"100%", display:"flex", flexDirection:{xs:"column",lg:"row"}, gap:{xs:0,lg:6} }}>
                        <Box sx={{ width:{xs:"100%",lg:300}, flexShrink:0, mb:{xs:3,lg:0} }}>
                          {selService && (
                            <Box sx={{ display:"inline-flex", alignItems:"center", gap:1.2, px:1.6, py:.8, borderRadius:1.5, mb:2, background:alpha(theme.palette.primary.main,0.06), border:`1px solid ${alpha(theme.palette.primary.main,0.12)}` }}>
                              <Box sx={{ fontSize:18 }}>{selService.icon}</Box>
                              <Typography sx={{ fontSize:".82rem", fontWeight:700, color:theme.palette.primary.main }}>{ar?selService.ar:selService.en}</Typography>
                            </Box>
                          )}
                          <Typography sx={{ fontWeight:800, color:theme.palette.text.primary, lineHeight:1.25, fontSize:{xs:"1.05rem",md:"1.15rem"}, mb:1.2 }}>{ar?"أخبرني عن مشروعك":"Tell me about your project"}</Typography>
                          <Typography sx={{ fontSize:".88rem", color:theme.palette.text.secondary, lineHeight:1.6, mb:3 }}>{ar?"أنا هنا للمساعدة. سأرد عليك في أقرب وقت ممكن.":"I'm here to help — I'll reply soon."}</Typography>
                          <Box sx={{ display:"flex", flexDirection:"column", gap:1 }}>
                            {[
                              { icon:"⚡", label:ar?"رد سريع":"Fast Reply", val:ar?"خلال 24 ساعة":"Within 24h"    },
                              { icon:"🔒", label:ar?"آمن":"Secure",         val:ar?"بياناتك محمية":"100% private"  },
                              { icon:"🎯", label:ar?"مجاني":"Free",         val:ar?"استشارة مجانية":"Free consult" },
                            ].map((item,i) => (
                              <Box key={i} sx={{ display:"flex", alignItems:"center", gap:1.4, px:1.6, py:1.1, borderRadius:1.5, background:alpha(theme.palette.action.selected,0.02), border:`1px solid ${alpha(theme.palette.divider,0.04)}` }}>
                                <Box sx={{ fontSize:16 }}>{item.icon}</Box>
                                <Box>
                                  <Typography sx={{ fontSize:".65rem", color:theme.palette.text.secondary, textTransform:"uppercase" }}>{item.label}</Typography>
                                  <Typography sx={{ fontSize:".78rem", fontWeight:600, color:theme.palette.text.primary }}>{item.val}</Typography>
                                </Box>
                              </Box>
                            ))}
                          </Box>
                          <Button size="small" startIcon={ar?<ArrowForwardIcon sx={{fontSize:13}}/>:<ArrowBackIcon sx={{fontSize:13}}/>}
                            onClick={()=>setStep(1)} sx={{ mt:3, textTransform:"none", color:theme.palette.text.secondary, fontSize:".78rem", pl:0 }}>
                            {ar?"تغيير الخدمة":"Change service"}
                          </Button>
                        </Box>

                        <Box component="form" onSubmit={handleSubmit} sx={{ flex:1, display:"flex", flexDirection:"column", gap:2.2 }}>
                          <Box sx={{ display:"grid", gridTemplateColumns:{xs:"1fr",sm:"1fr 1fr"}, gap:2 }}>
                            <TextField label={tr.contact.name} name="name" value={form.name}
                              onChange={e=>{setForm(p=>({...p,name:e.target.value}));if(errors.name)setErrors(p=>({...p,name:""}));}}
                              onFocus={()=>setFocused("name")} onBlur={()=>setFocused("")}
                              error={!!errors.name} helperText={errors.name} required sx={inputSx("name")} />
                            <TextField label={tr.contact.email} name="email" type="email" value={form.email}
                              onChange={e=>{setForm(p=>({...p,email:e.target.value}));if(errors.email)setErrors(p=>({...p,email:""}));}}
                              onFocus={()=>setFocused("email")} onBlur={()=>setFocused("")}
                              error={!!errors.email} helperText={errors.email} required sx={inputSx("email")} />
                          </Box>
                          <TextField label={ar?"الموضوع (اختياري)":"Subject (optional)"} name="subject" fullWidth value={form.subject}
                            onChange={e=>setForm(p=>({...p,subject:e.target.value}))}
                            onFocus={()=>setFocused("subject")} onBlur={()=>setFocused("")} sx={inputSx("subject")} />
                          <TextField label={tr.contact.message} name="message" multiline rows={5} value={form.message}
                            onChange={e=>{setForm(p=>({...p,message:e.target.value}));if(errors.message)setErrors(p=>({...p,message:""}));}}
                            onFocus={()=>setFocused("msg")} onBlur={()=>setFocused("")}
                            error={!!errors.message} helperText={errors.message} required sx={{...inputSx("msg"),"& textarea":{resize:"none"}}} />
                          <Typography sx={{ fontSize:".65rem", mt:-.8, color:form.message.length>450?theme.palette.error.main:theme.palette.text.secondary, textAlign:ar?"left":"right" }}>
                            {form.message.length} / 500
                          </Typography>
                          <motion.div whileHover={{scale:1.01}} whileTap={{scale:.99}}>
                            <Button type="submit" fullWidth variant="contained" color="primary" disabled={loading}
                              endIcon={<SendIcon sx={{fontSize:18}}/>}
                              sx={{ textTransform:"none", fontWeight:700, py:1.6, borderRadius:2 }}>
                              {loading ? (ar?"جاري الإرسال...":"Sending...") : (ar?"إرسال الرسالة":"Send Message")}
                            </Button>
                          </motion.div>
                        </Box>
                      </Box>
                    </motion.div>
                  )}

                </AnimatePresence>
              </Box>
            </Box>
          </motion.div>
        )}
      </AnimatePresence>

      {/* FAB */}
      <Box style={{ position:"fixed", bottom:28, left:isRtl?"auto":28, right:isRtl?28:"auto", zIndex:1400, display:"flex", flexDirection:"column", alignItems:isRtl?"flex-end":"flex-start", gap:8 }}>
        <AnimatePresence>
          {!open && (
            <motion.div key="label-chip"
              initial={{opacity:0,y:10,scale:0.85}} animate={{opacity:1,y:[0,-5,0],scale:1}} exit={{opacity:0,y:10,scale:0.85}}
              transition={{ opacity:{duration:0.35}, scale:{duration:0.35}, y:{duration:2.6,repeat:Infinity,ease:"easeInOut",delay:1.4} }}
              style={{ display:"flex", alignItems:"center", gap:6, background:"rgba(10,10,18,0.82)", backdropFilter:"blur(14px)", border:"1px solid rgba(255,255,255,0.09)", borderRadius:24, padding:"6px 14px 6px 8px", cursor:"pointer", boxShadow:"0 4px 18px rgba(0,0,0,0.28)" }}
              onClick={handleOpen}
            >
              <Box sx={{ position:"relative", width:8, height:8, flexShrink:0 }}>
                <Box sx={{ position:"absolute", inset:0, borderRadius:"50%", background:"#22d3a0", "@keyframes fcPulseRing":{"0%":{transform:"scale(1)",opacity:0.9},"100%":{transform:"scale(3)",opacity:0}}, animation:"fcPulseRing 1.9s ease-out infinite" }} />
                <Box sx={{ position:"absolute", inset:0, borderRadius:"50%", background:"#22d3a0" }} />
              </Box>
              <Typography sx={{ fontSize:".72rem", fontWeight:700, color:"#e8eaf0", letterSpacing:".03em", whiteSpace:"nowrap" }}>
                {ar?"تواصل معي":"Let's talk"}
              </Typography>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div whileHover={{scale:1.12}} whileTap={{scale:0.88}} style={{position:"relative"}}>
          {!open && <>
            <Box sx={{ position:"absolute", inset:-5, borderRadius:15, background:`conic-gradient(${theme.palette.primary.main}, ${alpha(theme.palette.primary.main,0.2)}, ${theme.palette.primary.main})`, "@keyframes fcSpin":{from:{transform:"rotate(0deg)"},to:{transform:"rotate(360deg)"}}, animation:"fcSpin 3s linear infinite", opacity:0.6, filter:"blur(3px)", zIndex:0 }} />
            <Box sx={{ position:"absolute", inset:-10, borderRadius:18, background:alpha(theme.palette.primary.main,0.25), filter:"blur(14px)", zIndex:0, "@keyframes fcGlowPulse":{"0%,100%":{opacity:0.35},"50%":{opacity:0.65}}, animation:"fcGlowPulse 2.4s ease-in-out infinite" }} />
          </>}
          <Box onClick={()=>open?handleClose():handleOpen()} sx={{ position:"relative", zIndex:1, width:56, height:56, borderRadius:13, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", background:open?theme.palette.error.main:`linear-gradient(145deg,${theme.palette.primary.light||theme.palette.primary.main} 0%,${theme.palette.primary.main} 55%,${theme.palette.primary.dark||theme.palette.primary.main} 100%)`, boxShadow:open?`0 6px 22px ${alpha(theme.palette.error.main,0.50)}`:`0 6px 26px ${alpha(theme.palette.primary.main,0.60)}`, transition:"background .22s ease, box-shadow .22s ease, border-radius .22s ease", "&:hover":{borderRadius:16} }}>
            <AnimatePresence mode="wait">
              <motion.div key={open?"x":"c"} initial={{rotate:-90,opacity:0,scale:0.5}} animate={{rotate:0,opacity:1,scale:1}} exit={{rotate:90,opacity:0,scale:0.5}} transition={{duration:0.2}}>
                {open ? <CloseIcon sx={{color:"#fff",fontSize:22}}/> : <ChatBubbleIcon sx={{color:"#fff",fontSize:22}}/>}
              </motion.div>
            </AnimatePresence>
          </Box>
        </motion.div>
      </Box>
    </>
  );
}