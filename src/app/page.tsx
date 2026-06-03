"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function HomePage() {
  const [scrolled, setScrolled] = useState(false);
  const [certDropdown, setCertDropdown] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div style={{ fontFamily: '"Inter", system-ui, -apple-system, sans-serif', backgroundColor: "#080F24" }}>

      {/* ── ANNOUNCEMENT BAR ── */}
      <a href="/question1" style={{ display: "block", backgroundColor: "#C9A44A", textAlign: "center", padding: "0 20px", height: "38px", lineHeight: "38px", fontSize: "13px", fontWeight: 600, color: "#0D1B3E", textDecoration: "none", letterSpacing: "0.01em" }}>
        🚀 Now Live: CompTIA Security+ SY0-701 — Start Practicing Free →
      </a>

      {/* ── STICKY NAV ── */}
      <header style={{ position: "sticky", top: 0, zIndex: 100, backgroundColor: "#0D1B3E", height: "64px", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 48px", borderBottom: scrolled ? "1px solid #1E3265" : "none", backdropFilter: scrolled ? "blur(12px)" : "none", transition: "border-bottom 0.2s, backdrop-filter 0.2s" }}>
        <img src="/logo.png" height={40} style={{ width: "auto" }} alt="Cert2Hire" />

        <nav style={{ display: "flex", alignItems: "center", gap: "32px" }}>
          <div style={{ position: "relative" }} onMouseEnter={() => setCertDropdown(true)} onMouseLeave={() => setCertDropdown(false)}>
            <span style={{ fontSize: "14px", fontWeight: 500, color: certDropdown ? "#C9A44A" : "#8A9BBF", cursor: "pointer", transition: "color 0.2s" }}>
              Certifications ▾
            </span>
            {certDropdown && (
              <div style={{ position: "absolute", top: "100%", left: 0, marginTop: "12px", backgroundColor: "#111F3F", border: "1px solid #1E3265", borderRadius: "12px", padding: "16px 0", minWidth: "240px", boxShadow: "0 16px 48px rgba(0,0,0,0.4)" }}>
                <div style={{ padding: "4px 20px 8px", fontSize: "11px", fontWeight: 700, color: "#4A5C80", letterSpacing: "0.08em" }}>COMPTIA</div>
                {[
                  { name: "Security+ SY0-701", live: true, href: "/question1" },
                  { name: "Network+", live: false },
                  { name: "A+", live: false },
                ].map((c) => (
                  <div key={c.name} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "8px 20px" }}>
                    <span style={{ fontSize: "14px", color: c.live ? "#F0F4FF" : "#4A5C80" }}>{c.name}</span>
                    {c.live ? (
                      <span style={{ backgroundColor: "#C9A44A", color: "#0D1B3E", fontSize: "10px", fontWeight: 700, padding: "2px 8px", borderRadius: "20px" }}>LIVE</span>
                    ) : (
                      <span style={{ border: "1px solid #1E3265", color: "#4A5C80", fontSize: "10px", fontWeight: 600, padding: "2px 8px", borderRadius: "20px" }}>Soon</span>
                    )}
                  </div>
                ))}
                <div style={{ borderTop: "1px solid #1E3265", margin: "8px 0" }} />
                {["Cisco", "Microsoft", "AWS"].map((v) => (
                  <div key={v} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "8px 20px" }}>
                    <span style={{ fontSize: "14px", color: "#4A5C80" }}>{v}</span>
                    <span style={{ border: "1px solid #1E3265", color: "#4A5C80", fontSize: "10px", fontWeight: 600, padding: "2px 8px", borderRadius: "20px" }}>Soon</span>
                  </div>
                ))}
              </div>
            )}
          </div>
          {["Pricing", "About", "Contact"].map((l) => (
            <a key={l} href={`#${l.toLowerCase()}`} style={{ fontSize: "14px", fontWeight: 500, color: "#8A9BBF", textDecoration: "none", transition: "color 0.2s" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#C9A44A")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#8A9BBF")}>
              {l}
            </a>
          ))}
        </nav>

        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <button style={{ background: "transparent", border: "1px solid #1E3265", color: "#F0F4FF", borderRadius: "8px", padding: "8px 18px", fontSize: "14px", fontWeight: 500, cursor: "pointer" }}>Log In</button>
          <button style={{ backgroundColor: "#C9A44A", color: "#0D1B3E", border: "none", borderRadius: "8px", padding: "9px 20px", fontSize: "14px", fontWeight: 700, cursor: "pointer" }}>Get Started</button>
        </div>
      </header>

      {/* ── HERO ── */}
      <section style={{ backgroundColor: "#080F24", backgroundImage: "radial-gradient(circle, rgba(201,164,74,0.06) 1px, transparent 1px)", backgroundSize: "28px 28px", padding: "100px 40px 80px", textAlign: "center" }}>
        <span style={{ display: "inline-block", backgroundColor: "rgba(201,164,74,0.12)", border: "1px solid rgba(201,164,74,0.35)", color: "#C9A44A", fontSize: "12px", fontWeight: 700, letterSpacing: "0.08em", padding: "5px 16px", borderRadius: "20px", marginBottom: "28px" }}>
          COMPTIA SECURITY+ SY0-701
        </span>
        <h1 style={{ fontSize: "clamp(38px,6vw,62px)", fontWeight: 900, letterSpacing: "-0.04em", lineHeight: 1.05, color: "#F0F4FF", margin: "0 0 12px" }}>
          Pass Your Security+ Exam.
        </h1>
        <h1 style={{ fontSize: "clamp(38px,6vw,62px)", fontWeight: 900, letterSpacing: "-0.04em", lineHeight: 1.05, margin: "0 0 28px", background: "linear-gradient(90deg,#C9A44A,#E8C96A)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
          Get Hired Faster.
        </h1>
        <p style={{ fontSize: "17px", color: "#8A9BBF", maxWidth: "560px", margin: "0 auto 40px", lineHeight: 1.75 }}>
          One platform. Every resource. Your way.<br />
          Video, reading, practice, simulation — we have all of it so you study how you learn best.
        </p>
        <div style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" }}>
          <Link href="/question1" style={{ backgroundColor: "#C9A44A", color: "#0D1B3E", fontWeight: 800, fontSize: "16px", padding: "14px 32px", borderRadius: "9px", textDecoration: "none", transition: "filter 0.2s, transform 0.2s" }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.filter = "brightness(1.08)"; (e.currentTarget as HTMLElement).style.transform = "scale(1.02)"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.filter = "brightness(1)"; (e.currentTarget as HTMLElement).style.transform = "scale(1)"; }}>
            Start Practicing Free
          </Link>
          <a href="#curriculum" style={{ border: "1.5px solid #C9A44A", color: "#C9A44A", fontWeight: 700, fontSize: "16px", padding: "14px 32px", borderRadius: "9px", textDecoration: "none" }}>
            View Curriculum
          </a>
        </div>
        <div style={{ display: "flex", justifyContent: "center", gap: "48px", marginTop: "64px", flexWrap: "wrap" }}>
          {[["500+", "Practice Questions"], ["50+", "PBQ Scenarios"], ["7", "Security Domains"]].map(([n, l]) => (
            <div key={l} style={{ textAlign: "center" }}>
              <div style={{ fontSize: "28px", fontWeight: 900, color: "#C9A44A", lineHeight: 1 }}>{n}</div>
              <div style={{ fontSize: "12px", color: "#8A9BBF", marginTop: "4px", fontWeight: 500 }}>{l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── WHAT'S INCLUDED ── */}
      <section id="curriculum" style={{ backgroundColor: "#F4F6FA", padding: "80px 40px" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <p style={{ textAlign: "center", fontSize: "11px", fontWeight: 700, letterSpacing: "0.08em", color: "#C9A44A", marginBottom: "12px" }}>EVERYTHING YOU NEED</p>
          <h2 style={{ textAlign: "center", fontSize: "clamp(28px,4vw,38px)", fontWeight: 800, letterSpacing: "-0.03em", color: "#0D1B3E", margin: "0 0 16px" }}>One Platform. Every Resource.</h2>
          <p style={{ textAlign: "center", fontSize: "16px", color: "#4A5C80", maxWidth: "600px", margin: "0 auto 56px", lineHeight: 1.75 }}>
            Every student learns differently. Some pass with videos alone. Others need practice exams. Some need to simulate the real thing. We have all of it — so you study your way.
          </p>

          {/* Tiles */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "20px" }}>

            {/* Video Lessons */}
            <ProductTile
              icon={<PlayIcon />}
              badge="FREE"
              badgeColor="#10B981"
              title="Video Lessons"
              body="Full Security+ SY0-701 course. Watch free on YouTube — no account needed, no paywall."
            />

            {/* eBook */}
            <ProductTile
              icon={<BookIcon />}
              price="$20"
              title="Study eBook"
              body="Written from scratch with deep scaffolding and chapter quizzes. Covers 100% of SY0-701 objectives. Lifetime access."
            />

            {/* MCQ */}
            <ProductTile
              icon={<ChecklistIcon />}
              price="$25"
              title="MCQ Practice Exam"
              body="500+ exam-style questions across all 5 Security+ domains. Detailed answer explanations included."
            />

            {/* PBQ */}
            <ProductTile
              icon={<TerminalIcon />}
              price="$35"
              title="PBQ Simulation Lab"
              body="50+ full interactive scenarios — real SIEM dashboards, network configs, IAM audits. Not just questions."
              cta={{ label: "Try a free sample →", href: "/question1" }}
            />

            {/* AI Tutor */}
            <ProductTile
              icon={<AIIcon />}
              badge="Coming Soon"
              badgeMuted
              title="AI Tutor"
              body="Ask anything. Answers pulled directly from your Cert2Hire materials. Credit-based. Never goes off-topic."
              dimmed
            />

            {/* Virtual Labs */}
            <ProductTile
              icon={<CloudIcon />}
              badge="Coming Soon"
              badgeMuted
              title="Virtual Labs"
              body="Cloud-based lab environments. Spin up real infrastructure — no local setup required."
              dimmed
              notifyMe
            />

          </div>
        </div>
      </section>

      {/* ── CERTIFICATION + PRICING DETAIL ── */}
      <section style={{ backgroundColor: "#0D1B3E", padding: "80px 40px" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "64px", alignItems: "start" }}>

          {/* Left */}
          <div>
            <span style={{ display: "inline-block", backgroundColor: "rgba(201,164,74,0.12)", border: "1px solid rgba(201,164,74,0.35)", color: "#C9A44A", fontSize: "11px", fontWeight: 700, letterSpacing: "0.08em", padding: "4px 14px", borderRadius: "20px", marginBottom: "20px" }}>
              COMPTIA SECURITY+ SY0-701
            </span>
            <h2 style={{ fontSize: "clamp(24px,3vw,34px)", fontWeight: 800, letterSpacing: "-0.03em", color: "#F0F4FF", margin: "0 0 20px", lineHeight: 1.2 }}>
              The certification that launches cybersecurity careers.
            </h2>
            <p style={{ fontSize: "15px", color: "#8A9BBF", lineHeight: 1.8, marginBottom: "24px" }}>
              CompTIA Security+ is the industry's most recognized entry-level cybersecurity certification — and the baseline requirement for thousands of security roles across government, defense, and private sector. Professionals with Security+ earn an average salary of $85,000+. Over 60,000 job postings required Security+ last year alone.
            </p>

            <p style={{ fontSize: "12px", fontWeight: 700, letterSpacing: "0.06em", color: "#C9A44A", marginBottom: "10px" }}>WHO THIS IS FOR</p>
            {["IT professionals moving into cybersecurity", "Career changers entering the field", "Students pursuing their first security role", "Military/government personnel meeting DoD 8570"].map((b) => (
              <div key={b} style={{ display: "flex", gap: "10px", alignItems: "flex-start", marginBottom: "8px" }}>
                <span style={{ color: "#C9A44A", marginTop: "2px", flexShrink: 0 }}>●</span>
                <span style={{ fontSize: "14px", color: "#8A9BBF" }}>{b}</span>
              </div>
            ))}

            <p style={{ fontSize: "12px", fontWeight: 700, letterSpacing: "0.06em", color: "#C9A44A", margin: "24px 0 10px" }}>WHAT CERT2HIRE GIVES YOU</p>
            {["Full video course — free, no signup needed", "Deep-scaffolded eBook with chapter quizzes", "500+ MCQ questions mapped to exam domains", "50+ PBQ simulations — the part that fails most candidates"].map((b) => (
              <div key={b} style={{ display: "flex", gap: "10px", alignItems: "flex-start", marginBottom: "8px" }}>
                <span style={{ color: "#10B981", marginTop: "2px", flexShrink: 0 }}>✓</span>
                <span style={{ fontSize: "14px", color: "#8A9BBF" }}>{b}</span>
              </div>
            ))}

            <Link href="/question1" style={{ display: "inline-block", marginTop: "28px", backgroundColor: "#C9A44A", color: "#0D1B3E", fontWeight: 800, fontSize: "15px", padding: "13px 28px", borderRadius: "9px", textDecoration: "none" }}>
              Start Free →
            </Link>
          </div>

          {/* Right — Package Card */}
          <div style={{ backgroundColor: "#111F3F", border: "1px solid #1E3265", borderRadius: "16px", padding: "32px" }}>
            <p style={{ fontSize: "12px", fontWeight: 700, letterSpacing: "0.08em", color: "#C9A44A", marginBottom: "8px" }}>COMPLETE SECURITY+ PACKAGE</p>
            <div style={{ display: "flex", alignItems: "baseline", gap: "8px", marginBottom: "4px" }}>
              <span style={{ fontSize: "52px", fontWeight: 900, color: "#C9A44A", lineHeight: 1 }}>$69</span>
            </div>
            <p style={{ fontSize: "13px", color: "#4A5C80", marginBottom: "28px" }}>Everything. Lifetime access. No subscription.</p>

            {[
              ["Video Lessons", "FREE"],
              ["Study eBook", "$20"],
              ["MCQ Practice Exam", "$25"],
              ["PBQ Simulation Lab", "$35"],
            ].map(([name, price]) => (
              <div key={name} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 0", borderBottom: "1px solid #1E3265" }}>
                <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                  <span style={{ color: "#10B981" }}>✓</span>
                  <span style={{ fontSize: "14px", color: "#F0F4FF" }}>{name}</span>
                </div>
                <span style={{ fontSize: "13px", color: "#4A5C80" }}>{price}</span>
              </div>
            ))}

            <div style={{ backgroundColor: "rgba(201,164,74,0.08)", border: "1px solid rgba(201,164,74,0.2)", borderRadius: "8px", padding: "12px 16px", margin: "20px 0" }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "13px", color: "#8A9BBF", marginBottom: "4px" }}>
                <span>Individual total</span><span>$80</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "16px", fontWeight: 800, color: "#C9A44A" }}>
                <span>Complete Package</span><span>$69</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "12px", color: "#10B981", marginTop: "4px" }}>
                <span>You save</span><span>$11</span>
              </div>
            </div>

            <button style={{ width: "100%", backgroundColor: "#C9A44A", color: "#0D1B3E", border: "none", borderRadius: "9px", padding: "14px", fontSize: "15px", fontWeight: 800, cursor: "pointer" }}>
              Get Complete Package
            </button>
            <p style={{ textAlign: "center", fontSize: "12px", color: "#4A5C80", marginTop: "12px" }}>or buy products individually ↓</p>
          </div>
        </div>
      </section>

      {/* ── PRICING ── */}
      <section id="pricing" style={{ backgroundColor: "#F4F6FA", padding: "80px 40px" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <p style={{ textAlign: "center", fontSize: "11px", fontWeight: 700, letterSpacing: "0.08em", color: "#C9A44A", marginBottom: "12px" }}>PRICING</p>
          <h2 style={{ textAlign: "center", fontSize: "clamp(28px,4vw,38px)", fontWeight: 800, letterSpacing: "-0.03em", color: "#0D1B3E", margin: "0 0 12px" }}>Simple, Honest Pricing.</h2>
          <p style={{ textAlign: "center", fontSize: "16px", color: "#4A5C80", marginBottom: "56px" }}>No subscriptions. No expiry. Pay once, yours forever.</p>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "24px" }}>

            {/* eBook */}
            <div style={{ backgroundColor: "white", border: "1px solid #E2E8F0", borderRadius: "14px", padding: "32px", display: "flex", flexDirection: "column" }}>
              <p style={{ fontSize: "13px", fontWeight: 600, color: "#4A5C80", marginBottom: "8px" }}>Study eBook</p>
              <div style={{ fontSize: "42px", fontWeight: 900, color: "#0D1B3E", lineHeight: 1, marginBottom: "8px" }}>$20</div>
              <p style={{ fontSize: "14px", color: "#C9A44A", fontWeight: 600, marginBottom: "24px" }}>Build your foundation.</p>
              {["Written from scratch, fully scaffolded", "Chapter quizzes after every section", "100% SY0-701 objective coverage", "Lifetime access"].map((f) => (
                <div key={f} style={{ display: "flex", gap: "10px", marginBottom: "10px" }}>
                  <span style={{ color: "#10B981", flexShrink: 0 }}>✓</span>
                  <span style={{ fontSize: "14px", color: "#4A5C80" }}>{f}</span>
                </div>
              ))}
              <button style={{ marginTop: "auto", paddingTop: "24px", width: "100%", backgroundColor: "transparent", border: "1.5px solid #0D1B3E", color: "#0D1B3E", borderRadius: "8px", padding: "12px", fontSize: "14px", fontWeight: 700, cursor: "pointer" }}>
                Get the eBook
              </button>
            </div>

            {/* Practice Exam Package — Featured */}
            <div style={{ backgroundColor: "white", border: "2px solid #C9A44A", borderRadius: "14px", padding: "32px", display: "flex", flexDirection: "column", boxShadow: "0 0 40px rgba(201,164,74,0.18)", position: "relative" }}>
              <span style={{ position: "absolute", top: "-12px", right: "20px", backgroundColor: "#C9A44A", color: "#0D1B3E", fontSize: "11px", fontWeight: 800, padding: "4px 14px", borderRadius: "20px", letterSpacing: "0.04em" }}>SAVE $11</span>
              <p style={{ fontSize: "13px", fontWeight: 600, color: "#4A5C80", marginBottom: "8px" }}>Practice Exam Package</p>
              <div style={{ fontSize: "42px", fontWeight: 900, color: "#0D1B3E", lineHeight: 1, marginBottom: "8px" }}>$49</div>
              <p style={{ fontSize: "14px", color: "#C9A44A", fontWeight: 600, marginBottom: "24px" }}>The two products that matter most on exam day.</p>
              {["MCQ Practice Exam (500+ questions)", "PBQ Simulation Lab (50+ full scenarios)", "Scored feedback + domain breakdown", "Lifetime access"].map((f) => (
                <div key={f} style={{ display: "flex", gap: "10px", marginBottom: "10px" }}>
                  <span style={{ color: "#10B981", flexShrink: 0 }}>✓</span>
                  <span style={{ fontSize: "14px", color: "#4A5C80" }}>{f}</span>
                </div>
              ))}
              <Link href="/question1" style={{ marginTop: "auto", paddingTop: "24px", display: "block", width: "100%", backgroundColor: "#C9A44A", color: "#0D1B3E", borderRadius: "8px", padding: "13px", fontSize: "14px", fontWeight: 800, cursor: "pointer", textDecoration: "none", textAlign: "center", boxSizing: "border-box" }}>
                Get Practice Pack
              </Link>
            </div>

            {/* Complete */}
            <div style={{ backgroundColor: "white", border: "1px solid #E2E8F0", borderRadius: "14px", padding: "32px", display: "flex", flexDirection: "column" }}>
              <p style={{ fontSize: "13px", fontWeight: 600, color: "#4A5C80", marginBottom: "8px" }}>Complete Security+</p>
              <div style={{ fontSize: "42px", fontWeight: 900, color: "#0D1B3E", lineHeight: 1, marginBottom: "8px" }}>$69</div>
              <p style={{ fontSize: "14px", color: "#C9A44A", fontWeight: 600, marginBottom: "24px" }}>Everything. Nothing missing.</p>
              {["Everything in Practice Pack", "Study eBook included", "Free video course access", "Lifetime access + all future updates"].map((f) => (
                <div key={f} style={{ display: "flex", gap: "10px", marginBottom: "10px" }}>
                  <span style={{ color: "#10B981", flexShrink: 0 }}>✓</span>
                  <span style={{ fontSize: "14px", color: "#4A5C80" }}>{f}</span>
                </div>
              ))}
              <button style={{ marginTop: "auto", paddingTop: "24px", width: "100%", backgroundColor: "#0D1B3E", border: "none", color: "white", borderRadius: "8px", padding: "13px", fontSize: "14px", fontWeight: 700, cursor: "pointer" }}>
                Get Everything
              </button>
            </div>

          </div>
        </div>
      </section>

      {/* ── CERTIFICATION ROADMAP ── */}
      <section style={{ backgroundColor: "#0D1B3E", padding: "80px 40px" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <p style={{ textAlign: "center", fontSize: "11px", fontWeight: 700, letterSpacing: "0.08em", color: "#C9A44A", marginBottom: "12px" }}>ROADMAP</p>
          <h2 style={{ textAlign: "center", fontSize: "clamp(28px,4vw,38px)", fontWeight: 800, letterSpacing: "-0.03em", color: "#F0F4FF", margin: "0 0 12px" }}>More Certifications Coming.</h2>
          <p style={{ textAlign: "center", fontSize: "16px", color: "#8A9BBF", marginBottom: "56px" }}>Security+ is just the beginning.</p>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: "20px" }}>

            {/* CompTIA — Active */}
            <div style={{ backgroundColor: "#111F3F", border: "2px solid #C9A44A", borderRadius: "14px", padding: "28px", boxShadow: "0 0 32px rgba(201,164,74,0.15)" }}>
              <p style={{ fontSize: "18px", fontWeight: 900, color: "#F0F4FF", marginBottom: "20px" }}>CompTIA</p>
              {[{ name: "Security+ SY0-701", live: true }, { name: "Network+", live: false }, { name: "A+", live: false }].map((c) => (
                <div key={c.name} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
                  <span style={{ fontSize: "13px", color: c.live ? "#F0F4FF" : "#4A5C80" }}>{c.name}</span>
                  {c.live
                    ? <span style={{ backgroundColor: "#C9A44A", color: "#0D1B3E", fontSize: "10px", fontWeight: 700, padding: "2px 8px", borderRadius: "20px" }}>LIVE</span>
                    : <span style={{ border: "1px solid #1E3265", color: "#4A5C80", fontSize: "10px", padding: "2px 8px", borderRadius: "20px" }}>Soon</span>}
                </div>
              ))}
              <Link href="/question1" style={{ display: "block", marginTop: "20px", backgroundColor: "#C9A44A", color: "#0D1B3E", textAlign: "center", fontWeight: 700, fontSize: "13px", padding: "10px", borderRadius: "8px", textDecoration: "none" }}>
                Start Security+
              </Link>
            </div>

            {/* Cisco, Microsoft, AWS */}
            {["Cisco", "Microsoft", "AWS"].map((v) => (
              <div key={v} style={{ backgroundColor: "#111F3F", border: "1px solid #1E3265", borderRadius: "14px", padding: "28px" }}>
                <p style={{ fontSize: "18px", fontWeight: 900, color: "#4A5C80", marginBottom: "12px" }}>{v}</p>
                <span style={{ border: "1px solid #1E3265", color: "#4A5C80", fontSize: "11px", fontWeight: 600, padding: "3px 10px", borderRadius: "20px" }}>Coming Soon</span>
                <button style={{ display: "block", width: "100%", marginTop: "20px", backgroundColor: "transparent", border: "1px solid #1E3265", color: "#8A9BBF", borderRadius: "8px", padding: "10px", fontSize: "13px", fontWeight: 600, cursor: "pointer" }}>
                  Notify Me
                </button>
              </div>
            ))}

          </div>
        </div>
      </section>

      {/* ── CONTACT CTA ── */}
      <section id="contact" style={{ background: "linear-gradient(135deg, #080F24, #0D1B3E)", padding: "80px 40px", textAlign: "center" }}>
        <h2 style={{ fontSize: "clamp(26px,4vw,38px)", fontWeight: 800, letterSpacing: "-0.03em", color: "#F0F4FF", margin: "0 0 12px" }}>Ready to Get Cert2Hire Ready?</h2>
        <p style={{ fontSize: "16px", color: "#8A9BBF", maxWidth: "480px", margin: "0 auto 36px", lineHeight: 1.75 }}>
          Join the waitlist for new certifications or start your Security+ prep today.
        </p>
        <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap", maxWidth: "480px", margin: "0 auto" }}>
          <input type="email" placeholder="Enter your email" style={{ flex: 1, minWidth: "220px", backgroundColor: "#111F3F", border: "1px solid #1E3265", color: "#F0F4FF", borderRadius: "8px", padding: "13px 16px", fontSize: "14px", outline: "none" }} />
          <button style={{ backgroundColor: "#C9A44A", color: "#0D1B3E", border: "none", borderRadius: "8px", padding: "13px 24px", fontSize: "14px", fontWeight: 700, cursor: "pointer", whiteSpace: "nowrap" }}>
            Join Waitlist
          </button>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ backgroundColor: "#080F24", borderTop: "1px solid #1E3265", padding: "60px 48px 30px" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr 1fr 1fr 1fr", gap: "40px", marginBottom: "48px" }}>
            <div>
              <img src="/logo.png" height={36} style={{ width: "auto", marginBottom: "10px" }} alt="Cert2Hire" />
              <p style={{ fontSize: "11px", color: "#4A5C80", fontWeight: 600, letterSpacing: "0.1em" }}>CERT READY. HIRE READY.</p>
            </div>
            {[
              { heading: "Certifications", links: ["Security+ SY0-701", "Network+", "A+", "Cisco", "Microsoft", "AWS"] },
              { heading: "Resources", links: ["Study eBook", "Practice Exam", "PBQ Lab", "Video Lessons"] },
              { heading: "Company", links: ["About", "Pricing", "Contact"] },
              { heading: "Legal", links: ["Privacy Policy", "Terms of Service"] },
            ].map((col) => (
              <div key={col.heading}>
                <p style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.08em", color: "#4A5C80", marginBottom: "16px" }}>{col.heading.toUpperCase()}</p>
                {col.links.map((l) => (
                  <a key={l} href="#" style={{ display: "block", fontSize: "14px", color: "#8A9BBF", textDecoration: "none", marginBottom: "8px", transition: "color 0.2s" }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "#C9A44A")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "#8A9BBF")}>
                    {l}
                  </a>
                ))}
              </div>
            ))}
          </div>
          <div style={{ borderTop: "1px solid #1E3265", paddingTop: "24px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "12px" }}>
            <p style={{ fontSize: "13px", color: "#4A5C80", margin: 0 }}>© 2025 Cert2Hire. All rights reserved.</p>
            <div style={{ display: "flex", gap: "16px" }}>
              {/* LinkedIn */}
              <a href="#" style={{ color: "#4A5C80", transition: "color 0.2s" }} onMouseEnter={(e) => (e.currentTarget.style.color = "#C9A44A")} onMouseLeave={(e) => (e.currentTarget.style.color = "#4A5C80")}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
              </a>
              {/* Twitter/X */}
              <a href="#" style={{ color: "#4A5C80", transition: "color 0.2s" }} onMouseEnter={(e) => (e.currentTarget.style.color = "#C9A44A")} onMouseLeave={(e) => (e.currentTarget.style.color = "#4A5C80")}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              </a>
              {/* YouTube */}
              <a href="#" style={{ color: "#4A5C80", transition: "color 0.2s" }} onMouseEnter={(e) => (e.currentTarget.style.color = "#C9A44A")} onMouseLeave={(e) => (e.currentTarget.style.color = "#4A5C80")}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.95A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="#080F24"/></svg>
              </a>
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
}

/* ── PRODUCT TILE COMPONENT ── */
function ProductTile({ icon, badge, badgeColor, badgeMuted, price, title, body, cta, dimmed, notifyMe }: {
  icon: React.ReactNode;
  badge?: string;
  badgeColor?: string;
  badgeMuted?: boolean;
  price?: string;
  title: string;
  body: string;
  cta?: { label: string; href: string };
  dimmed?: boolean;
  notifyMe?: boolean;
}) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ backgroundColor: "white", border: "1px solid #E2E8F0", borderTop: "4px solid #C9A44A", borderRadius: "14px", padding: "28px 24px", display: "flex", flexDirection: "column", gap: "12px", opacity: dimmed ? 0.65 : 1, transform: hovered && !dimmed ? "translateY(-4px)" : "translateY(0)", boxShadow: hovered && !dimmed ? "0 12px 32px rgba(0,0,0,0.1)" : "0 2px 12px rgba(0,0,0,0.06)", transition: "transform 0.2s, box-shadow 0.2s" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div style={{ width: "44px", height: "44px", backgroundColor: "rgba(201,164,74,0.1)", borderRadius: "10px", display: "flex", alignItems: "center", justifyContent: "center" }}>
          {icon}
        </div>
        {badge && (
          <span style={{ fontSize: "11px", fontWeight: 700, padding: "3px 10px", borderRadius: "20px", backgroundColor: badgeMuted ? "transparent" : (badgeColor || "#C9A44A"), color: badgeMuted ? "#9CA3AF" : (badgeColor ? "white" : "#0D1B3E"), border: badgeMuted ? "1px solid #D1D5DB" : "none" }}>
            {badge}
          </span>
        )}
        {price && <span style={{ fontSize: "20px", fontWeight: 900, color: "#0D1B3E" }}>{price}</span>}
      </div>
      <h3 style={{ fontSize: "17px", fontWeight: 700, color: "#0D1B3E", margin: 0 }}>{title}</h3>
      <p style={{ fontSize: "14px", color: "#4A5C80", lineHeight: 1.65, margin: 0 }}>{body}</p>
      {cta && <a href={cta.href} style={{ fontSize: "13px", fontWeight: 600, color: "#C9A44A", textDecoration: "none" }}>{cta.label}</a>}
      {notifyMe && <button style={{ marginTop: "4px", backgroundColor: "transparent", border: "1px solid #D1D5DB", color: "#9CA3AF", borderRadius: "8px", padding: "8px", fontSize: "13px", cursor: "pointer" }}>Notify Me When Live</button>}
    </div>
  );
}

/* ── INLINE SVG ICONS ── */
function PlayIcon() {
  return <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#C9A44A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polygon points="10 8 16 12 10 16 10 8" fill="#C9A44A" stroke="none"/></svg>;
}
function BookIcon() {
  return <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#C9A44A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>;
}
function ChecklistIcon() {
  return <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#C9A44A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>;
}
function TerminalIcon() {
  return <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#C9A44A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="4 17 10 11 4 5"/><line x1="12" y1="19" x2="20" y2="19"/></svg>;
}
function AIIcon() {
  return <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#C9A44A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="10" rx="2"/><circle cx="12" cy="5" r="2"/><path d="M12 7v4"/><line x1="8" y1="16" x2="8" y2="16"/><line x1="12" y1="16" x2="12" y2="16"/><line x1="16" y1="16" x2="16" y2="16"/></svg>;
}
function CloudIcon() {
  return <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#C9A44A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"/></svg>;
}
