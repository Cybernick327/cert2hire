"use client";

import { useState } from "react";

/* ════════════════════════════ TYPES ════════════════════════════ */

type Severity = "CRITICAL" | "HIGH" | "MEDIUM" | "LOW" | "INFO";
type TabId = "overview" | "authentication" | "network" | "firewall" | "system";

interface LogEntry {
  id: string;
  time: string;
  severity: Severity;
  sourceIP: string;
  destination: string;
  eventType: string;
  message: string;
  isSeparator?: boolean;
  canFlag?: boolean;
}

interface Q2Scores {
  t1_viewedAuthLogs: boolean;
  t2_flaggedCorrectIP: boolean;
  t3_correctAttackType: boolean;
  t4_identifiedTarget: boolean;
  t5_submittedReport: boolean;
}

/* ════════════════════════════ LOG DATA ════════════════════════════ */

const AUTH_LOGS: LogEntry[] = [
  {
    id: "a01",
    time: "08:47:05",
    severity: "CRITICAL",
    sourceIP: "192.0.2.47",
    destination: "10.10.5.22:8080",
    eventType: "AUTH_SUCCESS",
    message: "Authentication SUCCESS — user 'hradmin' session established (after 285 failed attempts)",
    canFlag: true,
  },
  {
    id: "a02",
    time: "08:47:03",
    severity: "HIGH",
    sourceIP: "192.0.2.47",
    destination: "10.10.5.22:8080",
    eventType: "AUTH_FAIL",
    message: "Authentication FAILED — username: 'hradmin' (attempt #285)",
    canFlag: true,
  },
  {
    id: "a03",
    time: "08:46:55",
    severity: "HIGH",
    sourceIP: "192.0.2.47",
    destination: "10.10.5.22:8080",
    eventType: "AUTH_FAIL",
    message: "Authentication FAILED — username: 'hradmin' (attempt #284)",
    canFlag: true,
  },
  {
    id: "a04",
    time: "08:46:47",
    severity: "HIGH",
    sourceIP: "192.0.2.47",
    destination: "10.10.5.22:8080",
    eventType: "AUTH_FAIL",
    message: "Authentication FAILED — username: 'hradmin' (attempt #283)",
    canFlag: true,
  },
  {
    id: "sep1",
    time: "",
    severity: "INFO",
    sourceIP: "—",
    destination: "—",
    eventType: "———",
    message: "···  279 similar HIGH-severity AUTH_FAIL events from 192.0.2.47  ·  timespan 08:02:25 – 08:46:43  ·  destination 10.10.5.22:8080  ···",
    isSeparator: true,
  },
  {
    id: "a05",
    time: "08:15:26",
    severity: "MEDIUM",
    sourceIP: "203.0.113.15",
    destination: "10.10.5.22:8080",
    eventType: "AUTH_FAIL",
    message: "Authentication FAILED — username: 'testuser' (attempt #3)",
    canFlag: true,
  },
  {
    id: "a06",
    time: "08:15:24",
    severity: "MEDIUM",
    sourceIP: "203.0.113.15",
    destination: "10.10.5.22:8080",
    eventType: "AUTH_FAIL",
    message: "Authentication FAILED — username: 'testuser' (attempt #2)",
    canFlag: true,
  },
  {
    id: "a07",
    time: "08:15:22",
    severity: "MEDIUM",
    sourceIP: "203.0.113.15",
    destination: "10.10.5.22:8080",
    eventType: "AUTH_FAIL",
    message: "Authentication FAILED — username: 'testuser' (attempt #1)",
    canFlag: true,
  },
  {
    id: "a08",
    time: "08:02:23",
    severity: "HIGH",
    sourceIP: "192.0.2.47",
    destination: "10.10.5.22:8080",
    eventType: "AUTH_FAIL",
    message: "Authentication FAILED — username: 'admin' (attempt #4)",
    canFlag: true,
  },
  {
    id: "a09",
    time: "08:02:21",
    severity: "HIGH",
    sourceIP: "192.0.2.47",
    destination: "10.10.5.22:8080",
    eventType: "AUTH_FAIL",
    message: "Authentication FAILED — username: 'hradmin' (attempt #3)",
    canFlag: true,
  },
  {
    id: "a10",
    time: "08:02:19",
    severity: "HIGH",
    sourceIP: "192.0.2.47",
    destination: "10.10.5.22:8080",
    eventType: "AUTH_FAIL",
    message: "Authentication FAILED — username: 'administrator' (attempt #2)",
    canFlag: true,
  },
  {
    id: "a11",
    time: "08:02:17",
    severity: "HIGH",
    sourceIP: "192.0.2.47",
    destination: "10.10.5.22:8080",
    eventType: "AUTH_FAIL",
    message: "Authentication FAILED — username: 'admin' (attempt #1)",
    canFlag: true,
  },
  {
    id: "a12",
    time: "08:01:30",
    severity: "INFO",
    sourceIP: "10.10.1.30",
    destination: "10.10.5.22:8080",
    eventType: "AUTH_SUCCESS",
    message: "Authentication SUCCESS — user 'rjohnson' logged in",
  },
  {
    id: "a13",
    time: "07:58:44",
    severity: "INFO",
    sourceIP: "10.10.1.22",
    destination: "10.10.5.22:8080",
    eventType: "AUTH_SUCCESS",
    message: "Authentication SUCCESS — user 'lpark' logged in",
  },
  {
    id: "a14",
    time: "07:55:12",
    severity: "INFO",
    sourceIP: "10.10.1.15",
    destination: "10.10.5.22:8080",
    eventType: "AUTH_SUCCESS",
    message: "Authentication SUCCESS — user 'jsmith' logged in",
  },
];

const NETWORK_LOGS: LogEntry[] = [
  {
    id: "n01",
    time: "08:47:08",
    severity: "HIGH",
    sourceIP: "192.0.2.47",
    destination: "10.10.5.22:8080",
    eventType: "TCP_SESSION",
    message: "Active TCP session established — external IP to HR Portal (post-authentication)",
    canFlag: true,
  },
  {
    id: "n02",
    time: "08:45:10",
    severity: "INFO",
    sourceIP: "10.10.1.15",
    destination: "10.10.3.1:443",
    eventType: "HTTPS_OUT",
    message: "Outbound HTTPS to corporate proxy gateway",
  },
  {
    id: "n03",
    time: "08:44:33",
    severity: "INFO",
    sourceIP: "10.10.1.22",
    destination: "10.10.3.1:443",
    eventType: "HTTPS_OUT",
    message: "Outbound HTTPS to corporate proxy gateway",
  },
  {
    id: "n04",
    time: "08:30:00",
    severity: "INFO",
    sourceIP: "10.10.2.5",
    destination: "8.8.8.8:53",
    eventType: "DNS_QUERY",
    message: "DNS query — A record lookup for meridianfg.internal",
  },
  {
    id: "n05",
    time: "08:02:05",
    severity: "MEDIUM",
    sourceIP: "192.0.2.47",
    destination: "10.10.5.0/24",
    eventType: "SWEEP_DETECT",
    message: "Rapid connection sweep detected — external IP probing subnet 10.10.5.0/24",
    canFlag: true,
  },
];

const FIREWALL_LOGS: LogEntry[] = [
  {
    id: "f01",
    time: "08:02:16",
    severity: "INFO",
    sourceIP: "192.0.2.47",
    destination: "10.10.5.22:8080",
    eventType: "FW_ALLOW",
    message: "ALLOW — rule: DMZ-WEB-IN — src: external, dst: 10.10.5.22, port 8080/TCP",
    canFlag: true,
  },
  {
    id: "f02",
    time: "08:02:10",
    severity: "INFO",
    sourceIP: "192.0.2.47",
    destination: "10.10.5.22:22",
    eventType: "FW_DENY",
    message: "DENY — rule: BLOCK-EXT-SSH — src: external, dst: 10.10.5.22, port 22/TCP",
    canFlag: true,
  },
  {
    id: "f03",
    time: "07:50:00",
    severity: "INFO",
    sourceIP: "10.10.1.0/24",
    destination: "ANY:443",
    eventType: "FW_ALLOW",
    message: "ALLOW — rule: INTERNAL-HTTPS-OUT — src: 10.10.1.0/24, dst: ANY, port 443/TCP",
  },
  {
    id: "f04",
    time: "07:45:22",
    severity: "INFO",
    sourceIP: "ANY",
    destination: "10.10.5.22:80",
    eventType: "FW_ALLOW",
    message: "ALLOW — rule: DMZ-HTTP-IN — src: ANY, dst: 10.10.5.22, port 80/TCP (redirects to 8080)",
  },
];

const SYSTEM_LOGS: LogEntry[] = [
  {
    id: "s01",
    time: "08:47:06",
    severity: "CRITICAL",
    sourceIP: "10.10.5.22",
    destination: "—",
    eventType: "SESSION_START",
    message: "New session opened — user: 'hradmin', source IP: 192.0.2.47 (EXTERNAL) — ACCOUNT COMPROMISED",
  },
  {
    id: "s02",
    time: "08:07:44",
    severity: "MEDIUM",
    sourceIP: "10.10.5.22",
    destination: "—",
    eventType: "CPU_HIGH",
    message: "CPU utilization peaked at 89% — sustained load from rapid auth request processing",
  },
  {
    id: "s03",
    time: "08:00:00",
    severity: "INFO",
    sourceIP: "10.10.5.22",
    destination: "—",
    eventType: "SVC_STATUS",
    message: "HR Portal service healthy — uptime 23h 44m, 3 active sessions",
  },
  {
    id: "s04",
    time: "07:30:00",
    severity: "INFO",
    sourceIP: "10.10.5.10",
    destination: "—",
    eventType: "BACKUP_OK",
    message: "Scheduled backup to 10.10.10.5 completed — 2.4 GB, duration 4m 12s",
  },
];

/* ════════════════════════════ TASK DEFINITIONS ════════════════════════════ */

const Q2_TASKS = [
  {
    key: "t1_viewedAuthLogs" as keyof Q2Scores,
    label: "Task 1 — Navigated to the Authentication log category",
    correctExplanation:
      "You navigated to the Authentication log category, which is where the primary attack evidence lives. The logs showed 285 sequential failed login attempts from 192.0.2.47 followed by a successful authentication as 'hradmin' — a definitive brute force pattern. The Overview, Network, Firewall, and System tabs each contain supporting indicators, but only Authentication contains the full attack chain.",
    incorrectExplanation:
      "You did not navigate to the Authentication log category. This tab contains the primary evidence — 285 sequential failed authentication attempts from a single external IP culminating in a successful account compromise. Any SOC investigation of suspicious login activity must begin with the Authentication logs; all other tabs provide supporting context only.",
  },
  {
    key: "t2_flaggedCorrectIP" as keyof Q2Scores,
    label: "Task 2 — Identified the attacking source IP as 192.0.2.47",
    correctExplanation:
      "You correctly identified 192.0.2.47 as the attacking source IP. This external address generated 285 failed authentication attempts against the HR Portal (10.10.5.22:8080) between 08:02 and 08:47 UTC, then successfully authenticated as 'hradmin'. The other external IP in the logs — 203.0.113.15 — produced only 3 failed attempts across three minutes, consistent with a misconfigured client or user error rather than a systematic attack.",
    incorrectExplanation:
      "You did not identify 192.0.2.47 as the attacking source IP. The Authentication logs show this external IP generated 285 sequential failed login attempts over 45 minutes before successfully authenticating. Quantifying failed authentication events per source IP is the standard technique for identifying brute force attackers. The other external IP (203.0.113.15, 3 failures) is a red herring by comparison.",
  },
  {
    key: "t3_correctAttackType" as keyof Q2Scores,
    label: "Task 3 — Classified the attack as Brute Force",
    correctExplanation:
      "You correctly classified this as a Brute Force Attack. The key indicators: (1) 285 sequential failed attempts from a single source IP over 45 minutes; (2) systematic username enumeration — cycling through 'admin', 'administrator', 'hradmin'; (3) eventual authentication success on attempt #286. The username variation distinguishes this from a pure password-spray attack, which uses one username at scale.",
    incorrectExplanation:
      "You did not correctly classify this as a Brute Force Attack. The evidence: 285 sequential failed login attempts from 192.0.2.47, systematic cycling through usernames (admin, administrator, hradmin), eventual successful authentication on attempt #286. This combination of high-volume sequential failures, username enumeration, and eventual success is the defining fingerprint of a brute force credential attack.",
  },
  {
    key: "t4_identifiedTarget" as keyof Q2Scores,
    label: "Task 4 — Identified the targeted system as the HR Portal (10.10.5.22)",
    correctExplanation:
      "You correctly identified 10.10.5.22 — the HR Portal server — as the targeted system. All 285 failed attempts and the final successful login were directed to this server on port 8080. The HR Portal stores sensitive employee records, compensation data, and personally identifiable information, amplifying the severity: the attacker now has authenticated access to all data visible to the 'hradmin' account.",
    incorrectExplanation:
      "You did not identify 10.10.5.22 as the targeted system. All 285 failed authentication attempts and the final successful login in the Authentication logs were directed to 10.10.5.22:8080 — the HR Portal server. Correctly identifying the targeted system determines the scope of data exposure and which records may have been accessed after the attacker authenticated successfully.",
  },
  {
    key: "t5_submittedReport" as keyof Q2Scores,
    label: "Task 5 — Submitted the incident report",
    correctExplanation:
      "You completed and submitted the incident report. Formal incident documentation is a mandatory step in the incident response lifecycle: it creates the audit trail required for compliance reporting, triggers escalation to the response team, and initiates remediation — disabling the 'hradmin' account, blocking 192.0.2.47 at the firewall, and preserving log evidence for forensic analysis.",
    incorrectExplanation:
      "You did not submit an incident report. After confirming a security incident — a completed brute force attack resulting in account compromise — a formal report is the required next action. The report triggers the incident response process: disabling the compromised account, blocking the attacking IP at the perimeter firewall, and satisfying breach notification obligations under applicable compliance frameworks.",
  },
];

/* ════════════════════════════ SEVERITY BADGE ════════════════════════════ */

const SEV_STYLE: Record<Severity, { bg: string; color: string }> = {
  CRITICAL: { bg: "#C62828", color: "white" },
  HIGH:     { bg: "#D84315", color: "white" },
  MEDIUM:   { bg: "#F57F17", color: "white" },
  LOW:      { bg: "#1565C0", color: "white" },
  INFO:     { bg: "#37474F", color: "white" },
};

function SevBadge({ s }: { s: Severity }) {
  const st = SEV_STYLE[s];
  return (
    <span
      style={{
        display: "inline-block",
        backgroundColor: st.bg,
        color: st.color,
        borderRadius: "4px",
        padding: "2px 6px",
        fontSize: "10px",
        fontWeight: 700,
        letterSpacing: "0.05em",
        fontFamily: "ui-monospace, 'Courier New', monospace",
        whiteSpace: "nowrap",
        minWidth: "62px",
        textAlign: "center",
      }}
    >
      {s}
    </span>
  );
}

/* ════════════════════════════ LEFT PANEL ════════════════════════════ */

function LeftPanel2({ open, onClose }: { open: boolean; onClose: () => void }) {
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
      {/* Panel header */}
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
        <button
          onClick={onClose}
          style={{ background: "none", border: "none", cursor: "pointer", padding: "2px", opacity: 0.8, lineHeight: 1 }}
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
            <line x1="18" y1="6" x2="6" y2="18" stroke="white" strokeWidth="2.2" strokeLinecap="round" />
            <line x1="6" y1="6" x2="18" y2="18" stroke="white" strokeWidth="2.2" strokeLinecap="round" />
          </svg>
        </button>
      </div>

      {/* Scrollable content */}
      <div
        style={{ flex: 1, overflowY: "auto", overflowX: "hidden", padding: "18px 16px 24px", minWidth: "292px" }}
      >
        {/* SCENARIO */}
        <div style={{ marginBottom: "20px" }}>
          <h2
            style={{
              fontSize: "11px", fontWeight: 800, letterSpacing: "0.1em", color: "#0A1628",
              marginBottom: "12px", borderBottom: "2px solid #F5A623", paddingBottom: "6px",
              textTransform: "uppercase", margin: "0 0 12px",
            }}
          >
            Scenario
          </h2>
          <p style={{ fontSize: "12.5px", lineHeight: "1.75", color: "#1e293b", marginBottom: "12px" }}>
            At Meridian Financial Group, the Security Operations Center (SOC) received an automated alert cluster at 08:02 UTC indicating an unusual spike in authentication failures on an internal server. SOC Manager Lisa Park has escalated the alerts to your team for immediate investigation and response.
          </p>
          <p style={{ fontSize: "12.5px", lineHeight: "1.75", color: "#1e293b", marginBottom: "12px" }}>
            Meridian Financial Group operates a hybrid on-premises and cloud infrastructure serving approximately 1,400 employees across six regional offices. All authentication events, network flows, firewall decisions, and system events are ingested in real time by the centralized SIEM platform.
          </p>
          <p style={{ fontSize: "12.5px", lineHeight: "1.75", color: "#1e293b", marginBottom: "0" }}>
            The HR department has not reported any issues this morning. However, the volume of failed login alerts is significantly above the normal daily baseline. SOC Manager Park suspects an external threat actor may be attempting to gain unauthorized access to a sensitive internal system.
          </p>
        </div>

        {/* INSTRUCTIONS */}
        <div>
          <h2
            style={{
              fontSize: "11px", fontWeight: 800, letterSpacing: "0.1em", color: "#0A1628",
              marginBottom: "12px", borderBottom: "2px solid #F5A623", paddingBottom: "6px",
              textTransform: "uppercase", margin: "0 0 12px",
            }}
          >
            Instructions
          </h2>
          <ol style={{ margin: 0, padding: "0 0 0 18px", listStyleType: "decimal" }}>
            {[
              "Open the Authentication log category in the SIEM dashboard and review all authentication events from the past hour.",
              "Identify any source IP addresses generating an abnormal number of failed authentication attempts. Review the attempt counts, timing patterns, and username variations.",
              "Based on the log evidence, determine the attack type that best describes the observed activity.",
              "Identify which internal system is the primary target of the attack.",
              "Complete the Incident Report form with your findings — source IP, attack type, and targeted system — then click Submit Report.",
              "Click Submit when you have completed your investigation.",
            ].map((step, i) => (
              <li key={i} style={{ fontSize: "12.5px", lineHeight: "1.7", color: "#1e293b", marginBottom: "10px" }}>
                {step}
              </li>
            ))}
          </ol>
          <p style={{ fontSize: "11.5px", fontStyle: "italic", color: "#64748b", marginTop: "16px", lineHeight: "1.6" }}>
            If at any time you want to restart your investigation, click Reset All Answers.
          </p>
        </div>
      </div>
    </div>
  );
}

/* ════════════════════════════ OVERVIEW TAB ════════════════════════════ */

function OverviewTab() {
  const stats = [
    { label: "Total Events (1h)", value: "847", color: "#E2E8F0" },
    { label: "Critical", value: "1", color: "#C62828" },
    { label: "High", value: "312", color: "#D84315" },
    { label: "Medium", value: "23", color: "#F57F17" },
    { label: "Low / Info", value: "511", color: "#1565C0" },
  ];

  const recentAlerts = [
    { time: "08:47:06", sev: "CRITICAL" as Severity, msg: "ACCOUNT COMPROMISE — user 'hradmin' authenticated from external IP 192.0.2.47" },
    { time: "08:07:44", sev: "MEDIUM" as Severity, msg: "CPU spike 89% on 10.10.5.22 — sustained high-rate authentication processing" },
    { time: "08:02:05", sev: "MEDIUM" as Severity, msg: "Subnet sweep detected — 192.0.2.47 probing 10.10.5.0/24" },
  ];

  return (
    <div>
      {/* Stat cards */}
      <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", marginBottom: "20px" }}>
        {stats.map((s) => (
          <div
            key={s.label}
            style={{
              backgroundColor: "#1A2638",
              border: "1px solid #2A3A50",
              borderRadius: "8px",
              padding: "14px 18px",
              minWidth: "110px",
              flex: "1",
            }}
          >
            <div style={{ fontSize: "22px", fontWeight: 800, color: s.color, fontFamily: "ui-monospace, monospace" }}>
              {s.value}
            </div>
            <div style={{ fontSize: "11px", color: "#8CA0B8", fontWeight: 600, marginTop: "4px" }}>
              {s.label}
            </div>
          </div>
        ))}
      </div>

      {/* Recent critical alerts */}
      <div style={{ backgroundColor: "#1A2638", border: "1px solid #2A3A50", borderRadius: "8px", overflow: "hidden" }}>
        <div style={{ backgroundColor: "#0D1B2A", padding: "10px 14px", borderBottom: "1px solid #2A3A50" }}>
          <span style={{ color: "#8CA0B8", fontSize: "11px", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase" }}>
            Recent Alerts
          </span>
        </div>
        {recentAlerts.map((a, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              padding: "10px 14px",
              borderBottom: i < recentAlerts.length - 1 ? "1px solid #1E2E40" : "none",
            }}
          >
            <span style={{ fontFamily: "ui-monospace, monospace", fontSize: "11px", color: "#6B8099", whiteSpace: "nowrap" }}>
              {a.time}
            </span>
            <SevBadge s={a.sev} />
            <span style={{ fontSize: "12.5px", color: "#C8D8E8", flex: 1 }}>{a.msg}</span>
          </div>
        ))}
      </div>

      <p style={{ fontSize: "11.5px", color: "#4A6278", marginTop: "14px", fontStyle: "italic" }}>
        Navigate to a specific log category above to investigate the full event detail.
      </p>
    </div>
  );
}

/* ════════════════════════════ LOG TABLE ════════════════════════════ */

function LogTable({
  logs,
  flaggedIP,
  onFlag,
}: {
  logs: LogEntry[];
  flaggedIP: string;
  onFlag: (ip: string, dest: string) => void;
}) {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  return (
    <div
      style={{
        backgroundColor: "#1A2638",
        border: "1px solid #2A3A50",
        borderRadius: "8px",
        overflow: "hidden",
      }}
    >
      {/* Table header */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "80px 80px 120px 150px 130px 1fr 90px",
          gap: "0",
          backgroundColor: "#0D1B2A",
          borderBottom: "1px solid #2A3A50",
          padding: "8px 12px",
        }}
      >
        {["Time", "Severity", "Source IP", "Destination", "Event Type", "Message", "Action"].map((h) => (
          <div key={h} style={{ fontSize: "10px", fontWeight: 700, color: "#6B8099", letterSpacing: "0.08em", textTransform: "uppercase" }}>
            {h}
          </div>
        ))}
      </div>

      {/* Rows */}
      {logs.map((entry) => {
        if (entry.isSeparator) {
          return (
            <div
              key={entry.id}
              style={{
                padding: "8px 12px",
                backgroundColor: "#131E2C",
                borderBottom: "1px solid #1E2E40",
                textAlign: "center",
                fontSize: "11px",
                color: "#4A6278",
                fontStyle: "italic",
                fontFamily: "ui-monospace, monospace",
              }}
            >
              {entry.message}
            </div>
          );
        }

        const isSelected = selectedId === entry.id;
        const isFlagged = entry.sourceIP === flaggedIP && flaggedIP !== "";

        return (
          <div key={entry.id}>
            <div
              onClick={() => setSelectedId(isSelected ? null : entry.id)}
              style={{
                display: "grid",
                gridTemplateColumns: "80px 80px 120px 150px 130px 1fr 90px",
                gap: "0",
                padding: "9px 12px",
                borderBottom: "1px solid #1E2E40",
                backgroundColor: isSelected ? "#1D3050" : isFlagged ? "rgba(220,38,38,0.08)" : "transparent",
                cursor: "pointer",
                alignItems: "center",
                transition: "background-color 0.1s",
              }}
              onMouseEnter={(e) => {
                if (!isSelected) (e.currentTarget as HTMLDivElement).style.backgroundColor = "#1A2E44";
              }}
              onMouseLeave={(e) => {
                if (!isSelected) (e.currentTarget as HTMLDivElement).style.backgroundColor = isFlagged ? "rgba(220,38,38,0.08)" : "transparent";
              }}
            >
              <span style={{ fontFamily: "ui-monospace, monospace", fontSize: "11px", color: "#6B8099" }}>
                {entry.time}
              </span>
              <div><SevBadge s={entry.severity} /></div>
              <span
                style={{
                  fontFamily: "ui-monospace, monospace",
                  fontSize: "11px",
                  color: isFlagged ? "#F87171" : "#A0C0D8",
                }}
              >
                {entry.sourceIP}
                {isFlagged && (
                  <span style={{ marginLeft: "4px", fontSize: "10px" }}>🚩</span>
                )}
              </span>
              <span style={{ fontFamily: "ui-monospace, monospace", fontSize: "11px", color: "#8CA0B8" }}>
                {entry.destination}
              </span>
              <span style={{ fontFamily: "ui-monospace, monospace", fontSize: "10.5px", color: "#7A9AB5" }}>
                {entry.eventType}
              </span>
              <span style={{ fontSize: "12px", color: "#C8D8E8", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                {entry.message}
              </span>
              <div>
                {entry.canFlag && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onFlag(entry.sourceIP, entry.destination);
                    }}
                    style={{
                      backgroundColor: isFlagged ? "#7F1D1D" : "#1D3A5C",
                      color: isFlagged ? "#FCA5A5" : "#93C5FD",
                      border: `1px solid ${isFlagged ? "#F87171" : "#3B82F6"}`,
                      borderRadius: "4px",
                      padding: "3px 8px",
                      fontSize: "10.5px",
                      fontWeight: 600,
                      cursor: "pointer",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {isFlagged ? "Flagged ✓" : "Flag IP"}
                  </button>
                )}
              </div>
            </div>

            {/* Expanded row detail */}
            {isSelected && (
              <div
                style={{
                  backgroundColor: "#0D1B2A",
                  borderBottom: "1px solid #2A3A50",
                  padding: "12px 14px",
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "8px",
                }}
              >
                <div>
                  <span style={{ fontSize: "10px", fontWeight: 700, color: "#4A6278", textTransform: "uppercase", letterSpacing: "0.07em" }}>Full Message</span>
                  <p style={{ fontSize: "12px", color: "#C8D8E8", margin: "4px 0 0", lineHeight: "1.5", fontFamily: "ui-monospace, monospace" }}>
                    {entry.message}
                  </p>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                  <div>
                    <span style={{ fontSize: "10px", fontWeight: 700, color: "#4A6278", textTransform: "uppercase", letterSpacing: "0.07em" }}>Source</span>
                    <span style={{ display: "block", fontSize: "12px", color: "#A0C0D8", fontFamily: "ui-monospace, monospace" }}>{entry.sourceIP}</span>
                  </div>
                  <div>
                    <span style={{ fontSize: "10px", fontWeight: 700, color: "#4A6278", textTransform: "uppercase", letterSpacing: "0.07em" }}>Destination</span>
                    <span style={{ display: "block", fontSize: "12px", color: "#A0C0D8", fontFamily: "ui-monospace, monospace" }}>{entry.destination}</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

/* ════════════════════════════ INCIDENT REPORT ════════════════════════════ */

const ATTACK_TYPE_OPTIONS = [
  "",
  "Brute Force Attack",
  "Password Spray",
  "Credential Stuffing",
  "SQL Injection",
  "DDoS (Distributed Denial of Service)",
  "Port Scanning",
  "Phishing",
  "Man-in-the-Middle",
];

const TARGET_SYSTEM_OPTIONS = [
  { value: "", label: "— Select system —" },
  { value: "10.10.3.1", label: "10.10.3.1 — Corporate Gateway" },
  { value: "10.10.2.5", label: "10.10.2.5 — Internal DNS Server" },
  { value: "10.10.5.10", label: "10.10.5.10 — Backup Server" },
  { value: "10.10.5.22", label: "10.10.5.22 — HR Portal" },
];

function IncidentReportSection({
  sourceIPInput,
  setSourceIPInput,
  attackType,
  setAttackType,
  targetSystem,
  setTargetSystem,
  incidentSubmitted,
  onSubmitReport,
}: {
  sourceIPInput: string;
  setSourceIPInput: (v: string) => void;
  attackType: string;
  setAttackType: (v: string) => void;
  targetSystem: string;
  setTargetSystem: (v: string) => void;
  incidentSubmitted: boolean;
  onSubmitReport: () => void;
}) {
  const fieldBase: React.CSSProperties = {
    backgroundColor: "#0D1B2A",
    border: "1px solid #2A3A50",
    borderRadius: "5px",
    color: "#C8D8E8",
    padding: "7px 10px",
    fontSize: "12.5px",
    fontFamily: "ui-monospace, 'Courier New', monospace",
    outline: "none",
    width: "100%",
    boxSizing: "border-box",
  };

  return (
    <div
      style={{
        marginTop: "20px",
        backgroundColor: "#1A2638",
        border: "1px solid #2A3A50",
        borderRadius: "8px",
        overflow: "hidden",
      }}
    >
      {/* Header */}
      <div
        style={{
          backgroundColor: "#0D1B2A",
          padding: "10px 14px",
          borderBottom: "1px solid #2A3A50",
          display: "flex",
          alignItems: "center",
          gap: "10px",
        }}
      >
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" stroke="#F5A623" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          <polyline points="14,2 14,8 20,8" stroke="#F5A623" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          <line x1="16" y1="13" x2="8" y2="13" stroke="#F5A623" strokeWidth="1.8" strokeLinecap="round" />
          <line x1="16" y1="17" x2="8" y2="17" stroke="#F5A623" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
        <span style={{ color: "#F5A623", fontSize: "12px", fontWeight: 700, letterSpacing: "0.07em", textTransform: "uppercase" }}>
          Incident Report
        </span>
        {incidentSubmitted && (
          <span
            style={{
              backgroundColor: "#14532D",
              color: "#86EFAC",
              borderRadius: "12px",
              padding: "2px 10px",
              fontSize: "10.5px",
              fontWeight: 700,
            }}
          >
            ✓ Submitted
          </span>
        )}
      </div>

      {/* Form */}
      <div style={{ padding: "16px 14px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "14px" }}>
          {/* Source IP */}
          <div>
            <label style={{ display: "block", fontSize: "10px", fontWeight: 700, color: "#6B8099", letterSpacing: "0.07em", textTransform: "uppercase", marginBottom: "5px" }}>
              Attacking Source IP
            </label>
            <input
              type="text"
              value={sourceIPInput}
              onChange={(e) => setSourceIPInput(e.target.value)}
              placeholder="e.g. 192.0.2.47"
              disabled={incidentSubmitted}
              style={{ ...fieldBase, opacity: incidentSubmitted ? 0.6 : 1 }}
            />
            <p style={{ fontSize: "10.5px", color: "#4A6278", marginTop: "4px" }}>
              Click Flag IP in the log table to auto-fill
            </p>
          </div>

          {/* Attack Type */}
          <div>
            <label style={{ display: "block", fontSize: "10px", fontWeight: 700, color: "#6B8099", letterSpacing: "0.07em", textTransform: "uppercase", marginBottom: "5px" }}>
              Attack Classification
            </label>
            <select
              value={attackType}
              onChange={(e) => setAttackType(e.target.value)}
              disabled={incidentSubmitted}
              style={{ ...fieldBase, cursor: incidentSubmitted ? "default" : "pointer", opacity: incidentSubmitted ? 0.6 : 1 }}
            >
              {ATTACK_TYPE_OPTIONS.map((o) => (
                <option key={o} value={o} style={{ backgroundColor: "#0D1B2A", color: "#C8D8E8" }}>
                  {o || "— Select attack type —"}
                </option>
              ))}
            </select>
          </div>

          {/* Target system */}
          <div>
            <label style={{ display: "block", fontSize: "10px", fontWeight: 700, color: "#6B8099", letterSpacing: "0.07em", textTransform: "uppercase", marginBottom: "5px" }}>
              Targeted System
            </label>
            <select
              value={targetSystem}
              onChange={(e) => setTargetSystem(e.target.value)}
              disabled={incidentSubmitted}
              style={{ ...fieldBase, cursor: incidentSubmitted ? "default" : "pointer", opacity: incidentSubmitted ? 0.6 : 1 }}
            >
              {TARGET_SYSTEM_OPTIONS.map((o) => (
                <option key={o.value} value={o.value} style={{ backgroundColor: "#0D1B2A", color: "#C8D8E8" }}>
                  {o.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Submit button */}
        <div style={{ marginTop: "14px", display: "flex", justifyContent: "flex-end" }}>
          {incidentSubmitted ? (
            <div style={{ display: "flex", alignItems: "center", gap: "8px", color: "#86EFAC", fontSize: "13px", fontWeight: 600 }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="10" fill="#16A34A" />
                <polyline points="8,12 11,15 16,9" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Incident report submitted successfully
            </div>
          ) : (
            <button
              onClick={onSubmitReport}
              style={{
                backgroundColor: "#F5A623",
                color: "#0A1628",
                border: "none",
                borderRadius: "6px",
                padding: "9px 22px",
                fontSize: "13px",
                fontWeight: 700,
                cursor: "pointer",
                letterSpacing: "0.02em",
              }}
            >
              Submit Incident Report
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

/* ════════════════════════════ FINISH TASK LIST (inline bottom bar) ════════════════════════════ */

const Q2_FINISH_TASKS = [
  { key: "t1_viewedAuthLogs" as keyof Q2Scores },
  { key: "t2_flaggedCorrectIP" as keyof Q2Scores },
  { key: "t3_correctAttackType" as keyof Q2Scores },
  { key: "t4_identifiedTarget" as keyof Q2Scores },
  { key: "t5_submittedReport" as keyof Q2Scores },
];

/* ════════════════════════════ RESULTS PANEL ════════════════════════════ */

function ResultsPanel2({ scores, onExit, onNext }: { scores: Q2Scores; onExit: () => void; onNext?: () => void }) {
  const total = Object.values(scores).filter(Boolean).length;
  const outOf = Q2_TASKS.length;
  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 60, backgroundColor: "rgba(0,0,0,0.55)", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ backgroundColor: "white", borderRadius: "12px", boxShadow: "0 24px 60px rgba(0,0,0,0.35)", overflow: "hidden", minWidth: "360px", maxWidth: "480px", width: "100%" }}>
        <div style={{ backgroundColor: "#0A1628", padding: "28px 32px 24px", textAlign: "center" }}>
          <div style={{ width: "64px", height: "64px", borderRadius: "50%", backgroundColor: total >= 4 ? "#2E7D32" : total >= 2 ? "#E65100" : "#C62828", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px", boxShadow: "0 0 0 6px rgba(255,255,255,0.12)" }}>
            {total >= 3 ? <svg width="30" height="30" viewBox="0 0 24 24" fill="none"><polyline points="20,6 9,17 4,12" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" /></svg> : <svg width="28" height="28" viewBox="0 0 24 24" fill="none"><line x1="18" y1="6" x2="6" y2="18" stroke="white" strokeWidth="2.5" strokeLinecap="round" /><line x1="6" y1="6" x2="18" y2="18" stroke="white" strokeWidth="2.5" strokeLinecap="round" /></svg>}
          </div>
          <div style={{ color: "white", fontSize: "24px", fontWeight: 800, letterSpacing: "-0.02em" }}>{total} out of {outOf} correct</div>
          <div style={{ display: "flex", justifyContent: "center", gap: "6px", marginTop: "14px", flexWrap: "wrap" }}>
            {Q2_TASKS.map((t, i) => {
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

export default function Question2() {
  const [leftPanelOpen, setLeftPanelOpen] = useState(true);
  const [activeTab, setActiveTab] = useState<TabId>("overview");
  const [t1_viewedAuthLogs, setT1] = useState(false);
  const [sourceIPInput, setSourceIPInput] = useState("");
  const [attackType, setAttackType] = useState("");
  const [targetSystem, setTargetSystem] = useState("");
  const [incidentSubmitted, setIncidentSubmitted] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [finishFeedback, setFinishFeedback] = useState(false);

  const scores: Q2Scores = {
    t1_viewedAuthLogs,
    t2_flaggedCorrectIP: sourceIPInput.trim() === "192.0.2.47",
    t3_correctAttackType: attackType === "Brute Force Attack",
    t4_identifiedTarget: targetSystem === "10.10.5.22",
    t5_submittedReport: incidentSubmitted,
  };

  function handleTabClick(tab: TabId) {
    setActiveTab(tab);
    if (tab === "authentication") setT1(true);
  }

  function handleFlagIP(ip: string, dest: string) {
    setSourceIPInput(ip);
    const destIP = dest.split(":")[0];
    if (!targetSystem) setTargetSystem(destIP);
  }

  function handleReset() {
    setActiveTab("overview");
    setT1(false);
    setSourceIPInput("");
    setAttackType("");
    setTargetSystem("");
    setIncidentSubmitted(false);
    setSubmitted(false);
    setFinishFeedback(false);
    setLeftPanelOpen(true);
  }

  const TABS: { id: TabId; label: string }[] = [
    { id: "overview",       label: "Overview" },
    { id: "authentication", label: "Authentication" },
    { id: "network",        label: "Network" },
    { id: "firewall",       label: "Firewall" },
    { id: "system",         label: "System" },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh", overflow: "hidden", backgroundColor: "white" }}>

      {/* ════ HEADER ════ */}
      <header
        style={{
          position: "relative",
          zIndex: 20,
          backgroundColor: "white",
          borderBottom: "1px solid #DDDDDD",
          padding: "12px 20px",
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
          flexShrink: 0,
          gap: "16px",
        }}
      >
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
            <a href="/" style={{ display: "flex", alignItems: "center", gap: "8px", textDecoration: "none" }}>
              <div
                style={{
                  width: "28px", height: "28px", borderRadius: "6px", backgroundColor: "#0A1628",
                  display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
                }}
              >
                <span style={{ color: "#F5A623", fontWeight: 900, fontSize: "15px", lineHeight: 1 }}>C</span>
              </div>
              <span style={{ fontWeight: 800, fontSize: "14px", color: "#0A1628", letterSpacing: "0.01em" }}>Cert2Hire</span>
            </a>
            <span style={{ fontSize: "10.5px", color: "#94A3B8", fontWeight: 500 }}>Your Fastest Path to Certification</span>
          </div>
          <h1 style={{ fontSize: "20px", fontWeight: 800, color: "#0A1628", margin: "0 0 4px", letterSpacing: "-0.025em" }}>
            Question 2 — SIEM Log Investigation
          </h1>
          <p style={{ fontSize: "12.5px", color: "#64748B", margin: 0 }}>
            Investigate the SIEM alerts, identify the attack, and submit your incident report.
          </p>
        </div>
        <button
          onClick={() => setSubmitted(true)}
          style={{
            backgroundColor: "#0066CC",
            color: "white",
            border: "none",
            borderRadius: "6px",
            padding: "10px 26px",
            fontSize: "13.5px",
            fontWeight: 700,
            cursor: "pointer",
            whiteSpace: "nowrap",
            flexShrink: 0,
            boxShadow: "0 2px 8px rgba(0,102,204,0.3)",
            letterSpacing: "0.02em",
            marginTop: "4px",
          }}
        >
          Submit
        </button>
      </header>

      {/* ════ MAIN ROW ════ */}
      <div style={{ display: "flex", flex: 1, overflow: "hidden" }}>
        <LeftPanel2 open={leftPanelOpen} onClose={() => setLeftPanelOpen(false)} />

        <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden", minWidth: 0 }}>
          {/* Toolbar */}
          <div
            style={{
              position: "relative",
              zIndex: 20,
              padding: "7px 14px",
              borderBottom: "1px solid #DDDDDD",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              backgroundColor: "#FAFAFA",
              flexShrink: 0,
            }}
          >
            <button
              onClick={() => setLeftPanelOpen((v) => !v)}
              style={{
                display: "flex", alignItems: "center", gap: "6px",
                backgroundColor: "white", border: "1px solid #DDDDDD", borderRadius: "20px",
                padding: "5px 13px", fontSize: "12px", fontWeight: 600, color: "#374151", cursor: "pointer",
              }}
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" stroke="#374151" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                <polyline points="14,2 14,8 20,8" stroke="#374151" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                <line x1="16" y1="13" x2="8" y2="13" stroke="#374151" strokeWidth="1.8" strokeLinecap="round" />
                <line x1="16" y1="17" x2="8" y2="17" stroke="#374151" strokeWidth="1.8" strokeLinecap="round" />
              </svg>
              Show Question
            </button>
            <button
              onClick={handleReset}
              style={{
                display: "flex", alignItems: "center", gap: "6px",
                backgroundColor: "white", border: "1px solid #DDDDDD", borderRadius: "20px",
                padding: "5px 13px", fontSize: "12px", fontWeight: 600, color: "#374151", cursor: "pointer",
              }}
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
                <polyline points="1,4 1,10 7,10" stroke="#374151" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M3.51 15a9 9 0 1 0 .49-5.05" stroke="#374151" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Reset All Answers
            </button>
            <div style={{ flex: 1 }} />
            <button onClick={() => { window.location.href = "/question1"; }} style={{ display: "flex", alignItems: "center", gap: "5px", backgroundColor: "white", color: "#374151", border: "1px solid #DDDDDD", borderRadius: "20px", padding: "5px 14px", fontSize: "12px", fontWeight: 600, cursor: "pointer" }}>
              ← Previous
            </button>
            <button onClick={() => { window.location.href = "/question3"; }} style={{ display: "flex", alignItems: "center", gap: "5px", backgroundColor: "#0066CC", color: "white", border: "none", borderRadius: "20px", padding: "5px 14px", fontSize: "12px", fontWeight: 600, cursor: "pointer" }}>
              Next →
            </button>
          </div>

          {/* SIEM Dashboard */}
          <div style={{ flex: 1, overflow: "auto", backgroundColor: "#0F1923" }}>
            {/* SIEM top bar */}
            <div
              style={{
                backgroundColor: "#161B22",
                borderBottom: "1px solid #2A3A50",
                padding: "10px 16px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                flexShrink: 0,
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <span style={{ color: "#F5A623", fontWeight: 800, fontSize: "13px", letterSpacing: "0.05em" }}>
                  SIEM DASHBOARD
                </span>
                <span style={{ color: "#4A6278", fontSize: "11px" }}>·</span>
                <span style={{ color: "#6B8099", fontSize: "11.5px" }}>Meridian Financial Group</span>
                <span style={{ color: "#4A6278", fontSize: "11px" }}>·</span>
                <span style={{ color: "#6B8099", fontSize: "11.5px", fontFamily: "ui-monospace, monospace" }}>
                  08:52:14 UTC — 2026-06-01
                </span>
              </div>
              <div style={{ display: "flex", gap: "8px" }}>
                {[
                  { label: "1 CRITICAL", color: "#C62828" },
                  { label: "312 HIGH", color: "#D84315" },
                  { label: "23 MEDIUM", color: "#F57F17" },
                ].map((badge) => (
                  <span
                    key={badge.label}
                    style={{
                      backgroundColor: `${badge.color}22`,
                      color: badge.color,
                      border: `1px solid ${badge.color}55`,
                      borderRadius: "12px",
                      padding: "2px 8px",
                      fontSize: "10.5px",
                      fontWeight: 700,
                    }}
                  >
                    {badge.label}
                  </span>
                ))}
              </div>
            </div>

            {/* Tab bar */}
            <div
              style={{
                backgroundColor: "#0A1628",
                borderBottom: "1px solid #1E2E40",
                display: "flex",
                padding: "0 16px",
                flexShrink: 0,
              }}
            >
              {TABS.map((tab) => {
                const isActive = activeTab === tab.id;
                const isAuthViewed = tab.id === "authentication" && t1_viewedAuthLogs;
                return (
                  <button
                    key={tab.id}
                    onClick={() => handleTabClick(tab.id)}
                    style={{
                      backgroundColor: "transparent",
                      border: "none",
                      borderBottom: isActive ? "2px solid #F5A623" : "2px solid transparent",
                      color: isActive ? "#F5A623" : "#6B8099",
                      padding: "10px 14px",
                      fontSize: "12px",
                      fontWeight: isActive ? 700 : 500,
                      cursor: "pointer",
                      letterSpacing: "0.04em",
                      transition: "color 0.1s, border-color 0.1s",
                      display: "flex",
                      alignItems: "center",
                      gap: "5px",
                    }}
                  >
                    {tab.label}
                    {isAuthViewed && (
                      <span style={{ width: "6px", height: "6px", borderRadius: "50%", backgroundColor: "#22C55E", display: "inline-block" }} />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Tab content */}
            <div style={{ padding: "16px" }}>
              {activeTab === "overview" && <OverviewTab />}
              {activeTab === "authentication" && (
                <LogTable logs={AUTH_LOGS} flaggedIP={sourceIPInput} onFlag={handleFlagIP} />
              )}
              {activeTab === "network" && (
                <LogTable logs={NETWORK_LOGS} flaggedIP={sourceIPInput} onFlag={handleFlagIP} />
              )}
              {activeTab === "firewall" && (
                <LogTable logs={FIREWALL_LOGS} flaggedIP={sourceIPInput} onFlag={handleFlagIP} />
              )}
              {activeTab === "system" && (
                <LogTable logs={SYSTEM_LOGS} flaggedIP={sourceIPInput} onFlag={handleFlagIP} />
              )}

              <IncidentReportSection
                sourceIPInput={sourceIPInput}
                setSourceIPInput={setSourceIPInput}
                attackType={attackType}
                setAttackType={setAttackType}
                targetSystem={targetSystem}
                setTargetSystem={setTargetSystem}
                incidentSubmitted={incidentSubmitted}
                onSubmitReport={() => setIncidentSubmitted(true)}
              />
            </div>
          </div>
        </div>
      </div>

      {/* ════ BOTTOM BAR ════ */}
      <div
        style={{
          position: "relative",
          zIndex: 20,
          borderTop: "1px solid #DDDDDD",
          padding: "9px 18px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          backgroundColor: "white",
          flexShrink: 0,
        }}
      >
        <button
          onClick={() => setLeftPanelOpen((v) => !v)}
          style={{
            display: "flex", alignItems: "center", gap: "6px",
            backgroundColor: "#F5F7FA", border: "1px solid #DDDDDD", borderRadius: "5px",
            padding: "6px 14px", fontSize: "12.5px", fontWeight: 600, color: "#374151", cursor: "pointer",
          }}
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" stroke="#374151" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            <polyline points="14,2 14,8 20,8" stroke="#374151" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            <line x1="16" y1="13" x2="8" y2="13" stroke="#374151" strokeWidth="1.8" strokeLinecap="round" />
            <line x1="16" y1="17" x2="8" y2="17" stroke="#374151" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
          Scenario
        </button>

        <div style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap" }}>
          {finishFeedback && Q2_FINISH_TASKS.map((t, i) => {
            const ok = scores[t.key];
            return (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: "4px", backgroundColor: ok ? "#F0FDF4" : "#FEF2F2", border: `1px solid ${ok ? "#BBF7D0" : "#FECACA"}`, borderRadius: "16px", padding: "3px 9px 3px 6px", fontSize: "11.5px", color: ok ? "#166534" : "#991B1B", fontWeight: 600 }}>
                {ok ? <svg width="12" height="12" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" fill="#16A34A" /><polyline points="8,12 11,15 16,9" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" /></svg> : <svg width="12" height="12" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" fill="#DC2626" /><line x1="8" y1="8" x2="16" y2="16" stroke="white" strokeWidth="2.2" strokeLinecap="round" /><line x1="16" y1="8" x2="8" y2="16" stroke="white" strokeWidth="2.2" strokeLinecap="round" /></svg>}
                T{i + 1}
              </div>
            );
          })}
          <button onClick={handleReset} style={{ backgroundColor: "white", border: "1px solid #DDDDDD", borderRadius: "5px", padding: "6px 14px", fontSize: "12.5px", fontWeight: 600, color: "#374151", cursor: "pointer" }}>
            Reset All Answers
          </button>
          <button
            onClick={() => setFinishFeedback((v) => !v)}
            style={{ backgroundColor: finishFeedback ? "#475569" : "#0A1628", color: "white", border: "none", borderRadius: "5px", padding: "6px 18px", fontSize: "12.5px", fontWeight: 700, cursor: "pointer" }}
          >
            {finishFeedback ? "Hide" : "Finish"}
          </button>
        </div>
      </div>

      {/* ════ OVERLAYS ════ */}
      {submitted && (
        <ResultsPanel2
          scores={scores}
          onExit={() => { window.location.href = "/"; }}
          onNext={() => { window.location.href = "/question3"; }}
        />
      )}
    </div>
  );
}
