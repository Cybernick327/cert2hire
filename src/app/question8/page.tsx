"use client";

import { useState } from "react";

/* ════════════════════════════ TYPES ════════════════════════════ */

type LinkId = "link_web" | "link_ssh" | "link_email" | "link_dir" | "link_ftp";

interface NetworkLink {
  id: LinkId;
  from: string;
  to: string;
  currentProtocol: string;
  correctProtocol: string;
  options: string[];
  description: string;
  port: string;
}

interface Q8Scores {
  t1_webHttps: boolean;
  t2_adminSsh: boolean;
  t3_emailSmtps: boolean;
  t4_dirLdaps: boolean;
  t5_fileSftp: boolean;
}

/* ════════════════════════════ DATA ════════════════════════════ */

const NETWORK_LINKS: NetworkLink[] = [
  {
    id: "link_web",
    from: "Internet",
    to: "Web Server",
    currentProtocol: "HTTP",
    correctProtocol: "HTTPS",
    options: ["— Select —", "HTTP", "HTTPS", "FTP", "TELNET"],
    description: "Public web traffic to the corporate portal",
    port: "443",
  },
  {
    id: "link_ssh",
    from: "Admin Workstation",
    to: "Core Switch",
    currentProtocol: "Telnet",
    correctProtocol: "SSH",
    options: ["— Select —", "Telnet", "SSH", "RDP", "SNMP v1"],
    description: "Administrator remote management of network devices",
    port: "22",
  },
  {
    id: "link_email",
    from: "Email Clients",
    to: "Mail Server",
    currentProtocol: "SMTP",
    correctProtocol: "SMTPS",
    options: ["— Select —", "SMTP", "SMTPS", "POP3", "IMAP"],
    description: "Outbound email transmission from client to server",
    port: "465",
  },
  {
    id: "link_dir",
    from: "Workstations",
    to: "Active Directory",
    currentProtocol: "LDAP",
    correctProtocol: "LDAPS",
    options: ["— Select —", "LDAP", "LDAPS", "Kerberos", "NTLMv1"],
    description: "Directory services authentication and user lookups",
    port: "636",
  },
  {
    id: "link_ftp",
    from: "Dev Team",
    to: "File Server",
    currentProtocol: "FTP",
    correctProtocol: "SFTP",
    options: ["— Select —", "FTP", "SFTP", "SMBv1", "TFTP"],
    description: "Developer file transfers and deployments",
    port: "22",
  },
];

/* Device positions for SVG diagram */
const DEVICE_POS: Record<string, { x: number; y: number }> = {
  "Internet":           { x: 80,  y: 80  },
  "Web Server":         { x: 300, y: 80  },
  "Admin Workstation":  { x: 80,  y: 220 },
  "Core Switch":        { x: 300, y: 220 },
  "Email Clients":      { x: 80,  y: 360 },
  "Mail Server":        { x: 300, y: 360 },
  "Workstations":       { x: 530, y: 80  },
  "Active Directory":   { x: 530, y: 220 },
  "Dev Team":           { x: 530, y: 360 },
  "File Server":        { x: 700, y: 360 },
};

const LINK_PAIRS: [string, string][] = [
  ["Internet", "Web Server"],
  ["Admin Workstation", "Core Switch"],
  ["Email Clients", "Mail Server"],
  ["Workstations", "Active Directory"],
  ["Dev Team", "File Server"],
];

/* ════════════════════════════ LEFT PANEL ════════════════════════════ */

function LeftPanel8({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <div
      style={{
        width: open ? "292px" : "0px",
        minWidth: open ? "292px" : "0px",
        transition: "width 0.22s ease, min-width 0.22s ease",
        overflow: "hidden",
        borderRight: open ? "1px solid #DDDDDD" : "none",
        backgroundColor: "#F5F7FA",
        display: "flex",
        flexDirection: "column",
        height: "100%",
      }}
    >
      <div style={{ backgroundColor: "#0A1628", color: "white", padding: "0 12px", height: "44px", display: "flex", alignItems: "center", justifyContent: "space-between", flexShrink: 0, minWidth: "292px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /><polyline points="14,2 14,8 20,8" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /><line x1="16" y1="13" x2="8" y2="13" stroke="white" strokeWidth="1.8" strokeLinecap="round" /><line x1="16" y1="17" x2="8" y2="17" stroke="white" strokeWidth="1.8" strokeLinecap="round" /></svg>
          <span style={{ fontSize: "12px", fontWeight: 700, letterSpacing: "0.06em" }}>TEST QUESTION</span>
        </div>
        <button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer", padding: "2px", opacity: 0.8, lineHeight: 1 }}>
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none"><line x1="18" y1="6" x2="6" y2="18" stroke="white" strokeWidth="2.2" strokeLinecap="round" /><line x1="6" y1="6" x2="18" y2="18" stroke="white" strokeWidth="2.2" strokeLinecap="round" /></svg>
        </button>
      </div>

      <div style={{ flex: 1, overflowY: "auto", overflowX: "hidden", padding: "18px 16px 24px", minWidth: "292px" }}>
        <div style={{ marginBottom: "20px" }}>
          <h2 style={{ fontSize: "11px", fontWeight: 800, letterSpacing: "0.1em", color: "#0A1628", margin: "0 0 12px", borderBottom: "2px solid #F5A623", paddingBottom: "6px", textTransform: "uppercase" }}>
            Scenario
          </h2>
          <p style={{ fontSize: "12.5px", lineHeight: "1.75", color: "#1e293b", marginBottom: "12px" }}>
            Vanguard Retail Corporation has commissioned a security architecture review following a PCI DSS audit finding. The auditor flagged five network connections that are currently using insecure, plaintext protocols — all of which transmit sensitive data including credentials, customer records, and configuration commands.
          </p>
          <p style={{ fontSize: "12.5px", lineHeight: "1.75", color: "#1e293b", marginBottom: "12px" }}>
            CISO Danielle Okonkwo has tasked you with identifying the correct secure replacement protocol for each flagged connection. The network architecture team will use your recommendations to update the device configurations and firewall rules.
          </p>
          <p style={{ fontSize: "12.5px", lineHeight: "1.75", color: "#1e293b" }}>
            Each connection currently uses a protocol that transmits data in cleartext and is vulnerable to interception. Your task is to select the correct encrypted replacement for each link.
          </p>
        </div>

        <div>
          <h2 style={{ fontSize: "11px", fontWeight: 800, letterSpacing: "0.1em", color: "#0A1628", margin: "0 0 12px", borderBottom: "2px solid #F5A623", paddingBottom: "6px", textTransform: "uppercase" }}>
            Instructions
          </h2>
          <ol style={{ margin: 0, padding: "0 0 0 18px" }}>
            {[
              "Review the network diagram. Each connection line is labeled with the current insecure protocol in use.",
              "Click on any connection line or device to highlight it and see its details in the Protocol Configuration panel below the diagram.",
              "For each of the five connections, use the dropdown to select the correct secure replacement protocol.",
              "All five connections must be updated before submitting.",
              "Click Submit when all protocols have been selected.",
            ].map((s, i) => (
              <li key={i} style={{ fontSize: "12.5px", lineHeight: "1.7", color: "#1e293b", marginBottom: "10px" }}>{s}</li>
            ))}
          </ol>
          <div style={{ marginTop: "14px", backgroundColor: "#FEF2F2", border: "1px solid #FECACA", borderRadius: "6px", padding: "10px 12px" }}>
            <div style={{ fontSize: "10.5px", fontWeight: 700, color: "#991B1B", textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: "5px" }}>Security Reminder</div>
            <div style={{ fontSize: "11.5px", color: "#991B1B", lineHeight: "1.6" }}>
              Cleartext protocols expose credentials and data to anyone who can intercept network traffic. Always replace with encrypted equivalents.
            </div>
          </div>
          <p style={{ fontSize: "11.5px", fontStyle: "italic", color: "#64748b", marginTop: "14px", lineHeight: "1.6" }}>
            To reset all selections, click Reset All Answers.
          </p>
        </div>
      </div>
    </div>
  );
}

/* ════════════════════════════ DEVICE SVG ════════════════════════════ */

function DeviceIcon({ type }: { type: string }) {
  if (type === "Internet") {
    return (
      <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
        <circle cx="18" cy="18" r="16" stroke="#3B82F6" strokeWidth="1.5" />
        <ellipse cx="18" cy="18" rx="7" ry="16" stroke="#3B82F6" strokeWidth="1.5" />
        <line x1="2" y1="18" x2="34" y2="18" stroke="#3B82F6" strokeWidth="1.5" />
        <line x1="5" y1="10" x2="31" y2="10" stroke="#3B82F6" strokeWidth="1" />
        <line x1="5" y1="26" x2="31" y2="26" stroke="#3B82F6" strokeWidth="1" />
      </svg>
    );
  }
  if (type.includes("Server")) {
    return (
      <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
        <rect x="4" y="8" width="28" height="8" rx="2" stroke="#0891B2" strokeWidth="1.5" />
        <rect x="4" y="19" width="28" height="8" rx="2" stroke="#0891B2" strokeWidth="1.5" />
        <circle cx="28" cy="12" r="2" fill="#0891B2" />
        <circle cx="28" cy="23" r="2" fill="#0891B2" />
        <line x1="8" y1="12" x2="20" y2="12" stroke="#0891B2" strokeWidth="1.2" />
        <line x1="8" y1="23" x2="20" y2="23" stroke="#0891B2" strokeWidth="1.2" />
      </svg>
    );
  }
  if (type.includes("Switch")) {
    return (
      <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
        <rect x="4" y="13" width="28" height="10" rx="2" stroke="#7C3AED" strokeWidth="1.5" />
        <circle cx="9" cy="18" r="2" fill="#7C3AED" />
        <circle cx="15" cy="18" r="2" fill="#7C3AED" />
        <circle cx="21" cy="18" r="2" fill="#7C3AED" />
        <circle cx="27" cy="18" r="2" fill="#7C3AED" />
      </svg>
    );
  }
  if (type.includes("Active Directory")) {
    return (
      <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
        <rect x="6" y="6" width="24" height="24" rx="3" stroke="#0891B2" strokeWidth="1.5" />
        <circle cx="18" cy="14" r="4" stroke="#0891B2" strokeWidth="1.5" />
        <path d="M8 28c0-5 4-8 10-8s10 3 10 8" stroke="#0891B2" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    );
  }
  /* Workstation / client */
  return (
    <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
      <rect x="5" y="5" width="26" height="18" rx="2" stroke="#16A34A" strokeWidth="1.5" />
      <line x1="12" y1="23" x2="12" y2="30" stroke="#16A34A" strokeWidth="1.5" />
      <line x1="24" y1="23" x2="24" y2="30" stroke="#16A34A" strokeWidth="1.5" />
      <line x1="8" y1="30" x2="28" y2="30" stroke="#16A34A" strokeWidth="1.5" />
    </svg>
  );
}

/* ════════════════════════════ RESULTS PANEL ════════════════════════════ */

const Q8_TASK_KEYS: (keyof Q8Scores)[] = [
  "t1_webHttps",
  "t2_adminSsh",
  "t3_emailSmtps",
  "t4_dirLdaps",
  "t5_fileSftp",
];

function ResultsPanel8({ scores, onExit, onNext }: { scores: Q8Scores; onExit: () => void; onNext?: () => void }) {
  const total = Q8_TASK_KEYS.filter((k) => scores[k]).length;
  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 60, backgroundColor: "rgba(0,0,0,0.55)", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ backgroundColor: "white", borderRadius: "12px", boxShadow: "0 24px 60px rgba(0,0,0,0.35)", overflow: "hidden", minWidth: "360px", maxWidth: "480px", width: "100%" }}>
        <div style={{ backgroundColor: "#0A1628", padding: "28px 32px 24px", textAlign: "center" }}>
          <div style={{ width: "64px", height: "64px", borderRadius: "50%", backgroundColor: total >= 4 ? "#2E7D32" : total >= 2 ? "#E65100" : "#C62828", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px", boxShadow: "0 0 0 6px rgba(255,255,255,0.12)" }}>
            {total >= 3 ? <svg width="30" height="30" viewBox="0 0 24 24" fill="none"><polyline points="20,6 9,17 4,12" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" /></svg> : <svg width="28" height="28" viewBox="0 0 24 24" fill="none"><line x1="18" y1="6" x2="6" y2="18" stroke="white" strokeWidth="2.5" strokeLinecap="round" /><line x1="6" y1="6" x2="18" y2="18" stroke="white" strokeWidth="2.5" strokeLinecap="round" /></svg>}
          </div>
          <div style={{ color: "white", fontSize: "24px", fontWeight: 800, letterSpacing: "-0.02em" }}>{total} out of 5 correct</div>
          <div style={{ display: "flex", justifyContent: "center", gap: "6px", marginTop: "14px", flexWrap: "wrap" }}>
            {Q8_TASK_KEYS.map((k, i) => {
              const ok = scores[k];
              return (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: "4px", backgroundColor: ok ? "rgba(46,125,50,0.3)" : "rgba(198,40,40,0.3)", borderRadius: "16px", padding: "3px 9px 3px 6px", fontSize: "11px", color: ok ? "#A5D6A7" : "#FFCDD2", fontWeight: 600 }}>
                  {ok ? <svg width="11" height="11" viewBox="0 0 24 24" fill="none"><polyline points="20,6 9,17 4,12" stroke="#A5D6A7" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" /></svg> : <svg width="10" height="10" viewBox="0 0 24 24" fill="none"><line x1="18" y1="6" x2="6" y2="18" stroke="#FFCDD2" strokeWidth="2.8" strokeLinecap="round" /><line x1="6" y1="6" x2="18" y2="18" stroke="#FFCDD2" strokeWidth="2.8" strokeLinecap="round" /></svg>}
                  T{i + 1}
                </div>
              );
            })}
          </div>
        </div>
        <div style={{ padding: "24px 32px 28px", textAlign: "center" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "12px", flexWrap: "wrap" }}>
            <button onClick={onExit} style={{ backgroundColor: "white", color: "#0A1628", border: "2px solid #0A1628", borderRadius: "6px", padding: "11px 28px", fontSize: "13.5px", fontWeight: 700, cursor: "pointer" }}>Back to Home</button>
            {onNext && <button onClick={onNext} style={{ backgroundColor: "#0066CC", color: "white", border: "none", borderRadius: "6px", padding: "12px 28px", fontSize: "13.5px", fontWeight: 700, cursor: "pointer", boxShadow: "0 2px 10px rgba(0,102,204,0.35)" }}>Next Question →</button>}
          </div>
          <div style={{ fontSize: "11px", color: "#9CA3AF", marginTop: "18px" }}>© Cert2Hire. All Rights Reserved.</div>
        </div>
      </div>
    </div>
  );
}

/* ════════════════════════════ MAIN COMPONENT ════════════════════════════ */

export default function Question8() {
  const [leftPanelOpen, setLeftPanelOpen] = useState(true);
  const [submitted, setSubmitted] = useState(false);
  const [finishFeedback, setFinishFeedback] = useState(false);
  const [selectedLinkId, setSelectedLinkId] = useState<LinkId | null>("link_web");

  const [protocols, setProtocols] = useState<Record<LinkId, string>>({
    link_web:   "",
    link_ssh:   "",
    link_email: "",
    link_dir:   "",
    link_ftp:   "",
  });

  function setProtocol(id: LinkId, val: string) {
    setProtocols((p) => ({ ...p, [id]: val }));
  }

  function handleReset() {
    setProtocols({ link_web: "", link_ssh: "", link_email: "", link_dir: "", link_ftp: "" });
    setSubmitted(false);
    setFinishFeedback(false);
    setSelectedLinkId("link_web");
    setLeftPanelOpen(true);
  }

  const scores: Q8Scores = {
    t1_webHttps:   protocols.link_web   === "HTTPS",
    t2_adminSsh:   protocols.link_ssh   === "SSH",
    t3_emailSmtps: protocols.link_email === "SMTPS",
    t4_dirLdaps:   protocols.link_dir   === "LDAPS",
    t5_fileSftp:   protocols.link_ftp   === "SFTP",
  };

  const allSelected = Object.values(protocols).every((v) => v !== "");
  const selectedLink = NETWORK_LINKS.find((l) => l.id === selectedLinkId);

  const Q8_FINISH_TASKS = Q8_TASK_KEYS;

  /* Map linkId → score key */
  const linkScoreMap: Record<LinkId, keyof Q8Scores> = {
    link_web:   "t1_webHttps",
    link_ssh:   "t2_adminSsh",
    link_email: "t3_emailSmtps",
    link_dir:   "t4_dirLdaps",
    link_ftp:   "t5_fileSftp",
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh", overflow: "hidden", backgroundColor: "white" }}>

      {/* ════ HEADER ════ */}
      <header style={{ position: "relative", zIndex: 20, backgroundColor: "white", borderBottom: "1px solid #DDDDDD", padding: "12px 20px", display: "flex", alignItems: "flex-start", justifyContent: "space-between", flexShrink: 0, gap: "16px" }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
            <a href="/" style={{ display: "flex", alignItems: "center", gap: "8px", textDecoration: "none" }}>
              <div style={{ width: "28px", height: "28px", borderRadius: "6px", backgroundColor: "#0A1628", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <span style={{ color: "#F5A623", fontWeight: 900, fontSize: "15px", lineHeight: 1 }}>C</span>
              </div>
              <span style={{ fontWeight: 800, fontSize: "14px", color: "#0A1628", letterSpacing: "0.01em" }}>Cert2Hire</span>
            </a>
            <span style={{ fontSize: "10.5px", color: "#94A3B8", fontWeight: 500 }}>Your Fastest Path to Certification</span>
          </div>
          <h1 style={{ fontSize: "20px", fontWeight: 800, color: "#0A1628", margin: "0 0 4px", letterSpacing: "-0.025em" }}>
            Question 8 — Secure Protocol Replacement
          </h1>
          <p style={{ fontSize: "12.5px", color: "#64748B", margin: 0 }}>
            Identify the correct encrypted protocol for each insecure network connection.
          </p>
        </div>
        <button
          onClick={() => setSubmitted(true)}
          disabled={!allSelected}
          style={{
            backgroundColor: allSelected ? "#0066CC" : "#94A3B8",
            color: "white",
            border: "none",
            borderRadius: "6px",
            padding: "10px 26px",
            fontSize: "13.5px",
            fontWeight: 700,
            cursor: allSelected ? "pointer" : "not-allowed",
            whiteSpace: "nowrap",
            flexShrink: 0,
            boxShadow: allSelected ? "0 2px 8px rgba(0,102,204,0.3)" : "none",
            letterSpacing: "0.02em",
            marginTop: "4px",
          }}
        >
          Submit
        </button>
      </header>

      {/* ════ MAIN ROW ════ */}
      <div style={{ display: "flex", flex: 1, overflow: "hidden" }}>
        <LeftPanel8 open={leftPanelOpen} onClose={() => setLeftPanelOpen(false)} />

        <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden", minWidth: 0 }}>
          {/* Toolbar */}
          <div style={{ position: "relative", zIndex: 20, padding: "7px 14px", borderBottom: "1px solid #DDDDDD", display: "flex", alignItems: "center", gap: "8px", backgroundColor: "#FAFAFA", flexShrink: 0 }}>
            <button onClick={() => setLeftPanelOpen((v) => !v)} style={{ display: "flex", alignItems: "center", gap: "6px", backgroundColor: "white", border: "1px solid #DDDDDD", borderRadius: "20px", padding: "5px 13px", fontSize: "12px", fontWeight: 600, color: "#374151", cursor: "pointer" }}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" stroke="#374151" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /><polyline points="14,2 14,8 20,8" stroke="#374151" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /><line x1="16" y1="13" x2="8" y2="13" stroke="#374151" strokeWidth="1.8" strokeLinecap="round" /><line x1="16" y1="17" x2="8" y2="17" stroke="#374151" strokeWidth="1.8" strokeLinecap="round" /></svg>
              Show Question
            </button>
            <button onClick={handleReset} style={{ display: "flex", alignItems: "center", gap: "6px", backgroundColor: "white", border: "1px solid #DDDDDD", borderRadius: "20px", padding: "5px 13px", fontSize: "12px", fontWeight: 600, color: "#374151", cursor: "pointer" }}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none"><polyline points="1,4 1,10 7,10" stroke="#374151" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /><path d="M3.51 15a9 9 0 1 0 .49-5.05" stroke="#374151" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
              Reset All Answers
            </button>
            <div style={{ flex: 1 }} />
            <button onClick={() => { window.location.href = "/question7"; }} style={{ display: "flex", alignItems: "center", gap: "5px", backgroundColor: "white", color: "#374151", border: "1px solid #DDDDDD", borderRadius: "20px", padding: "5px 14px", fontSize: "12px", fontWeight: 600, cursor: "pointer" }}>← Previous</button>
          </div>

          {/* Workspace */}
          <div style={{ flex: 1, overflow: "auto", backgroundColor: "#E8EEF4", padding: "20px" }}>

            {/* Network Diagram */}
            <div style={{ backgroundColor: "white", borderRadius: "12px", border: "1px solid #DDDDDD", padding: "20px", marginBottom: "16px", boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}>
              <div style={{ fontSize: "13px", fontWeight: 700, color: "#0A1628", marginBottom: "4px" }}>Vanguard Retail Corporation — Network Architecture</div>
              <div style={{ fontSize: "11.5px", color: "#64748B", marginBottom: "16px" }}>Click a connection to configure its protocol. Red connections use insecure protocols. Green connections have been updated.</div>

              {/* SVG Diagram */}
              <div style={{ position: "relative", overflowX: "auto" }}>
                <svg width="800" height="460" viewBox="0 0 800 460" style={{ display: "block", maxWidth: "100%" }}>
                  {/* Background zones */}
                  <rect x="10" y="10" width="380" height="430" rx="8" fill="#F8FAFC" stroke="#E2E8F0" strokeWidth="1" />
                  <rect x="400" y="10" width="390" height="430" rx="8" fill="#F8FAFC" stroke="#E2E8F0" strokeWidth="1" />
                  <text x="195" y="30" textAnchor="middle" fontSize="10" fontWeight="700" fill="#94A3B8" letterSpacing="0.08em">ZONE A — CORPORATE PERIMETER</text>
                  <text x="595" y="30" textAnchor="middle" fontSize="10" fontWeight="700" fill="#94A3B8" letterSpacing="0.08em">ZONE B — INTERNAL SERVICES</text>

                  {/* Connection lines */}
                  {NETWORK_LINKS.map((link) => {
                    const fromPos = DEVICE_POS[link.from];
                    const toPos = DEVICE_POS[link.to];
                    if (!fromPos || !toPos) return null;
                    const proto = protocols[link.id];
                    const isSelected = selectedLinkId === link.id;
                    const isSet = proto !== "";
                    const isCorrect = proto === link.correctProtocol;
                    let lineColor = "#CBD5E1";
                    if (isSelected) lineColor = "#3B82F6";
                    else if (isSet && isCorrect) lineColor = "#16A34A";
                    else if (isSet && !isCorrect) lineColor = "#DC2626";

                    const mx = (fromPos.x + toPos.x) / 2 + 40;
                    const my = (fromPos.y + toPos.y) / 2 + 40;

                    return (
                      <g key={link.id} onClick={() => setSelectedLinkId(link.id)} style={{ cursor: "pointer" }}>
                        <line
                          x1={fromPos.x + 40} y1={fromPos.y + 40}
                          x2={toPos.x + 40} y2={toPos.y + 40}
                          stroke={lineColor}
                          strokeWidth={isSelected ? 3 : 2}
                          strokeDasharray={isSet ? "none" : "6,3"}
                        />
                        {/* Protocol label on line */}
                        <rect x={mx - 28} y={my - 11} width={56} height={18} rx="4"
                          fill={isSet ? (isCorrect ? "#F0FDF4" : "#FEF2F2") : "white"}
                          stroke={isSet ? (isCorrect ? "#16A34A" : "#DC2626") : "#CBD5E1"}
                          strokeWidth="1"
                        />
                        <text x={mx} y={my + 4} textAnchor="middle" fontSize="9" fontWeight="700"
                          fill={isSet ? (isCorrect ? "#16A34A" : "#DC2626") : "#94A3B8"}
                        >
                          {proto || link.currentProtocol}
                        </text>
                        {/* Click indicator */}
                        {isSelected && (
                          <circle cx={mx} cy={my + 14} r="3" fill="#3B82F6" />
                        )}
                      </g>
                    );
                  })}

                  {/* Devices */}
                  {Object.entries(DEVICE_POS).map(([name, pos]) => (
                    <g key={name}>
                      <rect x={pos.x} y={pos.y} width="80" height="60" rx="8"
                        fill="white" stroke="#E2E8F0" strokeWidth="1.5"
                        style={{ filter: "drop-shadow(0 1px 3px rgba(0,0,0,0.08))" }}
                      />
                      {/* Device icon placeholder */}
                      <rect x={pos.x + 22} y={pos.y + 6} width="36" height="28" rx="4" fill="#F1F5F9" />
                      <text x={pos.x + 40} y={pos.y + 50} textAnchor="middle" fontSize="8.5" fontWeight="600" fill="#374151">
                        {name.replace(" Workstation", " WS").replace("Active Directory", "AD").replace("Core Switch", "Switch")}
                      </text>
                    </g>
                  ))}
                </svg>
              </div>
            </div>

            {/* Protocol Configuration Panel */}
            <div style={{ backgroundColor: "white", borderRadius: "10px", border: "1px solid #E2E8F0", overflow: "hidden", boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}>
              <div style={{ backgroundColor: "#0A1628", padding: "10px 16px", display: "flex", alignItems: "center", gap: "10px" }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke="#F5A623" strokeWidth="1.8" /><path d="M8 12h8M12 8v8" stroke="#F5A623" strokeWidth="1.8" strokeLinecap="round" /></svg>
                <span style={{ color: "#F5A623", fontSize: "12px", fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase" }}>Protocol Configuration</span>
                {selectedLink && (
                  <span style={{ color: "#94A3B8", fontSize: "12px" }}>— {selectedLink.from} → {selectedLink.to}</span>
                )}
              </div>

              <div style={{ padding: "16px" }}>
                {/* Link tabs */}
                <div style={{ display: "flex", gap: "6px", marginBottom: "14px", flexWrap: "wrap" }}>
                  {NETWORK_LINKS.map((link, idx) => {
                    const proto = protocols[link.id];
                    const isSet = proto !== "";
                    const isCorrect = proto === link.correctProtocol;
                    const isActive = selectedLinkId === link.id;
                    return (
                      <button
                        key={link.id}
                        onClick={() => setSelectedLinkId(link.id)}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "5px",
                          backgroundColor: isActive ? "#EFF6FF" : isSet ? (isCorrect ? "#F0FDF4" : "#FEF2F2") : "#F8FAFC",
                          border: `2px solid ${isActive ? "#3B82F6" : isSet ? (isCorrect ? "#16A34A" : "#DC2626") : "#E2E8F0"}`,
                          borderRadius: "7px",
                          padding: "6px 12px",
                          fontSize: "12px",
                          fontWeight: 600,
                          color: isActive ? "#1E40AF" : isSet ? (isCorrect ? "#166534" : "#991B1B") : "#374151",
                          cursor: "pointer",
                        }}
                      >
                        {isSet ? (
                          isCorrect
                            ? <svg width="13" height="13" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" fill="#16A34A" /><polyline points="8,12 11,15 16,9" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                            : <svg width="13" height="13" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" fill="#DC2626" /><line x1="8" y1="8" x2="16" y2="16" stroke="white" strokeWidth="2.2" strokeLinecap="round" /><line x1="16" y1="8" x2="8" y2="16" stroke="white" strokeWidth="2.2" strokeLinecap="round" /></svg>
                          )
                        : <svg width="12" height="12" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke="#CBD5E1" strokeWidth="2" /></svg>}
                        Link {idx + 1}
                      </button>
                    );
                  })}
                </div>

                {selectedLink && (
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr auto", gap: "16px", alignItems: "end" }}>
                    <div>
                      <div style={{ fontSize: "10.5px", fontWeight: 700, color: "#64748B", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "4px" }}>Connection</div>
                      <div style={{ fontSize: "13px", color: "#1E293B", fontWeight: 600 }}>{selectedLink.from} → {selectedLink.to}</div>
                      <div style={{ fontSize: "11.5px", color: "#64748B", marginTop: "2px" }}>{selectedLink.description}</div>
                    </div>
                    <div>
                      <div style={{ fontSize: "10.5px", fontWeight: 700, color: "#64748B", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "4px" }}>Current (Insecure)</div>
                      <span style={{ display: "inline-block", backgroundColor: "#FEF2F2", color: "#DC2626", border: "1px solid #FECACA", borderRadius: "5px", padding: "3px 10px", fontFamily: "ui-monospace, monospace", fontSize: "13px", fontWeight: 700 }}>
                        {selectedLink.currentProtocol}
                      </span>
                    </div>
                    <div>
                      <div style={{ fontSize: "10.5px", fontWeight: 700, color: "#64748B", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "4px" }}>Select Secure Replacement</div>
                      <select
                        value={protocols[selectedLink.id]}
                        onChange={(e) => setProtocol(selectedLink.id, e.target.value)}
                        style={{
                          padding: "7px 10px",
                          fontSize: "13px",
                          fontFamily: "ui-monospace, 'Courier New', monospace",
                          border: `2px solid ${protocols[selectedLink.id] ? (protocols[selectedLink.id] === selectedLink.correctProtocol ? "#16A34A" : "#DC2626") : "#E2E8F0"}`,
                          borderRadius: "6px",
                          backgroundColor: protocols[selectedLink.id] ? (protocols[selectedLink.id] === selectedLink.correctProtocol ? "#F0FDF4" : "#FEF2F2") : "white",
                          color: "#1E293B",
                          cursor: "pointer",
                          fontWeight: 600,
                          outline: "none",
                          minWidth: "140px",
                        }}
                      >
                        {selectedLink.options.map((o) => (
                          <option key={o} value={o === "— Select —" ? "" : o}>{o}</option>
                        ))}
                      </select>
                    </div>
                    <div style={{ paddingBottom: "2px" }}>
                      {protocols[selectedLink.id] && protocols[selectedLink.id] === selectedLink.correctProtocol && (
                        <div style={{ display: "flex", alignItems: "center", gap: "6px", color: "#16A34A", fontSize: "12.5px", fontWeight: 700 }}>
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" fill="#16A34A" /><polyline points="8,12 11,15 16,9" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                          Port {selectedLink.port}
                        </div>
                      )}
                      {protocols[selectedLink.id] && protocols[selectedLink.id] !== selectedLink.correctProtocol && (
                        <div style={{ display: "flex", alignItems: "center", gap: "6px", color: "#DC2626", fontSize: "12.5px", fontWeight: 600 }}>
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" fill="#DC2626" /><line x1="8" y1="8" x2="16" y2="16" stroke="white" strokeWidth="2.5" strokeLinecap="round" /><line x1="16" y1="8" x2="8" y2="16" stroke="white" strokeWidth="2.5" strokeLinecap="round" /></svg>
                          Incorrect
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ════ BOTTOM BAR ════ */}
      <div style={{ position: "relative", zIndex: 20, borderTop: "1px solid #DDDDDD", padding: "9px 18px", display: "flex", alignItems: "center", justifyContent: "space-between", backgroundColor: "white", flexShrink: 0 }}>
        <button onClick={() => setLeftPanelOpen((v) => !v)} style={{ display: "flex", alignItems: "center", gap: "6px", backgroundColor: "#F5F7FA", border: "1px solid #DDDDDD", borderRadius: "5px", padding: "6px 14px", fontSize: "12.5px", fontWeight: 600, color: "#374151", cursor: "pointer" }}>
          Scenario
        </button>
        <div style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap" }}>
          {finishFeedback && Q8_FINISH_TASKS.map((k, i) => {
            const ok = scores[k];
            return (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: "4px", backgroundColor: ok ? "#F0FDF4" : "#FEF2F2", border: `1px solid ${ok ? "#BBF7D0" : "#FECACA"}`, borderRadius: "16px", padding: "3px 9px 3px 6px", fontSize: "11.5px", color: ok ? "#166534" : "#991B1B", fontWeight: 600 }}>
                {ok ? <svg width="12" height="12" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" fill="#16A34A" /><polyline points="8,12 11,15 16,9" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" /></svg> : <svg width="12" height="12" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" fill="#DC2626" /><line x1="8" y1="8" x2="16" y2="16" stroke="white" strokeWidth="2.2" strokeLinecap="round" /><line x1="16" y1="8" x2="8" y2="16" stroke="white" strokeWidth="2.2" strokeLinecap="round" /></svg>}
                T{i + 1}
              </div>
            );
          })}
          <button onClick={handleReset} style={{ backgroundColor: "white", border: "1px solid #DDDDDD", borderRadius: "5px", padding: "6px 14px", fontSize: "12.5px", fontWeight: 600, color: "#374151", cursor: "pointer" }}>Reset All Answers</button>
          <button onClick={() => setFinishFeedback((v) => !v)} style={{ backgroundColor: finishFeedback ? "#475569" : "#0A1628", color: "white", border: "none", borderRadius: "5px", padding: "6px 18px", fontSize: "12.5px", fontWeight: 700, cursor: "pointer" }}>{finishFeedback ? "Hide" : "Finish"}</button>
        </div>
      </div>

      {submitted && (
        <ResultsPanel8
          scores={scores}
          onExit={() => { window.location.href = "/"; }}
        />
      )}
    </div>
  );
}
