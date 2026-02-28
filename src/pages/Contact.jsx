import React, { useState } from "react";
import {
  Box, Typography, TextField, Button, Grid, Container, IconButton,
} from "@mui/material";
import { motion } from "framer-motion";
import SectionTitle from "../components/Title/SectionTitle.jsx";
import { useLang } from "../context/LanguageContext.jsx";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import EmailIcon from "@mui/icons-material/Email";
import { useTheme } from "@mui/material";
import AlertModal, { useAlert } from "../components/AlertModal.jsx";

export default function Contact() {
  const { tr, isRtl } = useLang();
  const theme = useTheme();
  const dark = theme.palette.mode === "dark";
  const { alertState, fire, close } = useAlert();

  const [formData, setFormData] = useState({ name:"", email:"", phone:"", subject:"", message:"" });
  const [errors, setErrors]     = useState({});
  const [sending, setSending]   = useState(false);

  const socialLinks = [
    { icon:<EmailIcon />,    href:"mailto:abdallahelsadany18@gmail.com",                 color:"#ff5722", label:"Email"   },
    { icon:<GitHubIcon />,   href:"https://github.com/abdallah-wael-1",                 color: dark?"#e0e0e0":"#24292e", label:"GitHub"  },
    { icon:<LinkedInIcon />, href:"https://www.linkedin.com/in/abdallah-wael-56a215357",color:"#4dabf7", label:"LinkedIn"},
  ];

  const validate = () => {
    const e = {};
    if (!formData.name.trim())    e.name    = `${tr.contact.name} ${tr.contact.required}`;
    if (!formData.email.trim())   e.email   = `${tr.contact.email} ${tr.contact.required}`;
    else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)) e.email = tr.contact.invalidEmail;
    if (formData.phone && !/^\+?\d{7,15}$/.test(formData.phone)) e.phone = tr.contact.invalidPhone;
    if (!formData.subject.trim()) e.subject = `${tr.contact.subject} ${tr.contact.required}`;
    if (!formData.message.trim()) e.message = `${tr.contact.message} ${tr.contact.required}`;
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    setErrors(prev => ({ ...prev, [e.target.name]: "" }));
  };

  const API_URL = import.meta.env.VITE_API_URL || "https://portfolio-back-end-production-d60c.up.railway.app";

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setSending(true);
    try {
      const res  = await fetch(`${API_URL}/api/contact`, {
        method:"POST", headers:{"Content-Type":"application/json"}, body:JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success) {
        fire({
          icon:"success",
          title: isRtl ? `شكراً، ${formData.name}!` : `Thank you, ${formData.name}!`,
          html:  isRtl ? "<b>تم إرسال رسالتك بنجاح.</b>" : "<b>Your message has been sent successfully.</b>",
          confirmButtonText: isRtl ? "إغلاق" : "Close",
        });
        setFormData({ name:"", email:"", phone:"", subject:"", message:"" });
      } else {
        fire({ icon:"error", title:"Error", html:`<b>${data.error||"Something went wrong"}</b>`, confirmButtonText:"OK" });
      }
    } catch {
      fire({
        icon:"success",
        title: isRtl ? `شكراً، ${formData.name}!` : `Thank you, ${formData.name}!`,
        html:  isRtl ? "<b>تم إرسال رسالتك بنجاح.</b>" : "<b>Your message has been sent successfully.</b>",
        confirmButtonText: isRtl ? "إغلاق" : "Close",
      });
      setFormData({ name:"", email:"", phone:"", subject:"", message:"" });
    } finally {
      setSending(false);
    }
  };

  const inputSx = {
    "& .MuiOutlinedInput-root": {
      borderRadius:"14px",
      "& fieldset":{ borderColor:"rgba(25,118,210,0.25)" },
      "&:hover fieldset":{ borderColor:"rgba(25,118,210,0.5)" },
      "&.Mui-focused fieldset":{ borderColor:"#1976d2" },
    },
    "& .MuiInputLabel-root":{ color:"text.secondary" },
    "& .MuiInputLabel-root.Mui-focused":{ color:"#4dabf7" },
  };

  return (
    <Container component="section" maxWidth="lg" sx={{ py:{ xs:4, md:8 } }}>
      <AlertModal state={alertState} onClose={close} />
      <SectionTitle text={tr.contact.title} />

      <Box id="contact" sx={{ display:"flex", flexDirection:{xs:"column",md:"row"}, alignItems:{xs:"stretch",md:"flex-start"}, textAlign:{xs:"center",md:isRtl?"right":"left"}, bgcolor:"background.paper", p:{xs:3,md:6}, borderRadius:"28px", gap:6, boxShadow:"0 8px 40px rgba(0,0,0,0.2)", border:"1px solid rgba(25,118,210,0.1)", maxWidth:"1000px", margin:"0 auto" }}>

        {/* LEFT */}
        <motion.div initial={{ opacity:0, x:isRtl?30:-30 }} whileInView={{ opacity:1, x:0 }} viewport={{ once:true }} transition={{ duration:0.6 }} style={{ flex:"0 0 auto", maxWidth:320 }}>
          <Typography variant="h5" sx={{ fontWeight:800, color:"primary.main", mb:2, letterSpacing:0.5 }}>{tr.contact.getInTouch}</Typography>
          <Typography variant="body2" sx={{ color:"text.secondary", lineHeight:1.9, mb:4, fontSize:"0.95rem" }}>{tr.contact.intro}</Typography>

          <Box sx={{ display:"flex", gap:1.5, justifyContent:{xs:"center",md:isRtl?"flex-end":"flex-start"}, mb:4 }}>
            {socialLinks.map((s,i) => (
              <motion.div key={i} whileHover={{ y:-4, scale:1.1 }} transition={{ type:"spring", stiffness:300 }}>
                <IconButton component="a" href={s.href} target={s.href.startsWith("mailto")?undefined:"_blank"}
                  sx={{ border:"1.5px solid rgba(25,118,210,0.3)", color:s.color, borderRadius:"12px", transition:"all 0.25s", "&:hover":{ borderColor:s.color, boxShadow:`0 4px 16px ${s.color}30`, background:`${s.color}11` } }}>
                  {s.icon}
                </IconButton>
              </motion.div>
            ))}
          </Box>

          <Box sx={{ display:"flex", flexDirection:"column", gap:1.5 }}>
            {[
              { label:"Email",    value:"abdallahelsadany18@gmail.com" },
              { label:"WhatsApp", value:"+201022283412"                },
              { label:isRtl?"الموقع":"Location", value:isRtl?"مصر، الجيزة":"Egypt, Giza" },
            ].map((info,i) => (
              <Box key={i} sx={{ p:1.5, borderRadius:"12px", background:"rgba(25,118,210,0.05)", border:"1px solid rgba(25,118,210,0.12)" }}>
                <Typography sx={{ fontSize:"0.7rem", color:"text.secondary", fontWeight:600, textTransform:"uppercase", letterSpacing:0.5, mb:0.3 }}>{info.label}</Typography>
                <Typography sx={{ fontSize:"0.85rem", color:"primary.main", fontWeight:500 }}>{info.value}</Typography>
              </Box>
            ))}
          </Box>
        </motion.div>

        {/* RIGHT */}
        <motion.div initial={{ opacity:0, x:isRtl?-30:30 }} whileInView={{ opacity:1, x:0 }} viewport={{ once:true }} transition={{ duration:0.6, delay:0.1 }} style={{ flex:1 }}>
          <Box component="form" onSubmit={handleSubmit} noValidate>
            <Grid container spacing={2.5}>
              <Grid item xs={12} sm={6}><TextField fullWidth label={tr.contact.name} name="name" value={formData.name} onChange={handleChange} error={!!errors.name} helperText={errors.name} sx={inputSx} /></Grid>
              <Grid item xs={12} sm={6}><TextField fullWidth label={tr.contact.email} name="email" type="email" value={formData.email} onChange={handleChange} error={!!errors.email} helperText={errors.email} sx={inputSx} /></Grid>
              <Grid item xs={12} sm={6}><TextField fullWidth label={tr.contact.phone} name="phone" type="tel" value={formData.phone} onChange={handleChange} error={!!errors.phone} helperText={errors.phone||tr.contact.optional} sx={inputSx} /></Grid>
              <Grid item xs={12} sm={6}><TextField fullWidth label={tr.contact.subject} name="subject" value={formData.subject} onChange={handleChange} error={!!errors.subject} helperText={errors.subject} sx={inputSx} /></Grid>
              <Grid item xs={12}><TextField fullWidth multiline rows={5} label={tr.contact.message} name="message" value={formData.message} onChange={handleChange} error={!!errors.message} helperText={errors.message} sx={{...inputSx,"& textarea":{resize:"vertical"}}} /></Grid>
              <Grid item xs={12} sx={{ display:"flex", justifyContent:isRtl?"flex-start":"flex-end" }}>
                <motion.div whileHover={{ scale:1.03 }} whileTap={{ scale:0.97 }}>
                  <Button type="submit" variant="contained" size="large" disabled={sending}
                    sx={{ textTransform:"none", fontWeight:700, px:5, py:1.5, borderRadius:"14px", background:sending?undefined:"linear-gradient(135deg, #1976d2, #4dabf7)", boxShadow:"0 6px 20px rgba(25,118,210,0.35)", "&:hover":{ boxShadow:"0 8px 28px rgba(25,118,210,0.5)" } }}>
                    {sending ? tr.contact.sending : tr.contact.send}
                  </Button>
                </motion.div>
              </Grid>
            </Grid>
          </Box>
        </motion.div>
      </Box>
    </Container>
  );
}