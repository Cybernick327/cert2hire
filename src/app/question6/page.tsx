"use client";

import { useState } from "react";

/* ════════════════════════════ TYPES ════════════════════════════ */

interface PersonaAnswers {
  category: string;
  controlType: string;
  remedy: string;
}

interface Q6Scores {
  t1_itAdminCorrect: boolean;
  t2_ceoCorrect: boolean;
  t3_cioCorrect: boolean;
  t4_allCategoriesCorrect: boolean;
  t5_submitted: boolean;
}

/* ════════════════════════════ PERSONA DATA ════════════════════════════ */

interface Persona {
  id: string;
  label: string;
  title: string;
  accentColor: string;
  speech: string;
  correct: { category: string; controlType: string; remedy: string };
}

const PERSONAS: Persona[] = [
  {
    id: "p1",
    label: "IT Admin",
    title: "IT Administrator",
    accentColor: "#3B82F6",
    speech: "That ransomware attack last month was devastating. We had no idea it was spreading until it was too late. We need something that catches malicious activity on our network the moment it starts.",
    correct: { category: "Technical", controlType: "Detective", remedy: "Install IDS/IPS" },
  },
  {
    id: "p2",
    label: "CEO",
    title: "Chief Executive Officer",
    accentColor: "#7C3AED",
    speech: "Our employees keep visiting dangerous websites and we never actually told them they are not supposed to do that.",
    correct: { category: "Operational", controlType: "Deterrent", remedy: "Create Acceptable Use Policy" },
  },
  {
    id: "p3",
    label: "CIO",
    title: "Chief Information Officer",
    accentColor: "#D97706",
    speech: "I walked right into the server room without badging in because someone propped the door open. Only authorized personnel should enter that room.",
    correct: { category: "Physical", controlType: "Preventive", remedy: "Install Access Control Lock with Badge Reader" },
  },
];

/* ════════════════════════════ DROPDOWN OPTIONS ════════════════════════════ */

const CATEGORIES = ["Technical", "Operational", "Physical", "Managerial"];
const CONTROL_TYPES = ["Preventive", "Detective", "Corrective", "Deterrent", "Compensating", "Recovery"];
const REMEDIES = [
  "Install IDS/IPS",
  "Create Acceptable Use Policy",
  "Install Access Control Lock with Badge Reader",
  "Deploy Endpoint Detection & Response (EDR)",
  "Conduct Security Awareness Training",
  "Implement Multi-Factor Authentication",
  "Install Security Cameras",
  "Configure Firewall Rules",
  "Create Password Policy",
  "Deploy SIEM Solution",
  "Implement Data Loss Prevention (DLP)",
  "Install Physical Security Guards",
];

/* ════════════════════════════ TASK DEFINITIONS ════════════════════════════ */

const Q6_TASKS = [
  {
    key: "t1_itAdminCorrect" as keyof Q6Scores,
    label: "Task 1 — IT Admin scenario: Technical, Detective, Install IDS/IPS",
    correctExplanation:
      "You correctly identified this as a Technical, Detective control requiring IDS/IPS installation. The IT Admin describes ransomware that spread undetected — a detection gap, not a policy or physical gap. A Technical control is implemented through hardware or software. An IDS/IPS is a Detective control: it monitors network traffic and generates alerts when attack patterns are recognized. An Intrusion Prevention System can also block malicious traffic, but its primary framework classification is Detective because its defining function is identifying and alerting on threats in real time.",
    incorrectExplanation:
      "The IT Admin describes a detection gap — ransomware spread undetected because there was no system monitoring for malicious activity. The solution is Technical (requires a technology implementation, not a policy or physical barrier) and Detective (it must identify malicious activity as it occurs). IDS/IPS is the correct remediation: it continuously analyzes network traffic for signatures and anomalies, alerting security staff the moment an attack pattern is detected. A Preventive control (like a firewall) blocks traffic before it reaches the target; a Deterrent (like a warning banner) discourages behavior; neither detects an active spread.",
  },
  {
    key: "t2_ceoCorrect" as keyof Q6Scores,
    label: "Task 2 — CEO scenario: Operational, Deterrent, Create Acceptable Use Policy",
    correctExplanation:
      "You correctly identified this as an Operational, Deterrent control requiring an Acceptable Use Policy (AUP). The CEO describes an absence of written policy governing employee web browsing — a policy gap, not a technology or physical gap. Operational controls involve people, processes, and procedures. An AUP is a Deterrent control: by formally documenting prohibited activities and their consequences, it discourages employees from engaging in risky behavior. Unlike a Preventive web content filter, an AUP does not technically block access — it establishes organizational expectations and the consequences of non-compliance.",
    incorrectExplanation:
      "The CEO is describing a policy gap — prohibited behaviors were never formally communicated in writing. The solution is Operational (requires an administrative policy, not a technical tool or physical barrier) and Deterrent (the policy discourages harmful behavior by defining it as prohibited and documenting consequences). An Acceptable Use Policy directly addresses this: it formally prohibits visiting dangerous websites, establishes that employees are aware of the rule, and creates the legal basis for disciplinary action. A Preventive control would block the sites technically; this scenario calls for the policy foundation first.",
  },
  {
    key: "t3_cioCorrect" as keyof Q6Scores,
    label: "Task 3 — CIO scenario: Physical, Preventive, Install Access Control Lock with Badge Reader",
    correctExplanation:
      "You correctly identified this as a Physical, Preventive control requiring an access control lock with badge reader. The CIO describes unauthorized physical entry to the server room — a physical security gap. Physical controls protect physical spaces, hardware, and assets. A badge reader lock is a Preventive control: it physically stops unauthorized entry by requiring valid authentication before the door unlocks. No unauthorized access occurs when the control is in place — it prevents the threat at the point of access, as opposed to a Detective control (which identifies entry after it happens) or a Deterrent (which discourages but does not physically block entry).",
    incorrectExplanation:
      "The CIO describes unauthorized physical entry to the server room — a physical security gap. The solution is Physical (the problem and solution are in the physical environment, not a software or policy issue) and Preventive (it must physically stop unauthorized entry before it occurs). An access control lock with badge reader prevents unauthorized individuals from opening the door entirely — valid credentials are required to unlock it. A Detective camera would identify the entry after it occurred; a warning sign would deter but not prevent. Only a physical access control barrier prevents the entry from happening at all.",
  },
  {
    key: "t4_allCategoriesCorrect" as keyof Q6Scores,
    label: "Task 4 — Correctly identified the control category for all three scenarios",
    correctExplanation:
      "You correctly classified all three control categories: Technical (IT Admin — requires a technology solution), Operational (CEO — requires a policy/procedure), and Physical (CIO — requires a physical barrier). The three control categories represent distinct domains: Technical controls use hardware and software; Operational controls involve people, procedures, and administrative policies; Physical controls protect physical environments and access points. Correctly identifying the category is the first and most fundamental step in control selection, because it defines the type of solution required before specific implementations are considered.",
    incorrectExplanation:
      "Correctly categorizing security controls is fundamental to Security+ control classification. Technical controls use hardware or software (e.g., IDS/IPS, firewalls, encryption). Operational controls involve people and processes (e.g., policies, training, procedures). Physical controls protect physical spaces (e.g., locks, barriers, guards). The IT Admin scenario requires a Technical solution (a network monitoring technology), the CEO scenario requires an Operational solution (a written acceptable use policy), and the CIO scenario requires a Physical solution (a hardware access barrier). The control category is always determined by the problem domain, not the symptom.",
  },
  {
    key: "t5_submitted" as keyof Q6Scores,
    label: "Task 5 — Submitted all control recommendations",
    correctExplanation:
      "You submitted all three control recommendations. Mapping stakeholder security concerns to the correct control framework — category (Technical/Operational/Physical) × type (Preventive/Detective/Deterrent/etc.) × specific implementation — is a core Security+ SY0-701 competency tested throughout the exam. The ability to translate a business stakeholder's described risk into a precise control selection demonstrates the practical security judgment that separates certificant candidates who understand the framework from those who have only memorized definitions.",
    incorrectExplanation:
      "You did not submit your control recommendations. After reviewing each stakeholder scenario and selecting the appropriate control category, type, and remediation, submitting the recommendations formally documents your analysis. The control classification framework (Technical/Operational/Physical × Preventive/Detective/Deterrent/etc.) is a core topic in Security+ SY0-701 — understanding how to apply it to real stakeholder scenarios is the practical skill the exam tests.",
  },
];

/* ════════════════════════════ AVATAR SVGs ════════════════════════════ */

function ITAdminAvatar() {
  const skin = "#F3C19E";
  const hair = "#2A1B0E";
  const shirt = "#5B9BD5";
  return (
    <svg viewBox="0 0 100 128" width="88" height="112" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* shirt */}
      <path d="M16,128 L16,83 Q34,74 50,72 Q66,74 84,83 L84,128Z" fill={shirt} />
      {/* v-neck */}
      <path d="M38,79 L50,91 L62,79" stroke="#4A8FBC" strokeWidth="1.5" fill="none" />
      {/* neck */}
      <rect x="43" y="62" width="14" height="20" rx="6" fill={skin} />
      {/* head */}
      <circle cx="50" cy="43" r="27" fill={skin} />
      {/* ears */}
      <ellipse cx="23" cy="44" rx="4.5" ry="5" fill={skin} />
      <ellipse cx="77" cy="44" rx="4.5" ry="5" fill={skin} />
      {/* hair – short dark, covers top & sides to ear height */}
      <path d="M23,41 Q24,16 50,14 Q76,16 77,41 Q73,23 50,21 Q27,23 23,41Z" fill={hair} />
      {/* whites of eyes */}
      <ellipse cx="38" cy="42" rx="5" ry="5.5" fill="white" />
      <ellipse cx="62" cy="42" rx="5" ry="5.5" fill="white" />
      {/* pupils */}
      <circle cx="39" cy="42.5" r="3" fill={hair} />
      <circle cx="63" cy="42.5" r="3" fill={hair} />
      {/* catchlights */}
      <circle cx="40.2" cy="41" r="1" fill="white" />
      <circle cx="64.2" cy="41" r="1" fill="white" />
      {/* feminine eyebrows – arched */}
      <path d="M31,33 Q38,30 44,32.5" stroke={hair} strokeWidth="1.8" strokeLinecap="round" />
      <path d="M56,32.5 Q62,30 69,33" stroke={hair} strokeWidth="1.8" strokeLinecap="round" />
      {/* nose */}
      <path d="M50,47 Q47.5,53 50,54 Q52.5,53 50,47" stroke="#CC7744" strokeWidth="1.3" strokeLinecap="round" />
      {/* smile */}
      <path d="M40,60 Q50,69 60,60" stroke="#BB6644" strokeWidth="2.2" strokeLinecap="round" />
    </svg>
  );
}

function CEOAvatar() {
  const skin = "#F3C19E";
  const hair = "#1A0F08";
  const suit = "#1E3A5F";
  const shirt = "#F0F4F8";
  const tie = "#C0392B";
  return (
    <svg viewBox="0 0 100 128" width="88" height="112" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* suit jacket */}
      <path d="M14,128 L14,82 Q32,70 50,68 Q68,70 86,82 L86,128Z" fill={suit} />
      {/* shirt visible between lapels */}
      <path d="M38,79 L50,91 L62,79 L62,128 L38,128Z" fill={shirt} />
      {/* tie */}
      <path d="M50,91 L46,103 L50,114 L54,103Z" fill={tie} />
      {/* lapels */}
      <path d="M38,79 L26,84 L14,103" stroke="#162D4F" strokeWidth="1.5" fill="none" />
      <path d="M62,79 L74,84 L86,103" stroke="#162D4F" strokeWidth="1.5" fill="none" />
      {/* neck */}
      <rect x="43" y="60" width="14" height="21" rx="6" fill={skin} />
      {/* head */}
      <circle cx="50" cy="41" r="27" fill={skin} />
      {/* ears */}
      <ellipse cx="23" cy="42" rx="4.5" ry="5" fill={skin} />
      <ellipse cx="77" cy="42" rx="4.5" ry="5" fill={skin} />
      {/* hair – neat, parted */}
      <path d="M23,39 Q25,14 50,12 Q75,14 77,39 Q72,21 50,19 Q28,21 23,39Z" fill={hair} />
      {/* part line */}
      <path d="M50,12 L50,22" stroke="#2C1810" strokeWidth="1.2" strokeLinecap="round" />
      {/* whites of eyes */}
      <ellipse cx="38" cy="40" rx="5" ry="5.5" fill="white" />
      <ellipse cx="62" cy="40" rx="5" ry="5.5" fill="white" />
      {/* pupils */}
      <circle cx="39" cy="40.5" r="3" fill={hair} />
      <circle cx="63" cy="40.5" r="3" fill={hair} />
      {/* catchlights */}
      <circle cx="40" cy="39" r="1" fill="white" />
      <circle cx="64" cy="39" r="1" fill="white" />
      {/* straighter eyebrows – masculine */}
      <line x1="31" y1="31" x2="45" y2="30" stroke={hair} strokeWidth="2" strokeLinecap="round" />
      <line x1="55" y1="30" x2="69" y2="31" stroke={hair} strokeWidth="2" strokeLinecap="round" />
      {/* nose */}
      <path d="M50,45 Q47.5,51 50,52 Q52.5,51 50,45" stroke="#CC7744" strokeWidth="1.3" strokeLinecap="round" />
      {/* confident slight smile */}
      <path d="M42,57 Q50,64 58,57" stroke="#BB6644" strokeWidth="2.2" strokeLinecap="round" />
    </svg>
  );
}

function CIOAvatar() {
  const skin = "#F3C19E";
  const hair = "#1A0F08";
  const blazer = "#3D5A80";
  const shirt = "#E8F0F8";
  const glass = "rgba(180,210,240,0.45)";
  return (
    <svg viewBox="0 0 100 128" width="88" height="112" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* blazer */}
      <path d="M14,128 L14,82 Q32,71 50,69 Q68,71 86,82 L86,128Z" fill={blazer} />
      {/* shirt visible */}
      <path d="M40,79 L50,89 L60,79 L60,128 L40,128Z" fill={shirt} />
      {/* lapels */}
      <path d="M40,79 L28,85 L14,104" stroke="#2D4A6F" strokeWidth="1.5" fill="none" />
      <path d="M60,79 L72,85 L86,104" stroke="#2D4A6F" strokeWidth="1.5" fill="none" />
      {/* neck */}
      <rect x="43" y="61" width="14" height="20" rx="6" fill={skin} />
      {/* head */}
      <circle cx="50" cy="43" r="27" fill={skin} />
      {/* ears */}
      <ellipse cx="23" cy="44" rx="4.5" ry="5" fill={skin} />
      <ellipse cx="77" cy="44" rx="4.5" ry="5" fill={skin} />
      {/* hair – slightly receding at temples */}
      <path d="M27,40 Q28,15 50,13 Q72,15 73,40 Q69,22 50,20 Q31,22 27,40Z" fill={hair} />
      {/* GLASSES – key distinguishing feature */}
      {/* left lens */}
      <rect x="27" y="34" width="18" height="14" rx="3.5" stroke="#2A1810" strokeWidth="2" fill={glass} />
      {/* right lens */}
      <rect x="55" y="34" width="18" height="14" rx="3.5" stroke="#2A1810" strokeWidth="2" fill={glass} />
      {/* bridge */}
      <line x1="45" y1="41" x2="55" y2="41" stroke="#2A1810" strokeWidth="1.8" strokeLinecap="round" />
      {/* temples (arms) */}
      <line x1="27" y1="41" x2="22" y2="44" stroke="#2A1810" strokeWidth="1.8" strokeLinecap="round" />
      <line x1="73" y1="41" x2="78" y2="44" stroke="#2A1810" strokeWidth="1.8" strokeLinecap="round" />
      {/* eyes visible through lenses */}
      <circle cx="36" cy="41" r="3" fill={hair} />
      <circle cx="64" cy="41" r="3" fill={hair} />
      <circle cx="37" cy="40" r="1" fill="white" />
      <circle cx="65" cy="40" r="1" fill="white" />
      {/* eyebrows above glasses */}
      <path d="M28,31 Q36,28 44,30" stroke={hair} strokeWidth="1.8" strokeLinecap="round" />
      <path d="M56,30 Q64,28 72,31" stroke={hair} strokeWidth="1.8" strokeLinecap="round" />
      {/* nose */}
      <path d="M50,49 Q47.5,55 50,56 Q52.5,55 50,49" stroke="#CC7744" strokeWidth="1.3" strokeLinecap="round" />
      {/* thoughtful slight smile */}
      <path d="M42,61 Q50,68 58,61" stroke="#BB6644" strokeWidth="2.2" strokeLinecap="round" />
    </svg>
  );
}

/* ════════════════════════════ LEFT PANEL ════════════════════════════ */

function LeftPanel6({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <div style={{ width: open ? "292px" : "0px", minWidth: open ? "292px" : "0px", transition: "width 0.22s ease, min-width 0.22s ease", overflow: "hidden", borderRight: open ? "1px solid #DDDDDD" : "none", backgroundColor: "#F5F7FA", display: "flex", flexDirection: "column", height: "100%" }}>
      <div style={{ backgroundColor: "#0A1628", color: "white", padding: "0 12px", height: "44px", display: "flex", alignItems: "center", justifyContent: "space-between", flexShrink: 0, minWidth: "292px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /><polyline points="14,2 14,8 20,8" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /><line x1="16" y1="13" x2="8" y2="13" stroke="white" strokeWidth="1.8" strokeLinecap="round" /><line x1="16" y1="17" x2="8" y2="17" stroke="white" strokeWidth="1.8" strokeLinecap="round" /></svg>
          <span style={{ fontSize: "12px", fontWeight: 700, letterSpacing: "0.06em" }}>TEST QUESTION</span>
        </div>
        <button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer", padding: "2px", opacity: 0.8 }}>
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none"><line x1="18" y1="6" x2="6" y2="18" stroke="white" strokeWidth="2.2" strokeLinecap="round" /><line x1="6" y1="6" x2="18" y2="18" stroke="white" strokeWidth="2.2" strokeLinecap="round" /></svg>
        </button>
      </div>
      <div style={{ flex: 1, overflowY: "auto", overflowX: "hidden", padding: "18px 16px 24px", minWidth: "292px" }}>
        <div style={{ marginBottom: "20px" }}>
          <h2 style={{ fontSize: "11px", fontWeight: 800, letterSpacing: "0.1em", color: "#0A1628", margin: "0 0 12px", borderBottom: "2px solid #F5A623", paddingBottom: "6px", textTransform: "uppercase" }}>Scenario</h2>
          <p style={{ fontSize: "12.5px", lineHeight: "1.75", color: "#1e293b", marginBottom: "12px" }}>
            You are a senior security consultant at CyberShield Advisory Group, retained by Nexus Logistics Corporation to advise on their information security program. Three executives have independently escalated separate security concerns to your team, each requiring an immediate control recommendation.
          </p>
          <p style={{ fontSize: "12.5px", lineHeight: "1.75", color: "#1e293b" }}>
            For each executive, you must identify the correct security control category, control type, and specific remediation that directly addresses their concern. Your recommendations will be presented to the board at the next quarterly review.
          </p>
        </div>
        <div>
          <h2 style={{ fontSize: "11px", fontWeight: 800, letterSpacing: "0.1em", color: "#0A1628", margin: "0 0 12px", borderBottom: "2px solid #F5A623", paddingBottom: "6px", textTransform: "uppercase" }}>Instructions</h2>
          <ol style={{ margin: 0, padding: "0 0 0 18px" }}>
            {[
              "Read each executive's concern carefully. Identify the core security gap they are describing.",
              "For each persona, select the correct Control Category: Technical (hardware/software), Operational (policy/process), Physical (environment/access), or Managerial (governance).",
              "Select the correct Control Type: Preventive (blocks the threat), Detective (identifies the threat), Deterrent (discourages the threat), Corrective (remedies after the fact), Compensating, or Recovery.",
              "Select the specific Control Remediation that directly addresses the executive's described concern.",
              "All three dropdowns must be correct for full credit on each persona. Click Submit when complete.",
            ].map((s, i) => <li key={i} style={{ fontSize: "12.5px", lineHeight: "1.7", color: "#1e293b", marginBottom: "10px" }}>{s}</li>)}
          </ol>
          <div style={{ marginTop: "16px", backgroundColor: "#FFF7ED", border: "1px solid #FED7AA", borderRadius: "6px", padding: "10px 12px" }}>
            <div style={{ fontSize: "10.5px", fontWeight: 700, color: "#92400E", textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: "4px" }}>Key Framework Reminder</div>
            <div style={{ fontSize: "11.5px", color: "#92400E", lineHeight: "1.6" }}>
              <strong>Technical</strong> — technology tools &nbsp;·&nbsp;
              <strong>Operational</strong> — people &amp; process &nbsp;·&nbsp;
              <strong>Physical</strong> — physical environment
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ════════════════════════════ PERSONA CARD ════════════════════════════ */

function DropdownField({
  label,
  value,
  options,
  onChange,
  locked,
  correct,
  show,
}: {
  label: string;
  value: string;
  options: string[];
  onChange: (v: string) => void;
  locked: boolean;
  correct: string;
  show: boolean;
}) {
  const isCorrect = value === correct;
  const hasValue = value !== "";
  let borderColor = "#E2E8F0";
  let bgColor = "white";
  let labelColor = "#64748B";
  if (show && locked) {
    if (isCorrect) { borderColor = "#16A34A"; bgColor = "#F0FDF4"; labelColor = "#166534"; }
    else if (hasValue) { borderColor = "#DC2626"; bgColor = "#FEF2F2"; labelColor = "#991B1B"; }
    else { borderColor = "#DC2626"; bgColor = "#FEF2F2"; labelColor = "#991B1B"; }
  }

  return (
    <div style={{ marginBottom: "10px" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "4px" }}>
        <span style={{ fontSize: "10.5px", fontWeight: 700, color: labelColor, letterSpacing: "0.05em", textTransform: "uppercase" }}>
          {label}
        </span>
        {show && locked && (
          isCorrect ? (
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" fill="#16A34A" /><polyline points="8,12 11,15 16,9" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
          ) : (
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" fill="#DC2626" /><line x1="8" y1="8" x2="16" y2="16" stroke="white" strokeWidth="2.5" strokeLinecap="round" /><line x1="16" y1="8" x2="8" y2="16" stroke="white" strokeWidth="2.5" strokeLinecap="round" /></svg>
          )
        )}
        {show && locked && !isCorrect && (
          <span style={{ fontSize: "10px", color: "#DC2626", fontWeight: 600 }}>Correct: {correct}</span>
        )}
      </div>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={locked}
        style={{
          width: "100%",
          padding: "7px 10px",
          fontSize: "12.5px",
          border: `2px solid ${borderColor}`,
          borderRadius: "6px",
          backgroundColor: bgColor,
          color: value === "" ? "#94A3B8" : "#1E293B",
          outline: "none",
          cursor: locked ? "default" : "pointer",
          fontFamily: "inherit",
          opacity: locked ? 0.85 : 1,
        }}
      >
        <option value="">— Select —</option>
        {options.map((o) => (
          <option key={o} value={o}>{o}</option>
        ))}
      </select>
    </div>
  );
}

function PersonaCard({
  persona,
  AvatarComponent,
  answers,
  onCategory,
  onType,
  onRemedy,
  locked,
  showFeedback,
}: {
  persona: Persona;
  AvatarComponent: React.ComponentType;
  answers: PersonaAnswers;
  onCategory: (v: string) => void;
  onType: (v: string) => void;
  onRemedy: (v: string) => void;
  locked: boolean;
  showFeedback: boolean;
}) {
  const allCorrect =
    answers.category === persona.correct.category &&
    answers.controlType === persona.correct.controlType &&
    answers.remedy === persona.correct.remedy;

  return (
    <div
      style={{
        backgroundColor: "white",
        border: `1px solid ${showFeedback && locked ? (allCorrect ? "#BBF7D0" : "#FECACA") : "#E2E8F0"}`,
        borderLeft: `4px solid ${persona.accentColor}`,
        borderRadius: "10px",
        overflow: "hidden",
        boxShadow: "0 1px 6px rgba(0,0,0,0.06)",
      }}
    >
      {/* Persona label bar */}
      <div
        style={{
          backgroundColor: persona.accentColor + "14",
          borderBottom: `1px solid ${persona.accentColor}30`,
          padding: "8px 16px",
          display: "flex",
          alignItems: "center",
          gap: "8px",
        }}
      >
        <span
          style={{
            backgroundColor: persona.accentColor,
            color: "white",
            borderRadius: "5px",
            padding: "2px 9px",
            fontSize: "11px",
            fontWeight: 700,
            letterSpacing: "0.05em",
          }}
        >
          {persona.label}
        </span>
        <span style={{ fontSize: "12px", color: "#64748B" }}>{persona.title}</span>
        {showFeedback && locked && (
          <span
            style={{
              marginLeft: "auto",
              backgroundColor: allCorrect ? "#F0FDF4" : "#FEF2F2",
              color: allCorrect ? "#16A34A" : "#DC2626",
              border: `1px solid ${allCorrect ? "#BBF7D0" : "#FECACA"}`,
              borderRadius: "12px",
              padding: "2px 10px",
              fontSize: "11px",
              fontWeight: 700,
            }}
          >
            {allCorrect ? "✓ All correct" : "✗ Review answers"}
          </span>
        )}
      </div>

      {/* Card body */}
      <div style={{ display: "flex", gap: "0", minHeight: "160px" }}>
        {/* Left: avatar + speech bubble */}
        <div
          style={{
            flex: "0 0 44%",
            padding: "16px",
            display: "flex",
            alignItems: "flex-start",
            gap: "12px",
            borderRight: "1px solid #F1F5F9",
          }}
        >
          {/* Avatar */}
          <div style={{ flexShrink: 0 }}>
            <AvatarComponent />
          </div>

          {/* Speech bubble */}
          <div style={{ position: "relative", flex: 1, marginTop: "8px" }}>
            {/* Pointer / tail */}
            <div
              style={{
                position: "absolute",
                left: "-11px",
                top: "16px",
                width: 0,
                height: 0,
                borderTop: "8px solid transparent",
                borderBottom: "8px solid transparent",
                borderRight: `11px solid ${persona.accentColor}40`,
              }}
            />
            <div
              style={{
                position: "absolute",
                left: "-8px",
                top: "17.5px",
                width: 0,
                height: 0,
                borderTop: "6.5px solid transparent",
                borderBottom: "6.5px solid transparent",
                borderRight: "9px solid white",
              }}
            />
            <div
              style={{
                border: `1.5px solid ${persona.accentColor}40`,
                borderRadius: "10px",
                padding: "10px 12px",
                fontSize: "12.5px",
                lineHeight: "1.7",
                color: "#1E293B",
                backgroundColor: "white",
                boxShadow: "0 1px 4px rgba(0,0,0,0.05)",
              }}
            >
              &ldquo;{persona.speech}&rdquo;
            </div>
          </div>
        </div>

        {/* Right: dropdowns */}
        <div style={{ flex: "0 0 56%", padding: "16px 20px" }}>
          <div style={{ fontSize: "10.5px", fontWeight: 700, color: "#94A3B8", textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: "12px" }}>
            Select Controls
          </div>
          <DropdownField
            label="Control Category Remediation Needed"
            value={answers.category}
            options={CATEGORIES}
            onChange={onCategory}
            locked={locked}
            correct={persona.correct.category}
            show={showFeedback}
          />
          <DropdownField
            label="Control Type Remediation Needed"
            value={answers.controlType}
            options={CONTROL_TYPES}
            onChange={onType}
            locked={locked}
            correct={persona.correct.controlType}
            show={showFeedback}
          />
          <DropdownField
            label="Control Remediation Needed"
            value={answers.remedy}
            options={REMEDIES}
            onChange={onRemedy}
            locked={locked}
            correct={persona.correct.remedy}
            show={showFeedback}
          />
        </div>
      </div>
    </div>
  );
}

/* ════════════════════════════ FINISH TASK LIST ════════════════════════════ */

const Q6_FINISH_TASKS = [
  { key: "t1_itAdminCorrect" as keyof Q6Scores },
  { key: "t2_ceoCorrect" as keyof Q6Scores },
  { key: "t3_cioCorrect" as keyof Q6Scores },
  { key: "t4_allCategoriesCorrect" as keyof Q6Scores },
  { key: "t5_submitted" as keyof Q6Scores },
];

/* ════════════════════════════ RESULTS PANEL ════════════════════════════ */

function ResultsPanel6({ scores, onExit, onNext }: { scores: Q6Scores; onExit: () => void; onNext?: () => void }) {
  const total = Object.values(scores).filter(Boolean).length;
  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 60, backgroundColor: "rgba(0,0,0,0.55)", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ backgroundColor: "white", borderRadius: "12px", boxShadow: "0 24px 60px rgba(0,0,0,0.35)", overflow: "hidden", minWidth: "360px", maxWidth: "480px", width: "100%" }}>
        <div style={{ backgroundColor: "#0A1628", padding: "28px 32px 24px", textAlign: "center" }}>
          <div style={{ width: "64px", height: "64px", borderRadius: "50%", backgroundColor: total >= 4 ? "#2E7D32" : total >= 2 ? "#E65100" : "#C62828", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px", boxShadow: "0 0 0 6px rgba(255,255,255,0.12)" }}>
            {total >= 3 ? <svg width="30" height="30" viewBox="0 0 24 24" fill="none"><polyline points="20,6 9,17 4,12" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" /></svg> : <svg width="28" height="28" viewBox="0 0 24 24" fill="none"><line x1="18" y1="6" x2="6" y2="18" stroke="white" strokeWidth="2.5" strokeLinecap="round" /><line x1="6" y1="6" x2="18" y2="18" stroke="white" strokeWidth="2.5" strokeLinecap="round" /></svg>}
          </div>
          <div style={{ color: "white", fontSize: "24px", fontWeight: 800, letterSpacing: "-0.02em" }}>{total} out of {Q6_TASKS.length} correct</div>
          <div style={{ display: "flex", justifyContent: "center", gap: "6px", marginTop: "14px", flexWrap: "wrap" }}>
            {Q6_TASKS.map((t, i) => {
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

const AVATAR_COMPONENTS = [ITAdminAvatar, CEOAvatar, CIOAvatar];

export default function Question6() {
  const [leftPanelOpen, setLeftPanelOpen] = useState(true);
  const [p1, setP1] = useState<PersonaAnswers>({ category: "", controlType: "", remedy: "" });
  const [p2, setP2] = useState<PersonaAnswers>({ category: "", controlType: "", remedy: "" });
  const [p3, setP3] = useState<PersonaAnswers>({ category: "", controlType: "", remedy: "" });
  const [answersLocked, setAnswersLocked] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [finishFeedback, setFinishFeedback] = useState(false);

  const p1Correct = p1.category === PERSONAS[0].correct.category && p1.controlType === PERSONAS[0].correct.controlType && p1.remedy === PERSONAS[0].correct.remedy;
  const p2Correct = p2.category === PERSONAS[1].correct.category && p2.controlType === PERSONAS[1].correct.controlType && p2.remedy === PERSONAS[1].correct.remedy;
  const p3Correct = p3.category === PERSONAS[2].correct.category && p3.controlType === PERSONAS[2].correct.controlType && p3.remedy === PERSONAS[2].correct.remedy;

  const scores: Q6Scores = {
    t1_itAdminCorrect: p1Correct,
    t2_ceoCorrect: p2Correct,
    t3_cioCorrect: p3Correct,
    t4_allCategoriesCorrect:
      p1.category === "Technical" && p2.category === "Operational" && p3.category === "Physical",
    t5_submitted: answersLocked,
  };

  function handleSubmit() {
    setAnswersLocked(true);
    setSubmitted(true);
  }

  function handleReset() {
    setP1({ category: "", controlType: "", remedy: "" });
    setP2({ category: "", controlType: "", remedy: "" });
    setP3({ category: "", controlType: "", remedy: "" });
    setAnswersLocked(false);
    setSubmitted(false);
    setFinishFeedback(false);
    setLeftPanelOpen(true);
  }

  const personas = [
    { persona: PERSONAS[0], answers: p1, setCategory: (v: string) => setP1((p) => ({ ...p, category: v })), setType: (v: string) => setP1((p) => ({ ...p, controlType: v })), setRemedy: (v: string) => setP1((p) => ({ ...p, remedy: v })) },
    { persona: PERSONAS[1], answers: p2, setCategory: (v: string) => setP2((p) => ({ ...p, category: v })), setType: (v: string) => setP2((p) => ({ ...p, controlType: v })), setRemedy: (v: string) => setP2((p) => ({ ...p, remedy: v })) },
    { persona: PERSONAS[2], answers: p3, setCategory: (v: string) => setP3((p) => ({ ...p, category: v })), setType: (v: string) => setP3((p) => ({ ...p, controlType: v })), setRemedy: (v: string) => setP3((p) => ({ ...p, remedy: v })) },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh", overflow: "hidden", backgroundColor: "white" }}>

      {/* ════ HEADER ════ */}
      <header style={{ position: "relative", zIndex: 20, backgroundColor: "white", borderBottom: "1px solid #DDDDDD", padding: "12px 20px", display: "flex", alignItems: "flex-start", justifyContent: "space-between", flexShrink: 0, gap: "16px" }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
            <a href="/" style={{ display: "flex", alignItems: "center", gap: "8px", textDecoration: "none" }}>
              <div style={{ width: "28px", height: "28px", borderRadius: "6px", backgroundColor: "#0A1628", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <span style={{ color: "#F5A623", fontWeight: 900, fontSize: "15px" }}>C</span>
              </div>
              <span style={{ fontWeight: 800, fontSize: "14px", color: "#0A1628" }}>Cert2Hire</span>
            </a>
            <span style={{ fontSize: "10.5px", color: "#94A3B8", fontWeight: 500 }}>Your Fastest Path to Certification</span>
          </div>
          <h1 style={{ fontSize: "20px", fontWeight: 800, color: "#0A1628", margin: "0 0 4px", letterSpacing: "-0.025em" }}>Question 6 — Stakeholder Persona Security Controls</h1>
          <p style={{ fontSize: "12.5px", color: "#64748B", margin: 0 }}>Match each executive's security concern to the correct control category, type, and remediation.</p>
        </div>
        <button
          onClick={handleSubmit}
          style={{ backgroundColor: "#0066CC", color: "white", border: "none", borderRadius: "6px", padding: "10px 26px", fontSize: "13.5px", fontWeight: 700, cursor: "pointer", whiteSpace: "nowrap", flexShrink: 0, boxShadow: "0 2px 8px rgba(0,102,204,0.3)", marginTop: "4px" }}
        >
          Submit
        </button>
      </header>

      {/* ════ MAIN ════ */}
      <div style={{ display: "flex", flex: 1, overflow: "hidden" }}>
        <LeftPanel6 open={leftPanelOpen} onClose={() => setLeftPanelOpen(false)} />

        <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden", minWidth: 0 }}>
          {/* Toolbar */}
          <div style={{ position: "relative", zIndex: 20, padding: "7px 14px", borderBottom: "1px solid #DDDDDD", display: "flex", alignItems: "center", gap: "8px", backgroundColor: "#FAFAFA", flexShrink: 0 }}>
            {[{ label: "Show Question", action: () => setLeftPanelOpen((v) => !v) }, { label: "Reset All Answers", action: handleReset }].map((b) => (
              <button key={b.label} onClick={b.action} style={{ display: "flex", alignItems: "center", gap: "6px", backgroundColor: "white", border: "1px solid #DDDDDD", borderRadius: "20px", padding: "5px 13px", fontSize: "12px", fontWeight: 600, color: "#374151", cursor: "pointer" }}>
                {b.label}
              </button>
            ))}
            <div style={{ flex: 1 }} />
            <button onClick={() => { window.location.href = "/question5"; }} style={{ display: "flex", alignItems: "center", gap: "5px", backgroundColor: "white", color: "#374151", border: "1px solid #DDDDDD", borderRadius: "20px", padding: "5px 14px", fontSize: "12px", fontWeight: 600, cursor: "pointer" }}>← Previous</button>
            <button onClick={() => { window.location.href = "/question7"; }} style={{ display: "flex", alignItems: "center", gap: "5px", backgroundColor: "#0066CC", color: "white", border: "none", borderRadius: "20px", padding: "5px 14px", fontSize: "12px", fontWeight: 600, cursor: "pointer" }}>Next →</button>
            {answersLocked && (
              <span style={{ marginLeft: "8px", backgroundColor: "#FFF7ED", color: "#C2410C", border: "1px solid #FED7AA", borderRadius: "12px", padding: "3px 10px", fontSize: "11.5px", fontWeight: 600 }}>
                Answers submitted — view feedback below
              </span>
            )}
          </div>

          {/* Persona cards */}
          <div style={{ flex: 1, overflow: "auto", backgroundColor: "#F1F5F9", padding: "20px" }}>
            <div style={{ maxWidth: "1100px", display: "flex", flexDirection: "column", gap: "16px" }}>
              {personas.map(({ persona, answers, setCategory, setType, setRemedy }, idx) => (
                <PersonaCard
                  key={persona.id}
                  persona={persona}
                  AvatarComponent={AVATAR_COMPONENTS[idx]}
                  answers={answers}
                  onCategory={setCategory}
                  onType={setType}
                  onRemedy={setRemedy}
                  locked={answersLocked}
                  showFeedback={answersLocked}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ════ BOTTOM BAR ════ */}
      <div style={{ position: "relative", zIndex: 20, borderTop: "1px solid #DDDDDD", padding: "9px 18px", display: "flex", alignItems: "center", justifyContent: "space-between", backgroundColor: "white", flexShrink: 0 }}>
        <button onClick={() => setLeftPanelOpen((v) => !v)} style={{ display: "flex", alignItems: "center", gap: "6px", backgroundColor: "#F5F7FA", border: "1px solid #DDDDDD", borderRadius: "5px", padding: "6px 14px", fontSize: "12.5px", fontWeight: 600, color: "#374151", cursor: "pointer" }}>
          Scenario
        </button>
        <div style={{ display: "flex", gap: "8px" }}>
          <button onClick={handleReset} style={{ backgroundColor: "white", border: "1px solid #DDDDDD", borderRadius: "5px", padding: "6px 14px", fontSize: "12.5px", fontWeight: 600, color: "#374151", cursor: "pointer" }}>Reset All Answers</button>
          {finishFeedback && Q6_FINISH_TASKS.map((t, i) => {
            const ok = scores[t.key];
            return (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: "4px", backgroundColor: ok ? "#F0FDF4" : "#FEF2F2", border: `1px solid ${ok ? "#BBF7D0" : "#FECACA"}`, borderRadius: "16px", padding: "3px 9px 3px 6px", fontSize: "11.5px", color: ok ? "#166534" : "#991B1B", fontWeight: 600 }}>
                {ok ? <svg width="12" height="12" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" fill="#16A34A" /><polyline points="8,12 11,15 16,9" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" /></svg> : <svg width="12" height="12" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" fill="#DC2626" /><line x1="8" y1="8" x2="16" y2="16" stroke="white" strokeWidth="2.2" strokeLinecap="round" /><line x1="16" y1="8" x2="8" y2="16" stroke="white" strokeWidth="2.2" strokeLinecap="round" /></svg>}
                T{i + 1}
              </div>
            );
          })}
          <button onClick={() => setFinishFeedback((v) => !v)} style={{ backgroundColor: finishFeedback ? "#475569" : "#0A1628", color: "white", border: "none", borderRadius: "5px", padding: "6px 18px", fontSize: "12.5px", fontWeight: 700, cursor: "pointer" }}>{finishFeedback ? "Hide" : "Finish"}</button>
        </div>
      </div>

      {/* ════ OVERLAYS ════ */}
      {submitted && (
        <ResultsPanel6
          scores={scores}
          onExit={() => { window.location.href = "/"; }}
          onNext={() => { window.location.href = "/question7"; }}
        />
      )}
    </div>
  );
}
