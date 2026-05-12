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
                Nanotechnology engineer by training. Business systems designer by choice.
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
