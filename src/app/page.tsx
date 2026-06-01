"use client";

import Link from "next/link";

const QUESTIONS = [
  {
    num: 1,
    href: "/question1",
    title: "Network Diagram — ACL Configuration",
    domain: "Network Security",
    description: "Diagnose a connectivity fault by running workstation diagnostics and correcting a misconfigured ACL rule on the perimeter router.",
    color: "#0066CC",
    lightColor: "#EFF6FF",
    borderColor: "#BFDBFE",
  },
  {
    num: 2,
    href: "/question2",
    title: "SIEM Log Investigation",
    domain: "Security Operations",
    description: "Investigate a brute force attack in the SIEM dashboard, identify the attacking source IP, and submit a formal incident report.",
    color: "#7C3AED",
    lightColor: "#F5F3FF",
    borderColor: "#DDD6FE",
  },
  {
    num: 3,
    href: "/question3",
    title: "Vulnerability Scan Analysis",
    domain: "Vulnerability Management",
    description: "Review a vulnerability scan report, identify the highest-priority CVE, select the correct remediation, and prioritize affected hosts.",
    color: "#DC2626",
    lightColor: "#FEF2F2",
    borderColor: "#FECACA",
  },
  {
    num: 4,
    href: "/question4",
    title: "IAM Access Control Audit",
    domain: "Identity & Access Management",
    description: "Audit user permissions against the principle of least privilege — revoke excess access and grant missing required permissions.",
    color: "#0891B2",
    lightColor: "#ECFEFF",
    borderColor: "#A5F3FC",
  },
  {
    num: 5,
    href: "/question5",
    title: "Password Security & Credential Breach",
    domain: "Cryptography",
    description: "Analyze a compromised credential database, identify insecure hashing algorithms, and recommend a secure password policy.",
    color: "#16A34A",
    lightColor: "#F0FDF4",
    borderColor: "#BBF7D0",
  },
  {
    num: 6,
    href: "/question6",
    title: "Stakeholder Persona Security Controls",
    domain: "Security Controls Framework",
    description: "Match three executive security concerns to the correct control category, control type, and specific remediation measure.",
    color: "#D97706",
    lightColor: "#FFFBEB",
    borderColor: "#FDE68A",
  },
  {
    num: 7,
    href: "/question7",
    title: "Cyber Kill Chain Mapping",
    domain: "Threat Intelligence",
    description: "Map seven documented attacker actions from a real APT intrusion to the correct phase of the Lockheed Martin Cyber Kill Chain.",
    color: "#0891B2",
    lightColor: "#ECFEFF",
    borderColor: "#A5F3FC",
  },
  {
    num: 8,
    href: "/question8",
    title: "Secure Protocol Replacement",
    domain: "Network Security",
    description: "Identify and replace five insecure plaintext protocols with their correct encrypted alternatives on a corporate network diagram.",
    color: "#16A34A",
    lightColor: "#F0FDF4",
    borderColor: "#BBF7D0",
  },
];

export default function HomePage() {
  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#F8FAFC", fontFamily: "system-ui, -apple-system, sans-serif" }}>

      {/* ════ HEADER ════ */}
      <header
        style={{
          backgroundColor: "#0A1628",
          padding: "0 40px",
          height: "60px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <div
            style={{
              width: "32px",
              height: "32px",
              borderRadius: "7px",
              backgroundColor: "#F5A623",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <span style={{ color: "#0A1628", fontWeight: 900, fontSize: "17px", lineHeight: 1 }}>C</span>
          </div>
          <span style={{ fontWeight: 800, fontSize: "16px", color: "white", letterSpacing: "0.01em" }}>Cert2Hire</span>
          <span
            style={{
              backgroundColor: "rgba(245,166,35,0.18)",
              color: "#F5A623",
              border: "1px solid rgba(245,166,35,0.35)",
              borderRadius: "12px",
              padding: "2px 10px",
              fontSize: "11px",
              fontWeight: 700,
              letterSpacing: "0.05em",
            }}
          >
            Security+ SY0-701
          </span>
        </div>
        <span style={{ fontSize: "12px", color: "#64748B" }}>Your Fastest Path to Certification</span>
      </header>

      {/* ════ HERO ════ */}
      <div
        style={{
          backgroundColor: "#0A1628",
          padding: "48px 40px 52px",
          textAlign: "center",
          borderBottom: "1px solid #1E3A5F",
        }}
      >
        <h1
          style={{
            fontSize: "34px",
            fontWeight: 900,
            color: "white",
            margin: "0 0 14px",
            letterSpacing: "-0.03em",
            lineHeight: 1.15,
          }}
        >
          Security+ Simulation Lab
        </h1>
        <p
          style={{
            fontSize: "15px",
            color: "#94A3B8",
            margin: "0 auto 28px",
            maxWidth: "600px",
            lineHeight: 1.7,
          }}
        >
          Eight performance-based question simulations covering the core domains of CompTIA Security+.
          Each delivers realistic scenarios, interactive tools, and immediate scored feedback.
        </p>
        <div style={{ display: "flex", justifyContent: "center", gap: "24px", flexWrap: "wrap" }}>
          {[
            { n: "8", label: "Question Simulations" },
            { n: "40", label: "Scored Tasks" },
            { n: "7", label: "Security Domains" },
          ].map((s) => (
            <div key={s.label} style={{ textAlign: "center" }}>
              <div style={{ fontSize: "28px", fontWeight: 900, color: "#F5A623", lineHeight: 1 }}>{s.n}</div>
              <div style={{ fontSize: "11.5px", color: "#64748B", marginTop: "3px", fontWeight: 500 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ════ CARDS GRID ════ */}
      <main style={{ maxWidth: "1100px", margin: "0 auto", padding: "40px 24px 60px" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
            gap: "20px",
          }}
        >
          {QUESTIONS.map((q) => (
            <div
              key={q.num}
              style={{
                backgroundColor: "white",
                border: "1px solid #E2E8F0",
                borderRadius: "12px",
                overflow: "hidden",
                boxShadow: "0 1px 6px rgba(0,0,0,0.06)",
                display: "flex",
                flexDirection: "column",
                transition: "box-shadow 0.15s, transform 0.12s",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLDivElement).style.boxShadow = "0 8px 28px rgba(0,0,0,0.12)";
                (e.currentTarget as HTMLDivElement).style.transform = "translateY(-2px)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLDivElement).style.boxShadow = "0 1px 6px rgba(0,0,0,0.06)";
                (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)";
              }}
            >
              {/* Colored top accent bar */}
              <div style={{ height: "5px", backgroundColor: q.color }} />

              {/* Card body */}
              <div style={{ padding: "20px 22px", flex: 1, display: "flex", flexDirection: "column" }}>
                {/* Q# + domain row */}
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "12px" }}>
                  <div
                    style={{
                      width: "42px",
                      height: "42px",
                      borderRadius: "10px",
                      backgroundColor: q.lightColor,
                      border: `1px solid ${q.borderColor}`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <span style={{ fontSize: "15px", fontWeight: 900, color: q.color }}>Q{q.num}</span>
                  </div>
                  <span
                    style={{
                      backgroundColor: q.lightColor,
                      color: q.color,
                      border: `1px solid ${q.borderColor}`,
                      borderRadius: "20px",
                      padding: "3px 10px",
                      fontSize: "10.5px",
                      fontWeight: 700,
                      letterSpacing: "0.03em",
                    }}
                  >
                    {q.domain}
                  </span>
                </div>

                {/* Title */}
                <h2
                  style={{
                    fontSize: "15.5px",
                    fontWeight: 800,
                    color: "#0A1628",
                    margin: "0 0 8px",
                    letterSpacing: "-0.01em",
                    lineHeight: 1.3,
                  }}
                >
                  {q.title}
                </h2>

                {/* Description */}
                <p
                  style={{
                    fontSize: "12.5px",
                    color: "#64748B",
                    lineHeight: 1.65,
                    margin: "0 0 18px",
                    flex: 1,
                  }}
                >
                  {q.description}
                </p>

                {/* Footer row */}
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <span
                    style={{
                      backgroundColor: "#F8FAFC",
                      color: "#64748B",
                      border: "1px solid #E2E8F0",
                      borderRadius: "12px",
                      padding: "3px 9px",
                      fontSize: "10.5px",
                      fontWeight: 600,
                    }}
                  >
                    5 Tasks
                  </span>
                  <Link
                    href={q.href}
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "5px",
                      backgroundColor: q.color,
                      color: "white",
                      borderRadius: "7px",
                      padding: "8px 18px",
                      fontSize: "13px",
                      fontWeight: 700,
                      textDecoration: "none",
                      letterSpacing: "0.02em",
                    }}
                  >
                    Start
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
                      <polyline points="9,18 15,12 9,6" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* ════ FOOTER ════ */}
      <footer
        style={{
          borderTop: "1px solid #E2E8F0",
          padding: "20px 40px",
          textAlign: "center",
          backgroundColor: "white",
        }}
      >
        <p style={{ fontSize: "12px", color: "#94A3B8", margin: 0 }}>
          © Cert2Hire. All Rights Reserved. &nbsp;·&nbsp; CompTIA Security+ SY0-701 Simulation Lab
        </p>
      </footer>
    </div>
  );
}
