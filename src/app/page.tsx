"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

/* ── colour tokens ── */
const C = {
  bg:        "#0b1329",
  panel:     "#111827",
  panelAlt:  "#0d1f3c",
  border:    "#1e3a5f",
  borderSub: "#1c2f4a",
  cyan:      "#5bc0be",
  cyanDim:   "rgba(91,192,190,0.12)",
  cyanBorder:"rgba(91,192,190,0.25)",
  blue:      "#3b6cf6",
  blueDim:   "rgba(59,108,246,0.12)",
  blueBorder:"rgba(59,108,246,0.25)",
  muted:     "#6b7fa3",
  text:      "#c8d0e7",
  white:     "#eef1fb",
};

export default function HomePage() {
  const [scrolled, setScrolled] = useState(false);
  const [certDropdown, setCertDropdown] = useState(false);
  const [email, setEmail] = useState("");
  const [ctaEmail, setCtaEmail] = useState("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div style={{ fontFamily: '"Inter", system-ui, -apple-system, sans-serif', backgroundColor: C.bg, color: C.text, minHeight: "100vh" }}>

      {/* ── ANNOUNCEMENT BAR ── */}
      <Link href="/question1" style={{ display: "block", backgroundColor: C.cyan, textAlign: "center", padding: "0 20px", height: "36px", lineHeight: "36px", fontSize: "12px", fontWeight: 700, color: "#07111f", textDecoration: "none", letterSpacing: "0.04em" }}>
        NOW LIVE: CompTIA Security+ SY0-701 — Start Practicing Free →
      </Link>

      {/* ── STICKY HEADER ── */}
      <header style={{
        position: "sticky", top: 0, zIndex: 100,
        backgroundColor: scrolled ? "rgba(11,19,41,0.92)" : C.bg,
        backdropFilter: scrolled ? "blur(14px)" : "none",
        borderBottom: `1px solid ${scrolled ? C.border : "transparent"}`,
        transition: "background-color 0.25s, border-color 0.25s, backdrop-filter 0.25s",
        height: "72px", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 40px",
      }}>
        {/* Logo */}
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <div style={{ height: "40px", width: "40px", borderRadius: "10px", background: "linear-gradient(135deg, #3b6cf6, #5bc0be)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900, fontSize: "16px", color: "#07111f", letterSpacing: "-0.02em" }}>
            C2H
          </div>
          <span style={{ fontSize: "19px", fontWeight: 800, color: C.white, letterSpacing: "-0.03em" }}>
            Cert2Hire<span style={{ color: C.cyan }}>.ai</span>
          </span>
        </div>

        {/* Nav */}
        <nav style={{ display: "none", alignItems: "center", gap: "32px" }} className="md-nav">
          {/* Certifications dropdown */}
          <div style={{ position: "relative" }} onMouseEnter={() => setCertDropdown(true)} onMouseLeave={() => setCertDropdown(false)}>
            <span style={{ fontSize: "14px", fontWeight: 500, color: certDropdown ? C.cyan : C.muted, cursor: "pointer", transition: "color 0.2s" }}>
              Certifications ▾
            </span>
            {certDropdown && (
              <div style={{ position: "absolute", top: "calc(100% + 12px)", left: 0, backgroundColor: C.panel, border: `1px solid ${C.border}`, borderRadius: "14px", padding: "16px 0", minWidth: "240px", boxShadow: "0 20px 56px rgba(0,0,0,0.5)" }}>
                <div style={{ padding: "4px 20px 10px", fontSize: "10px", fontWeight: 700, color: C.muted, letterSpacing: "0.1em" }}>COMPTIA</div>
                {[
                  { name: "Security+ SY0-701", live: true, href: "/question1" },
                  { name: "Network+", live: false },
                  { name: "A+", live: false },
                ].map((c) => (
                  <div key={c.name} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "8px 20px" }}>
                    <span style={{ fontSize: "14px", color: c.live ? C.white : C.muted }}>{c.name}</span>
                    {c.live
                      ? <span style={{ backgroundColor: C.cyan, color: "#07111f", fontSize: "10px", fontWeight: 700, padding: "2px 8px", borderRadius: "20px" }}>LIVE</span>
                      : <span style={{ border: `1px solid ${C.border}`, color: C.muted, fontSize: "10px", padding: "2px 8px", borderRadius: "20px" }}>Soon</span>}
                  </div>
                ))}
                <div style={{ borderTop: `1px solid ${C.border}`, margin: "8px 0" }} />
                {["Cisco", "Microsoft", "AWS"].map((v) => (
                  <div key={v} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "8px 20px" }}>
                    <span style={{ fontSize: "14px", color: C.muted }}>{v}</span>
                    <span style={{ border: `1px solid ${C.border}`, color: C.muted, fontSize: "10px", padding: "2px 8px", borderRadius: "20px" }}>Soon</span>
                  </div>
                ))}
              </div>
            )}
          </div>
          {[
            { label: "Engine Modules", href: "#features" },
            { label: "Roadmap", href: "#roadmap" },
            { label: "Pricing", href: "#pricing" },
            { label: "Contact", href: "#contact" },
          ].map((l) => (
            <a key={l.label} href={l.href} style={{ fontSize: "14px", fontWeight: 500, color: C.muted, textDecoration: "none", transition: "color 0.2s" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = C.cyan)}
              onMouseLeave={(e) => (e.currentTarget.style.color = C.muted)}>
              {l.label}
            </a>
          ))}
        </nav>

        {/* Auth buttons */}
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <button style={{ background: "transparent", border: "none", color: C.cyan, fontSize: "14px", fontWeight: 600, cursor: "pointer", padding: "8px 4px" }}>
            Sign In
          </button>
          <a href="#waitlist" style={{ backgroundColor: C.blue, color: "#fff", border: "none", borderRadius: "9px", padding: "9px 20px", fontSize: "14px", fontWeight: 700, cursor: "pointer", textDecoration: "none", boxShadow: "0 0 24px rgba(59,108,246,0.35)" }}>
            Request Beta Access
          </a>
        </div>
      </header>

      {/* ── HERO ── */}
      <section style={{
        position: "relative", overflow: "hidden",
        padding: "100px 40px 90px", textAlign: "center",
        borderBottom: `1px solid ${C.borderSub}`,
      }}>
        {/* dot grid */}
        <div style={{ position: "absolute", inset: 0, backgroundImage: `linear-gradient(to right, ${C.panelAlt} 1px, transparent 1px), linear-gradient(to bottom, ${C.panelAlt} 1px, transparent 1px)`, backgroundSize: "3.5rem 3.5rem", maskImage: "radial-gradient(ellipse 70% 60% at 50% 50%, black 60%, transparent 100%)", opacity: 0.25, pointerEvents: "none" }} />

        <div style={{ position: "relative", zIndex: 1, maxWidth: "860px", margin: "0 auto" }}>
          {/* Live badge */}
          <span style={{ display: "inline-flex", alignItems: "center", gap: "6px", backgroundColor: C.cyanDim, border: `1px solid ${C.cyanBorder}`, color: C.cyan, fontSize: "11px", fontWeight: 700, letterSpacing: "0.06em", padding: "5px 14px", borderRadius: "20px", marginBottom: "28px" }}>
            <span style={{ height: "6px", width: "6px", borderRadius: "50%", backgroundColor: C.cyan, animation: "pulse 2s infinite" }} />
            Cloud-Native SaaS Core Engine Live
          </span>

          <h1 style={{ fontSize: "clamp(36px,6vw,64px)", fontWeight: 900, letterSpacing: "-0.04em", lineHeight: 1.05, color: C.white, margin: "0 0 18px" }}>
            The Intelligent IT Certification{" "}
            <span style={{ background: `linear-gradient(90deg, ${C.blue}, ${C.cyan})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              Prep Engine
            </span>
          </h1>

          <p style={{ fontSize: "18px", color: C.muted, maxWidth: "600px", margin: "0 auto 40px", lineHeight: 1.75 }}>
            An adaptive software matrix engineered to identify individual learning gaps, procedurally generate unique mock exams, and accelerate validation metrics for IT professionals.
          </p>

          {/* Waitlist form */}
          <div id="waitlist" style={{ maxWidth: "480px", margin: "0 auto", display: "flex", flexDirection: "column", gap: "10px" }}>
            <div style={{ display: "flex", gap: "8px", backgroundColor: C.panel, border: `1px solid ${C.border}`, borderRadius: "12px", padding: "6px", boxShadow: "0 8px 40px rgba(0,0,0,0.4)" }}>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter corporate or professional email"
                style={{ flex: 1, background: "transparent", border: "none", outline: "none", color: C.white, fontSize: "14px", padding: "10px 14px" }}
              />
              <button
                onClick={() => { if (email) { alert("Verification endpoint active. Profile queued for private beta pipeline onboarding."); setEmail(""); } }}
                style={{ backgroundColor: C.cyan, color: "#07111f", fontWeight: 800, fontSize: "13px", padding: "10px 20px", borderRadius: "8px", border: "none", cursor: "pointer", whiteSpace: "nowrap" }}>
                Join Platform Waitlist
              </button>
            </div>
          </div>

          {/* Stats */}
          <div style={{ display: "flex", justifyContent: "center", gap: "56px", marginTop: "64px", flexWrap: "wrap" }}>
            {[["500+", "Practice Questions"], ["50+", "PBQ Scenarios"], ["7", "Security Domains"]].map(([n, l]) => (
              <div key={l} style={{ textAlign: "center" }}>
                <div style={{ fontSize: "30px", fontWeight: 900, color: C.cyan, lineHeight: 1 }}>{n}</div>
                <div style={{ fontSize: "12px", color: C.muted, marginTop: "6px", fontWeight: 500, letterSpacing: "0.03em" }}>{l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PLATFORM ENGINE MODULES ── */}
      <section id="features" style={{ padding: "80px 40px", borderBottom: `1px solid ${C.borderSub}` }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", maxWidth: "680px", margin: "0 auto 56px" }}>
            <h2 style={{ fontSize: "clamp(26px,4vw,38px)", fontWeight: 800, letterSpacing: "-0.03em", color: C.white, margin: "0 0 14px" }}>
              Platform Engine Components
            </h2>
            <p style={{ fontSize: "16px", color: C.muted, lineHeight: 1.75, margin: 0 }}>
              Moving beyond static content arrays. Our software infrastructure deploys functional interactive modules to calculate system readiness and core user telemetry.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px,1fr))", gap: "20px" }}>
            {[
              {
                num: "01",
                title: "Core Knowledge Matrix Module",
                body: "Central relational data mapping structures aligning user conceptual foundations systematically against official validation specifications.",
              },
              {
                num: "02",
                title: "Procedural Exam Simulator Engine",
                body: "Dynamic backend algorithms that map answer metrics in real time to assemble unique testing arrays from structural item banks.",
              },
              {
                num: "03",
                title: "Interactive Sandbox Environments",
                body: "API and LTI integrations provisioning live virtualized sandbox environments for immediate hands-on technical operations evaluation.",
              },
              {
                num: "04",
                title: "Contextual Media Explanations",
                body: "System-linked analytical video feeds and context-aware script breakdowns tied directly to custom user error codes.",
              },
            ].map((m) => (
              <EngineCard key={m.num} {...m} />
            ))}
          </div>
        </div>
      </section>

      {/* ── WHAT'S INCLUDED ── */}
      <section id="curriculum" style={{ padding: "80px 40px", backgroundColor: C.panelAlt, borderBottom: `1px solid ${C.borderSub}` }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <p style={{ textAlign: "center", fontSize: "11px", fontWeight: 700, letterSpacing: "0.08em", color: C.cyan, marginBottom: "12px" }}>EVERYTHING YOU NEED</p>
          <h2 style={{ textAlign: "center", fontSize: "clamp(26px,4vw,38px)", fontWeight: 800, letterSpacing: "-0.03em", color: C.white, margin: "0 0 14px" }}>One Platform. Every Resource.</h2>
          <p style={{ textAlign: "center", fontSize: "16px", color: C.muted, maxWidth: "600px", margin: "0 auto 52px", lineHeight: 1.75 }}>
            Every student learns differently. Some pass with videos alone. Others need practice exams. Some need to simulate the real thing. We have all of it.
          </p>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px,1fr))", gap: "20px" }}>
            <ProductTile icon={<PlayIcon />} badge="FREE" badgeColor="#10B981" title="Video Lessons" body="Full Security+ SY0-701 course. Watch free on YouTube — no account needed, no paywall." />
            <ProductTile icon={<BookIcon />} price="$20" title="Study eBook" body="Written from scratch with deep scaffolding and chapter quizzes. Covers 100% of SY0-701 objectives. Lifetime access." />
            <ProductTile icon={<ChecklistIcon />} price="$25" title="MCQ Practice Exam" body="500+ exam-style questions across all 5 Security+ domains. Detailed answer explanations included." />
            <ProductTile icon={<TerminalIcon />} price="$35" title="PBQ Simulation Lab" body="50+ full interactive scenarios — real SIEM dashboards, network configs, IAM audits. Not just questions." cta={{ label: "Try a free sample →", href: "/question1" }} />
            <ProductTile icon={<AIIcon />} badge="Coming Soon" badgeMuted title="AI Tutor" body="Ask anything. Answers pulled directly from your Cert2Hire materials. Credit-based. Never goes off-topic." dimmed />
            <ProductTile icon={<CloudIcon />} badge="Coming Soon" badgeMuted title="Virtual Labs" body="Cloud-based lab environments. Spin up real infrastructure — no local setup required." dimmed notifyMe />
          </div>
        </div>
      </section>

      {/* ── PRICING ── */}
      <section id="pricing" style={{ padding: "80px 40px", borderBottom: `1px solid ${C.borderSub}` }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <p style={{ textAlign: "center", fontSize: "11px", fontWeight: 700, letterSpacing: "0.08em", color: C.cyan, marginBottom: "12px" }}>PRICING</p>
          <h2 style={{ textAlign: "center", fontSize: "clamp(26px,4vw,38px)", fontWeight: 800, letterSpacing: "-0.03em", color: C.white, margin: "0 0 12px" }}>Simple, Honest Pricing.</h2>
          <p style={{ textAlign: "center", fontSize: "16px", color: C.muted, marginBottom: "52px" }}>No subscriptions. No expiry. Pay once, yours forever.</p>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px,1fr))", gap: "24px" }}>
            {/* eBook */}
            <div style={{ backgroundColor: C.panel, border: `1px solid ${C.border}`, borderRadius: "16px", padding: "32px", display: "flex", flexDirection: "column" }}>
              <p style={{ fontSize: "13px", fontWeight: 600, color: C.muted, marginBottom: "8px" }}>Study eBook</p>
              <div style={{ fontSize: "44px", fontWeight: 900, color: C.white, lineHeight: 1, marginBottom: "8px" }}>$20</div>
              <p style={{ fontSize: "14px", color: C.cyan, fontWeight: 600, marginBottom: "24px" }}>Build your foundation.</p>
              {["Written from scratch, fully scaffolded", "Chapter quizzes after every section", "100% SY0-701 objective coverage", "Lifetime access"].map((f) => (
                <div key={f} style={{ display: "flex", gap: "10px", marginBottom: "10px" }}>
                  <span style={{ color: "#10B981", flexShrink: 0 }}>✓</span>
                  <span style={{ fontSize: "14px", color: C.muted }}>{f}</span>
                </div>
              ))}
              <button style={{ marginTop: "auto", paddingTop: "24px", width: "100%", backgroundColor: "transparent", border: `1.5px solid ${C.border}`, color: C.white, borderRadius: "9px", padding: "12px", fontSize: "14px", fontWeight: 700, cursor: "pointer" }}>
                Get the eBook
              </button>
            </div>

            {/* Practice Pack — featured */}
            <div style={{ backgroundColor: C.panel, border: `2px solid ${C.cyan}`, borderRadius: "16px", padding: "32px", display: "flex", flexDirection: "column", boxShadow: `0 0 40px ${C.cyanDim}`, position: "relative" }}>
              <span style={{ position: "absolute", top: "-12px", right: "20px", backgroundColor: C.cyan, color: "#07111f", fontSize: "11px", fontWeight: 800, padding: "4px 14px", borderRadius: "20px", letterSpacing: "0.04em" }}>SAVE $11</span>
              <p style={{ fontSize: "13px", fontWeight: 600, color: C.muted, marginBottom: "8px" }}>Practice Exam Package</p>
              <div style={{ fontSize: "44px", fontWeight: 900, color: C.white, lineHeight: 1, marginBottom: "8px" }}>$49</div>
              <p style={{ fontSize: "14px", color: C.cyan, fontWeight: 600, marginBottom: "24px" }}>The two products that matter most on exam day.</p>
              {["MCQ Practice Exam (500+ questions)", "PBQ Simulation Lab (50+ full scenarios)", "Scored feedback + domain breakdown", "Lifetime access"].map((f) => (
                <div key={f} style={{ display: "flex", gap: "10px", marginBottom: "10px" }}>
                  <span style={{ color: "#10B981", flexShrink: 0 }}>✓</span>
                  <span style={{ fontSize: "14px", color: C.muted }}>{f}</span>
                </div>
              ))}
              <Link href="/question1" style={{ marginTop: "auto", paddingTop: "24px", display: "block", width: "100%", backgroundColor: C.cyan, color: "#07111f", borderRadius: "9px", padding: "13px", fontSize: "14px", fontWeight: 800, textDecoration: "none", textAlign: "center", boxSizing: "border-box" }}>
                Get Practice Pack
              </Link>
            </div>

            {/* Complete */}
            <div style={{ backgroundColor: C.panel, border: `1px solid ${C.border}`, borderRadius: "16px", padding: "32px", display: "flex", flexDirection: "column" }}>
              <p style={{ fontSize: "13px", fontWeight: 600, color: C.muted, marginBottom: "8px" }}>Complete Security+</p>
              <div style={{ fontSize: "44px", fontWeight: 900, color: C.white, lineHeight: 1, marginBottom: "8px" }}>$69</div>
              <p style={{ fontSize: "14px", color: C.cyan, fontWeight: 600, marginBottom: "24px" }}>Everything. Nothing missing.</p>
              {["Everything in Practice Pack", "Study eBook included", "Free video course access", "Lifetime access + all future updates"].map((f) => (
                <div key={f} style={{ display: "flex", gap: "10px", marginBottom: "10px" }}>
                  <span style={{ color: "#10B981", flexShrink: 0 }}>✓</span>
                  <span style={{ fontSize: "14px", color: C.muted }}>{f}</span>
                </div>
              ))}
              <button style={{ marginTop: "auto", paddingTop: "24px", width: "100%", backgroundColor: C.blue, border: "none", color: "white", borderRadius: "9px", padding: "13px", fontSize: "14px", fontWeight: 700, cursor: "pointer" }}>
                Get Everything
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── ROADMAP ── */}
      <section id="roadmap" style={{ padding: "80px 40px", backgroundColor: C.panelAlt, borderBottom: `1px solid ${C.borderSub}` }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <p style={{ textAlign: "center", fontSize: "11px", fontWeight: 700, letterSpacing: "0.08em", color: C.cyan, marginBottom: "12px" }}>SUPPORTED MATRICES</p>
          <h2 style={{ textAlign: "center", fontSize: "clamp(26px,4vw,38px)", fontWeight: 800, letterSpacing: "-0.03em", color: C.white, margin: "0 0 12px" }}>Supported Technical Blueprints</h2>
          <p style={{ textAlign: "center", fontSize: "16px", color: C.muted, marginBottom: "52px" }}>Our software interface maps execution paths across primary IT validation ecosystems.</p>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px,1fr))", gap: "20px" }}>
            {/* CompTIA — active */}
            <div style={{ backgroundColor: C.panel, border: `2px solid ${C.cyan}`, borderRadius: "16px", padding: "28px", boxShadow: `0 0 32px ${C.cyanDim}` }}>
              <p style={{ fontSize: "18px", fontWeight: 900, color: C.white, marginBottom: "20px" }}>CompTIA</p>
              {[
                { name: "Security+ SY0-701", live: true },
                { name: "Network+", live: false },
                { name: "A+", live: false },
              ].map((c) => (
                <div key={c.name} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
                  <span style={{ fontSize: "13px", color: c.live ? C.white : C.muted }}>{c.name}</span>
                  {c.live
                    ? <span style={{ backgroundColor: C.cyan, color: "#07111f", fontSize: "10px", fontWeight: 700, padding: "2px 8px", borderRadius: "20px" }}>LIVE</span>
                    : <span style={{ border: `1px solid ${C.border}`, color: C.muted, fontSize: "10px", padding: "2px 8px", borderRadius: "20px" }}>Soon</span>}
                </div>
              ))}
              <Link href="/question1" style={{ display: "block", marginTop: "20px", backgroundColor: C.cyan, color: "#07111f", textAlign: "center", fontWeight: 700, fontSize: "13px", padding: "10px", borderRadius: "9px", textDecoration: "none" }}>
                Start Security+
              </Link>
            </div>

            {/* Coming soon vendors */}
            {["Cisco", "Microsoft", "AWS"].map((v) => (
              <div key={v} style={{ backgroundColor: C.panel, border: `1px solid ${C.border}`, borderRadius: "16px", padding: "28px" }}>
                <p style={{ fontSize: "18px", fontWeight: 900, color: C.muted, marginBottom: "12px" }}>{v}</p>
                <span style={{ border: `1px solid ${C.border}`, color: C.muted, fontSize: "11px", fontWeight: 600, padding: "3px 10px", borderRadius: "20px" }}>Coming Soon</span>
                <button style={{ display: "block", width: "100%", marginTop: "20px", backgroundColor: "transparent", border: `1px solid ${C.border}`, color: C.muted, borderRadius: "9px", padding: "10px", fontSize: "13px", fontWeight: 600, cursor: "pointer" }}>
                  Notify Me
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── COMPLIANCE ── */}
      <section id="compliance" style={{ padding: "72px 40px", borderBottom: `1px solid ${C.borderSub}` }}>
        <div style={{ maxWidth: "900px", margin: "0 auto", textAlign: "center" }}>
          <p style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.08em", color: C.cyan, marginBottom: "12px" }}>COMPLIANCE & STANDARDS</p>
          <h2 style={{ fontSize: "clamp(24px,3.5vw,34px)", fontWeight: 800, letterSpacing: "-0.03em", color: C.white, margin: "0 0 16px" }}>Built Around DoD 8570 & Industry Standards</h2>
          <p style={{ fontSize: "16px", color: C.muted, maxWidth: "580px", margin: "0 auto 48px", lineHeight: 1.75 }}>
            Cert2Hire content maps directly to DoD 8570 IAT Level II requirements, CompTIA exam objectives, and NICE cybersecurity workforce framework competencies.
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "16px", justifyContent: "center" }}>
            {["DoD 8570 IAT Level II", "CompTIA SY0-701 Objectives", "NICE Framework", "NIST SP 800-181"].map((badge) => (
              <span key={badge} style={{ backgroundColor: C.blueDim, border: `1px solid ${C.blueBorder}`, color: C.cyan, fontSize: "13px", fontWeight: 600, padding: "8px 18px", borderRadius: "20px" }}>
                {badge}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA / CONTACT ── */}
      <section id="contact" style={{ padding: "80px 40px", backgroundColor: C.panelAlt, textAlign: "center" }}>
        <div style={{ maxWidth: "560px", margin: "0 auto" }}>
          <h2 style={{ fontSize: "clamp(26px,4vw,38px)", fontWeight: 800, letterSpacing: "-0.03em", color: C.white, margin: "0 0 14px" }}>
            Ready to Get Cert2Hire Ready?
          </h2>
          <p style={{ fontSize: "16px", color: C.muted, margin: "0 0 36px", lineHeight: 1.75 }}>
            Join the waitlist for new certifications or start your Security+ prep today.
          </p>
          <div style={{ display: "flex", gap: "10px", justifyContent: "center", flexWrap: "wrap" }}>
            <input
              type="email"
              value={ctaEmail}
              onChange={(e) => setCtaEmail(e.target.value)}
              placeholder="Enter your email"
              style={{ flex: 1, minWidth: "220px", backgroundColor: C.panel, border: `1px solid ${C.border}`, color: C.white, borderRadius: "9px", padding: "13px 16px", fontSize: "14px", outline: "none" }}
            />
            <button
              onClick={() => { if (ctaEmail) { alert("Verification endpoint active. Profile queued for private beta pipeline onboarding."); setCtaEmail(""); } }}
              style={{ backgroundColor: C.cyan, color: "#07111f", border: "none", borderRadius: "9px", padding: "13px 24px", fontSize: "14px", fontWeight: 700, cursor: "pointer", whiteSpace: "nowrap" }}>
              Join Waitlist
            </button>
          </div>
          <div style={{ marginTop: "24px" }}>
            <Link href="/question1" style={{ display: "inline-block", border: `1.5px solid ${C.cyan}`, color: C.cyan, fontWeight: 700, fontSize: "15px", padding: "13px 32px", borderRadius: "9px", textDecoration: "none" }}>
              Start Practicing Free →
            </Link>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ backgroundColor: C.bg, borderTop: `1px solid ${C.border}`, padding: "56px 48px 28px" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr 1fr 1fr 1fr", gap: "40px", marginBottom: "48px" }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "12px" }}>
                <div style={{ height: "36px", width: "36px", borderRadius: "8px", background: "linear-gradient(135deg, #3b6cf6, #5bc0be)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900, fontSize: "13px", color: "#07111f" }}>C2H</div>
                <span style={{ fontSize: "17px", fontWeight: 800, color: C.white, letterSpacing: "-0.02em" }}>Cert2Hire<span style={{ color: C.cyan }}>.ai</span></span>
              </div>
              <p style={{ fontSize: "11px", color: C.muted, fontWeight: 600, letterSpacing: "0.08em" }}>CERT READY. HIRE READY.</p>
            </div>
            {[
              { heading: "Certifications", links: ["Security+ SY0-701", "Network+", "A+", "Cisco", "Microsoft", "AWS"] },
              { heading: "Resources", links: ["Study eBook", "Practice Exam", "PBQ Lab", "Video Lessons"] },
              { heading: "Company", links: ["About", "Pricing", "Contact"] },
              { heading: "Legal", links: ["Privacy Policy", "Terms of Service"] },
            ].map((col) => (
              <div key={col.heading}>
                <p style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.08em", color: C.muted, marginBottom: "16px" }}>{col.heading.toUpperCase()}</p>
                {col.links.map((l) => (
                  <a key={l} href="#" style={{ display: "block", fontSize: "14px", color: C.muted, textDecoration: "none", marginBottom: "8px", transition: "color 0.2s" }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = C.cyan)}
                    onMouseLeave={(e) => (e.currentTarget.style.color = C.muted)}>
                    {l}
                  </a>
                ))}
              </div>
            ))}
          </div>
          <div style={{ borderTop: `1px solid ${C.border}`, paddingTop: "24px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "12px" }}>
            <p style={{ fontSize: "13px", color: C.muted, margin: 0 }}>© 2025 Cert2Hire. All rights reserved.</p>
            <div style={{ display: "flex", gap: "16px" }}>
              {[
                <svg key="li" width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>,
                <svg key="x" width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>,
                <svg key="yt" width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.95A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="#0b1329"/></svg>,
              ].map((icon, i) => (
                <a key={i} href="#" style={{ color: C.muted, transition: "color 0.2s" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = C.cyan)}
                  onMouseLeave={(e) => (e.currentTarget.style.color = C.muted)}>
                  {icon}
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>

      <style>{`
        @keyframes pulse { 0%,100% { opacity:1 } 50% { opacity:0.4 } }
        @media (min-width:768px) { .md-nav { display:flex !important; } }
      `}</style>
    </div>
  );
}

/* ── ENGINE MODULE CARD ── */
function EngineCard({ num, title, body }: { num: string; title: string; body: string }) {
  const [hov, setHov] = useState(false);
  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        backgroundColor: hov ? "rgba(17,24,39,0.9)" : "rgba(17,24,39,0.5)",
        border: `1px solid ${hov ? "#3a506b" : "#1e3a5f"}`,
        borderRadius: "16px", padding: "28px",
        transform: hov ? "translateY(-4px)" : "translateY(0)",
        boxShadow: hov ? "0 16px 40px rgba(0,0,0,0.3)" : "none",
        transition: "transform 0.2s, box-shadow 0.2s, background-color 0.2s, border-color 0.2s",
      }}>
      <div style={{
        height: "48px", width: "48px", borderRadius: "10px",
        backgroundColor: hov ? "#3b6cf6" : "rgba(59,108,246,0.12)",
        border: "1px solid rgba(59,108,246,0.25)",
        color: hov ? "#fff" : "#5bc0be",
        display: "flex", alignItems: "center", justifyContent: "center",
        fontWeight: 800, fontSize: "15px", marginBottom: "20px",
        transition: "background-color 0.2s, color 0.2s",
      }}>
        {num}
      </div>
      <h3 style={{ fontSize: "17px", fontWeight: 700, color: "#eef1fb", marginBottom: "10px" }}>{title}</h3>
      <p style={{ fontSize: "14px", color: "#6b7fa3", lineHeight: 1.65, margin: 0 }}>{body}</p>
    </div>
  );
}

/* ── PRODUCT TILE ── */
function ProductTile({ icon, badge, badgeColor, badgeMuted, price, title, body, cta, dimmed, notifyMe }: {
  icon: React.ReactNode; badge?: string; badgeColor?: string; badgeMuted?: boolean;
  price?: string; title: string; body: string;
  cta?: { label: string; href: string }; dimmed?: boolean; notifyMe?: boolean;
}) {
  const [hov, setHov] = useState(false);
  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        backgroundColor: "#111827", border: "1px solid #1e3a5f", borderTop: "4px solid #5bc0be",
        borderRadius: "16px", padding: "28px 24px", display: "flex", flexDirection: "column", gap: "12px",
        opacity: dimmed ? 0.6 : 1,
        transform: hov && !dimmed ? "translateY(-4px)" : "translateY(0)",
        boxShadow: hov && !dimmed ? "0 16px 40px rgba(0,0,0,0.3)" : "none",
        transition: "transform 0.2s, box-shadow 0.2s",
      }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div style={{ width: "44px", height: "44px", backgroundColor: "rgba(91,192,190,0.1)", borderRadius: "10px", display: "flex", alignItems: "center", justifyContent: "center" }}>
          {icon}
        </div>
        {badge && (
          <span style={{ fontSize: "11px", fontWeight: 700, padding: "3px 10px", borderRadius: "20px", backgroundColor: badgeMuted ? "transparent" : (badgeColor || "#5bc0be"), color: badgeMuted ? "#6b7fa3" : (badgeColor ? "white" : "#07111f"), border: badgeMuted ? "1px solid #2a3a55" : "none" }}>
            {badge}
          </span>
        )}
        {price && <span style={{ fontSize: "20px", fontWeight: 900, color: "#eef1fb" }}>{price}</span>}
      </div>
      <h3 style={{ fontSize: "17px", fontWeight: 700, color: "#eef1fb", margin: 0 }}>{title}</h3>
      <p style={{ fontSize: "14px", color: "#6b7fa3", lineHeight: 1.65, margin: 0 }}>{body}</p>
      {cta && <a href={cta.href} style={{ fontSize: "13px", fontWeight: 600, color: "#5bc0be", textDecoration: "none" }}>{cta.label}</a>}
      {notifyMe && <button style={{ marginTop: "4px", backgroundColor: "transparent", border: "1px solid #2a3a55", color: "#6b7fa3", borderRadius: "8px", padding: "8px", fontSize: "13px", cursor: "pointer" }}>Notify Me When Live</button>}
    </div>
  );
}

/* ── ICONS ── */
function PlayIcon() { return <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#5bc0be" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polygon points="10 8 16 12 10 16 10 8" fill="#5bc0be" stroke="none"/></svg>; }
function BookIcon() { return <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#5bc0be" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>; }
function ChecklistIcon() { return <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#5bc0be" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>; }
function TerminalIcon() { return <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#5bc0be" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="4 17 10 11 4 5"/><line x1="12" y1="19" x2="20" y2="19"/></svg>; }
function AIIcon() { return <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#5bc0be" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="10" rx="2"/><circle cx="12" cy="5" r="2"/><path d="M12 7v4"/><line x1="8" y1="16" x2="8" y2="16"/><line x1="12" y1="16" x2="12" y2="16"/><line x1="16" y1="16" x2="16" y2="16"/></svg>; }
function CloudIcon() { return <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#5bc0be" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"/></svg>; }
