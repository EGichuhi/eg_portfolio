import React, { useEffect, useState, useRef, useCallback } from 'react';
import {
  Github, Linkedin, Mail, ExternalLink, ChevronDown, X, ArrowRight,
  Briefcase, Code2, Send, MapPin, Calendar, ShoppingCart,
  Star, Plus, Minus, CheckCircle, Cpu, Layers,
  ChevronRight, BookOpen, Zap, BarChart2, Globe, Download
} from 'lucide-react';

// ─── BRIGHT WARM PALETTE ─────────────────────────────────────────────────────
// Base: warm cream/parchment. Accents: cognac brown + teal.
// Think premium editorial — not dark mode, not clinical white.
const C = {
  bg:          '#fdf6ee',   // warm parchment — main background
  bgAlt:       '#f5ead8',   // deeper warm cream — alternating sections
  bgCard:      '#ffffff',   // cards: pure white with warm shadows
  bgCardWarm:  '#fef9f3',   // slightly warm white for cards
  bgDeep:      '#3d1f0e',   // deep espresso — hero, footer, CTA bands
  bgDeepMid:   '#4e2a14',   // rich cognac — hero mid layer
  cream:       '#fdf6ee',   // text on dark backgrounds
  textDark:    '#2c1505',   // primary text on light bg
  textMid:     '#6b3a1f',   // secondary text — warm brown
  textDim:     '#a06040',   // muted text
  teal:        '#2db494',   // primary accent — buttons, highlights
  tealDark:    '#1e9478',   // hover state for teal
  tealSoft:    'rgba(45,180,148,0.12)',
  tealBorder:  'rgba(45,180,148,0.3)',
  cognac:      '#c4622d',   // warm accent — badges, decorative
  cognacSoft:  'rgba(196,98,45,0.1)',
  border:      'rgba(100,50,20,0.1)',
  borderMed:   'rgba(100,50,20,0.18)',
  shadow:      '0 4px 24px rgba(60,20,5,0.08)',
  shadowMd:    '0 8px 40px rgba(60,20,5,0.12)',
  shadowLg:    '0 20px 60px rgba(60,20,5,0.16)',
};

// ─── GLOBAL STYLES ────────────────────────────────────────────────────────────
const GS = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&family=DM+Sans:ital,wght@0,300;0,400;0,500;0,600;1,400&display=swap');
  *{box-sizing:border-box;margin:0;padding:0;}
  html{scroll-behavior:smooth;}
  body{background:${C.bg};color:${C.textDark};}

  @keyframes pulse{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.5;transform:scale(.85)}}
  @keyframes bounce{0%,100%{transform:translateY(0)}50%{transform:translateY(7px)}}
  @keyframes fadeUp{from{opacity:0;transform:translateY(32px)}to{opacity:1;transform:translateY(0)}}
  @keyframes fadeIn{from{opacity:0}to{opacity:1}}
  @keyframes slideLeft{from{opacity:0;transform:translateX(32px)}to{opacity:1;transform:translateX(0)}}
  @keyframes float{0%,100%{transform:translateY(0px)}50%{transform:translateY(-12px)}}
  @keyframes spinSlow{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
  @keyframes shimmer{0%{background-position:-200% 0}100%{background-position:200% 0}}
  @keyframes countUp{from{opacity:0;transform:scale(.8)}to{opacity:1;transform:scale(1)}}
  @keyframes drawLine{from{width:0}to{width:100%}}
  @keyframes gradMove{0%,100%{background-position:0% 50%}50%{background-position:100% 50%}}

  .fadeUp{animation:fadeUp .65s cubic-bezier(.22,1,.36,1) both;}
  .fadeIn{animation:fadeIn .5s ease both;}
  .float{animation:float 4s ease-in-out infinite;}

  ::-webkit-scrollbar{width:5px;}
  ::-webkit-scrollbar-track{background:${C.bg};}
  ::-webkit-scrollbar-thumb{background:${C.cognac};border-radius:3px;opacity:.5;}

  input,textarea,select{color:${C.textDark}!important;}
  input::placeholder,textarea::placeholder{color:${C.textDim}!important;}
  select option{background:#fff;color:${C.textDark};}

  .card-hover{transition:all .28s cubic-bezier(.22,1,.36,1);}
  .card-hover:hover{transform:translateY(-5px);box-shadow:${C.shadowLg};}

  .teal-btn{
    background:${C.teal};color:#fff;border:none;cursor:pointer;
    font-family:"DM Sans",sans-serif;font-weight:600;
    transition:all .22s ease;
    display:inline-flex;align-items:center;gap:8px;
  }
  .teal-btn:hover{background:${C.tealDark};transform:translateY(-1px);box-shadow:0 8px 24px rgba(45,180,148,0.35);}

  .ghost-btn{
    background:transparent;border:1.5px solid ${C.borderMed};cursor:pointer;
    font-family:"DM Sans",sans-serif;font-weight:500;color:${C.textMid};
    transition:all .22s ease;display:inline-flex;align-items:center;gap:8px;
  }
  .ghost-btn:hover{border-color:${C.teal};color:${C.teal};transform:translateY(-1px);}
`;

// ─── ANIMATED COUNTER ────────────────────────────────────────────────────────
function AnimCounter({ target, suffix = '', duration = 1800 }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !started.current) {
        started.current = true;
        const num = parseFloat(target);
        const steps = 50;
        const inc = num / steps;
        let cur = 0;
        const iv = setInterval(() => {
          cur += inc;
          if (cur >= num) { setCount(num); clearInterval(iv); }
          else setCount(Math.floor(cur * 10) / 10);
        }, duration / steps);
      }
    }, { threshold: 0.5 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [target, duration]);
  return <span ref={ref}>{count}{suffix}</span>;
}

// ─── FLOATING ORBS (decorative bg element) ───────────────────────────────────
function Orbs({ variant = 'light' }) {
  const orbs = variant === 'dark'
    ? [
        { w:500, h:500, top:'-15%', right:'-10%', bg:'rgba(45,180,148,0.12)' },
        { w:400, h:400, bottom:'-10%', left:'-8%', bg:'rgba(196,98,45,0.15)' },
        { w:300, h:300, top:'40%', left:'30%', bg:'rgba(45,180,148,0.06)' },
      ]
    : [
        { w:600, h:600, top:'-20%', right:'-15%', bg:'rgba(45,180,148,0.07)' },
        { w:400, h:400, bottom:'-5%', left:'-8%', bg:'rgba(196,98,45,0.08)' },
      ];
  return (
    <>
      {orbs.map((o, i) => (
        <div key={i} style={{
          position:'absolute', width:o.w, height:o.h, borderRadius:'50%',
          top:o.top, right:o.right, bottom:o.bottom, left:o.left,
          background:`radial-gradient(circle,${o.bg} 0%,transparent 70%)`,
          pointerEvents:'none', zIndex:0,
        }}/>
      ))}
    </>
  );
}

// ─── GRID TEXTURE ────────────────────────────────────────────────────────────
function GridTexture({ dark = false }) {
  const c = dark ? 'rgba(255,255,255,0.03)' : 'rgba(100,50,20,0.04)';
  return (
    <div style={{
      position:'absolute', inset:0, zIndex:0, pointerEvents:'none',
      backgroundImage:`linear-gradient(${c} 1px,transparent 1px),linear-gradient(90deg,${c} 1px,transparent 1px)`,
      backgroundSize:'56px 56px',
    }}/>
  );
}

// ─── PROGRESS BAR ────────────────────────────────────────────────────────────
function ProgressBar() {
  const [pct, setPct] = useState(0);
  useEffect(() => {
    const fn = () => {
      const tot = document.documentElement.scrollHeight - window.innerHeight;
      setPct(tot > 0 ? (window.scrollY / tot) * 100 : 0);
    };
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);
  return (
    <div style={{position:'fixed',top:0,left:0,right:0,height:3,zIndex:400,background:'transparent'}}>
      <div style={{height:'100%',width:`${pct}%`,background:`linear-gradient(90deg,${C.teal},#6ee8cc)`,transition:'width 0.1s',borderRadius:'0 2px 2px 0',boxShadow:'0 0 8px rgba(45,180,148,0.6)'}}/>
    </div>
  );
}

// ─── NAV ─────────────────────────────────────────────────────────────────────
function Nav({ page, setPage, cartCount = 0 }) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);

  const navLinks = [
    { id:'home', label:'Home' },
    { id:'about', label:'about' },
    { id:'work', label:'Work & Projects' },
    { id:'contact', label:'Contact' },
  ];

  return (
    <nav style={{
      position:'fixed',top:0,left:0,right:0,zIndex:300,
      padding: scrolled ? '10px 48px' : '20px 48px',
      display:'flex',alignItems:'center',justifyContent:'space-between',
      background: scrolled ? 'rgba(253,246,238,0.95)' : 'transparent',
      backdropFilter: scrolled ? 'blur(20px) saturate(1.8)' : 'none',
      borderBottom: scrolled ? `1px solid ${C.border}` : 'none',
      boxShadow: scrolled ? C.shadow : 'none',
      transition:'all 0.35s cubic-bezier(.22,1,.36,1)',
    }}>
      <button onClick={()=>setPage('home')} style={{
        background:'none',border:'none',cursor:'pointer',
        fontFamily:"'Playfair Display',serif",fontSize:22,
        color: scrolled ? C.textDark : '#fff',
        letterSpacing:'0.05em',transition:'color 0.3s',
        fontWeight:700,
      }}>SafiBase</button>

      <div style={{display:'flex',gap:32,alignItems:'center'}}>
        {navLinks.map(l => (
          <button key={l.id} onClick={()=>setPage(l.id)} style={{
            background:'none',border:'none',cursor:'pointer',
            color: page===l.id ? C.teal : (scrolled ? C.textMid : 'rgba(255,255,255,0.8)'),
            fontSize:12,letterSpacing:'0.1em',textTransform:'uppercase',
            fontFamily:"'DM Sans',sans-serif",fontWeight:500,
            transition:'all 0.2s',
            borderBottom: page===l.id ? `1.5px solid ${C.teal}` : '1.5px solid transparent',
            paddingBottom:3,
          }}>{l.label}</button>
        ))}
      </div>
    </nav>
  );
}

// ─── FOOTER ──────────────────────────────────────────────────────────────────
function Footer({ setPage }) {
  return (
    <footer style={{background:C.bgDeep,padding:'48px',display:'flex',justifyContent:'space-between',alignItems:'center',flexWrap:'wrap',gap:20,position:'relative',overflow:'hidden'}}>
      <Orbs variant="dark"/>
      <div style={{position:'relative',zIndex:1}}>
        <button onClick={()=>setPage('home')} style={{background:'none',border:'none',cursor:'pointer',fontFamily:"'Playfair Display',serif",fontSize:22,color:'#fff',fontWeight:700,display:'block',marginBottom:6}}>SafiBase</button>
        <p style={{color:'rgba(255,255,255,0.4)',fontSize:12,fontFamily:"'DM Sans',sans-serif"}}>© {new Date().getFullYear()} Eunice Gichuhi · All rights reserved.</p>
      </div>
      <div style={{position:'relative',zIndex:1,display:'flex',gap:10}}>
        {[
          {href:'https://github.com/EGichuhi',icon:<Github size={15}/>},
          {href:'https://www.linkedin.com/in/eunicegichuhi/',icon:<Linkedin size={15}/>},
          {href:'mailto:eunice.gwanja@gmail.com',icon:<Mail size={15}/>},
        ].map((s,i) => (
          <a key={i} href={s.href} target="_blank" rel="noopener noreferrer"
            style={{width:38,height:38,borderRadius:10,display:'flex',alignItems:'center',justifyContent:'center',background:'rgba(255,255,255,0.07)',border:'1px solid rgba(255,255,255,0.12)',color:'rgba(255,255,255,0.5)',textDecoration:'none',transition:'all 0.2s'}}
            onMouseEnter={e=>{e.currentTarget.style.color=C.teal;e.currentTarget.style.borderColor=C.tealBorder;e.currentTarget.style.background='rgba(45,180,148,0.12)';}}
            onMouseLeave={e=>{e.currentTarget.style.color='rgba(255,255,255,0.5)';e.currentTarget.style.borderColor='rgba(255,255,255,0.12)';e.currentTarget.style.background='rgba(255,255,255,0.07)';}}
          >{s.icon}</a>
        ))}
      </div>
    </footer>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// PAGE: HOME
// ═══════════════════════════════════════════════════════════════════════════════
function HomePage({ setPage }) {
  const canvasRef = useRef(null);

  // Animated particle canvas for hero
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let raf;
    const resize = () => { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight; };
    resize();
    window.addEventListener('resize', resize);

    const particles = Array.from({length: 38}, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 2.5 + 0.5,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
      alpha: Math.random() * 0.4 + 0.1,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,220,180,${p.alpha})`;
        ctx.fill();
      });
      // draw connection lines
      for (let i = 0; i < particles.length; i++) {
        for (let j = i+1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx*dx + dy*dy);
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(255,200,140,${0.08 * (1 - dist/120)})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize); };
  }, []);

  const services = [
    { icon:<Layers size={20}/>, title:'CRM Systems', desc:'Custom pipelines that track every lead, client, and deal — no more spreadsheet chaos.', color:C.teal },
    { icon:<Zap size={20}/>, title:'Automation', desc:'Trigger-based workflows that run 24/7, eliminating repetitive manual tasks.', color:'#e8a030' },
    { icon:<BarChart2 size={20}/>, title:'Dashboards', desc:'Real-time visibility into your KPIs, revenue, and operations in one clean view.', color:'#c084e8' },
    { icon:<Globe size={20}/>, title:'Business Websites', desc:'Fast, modern sites built to convert visitors into clients and reflect your brand.', color:C.cognac },
  ];

  const stats = [
    { val:'80', suffix:'%', label:'Reduction in admin', sub:'avg. across clients' },
    { val:'3',  suffix:'×', label:'Faster onboarding',  sub:'automated intake flows' },
    { val:'48', suffix:'h', label:'First system live',   sub:'kickoff to deployed' },
    { val:'10', suffix:'+', label:'Clients & projects',  sub:'and counting' },
  ];

  const process = [
    { n:'01', title:'Discovery', desc:'We map your operations and find exactly where time and money are leaking.' },
    { n:'02', title:'Design',    desc:'I design a tailored system — CRM, automation, or dashboard — around your real workflow.' },
    { n:'03', title:'Build',     desc:'Built, tested, and refined with your team before anything goes live.' },
    { n:'04', title:'Launch',    desc:'Fully documented system, live on day one, with support to grow as you do.' },
  ];

  const testimonials = [
    { name:'Marcus O.',  role:'Founder, Construction Co.', quote:'Eunice built us a CRM that replaced 3 spreadsheets and saved hours every week. Night and day difference.' },
    { name:'Priya S.',   role:'Director, Consulting Firm',  quote:'Proposals that used to take a full day now auto-generate in minutes. Absolutely transformed our ops.' },
    { name:'James K.',   role:'CEO, Logistics Startup',    quote:'The dashboard alone changed how we make decisions every morning. Clean, fast, exactly right.' },
  ];

  return (
    <div>
      {/* ── HERO ── */}
      <section style={{minHeight:'100vh',position:'relative',display:'flex',alignItems:'center',justifyContent:'center',overflow:'hidden',background:C.bgDeep}}>
        {/* Particle canvas */}
        <canvas ref={canvasRef} style={{position:'absolute',inset:0,width:'100%',height:'100%',zIndex:1,pointerEvents:'none'}}/>
        <GridTexture dark/>
        <Orbs variant="dark"/>

        {/* Animated gradient ring */}
        <div style={{position:'absolute',width:700,height:700,borderRadius:'50%',border:'1px solid rgba(45,180,148,0.08)',top:'50%',left:'50%',transform:'translate(-50%,-50%)',zIndex:0,animation:'spinSlow 30s linear infinite'}}/>
        <div style={{position:'absolute',width:500,height:500,borderRadius:'50%',border:'1px solid rgba(196,98,45,0.08)',top:'50%',left:'50%',transform:'translate(-50%,-50%)',zIndex:0,animation:'spinSlow 20s linear infinite reverse'}}/>

        <div style={{position:'relative',zIndex:2,maxWidth:1100,margin:'0 auto',padding:'120px 48px 100px',textAlign:'center'}}>
          {/* Badge */}
          <div style={{display:'inline-flex',alignItems:'center',gap:8,padding:'8px 22px',borderRadius:40,border:'1px solid rgba(45,180,148,0.3)',background:'rgba(45,180,148,0.1)',backdropFilter:'blur(10px)',marginBottom:36,animation:'fadeUp .6s ease both'}}>
            <div style={{width:7,height:7,borderRadius:'50%',background:C.teal,boxShadow:`0 0 10px ${C.teal}`,animation:'pulse 2s infinite'}}/>
            <span style={{color:'rgba(255,255,255,0.9)',fontSize:12,letterSpacing:'0.18em',textTransform:'uppercase',fontFamily:"'DM Sans',sans-serif",fontWeight:500}}>Founder of Safibase</span>
          </div>

          <h1 style={{fontFamily:"'Playfair Display',serif",fontSize:'clamp(44px,7.5vw,88px)',lineHeight:1.05,color:'#fff',marginBottom:28,letterSpacing:'-0.025em',animation:'fadeUp .65s .1s ease both'}}>
            Build systems that help
            <span style={{display:'block',background:'linear-gradient(135deg,#2db494 0%,#6ee8cc 50%,#2db494 100%)',backgroundSize:'200% 200%',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',animation:'gradMove 4s ease infinite'}}>
              businesses grow.
            </span>
          </h1>

          <p style={{color:'rgba(255,255,255,0.6)',fontSize:'clamp(16px,2vw,20px)',maxWidth:640,margin:'0 auto 44px',lineHeight:1.8,fontFamily:"'DM Sans',sans-serif",animation:'fadeUp .65s .2s ease both'}}>
            I design CRM systems, automations, dashboards, and websites for service businesses —
            helping founders save time, organize operations, and scale with clarity.
          </p>

          <div style={{display:'flex',gap:14,justifyContent:'center',flexWrap:'wrap',marginBottom:56,animation:'fadeUp .65s .3s ease both'}}>
            <button className="teal-btn" onClick={()=>setPage('contact')} style={{padding:'15px 34px',borderRadius:12,fontSize:15}}>
              Book a Discovery Call <ArrowRight size={16}/>
            </button>
            <button className="ghost-btn" onClick={()=>setPage('work')} style={{padding:'15px 34px',borderRadius:12,fontSize:15,color:'rgba(255,255,255,0.8)',border:'1.5px solid rgba(255,255,255,0.2)'}}>
              View My Work
            </button>
          </div>

          {/* Tool pills */}
          <div style={{display:'flex',flexWrap:'wrap',justifyContent:'center',gap:10,marginBottom:60,animation:'fadeUp .65s .4s ease both'}}>
            {['Airtable','Make','Supabase','Lovable','GitHub','Automation','CRM','Dashboards'].map(t => (
              <span key={t} style={{padding:'6px 16px',borderRadius:20,background:'rgba(255,255,255,0.06)',border:'1px solid rgba(255,255,255,0.1)',color:'rgba(255,255,255,0.55)',fontSize:12,fontFamily:"'DM Sans',sans-serif",backdropFilter:'blur(6px)'}}>{t}</span>
            ))}
          </div>

          {/* Stats */}
          <div style={{display:'inline-grid',gridTemplateColumns:'repeat(4,1fr)',gap:0,borderRadius:16,overflow:'hidden',border:'1px solid rgba(255,255,255,0.08)',background:'rgba(255,255,255,0.04)',backdropFilter:'blur(16px)',animation:'fadeUp .65s .5s ease both'}}>
            {stats.map((s,i) => (
              <div key={i} style={{padding:'24px 28px',textAlign:'center',borderRight:i<stats.length-1?'1px solid rgba(255,255,255,0.07)':'none'}}>
                <div style={{fontFamily:"'Playfair Display',serif",fontSize:32,color:C.teal,lineHeight:1,fontWeight:700}}>
                  <AnimCounter target={s.val} suffix={s.suffix}/>
                </div>
                <div style={{color:'rgba(255,255,255,0.75)',fontSize:12,marginTop:6,fontFamily:"'DM Sans',sans-serif",fontWeight:500}}>{s.label}</div>
                <div style={{color:'rgba(255,255,255,0.3)',fontSize:10,marginTop:3,fontFamily:"'DM Sans',sans-serif"}}>{s.sub}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll indicator */}
        <div style={{position:'absolute',bottom:32,left:'50%',transform:'translateX(-50%)',zIndex:2,display:'flex',flexDirection:'column',alignItems:'center',gap:6}}>
          <span style={{fontSize:10,letterSpacing:'0.14em',textTransform:'uppercase',fontFamily:"'DM Sans',sans-serif",color:'rgba(255,255,255,0.3)'}}>Scroll</span>
          <div style={{width:28,height:28,borderRadius:'50%',background:'rgba(255,255,255,0.07)',border:'1px solid rgba(255,255,255,0.12)',display:'flex',alignItems:'center',justifyContent:'center',animation:'bounce 2.2s infinite'}}>
            <ChevronDown size={14} color='rgba(255,255,255,0.5)'/>
          </div>
        </div>
      </section>

      {/* ── SERVICES ── */}
<section style={{padding:'130px 0', background:C.bg, position:'relative', overflow:'hidden'}}>
  <Orbs/>
  <GridTexture/>
  
  <div style={{maxWidth:1250, margin:'0 auto', padding:'0 48px', position:'relative', zIndex:1}}>
    <div style={{textAlign:'center', marginBottom:80}}>
      <span style={{display:'inline-block', padding:'6px 20px', borderRadius:20, background:C.tealSoft, border:`1px solid ${C.tealBorder}`, color:C.teal, fontSize:11, letterSpacing:'0.14em', textTransform:'uppercase', fontFamily:"'DM Sans',sans-serif", fontWeight:600, marginBottom:16}}>
        What I Build
      </span>
      <h2 style={{fontFamily:"'Playfair Display',serif", fontSize:'clamp(32px,5vw,48px)', color:C.textDark, marginBottom:16}}>Services</h2>
      <p style={{color:C.textMid, fontSize:16.5, maxWidth:560, margin:'0 auto', fontFamily:"'DM Sans',sans-serif", lineHeight:1.8}}>
        End-to-end systems for businesses ready to stop winging it.
      </p>
    </div>

    <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(245px, 1fr))', gap:26}}>
      {services.map((s, i) => (
        <div key={i} className="card-hover" style={{
          padding:'42px 28px', 
          borderRadius:24, 
          background:C.bgCard, 
          border:`1px solid ${C.border}`, 
          boxShadow:C.shadow,
          position:'relative',
          overflow:'hidden'
        }}>
          <div style={{position:'absolute', top:-50, right:-50, width:160, height:160, borderRadius:'50%', background:`radial-gradient(circle, ${s.color}12 0%, transparent 65%)`}}/>
          
          <div style={{position:'relative', zIndex:1}}>
            <div style={{width:62, height:62, borderRadius:16, background:`${s.color}12`, border:`2px solid ${s.color}25`, display:'flex', alignItems:'center', justifyContent:'center', fontSize:30, marginBottom:26, color:s.color}}>
              {s.icon}
            </div>
            <h3 style={{fontFamily:"'Playfair Display',serif", color:C.textDark, fontSize:21.5, marginBottom:12}}>{s.title}</h3>
            <p style={{color:C.textDim, fontSize:14.5, lineHeight:1.78}}>{s.desc}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
</section>

{/* ── PROCESS ── */}
<section style={{padding:'130px 0', background:C.bgAlt, position:'relative', overflow:'hidden'}}>
  <GridTexture/>
  
  <div style={{maxWidth:1250, margin:'0 auto', padding:'0 48px', position:'relative', zIndex:1}}>
    <div style={{textAlign:'center', marginBottom:80}}>
      <span style={{display:'inline-block', padding:'6px 20px', borderRadius:20, background:C.cognacSoft, border:`1px solid ${C.cognac}30`, color:C.cognac, fontSize:11, letterSpacing:'0.14em', textTransform:'uppercase', fontFamily:"'DM Sans',sans-serif", fontWeight:600, marginBottom:16}}>
        How It Works
      </span>
      <h2 style={{fontFamily:"'Playfair Display',serif", fontSize:'clamp(32px,5vw,48px)', color:C.textDark}}>The Process</h2>
    </div>

    <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(245px, 1fr))', gap:26}}>
      {process.map((p, i) => (
        <div key={i} className="card-hover" style={{
          padding:'42px 28px', 
          borderRadius:24, 
          background:C.bgCard, 
          border:`1px solid ${C.border}`, 
          boxShadow:C.shadow,
          position:'relative'
        }}>
          <div style={{
            width:58, height:58, borderRadius:16, 
            background:`linear-gradient(135deg, ${C.teal}, ${C.tealDark})`, 
            display:'flex', alignItems:'center', justifyContent:'center', 
            marginBottom:26, boxShadow:'0 8px 25px rgba(45,180,148,0.35)',
            color:'#fff', fontSize:19, fontWeight:700
          }}>
            {p.n}
          </div>
          <h3 style={{fontFamily:"'Playfair Display',serif", color:C.textDark, fontSize:21, marginBottom:12}}>{p.title}</h3>
          <p style={{color:C.textDim, fontSize:14.5, lineHeight:1.8}}>{p.desc}</p>
        </div>
      ))}
    </div>
  </div>
</section>

{/* ── TESTIMONIALS ── */}
<section style={{padding:'130px 0', background:C.bg, position:'relative', overflow:'hidden'}}>
  <Orbs/>
  
  <div style={{maxWidth:1250, margin:'0 auto', padding:'0 48px', position:'relative', zIndex:1}}>
    <div style={{textAlign:'center', marginBottom:80}}>
      <span style={{display:'inline-block', padding:'6px 20px', borderRadius:20, background:C.tealSoft, border:`1px solid ${C.tealBorder}`, color:C.teal, fontSize:11, letterSpacing:'0.14em', textTransform:'uppercase', fontFamily:"'DM Sans',sans-serif", fontWeight:600, marginBottom:16}}>
        Client Feedback
      </span>
      <h2 style={{fontFamily:"'Playfair Display',serif", fontSize:'clamp(32px,5vw,48px)', color:C.textDark}}>What Clients Say</h2>
    </div>

    <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(300px, 1fr))', gap:28}}>
      {testimonials.map((t, i) => (
        <div key={i} className="card-hover" style={{
          padding:'48px 38px', 
          borderRadius:26, 
          background:C.bgCard, 
          border:`1px solid ${C.border}`, 
          boxShadow:C.shadow,
          position:'relative',
          height: '100%'
        }}>
          <div style={{position:'absolute', top:24, right:32, fontSize:110, opacity:0.07, color:C.teal, lineHeight:1, fontFamily:"'Playfair Display',serif"}}>“</div>
          
          <div style={{display:'flex', gap:5, marginBottom:28}}>
            {[...Array(5)].map((_, j) => <Star key={j} size={18} color={C.teal} fill={C.teal}/>)}
          </div>

          <p style={{color:C.textMid, fontSize:15.5, lineHeight:1.85, fontStyle:'italic', marginBottom:36}}>
            "{t.quote}"
          </p>

          <div style={{display:'flex', alignItems:'center', gap:16}}>
            <div style={{
              width:52, height:52, borderRadius:'50%', 
              background:`linear-gradient(135deg, ${C.teal}, ${C.cognac})`, 
              display:'flex', alignItems:'center', justifyContent:'center', 
              color:'#fff', fontSize:20, fontWeight:700, fontFamily:"'Playfair Display',serif"
            }}>
              {t.name[0]}
            </div>
            <div>
              <div style={{fontWeight:600, color:C.textDark}}>{t.name}</div>
              <div style={{color:C.textDim, fontSize:13.5}}>{t.role}</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
</section>

      {/* ── CTA ── */}
      <section style={{padding:'100px 48px',background:C.bgDeep,textAlign:'center',position:'relative',overflow:'hidden'}}>
        <GridTexture dark/>
        <Orbs variant="dark"/>
        <div style={{position:'relative',zIndex:1}}>
          <h2 style={{fontFamily:"'Playfair Display',serif",fontSize:'clamp(28px,4vw,50px)',color:'#fff',marginBottom:18,maxWidth:680,margin:'0 auto 18px',lineHeight:1.15}}>
            Ready to turn your operations into a competitive advantage?
          </h2>
          <p style={{color:'rgba(255,255,255,0.5)',fontSize:17,marginBottom:40,fontFamily:"'DM Sans',sans-serif",maxWidth:460,margin:'0 auto 40px',lineHeight:1.7}}>
            Book a free 30-minute discovery call — let's map exactly what your business needs.
          </p>
          <button className="teal-btn" onClick={()=>setPage('contact')} style={{padding:'17px 44px',borderRadius:14,fontSize:16}}>
            Book a Discovery Call <ArrowRight size={17}/>
          </button>
        </div>
      </section>
    </div>
  );
}

// ── Intersection-observer fade-up hook ────────────────────────────────────────
function useFadeUp() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.12 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

function FadeSection({ children, delay = 0 }) {
  const [ref, visible] = useFadeUp();
  return (
    <div ref={ref} style={{
      opacity: visible ? 1 : 0,
      transform: visible ? 'none' : 'translateY(28px)',
      transition: `opacity .7s ${delay}s cubic-bezier(.22,1,.36,1), transform .7s ${delay}s cubic-bezier(.22,1,.36,1)`,
    }}>
      {children}
    </div>
  );
}

// ── DATA ──────────────────────────────────────────────────────────────────────
const skills = [
  { group:'Systems & CRM',   items:['Airtable','Make.com','Supabase','HubSpot','CRM Architecture','Workflow Design'] },
  { group:'Automation',      items:['Make.com','Zapier','API Integration','Webhooks','AI Pipelines','No-Code Tools'] },
  { group:'Development',     items:['React','Next.js','JavaScript','HTML/CSS','Lovable','GitHub'] },
  { group:'Data & Science',  items:['Python','MATLAB','SQL','Pandas','NumPy','COMSOL','AutoCAD'] },
];

const timeline = [
  {
    year:'2024 – Now', type:'founder',
    role:'Founder & Systems Designer',
    org:'Safibase',
    location:'Toronto, ON',
    color:C.teal,
    desc:'Building clean, scalable systems for service businesses — CRM pipelines, automations, dashboards, and client-facing websites. Replacing scattered spreadsheets with infrastructure that actually works.',
  },
  {
    year:'APR – AUG 2025', type:'work',
    role:'B2B IT Intern',
    org:'Philip Morris International',
    location:'Toronto, ON (Hybrid)',
    color:'#7c5fe8',
    desc:'Validated structured data pipelines between SAP ERP systems and partner tools. Developed and tested JIRA / Confluence features, and supported cross-functional technical projects.',
  },
  {
    year:'JAN – APR 2025', type:'work',
    role:'Operations Engineer & Technology Intern',
    org:'Second Bind',
    location:'Toronto, ON',
    color:C.cognac,
    desc:'Implemented AI automations to eliminate manual tasks. Identified and resolved operational bottlenecks, increasing throughput through process redesign and technology-led solutions.',
  },
  {
    year:'JAN – JUN 2024', type:'work',
    role:'Data Analyst',
    org:'Telus International',
    location:'Vancouver, BC (Remote)',
    color:'#e8a030',
    desc:'Reviewed AI-generated outputs with 98% accuracy in protocol adherence. Improved reliability of user-facing responses by identifying and resolving model inconsistencies.',
  },
  {
    year:'JAN – APR 2023', type:'work',
    role:'Data Engineering Intern',
    org:'AmLive',
    location:'Toronto, ON (Hybrid)',
    color:C.teal,
    desc:'Built a MongoDB data processing pipeline for streamlined storage and retrieval. Developed an ETL process to aggregate music streaming data using SQL and Python.',
  },
];

const values = [
  { icon:<Layers size={20}/>,    title:'Systems over hustle', desc:'The goal is infrastructure that runs without you — not more effort, smarter design.' },
  { icon:<Zap size={20}/>,       title:'Automation first',    desc:'If a task happens more than twice with the same inputs, it should run itself.' },
  { icon:<BarChart2 size={20}/>, title:'Clarity in data',     desc:'You can\'t improve what you can\'t see. Good systems make the right numbers obvious.' },
  { icon:<Globe size={20}/>,     title:'Built to last',       desc:'I document everything, design for handoff, and build things your team can actually maintain.' },
];

// ─────────────────────────────────────────────────────────────────────────────
function AboutPage({ setPage }) {

  return (
    <div style={{ background: C.bg, minHeight: '100vh' }}>

      {/* ── HERO BAND ────────────────────────────────────────────────────── */}
      <div style={{
        background: C.bgDeep,
        padding: '130px 48px 100px',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <GridTexture dark />
        <Orbs variant="dark" />

        {/* Animated ring */}
        <div style={{
          position:'absolute',width:600,height:600,borderRadius:'50%',
          border:'1px solid rgba(45,180,148,0.07)',
          top:'50%',left:'50%',transform:'translate(-50%,-50%)',zIndex:0,
          animation:'spinSlow 40s linear infinite',
        }}/>

        <div style={{ maxWidth:1100, margin:'0 auto', position:'relative', zIndex:1 }}>
          <button
            onClick={()=>setPage('home')}
            style={{
              background:'none',border:'none',cursor:'pointer',
              color:'rgba(255,255,255,0.35)',fontSize:13,
              fontFamily:"'DM Sans',sans-serif",
              display:'flex',alignItems:'center',gap:6,marginBottom:36,
              transition:'color .2s',
            }}
            onMouseEnter={e=>e.currentTarget.style.color='rgba(255,255,255,.65)'}
            onMouseLeave={e=>e.currentTarget.style.color='rgba(255,255,255,.35)'}
          >
            <ChevronRight size={13} style={{transform:'rotate(180deg)'}}/> Back to Home
          </button>

          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:80, alignItems:'center' }}>
            {/* Left: text */}
            <div>
              <span style={{
                display:'inline-block',padding:'5px 16px',borderRadius:20,
                background: C.tealSoft, border:`1px solid ${C.tealBorder}`,
                color:C.teal, fontSize:11, letterSpacing:'0.14em',
                textTransform:'uppercase', fontFamily:"'DM Sans',sans-serif",
                fontWeight:600, marginBottom:20,
              }}>About Me</span>

              <h1 style={{
                fontFamily:"'Playfair Display',serif",
                fontSize:'clamp(36px,5.5vw,64px)',
                color:'#fff', lineHeight:1.1, marginBottom:24,
                letterSpacing:'-0.02em',
              }}>
                Hi, I'm Eunice<br/>
                <span style={{
                  background:'linear-gradient(135deg,#2db494,#6ee8cc)',
                  WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent',
                }}>
                  I build systems that free you.
                </span>
              </h1>

              <p style={{
                color:'rgba(255,255,255,0.58)',fontSize:17,lineHeight:1.85,
                fontFamily:"'DM Sans',sans-serif",marginBottom:36,
              }}>
                INanotechnology engineer by training. Business systems designer by choice.
                I founded Safibase to give service businesses the infrastructure they
                actually need — so the work runs, even when you're not watching it.
                Based in Toronto, building for founders across North America.
              </p>

              <div style={{ display:'flex', gap:12, flexWrap:'wrap' }}>
                <button
                  onClick={()=>setPage('contact')}
                  style={{
                    padding:'13px 28px',borderRadius:11,background:C.teal,
                    color:'#fff',fontWeight:600,border:'none',cursor:'pointer',
                    fontSize:14,fontFamily:"'DM Sans',sans-serif",
                    display:'inline-flex',alignItems:'center',gap:8,transition:'all .22s',
                  }}
                  onMouseEnter={e=>{e.currentTarget.style.background=C.tealDark;e.currentTarget.style.transform='translateY(-1px)';}}
                  onMouseLeave={e=>{e.currentTarget.style.background=C.teal;e.currentTarget.style.transform='none';}}
                >
                  Work With Me <ArrowRight size={15}/>
                </button>
              </div>
            </div>

            {/* Right: photo + quick facts */}
            <div style={{ display:'flex', flexDirection:'column', gap:20, alignItems:'center' }}>
              <div style={{ position:'relative' }}>
                <img
                  src="eunice-pro.jpeg"
                  alt="Eunice Gichuhi"
                  style={{
                    width:260,height:320,objectFit:'cover',
                    borderRadius:20,display:'block',
                    boxShadow:'0 24px 60px rgba(0,0,0,0.5)',
                  }}
                />
                {/* Teal offset frame */}
                <div style={{
                  position:'absolute',inset:0,borderRadius:20,
                  border:`2px solid ${C.teal}`,
                  transform:'translate(10px,10px)',zIndex:-1,opacity:.35,
                }}/>
                {/* Floating badge */}
                <div style={{
                  position:'absolute',bottom:-16,right:-16,
                  padding:'10px 18px',borderRadius:12,
                  background:'#fff',boxShadow:C.shadowMd,
                  display:'flex',alignItems:'center',gap:8,
                }}>
                  <div style={{width:8,height:8,borderRadius:'50%',background:C.teal,boxShadow:`0 0 8px ${C.teal}`,animation:'pulse 2s infinite'}}/>
                  <span style={{color:C.textDark,fontSize:12,fontFamily:"'DM Sans',sans-serif",fontWeight:600}}>Taking on new clients — let's talk</span>                </div>
              </div>

              {/* Quick facts pill row */}
              <div style={{ display:'flex', flexWrap:'wrap', gap:10, justifyContent:'center', maxWidth:300 }}>
                {[
                  { icon:<MapPin size={12}/>,    text:'Toronto, ON' },
                  { icon:<Briefcase size={12}/>, text:'Founder, Safibase' },
                ].map((f,i) => (
                  <div key={i} style={{
                    display:'flex',alignItems:'center',gap:7,
                    padding:'7px 14px',borderRadius:20,
                    background:'rgba(255,255,255,0.07)',
                    border:'1px solid rgba(255,255,255,0.12)',
                    color:'rgba(255,255,255,0.65)',
                    fontSize:12,fontFamily:"'DM Sans',sans-serif",
                  }}>
                    <span style={{color:C.teal}}>{f.icon}</span>{f.text}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── MY STORY ─────────────────────────────────────────────────────── */}
      <section style={{ padding:'100px 0', background:C.bg, position:'relative', overflow:'hidden' }}>
        <Orbs/>
        <GridTexture/>
        <div style={{ maxWidth:1100, margin:'0 auto', padding:'0 48px', position:'relative', zIndex:1 }}>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1.5fr', gap:80, alignItems:'start' }}>

            {/* Sticky label side */}
              <FadeSection>
                <div style={{ position:'sticky', top:120 }}>
                  <span style={{
                    display:'inline-block',padding:'5px 16px',borderRadius:20,
                    background:C.tealSoft,border:`1px solid ${C.tealBorder}`,
                    color:C.teal,fontSize:11,letterSpacing:'0.14em',
                    textTransform:'uppercase',fontFamily:"'DM Sans',sans-serif",
                    fontWeight:600,marginBottom:20,
                  }}>My Story</span>
                  <h2 style={{
                    fontFamily:"'Playfair Display',serif",
                    fontSize:'clamp(28px,3.5vw,42px)',
                    color:C.textDark,lineHeight:1.2,marginBottom:24,
                  }}>
                    From engineering<br/>labs to business<br/>systems.
                  </h2>
                  <div style={{
                    width:48,height:3,
                    background:`linear-gradient(90deg,${C.teal},${C.cognac})`,
                    borderRadius:2,
                  }}/>
              
                  {/* Casual photo */}
                  <div style={{ marginTop:36, position:'relative', display:'inline-block' }}>
                    <img
                      src="eunice-casual.png"
                      alt="Eunice"
                      style={{
                        width:200, height:240, objectFit:'cover', objectPosition:'top center',
                        borderRadius:16, display:'block',
                        boxShadow:'0 16px 48px rgba(60,20,5,0.15)',
                        border:`3px solid ${C.bgAlt}`,
                      }}
                    />
                    <div style={{
                      position:'absolute', bottom:-14, left:'50%',
                      transform:'translateX(-50%)',
                      background:C.bgDeep, color:'rgba(255,255,255,0.7)',
                      fontSize:11, padding:'5px 14px', borderRadius:20,
                      fontFamily:"'DM Sans',sans-serif", whiteSpace:'nowrap',
                      letterSpacing:'0.06em',
                    }}>
                      Waterloo → Toronto → Safibase
                    </div>
                  </div>
              
                </div>
              </FadeSection>

            {/* Story paragraphs */}
            <div style={{ display:'flex', flexDirection:'column', gap:28 }}>
              {[
                `I'm Eunice — a Nanotechnology Engineering student at the University of Waterloo who spent years in labs building computational models for drug delivery and synthesizing nanoparticles at the nanoscale. That kind of work teaches you something most people don't expect: precision isn't just for science. Every system, whether molecular or operational, only works when every variable is understood and controlled.`,

`Working across startups, a telecom giant, and a recycling tech company showed me the same problem everywhere: talented people drowning in spreadsheets, disconnected tools, and processes held together with duct tape. Not for lack of trying — but because no one had built them the right infrastructure.`,

`That's why I started Safibase. "Safi" means clean in Swahili — and clean is exactly what I build. Lean CRM pipelines, automations that run while you sleep, dashboards that make decisions obvious, and websites that convert. For service business owners who are too busy to be stuck doing admin.`,

`I work with a small number of clients at a time so every system I build actually gets my full attention. If you're ready to stop duct-taping your operations together — let's talk.`,].map((para, i) => (
                <FadeSection key={i} delay={i * 0.08}>
                  <p style={{
                    color: i === 0 ? C.textMid : C.textDim,
                    fontSize: i === 0 ? 17 : 16,
                    lineHeight:1.9,
                    fontFamily:"'DM Sans',sans-serif",
                    fontWeight: i === 0 ? 400 : 300,
                  }}>{para}</p>
                </FadeSection>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── VALUES ───────────────────────────────────────────────────────── */}
      <section style={{ padding:'100px 0', background:C.bgAlt, position:'relative', overflow:'hidden' }}>
        <GridTexture/>
        <div style={{ maxWidth:1100, margin:'0 auto', padding:'0 48px', position:'relative', zIndex:1 }}>
          <FadeSection>
            <div style={{ textAlign:'center', marginBottom:68 }}>
              <span style={{
                display:'inline-block',padding:'5px 16px',borderRadius:20,
                background:C.cognacSoft,border:`1px solid rgba(196,98,45,0.25)`,
                color:C.cognac,fontSize:11,letterSpacing:'0.14em',
                textTransform:'uppercase',fontFamily:"'DM Sans',sans-serif",
                fontWeight:600,marginBottom:16,
              }}>How I Work</span>
              <h2 style={{ fontFamily:"'Playfair Display',serif",fontSize:'clamp(28px,4vw,42px)',color:C.textDark }}>Principles I Build By</h2>
            </div>
          </FadeSection>

          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(240px,1fr))', gap:22 }}>
            {values.map((v,i) => (
              <FadeSection key={i} delay={i * 0.08}>
                <div style={{
                  padding:'34px 28px',borderRadius:20,
                  background:C.bgCard,border:`1px solid ${C.border}`,
                  boxShadow:C.shadow,
                  transition:'all .28s cubic-bezier(.22,1,.36,1)',
                  position:'relative',overflow:'hidden',
                }}
                  onMouseEnter={e=>{e.currentTarget.style.transform='translateY(-5px)';e.currentTarget.style.boxShadow=C.shadowLg;}}
                  onMouseLeave={e=>{e.currentTarget.style.transform='none';e.currentTarget.style.boxShadow=C.shadow;}}
                >
                  <div style={{ position:'absolute',top:0,right:0,width:80,height:80,borderRadius:'0 20px 0 80px',background:`${C.teal}06`,pointerEvents:'none' }}/>
                  <div style={{
                    width:50,height:50,borderRadius:13,
                    background:C.tealSoft,border:`1px solid ${C.tealBorder}`,
                    display:'flex',alignItems:'center',justifyContent:'center',
                    color:C.teal,marginBottom:20,
                  }}>{v.icon}</div>
                  <h3 style={{ fontFamily:"'Playfair Display',serif",color:C.textDark,fontSize:18,marginBottom:10 }}>{v.title}</h3>
                  <p style={{ color:C.textDim,fontSize:14,lineHeight:1.75,fontFamily:"'DM Sans',sans-serif" }}>{v.desc}</p>
                  <div style={{ width:28,height:2,background:C.teal,borderRadius:2,marginTop:18 }}/>
                </div>
              </FadeSection>
            ))}
          </div>
        </div>
      </section>
{/* Personal note */}
<FadeSection delay={0.3}>
  <div style={{
    marginTop: 48, padding: '32px 36px', borderRadius: 20,
    background: C.bgDeep, border: `1px solid rgba(45,180,148,0.2)`,
    boxShadow: C.shadowMd, display: 'flex', gap: 24, alignItems: 'center',
    flexWrap: 'wrap',
  }}>
    <img
      src="eunice-pro.jpeg"
      alt="Eunice"
      style={{ width: 64, height: 64, borderRadius: '50%', objectFit: 'cover', objectPosition: 'top', border: `2px solid ${C.teal}`, flexShrink: 0 }}
    />
    <div>
      <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: 15.5, lineHeight: 1.8, fontFamily: "'DM Sans',sans-serif", fontStyle: 'italic', margin: '0 0 8px' }}>
        "I take on a small number of clients at a time — because I'd rather build
        one system that actually works than ten that don't."
      </p>
      <span style={{ color: C.teal, fontSize: 13, fontFamily: "'DM Sans',sans-serif", fontWeight: 600 }}>— Eunice, Founder of Safibase</span>
    </div>
  </div>
</FadeSection>
      {/* ── SKILLS ───────────────────────────────────────────────────────── */}
      <section style={{ padding:'100px 0', background:C.bg, position:'relative', overflow:'hidden' }}>
        <Orbs/>
        <div style={{ maxWidth:1100, margin:'0 auto', padding:'0 48px', position:'relative', zIndex:1 }}>
          <FadeSection>
            <div style={{ marginBottom:64 }}>
              <span style={{
                display:'inline-block',padding:'5px 16px',borderRadius:20,
                background:C.tealSoft,border:`1px solid ${C.tealBorder}`,
                color:C.teal,fontSize:11,letterSpacing:'0.14em',
                textTransform:'uppercase',fontFamily:"'DM Sans',sans-serif",
                fontWeight:600,marginBottom:16,
              }}>Toolkit</span>
              <h2 style={{ fontFamily:"'Playfair Display',serif",fontSize:'clamp(28px,4vw,42px)',color:C.textDark }}>Skills & Technologies</h2>
            </div>
          </FadeSection>

          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(260px,1fr))', gap:22 }}>
            {skills.map((group, i) => (
              <FadeSection key={i} delay={i * 0.07}>
                <div style={{
                  padding:'28px',borderRadius:18,
                  background:C.bgCard,border:`1px solid ${C.border}`,
                  boxShadow:C.shadow,
                  transition:'all .28s cubic-bezier(.22,1,.36,1)',
                }}
                  onMouseEnter={e=>{e.currentTarget.style.transform='translateY(-4px)';e.currentTarget.style.boxShadow=C.shadowMd;}}
                  onMouseLeave={e=>{e.currentTarget.style.transform='none';e.currentTarget.style.boxShadow=C.shadow;}}
                >
                  <h3 style={{
                    fontFamily:"'DM Sans',sans-serif",fontWeight:600,
                    color:C.textDark,fontSize:13,letterSpacing:'0.08em',
                    textTransform:'uppercase',marginBottom:16,
                  }}>{group.group}</h3>
                  <div style={{ display:'flex', flexWrap:'wrap', gap:8 }}>
                    {group.items.map((skill,j) => (
                      <span key={j} style={{
                        padding:'5px 12px',borderRadius:8,
                        background:C.bgAlt,border:`1px solid ${C.border}`,
                        color:C.textMid,fontSize:13,
                        fontFamily:"'DM Sans',sans-serif",
                        transition:'all .18s',cursor:'default',
                      }}
                        onMouseEnter={e=>{e.currentTarget.style.background=C.tealSoft;e.currentTarget.style.color=C.teal;e.currentTarget.style.borderColor=C.tealBorder;}}
                        onMouseLeave={e=>{e.currentTarget.style.background=C.bgAlt;e.currentTarget.style.color=C.textMid;e.currentTarget.style.borderColor=C.border;}}
                      >{skill}</span>
                    ))}
                  </div>
                </div>
              </FadeSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── TIMELINE ─────────────────────────────────────────────────────── */}
      <section style={{ padding:'100px 0', background:C.bgAlt, position:'relative', overflow:'hidden' }}>
        <GridTexture/>
        <div style={{ maxWidth:900, margin:'0 auto', padding:'0 48px', position:'relative', zIndex:1 }}>
          <FadeSection>
            <div style={{ marginBottom:64 }}>
              <span style={{
                display:'inline-block',padding:'5px 16px',borderRadius:20,
                background:C.cognacSoft,border:`1px solid rgba(196,98,45,0.25)`,
                color:C.cognac,fontSize:11,letterSpacing:'0.14em',
                textTransform:'uppercase',fontFamily:"'DM Sans',sans-serif",
                fontWeight:600,marginBottom:16,
              }}>Career</span>
              <h2 style={{ fontFamily:"'Playfair Display',serif",fontSize:'clamp(28px,4vw,42px)',color:C.textDark }}>The Journey</h2>
            </div>
          </FadeSection>

          {/* Vertical timeline */}
          <div style={{ position:'relative' }}>
            {/* Track line */}
            <div style={{
              position:'absolute',left:21,top:6,bottom:6,width:2,
              background:`linear-gradient(to bottom,${C.teal},rgba(45,180,148,0.04))`,
              borderRadius:2,
            }}/>

            <div style={{ display:'flex', flexDirection:'column', gap:0 }}>
              {timeline.map((item, i) => (
                <FadeSection key={i} delay={i * 0.07}>
                  <div style={{ paddingLeft:64, paddingBottom: i < timeline.length-1 ? 48 : 0, position:'relative' }}>
                    {/* Dot */}
                    <div style={{
                      position:'absolute',left:13,top:6,
                      width:18,height:18,borderRadius:'50%',
                      background:item.color,
                      border:`3px solid ${C.bgAlt}`,
                      boxShadow:`0 0 0 3px ${item.color}30, 0 4px 12px ${item.color}40`,
                      zIndex:1,
                    }}/>

                    <div style={{
                      background:C.bgCard,border:`1px solid ${C.border}`,
                      borderRadius:16,padding:'24px 28px',
                      boxShadow:C.shadow,
                      transition:'all .28s cubic-bezier(.22,1,.36,1)',
                    }}
                      onMouseEnter={e=>{e.currentTarget.style.transform='translateX(4px)';e.currentTarget.style.borderColor=`${item.color}40`;e.currentTarget.style.boxShadow=C.shadowMd;}}
                      onMouseLeave={e=>{e.currentTarget.style.transform='none';e.currentTarget.style.borderColor=C.border;e.currentTarget.style.boxShadow=C.shadow;}}
                    >
                      <div style={{ display:'flex', flexWrap:'wrap', justifyContent:'space-between', gap:10, marginBottom:8 }}>
                        <div>
                          <h3 style={{ fontFamily:"'Playfair Display',serif",color:C.textDark,fontSize:18,margin:'0 0 3px' }}>{item.role}</h3>
                          <p style={{ color:item.color,fontSize:13,margin:0,fontFamily:"'DM Sans',sans-serif",fontWeight:500 }}>{item.org}</p>
                        </div>
                        <div style={{
                          display:'flex',alignItems:'center',gap:6,
                          padding:'5px 13px',borderRadius:20,
                          background:C.bgAlt,border:`1px solid ${C.border}`,
                          alignSelf:'flex-start',
                        }}>
                          <span style={{ color:C.textDim,fontSize:11,fontFamily:"'DM Sans',sans-serif" }}>{item.year}</span>
                        </div>
                      </div>
                      <p style={{ color:C.textDim,fontSize:13,lineHeight:1.75,fontFamily:"'DM Sans',sans-serif",margin:0 }}>{item.desc}</p>
                    </div>
                  </div>
                </FadeSection>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── SOCIAL / CTA ─────────────────────────────────────────────────── */}
      <section style={{ padding:'100px 48px', background:C.bgDeep, textAlign:'center', position:'relative', overflow:'hidden' }}>
        <GridTexture dark/>
        <Orbs variant="dark"/>
        <div style={{ position:'relative', zIndex:1 }}>
          <h2 style={{ fontFamily:"'Playfair Display',serif",fontSize:'clamp(26px,4vw,46px)',color:'#fff',marginBottom:14,maxWidth:640,margin:'0 auto 14px',lineHeight:1.2 }}>
            Let's build something that works.
          </h2>
          <p style={{ color:'rgba(255,255,255,0.45)',fontSize:16,marginBottom:40,fontFamily:"'DM Sans',sans-serif",maxWidth:420,margin:'0 auto 40px',lineHeight:1.75 }}>
            Whether it's a CRM, an automation, a dashboard, or a full website — I'm here for it.
          </p>
          <div style={{ display:'flex', gap:14, justifyContent:'center', flexWrap:'wrap', marginBottom:40 }}>
            <button
              onClick={()=>setPage('contact')}
              style={{
                padding:'14px 32px',borderRadius:12,background:C.teal,
                color:'#fff',fontWeight:600,border:'none',cursor:'pointer',
                fontSize:15,fontFamily:"'DM Sans',sans-serif",
                display:'inline-flex',alignItems:'center',gap:8,transition:'all .22s',
              }}
              onMouseEnter={e=>{e.currentTarget.style.background=C.tealDark;e.currentTarget.style.transform='translateY(-1px)';}}
              onMouseLeave={e=>{e.currentTarget.style.background=C.teal;e.currentTarget.style.transform='none';}}
            >
              Book a Discovery Call <ArrowRight size={15}/>
            </button>
            <button
              onClick={()=>setPage('work')}
              style={{
                padding:'14px 28px',borderRadius:12,
                border:'1.5px solid rgba(255,255,255,0.2)',
                background:'rgba(255,255,255,0.07)',
                color:'rgba(255,255,255,0.8)',
                fontWeight:500,cursor:'pointer',
                fontSize:15,fontFamily:"'DM Sans',sans-serif",transition:'all .22s',
              }}
              onMouseEnter={e=>{e.currentTarget.style.borderColor='rgba(255,255,255,.4)';e.currentTarget.style.background='rgba(255,255,255,.12)';}}
              onMouseLeave={e=>{e.currentTarget.style.borderColor='rgba(255,255,255,.2)';e.currentTarget.style.background='rgba(255,255,255,.07)';}}
            >
              View My Work
            </button>
          </div>

          {/* Social links */}
          <div style={{ display:'flex', gap:12, justifyContent:'center' }}>
            {[
              { href:'https://github.com/EGichuhi', icon:<Github size={16}/> },
              { href:'https://www.linkedin.com/in/eunicegichuhi/', icon:<Linkedin size={16}/> },
              { href:'mailto:eunice.gwanja@gmail.com', icon:<Mail size={16}/> },
            ].map((s,i) => (
              <a key={i} href={s.href} target="_blank" rel="noopener noreferrer"
                style={{
                  width:40,height:40,borderRadius:10,
                  display:'flex',alignItems:'center',justifyContent:'center',
                  background:'rgba(255,255,255,0.07)',
                  border:'1px solid rgba(255,255,255,0.12)',
                  color:'rgba(255,255,255,0.5)',textDecoration:'none',transition:'all .2s',
                }}
                onMouseEnter={e=>{e.currentTarget.style.color=C.teal;e.currentTarget.style.borderColor=C.tealBorder;e.currentTarget.style.background='rgba(45,180,148,0.12)';}}
                onMouseLeave={e=>{e.currentTarget.style.color='rgba(255,255,255,.5)';e.currentTarget.style.borderColor='rgba(255,255,255,.12)';e.currentTarget.style.background='rgba(255,255,255,.07)';}}
              >{s.icon}</a>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// PAGE: WORK & PROJECTS
// ═══════════════════════════════════════════════════════════════════════════════
function WorkPage({ setPage }) {
  const [webModal, setWebModal] = useState(false);

  const experiences = [
    {role:'Founder & Systems Designer',company:'Safibase · Toronto, ON',date:'2025 – Present',bullets:['Founded Safibase to help service businesses replace manual workflows with clean, scalable systems.','Designed and deployed CRM pipelines, client onboarding automations, and operational dashboards.','Built and launched client-facing websites integrated with back-end systems.','Developed repeatable templates that cut setup time and ensured consistent outcomes.']},
    {role:'B2B IT Intern',company:'Philip Morris International · Toronto, ON (Hybrid)',date:'APR 2025 – AUG 2025',bullets:['Validated data pipelines for accurate synchronization between ERP systems (SAP) and partner tools.','Assisted in development and testing of internal tool features (JIRA, Confluence).','Collaborated cross-functionally and provided technical support for multiple projects.','Gained hands-on experience with data integration via Qualtrics-based workflows.']},
    {role:'Operations Engineer & Technology Intern',company:'Second Bind · Toronto, ON',date:'JAN 2025 – APR 2025',bullets:['Implemented AI automations to eliminate repetitive tasks and streamline operational workflows.','Identified bottlenecks and deployed solutions that measurably reduced delays.','Increased throughput through strategic process redesign and technology-driven improvements.']},
    {role:'Data Analyst',company:'Telus International · Vancouver, BC (Remote)',date:'JAN 2024 – JUNE 2024',bullets:['Reviewed AI-generated responses with 98% accuracy in protocol adherence.','Improved reliability of user-facing outputs by identifying and resolving AI inconsistencies.','Upskilled in SQL, database querying, and Jupyter Notebooks.']},
    {role:'Data Engineering Intern',company:'AmLive · Toronto, ON (Hybrid)',date:'JAN 2023 – APR 2023',bullets:['Applied Python for data analysis and visualization across 5 projects.','Designed a MongoDB data pipeline to streamline storage and retrieval.','Built an ETL process for music streaming data aggregation.']},
  ];

  const projects = [
    {title:'PLGA Coating Drug Optimization Model',year:'2026',desc:'Computational model for optimizing PLGA polymer coating parameters — balancing release kinetics, degradation rate, and biocompatibility.',image:'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&q=80',technologies:['Python','COMSOL','MATLAB','Drug Delivery'],link:'#',category:'Research'},
    {title:'NaYF₄:Yb,Er@NaYF₄ NP Upconversion',year:'2025',desc:'Lab research and prototype development for core-shell upconversion nanoparticles — NIR-to-visible photon upconversion applications.',image:' labdev.jpg?auto=format&fit=crop&q=80',technologies:['Nanoparticle Synthesis','Spectroscopy','MATLAB','Materials Science'],link:'#',category:'Research'},
    {title:'Smart Farming AI Initiative',year:'2024',desc:'AI solutions for sustainable agriculture in Kano State, Nigeria.',image:'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&q=80',technologies:['Python','AI','Data Analytics','ML'],link:'https://www.omdena.com/chapter-challenges/smart-farming-using-ai-for-sustainable-agriculture-in-kano-state-nigeria',category:'Data'},
    {title:'Public Transport Accessibility',year:'2024',desc:'Transport data analysis to improve accessibility for people with disabilities in Nairobi.',image:'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&q=80',technologies:['Python','Git','Data Analytics'],link:'https://www.omdena.com/chapter-challenges/enhancing-public-transport-accessibility-for-insivible-disabilities-in-nairobi',category:'Data'},
    {title:'Customer Analysis & Product Insights',year:'2023',desc:'Advanced EDA analyzing customer behavior and sales trends across product lines.',image:'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80',technologies:['Python','Jupyter','Data Visualization'],link:'https://github.com/EGichuhi/Customer_data_analysis',category:'Data'},
    {title:'Web Development Portfolio',year:'2025–Present',desc:'Professional websites and web apps for service businesses — including a tech blog and e-commerce store.',image:'webdev.png?auto=format&fit=crop&q=80',technologies:['React','Next.js','HTML/CSS','JavaScript'],link:'#',category:'Web', subProjects:['blog','store']},
  ];

  const catColor   = { Research:C.cognac, Data:C.teal, Web:'#7c5fe8' };
  const catBg      = { Research:C.cognacSoft, Data:C.tealSoft, Web:'rgba(124,95,232,0.1)' };

  return (
    <div style={{background:C.bg,minHeight:'100vh'}}>
      {/* Header band */}
      <div style={{background:C.bgDeep,padding:'130px 48px 80px',position:'relative',overflow:'hidden'}}>
        <GridTexture dark/>
        <Orbs variant="dark"/>
        <div style={{maxWidth:1100,margin:'0 auto',position:'relative',zIndex:1}}>
          <button onClick={()=>setPage('home')} style={{background:'none',border:'none',cursor:'pointer',color:'rgba(255,255,255,0.4)',fontSize:13,fontFamily:"'DM Sans',sans-serif",display:'flex',alignItems:'center',gap:6,marginBottom:28}}>
            <ChevronRight size={13} style={{transform:'rotate(180deg)'}}/> Back to Home
          </button>
          <span style={{display:'inline-block',padding:'5px 16px',borderRadius:20,background:C.tealSoft,border:`1px solid ${C.tealBorder}`,color:C.teal,fontSize:11,letterSpacing:'0.14em',textTransform:'uppercase',fontFamily:"'DM Sans',sans-serif",fontWeight:600,marginBottom:16}}>Career & Portfolio</span>
          <h1 style={{fontFamily:"'Playfair Display',serif",fontSize:'clamp(34px,5vw,58px)',color:'#fff',marginBottom:14,lineHeight:1.15}}>Work Experience & Projects</h1>
          <p style={{color:'rgba(255,255,255,0.5)',fontSize:16,fontFamily:"'DM Sans',sans-serif",maxWidth:540,lineHeight:1.75}}>A track record across systems design, engineering research, data analysis, and technology operations.</p>
        </div>
      </div>

      <div style={{maxWidth:1100,margin:'0 auto',padding:'80px 48px'}}>
      {/* Projects */}
<div style={{display:'flex', alignItems:'center', gap:16, marginBottom:52}}>
  <div style={{width:44, height:44, borderRadius:12, background:C.tealSoft, border:`1px solid ${C.tealBorder}`, display:'flex', alignItems:'center', justifyContent:'center'}}>
    <Code2 size={19} color={C.teal}/>
  </div>
  <div>
    <p style={{color:C.teal, fontSize:11, letterSpacing:'0.16em', textTransform:'uppercase', margin:'0 0 2px', fontFamily:"'DM Sans',sans-serif", fontWeight:600}}>Portfolio</p>
    <h2 style={{fontFamily:"'Playfair Display',serif", fontSize:32, color:C.textDark, margin:0}}>Projects & Research</h2>
  </div>
</div>

{/* ====================== SAFIBASE - FEATURED FIRST ====================== */}
<div style={{marginBottom: 80}}>
  <div style={{display:'flex', alignItems:'center', gap:12, marginBottom:24}}>
    <span style={{padding:'4px 14px', borderRadius:20, background:C.tealSoft, color:C.teal, fontSize:12, fontWeight:600, letterSpacing:'0.08em'}}>
      FEATURED
    </span>
    <h3 style={{fontFamily:"'Playfair Display',serif", fontSize:28, color:C.textDark, margin:0}}>Safibase — Portfolio</h3>
  </div>

  {projects
    .filter(p => p.title === 'Web Development Portfolio')
    .map((p, i) => (
      <div key={i} className="card-hover" 
        onClick={() => setWebModal(true)}
        style={{
          borderRadius:24,
          overflow:'hidden',
          border:`1px solid ${C.border}`,
          background:C.bgCard,
          boxShadow:C.shadow,
          cursor:'pointer',
          maxWidth: 920,
          margin:'0 auto'
        }}>
        
        <div style={{position:'relative', aspectRatio:'16/9', overflow:'hidden'}}>
          <img 
            src="webdev.jpg"
            alt={p.title} 
            style={{width:'100%', height:'100%', objectFit:'cover', transition:'transform 0.6s'}}
            onMouseEnter={e => e.target.style.transform = 'scale(1.05)'}
            onMouseLeave={e => e.target.style.transform = 'scale(1)'}
          />
          <div style={{position:'absolute', inset:0, background:'linear-gradient(to top, rgba(40,15,5,0.8), transparent 50%)'}}/>
          
          <div style={{position:'absolute', top:20, left:20, display:'flex', gap:8}}>
            <span style={{padding:'4px 12px', borderRadius:12, background:catBg[p.category], border:`1px solid ${catColor[p.category]}40`, color:catColor[p.category], fontSize:11, fontWeight:600}}>Web Development</span>
            <span style={{padding:'4px 12px', borderRadius:12, background:'rgba(0,0,0,0.4)', color:'white', fontSize:11}}>{p.year}</span>
          </div>
        </div>

        <div style={{padding:'32px 36px'}}>
          <p style={{color:C.textDim, fontSize:15.5, lineHeight:1.7, marginBottom:20}}>
            {p.desc}
          </p>
          <div style={{display:'flex', flexWrap:'wrap', gap:6}}>
            {p.technologies.map((t, j) => (
              <span key={j} style={{padding:'4px 12px', borderRadius:12, background:C.tealSoft, border:`1px solid ${C.tealBorder}`, color:C.teal, fontSize:12, fontWeight:500}}>
                {t}
              </span>
            ))}
          </div>
          <div style={{marginTop:24, color:C.teal, fontWeight:600, display:'flex', alignItems:'center', gap:6}}>
            View Full Project <ArrowRight size={16}/>
          </div>
        </div>
      </div>
    ))}
</div>

{/* ====================== RESEARCH - EVERYTHING ELSE ====================== */}
<div>
  <div style={{display:'flex', alignItems:'center', gap:12, marginBottom:32}}>
    <h3 style={{fontFamily:"'Playfair Display',serif", fontSize:26, color:C.textDark, margin:0}}>Research & Other Work</h3>
  </div>

  <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(310px, 1fr))', gap:24}}>
    {projects
      .filter(p => p.title !== 'Web Development Portfolio')
      .map((p, i) => (
        <div key={i} className="card-hover"
          onClick={() => p.title === 'Web Development Portfolio' && setWebModal(true)}
          style={{
            borderRadius:20,
            overflow:'hidden',
            border:`1px solid ${C.border}`,
            background:C.bgCard,
            boxShadow:C.shadow,
            cursor: p.title === 'Web Development Portfolio' ? 'pointer' : 'default'
          }}>
          {/* Keep your original card content here */}
          <div style={{position:'relative', aspectRatio:'16/9', overflow:'hidden'}}>
            <img src={p.image} alt={p.title} style={{width:'100%', height:'100%', objectFit:'cover', transition:'transform 0.5s'}}
              onMouseEnter={e=>e.target.style.transform='scale(1.06)'} 
              onMouseLeave={e=>e.target.style.transform='scale(1)'}/>
            <div style={{position:'absolute', inset:0, background:'linear-gradient(to top,rgba(40,15,5,0.75),transparent 55%)'}}/>
            <div style={{position:'absolute', top:12, left:12, display:'flex', gap:7}}>
              <span style={{padding:'3px 10px', borderRadius:12, background:catBg[p.category], border:`1px solid ${catColor[p.category]}30`, color:catColor[p.category], fontSize:10, fontFamily:"'DM Sans',sans-serif", fontWeight:600, letterSpacing:'0.06em', textTransform:'uppercase'}}>{p.category}</span>
              <span style={{padding:'3px 10px', borderRadius:12, background:'rgba(0,0,0,0.35)', color:'rgba(255,255,255,0.7)', fontSize:10, fontFamily:"'DM Sans',sans-serif", backdropFilter:'blur(4px)'}}>{p.year}</span>
            </div>
          </div>
          <div style={{padding:'20px 22px'}}>
            <h3 style={{fontFamily:"'Playfair Display',serif", color:C.textDark, fontSize:17, marginBottom:7, lineHeight:1.3}}>{p.title}</h3>
            <p style={{color:C.textDim, fontSize:13, lineHeight:1.65, marginBottom:14, fontFamily:"'DM Sans',sans-serif"}}>{p.desc}</p>
            <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', flexWrap:'wrap', gap:8}}>
              <div style={{display:'flex', flexWrap:'wrap', gap:5}}>
                {p.technologies.slice(0,3).map((t,j) => (
                  <span key={j} style={{padding:'2px 9px', borderRadius:12, background:C.tealSoft, border:`1px solid ${C.tealBorder}`, color:C.teal, fontSize:10, fontFamily:"'DM Sans',sans-serif", fontWeight:500}}>{t}</span>
                ))}
              </div>
              {p.link !== '#' && (
                <a href={p.link} target="_blank" rel="noopener noreferrer" style={{color:C.textDim, textDecoration:'none', transition:'color 0.2s'}}
                  onMouseEnter={e=>e.currentTarget.style.color=C.teal} 
                  onMouseLeave={e=>e.currentTarget.style.color=C.textDim}>
                  <ExternalLink size={15}/>
                </a>
              )}
            </div>
          </div>
        </div>
      ))}
  </div>
</div>
        {/* Experience */}
        <div style={{display:'flex',alignItems:'center',gap:16,marginBottom:52, marginTop:80}}>
          <div style={{width:44,height:44,borderRadius:12,background:C.tealSoft,border:`1px solid ${C.tealBorder}`,display:'flex',alignItems:'center',justifyContent:'center'}}><Briefcase size={19} color={C.teal}/></div>
          <div>
            <p style={{color:C.teal,fontSize:11,letterSpacing:'0.16em',textTransform:'uppercase',margin:'0 0 2px',fontFamily:"'DM Sans',sans-serif",fontWeight:600}}>Career</p>
            <h2 style={{fontFamily:"'Playfair Display',serif",fontSize:32,color:C.textDark,margin:0}}>Work Experience</h2>
          </div>
        </div>

        <div style={{position:'relative',marginBottom:100}}>
          <div style={{position:'absolute',left:21,top:8,bottom:8,width:2,background:`linear-gradient(to bottom,${C.teal},rgba(45,180,148,0.04))`,borderRadius:2}}/>
          {experiences.map((exp,i) => (
            <div key={i} style={{paddingLeft:64,paddingBottom: i<experiences.length-1 ? 48 : 0,position:'relative'}}>
              <div style={{position:'absolute',left:13,top:6,width:18,height:18,borderRadius:'50%',background:C.teal,border:`3px solid ${C.bg}`,boxShadow:`0 0 0 3px ${C.tealBorder},0 4px 12px rgba(45,180,148,0.3)`,zIndex:1}}/>
              <div className="card-hover" style={{background:C.bgCard,border:`1px solid ${C.border}`,borderRadius:16,padding:'26px 30px',boxShadow:C.shadow}}>
                <div style={{display:'flex',flexWrap:'wrap',justifyContent:'space-between',gap:12,marginBottom:10}}>
                  <div>
                    <h3 style={{fontFamily:"'Playfair Display',serif",color:C.textDark,fontSize:18,margin:'0 0 3px'}}>{exp.role}</h3>
                    <p style={{color:C.teal,fontSize:13,margin:0,fontFamily:"'DM Sans',sans-serif",fontWeight:500}}>{exp.company}</p>
                  </div>
                  <div style={{display:'flex',alignItems:'center',gap:6,padding:'5px 13px',borderRadius:20,background:C.bgAlt,border:`1px solid ${C.border}`,alignSelf:'flex-start'}}>
                    <Calendar size={11} color={C.textDim}/>
                    <span style={{color:C.textDim,fontSize:11,fontFamily:"'DM Sans',sans-serif"}}>{exp.date}</span>
                  </div>
                </div>
                <ul style={{margin:'14px 0 0',padding:'0 0 0 16px',display:'flex',flexDirection:'column',gap:7}}>
                  {exp.bullets.map((b,j) => <li key={j} style={{color:C.textDim,fontSize:13,lineHeight:1.75,fontFamily:"'DM Sans',sans-serif"}}>{b}</li>)}
                </ul>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Web Projects Modal */}
      {webModal && (
        <div style={{position:'fixed',inset:0,background:'rgba(40,15,5,0.6)',backdropFilter:'blur(10px)',zIndex:500,display:'flex',alignItems:'center',justifyContent:'center',padding:24}}>
          <div style={{background:'#fff',borderRadius:20,maxWidth:880,width:'100%',maxHeight:'92vh',overflowY:'auto',border:`1px solid ${C.border}`,boxShadow:C.shadowLg}}>
            <div style={{position:'sticky',top:0,background:'#fff',padding:'20px 28px',borderBottom:`1px solid ${C.border}`,display:'flex',justifyContent:'space-between',alignItems:'center',borderRadius:'20px 20px 0 0'}}>
              <h3 style={{fontFamily:"'Playfair Display',serif",color:C.textDark,fontSize:22,margin:0}}>Web Development Portfolio</h3>
              <button onClick={()=>setWebModal(false)} style={{background:C.bgAlt,border:`1px solid ${C.border}`,borderRadius:10,padding:'7px 9px',cursor:'pointer',color:C.textDim,display:'flex'}}><X size={17}/></button>
            </div>
            <div style={{padding:28,display:'grid',gap:20}}>
              {webProjectsFull.map((p,i) => (
                <div key={i} className="card-hover" style={{borderRadius:14,overflow:'hidden',border:`1px solid ${C.border}`,background:C.bgCardWarm,boxShadow:C.shadow}}>
                  <div style={{position:'relative',aspectRatio:'16/7'}}>
                    <img src={p.image} alt={p.title} style={{width:'100%',height:'100%',objectFit:'cover'}}/>
                    <div style={{position:'absolute',inset:0,background:'linear-gradient(to top,rgba(40,15,5,0.7),transparent)',display:'flex',alignItems:'flex-end',padding:18}}>
                      <div>
                        <h4 style={{fontFamily:"'Playfair Display',serif",color:'#fff',marginBottom:4,fontSize:17}}>{p.title}</h4>
                        <p style={{color:'rgba(255,255,255,0.7)',fontSize:12,margin:0}}>{p.description}</p>
                      </div>
                    </div>
                    {p.badge && <span style={{position:'absolute',top:12,left:12,padding:'3px 10px',borderRadius:12,background:C.tealSoft,border:`1px solid ${C.tealBorder}`,color:C.teal,fontSize:10,fontFamily:"'DM Sans',sans-serif",fontWeight:600,backdropFilter:'blur(4px)'}}>{p.badge}</span>}
                  </div>
                  <div style={{padding:'14px 18px',display:'flex',justifyContent:'space-between',alignItems:'center',flexWrap:'wrap',gap:10}}>
                    <div style={{display:'flex',flexWrap:'wrap',gap:6}}>
                      {p.technologies.map((t,j) => <span key={j} style={{padding:'3px 10px',background:C.tealSoft,border:`1px solid ${C.tealBorder}`,borderRadius:12,color:C.teal,fontSize:11,fontFamily:"'DM Sans',sans-serif",fontWeight:500}}>{t}</span>)}
                    </div>
                    {p.isInternal ? (
                      <button onClick={()=>{setWebModal(false);setPage(p.internalPage);}} style={{display:'flex',alignItems:'center',gap:5,color:C.teal,fontSize:13,fontFamily:"'DM Sans',sans-serif",background:'none',border:'none',cursor:'pointer',fontWeight:500}}>
                        Open {p.title} <ArrowRight size={13}/>
                      </button>
                    ) : (
                      <a href={p.link} target="_blank" rel="noopener noreferrer" style={{display:'flex',alignItems:'center',gap:5,color:C.teal,fontSize:13,textDecoration:'none',fontFamily:"'DM Sans',sans-serif",fontWeight:500}}>
                        Visit <ExternalLink size={13}/>
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}


// ═══════════════════════════════════════════════════════════════════════════════
// PAGE: CONTACT
// ═══════════════════════════════════════════════════════════════════════════════
function ContactPage() {
  const [form, setForm] = useState({
  name:'',
  email:'',
  phone:'',
  business:'',
  service:'',
  message:''
});
  const [status, setStatus] = useState('idle');
  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  setStatus('submitting');

  try {

    await fetch('https://hook.us2.make.com/ngmp2bfno7rilhc9ozghuop2i4jcqnsx', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: form.name,
        email: form.email,
        phone: form.phone,
        business: form.business,
        service: form.service,
        message: form.message,
        submittedAt: new Date().toISOString()
      }),
    });

    // Assume success if request sends
    setStatus('sent');

    setForm({
      name:'',
      email:'',
      phone:'',
      business:'',
      source:'',
      message:''
    });

  } catch (err) {

    console.error(err);

    setStatus('error');
  }
};
  
  const inp = {width:'100%',borderRadius:10,border:`1.5px solid ${C.borderMed}`,background:'#fff',padding:'13px 16px',color:C.textDark,fontSize:14,fontFamily:"'DM Sans',sans-serif",outline:'none',boxSizing:'border-box',transition:'border-color 0.2s'};
  const lbl = {display:'block',color:C.textDim,fontSize:11,letterSpacing:'0.09em',textTransform:'uppercase',marginBottom:8,fontFamily:"'DM Sans',sans-serif",fontWeight:600};

  return (
    <div style={{background:C.bg,minHeight:'100vh'}}>
      <div style={{background:C.bgDeep,padding:'130px 48px 80px',position:'relative',overflow:'hidden'}}>
        <GridTexture dark/>
        <Orbs variant="dark"/>
        <div style={{maxWidth:1100,margin:'0 auto',position:'relative',zIndex:1}}>
          <span style={{display:'inline-block',padding:'5px 16px',borderRadius:20,background:C.tealSoft,border:`1px solid ${C.tealBorder}`,color:C.teal,fontSize:11,letterSpacing:'0.14em',textTransform:'uppercase',fontFamily:"'DM Sans',sans-serif",fontWeight:600,marginBottom:16}}>Let's Connect</span>
          <h1 style={{fontFamily:"'Playfair Display',serif",fontSize:'clamp(34px,5vw,56px)',color:'#fff',marginBottom:14}}>Get in Touch</h1>
          <p style={{color:'rgba(255,255,255,0.5)',fontSize:16,fontFamily:"'DM Sans',sans-serif",maxWidth:480,lineHeight:1.75}}>Ready to bring structure to your business? Let's talk about what a better system could look like for you.</p>
        </div>
      </div>
            {/* Main Content - Stacked Layout */}
      <div style={{maxWidth:1100, margin:'0 auto', padding:'80px 48px'}}>

        {/* Calendly Link - On Top */}
        <div style={{ textAlign: 'center', marginBottom: 60 }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 12,
            padding: '14px 24px',
            borderRadius: 16,
            background: C.bgDeep,
            border: `1.5px solid ${C.borderMed}`,
            boxShadow: C.shadow
          }}>
            <Calendar size={20} color={C.teal} />
            <span style={{ color: C.textDim, fontSize: 15 }}>
              Prefer to talk directly?
            </span>
            <a
              href={"https://cal.com/safibase/15min"}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: C.teal,
                fontWeight: 600,
                textDecoration: 'none',
                fontFamily: "'DM Sans', sans-serif"
              }}
            >
              Book a Discovery Call →
            </a>
          </div>
        </div>

        {/* Form - Below */}
        <div style={{ 
          maxWidth: 680, 
          margin: '0 auto',
          background: '#fff', 
          border: `1.5px solid ${C.borderMed}`, 
          borderRadius: 24, 
          padding: 48, 
          boxShadow: C.shadow 
        }}>
          
          {status === 'sent' ? (
            <div style={{textAlign:'center', padding:'48px 0'}}>
              <div style={{width:68,height:68,borderRadius:'50%',background:C.tealSoft,border:`2px solid ${C.teal}`,display:'flex',alignItems:'center',justifyContent:'center',margin:'0 auto 22px'}}>
                <CheckCircle size={28} color={C.teal}/>
              </div>
              <h3 style={{fontFamily:"'Playfair Display',serif",color:C.textDark,fontSize:26,marginBottom:10}}>Message Sent!</h3>
              <p style={{color:C.textDim,fontFamily:"'DM Sans',sans-serif",fontSize:15}}>I'll get back to you as soon as possible.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{display:'flex',flexDirection:'column',gap:24}}>
              <h3 style={{fontFamily:"'Playfair Display',serif",color:C.textDark,fontSize:26,margin:'0 0 8px'}}>Send a Message</h3>

              {[
                {id:'name', label:'Full Name', type:'text', placeholder:'Your full name', required:true},
                {id:'email', label:'Email Address', type:'email', placeholder:'your@email.com', required:true},
                {id:'phone', label:'Phone Number', type:'tel', placeholder:'+1 (416) 000-0000', required:false},
                {id:'business', label:'Business / Brand', type:'text', placeholder:'Your company name', required:false},
              ].map(f => (
                <div key={f.id}>
                  <label style={lbl}>
                    {f.label}{f.required && <span style={{color:C.teal}}> *</span>}
                  </label>
                  <input 
                    type={f.type} 
                    placeholder={f.placeholder} 
                    required={f.required}
                    value={form[f.id as keyof typeof form] || ''}
                    onChange={e => setForm({...form, [f.id]: e.target.value})}
                    style={inp}
                    onFocus={e => (e.target.style.borderColor = C.teal)}
                    onBlur={e => (e.target.style.borderColor = C.borderMed)}
                  />
                </div>
              ))}

              <div>
                <label style={lbl}>What are you looking for help with?</label>
                <select 
                  value={form.source} 
                  onChange={e => setForm({...form, source: e.target.value})} 
                  style={{...inp}}
                >
                  <option value="">Select an option…</option>
                  {['CRM & Client Systems','Automations','Website Improvements','Operations & Workflow','Lead Management','General Consultation','Other']
                    .map(o => <option key={o} value={o}>{o}</option>)}
                </select>
              </div>

              <div>
                <label style={lbl}>Message <span style={{color:C.teal}}>*</span></label>
                <textarea 
                  required 
                  rows={5} 
                  placeholder="Tell me about your business and what you're hoping to improve..."
                  value={form.message} 
                  onChange={e => setForm({...form, message: e.target.value})}
                  style={{...inp, resize:'vertical', minHeight:140}}
                  onFocus={e => (e.target.style.borderColor = C.teal)}
                  onBlur={e => (e.target.style.borderColor = C.borderMed)}
                />
              </div>

              {status === 'error' && (
                <p style={{color:'#e05a5a',fontSize:13,fontFamily:"'DM Sans',sans-serif",background:'#fff0f0',border:'1px solid #f8c0c0',borderRadius:8,padding:'10px 14px',margin:0}}>
                  Something went wrong. Please try again.
                </p>
              )}

              <button 
                type="submit" 
                disabled={status==='submitting'} 
                className="teal-btn" 
                style={{padding:'16px',borderRadius:12,fontSize:15,justifyContent:'center',opacity:status==='submitting' ? 0.6 : 1}}
              >
                {status==='submitting' ? 'Sending…' : <>Send Message <Send size={16}/></>}
              </button>
            </form>
          )}
        </div>
      </div>

      
    </div>
  );
}

// ─── WEB PROJECTS DATA (modal) ─────────────────────────────────────────────
const webProjectsFull = [
  {
    title:'Coaching',
    description:'Kariuki Socials helps businesses show up online in a way that feels real, clear, and connected to their audience.',
    image:'kariukisocial.png',
    technologies:['React','Tag Filtering','Full Article Reader','Dark Hero'],
    link:'#',
    badge:'Built Here',
    isInternal:true,
    internalPage:'blog',
  },
  {
    title:'Kaloga Drywall',
    description:'Kaloga Drywall provides expert drywall installation and finishing services, delivering clean, durable, and high-quality interior construction solutions.',
    image:'kaloga.png',
    technologies:['HTML','CSS','JavaScript','Responsive Design'],
    link:'http://www.kalogadrywall.com',
    badge:'Live Site',
    isInternal:false,
  },
];

// ═══════════════════════════════════════════════════════════════════════════════
// ROOT
// ═══════════════════════════════════════════════════════════════════════════════
export default function App() {
  const [page, setPage] = useState('home');
  const [cart, setCart] = useState([]);
  useEffect(() => { window.scrollTo({top:0, behavior:'instant'}); }, [page]);
  const cartCount = cart.reduce((s,i) => s + i.qty, 0);

  return (
    <>
      <style>{GS}</style>
      <ProgressBar/>
      <Nav page={page} setPage={setPage} cartCount={cartCount}/>
      {page==='home'    && <HomePage    setPage={setPage}/>}
      {page==='about'   && <AboutPage   setPage={setPage}/>} 
      {page==='work'    && <WorkPage    setPage={setPage}/>}
      {page==='contact' && <ContactPage setPage={setPage}/>}
      <Footer setPage={setPage}/>
    </>
  );
}
