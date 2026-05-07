import React, { useEffect, useState } from 'react';
import { Github, Linkedin, Mail, ExternalLink, ChevronDown, X, ArrowRight, Briefcase, Code2, User, Send, MapPin, Calendar } from 'lucide-react';

// ─── THEME ───────────────────────────────────────────────────────────────────
// Brown is dominant. Teal is used only for: CTAs, active nav, tags, dots, icons.
const C = {
  bg:          '#2a1510',   // deep dark brown — page base
  bgMid:       '#341a14',   // slightly lighter brown — alternating sections
  bgCard:      '#3e2018',   // card surface
  bgRaised:    '#4a2620',   // hover / raised states
  cream:       '#f0e0c8',   // primary text
  tan:         '#b89070',   // secondary text
  dim:         '#7a5a48',   // muted text / borders label
  teal:        '#2db494',   // accent ONLY — CTAs, tags, active states
  tealSoft:    'rgba(45,180,148,0.1)',
  tealBorder:  'rgba(45,180,148,0.25)',
  border:      'rgba(255,180,120,0.1)',
  borderHov:   'rgba(255,180,120,0.22)',
};

// ─── NAV ─────────────────────────────────────────────────────────────────────
function Nav({ active }) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);

  const links = [
    { id:'home',     label:'Home' },
    { id:'about',    label:'About & Experience' },
    { id:'projects', label:'Projects' },
    { id:'contact',  label:'Contact' },
  ];

  return (
    <nav style={{
      position:'fixed', top:0, left:0, right:0, zIndex:100,
      padding: scrolled ? '12px 40px' : '20px 40px',
      display:'flex', alignItems:'center', justifyContent:'space-between',
      background: scrolled ? 'rgba(42,21,16,0.96)' : 'transparent',
      backdropFilter: scrolled ? 'blur(16px)' : 'none',
      borderBottom: scrolled ? `1px solid ${C.border}` : 'none',
      transition:'all 0.4s ease',
    }}>
      <span style={{ fontFamily:"'Playfair Display',serif", fontSize:20, color:C.cream, letterSpacing:1 }}>EG</span>
      <div style={{ display:'flex', gap:32 }}>
        {links.map(l => (
          <a key={l.id} href={`#${l.id}`} style={{
            color: active === l.id ? C.teal : C.tan,
            fontSize:13, letterSpacing:'0.08em', textTransform:'uppercase',
            textDecoration:'none', fontFamily:"'DM Sans',sans-serif",
            transition:'color 0.2s',
            borderBottom: active === l.id ? `1px solid ${C.teal}` : '1px solid transparent',
            paddingBottom:2,
          }}>{l.label}</a>
        ))}
      </div>
    </nav>
  );
}

// ─── PROGRESS BAR ────────────────────────────────────────────────────────────
function ProgressBar() {
  const [pct, setPct] = useState(0);
  useEffect(() => {
    const fn = () => {
      const tot = document.documentElement.scrollHeight - window.innerHeight;
      setPct((window.pageYOffset / tot) * 100);
    };
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);
  return (
    <div style={{ position:'fixed',top:0,left:0,right:0,height:2,zIndex:200,background:'rgba(255,255,255,0.04)' }}>
      <div style={{ height:'100%',width:`${pct}%`,background:`linear-gradient(90deg,${C.teal},#a8e8d8)`,transition:'width 0.1s' }}/>
    </div>
  );
}

// ─── WEB MODAL ───────────────────────────────────────────────────────────────
function WebModal({ open, onClose }) {
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);
  if (!open) return null;
  return (
    <div style={{ position:'fixed',inset:0,background:'rgba(0,0,0,0.65)',backdropFilter:'blur(8px)',zIndex:300,display:'flex',alignItems:'center',justifyContent:'center',padding:20 }}>
      <div style={{ background:C.bgMid,borderRadius:16,maxWidth:900,width:'100%',maxHeight:'90vh',overflowY:'auto',border:`1px solid ${C.border}` }}>
        <div style={{ position:'sticky',top:0,background:C.bgMid,padding:'20px 28px',borderBottom:`1px solid ${C.border}`,display:'flex',justifyContent:'space-between',alignItems:'center' }}>
          <h3 style={{ fontFamily:"'Playfair Display',serif",color:C.cream,fontSize:22,margin:0 }}>Web Development Projects</h3>
          <button onClick={onClose} style={{ background:C.bgCard,border:`1px solid ${C.border}`,borderRadius:8,padding:'8px 10px',cursor:'pointer',color:C.tan }}><X size={20}/></button>
        </div>
        <div style={{ padding:28,display:'grid',gap:24 }}>
          {webProjects.map((p,i) => (
            <div key={i} style={{ borderRadius:12,overflow:'hidden',border:`1px solid ${C.border}`,background:C.bgCard }}>
              <div style={{ position:'relative',aspectRatio:'16/7' }}>
                <img src={p.image} alt={p.title} style={{ width:'100%',height:'100%',objectFit:'cover' }}/>
                <div style={{ position:'absolute',inset:0,background:'linear-gradient(to top,rgba(0,0,0,0.75),transparent)',display:'flex',alignItems:'flex-end',padding:20 }}>
                  <div>
                    <h4 style={{ fontFamily:"'Playfair Display',serif",color:'#fff',marginBottom:6,fontSize:18 }}>{p.title}</h4>
                    <p style={{ color:'rgba(255,255,255,0.7)',fontSize:13,margin:0 }}>{p.description}</p>
                  </div>
                </div>
              </div>
              <div style={{ padding:'16px 20px',display:'flex',justifyContent:'space-between',alignItems:'center',flexWrap:'wrap',gap:12 }}>
                <div style={{ display:'flex',flexWrap:'wrap',gap:8 }}>
                  {p.technologies.map((t,j) => (
                    <span key={j} style={{ padding:'4px 12px',background:C.tealSoft,border:`1px solid ${C.tealBorder}`,borderRadius:20,color:C.teal,fontSize:12,fontFamily:"'DM Sans',sans-serif" }}>{t}</span>
                  ))}
                </div>
                <a href={p.link} target="_blank" rel="noopener noreferrer" style={{ display:'flex',alignItems:'center',gap:6,color:C.teal,fontSize:13,textDecoration:'none',fontFamily:"'DM Sans',sans-serif" }}>
                  Visit Website <ExternalLink size={14}/>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── HERO ─────────────────────────────────────────────────────────────────────
function Hero() {
  return (
    <section id="home" style={{ minHeight:'100vh',position:'relative',display:'flex',alignItems:'center',justifyContent:'center',overflow:'hidden' }}>
      {/* Brown background with warm texture */}
      <div style={{ position:'absolute',inset:0,background:C.bg }}/>
      {/* Teal glow — far corner only, very subtle */}
      <div style={{ position:'absolute',top:'-15%',right:'-8%',width:560,height:560,borderRadius:'50%',background:'radial-gradient(circle,rgba(45,180,148,0.09) 0%,transparent 70%)',zIndex:1,pointerEvents:'none' }}/>
      {/* Warm amber glow bottom left */}
      <div style={{ position:'absolute',bottom:'-10%',left:'-5%',width:500,height:500,borderRadius:'50%',background:'radial-gradient(circle,rgba(160,80,40,0.22) 0%,transparent 70%)',zIndex:1,pointerEvents:'none' }}/>
      {/* Warm grid */}
      <div style={{ position:'absolute',inset:0,zIndex:1,backgroundImage:'linear-gradient(rgba(200,120,60,0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(200,120,60,0.03) 1px,transparent 1px)',backgroundSize:'72px 72px',pointerEvents:'none' }}/>
      <video autoPlay muted loop playsInline style={{ position:'absolute',inset:0,width:'100%',height:'100%',objectFit:'cover',opacity:0.09,zIndex:2 }}>
        <source src="/background.mp4" type="video/mp4"/>
      </video>
      <div style={{ position:'absolute',inset:0,background:'rgba(42,21,16,0.5)',zIndex:3 }}/>

      <div style={{ position:'relative',zIndex:10,maxWidth:1100,margin:'0 auto',padding:'0 40px',textAlign:'center' }}>
        {/* Badge */}
        <div style={{ display:'inline-flex',alignItems:'center',gap:8,padding:'8px 20px',borderRadius:40,border:`1px solid ${C.borderHov}`,background:'rgba(200,120,60,0.1)',backdropFilter:'blur(8px)',marginBottom:32 }}>
          <div style={{ width:7,height:7,borderRadius:'50%',background:C.teal,boxShadow:`0 0 8px ${C.teal}`,animation:'pulse 2s infinite' }}/>
          <span style={{ color:C.cream,fontSize:12,letterSpacing:'0.15em',textTransform:'uppercase',fontFamily:"'DM Sans',sans-serif" }}>Founder of Safibase</span>
        </div>

        {/* Heading */}
        <h1 style={{ fontFamily:"'Playfair Display',serif",fontSize:'clamp(42px,7vw,80px)',lineHeight:1.1,color:C.cream,marginBottom:24,letterSpacing:'-0.02em' }}>
          Build systems that help businesses
          <span style={{ display:'block',background:`linear-gradient(135deg,${C.teal} 20%,#a8e8d8)`,WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent' }}>
            grow without chaos.
          </span>
        </h1>

        {/* Sub */}
        <p style={{ color:C.tan,fontSize:'clamp(16px,2vw,20px)',maxWidth:680,margin:'0 auto 40px',lineHeight:1.75,fontFamily:"'DM Sans',sans-serif" }}>
          I design modern CRM systems, automations, dashboards, and websites for
          service businesses — helping founders save time, organize operations,
          and scale with clarity.
        </p>

        {/* CTAs */}
        <div style={{ display:'flex',gap:16,justifyContent:'center',flexWrap:'wrap',marginBottom:48 }}>
          <a href="#projects" style={{ padding:'14px 32px',borderRadius:12,background:C.teal,color:'#fff',fontWeight:600,textDecoration:'none',fontSize:15,fontFamily:"'DM Sans',sans-serif",display:'inline-flex',alignItems:'center',gap:8 }}>
            View My Work <ArrowRight size={16}/>
          </a>
          <a href="#contact" style={{ padding:'14px 32px',borderRadius:12,border:`1px solid ${C.borderHov}`,background:'rgba(200,120,60,0.1)',color:C.cream,fontWeight:500,textDecoration:'none',fontSize:15,fontFamily:"'DM Sans',sans-serif",backdropFilter:'blur(8px)' }}>
            Book a Discovery Call
          </a>
        </div>

        {/* Tool pills */}
        <div style={{ display:'flex',flexWrap:'wrap',justifyContent:'center',gap:10,marginBottom:52 }}>
          {['Airtable','Make','Supabase','Lovable','GitHub','Automation','CRM Systems','Dashboards'].map(t => (
            <span key={t} style={{ padding:'6px 16px',borderRadius:20,background:'rgba(200,120,60,0.08)',border:`1px solid ${C.border}`,color:C.tan,fontSize:13,fontFamily:"'DM Sans',sans-serif" }}>{t}</span>
          ))}
        </div>

        {/* Stats */}
        <div style={{ display:'inline-flex',justifyContent:'center',gap:48,flexWrap:'wrap',padding:'24px 40px',borderRadius:16,background:'rgba(200,100,40,0.07)',border:`1px solid ${C.border}`,backdropFilter:'blur(10px)',marginBottom:48 }}>
          {[
            { val:'4+',  label:'Years of Experience' },
            { val:'10+', label:'Clients & Projects' },
            { val:'5+',  label:'Systems Shipped' },
          ].map(s => (
            <div key={s.label} style={{ textAlign:'center' }}>
              <div style={{ fontFamily:"'Playfair Display',serif",fontSize:32,color:C.teal,lineHeight:1 }}>{s.val}</div>
              <div style={{ color:C.dim,fontSize:12,marginTop:6,letterSpacing:'0.06em',textTransform:'uppercase',fontFamily:"'DM Sans',sans-serif" }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Socials */}
        <div style={{ display:'flex',justifyContent:'center',gap:14 }}>
          {[
            { href:'https://github.com/EGichuhi',               icon:<Github   size={18}/> },
            { href:'https://www.linkedin.com/in/eunicegichuhi/', icon:<Linkedin size={18}/> },
            { href:'mailto:eunice.gwanja@gmail.com',             icon:<Mail     size={18}/> },
          ].map((s,i) => (
            <a key={i} href={s.href} target="_blank" rel="noopener noreferrer"
              style={{ width:44,height:44,borderRadius:12,display:'flex',alignItems:'center',justifyContent:'center',background:'rgba(200,120,60,0.1)',border:`1px solid ${C.border}`,color:C.tan,textDecoration:'none',transition:'all 0.2s' }}
              onMouseEnter={e=>{ e.currentTarget.style.borderColor=C.teal; e.currentTarget.style.color=C.teal; }}
              onMouseLeave={e=>{ e.currentTarget.style.borderColor=C.border; e.currentTarget.style.color=C.tan; }}
            >{s.icon}</a>
          ))}
        </div>
      </div>

      {/* Scroll arrow */}
      <a href="#about" style={{ position:'absolute',bottom:32,left:'50%',transform:'translateX(-50%)',zIndex:10,display:'flex',flexDirection:'column',alignItems:'center',gap:6,textDecoration:'none',color:C.dim }}>
        <span style={{ fontSize:11,letterSpacing:'0.12em',textTransform:'uppercase',fontFamily:"'DM Sans',sans-serif" }}>Scroll</span>
        <div style={{ width:28,height:28,borderRadius:'50%',background:'rgba(200,120,60,0.1)',border:`1px solid ${C.border}`,display:'flex',alignItems:'center',justifyContent:'center',animation:'bounce 2s infinite' }}>
          <ChevronDown size={16} color={C.tan}/>
        </div>
      </a>
    </section>
  );
}

// ─── ABOUT + EXPERIENCE ───────────────────────────────────────────────────────
function AboutExperience() {
  return (
    <section id="about" style={{ background:C.bgMid,padding:'100px 0' }}>
      <div style={{ maxWidth:1100,margin:'0 auto',padding:'0 40px' }}>

        {/* About header */}
        <div style={{ display:'flex',alignItems:'center',gap:16,marginBottom:64 }}>
          <div style={{ width:40,height:40,borderRadius:10,background:C.tealSoft,border:`1px solid ${C.tealBorder}`,display:'flex',alignItems:'center',justifyContent:'center' }}>
            <User size={18} color={C.teal}/>
          </div>
          <div>
            <p style={{ color:C.teal,fontSize:12,letterSpacing:'0.15em',textTransform:'uppercase',margin:'0 0 2px',fontFamily:"'DM Sans',sans-serif" }}>Portfolio</p>
            <h2 style={{ fontFamily:"'Playfair Display',serif",fontSize:36,color:C.cream,margin:0 }}>About Me</h2>
          </div>
        </div>

        {/* About grid */}
        <div style={{ display:'grid',gridTemplateColumns:'1fr 2fr',gap:60,marginBottom:100,alignItems:'start' }}>
          {/* Left — photo + info */}
          <div>
            <div style={{ position:'relative',display:'inline-block',width:'100%',maxWidth:280 }}>
              <img src="/portme.png" alt="Eunice Gichuhi" style={{ width:'100%',borderRadius:16,objectFit:'cover',aspectRatio:'3/4',display:'block' }}/>
              <div style={{ position:'absolute',inset:0,borderRadius:16,border:`2px solid ${C.teal}`,transform:'translate(8px,8px)',zIndex:-1,opacity:0.35 }}/>
            </div>
            <div style={{ marginTop:24,padding:20,borderRadius:12,background:C.bgCard,border:`1px solid ${C.border}` }}>
              {[
                { icon:<MapPin    size={14}/>, text:'Toronto, Ontario' },
                { icon:<Briefcase size={14}/>, text:'Founder, Safibase' },
              ].map((item,i) => (
                <div key={i} style={{ display:'flex',alignItems:'center',gap:10,color:C.tan,fontSize:13,fontFamily:"'DM Sans',sans-serif",marginBottom: i===0 ? 12 : 0 }}>
                  <span style={{ color:C.teal }}>{item.icon}</span>{item.text}
                </div>
              ))}
            </div>
          </div>

          {/* Right — bio */}
          <div>
            <p style={{ color:C.tan,fontSize:17,lineHeight:1.85,marginBottom:20,fontFamily:"'DM Sans',sans-serif" }}>
              I'm a business systems designer and founder of Safibase, where I help service businesses replace scattered spreadsheets and manual workflows with clean, scalable operations. My work sits at the intersection of technology and strategy — I build the infrastructure that lets founders focus on growth instead of firefighting.
            </p>
            <p style={{ color:C.dim,fontSize:16,lineHeight:1.85,marginBottom:20,fontFamily:"'DM Sans',sans-serif" }}>
              I've designed and deployed CRM systems, automated client pipelines, built custom dashboards, and launched business websites for companies across multiple industries. My background in data engineering and systems integration means the solutions I build are reliable, well-structured, and built to last.
            </p>
            <p style={{ color:C.dim,fontSize:16,lineHeight:1.85,fontFamily:"'DM Sans',sans-serif" }}>
              I believe the best systems are invisible — they work quietly in the background so your team doesn't have to think about them. If your operations feel like chaos, I'd love to help you fix that.
            </p>
            {/* Skills */}
            <div style={{ marginTop:32,display:'flex',flexWrap:'wrap',gap:10 }}>
              {['Airtable','Make.com','Supabase','CRM Design','Automation','Dashboards','Python','SQL','Lovable','GitHub','Workflow Design','Data Analysis'].map(s => (
                <span key={s} style={{ padding:'6px 14px',borderRadius:8,background:C.bgCard,border:`1px solid ${C.border}`,color:C.tan,fontSize:13,fontFamily:"'DM Sans',sans-serif" }}>{s}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Experience header */}
        <div style={{ display:'flex',alignItems:'center',gap:16,marginBottom:48 }}>
          <div style={{ width:40,height:40,borderRadius:10,background:C.tealSoft,border:`1px solid ${C.tealBorder}`,display:'flex',alignItems:'center',justifyContent:'center' }}>
            <Briefcase size={18} color={C.teal}/>
          </div>
          <div>
            <p style={{ color:C.teal,fontSize:12,letterSpacing:'0.15em',textTransform:'uppercase',margin:'0 0 2px',fontFamily:"'DM Sans',sans-serif" }}>Career</p>
            <h2 style={{ fontFamily:"'Playfair Display',serif",fontSize:36,color:C.cream,margin:0 }}>Work Experience</h2>
          </div>
        </div>

        {/* Timeline */}
        <div style={{ position:'relative' }}>
          <div style={{ position:'absolute',left:20,top:0,bottom:0,width:2,background:`linear-gradient(to bottom,${C.teal},rgba(45,180,148,0.03))`,borderRadius:2 }}/>
          <div style={{ display:'flex',flexDirection:'column',gap:0 }}>
            {experiences.map((exp,i) => (
              <div key={i} style={{ paddingLeft:60,paddingBottom: i < experiences.length-1 ? 48 : 0,position:'relative' }}>
                <div style={{ position:'absolute',left:12,top:4,width:18,height:18,borderRadius:'50%',background:C.teal,border:`3px solid ${C.bgMid}`,boxShadow:`0 0 12px rgba(45,180,148,0.35)`,zIndex:1 }}/>
                <div style={{ background:C.bgCard,border:`1px solid ${C.border}`,borderRadius:14,padding:'28px 32px',transition:'border-color 0.2s' }}
                  onMouseEnter={e=>e.currentTarget.style.borderColor=C.borderHov}
                  onMouseLeave={e=>e.currentTarget.style.borderColor=C.border}
                >
                  <div style={{ display:'flex',flexWrap:'wrap',justifyContent:'space-between',alignItems:'flex-start',gap:12,marginBottom:8 }}>
                    <div>
                      <h3 style={{ fontFamily:"'Playfair Display',serif",color:C.cream,fontSize:20,margin:'0 0 4px' }}>{exp.role}</h3>
                      <p style={{ color:C.teal,fontSize:14,margin:0,fontFamily:"'DM Sans',sans-serif" }}>{exp.company}</p>
                    </div>
                    <div style={{ display:'flex',alignItems:'center',gap:6,padding:'6px 14px',borderRadius:20,background:C.bgRaised,border:`1px solid ${C.border}` }}>
                      <Calendar size={12} color={C.dim}/>
                      <span style={{ color:C.dim,fontSize:12,fontFamily:"'DM Sans',sans-serif",letterSpacing:'0.05em' }}>{exp.date}</span>
                    </div>
                  </div>
                  <ul style={{ margin:'16px 0 0',padding:'0 0 0 18px',display:'flex',flexDirection:'column',gap:8 }}>
                    {exp.bullets.map((b,j) => (
                      <li key={j} style={{ color:C.dim,fontSize:14,lineHeight:1.75,fontFamily:"'DM Sans',sans-serif" }}>{b}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── PROJECTS ─────────────────────────────────────────────────────────────────
function Projects({ onWebClick }) {
  return (
    <section id="projects" style={{ background:C.bg,padding:'100px 0' }}>
      <div style={{ maxWidth:1100,margin:'0 auto',padding:'0 40px' }}>
        <div style={{ display:'flex',alignItems:'center',gap:16,marginBottom:60 }}>
          <div style={{ width:40,height:40,borderRadius:10,background:C.tealSoft,border:`1px solid ${C.tealBorder}`,display:'flex',alignItems:'center',justifyContent:'center' }}>
            <Code2 size={18} color={C.teal}/>
          </div>
          <div>
            <p style={{ color:C.teal,fontSize:12,letterSpacing:'0.15em',textTransform:'uppercase',margin:'0 0 2px',fontFamily:"'DM Sans',sans-serif" }}>Work</p>
            <h2 style={{ fontFamily:"'Playfair Display',serif",fontSize:36,color:C.cream,margin:0 }}>Projects & Systems</h2>
          </div>
        </div>

        <div style={{ display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(280px,1fr))',gap:24 }}>
          {projects.map((p,i) => (
            <div key={i}
              onClick={() => p.title === 'Web Development Portfolio' && onWebClick()}
              style={{ borderRadius:16,overflow:'hidden',border:`1px solid ${C.border}`,background:C.bgCard,cursor: p.title==='Web Development Portfolio' ? 'pointer' : 'default',transition:'all 0.25s' }}
              onMouseEnter={e=>{ e.currentTarget.style.borderColor=C.borderHov; e.currentTarget.style.transform='translateY(-4px)'; }}
              onMouseLeave={e=>{ e.currentTarget.style.borderColor=C.border;    e.currentTarget.style.transform='translateY(0)'; }}
            >
              <div style={{ position:'relative',aspectRatio:'16/9',overflow:'hidden' }}>
                <img src={p.image} alt={p.title} style={{ width:'100%',height:'100%',objectFit:'cover',transition:'transform 0.5s' }}
                  onMouseEnter={e=>e.target.style.transform='scale(1.06)'}
                  onMouseLeave={e=>e.target.style.transform='scale(1)'}
                />
                <div style={{ position:'absolute',inset:0,background:'linear-gradient(to top,rgba(42,21,16,0.88) 0%,transparent 60%)' }}/>
              </div>
              <div style={{ padding:'20px 22px' }}>
                <h3 style={{ fontFamily:"'Playfair Display',serif",color:C.cream,fontSize:18,marginBottom:8 }}>{p.title}</h3>
                <p style={{ color:C.dim,fontSize:13,lineHeight:1.65,marginBottom:16,fontFamily:"'DM Sans',sans-serif" }}>{p.description}</p>
                <div style={{ display:'flex',justifyContent:'space-between',alignItems:'center',flexWrap:'wrap',gap:10 }}>
                  <div style={{ display:'flex',flexWrap:'wrap',gap:6 }}>
                    {p.technologies.slice(0,3).map((t,j) => (
                      <span key={j} style={{ padding:'3px 10px',borderRadius:20,background:C.tealSoft,border:`1px solid ${C.tealBorder}`,color:C.teal,fontSize:11,fontFamily:"'DM Sans',sans-serif" }}>{t}</span>
                    ))}
                  </div>
                  {p.title !== 'Web Development Portfolio' && (
                    <a href={p.link} target="_blank" rel="noopener noreferrer" style={{ color:C.tan,textDecoration:'none' }}>
                      <ExternalLink size={16}/>
                    </a>
                  )}
                  {p.title === 'Web Development Portfolio' && (
                    <span style={{ fontSize:11,color:C.teal,fontFamily:"'DM Sans',sans-serif",display:'flex',alignItems:'center',gap:4 }}>View all <ArrowRight size={11}/></span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── CONTACT ──────────────────────────────────────────────────────────────────
// 🔧 Replace YOUR_FORMSPREE_ID with the ID from formspree.io (e.g. "abcd1234")
const FORMSPREE_ID = 'YOUR_FORMSPREE_ID';
// 🔧 Replace YOUR_CALENDLY_URL with your full Calendly link
const CALENDLY_URL = 'YOUR_CALENDLY_URL';

function Contact() {
  const [form,   setForm]   = useState({ name:'',email:'',phone:'',source:'',message:'' });
  const [status, setStatus] = useState('idle');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('submitting');
    try {
      const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method:'POST',
        headers:{ 'Content-Type':'application/json', 'Accept':'application/json' },
        body: JSON.stringify({
          _subject: 'New Message from Portfolio',
          name:    form.name,
          email:   form.email,
          phone:   form.phone   || 'Not provided',
          source:  form.source  || 'Not specified',
          message: form.message,
        }),
      });
      setStatus(res.ok ? 'sent' : 'error');
    } catch { setStatus('error'); }
  };

  const inputStyle = {
    width:'100%', borderRadius:10, border:`1px solid ${C.border}`,
    background:C.bgCard, padding:'13px 16px', color:C.cream,
    fontSize:14, fontFamily:"'DM Sans',sans-serif", outline:'none',
    boxSizing:'border-box', transition:'border-color 0.2s',
  };
  const labelStyle = {
    display:'block', color:C.dim, fontSize:12,
    letterSpacing:'0.08em', textTransform:'uppercase',
    marginBottom:8, fontFamily:"'DM Sans',sans-serif",
  };

  return (
    <section id="contact" style={{ background:C.bgMid,padding:'100px 0',position:'relative',overflow:'hidden' }}>
      <div style={{ position:'absolute',top:-200,right:-200,width:600,height:600,borderRadius:'50%',background:'radial-gradient(circle,rgba(45,180,148,0.06) 0%,transparent 70%)',pointerEvents:'none' }}/>
      <div style={{ position:'absolute',bottom:-150,left:-100,width:400,height:400,borderRadius:'50%',background:'radial-gradient(circle,rgba(160,80,40,0.2) 0%,transparent 70%)',pointerEvents:'none' }}/>

      <div style={{ maxWidth:1100,margin:'0 auto',padding:'0 40px',position:'relative',zIndex:1 }}>
        <div style={{ display:'flex',alignItems:'center',gap:16,marginBottom:16 }}>
          <div style={{ width:40,height:40,borderRadius:10,background:C.tealSoft,border:`1px solid ${C.tealBorder}`,display:'flex',alignItems:'center',justifyContent:'center' }}>
            <Send size={18} color={C.teal}/>
          </div>
          <div>
            <p style={{ color:C.teal,fontSize:12,letterSpacing:'0.15em',textTransform:'uppercase',margin:'0 0 2px',fontFamily:"'DM Sans',sans-serif" }}>Let's Connect</p>
            <h2 style={{ fontFamily:"'Playfair Display',serif",fontSize:36,color:C.cream,margin:0 }}>Get in Touch</h2>
          </div>
        </div>
        <p style={{ color:C.dim,fontSize:16,marginBottom:56,fontFamily:"'DM Sans',sans-serif",maxWidth:500 }}>
          Ready to bring structure to your business? Let's talk about what a better system could look like for you.
        </p>

        <div style={{ display:'grid',gridTemplateColumns:'1fr 1.4fr',gap:48,alignItems:'start' }}>

          {/* Left — Calendly */}
          <div>
            <div style={{ marginBottom:16 }}>
              <p style={{ color:C.dim,fontSize:12,letterSpacing:'0.12em',textTransform:'uppercase',margin:'0 0 8px',fontFamily:"'DM Sans',sans-serif" }}>Book a time directly</p>
              <h3 style={{ fontFamily:"'Playfair Display',serif",color:C.cream,fontSize:22,margin:0 }}>Discovery Call</h3>
            </div>
            <div style={{ borderRadius:16,overflow:'hidden',border:`1px solid ${C.border}`,background:C.bgCard }}>
              <div
                className="calendly-inline-widget"
                data-url={`${CALENDLY_URL}?hide_event_type_details=1&hide_gdpr_banner=1&background_color=3e2018&text_color=f0e0c8&primary_color=2db494`}
                style={{ minWidth:280,height:660 }}
              />
              <script type="text/javascript" src="https://assets.calendly.com/assets/external/widget.js" async/>
            </div>
          </div>

          {/* Right — Form */}
          <div style={{ background:C.bgCard,border:`1px solid ${C.border}`,borderRadius:20,padding:36 }}>
            {status === 'sent' ? (
              <div style={{ textAlign:'center',padding:'40px 0' }}>
                <div style={{ width:64,height:64,borderRadius:'50%',background:C.tealSoft,border:`2px solid ${C.teal}`,display:'flex',alignItems:'center',justifyContent:'center',margin:'0 auto 20px' }}>
                  <Send size={24} color={C.teal}/>
                </div>
                <h3 style={{ fontFamily:"'Playfair Display',serif",color:C.cream,fontSize:24,marginBottom:10 }}>Message Sent!</h3>
                <p style={{ color:C.dim,fontFamily:"'DM Sans',sans-serif" }}>I'll get back to you as soon as possible.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display:'flex',flexDirection:'column',gap:20 }}>
                <h3 style={{ fontFamily:"'Playfair Display',serif",color:C.cream,fontSize:22,margin:'0 0 4px' }}>Send a Message</h3>

                {[
                  { id:'name',  label:'Full Name',        type:'text',  placeholder:'Your full name',    required:true  },
                  { id:'email', label:'Email Address',    type:'email', placeholder:'your@email.com',    required:true  },
                  { id:'phone', label:'Phone (Optional)', type:'tel',   placeholder:'+1 (416) 000-0000', required:false },
                ].map(f => (
                  <div key={f.id}>
                    <label style={labelStyle}>{f.label}{f.required && <span style={{ color:C.teal }}> *</span>}</label>
                    <input type={f.type} placeholder={f.placeholder} required={f.required}
                      value={form[f.id]} onChange={e=>setForm({...form,[f.id]:e.target.value})}
                      style={inputStyle}
                      onFocus={e=>e.target.style.borderColor=C.teal}
                      onBlur={e=>e.target.style.borderColor=C.border}
                    />
                  </div>
                ))}

                <div>
                  <label style={labelStyle}>How did you find me?</label>
                  <select value={form.source} onChange={e=>setForm({...form,source:e.target.value})}
                    style={{ ...inputStyle,background:C.bgRaised }}>
                    <option value="">Select an option…</option>
                    {['LinkedIn','GitHub','Referral','Google Search','Social Media','Other'].map(o => (
                      <option key={o} value={o}>{o}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label style={labelStyle}>Message<span style={{ color:C.teal }}> *</span></label>
                  <textarea required rows={4}
                    placeholder="Tell me about your business and what you're looking to improve…"
                    value={form.message} onChange={e=>setForm({...form,message:e.target.value})}
                    style={{ ...inputStyle,resize:'vertical' }}
                    onFocus={e=>e.target.style.borderColor=C.teal}
                    onBlur={e=>e.target.style.borderColor=C.border}
                  />
                </div>

                {status === 'error' && (
                  <p style={{ color:'#f87171',fontSize:13,fontFamily:"'DM Sans',sans-serif",background:'rgba(248,113,113,0.07)',border:'1px solid rgba(248,113,113,0.2)',borderRadius:8,padding:'10px 14px',margin:0 }}>
                    Something went wrong. Please try again or reach out directly.
                  </p>
                )}

                <button type="submit" disabled={status==='submitting'}
                  style={{ padding:14,borderRadius:12,background: status==='submitting' ? C.bgRaised : C.teal,color: status==='submitting' ? C.dim : '#fff',fontWeight:600,fontSize:15,fontFamily:"'DM Sans',sans-serif",border:'none',cursor: status==='submitting' ? 'not-allowed' : 'pointer',display:'flex',alignItems:'center',justifyContent:'center',gap:8,transition:'all 0.2s' }}>
                  {status === 'submitting' ? 'Sending…' : <> Send Message <Send size={16}/> </>}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── FOOTER ───────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer style={{ background:C.bg,borderTop:`1px solid ${C.border}`,padding:'32px 40px',display:'flex',justifyContent:'space-between',alignItems:'center',flexWrap:'wrap',gap:16 }}>
      <span style={{ fontFamily:"'Playfair Display',serif",fontSize:18,color:C.cream }}>EG</span>
      <p style={{ color:C.dim,fontSize:13,fontFamily:"'DM Sans',sans-serif",margin:0 }}>
        © {new Date().getFullYear()} Eunice Gichuhi · All rights reserved.
      </p>
      <div style={{ display:'flex',gap:12 }}>
        {[
          { href:'https://github.com/EGichuhi',               icon:<Github   size={16}/> },
          { href:'https://www.linkedin.com/in/eunicegichuhi/', icon:<Linkedin size={16}/> },
          { href:'mailto:eunice.gwanja@gmail.com',             icon:<Mail     size={16}/> },
        ].map((s,i) => (
          <a key={i} href={s.href} target="_blank" rel="noopener noreferrer"
            style={{ width:36,height:36,borderRadius:8,display:'flex',alignItems:'center',justifyContent:'center',background:C.bgCard,border:`1px solid ${C.border}`,color:C.dim,textDecoration:'none',transition:'all 0.2s' }}
            onMouseEnter={e=>{ e.currentTarget.style.color=C.teal; e.currentTarget.style.borderColor=C.tealBorder; }}
            onMouseLeave={e=>{ e.currentTarget.style.color=C.dim;  e.currentTarget.style.borderColor=C.border; }}
          >{s.icon}</a>
        ))}
      </div>
    </footer>
  );
}

// ─── APP ──────────────────────────────────────────────────────────────────────
function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [showWebModal,  setShowWebModal]  = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) setActiveSection(e.target.id); }),
      { threshold:0.4 }
    );
    ['home','about','projects','contact'].forEach(id => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&family=DM+Sans:wght@300;400;500;600&display=swap');
        * { box-sizing:border-box; margin:0; padding:0; }
        html { scroll-behavior:smooth; }
        body { background:${C.bg}; }
        @keyframes pulse  { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.5;transform:scale(0.8)} }
        @keyframes bounce { 0%,100%{transform:translateY(0)} 50%{transform:translateY(6px)} }
        ::-webkit-scrollbar       { width:5px; }
        ::-webkit-scrollbar-track { background:${C.bg}; }
        ::-webkit-scrollbar-thumb { background:${C.bgRaised}; border-radius:3px; }
        input::placeholder, textarea::placeholder { color:${C.dim} !important; }
        select option { background:${C.bgRaised}; color:${C.cream}; }
      `}</style>
      <ProgressBar/>
      <Nav active={activeSection}/>
      <Hero/>
      <AboutExperience/>
      <Projects onWebClick={() => setShowWebModal(true)}/>
      <Contact/>
      <Footer/>
      <WebModal open={showWebModal} onClose={() => setShowWebModal(false)}/>
    </>
  );
}

// ─── DATA ─────────────────────────────────────────────────────────────────────
const experiences = [
  {
    role:    'Founder & Systems Designer',
    company: 'Safibase · Toronto, ON',
    date:    '2024 – Present',
    bullets: [
      'Founded Safibase to help service businesses replace manual workflows with clean, scalable systems built on Airtable, Make, and Supabase.',
      'Designed and deployed CRM pipelines, client onboarding automations, and operational dashboards for businesses across multiple industries.',
      'Built and launched client-facing websites integrated with back-end systems, reducing admin overhead and improving client communication.',
      'Developed repeatable system templates that cut setup time for new clients and ensured consistent, reliable outcomes.',
    ],
  },
  {
    role:    'B2B IT Intern',
    company: 'Philip Morris International · Toronto, ON (Hybrid)',
    date:    'APR 2025 – AUG 2025',
    bullets: [
      'Validated structured data pipelines to ensure accurate synchronization between ERP systems (SAP) and partner-facing digital tools.',
      'Assisted in development and testing of new internal tool features (JIRA, Confluence), improving usability and functionality.',
      'Collaborated with cross-functional teams to gather requirements and deliver technical support for multiple projects.',
      'Gained hands-on experience with data integration and cloud technologies through Qualtrics-based workflows.',
    ],
  },
  {
    role:    'Operations Engineer & Technology Intern',
    company: 'Second Bind · Toronto, ON',
    date:    'JAN 2025 – APR 2025',
    bullets: [
      'Implemented AI automations to eliminate repetitive tasks and streamline end-to-end operational workflows.',
      'Identified process bottlenecks and deployed targeted solutions that measurably reduced operational delays.',
      'Increased throughput through strategic process redesign and technology-driven improvements.',
      'Collaborated with cross-functional teams to maintain and iterate on operational systems over time.',
    ],
  },
  {
    role:    'Data Analyst',
    company: 'Telus International · Vancouver, BC (Remote)',
    date:    'JAN 2024 – JUNE 2024',
    bullets: [
      'Conducted detailed reviews of AI-generated responses with 98% accuracy in protocol adherence.',
      'Improved reliability of user-facing outputs by identifying and resolving AI inconsistencies.',
      'Upskilled in SQL, database querying, and Jupyter Notebooks to support data-driven analysis.',
    ],
  },
  {
    role:    'Data Engineering Intern',
    company: 'AmLive · Toronto, ON (Hybrid)',
    date:    'JAN 2023 – APR 2023',
    bullets: [
      'Applied Python libraries for data analysis and visualization across 5 projects.',
      'Designed a data processing pipeline using MongoDB to streamline storage and retrieval workflows.',
      'Built an ETL process to aggregate music streaming data using SQL and Python.',
    ],
  },
];

const webProjects = [
  {
    title:        'Kalog Drywall',
    description:  'Professional website for a drywall company featuring modern design and responsive layout.',
    image:        'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&q=80',
    technologies: ['HTML','CSS','JavaScript','Responsive Design'],
    link:         'http://www.kalogadrywall.com',
  },
  {
    title:        'Tech Blog Platform',
    description:  'Dynamic blog platform for sharing technical content and tutorials.',
    image:        'https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?auto=format&fit=crop&q=80',
    technologies: ['React','Node.js','MongoDB','Express'],
    link:         '#',
  },
  {
    title:        'E-commerce Store',
    description:  'Full-featured online store with product catalog and secure checkout.',
    image:        'https://images.unsplash.com/photo-1472851294608-062f824d29cc?auto=format&fit=crop&q=80',
    technologies: ['Next.js','Stripe','Tailwind CSS','PostgreSQL'],
    link:         '#',
  },
];

const projects = [
  {
    title:        'Smart Farming AI Initiative',
    description:  'Developing AI solutions for sustainable agriculture in Kano State, Nigeria.',
    image:        'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&q=80',
    technologies: ['Python','AI','Data Analytics','Machine Learning'],
    link:         'https://www.omdena.com/chapter-challenges/smart-farming-using-ai-for-sustainable-agriculture-in-kano-state-nigeria',
  },
  {
    title:        'Enhancing Public Transport Accessibility',
    description:  'Analysis of transport data to improve accessibility for people with disabilities in Nairobi.',
    image:        'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&q=80',
    technologies: ['Python','Git','Data Analytics'],
    link:         'https://www.omdena.com/chapter-challenges/enhancing-public-transport-accessibility-for-insivible-disabilities-in-nairobi',
  },
  {
    title:        'Customer Analysis & Product Insights',
    description:  'Advanced EDA project analyzing customer behavior and sales trends.',
    image:        'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80',
    technologies: ['Python','Jupyter','Data Visualization'],
    link:         'https://github.com/EGichuhi/Customer_data_analysis',
  },
  {
    title:        'Web Development Portfolio',
    description:  'Collection of professional websites and web applications built for service businesses.',
    image:        'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&q=80',
    technologies: ['React','Next.js','HTML/CSS','JavaScript'],
    link:         '#',
  },
];

export default App;
