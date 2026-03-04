import { useState } from "react";
import { PLAN_MEDIA, WORKOUT_MEDIA } from "./media.js";

const ACCENT = "#2563EB";

const PLAN_DAYS = Array.from({ length: 28 }, (_, i) => ({
  day: i + 1,
  minutes: [13,10,8,12,9,15,11,10,8,13,7,9,14,10,12,8,15,11,9,13,10,8,12,11,9,14,10,13][i] || 10,
  phase: i < 7 ? "Fase 1: Fundamentos" : i < 14 ? "Fase 2: Equilíbrio" : i < 21 ? "Fase 3: Ossos Saudáveis" : "Fase 4: Força Total",
  image: PLAN_MEDIA[i]?.image || "/images/placeholder.jpg",
  video: PLAN_MEDIA[i]?.video || null,
}));

const WORKOUTS = [
  { id:1, title:"TAI CHI HARMONIA SUPREMA",          minutes:15, level:"Hard",   locked:true,  image:WORKOUT_MEDIA[0]?.image, video:WORKOUT_MEDIA[0]?.video },
  { id:2, title:"PODER DINÂMICO DO TAI CHI",    minutes:14, level:"Hard",   locked:true,  image:WORKOUT_MEDIA[1]?.image, video:WORKOUT_MEDIA[1]?.video },
  { id:3, title:"FORÇA CENTRAL DO TAI CHI",     minutes:13, level:"Medium", locked:true,  image:WORKOUT_MEDIA[2]?.image, video:WORKOUT_MEDIA[2]?.video },
  { id:4, title:"FLUXO TAI CHI BAIXO IMPACTO",       minutes:7,  level:"Easy",   locked:true,  image:WORKOUT_MEDIA[3]?.image, video:WORKOUT_MEDIA[3]?.video },
  { id:5, title:"TAI CHI FLUXO FÁCIL",          minutes:9,  level:"Easy",   locked:false, image:WORKOUT_MEDIA[4]?.image, video:WORKOUT_MEDIA[4]?.video },
  { id:6, title:"TAI CHI COMEÇO SUAVE",         minutes:9,  level:"Easy",   locked:false, image:WORKOUT_MEDIA[5]?.image, video:WORKOUT_MEDIA[5]?.video },
];

const levelColor = { Easy:"#22c55e", Medium:"#f97316", Hard:"#ef4444" };

function groupByPhase(days) {
  const groups = [];
  let last = null;
  days.forEach(d => {
    if (d.phase !== last) { groups.push({ phase:d.phase, days:[] }); last = d.phase; }
    groups[groups.length-1].days.push(d);
  });
  return groups;
}

// ── Video Modal ──────────────────────────────────────────────────────────────────
function VideoModal({ item, onClose }) {
  if (!item) return null;
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-inner" onClick={e => e.stopPropagation()}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:14 }}>
          <div>
            <div style={{ color:"#fff", fontWeight:"800", fontSize:16 }}>{item.title || "Dia " + item.day}</div>
            <div style={{ color:"#94a3b8", fontSize:13, marginTop:2 }}>{item.minutes} Minutos</div>
          </div>
          <button onClick={onClose} style={{ background:"rgba(255,255,255,0.12)", border:"none", color:"#fff", borderRadius:"50%", width:40, height:40, fontSize:20, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center" }}>×</button>
        </div>
        {item.video ? (
          <video src={item.video} controls autoPlay playsInline style={{ width:"100%", borderRadius:16, background:"#000", maxHeight:"65vh", display:"block" }} />
        ) : (
          <div style={{ width:"100%", aspectRatio:"16/9", background:"#1e293b", borderRadius:16, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", gap:12 }}>
            <div style={{ fontSize:52 }}>🎥</div>
            <div style={{ color:"#64748b", fontSize:14 }}>Vídeo ainda não adicionado</div>
            <div style={{ color:"#475569", fontSize:12 }}>Edite src/media.js</div>
          </div>
        )}
      </div>
    </div>
  );
}

// ── Aba Plano ────────────────────────────────────────────────────────────────────
function PlanTab() {
  const [completedDay, setCompletedDay] = useState(0);
  const [playing, setPlaying] = useState(null);
  const phases = groupByPhase(PLAN_DAYS);

  return (
    <div style={{ flex:1, overflowY:"auto", background:"#f5f6f8" }} className="scroll-hide">
      <VideoModal item={playing} onClose={() => setPlaying(null)} />

      {/* Header */}
      <div style={{ background:"#fff", padding:"22px 20px 16px" }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start" }}>
          <div>
            <div style={{ fontSize:30, fontWeight:"900", color:"#0f172a", lineHeight:1 }}>28 Dias</div>
            <div style={{ fontSize:16, fontWeight:"600", color:"#0f172a", marginTop:4 }}>
              Plano de Musculação Personalizado
            </div>
          </div>
          <button style={{ background:"none", border:"none", cursor:"pointer", textAlign:"center", padding:"4px 8px" }}>
            <div style={{ fontSize:20 }}>✏️</div>
            <div style={{ fontSize:11, color:"#94a3b8", marginTop:2 }}>Edit...</div>
          </button>
        </div>
        <div style={{ marginTop:14 }}>
          <div style={{ display:"flex", justifyContent:"space-between", marginBottom:6 }}>
            <span style={{ fontSize:12, color:"#94a3b8", fontWeight:"600" }}>PROGRESSO</span>
            <span style={{ fontSize:13, fontWeight:"700", color:"#0f172a" }}>{completedDay}/28 Dias</span>
          </div>
          <div style={{ height:6, background:"#e2e8f0", borderRadius:99, overflow:"hidden" }}>
            <div style={{ height:"100%", width:`${(completedDay/28)*100}%`, background:ACCENT, borderRadius:99, transition:"width 0.5s cubic-bezier(0.4,0,0.2,1)" }} />
          </div>
        </div>
      </div>

      {/* Banner promo */}
      <div style={{ margin:"14px 14px 0", borderRadius:18, background:"linear-gradient(135deg,#1d4ed8 0%,#3b82f6 60%,#6366f1 100%)", padding:"18px 22px", display:"flex", alignItems:"center", justifyContent:"space-between", cursor:"pointer" }}>
        <div>
          <div style={{ color:"#fff", fontWeight:"900", fontSize:13, textTransform:"uppercase", letterSpacing:"0.8px" }}>
            🎁 Presente de Boas-Vindas
          </div>
          <div style={{ color:"rgba(255,255,255,0.82)", fontSize:13, marginTop:3 }}>Apenas R$ 249,90/Ano</div>
        </div>
        <div style={{ fontSize:44 }}>🎁</div>
      </div>

      {/* Fases + dias */}
      <div style={{ paddingBottom:24 }}>
        {phases.map((group) => (
          <div key={group.phase} style={{ marginTop:22, paddingLeft:16 }}>
            <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:10 }}>
              <div style={{ width:11, height:11, borderRadius:"50%", background:"#cbd5e1", border:"2px solid #f5f6f8", boxShadow:"0 0 0 2px #cbd5e1" }} />
              <span style={{ fontSize:13, fontWeight:"700", color:"#94a3b8", textTransform:"uppercase", letterSpacing:"0.5px" }}>{group.phase}</span>
            </div>
            <div style={{ display:"flex", flexDirection:"column", gap:9, paddingLeft:5, borderLeft:"2px dashed #e2e8f0", paddingRight:14 }}>
              {group.days.map((d) => {
                const done = d.day <= completedDay;
                const current = d.day === completedDay + 1;
                return (
                  <div key={d.day} style={{ display:"flex", alignItems:"center" }}>
                    <div style={{ width:9, height:9, borderRadius:"50%", background:done?"#22c55e":current?ACCENT:"#cbd5e1", marginLeft:-5, flexShrink:0, border:"2px solid #f5f6f8", zIndex:1 }} />
                    <div className={`day-card${current?" active":""}${d.day > completedDay+1?" locked":""}`}>
                      {/* Thumb + play */}
                      <div style={{ position:"relative", flexShrink:0, cursor:"pointer" }} onClick={() => !d.locked && setPlaying(d)}>
                        {d.image
                          ? <img src={d.image} alt="" style={{ width:52, height:52, borderRadius:10, objectFit:"cover", display:"block" }} onError={e=>{e.target.style.display="none";e.target.nextSibling.style.display="flex";}} />
                          : null
                        }
                        <div style={{ display: d.image ? "none" : "flex", width:52, height:52, borderRadius:10, background:"#e2e8f0", alignItems:"center", justifyContent:"center", fontSize:20 }}>📷</div>
                        <div style={{ position:"absolute", inset:0, borderRadius:10, background:"rgba(0,0,0,0.25)", display:"flex", alignItems:"center", justifyContent:"center" }}>
                          <div style={{ width:20, height:20, borderRadius:"50%", background:"rgba(255,255,255,0.9)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:8, paddingLeft:2 }}>▶</div>
                        </div>
                      </div>
                      {/* Info */}
                      <div style={{ flex:1 }} onClick={() => !d.locked && setCompletedDay(prev => prev === d.day ? d.day-1 : d.day)}>
                        <div style={{ fontSize:14, fontWeight:"700", color:"#0f172a" }}>Dia {d.day}</div>
                        <div style={{ fontSize:12, color:"#64748b", marginTop:1 }}>{d.minutes} min</div>
                      </div>
                      {done ? <span style={{ fontSize:16 }}>✅</span> : <span style={{ fontSize:16, color:"#cbd5e1" }}>›</span>}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {completedDay > 0 && (
        <div style={{ display:"flex", justifyContent:"center", padding:"0 16px 24px" }}>
          <button onClick={() => setCompletedDay(0)} style={{ background:ACCENT, color:"#fff", border:"none", borderRadius:99, padding:"13px 28px", fontSize:14, fontWeight:"700", cursor:"pointer", boxShadow:"0 8px 24px rgba(37,99,235,0.35)", display:"flex", alignItems:"center", gap:8 }}>
            ▲ Voltar ao Dia 1
          </button>
        </div>
      )}
    </div>
  );
}

// ── Aba Treinos ──────────────────────────────────────────────────────────────────
function WorkoutsTab() {
  const [playing, setPlaying] = useState(null);
  return (
    <div style={{ flex:1, overflowY:"auto", background:"#f5f6f8" }} className="scroll-hide">
      <VideoModal item={playing} onClose={() => setPlaying(null)} />
      <div style={{ background:"#fff", padding:"18px 20px 14px", textAlign:"center", borderBottom:"1px solid #f1f5f9", flexShrink:0 }}>
        <span style={{ fontSize:17, fontWeight:"700", color:"#0f172a" }}>Treinos</span>
      </div>
      <div style={{ padding:14 }}>
        {WORKOUTS.map(w => (
          <div key={w.id} className="workout-card" onClick={() => setPlaying(w)}>
            <div style={{ position:"relative" }}>
              {w.image
                ? <img src={w.image} alt={w.title} style={{ width:"100%", height:210, objectFit:"cover", display:"block" }} />
                : <div style={{ width:"100%", height:210, background:"#e2e8f0", display:"flex", alignItems:"center", justifyContent:"center", fontSize:52 }}>📷</div>
              }
              <div style={{ position:"absolute", inset:0, background:"rgba(0,0,0,0.16)", display:"flex", alignItems:"center", justifyContent:"center" }}>
                <div style={{ width:52, height:52, borderRadius:"50%", background:"rgba(255,255,255,0.92)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:18, paddingLeft:4, boxShadow:"0 4px 16px rgba(0,0,0,0.25)" }}>▶</div>
              </div>
              {w.locked && (
                <div style={{ position:"absolute", bottom:10, left:10, width:34, height:34, borderRadius:"50%", background:"rgba(0,0,0,0.55)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:14 }}>🔒</div>
              )}
            </div>
            <div style={{ padding:"11px 16px 15px" }}>
              <div style={{ fontSize:12, fontWeight:"700", color:ACCENT, marginBottom:3 }}>
                {w.minutes} Minutos • <span style={{ color:levelColor[w.level]||ACCENT }}>{w.level}</span>
              </div>
              <div style={{ fontSize:15, fontWeight:"800", color:"#0f172a", textTransform:"uppercase", letterSpacing:"0.3px" }}>{w.title}</div>
            </div>
          </div>
        ))}
        <div style={{ background:"#fff", borderRadius:16, padding:"16px", textAlign:"center", cursor:"pointer", boxShadow:"0 1px 4px rgba(0,0,0,0.06)" }} onClick={() => alert("Em breve!")}>
          <span style={{ fontSize:15, fontWeight:"700", color:ACCENT }}>+ Sugerir Um Treino</span>
        </div>
      </div>
    </div>
  );
}

// ── Aba Progresso ────────────────────────────────────────────────────────────────
function ProgressTab({ profile }) {
  const bmi = profile ? (profile.weight_kg / Math.pow(profile.height_cm/100, 2)).toFixed(1) : null;
  const bmiCatColor = bmi ? (bmi<18.5?"#3b82f6":bmi<25?"#22c55e":bmi<30?"#f97316":"#ef4444") : ACCENT;
  const bmiLabel   = bmi ? (bmi<18.5?"Abaixo do peso":bmi<25?"Normal":bmi<30?"Sobrepeso":"Obeso") : "";
  const bmiPos     = bmi ? (bmi<18.5?8:bmi<25?30:bmi<30?60:82) : 50;

  const stats = [
    { icon:"📏", label:"Altura",   value: profile ? profile.height_cm+" cm" : "--" },
    { icon:"⚖️", label:"Peso",   value: profile ? profile.weight_kg+" kg" : "--" },
    { icon:"🎯", label:"Objetivo", value: profile?.goal || "--" },
    { icon:"💪", label:"Nível", value: profile?.experience || "--" },
    { icon:"📅", label:"Frequência", value: profile?.frequency || "--" },
    { icon:"💧", label:"Hidratação", value: profile?.water || "--" },
  ];

  return (
    <div style={{ flex:1, overflowY:"auto", background:"#f5f6f8" }} className="scroll-hide">
      <div style={{ background:"#fff", padding:"18px 20px 14px", textAlign:"center", borderBottom:"1px solid #f1f5f9" }}>
        <span style={{ fontSize:17, fontWeight:"700", color:"#0f172a" }}>Progresso</span>
      </div>
      <div style={{ padding:14 }}>
        {/* IMC card */}
        {bmi && (
          <div style={{ background:"#fff", borderRadius:20, padding:"18px 20px", marginBottom:12, boxShadow:"0 2px 8px rgba(0,0,0,0.06)" }}>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:12 }}>
              <div>
                <div style={{ fontSize:11, color:"#94a3b8", fontWeight:"700", textTransform:"uppercase", letterSpacing:"0.5px" }}>Seu IMC</div>
                <div style={{ fontSize:42, fontWeight:"900", color:bmiCatColor, lineHeight:1, marginTop:2 }}>{bmi}</div>
                <div style={{ fontSize:13, fontWeight:"600", color:bmiCatColor, marginTop:2 }}>{bmiLabel}</div>
              </div>
              <div style={{ fontSize:52 }}>📊</div>
            </div>
            <div style={{ position:"relative", height:10, borderRadius:99, background:"linear-gradient(to right,#60a5fa,#34d399,#facc15,#fb923c,#f87171)" }}>
              <div style={{ position:"absolute", top:"50%", left:bmiPos+"%", transform:"translate(-50%,-50%)", width:20, height:20, borderRadius:"50%", background:"#fff", border:"3px solid "+bmiCatColor, boxShadow:"0 2px 8px rgba(0,0,0,0.2)" }} />
            </div>
            <div style={{ display:"flex", justifyContent:"space-between", fontSize:10, color:"#94a3b8", marginTop:6 }}>
              <span>Abaixo</span><span>Normal</span><span>Sobrepeso</span><span>Obeso</span>
            </div>
          </div>
        )}

        {/* Stats grid */}
        <div className="stats-grid">
          {stats.map(s => (
            <div key={s.label} style={{ background:"#fff", borderRadius:16, padding:"14px", boxShadow:"0 1px 4px rgba(0,0,0,0.06)" }}>
              <div style={{ fontSize:26, marginBottom:6 }}>{s.icon}</div>
              <div style={{ fontSize:10, color:"#94a3b8", fontWeight:"700", textTransform:"uppercase", letterSpacing:"0.5px" }}>{s.label}</div>
              <div style={{ fontSize:13, fontWeight:"800", color:"#0f172a", marginTop:3, lineHeight:1.3 }}>{s.value}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── App Principal ────────────────────────────────────────────────────────────────
export default function MainApp({ profile, onReset }) {
  const [tab, setTab] = useState("plan");
  const tabs = [
    { id:"plan",     label:"Plano",     icon:"★" },
    { id:"workouts", label:"Treinos",   icon:"📋" },
    { id:"progress", label:"Progresso", icon:"📊" },
  ];
  return (
    <div style={{ display:"flex", flexDirection:"column", flex:1, overflow:"hidden" }}>
      <div style={{ flex:1, display:"flex", flexDirection:"column", overflow:"hidden" }}>
        {tab === "plan"     && <PlanTab />}
        {tab === "workouts" && <WorkoutsTab />}
        {tab === "progress" && <ProgressTab profile={profile} />}
      </div>
      <nav className="bottom-nav">
        {tabs.map(t => {
          const active = tab === t.id;
          return (
            <button key={t.id} className="nav-btn" onClick={() => setTab(t.id)}>
              <span style={{ fontSize:20, filter:active?"none":"grayscale(1) opacity(0.45)" }}>{t.icon}</span>
              <span style={{ fontSize:11, fontWeight:active?"700":"500", color:active?ACCENT:"#94a3b8" }}>{t.label}</span>
            </button>
          );
        })}
      </nav>
    </div>
  );
}
