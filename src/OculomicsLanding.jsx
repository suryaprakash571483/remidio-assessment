import { useState, useEffect, useRef } from "react";


//using internal css
const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:ital,wght@0,300;0,400;0,500;1,300&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --bg: #040b14;
    --surface: #071525;
    --surface2: #0c1f35;
    --accent: #00c8ff;
    --accent2: #00ff99;
    --accent3: #ff6b35;
    --text: #e8f4ff;
    --text-muted: #7a9ab8;
    --border: rgba(0,200,255,0.15);
    --glow: 0 0 40px rgba(0,200,255,0.25);
  }

  html { scroll-behavior: smooth; }

  body {
    background: var(--bg);
    color: var(--text);
    font-family: 'DM Sans', sans-serif;
    overflow-x: hidden;
  }

  .font-display { font-family: 'Syne', sans-serif; }

  /* NAV */
  .nav {
    position: fixed; top: 0; left: 0; right: 0; z-index: 100;
    display: flex; align-items: center; justify-content: space-between;
    padding: 20px 60px;
    background: rgba(4,11,20,0.85);
    backdrop-filter: blur(20px);
    border-bottom: 1px solid var(--border);
    transition: all 0.3s;
  }
  .nav-logo {
    font-family: 'Syne', sans-serif;
    font-size: 22px; font-weight: 800;
    letter-spacing: -0.5px;
  }
  .nav-logo span { color: var(--accent); }
  .nav-links { display: flex; gap: 36px; }
  .nav-link {
    color: var(--text-muted); font-size: 14px; font-weight: 500;
    text-decoration: none; letter-spacing: 0.5px;
    transition: color 0.2s;
    cursor: pointer; background: none; border: none;
  }
  .nav-link:hover { color: var(--accent); }
  .nav-cta {
    background: var(--accent); color: var(--bg);
    border: none; padding: 10px 24px; border-radius: 6px;
    font-family: 'Syne', sans-serif; font-weight: 700; font-size: 13px;
    letter-spacing: 0.5px; cursor: pointer;
    transition: all 0.2s;
  }
  .nav-cta:hover { background: #33d4ff; transform: translateY(-1px); }

  /* HERO */
  .hero {
    min-height: 100vh;
    display: flex; align-items: center; justify-content: center;
    position: relative; overflow: hidden;
    padding: 120px 60px 80px;
  }
  .hero-bg {
    position: absolute; inset: 0;
    background: radial-gradient(ellipse 80% 60% at 50% 40%, rgba(0,80,140,0.35) 0%, transparent 70%),
                radial-gradient(ellipse 40% 40% at 80% 20%, rgba(0,200,255,0.08) 0%, transparent 60%);
  }
  .retina-ring {
    position: absolute;
    border-radius: 50%;
    border: 1px solid rgba(0,200,255,0.12);
    animation: pulse-ring 4s ease-in-out infinite;
  }
  @keyframes pulse-ring {
    0%, 100% { transform: scale(1); opacity: 0.5; }
    50% { transform: scale(1.05); opacity: 1; }
  }
  .hero-content {
    max-width: 720px;
    position: relative; z-index: 2;
    text-align: center;
  }
  .hero-badge {
    display: inline-flex; align-items: center; gap: 8px;
    background: rgba(0,200,255,0.1);
    border: 1px solid rgba(0,200,255,0.3);
    border-radius: 100px; padding: 6px 16px;
    font-size: 12px; font-weight: 500; letter-spacing: 1px;
    color: var(--accent); text-transform: uppercase;
    margin-bottom: 28px;
    animation: fadeUp 0.8s ease both;
  }
  .badge-dot {
    width: 6px; height: 6px; border-radius: 50%;
    background: var(--accent2);
    animation: blink 2s ease-in-out infinite;
  }
  @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0.3} }
  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
  .hero-title {
    font-family: 'Syne', sans-serif;
    font-size: clamp(42px, 6vw, 76px);
    font-weight: 800; line-height: 1.05;
    letter-spacing: -2px;
    margin-bottom: 24px;
    animation: fadeUp 0.8s 0.15s ease both;
  }
  .hero-title .highlight { color: var(--accent); }
  .hero-title .highlight2 { color: var(--accent2); }
  .hero-sub {
    font-size: 18px; font-weight: 300; line-height: 1.7;
    color: var(--text-muted); max-width: 560px; margin: 0 auto 44px;
    animation: fadeUp 0.8s 0.3s ease both;
  }
  .hero-actions {
    display: flex; gap: 16px; justify-content: center; flex-wrap: wrap;
    animation: fadeUp 0.8s 0.45s ease both;
  }
  .btn-primary {
    background: var(--accent); color: var(--bg);
    border: none; padding: 15px 32px; border-radius: 8px;
    font-family: 'Syne', sans-serif; font-weight: 700; font-size: 15px;
    cursor: pointer; transition: all 0.25s;
    box-shadow: 0 0 30px rgba(0,200,255,0.35);
  }
  .btn-primary:hover { transform: translateY(-2px); box-shadow: 0 0 50px rgba(0,200,255,0.5); }
  .btn-secondary {
    background: transparent; color: var(--text);
    border: 1px solid var(--border); padding: 15px 32px; border-radius: 8px;
    font-family: 'Syne', sans-serif; font-weight: 600; font-size: 15px;
    cursor: pointer; transition: all 0.25s;
  }
  .btn-secondary:hover { border-color: var(--accent); color: var(--accent); }
  .hero-stats {
    display: flex; gap: 48px; justify-content: center; margin-top: 64px;
    flex-wrap: wrap;
    animation: fadeUp 0.8s 0.6s ease both;
  }
  .stat { text-align: center; }
  .stat-num {
    font-family: 'Syne', sans-serif; font-size: 36px; font-weight: 800;
    color: var(--accent); line-height: 1;
  }
  .stat-label { font-size: 12px; color: var(--text-muted); margin-top: 4px; letter-spacing: 0.5px; }

  /* RETINA SCAN */
  .retina-section {
    padding: 100px 60px;
    position: relative; overflow: hidden;
  }
  .section-label {
    font-size: 11px; font-weight: 600; letter-spacing: 2px;
    color: var(--accent); text-transform: uppercase; margin-bottom: 16px;
  }
  .section-title {
    font-family: 'Syne', sans-serif;
    font-size: clamp(32px, 4vw, 52px);
    font-weight: 800; line-height: 1.1; letter-spacing: -1.5px;
    margin-bottom: 20px;
  }
  .section-desc {
    font-size: 16px; color: var(--text-muted); line-height: 1.75;
    max-width: 500px;
  }
  .retina-layout {
    display: grid; grid-template-columns: 1fr 1fr; gap: 80px;
    align-items: center; max-width: 1200px; margin: 0 auto;
  }
  .retina-visual {
    position: relative; display: flex;
    align-items: center; justify-content: center;
  }
  .eye-container {
    position: relative; width: 380px; height: 380px;
  }
  .eye-outer {
    width: 380px; height: 380px; border-radius: 50%;
    background: radial-gradient(circle at 35% 35%, #1a4060, #071525 70%);
    border: 2px solid rgba(0,200,255,0.2);
    position: absolute;
    box-shadow: 0 0 60px rgba(0,200,255,0.15), inset 0 0 40px rgba(0,0,0,0.5);
    overflow: hidden;
  }
  .retina-vessels {
    position: absolute; inset: 0;
    background: 
      radial-gradient(ellipse 2px 80px at 50% 50%, rgba(255,100,60,0.6) 0%, transparent 100%),
      radial-gradient(ellipse 80px 2px at 50% 50%, rgba(255,100,60,0.6) 0%, transparent 100%),
      radial-gradient(ellipse 2px 60px at 60% 40%, rgba(200,80,40,0.4) 0%, transparent 100%),
      radial-gradient(ellipse 60px 2px at 40% 60%, rgba(200,80,40,0.4) 0%, transparent 100%);
  }
  .optic-disc {
    position: absolute; width: 60px; height: 60px;
    border-radius: 50%;
    background: radial-gradient(circle, #ffb060 0%, #ff8030 60%, transparent 100%);
    top: 50%; left: 50%; transform: translate(-50%, -50%);
    box-shadow: 0 0 20px rgba(255,160,80,0.6);
  }
  .scan-line {
    position: absolute; left: 0; right: 0; height: 2px;
    background: linear-gradient(90deg, transparent, var(--accent), transparent);
    animation: scan 3s ease-in-out infinite;
  }
  @keyframes scan {
    0% { top: 10%; opacity: 0; }
    10% { opacity: 1; }
    90% { opacity: 1; }
    100% { top: 90%; opacity: 0; }
  }
  .ai-marker {
    position: absolute; width: 24px; height: 24px;
    border: 2px solid var(--accent2);
    border-radius: 4px;
    animation: marker-pulse 2s ease-in-out infinite;
  }
  @keyframes marker-pulse {
    0%,100% { box-shadow: 0 0 0 0 rgba(0,255,153,0.5); }
    50% { box-shadow: 0 0 0 8px rgba(0,255,153,0); }
  }
  .marker-label {
    position: absolute; font-size: 10px; font-weight: 600;
    color: var(--accent2); white-space: nowrap; letter-spacing: 0.5px;
  }

  /* DISEASES */
  .conditions-section {
    padding: 100px 60px;
    background: linear-gradient(180deg, transparent, rgba(0,30,60,0.3), transparent);
  }
  .conditions-grid {
    display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px;
    max-width: 1100px; margin: 60px auto 0;
  }
  .condition-card {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 16px; padding: 32px;
    cursor: pointer; transition: all 0.3s;
    position: relative; overflow: hidden;
  }
  .condition-card::before {
    content: ''; position: absolute; inset: 0;
    background: linear-gradient(135deg, rgba(0,200,255,0.05), transparent);
    opacity: 0; transition: opacity 0.3s;
  }
  .condition-card:hover {
    border-color: rgba(0,200,255,0.4);
    transform: translateY(-4px);
    box-shadow: var(--glow);
  }
  .condition-card:hover::before { opacity: 1; }
  .condition-card.active {
    border-color: var(--accent);
    box-shadow: var(--glow);
  }
  .card-icon {
    width: 48px; height: 48px; border-radius: 12px;
    display: flex; align-items: center; justify-content: center;
    font-size: 24px; margin-bottom: 20px;
  }
  .card-title {
    font-family: 'Syne', sans-serif; font-size: 18px; font-weight: 700;
    margin-bottom: 10px;
  }
  .card-desc { font-size: 14px; color: var(--text-muted); line-height: 1.6; }
  .card-accuracy {
    margin-top: 20px; padding-top: 16px; border-top: 1px solid var(--border);
    display: flex; align-items: center; justify-content: space-between;
  }
  .accuracy-label { font-size: 11px; color: var(--text-muted); letter-spacing: 0.5px; }
  .accuracy-val {
    font-family: 'Syne', sans-serif; font-size: 20px; font-weight: 800;
    color: var(--accent2);
  }

  /* HOW IT WORKS */
  .how-section { padding: 100px 60px; }
  .how-steps {
    display: grid; grid-template-columns: repeat(4, 1fr); gap: 24px;
    max-width: 1100px; margin: 60px auto 0;
    position: relative;
  }
  .how-steps::before {
    content: ''; position: absolute;
    top: 40px; left: 12.5%; right: 12.5%;
    height: 1px; background: linear-gradient(90deg, transparent, var(--accent), var(--accent2), var(--accent), transparent);
    z-index: 0;
  }
  .step-card {
    background: var(--surface); border: 1px solid var(--border);
    border-radius: 16px; padding: 32px 24px; text-align: center;
    position: relative; z-index: 1; transition: all 0.3s;
  }
  .step-card:hover { border-color: rgba(0,200,255,0.4); transform: translateY(-4px); }
  .step-num {
    width: 48px; height: 48px; border-radius: 50%;
    background: var(--surface2);
    border: 2px solid var(--accent);
    display: flex; align-items: center; justify-content: center;
    font-family: 'Syne', sans-serif; font-weight: 800; font-size: 16px;
    color: var(--accent); margin: 0 auto 20px;
  }
  .step-title { font-family: 'Syne', sans-serif; font-weight: 700; font-size: 16px; margin-bottom: 10px; }
  .step-desc { font-size: 13px; color: var(--text-muted); line-height: 1.6; }

  /* PROOF / TRUST */
  .trust-section {
    padding: 100px 60px;
    background: var(--surface);
    border-top: 1px solid var(--border);
    border-bottom: 1px solid var(--border);
  }
  .trust-grid {
    display: grid; grid-template-columns: 1fr 1fr; gap: 60px;
    max-width: 1100px; margin: 60px auto 0; align-items: start;
  }
  .trust-item { display: flex; gap: 20px; margin-bottom: 32px; }
  .trust-icon {
    width: 44px; height: 44px; flex-shrink: 0;
    background: rgba(0,200,255,0.1); border: 1px solid var(--border);
    border-radius: 10px; display: flex; align-items: center; justify-content: center; font-size: 20px;
  }
  .trust-text h4 { font-family: 'Syne', sans-serif; font-weight: 700; font-size: 15px; margin-bottom: 6px; }
  .trust-text p { font-size: 13px; color: var(--text-muted); line-height: 1.6; }
  .study-card {
    background: var(--bg); border: 1px solid var(--border);
    border-radius: 16px; padding: 32px;
  }
  .study-header { display: flex; align-items: center; gap: 12px; margin-bottom: 20px; }
  .study-badge {
    background: rgba(0,255,153,0.1); border: 1px solid rgba(0,255,153,0.3);
    color: var(--accent2); font-size: 11px; font-weight: 600;
    padding: 4px 12px; border-radius: 100px; letter-spacing: 0.5px;
  }
  .study-title { font-family: 'Syne', sans-serif; font-size: 16px; font-weight: 700; }
  .study-stat { margin-bottom: 16px; }
  .stat-bar-label {
    display: flex; justify-content: space-between; margin-bottom: 6px;
    font-size: 13px; color: var(--text-muted);
  }
  .stat-bar-track {
    height: 6px; background: var(--surface2); border-radius: 100px; overflow: hidden;
  }
  .stat-bar-fill {
    height: 100%; border-radius: 100px;
    background: linear-gradient(90deg, var(--accent), var(--accent2));
    transition: width 1.5s ease;
  }

  /* CTA */
  .cta-section {
    padding: 120px 60px; text-align: center;
    position: relative; overflow: hidden;
  }
  .cta-glow {
    position: absolute; inset: 0;
    background: radial-gradient(ellipse 60% 60% at 50% 50%, rgba(0,80,140,0.4), transparent);
    pointer-events: none;
  }
  .cta-title {
    font-family: 'Syne', sans-serif;
    font-size: clamp(36px, 5vw, 64px);
    font-weight: 800; letter-spacing: -2px; line-height: 1.05;
    margin-bottom: 24px;
  }
  .cta-sub { font-size: 18px; color: var(--text-muted); margin-bottom: 44px; }
  .cta-buttons { display: flex; gap: 16px; justify-content: center; flex-wrap: wrap; }

  /* FOOTER */
  .footer {
    padding: 40px 60px;
    border-top: 1px solid var(--border);
    display: flex; align-items: center; justify-content: space-between;
    flex-wrap: wrap; gap: 16px;
  }
  .footer-logo { font-family: 'Syne', sans-serif; font-weight: 800; font-size: 18px; }
  .footer-logo span { color: var(--accent); }
  .footer-copy { font-size: 13px; color: var(--text-muted); }

  /* RESPONSIVE */
  @media (max-width: 900px) {
    .nav { padding: 16px 24px; }
    .nav-links { display: none; }
    .hero { padding: 100px 24px 60px; }
    .retina-layout { grid-template-columns: 1fr; gap: 40px; }
    .eye-container { width: 260px; height: 260px; }
    .eye-outer { width: 260px; height: 260px; }
    .conditions-grid { grid-template-columns: 1fr; }
    .how-steps { grid-template-columns: 1fr 1fr; }
    .how-steps::before { display: none; }
    .trust-grid { grid-template-columns: 1fr; }
    .retina-section, .conditions-section, .how-section, .trust-section, .cta-section { padding: 60px 24px; }
    .footer { padding: 32px 24px; flex-direction: column; text-align: center; }
  }
`;


//this json file is imported from online
const conditions = [
  {
    icon: "❤️",
    bg: "rgba(255,80,80,0.1)",
    title: "Cardiovascular Disease",
    desc: "Retinal vasculature changes mirror coronary artery disease risk. Our AI detects microvascular damage years before clinical symptoms.",
    accuracy: "94.2%",
  },
  {
    icon: "🧠",
    bg: "rgba(120,80,255,0.1)",
    title: "Alzheimer's Risk",
    desc: "Beta-amyloid deposits appear in retinal tissue. We identify early neurodegeneration markers from a standard fundus image.",
    accuracy: "87.6%",
  },
  {
    icon: "⚡",
    bg: "rgba(0,200,255,0.1)",
    title: "Stroke Prediction",
    desc: "Retinal artery-vein ratio changes and emboli detected by deep learning map directly to cerebrovascular risk scores.",
    accuracy: "91.8%",
  },
  {
    icon: "🩸",
    bg: "rgba(255,160,0,0.1)",
    title: "Diabetic Retinopathy",
    desc: "Grade 0–4 classification with lesion segmentation, enabling automated screening at population scale.",
    accuracy: "97.1%",
  },
  {
    icon: "👁️",
    bg: "rgba(0,255,153,0.1)",
    title: "Glaucoma Detection",
    desc: "Optic disc morphology and RNFL thinning patterns analyzed for early glaucoma detection before vision loss occurs.",
    accuracy: "95.4%",
  },
  {
    icon: "🫀",
    bg: "rgba(255,100,50,0.1)",
    title: "Hypertension Staging",
    desc: "Arteriovenous nicking, flame hemorrhages, and copper wiring patterns automatically staged to Keith-Wagener classification.",
    accuracy: "92.9%",
  },
];

const steps = [
  { num: "01", title: "Image Capture", desc: "Standard non-mydriatic fundus camera. No dilation. 45-second patient workflow." },
  { num: "02", title: "AI Analysis", desc: "Multi-modal deep learning models trained on 3M+ annotated retinal images from 48 countries." },
  { num: "03", title: "Risk Stratification", desc: "Explainable AI generates heatmaps, biomarker scores, and ICD-10 aligned risk reports." },
  { num: "04", title: "Clinical Integration", desc: "HL7 FHIR & DICOM native. EHR push in under 90 seconds. HIPAA & CE Mark certified." },
];

const trustItems = [
  { icon: "🏥", title: "CE Mark & FDA Breakthrough Device", desc: "Oculomics AI has received FDA Breakthrough Device designation for early Alzheimer's screening." },
  { icon: "📊", title: "Published in Nature Medicine", desc: "Peer-reviewed validation across 14 independent cohorts with 280,000+ patient records." },
  { icon: "🔒", title: "SOC 2 Type II & HIPAA Compliant", desc: "End-to-end encrypted. Zero PHI leaves your institution without explicit consent controls." },
  { icon: "🌐", title: "Deployed in 200+ Clinics", desc: "Live in NHS, Kaiser Permanente, and leading academic medical centers across 3 continents." },
];

const studyStats = [
  { label: "Sensitivity — CVD Risk", val: 94 },
  { label: "Specificity — Alzheimer's", val: 88 },
  { label: "AUC — Stroke Prediction", val: 92 },
];

export default function Remidio() {
  const [activeCard, setActiveCard] = useState(null);
  const [barsVisible, setBarsVisible] = useState(false);
  const trustRef = useRef(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setBarsVisible(true); },
      { threshold: 0.3 }
    );
    if (trustRef.current) obs.observe(trustRef.current);
    return () => obs.disconnect();
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <style>{styles}</style>

      {/* NAV */}
      <nav className="nav">
        <div className="nav-logo font-display">
          Oculo<span>ms</span>
        </div>
        <div className="nav-links">
          {["platform", "conditions", "how-it-works", "research"].map((s) => (
            <button key={s} className="nav-link" onClick={() => scrollTo(s)}>
              {s.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())}
            </button>
          ))}
        </div>
        <button className="nav-cta" onClick={() => scrollTo("contact")}>
          Request Demo
        </button>
      </nav>

      {/* HERO */}
      <section className="hero" id="platform">
        <div className="hero-bg" />
        {[320, 480, 640].map((s) => (
          <div
            key={s}
            className="retina-ring"
            style={{
              width: s, height: s,
              top: "50%", left: "50%",
              transform: "translate(-50%, -50%)",
              animationDelay: `${s / 400}s`,
            }}
          />
        ))}
        <div className="hero-content">
          <div className="hero-badge">
            <span className="badge-dot" />
            AI-Powered Oculomics Platform
          </div>
          <h1 className="hero-title font-display">
            The Eye Is a<br />
            <span className="highlight">Window Into</span><br />
            <span className="highlight2">Systemic Health</span>
          </h1>
          <p className="hero-sub">
            One retinal scan. Seconds of AI analysis. Early detection of cardiovascular disease,
            stroke, Alzheimer's, and more — before symptoms appear.
          </p>
          <div className="hero-actions">
            <button className="btn-primary" onClick={() => scrollTo("how-it-works")}>
              See How It Works
            </button>
            <button className="btn-secondary" onClick={() => scrollTo("research")}>
              View Clinical Evidence
            </button>
          </div>
          <div className="hero-stats">
            {[
              { num: "97%", label: "Diagnostic Accuracy" },
              { num: "6", label: "Disease Pathways" },
              { num: "3M+", label: "Training Images" },
              { num: "90s", label: "Report Turnaround" },
            ].map((s) => (
              <div className="stat" key={s.label}>
                <div className="stat-num font-display">{s.num}</div>
                <div className="stat-label">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* RETINA VISUAL */}
      <section className="retina-section" id="conditions">
        <div className="retina-layout">
          <div>
            <div className="section-label">The Science</div>
            <h2 className="section-title font-display">
              The Retina Reveals<br />What the Body Hides
            </h2>
            <p className="section-desc">
              The retina is the only place in the human body where blood vessels and neural tissue
              can be observed non-invasively. Oculomics AI decodes over 120 biomarkers from a
              single fundus photograph — mapping systemic disease risk with clinical-grade precision.
            </p>
            <div style={{ marginTop: 36, display: "flex", flexDirection: "column", gap: 14 }}>
              {["Non-invasive • No dilation required", "Results in 90 seconds", "Explainable AI with heatmap overlays"].map((f) => (
                <div key={f} style={{ display: "flex", alignItems: "center", gap: 12, fontSize: 14, color: "var(--text-muted)" }}>
                  <span style={{ color: "var(--accent2)", fontSize: 16 }}>✓</span> {f}
                </div>
              ))}
            </div>
          </div>
          <div className="retina-visual">
            <div className="eye-container">
              <div className="eye-outer">
                <div className="retina-vessels" />
                <div className="optic-disc" />
                <div className="scan-line" />
              </div>
              {[
                { top: "22%", left: "28%", label: "Arteriovenous Nicking" },
                { top: "55%", left: "65%", label: "Microaneurysm" },
                { top: "70%", left: "25%", label: "RNFL Thinning" },
              ].map((m, i) => (
                <div key={i}>
                  <div className="ai-marker" style={{ top: m.top, left: m.left, position: "absolute", animationDelay: `${i * 0.7}s` }} />
                  <div className="marker-label" style={{ top: `calc(${m.top} - 16px)`, left: `calc(${m.left} + 28px)`, position: "absolute" }}>
                    {m.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CONDITIONS GRID */}
      <section className="conditions-section">
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div className="section-label" style={{ textAlign: "center" }}>Oculomics AI Detects</div>
          <h2 className="section-title font-display" style={{ textAlign: "center", margin: "0 auto 8px" }}>
            Six Life-Threatening Conditions
          </h2>
          <p style={{ textAlign: "center", color: "var(--text-muted)", fontSize: 15 }}>
            From a single non-invasive retinal photograph
          </p>
          <div className="conditions-grid">
            {conditions.map((c, i) => (
              <div
                key={i}
                className={`condition-card ${activeCard === i ? "active" : ""}`}
                onClick={() => setActiveCard(activeCard === i ? null : i)}
              >
                <div className="card-icon" style={{ background: c.bg }}>{c.icon}</div>
                <div className="card-title font-display">{c.title}</div>
                <div className="card-desc">{c.desc}</div>
                <div className="card-accuracy">
                  <span className="accuracy-label">AI ACCURACY</span>
                  <span className="accuracy-val font-display">{c.accuracy}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="how-section" id="how-it-works">
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div className="section-label" style={{ textAlign: "center" }}>Workflow</div>
          <h2 className="section-title font-display" style={{ textAlign: "center" }}>
            From Scan to Insight in 90 Seconds
          </h2>
          <div className="how-steps">
            {steps.map((s, i) => (
              <div className="step-card" key={i}>
                <div className="step-num font-display">{s.num}</div>
                <div className="step-title font-display">{s.title}</div>
                <div className="step-desc">{s.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TRUST / RESEARCH */}
      <section className="trust-section" id="research" ref={trustRef}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div className="section-label">Clinical Evidence</div>
          <h2 className="section-title font-display">Built for Clinicians.<br />Validated by Science.</h2>
          <div className="trust-grid">
            <div>
              {trustItems.map((t, i) => (
                <div className="trust-item" key={i}>
                  <div className="trust-icon">{t.icon}</div>
                  <div className="trust-text">
                    <h4>{t.title}</h4>
                    <p>{t.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="study-card">
              <div className="study-header">
                <span className="study-badge">PEER REVIEWED</span>
              </div>
              <div className="study-title font-display" style={{ marginBottom: 24 }}>
                Multi-Cohort Validation Study — Nature Medicine 2024
              </div>
              {studyStats.map((s, i) => (
                <div className="study-stat" key={i}>
                  <div className="stat-bar-label">
                    <span>{s.label}</span>
                    <span style={{ color: "var(--accent2)", fontFamily: "Syne, sans-serif", fontWeight: 700 }}>{s.val}%</span>
                  </div>
                  <div className="stat-bar-track">
                    <div className="stat-bar-fill" style={{ width: barsVisible ? `${s.val}%` : "0%" }} />
                  </div>
                </div>
              ))}
              <div style={{ marginTop: 24, padding: "16px 0 0", borderTop: "1px solid var(--border)", fontSize: 13, color: "var(--text-muted)", lineHeight: 1.7 }}>
                "Retinal imaging combined with deep learning represents the most cost-effective
                population-level screening pathway for early cardiovascular and neurodegenerative
                disease identified in the past decade."
                <div style={{ marginTop: 8, color: "var(--accent)", fontWeight: 500 }}>
                  — Lead Author, Nature Medicine
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section" id="contact">
        <div className="cta-glow" />
        <div className="section-label">Get Started</div>
        <h2 className="cta-title font-display">
          Transform Your Clinic's<br />
          <span style={{ color: "var(--accent)" }}>Diagnostic Capability</span>
        </h2>
        <p className="cta-sub">
          Join 200+ healthcare institutions already using Oculomics AI
          to detect disease earlier and save lives.
        </p>
        <div className="cta-buttons">
          <button className="btn-primary">Request a Live Demo</button>
          <button className="btn-secondary">Download Clinical Brief</button>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div className="footer-logo font-display">Oculo<span>ms</span></div>
        <div className="footer-copy">© 2025 Oculoms Health AI · CE Mark · FDA Breakthrough Device</div>
        <div style={{ display: "flex", gap: 24 }}>
          {["Privacy", "HIPAA Policy", "Contact"].map((l) => (
            <span key={l} style={{ fontSize: 13, color: "var(--text-muted)", cursor: "pointer" }}>{l}</span>
          ))}
        </div>
      </footer>
    </>
  );
}
