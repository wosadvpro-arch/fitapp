import { useState } from "react";

const ACCENT = "#2563EB";

const steps = [
  { id: "gender", type: "single", question: "Qual é o seu gênero?",
    options: [
      { label: "Masculino",    icon: "♂️" },
      { label: "Feminino",     icon: "♀️" },
      { label: "Não Binário", icon: "⊕" },
    ]
  },
  { id: "current_body", type: "single", question: "Escolha seu tipo de corpo atual",
    options: [
      { label: "Magro",     desc: "IMC < 18.5 · Pouca gordura corporal", icon: "🔵" },
      { label: "Médio",     desc: "IMC 18.5–24.9 · Peso saudável",    icon: "🟢" },
      { label: "Sobrepeso", desc: "IMC > 25 · Acima do peso ideal",      icon: "🟠" },
    ]
  },
  { id: "goal", type: "single", question: "Qual é o seu objetivo principal?",
    options: [
      { label: "Perda de gordura",        icon: "🔥" },
      { label: "Ganho de massa muscular", icon: "💪" },
      { label: "Definição e tônus",       icon: "⚡" },
      { label: "Saúde e bem-estar",       icon: "❤️" },
    ]
  },
  { id: "experience", type: "single", question: "Qual é o seu nível de experiência?",
    options: [
      { label: "Iniciante",     desc: "Menos de 6 meses", icon: "🌱" },
      { label: "Intermediário", desc: "6 meses a 2 anos", icon: "📈" },
      { label: "Avançado",      desc: "Mais de 2 anos",   icon: "🏆" },
    ]
  },
  { id: "frequency", type: "single", question: "Quantas vezes por semana você quer treinar?",
    options: [
      { label: "2–3 vezes",      icon: "📅" },
      { label: "4–5 vezes",      icon: "📆" },
      { label: "6–7 vezes",      icon: "🗓️" },
      { label: "Decidir depois", icon: "🤔" },
    ]
  },
  { id: "target_areas", type: "multi", question: "Escolha suas zonas-alvo",
    subtitle: "Selecione todas que se aplicam",
    options: [
      { label: "Peito",      icon: "🫁" },
      { label: "Costas",     icon: "🔙" },
      { label: "Ombros",     icon: "💪" },
      { label: "Braços",     icon: "🦾" },
      { label: "Abdômen",    icon: "⚡" },
      { label: "Pernas",     icon: "🦵" },
      { label: "Glúteos",    icon: "🍑" },
      { label: "Corpo todo", icon: "🧍" },
    ]
  },
  { id: "duration", type: "single", question: "Quanto tempo você quer que seus treinos durem?",
    options: [
      { label: "10–20 minutos",   icon: "⏱️" },
      { label: "20–30 minutos",   icon: "🕐" },
      { label: "30–45 minutos",   icon: "🕑" },
      { label: "Sem preferência", icon: "🤷" },
    ]
  },
  { id: "age",           type: "age",           question: "Quantos anos você tem?" },
  { id: "height",        type: "height",        question: "Qual a sua altura?" },
  { id: "weight",        type: "weight",        question: "Qual é o seu peso atual?" },
  { id: "target_weight", type: "target_weight", question: "Qual é o seu peso alvo?" },
  { id: "water", type: "single", question: "Quanto de água você bebe diariamente?",
    options: [
      { label: "Só chá e café",    icon: "☕" },
      { label: "Menos de 2 copos", icon: "🥛" },
      { label: "2–6 copos",        icon: "💧" },
      { label: "7–8 copos",        icon: "🌊" },
      { label: "Mais de 10 copos", icon: "🏊" },
    ]
  },
  { id: "energy", type: "single", question: "Como estão seus níveis de energia durante o dia?",
    options: [
      { label: "Baixo e inconsistente",  icon: "😴" },
      { label: "Mantém-se firme",        icon: "😐" },
      { label: "Flutua ao longo do dia", icon: "〰️" },
      { label: "Alto o dia todo",        icon: "⚡" },
    ]
  },
  { id: "bmi_summary", type: "bmi_summary", question: "Resumo do seu perfil" },
];

function calcBMI(wKg, hCm) {
  if (!wKg || !hCm) return null;
  return (wKg / Math.pow(hCm / 100, 2)).toFixed(1);
}
function bmiCat(b) {
  const n = parseFloat(b);
  if (n < 18.5) return { label: "Abaixo do peso", color: "#3b82f6", pos: 8 };
  if (n < 25)   return { label: "Normal",         color: "#22c55e", pos: 30 };
  if (n < 30)   return { label: "Sobrepeso",      color: "#f97316", pos: 60 };
  return               { label: "Obeso",          color: "#ef4444", pos: 82 };
}

const BtnCircle = { width:52, height:52, borderRadius:"50%", border:"2px solid #e2e8f0", background:"#f8fafc", fontSize:26, fontWeight:"700", cursor:"pointer", color:"#0f172a" };

function UnitToggle({ options, value, onChange }) {
  return (
    <div style={{ display:"inline-flex", background:"#e2e8f0", borderRadius:99, padding:3, gap:2, marginBottom:16 }}>
      {options.map(o => (
        <button key={o} onClick={() => onChange(o)} style={{ padding:"7px 22px", borderRadius:99, border:"none", cursor:"pointer", fontSize:14, fontWeight:"700", background: value===o ? ACCENT : "transparent", color: value===o ? "#fff" : "#64748b", transition:"all 0.2s" }}>{o}</button>
      ))}
    </div>
  );
}

function NumberPicker({ value, onChange, min, max, step=1, unit="" }) {
  return (
    <div style={{ textAlign:"center" }}>
      <div style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:20 }}>
        <button onClick={() => onChange(Math.max(min, parseFloat((value - step).toFixed(1))))} style={BtnCircle}>−</button>
        <div>
          <span style={{ fontSize:72, fontWeight:"900", color:"#0f172a", letterSpacing:"-3px" }}>{value}</span>
          <span style={{ fontSize:20, color:"#64748b", marginLeft:6 }}>{unit}</span>
        </div>
        <button onClick={() => onChange(Math.min(max, parseFloat((value + step).toFixed(1))))} style={BtnCircle}>+</button>
      </div>
      <div style={{ display:"flex", justifyContent:"center", alignItems:"flex-end", gap:1.5, height:28, marginTop:12 }}>
        {Array.from({ length:31 }, (_, i) => i - 15).map(off => {
          const isMid = off === 0, isLbl = off % 5 === 0;
          return <div key={off} style={{ width:isMid?2.5:1, height:isMid?28:isLbl?18:10, background:isMid?ACCENT:isLbl?"#94a3b8":"#cbd5e1", borderRadius:2 }} />;
        })}
      </div>
    </div>
  );
}

function InfoCard({ emoji, title, body, bg="#f1f5f9" }) {
  return (
    <div style={{ background:bg, borderRadius:16, padding:"14px 16px", marginTop:18 }}>
      <div style={{ display:"flex", gap:10, alignItems:"flex-start" }}>
        <span style={{ fontSize:22, flexShrink:0 }}>{emoji}</span>
        <div>
          <p style={{ margin:0, fontWeight:"700", fontSize:14, color:"#0f172a" }}>{title}</p>
          <p style={{ margin:"3px 0 0", fontSize:12, color:"#64748b", lineHeight:1.5 }}>{body}</p>
        </div>
      </div>
    </div>
  );
}

export default function Onboarding({ onComplete }) {
  const [cur, setCur] = useState(0);
  const [ans, setAns] = useState({ age:30, height_cm:170, weight_kg:75, target_weight_kg:70, hu:"cm", wu:"kg" });
  const [done, setDone] = useState(false);

  const step = steps[cur];
  const progress = ((cur + 1) / steps.length) * 100;
  const wKg = ans.wu === "kg" ? ans.weight_kg : ans.weight_kg * 0.453592;
  const bmi = calcBMI(wKg, ans.height_cm);
  const cat = bmi ? bmiCat(bmi) : null;

  const isSel = (id, lbl) => step.type === "multi" ? (ans[id] || []).includes(lbl) : ans[id] === lbl;

  const pick = (lbl) => {
    if (step.type === "multi") {
      const p = ans[step.id] || [];
      setAns({ ...ans, [step.id]: p.includes(lbl) ? p.filter(x => x !== lbl) : [...p, lbl] });
    } else {
      setAns({ ...ans, [step.id]: lbl });
      setTimeout(next, 210);
    }
  };

  const next = () => { if (cur < steps.length - 1) { setCur(c => c + 1); } else { if (onComplete) onComplete(ans); else setDone(true); } };
  const back = () => cur > 0 && setCur(c => c - 1);
  const needBtn = ["multi","age","height","weight","target_weight","bmi_summary"].includes(step.type);
  const canNext = step.type === "multi" ? (ans[step.id] || []).length > 0 : true;

  const renderBody = () => {
    if (step.type === "single") return (
      <div style={{ display:"flex", flexDirection:"column", gap:10, marginTop:16 }}>
        {step.options.map(o => {
          const sel = isSel(step.id, o.label);
          return (
            <button key={o.label} onClick={() => pick(o.label)} className={`opt-btn${sel?" sel":""}`}>
              {o.icon && <span style={{ fontSize:22 }}>{o.icon}</span>}
              <div style={{ flex:1, textAlign:"left" }}>
                <div style={{ fontSize:15, fontWeight:"600", color:sel ? ACCENT : "#0f172a" }}>{o.label}</div>
                {o.desc && <div style={{ fontSize:12, color:"#94a3b8", marginTop:2 }}>{o.desc}</div>}
              </div>
              {sel && <span style={{ fontSize:18, color:ACCENT }}>✓</span>}
            </button>
          );
        })}
      </div>
    );

    if (step.type === "multi") return (
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10, marginTop:16 }}>
        {step.options.map(o => {
          const sel = isSel(step.id, o.label);
          return (
            <button key={o.label} onClick={() => pick(o.label)} className={`opt-btn grid${sel?" sel":""}`}>
              <span style={{ fontSize:26 }}>{o.icon}</span>
              <span style={{ fontSize:13, fontWeight:"600", color:sel ? ACCENT : "#0f172a", textAlign:"center" }}>{o.label}</span>
              {sel && <span style={{ fontSize:11, color:ACCENT, fontWeight:"800" }}>✓ selecionado</span>}
            </button>
          );
        })}
      </div>
    );

    if (step.type === "age") return (
      <div>
        {/* Valor selecionado em destaque */}
        <div style={{ textAlign:"center", marginBottom:8, marginTop:8 }}>
          <span style={{ fontSize:72, fontWeight:"900", color:"#0f172a", letterSpacing:"-3px" }}>{ans.age}</span>
          <span style={{ fontSize:18, color:"#94a3b8", marginLeft:8 }}>anos</span>
        </div>

        {/* Picker com scroll snap */}
        <div style={{ position:"relative", height:200, overflow:"hidden", margin:"0 0 4px" }}>
          {/* gradientes top/bottom */}
          <div style={{ position:"absolute", top:0, left:0, right:0, height:70, background:"linear-gradient(to bottom,#fafafa 40%,transparent)", zIndex:2, pointerEvents:"none" }} />
          <div style={{ position:"absolute", bottom:0, left:0, right:0, height:70, background:"linear-gradient(to top,#fafafa 40%,transparent)", zIndex:2, pointerEvents:"none" }} />
          {/* linha de selecao */}
          <div style={{ position:"absolute", top:"50%", left:24, right:24, transform:"translateY(-50%)", height:52, background:"#f1f5f9", borderRadius:14, zIndex:1 }} />
          {/* lista scrollavel */}
          <div
            style={{ overflowY:"scroll", height:"100%", display:"flex", flexDirection:"column", alignItems:"center", scrollSnapType:"y mandatory", scrollbarWidth:"none", msOverflowStyle:"none" }}
            onScroll={e => {
              const idx = Math.round(e.target.scrollTop / 52);
              const age = 16 + Math.max(0, Math.min(83, idx));
              if (age !== ans.age) setAns({ ...ans, age });
            }}
            ref={el => {
              if (el && !el._init) {
                el._init = true;
                el.scrollTop = (ans.age - 16) * 52;
              }
            }}
          >
            {/* padding top/bottom para centralizar primeiro e ultimo item */}
            <div style={{ height:74, flexShrink:0 }} />
            {Array.from({ length:84 }, (_, i) => i + 16).map(a => (
              <div
                key={a}
                onClick={e => {
                  const el = e.target.closest("[data-scroll]");
                  if (el) el.scrollTop = (a - 16) * 52;
                  setAns({ ...ans, age: a });
                }}
                style={{ height:52, flexShrink:0, display:"flex", alignItems:"center", justifyContent:"center", scrollSnapAlign:"center", cursor:"pointer", width:"100%", zIndex:3, position:"relative" }}
              >
                <span style={{ fontSize: a===ans.age ? 28 : 20, fontWeight: a===ans.age ? "800" : "400", color: a===ans.age ? "#0f172a" : "#94a3b8", transition:"all 0.15s", userSelect:"none" }}>
                  {a}
                </span>
              </div>
            ))}
            <div style={{ height:74, flexShrink:0 }} />
          </div>
        </div>

        {/* Botoes +/- para ajuste fino */}
        <div style={{ display:"flex", justifyContent:"center", gap:16, marginBottom:8 }}>
          <button onClick={() => setAns({ ...ans, age: Math.max(16, ans.age - 1) })} style={{ ...BtnCircle, width:44, height:44, fontSize:22 }}>−</button>
          <button onClick={() => setAns({ ...ans, age: Math.min(99, ans.age + 1) })} style={{ ...BtnCircle, width:44, height:44, fontSize:22 }}>+</button>
        </div>

        <InfoCard emoji="☝️" title="Pedimos sua idade para ajustes no seu plano pessoal." body="Pessoas mais velhas tendem a ter distribuição de gordura diferente com o mesmo IMC." />
      </div>
    );

    if (step.type === "height") {
      const isCm = ans.hu === "cm";
      const ft   = Math.floor(ans.height_cm / 30.48);
      const inch = Math.round((ans.height_cm / 2.54) % 12);
      return (
        <div style={{ textAlign:"center" }}>
          <div style={{ display:"flex", justifyContent:"center" }}>
            <UnitToggle options={["cm","ft"]} value={ans.hu} onChange={u => setAns({ ...ans, hu:u })} />
          </div>
          {isCm
            ? <NumberPicker value={ans.height_cm} onChange={v => setAns({ ...ans, height_cm:v })} min={140} max={220} step={1} unit="cm" />
            : <div style={{ padding:"20px 0" }}>
                <span style={{ fontSize:72, fontWeight:"900", color:"#0f172a" }}>{ft}</span>
                <span style={{ fontSize:22, color:"#64748b" }}> ft </span>
                <span style={{ fontSize:72, fontWeight:"900", color:"#0f172a" }}>{inch}</span>
                <span style={{ fontSize:22, color:"#64748b" }}> in</span>
                <div style={{ display:"flex", justifyContent:"center", gap:20, marginTop:16 }}>
                  <button onClick={() => setAns({ ...ans, height_cm:Math.max(140, ans.height_cm-1) })} style={BtnCircle}>−</button>
                  <button onClick={() => setAns({ ...ans, height_cm:Math.min(220, ans.height_cm+1) })} style={BtnCircle}>+</button>
                </div>
              </div>
          }
          <InfoCard emoji="☝️" title="Calculando seu Índice de Massa Corporal" body="O IMC é usado para avaliar riscos de saúde e personalizar seu plano de treino." />
        </div>
      );
    }

    if (step.type === "weight") {
      const isKg2 = ans.wu === "kg";
      const disp  = isKg2 ? ans.weight_kg : parseFloat((ans.weight_kg * 2.20462).toFixed(1));
      return (
        <div style={{ textAlign:"center" }}>
          <div style={{ display:"flex", justifyContent:"center" }}>
            <UnitToggle options={["kg","lb"]} value={ans.wu} onChange={u => setAns({ ...ans, wu:u })} />
          </div>
          <NumberPicker value={disp} onChange={v => setAns({ ...ans, weight_kg: isKg2 ? v : parseFloat((v/2.20462).toFixed(1)) })} min={isKg2?30:66} max={isKg2?200:440} step={isKg2?1:0.5} unit={ans.wu} />
          {bmi && cat && <InfoCard emoji="❗" bg="#fff7ed" title={"Seu IMC é " + bmi + " — " + cat.label} body="Usaremos seu índice para personalizar um programa que atenda às suas necessidades." />}
        </div>
      );
    }

    if (step.type === "target_weight") {
      const isKg2 = ans.wu === "kg";
      const disp  = isKg2 ? ans.target_weight_kg : parseFloat((ans.target_weight_kg * 2.20462).toFixed(1));
      const cur2  = isKg2 ? ans.weight_kg : parseFloat((ans.weight_kg * 2.20462).toFixed(1));
      const diff  = parseFloat((cur2 - disp).toFixed(1));
      return (
        <div style={{ textAlign:"center" }}>
          <NumberPicker value={disp} onChange={v => setAns({ ...ans, target_weight_kg: isKg2 ? v : parseFloat((v/2.20462).toFixed(1)) })} min={isKg2?30:66} max={isKg2?200:440} step={isKg2?1:0.5} unit={ans.wu} />
          {diff > 0 && <InfoCard emoji="🏆" bg="#f0fdf4" title={"Meta: perder " + diff + " " + ans.wu} body="Perda gradual e consistente é a forma mais saudável e duradoura." />}
          {diff < 0 && <InfoCard emoji="💪" bg="#eff6ff" title={"Meta: ganhar " + Math.abs(diff) + " " + ans.wu} body="Ganho de massa muscular com treino progressivo e alimentação adequada." />}
          {diff === 0 && <InfoCard emoji="✅" bg="#f0fdf4" title="Manutenção de peso" body="Vamos focar em composição corporal, saúde e bem-estar geral." />}
        </div>
      );
    }

    if (step.type === "bmi_summary") {
      const pos = cat ? cat.pos : 50;
      const rows = [
        { lbl:"Objetivo",     val: ans.goal || "—" },
        { lbl:"Experiência",  val: ans.experience || "—" },
        { lbl:"Frequência",   val: ans.frequency || "—" },
        { lbl:"Duração",      val: ans.duration || "—" },
        { lbl:"Hidratação",   val: ans.water || "—" },
        { lbl:"Energia",      val: ans.energy || "—" },
      ];
      return (
        <div>
          <div style={{ marginBottom:24 }}>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:10 }}>
              <span style={{ fontSize:13, color:"#64748b", fontWeight:"500" }}>IMC calculado</span>
              <span style={{ fontSize:14, fontWeight:"800", color:cat ? cat.color : "#0f172a" }}>{cat ? cat.label : ""} — {bmi}</span>
            </div>
            <div style={{ position:"relative", height:14, borderRadius:99, background:"linear-gradient(to right,#60a5fa,#34d399,#facc15,#fb923c,#f87171)" }}>
              <div style={{ position:"absolute", bottom:20, left:pos+"%", transform:"translateX(-50%)", background:ACCENT, color:"#fff", borderRadius:8, padding:"4px 10px", fontSize:12, fontWeight:"800", whiteSpace:"nowrap", boxShadow:"0 2px 8px rgba(37,99,235,0.35)" }}>
                Você — {bmi}
              </div>
              <div style={{ position:"absolute", top:"50%", left:pos+"%", transform:"translate(-50%,-50%)", width:22, height:22, borderRadius:"50%", background:"#fff", border:"3px solid "+(cat ? cat.color : ACCENT), boxShadow:"0 2px 8px rgba(0,0,0,0.2)" }} />
            </div>
            <div style={{ display:"flex", justifyContent:"space-between", fontSize:11, color:"#94a3b8", marginTop:8 }}>
              <span>Abaixo</span><span>Normal</span><span>Sobrepeso</span><span>Obeso</span>
            </div>
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:8, marginBottom:16 }}>
            {[
              { icon:"📐", lbl:"Altura", val:ans.height_cm+" cm" },
              { icon:"⚖️", lbl:"Peso",   val:ans.weight_kg+" kg" },
              { icon:"🎂", lbl:"Idade",  val:ans.age+" anos" },
            ].map(r => (
              <div key={r.lbl} style={{ background:"#f8fafc", borderRadius:14, padding:"12px 10px", textAlign:"center" }}>
                <div style={{ fontSize:20, marginBottom:4 }}>{r.icon}</div>
                <div style={{ fontSize:11, color:"#94a3b8", fontWeight:"600" }}>{r.lbl}</div>
                <div style={{ fontSize:13, fontWeight:"800", color:"#0f172a", marginTop:2 }}>{r.val}</div>
              </div>
            ))}
          </div>
          <div style={{ background:"#f8fafc", borderRadius:20, padding:16, marginBottom:16 }}>
            {rows.map((r, i) => (
              <div key={r.lbl} style={{ display:"flex", alignItems:"center", gap:12, padding:"9px 0", borderBottom:i<rows.length-1?"1px solid #e2e8f0":"none" }}>
                <div style={{ flex:1 }}>
                  <div style={{ fontSize:11, color:"#94a3b8", fontWeight:"700", textTransform:"uppercase", letterSpacing:"0.4px" }}>{r.lbl}</div>
                  <div style={{ fontSize:13, fontWeight:"700", color:"#0f172a", marginTop:1 }}>{r.val}</div>
                </div>
              </div>
            ))}
          </div>
          {cat && cat.label !== "Normal"
            ? <InfoCard emoji="⚠️" bg="#fff7ed" title="Atenção ao seu IMC" body="Um IMC fora da faixa normal pode estar associado a riscos cardiovasculares. Seu plano será 100% personalizado." />
            : <InfoCard emoji="✅" bg="#f0fdf4" title="IMC saudável!" body="Vamos focar em desempenho, composição corporal e longevidade." />
          }
        </div>
      );
    }
    return null;
  };

  if (done) return (
    <div style={{ flex:1, overflowY:"auto" }} className="scroll-hide">
      <div style={{ padding:"40px 24px 32px" }}>
      <div style={{ flex:1, overflowY:"auto", padding:"40px 24px" }}>
        <div style={{ textAlign:"center", marginBottom:28 }}>
          <div style={{ fontSize:72 }}>🏋️</div>
          <h2 style={{ fontSize:28, fontWeight:"900", color:"#0f172a", margin:"12px 0 4px" }}>Perfil criado!</h2>
          <p style={{ color:"#64748b", fontSize:14, margin:0 }}>Seu plano personalizado está pronto.</p>
        </div>
        <div style={{ background:"#f1f5f9", borderRadius:20, padding:20, display:"flex", flexDirection:"column", gap:12 }}>
          <div>
            <div style={{ fontSize:11, color:"#94a3b8", fontWeight:"700", textTransform:"uppercase", letterSpacing:"0.5px" }}>Medidas</div>
            <div style={{ fontSize:14, fontWeight:"700", color:"#0f172a", marginTop:2 }}>{ans.height_cm}cm · {ans.weight_kg}kg · {ans.age} anos</div>
          </div>
          {bmi && <div>
            <div style={{ fontSize:11, color:"#94a3b8", fontWeight:"700", textTransform:"uppercase", letterSpacing:"0.5px" }}>IMC</div>
            <div style={{ fontSize:14, fontWeight:"700", color:cat ? cat.color : "#0f172a", marginTop:2 }}>{bmi} — {cat ? cat.label : ""}</div>
          </div>}
          {steps.filter(s => s.type === "single" || s.type === "multi").map(s => {
            const v = ans[s.id]; if (!v) return null;
            return (
              <div key={s.id} style={{ borderTop:"1px solid #e2e8f0", paddingTop:10 }}>
                <div style={{ fontSize:11, color:"#94a3b8", fontWeight:"700", textTransform:"uppercase", letterSpacing:"0.5px" }}>{s.question.replace("?","")}</div>
                <div style={{ fontSize:14, fontWeight:"700", color:"#0f172a", marginTop:2 }}>{Array.isArray(v) ? v.join(", ") : v}</div>
              </div>
            );
          })}
        </div>
        <button className="btn-primary" style={{ marginTop:24 }} onClick={() => { setDone(false); setCur(0); setAns({ age:30, height_cm:170, weight_kg:75, target_weight_kg:70, hu:"cm", wu:"kg" }); }}>
          Recomeçar
        </button>
      </div>
      </div>
    </div>
  );

  return (
    <>
      <div style={{ display:"flex", alignItems:"center", gap:10, padding:"20px 20px 0", flexShrink:0 }}>
        <button onClick={back} style={{ background:"none", border:"none", cursor:"pointer", padding:"4px 6px 4px 0", minWidth:28 }}>
          {cur > 0 && <span style={{ fontSize:20, color:"#64748b" }}>←</span>}
        </button>
        <div style={{ flex:1, height:4, background:"#e2e8f0", borderRadius:99, overflow:"hidden" }}>
          <div style={{ height:"100%", background:ACCENT, borderRadius:99, width:progress+"%", transition:"width 0.4s cubic-bezier(0.4,0,0.2,1)" }} />
        </div>
        <span style={{ fontSize:12, color:"#94a3b8", fontWeight:"600", minWidth:36, textAlign:"right" }}>{cur+1}/{steps.length}</span>
      </div>
      <div style={{ flex:1, overflowY:"auto", padding:"16px 24px 24px" }} className="scroll-hide">
        <h1 style={S.q}>{step.question}</h1>
        {step.subtitle && <p style={{ fontSize:13, color:"#94a3b8", margin:"0 0 8px" }}>{step.subtitle}</p>}
        {renderBody()}
      </div>
      {needBtn && (
        <div style={{ padding:"0 24px", paddingBottom:"max(28px, env(safe-area-inset-bottom))", paddingTop:12, flexShrink:0 }}>
          <button className="btn-primary" style={{ opacity:canNext?1:0.4 }} onClick={canNext ? next : undefined} disabled={!canNext}>
            {step.type === "bmi_summary" ? "Criar meu plano →" : "Continuar"}
          </button>
        </div>
      )}
    </>
  );
}

const S = {
  q:   { fontSize:24, fontWeight:"900", color:"#0f172a", lineHeight:1.25, marginBottom:2, letterSpacing:"-0.5px" },
  opt: { background:"#f8fafc", border:"2px solid transparent", borderRadius:16, cursor:"pointer", textAlign:"left", transition:"all 0.15s", width:"100%" },
  optSel: { background:"#EFF6FF", borderColor:ACCENT },
};
