"use client";

import { useState } from "react";

/* ════════════════════════════ TYPES ════════════════════════════ */

type Phase =
  | "Reconnaissance"
  | "Weaponization"
  | "Delivery"
  | "Exploitation"
  | "Installation"
  | "Command & Control"
  | "Actions on Objectives";

interface AttackActivity {
  id: string;
  label: string;
  correctPhase: Phase;
  hint: string;
}

interface Q7Scores {
  t1_reconCorrect: boolean;
  t2_deliveryCorrect: boolean;
  t3_exploitationCorrect: boolean;
  t4_installationCorrect: boolean;
  t5_c2Correct: boolean;
}

/* ════════════════════════════ DATA ════════════════════════════ */

const PHASES: Phase[] = [
  "Reconnaissance",
  "Weaponization",
  "Delivery",
  "Exploitation",
  "Installation",
  "Command & Control",
  "Actions on Objectives",
];

const PHASE_COLORS: Record<Phase, { bg: string; border: string; text: string; accent: string }> = {
  "Reconnaissance":        { bg: "#EFF6FF", border: "#BFDBFE", text: "#1E40AF", accent: "#3B82F6" },
  "Weaponization":         { bg: "#F5F3FF", border: "#DDD6FE", text: "#5B21B6", accent: "#7C3AED" },
  "Delivery":              { bg: "#FFF7ED", border: "#FED7AA", text: "#92400E", accent: "#F59E0B" },
  "Exploitation":          { bg: "#FEF2F2", border: "#FECACA", text: "#7F1D1D", accent: "#EF4444" },
  "Installation":          { bg: "#FFF1F2", border: "#FECDD3", text: "#881337", accent: "#F43F5E" },
  "Command & Control":     { bg: "#FDF4FF", border: "#F0ABFC", text: "#701A75", accent: "#D946EF" },
  "Actions on Objectives": { bg: "#0A1628", border: "#1E3A5F", text: "#F5A623", accent: "#F5A623" },
};

const ACTIVITIES: AttackActivity[] = [
  {
    id: "a1",
    label: "Attacker scraped LinkedIn to identify the CFO's email address and role",
    correctPhase: "Reconnaissance",
    hint: "Information gathering before the attack begins",
  },
  {
    id: "a2",
    label: "Malicious macro embedded in a Word document targeting the CFO",
    correctPhase: "Weaponization",
    hint: "Creating the attack tool or payload",
  },
  {
    id: "a3",
    label: "Spear-phishing email with malicious attachment sent to CFO@apex-defense.com",
    correctPhase: "Delivery",
    hint: "Transmitting the weapon to the target",
  },
  {
    id: "a4",
    label: "CFO opened the Word document; macro exploited CVE-2022-30190 (Follina)",
    correctPhase: "Exploitation",
    hint: "Triggering a vulnerability to gain execution",
  },
  {
    id: "a5",
    label: "Cobalt Strike beacon written to C:\\Users\\CFO\\AppData\\Roaming\\svchost32.exe and added to registry Run key",
    correctPhase: "Installation",
    hint: "Establishing persistence on the victim host",
  },
  {
    id: "a6",
    label: "Beacon checked in to 198.51.100.12:443 every 60 seconds over HTTPS",
    correctPhase: "Command & Control",
    hint: "Remote access channel back to attacker infrastructure",
  },
  {
    id: "a7",
    label: "Attacker exfiltrated 14 GB of classified contract files via encrypted HTTPS tunnel",
    correctPhase: "Actions on Objectives",
    hint: "Achieving the attacker's ultimate goal",
  },
];

/* ════════════════════════════ LEFT PANEL ════════════════════════════ */

function LeftPanel7({ open, onClose }: { open: boolean; onClose: () => void }) {
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
      <div
        style={{
          backgroundColor: "#0A1628",
          color: "white",
          padding: "0 12px",
          height: "44px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexShrink: 0,
          minWidth: "292px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            <polyline points="14,2 14,8 20,8" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            <line x1="16" y1="13" x2="8" y2="13" stroke="white" strokeWidth="1.8" strokeLinecap="round" />
            <line x1="16" y1="17" x2="8" y2="17" stroke="white" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
          <span style={{ fontSize: "12px", fontWeight: 700, letterSpacing: "0.06em" }}>TEST QUESTION</span>
        </div>
        <button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer", padding: "2px", opacity: 0.8, lineHeight: 1 }}>
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
            <line x1="18" y1="6" x2="6" y2="18" stroke="white" strokeWidth="2.2" strokeLinecap="round" />
            <line x1="6" y1="6" x2="18" y2="18" stroke="white" strokeWidth="2.2" strokeLinecap="round" />
          </svg>
        </button>
      </div>

      <div style={{ flex: 1, overflowY: "auto", overflowX: "hidden", padding: "18px 16px 24px", minWidth: "292px" }}>
        <div style={{ marginBottom: "20px" }}>
          <h2 style={{ fontSize: "11px", fontWeight: 800, letterSpacing: "0.1em", color: "#0A1628", margin: "0 0 12px", borderBottom: "2px solid #F5A623", paddingBottom: "6px", textTransform: "uppercase" }}>
            Scenario
          </h2>
          <p style={{ fontSize: "12.5px", lineHeight: "1.75", color: "#1e293b", marginBottom: "12px" }}>
            The Incident Response team at Apex Defense Contractors has completed forensic analysis of a targeted attack that compromised the CFO&apos;s workstation and resulted in the exfiltration of classified contract documents. The IR report has reconstructed the full attack sequence.
          </p>
          <p style={{ fontSize: "12.5px", lineHeight: "1.75", color: "#1e293b", marginBottom: "12px" }}>
            Lead analyst Dr. Priya Sharma has asked your team to formally map each documented attacker action to the corresponding phase of the Lockheed Martin Cyber Kill Chain framework. This mapping will be submitted to CISA and used to improve defensive controls at each phase of the attack lifecycle.
          </p>
          <p style={{ fontSize: "12.5px", lineHeight: "1.75", color: "#1e293b" }}>
            The Cyber Kill Chain describes seven sequential phases every targeted attack must pass through. Defenders who understand the kill chain can detect and interrupt attacks at any phase before the adversary achieves their objective.
          </p>
        </div>

        <div>
          <h2 style={{ fontSize: "11px", fontWeight: 800, letterSpacing: "0.1em", color: "#0A1628", margin: "0 0 12px", borderBottom: "2px solid #F5A623", paddingBottom: "6px", textTransform: "uppercase" }}>
            Instructions
          </h2>
          <ol style={{ margin: 0, padding: "0 0 0 18px" }}>
            {[
              "Review the seven Kill Chain phases displayed across the workspace. Each phase represents a distinct stage in a targeted attack.",
              "Read each of the seven attack activities listed in the staging area on the left side of the workspace.",
              "Drag each activity card and drop it onto the correct Kill Chain phase column.",
              "All seven activities must be placed before you can submit. Each phase receives exactly one activity.",
              "Click Submit when all activities have been placed in their correct phases.",
            ].map((s, i) => (
              <li key={i} style={{ fontSize: "12.5px", lineHeight: "1.7", color: "#1e293b", marginBottom: "10px" }}>{s}</li>
            ))}
          </ol>
          <div style={{ marginTop: "14px", backgroundColor: "#F0F7FF", border: "1px solid #BFDBFE", borderRadius: "6px", padding: "10px 12px" }}>
            <div style={{ fontSize: "10.5px", fontWeight: 700, color: "#1E40AF", textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: "5px" }}>Kill Chain Framework</div>
            <div style={{ fontSize: "11.5px", color: "#1E40AF", lineHeight: "1.7" }}>
              Recon → Weaponize → Deliver → Exploit → Install → C2 → Act on Objectives
            </div>
          </div>
          <p style={{ fontSize: "11.5px", fontStyle: "italic", color: "#64748b", marginTop: "14px", lineHeight: "1.6" }}>
            To reset all placements, click Reset All Answers.
          </p>
        </div>
      </div>
    </div>
  );
}

/* ════════════════════════════ RESULTS PANEL ════════════════════════════ */

const Q7_TASKS = [
  { key: "t1_reconCorrect" as keyof Q7Scores },
  { key: "t2_deliveryCorrect" as keyof Q7Scores },
  { key: "t3_exploitationCorrect" as keyof Q7Scores },
  { key: "t4_installationCorrect" as keyof Q7Scores },
  { key: "t5_c2Correct" as keyof Q7Scores },
];

function ResultsPanel7({ scores, onExit, onNext }: { scores: Q7Scores; onExit: () => void; onNext?: () => void }) {
  const total = Object.values(scores).filter(Boolean).length;
  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 60, backgroundColor: "rgba(0,0,0,0.55)", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ backgroundColor: "white", borderRadius: "12px", boxShadow: "0 24px 60px rgba(0,0,0,0.35)", overflow: "hidden", minWidth: "360px", maxWidth: "480px", width: "100%" }}>
        <div style={{ backgroundColor: "#0A1628", padding: "28px 32px 24px", textAlign: "center" }}>
          <div style={{ width: "64px", height: "64px", borderRadius: "50%", backgroundColor: total >= 4 ? "#2E7D32" : total >= 2 ? "#E65100" : "#C62828", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px", boxShadow: "0 0 0 6px rgba(255,255,255,0.12)" }}>
            {total >= 3 ? <svg width="30" height="30" viewBox="0 0 24 24" fill="none"><polyline points="20,6 9,17 4,12" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" /></svg> : <svg width="28" height="28" viewBox="0 0 24 24" fill="none"><line x1="18" y1="6" x2="6" y2="18" stroke="white" strokeWidth="2.5" strokeLinecap="round" /><line x1="6" y1="6" x2="18" y2="18" stroke="white" strokeWidth="2.5" strokeLinecap="round" /></svg>}
          </div>
          <div style={{ color: "white", fontSize: "24px", fontWeight: 800, letterSpacing: "-0.02em" }}>{total} out of {Q7_TASKS.length} correct</div>
          <div style={{ display: "flex", justifyContent: "center", gap: "6px", marginTop: "14px", flexWrap: "wrap" }}>
            {Q7_TASKS.map((t, i) => {
              const ok = scores[t.key];
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

export default function Question7() {
  const [leftPanelOpen, setLeftPanelOpen] = useState(true);
  const [submitted, setSubmitted] = useState(false);
  const [finishFeedback, setFinishFeedback] = useState(false);

  /* placements[activityId] = phase (placed) or null (in staging) */
  const [placements, setPlacements] = useState<Record<string, Phase | null>>(
    Object.fromEntries(ACTIVITIES.map((a) => [a.id, null]))
  );

  /* Which phase column is currently being hovered over during a drag */
  const [dragOverPhase, setDragOverPhase] = useState<Phase | null>(null);
  /* Whether the staging area is being hovered over during a drag */
  const [dragOverStaging, setDragOverStaging] = useState(false);

  /* ── Drag handlers — use dataTransfer so the browser drag system carries the id ── */

  function onDragStart(e: React.DragEvent, activityId: string) {
    e.dataTransfer.setData("text/plain", activityId);
    e.dataTransfer.effectAllowed = "move";
  }

  /* Phase column: accept drop from anywhere */
  function onDragOverPhase(e: React.DragEvent, phase: Phase) {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    setDragOverPhase(phase);
  }

  function onDragLeavePhase(e: React.DragEvent, phase: Phase) {
    /* only clear if we're leaving the column itself, not a child element */
    if (!(e.currentTarget as HTMLElement).contains(e.relatedTarget as Node)) {
      setDragOverPhase((prev) => (prev === phase ? null : prev));
    }
  }

  function onDropPhase(e: React.DragEvent, phase: Phase) {
    e.preventDefault();
    setDragOverPhase(null);
    const id = e.dataTransfer.getData("text/plain");
    if (!id) return;
    setPlacements((prev) => {
      const next = { ...prev };
      /* evict any card already occupying this phase */
      Object.keys(next).forEach((k) => { if (next[k] === phase) next[k] = null; });
      next[id] = phase;
      return next;
    });
  }

  /* Staging area: accept drop — returns any placed card back to unplaced */
  function onDragOverStaging(e: React.DragEvent) {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    setDragOverStaging(true);
  }

  function onDragLeaveStaging(e: React.DragEvent) {
    if (!(e.currentTarget as HTMLElement).contains(e.relatedTarget as Node)) {
      setDragOverStaging(false);
    }
  }

  function onDropStaging(e: React.DragEvent) {
    e.preventDefault();
    setDragOverStaging(false);
    const id = e.dataTransfer.getData("text/plain");
    if (!id) return;
    setPlacements((prev) => ({ ...prev, [id]: null }));
  }

  function onDragEnd() {
    setDragOverPhase(null);
    setDragOverStaging(false);
  }

  function handleReset() {
    setPlacements(Object.fromEntries(ACTIVITIES.map((a) => [a.id, null])));
    setSubmitted(false);
    setFinishFeedback(false);
    setDragOverPhase(null);
    setDragOverStaging(false);
    setLeftPanelOpen(true);
  }

  const unplaced = ACTIVITIES.filter((a) => placements[a.id] === null);
  const allPlaced = unplaced.length === 0;

  const scores: Q7Scores = {
    t1_reconCorrect:        placements["a1"] === "Reconnaissance",
    t2_deliveryCorrect:     placements["a3"] === "Delivery",
    t3_exploitationCorrect: placements["a4"] === "Exploitation",
    t4_installationCorrect: placements["a5"] === "Installation",
    t5_c2Correct:           placements["a6"] === "Command & Control",
  };

  const Q7_FINISH_TASKS = Q7_TASKS;

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
            Question 7 — Cyber Kill Chain Mapping
          </h1>
          <p style={{ fontSize: "12.5px", color: "#64748B", margin: 0 }}>
            Drag each attacker action to the correct kill chain phase.
          </p>
        </div>
        <button
          onClick={() => setSubmitted(true)}
          disabled={!allPlaced}
          style={{
            backgroundColor: allPlaced ? "#0066CC" : "#94A3B8",
            color: "white",
            border: "none",
            borderRadius: "6px",
            padding: "10px 26px",
            fontSize: "13.5px",
            fontWeight: 700,
            cursor: allPlaced ? "pointer" : "not-allowed",
            whiteSpace: "nowrap",
            flexShrink: 0,
            boxShadow: allPlaced ? "0 2px 8px rgba(0,102,204,0.3)" : "none",
            letterSpacing: "0.02em",
            marginTop: "4px",
          }}
        >
          Submit
        </button>
      </header>

      {/* ════ MAIN ROW ════ */}
      <div style={{ display: "flex", flex: 1, overflow: "hidden" }}>
        <LeftPanel7 open={leftPanelOpen} onClose={() => setLeftPanelOpen(false)} />

        <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden", minWidth: 0 }}>

          {/* ── Toolbar ── */}
          <div style={{ position: "relative", zIndex: 20, padding: "7px 14px", borderBottom: "1px solid #DDDDDD", display: "flex", alignItems: "center", gap: "8px", backgroundColor: "#FAFAFA", flexShrink: 0 }}>
            <button onClick={() => setLeftPanelOpen((v) => !v)} style={{ display: "flex", alignItems: "center", gap: "6px", backgroundColor: "white", border: "1px solid #DDDDDD", borderRadius: "20px", padding: "5px 13px", fontSize: "12px", fontWeight: 600, color: "#374151", cursor: "pointer" }}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" stroke="#374151" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /><polyline points="14,2 14,8 20,8" stroke="#374151" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /><line x1="16" y1="13" x2="8" y2="13" stroke="#374151" strokeWidth="1.8" strokeLinecap="round" /><line x1="16" y1="17" x2="8" y2="17" stroke="#374151" strokeWidth="1.8" strokeLinecap="round" /></svg>
              Show Question
            </button>
            <button onClick={handleReset} style={{ display: "flex", alignItems: "center", gap: "6px", backgroundColor: "white", border: "1px solid #DDDDDD", borderRadius: "20px", padding: "5px 13px", fontSize: "12px", fontWeight: 600, color: "#374151", cursor: "pointer" }}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none"><polyline points="1,4 1,10 7,10" stroke="#374151" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /><path d="M3.51 15a9 9 0 1 0 .49-5.05" stroke="#374151" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
              Reset All Answers
            </button>
            {!allPlaced && (
              <span style={{ marginLeft: "6px", backgroundColor: "#FFF7ED", color: "#C2410C", border: "1px solid #FED7AA", borderRadius: "12px", padding: "3px 10px", fontSize: "11.5px", fontWeight: 600 }}>
                {unplaced.length} activit{unplaced.length === 1 ? "y" : "ies"} remaining
              </span>
            )}
            {allPlaced && (
              <span style={{ marginLeft: "6px", backgroundColor: "#F0FDF4", color: "#16A34A", border: "1px solid #BBF7D0", borderRadius: "12px", padding: "3px 10px", fontSize: "11.5px", fontWeight: 700 }}>
                ✓ All activities placed — ready to submit
              </span>
            )}
            <div style={{ flex: 1 }} />
            <button onClick={() => { window.location.href = "/question6"; }} style={{ display: "flex", alignItems: "center", gap: "5px", backgroundColor: "white", color: "#374151", border: "1px solid #DDDDDD", borderRadius: "20px", padding: "5px 14px", fontSize: "12px", fontWeight: 600, cursor: "pointer" }}>← Previous</button>
            <button onClick={() => { window.location.href = "/question8"; }} style={{ display: "flex", alignItems: "center", gap: "5px", backgroundColor: "#0066CC", color: "white", border: "none", borderRadius: "20px", padding: "5px 14px", fontSize: "12px", fontWeight: 600, cursor: "pointer" }}>Next →</button>
          </div>

          {/* ── Workspace: columns on top, staging at bottom ── */}
          <div style={{ flex: 1, overflow: "auto", backgroundColor: "#F1F5F9", display: "flex", flexDirection: "column", padding: "16px" }}>

            {/* ── Kill Chain phase columns ── */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: "8px", marginBottom: "14px" }}>
              {PHASES.map((phase, phaseIdx) => {
                const col = PHASE_COLORS[phase];
                const placedActivity = ACTIVITIES.find((a) => placements[a.id] === phase);
                const isOver = dragOverPhase === phase;

                return (
                  <div
                    key={phase}
                    onDragOver={(e) => onDragOverPhase(e, phase)}
                    onDragLeave={(e) => onDragLeavePhase(e, phase)}
                    onDrop={(e) => onDropPhase(e, phase)}
                    style={{
                      backgroundColor: isOver ? col.border : col.bg,
                      border: `2px solid ${isOver ? col.accent : col.border}`,
                      borderRadius: "10px",
                      display: "flex",
                      flexDirection: "column",
                      minHeight: "220px",
                      overflow: "hidden",
                      transition: "background-color 0.1s, border-color 0.1s",
                    }}
                  >
                    {/* Phase header */}
                    <div style={{ backgroundColor: col.accent, padding: "8px 6px", textAlign: "center", flexShrink: 0 }}>
                      <div style={{ fontSize: "9.5px", fontWeight: 800, color: "white", letterSpacing: "0.05em", textTransform: "uppercase", lineHeight: 1.35 }}>
                        {phaseIdx + 1}. {phase}
                      </div>
                    </div>

                    {/* Drop zone body */}
                    <div
                      style={{
                        flex: 1,
                        padding: "8px 6px",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "stretch",
                        justifyContent: placedActivity ? "flex-start" : "center",
                      }}
                    >
                      {placedActivity ? (
                        /* Placed card — draggable from column back to staging or to another column */
                        <div
                          draggable
                          onDragStart={(e) => onDragStart(e, placedActivity.id)}
                          onDragEnd={onDragEnd}
                          style={{
                            backgroundColor: "white",
                            border: `2px solid ${col.accent}`,
                            borderRadius: "7px",
                            padding: "8px 8px 8px 8px",
                            fontSize: "11px",
                            color: "#1E293B",
                            lineHeight: "1.5",
                            cursor: "grab",
                            boxShadow: "0 1px 4px rgba(0,0,0,0.08)",
                          }}
                        >
                          <div style={{ display: "flex", alignItems: "flex-start", gap: "5px" }}>
                            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0, marginTop: "2px", opacity: 0.35 }}>
                              <circle cx="9" cy="6" r="1.5" fill="#374151" />
                              <circle cx="9" cy="12" r="1.5" fill="#374151" />
                              <circle cx="9" cy="18" r="1.5" fill="#374151" />
                              <circle cx="15" cy="6" r="1.5" fill="#374151" />
                              <circle cx="15" cy="12" r="1.5" fill="#374151" />
                              <circle cx="15" cy="18" r="1.5" fill="#374151" />
                            </svg>
                            <span>{placedActivity.label}</span>
                          </div>
                        </div>
                      ) : (
                        /* Empty drop-zone indicator */
                        <div style={{ textAlign: "center", opacity: isOver ? 0.8 : 0.35, pointerEvents: "none" }}>
                          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" style={{ display: "block", margin: "0 auto 4px" }}>
                            <path d="M12 5v14M5 12h14" stroke={col.accent} strokeWidth="2.2" strokeLinecap="round" />
                          </svg>
                          <div style={{ fontSize: "9.5px", color: col.text, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.04em" }}>
                            {isOver ? "Release to place" : "Drop here"}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* ── Staging area — always present, cards dragged here return to unplaced ── */}
            <div
              onDragOver={onDragOverStaging}
              onDragLeave={onDragLeaveStaging}
              onDrop={onDropStaging}
              style={{
                backgroundColor: dragOverStaging ? "#DBEAFE" : "white",
                border: `2px ${dragOverStaging ? "solid #3B82F6" : "dashed #CBD5E1"}`,
                borderRadius: "10px",
                padding: "14px 16px",
                minHeight: "100px",
                transition: "background-color 0.1s, border-color 0.1s",
                flexShrink: 0,
              }}
            >
              <div style={{ fontSize: "11px", fontWeight: 700, color: dragOverStaging ? "#1E40AF" : "#64748B", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "10px" }}>
                {dragOverStaging
                  ? "Release to return card to staging"
                  : unplaced.length > 0
                    ? "Activity Cards — Drag up to place in a phase column"
                    : "All cards placed — drag any card back here to return it"}
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                {unplaced.map((activity) => (
                  <div
                    key={activity.id}
                    draggable
                    onDragStart={(e) => onDragStart(e, activity.id)}
                    onDragEnd={onDragEnd}
                    style={{
                      backgroundColor: "#F8FAFC",
                      border: "2px dashed #94A3B8",
                      borderRadius: "8px",
                      padding: "9px 13px",
                      fontSize: "12.5px",
                      color: "#1E293B",
                      cursor: "grab",
                      userSelect: "none",
                      lineHeight: "1.5",
                      maxWidth: "360px",
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLDivElement).style.borderColor = "#3B82F6";
                      (e.currentTarget as HTMLDivElement).style.backgroundColor = "#EFF6FF";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLDivElement).style.borderColor = "#94A3B8";
                      (e.currentTarget as HTMLDivElement).style.backgroundColor = "#F8FAFC";
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "flex-start", gap: "8px" }}>
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0, marginTop: "2px", opacity: 0.4 }}>
                        <circle cx="9" cy="6" r="1.5" fill="#374151" />
                        <circle cx="9" cy="12" r="1.5" fill="#374151" />
                        <circle cx="9" cy="18" r="1.5" fill="#374151" />
                        <circle cx="15" cy="6" r="1.5" fill="#374151" />
                        <circle cx="15" cy="12" r="1.5" fill="#374151" />
                        <circle cx="15" cy="18" r="1.5" fill="#374151" />
                      </svg>
                      <span>{activity.label}</span>
                    </div>
                  </div>
                ))}
                {unplaced.length === 0 && (
                  <div style={{ opacity: 0.4, fontSize: "12.5px", color: "#64748B", fontStyle: "italic" }}>
                    Staging area is empty — all cards have been placed above.
                  </div>
                )}
              </div>
            </div>

            {/* Reference guide */}
            <div style={{ marginTop: "12px", backgroundColor: "white", border: "1px solid #E2E8F0", borderRadius: "8px", padding: "10px 14px", flexShrink: 0 }}>
              <div style={{ fontSize: "10.5px", fontWeight: 700, color: "#64748B", letterSpacing: "0.07em", textTransform: "uppercase", marginBottom: "7px" }}>Kill Chain Phase Reference</div>
              <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
                {[
                  { p: "Reconnaissance",        d: "Research & target selection" },
                  { p: "Weaponization",          d: "Creating the attack payload" },
                  { p: "Delivery",               d: "Transmitting the weapon" },
                  { p: "Exploitation",           d: "Triggering a vulnerability" },
                  { p: "Installation",           d: "Establishing persistence" },
                  { p: "Command & Control",      d: "Remote attacker channel" },
                  { p: "Actions on Objectives",  d: "Achieving the goal" },
                ].map((r) => {
                  const col = PHASE_COLORS[r.p as Phase];
                  return (
                    <div key={r.p} style={{ backgroundColor: col.bg, border: `1px solid ${col.border}`, borderRadius: "5px", padding: "4px 9px" }}>
                      <div style={{ fontSize: "10px", fontWeight: 700, color: col.text }}>{r.p}</div>
                      <div style={{ fontSize: "9.5px", color: col.text, opacity: 0.75 }}>{r.d}</div>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* ════ BOTTOM BAR ════ */}
      <div style={{ position: "relative", zIndex: 20, borderTop: "1px solid #DDDDDD", padding: "9px 18px", display: "flex", alignItems: "center", justifyContent: "space-between", backgroundColor: "white", flexShrink: 0 }}>
        <button onClick={() => setLeftPanelOpen((v) => !v)} style={{ display: "flex", alignItems: "center", gap: "6px", backgroundColor: "#F5F7FA", border: "1px solid #DDDDDD", borderRadius: "5px", padding: "6px 14px", fontSize: "12.5px", fontWeight: 600, color: "#374151", cursor: "pointer" }}>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" stroke="#374151" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /><polyline points="14,2 14,8 20,8" stroke="#374151" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /><line x1="16" y1="13" x2="8" y2="13" stroke="#374151" strokeWidth="1.8" strokeLinecap="round" /><line x1="16" y1="17" x2="8" y2="17" stroke="#374151" strokeWidth="1.8" strokeLinecap="round" /></svg>
          Scenario
        </button>
        <div style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap" }}>
          {finishFeedback && Q7_FINISH_TASKS.map((t, i) => {
            const ok = scores[t.key];
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
        <ResultsPanel7
          scores={scores}
          onExit={() => { window.location.href = "/"; }}
          onNext={() => { window.location.href = "/question8"; }}
        />
      )}
    </div>
  );
}
