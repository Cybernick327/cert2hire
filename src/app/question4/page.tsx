"use client";

import { useState, useMemo } from "react";

/* ════════════════════════════ TYPES ════════════════════════════ */

type Resource = "hr_portal" | "finance_db" | "admin_console" | "file_server" | "email" | "vpn";
type UserId = "martinez" | "thompson" | "rivera" | "nakamura" | "singh";

interface UserProfile {
  id: UserId;
  name: string;
  role: string;
  department: string;
}

type PermissionMap = Record<Resource, boolean>;
type AllPermissions = Record<UserId, PermissionMap>;

interface Q4Scores {
  t1_viewedAnyUser: boolean;
  t2_revokedRiveraAdminConsole: boolean;
  t3_revokedMartinezFinanceDb: boolean;
  t4_grantedSinghVpn: boolean;
  t5_submittedAudit: boolean;
}

/* ════════════════════════════ DATA ════════════════════════════ */

const USERS: UserProfile[] = [
  { id: "martinez", name: "R. Martinez",  role: "HR Analyst",       department: "Human Resources" },
  { id: "thompson", name: "K. Thompson",  role: "Finance Analyst",  department: "Finance" },
  { id: "rivera",   name: "J. Rivera",    role: "IT Support",       department: "Information Technology" },
  { id: "nakamura", name: "M. Nakamura",  role: "Executive",        department: "Senior Management" },
  { id: "singh",    name: "A. Singh",     role: "Developer",        department: "Engineering" },
];

const RESOURCE_LABELS: Record<Resource, { label: string; icon: string }> = {
  hr_portal:     { label: "HR Portal",      icon: "👤" },
  finance_db:    { label: "Finance DB",     icon: "💰" },
  admin_console: { label: "Admin Console",  icon: "🔑" },
  file_server:   { label: "File Server",    icon: "📁" },
  email:         { label: "Email",          icon: "✉️" },
  vpn:           { label: "VPN",            icon: "🔒" },
};

const RESOURCES: Resource[] = ["hr_portal", "finance_db", "admin_console", "file_server", "email", "vpn"];

const INITIAL_PERMISSIONS: AllPermissions = {
  martinez: { hr_portal: true,  finance_db: true,  admin_console: true,  file_server: true,  email: true,  vpn: false },
  thompson: { hr_portal: true,  finance_db: true,  admin_console: false, file_server: true,  email: true,  vpn: false },
  rivera:   { hr_portal: true,  finance_db: false, admin_console: true,  file_server: true,  email: true,  vpn: true  },
  nakamura: { hr_portal: true,  finance_db: true,  admin_console: false, file_server: true,  email: true,  vpn: false },
  singh:    { hr_portal: false, finance_db: false, admin_console: false, file_server: true,  email: true,  vpn: false },
};

const CORRECT_PERMISSIONS: AllPermissions = {
  martinez: { hr_portal: true,  finance_db: false, admin_console: false, file_server: true,  email: true,  vpn: false },
  thompson: { hr_portal: false, finance_db: true,  admin_console: false, file_server: true,  email: true,  vpn: false },
  rivera:   { hr_portal: false, finance_db: false, admin_console: true,  file_server: true,  email: true,  vpn: true  },
  nakamura: { hr_portal: true,  finance_db: true,  admin_console: false, file_server: true,  email: true,  vpn: false },
  singh:    { hr_portal: false, finance_db: false, admin_console: false, file_server: true,  email: true,  vpn: true  },
};

const PERMISSION_RATIONALE: Partial<Record<UserId, Partial<Record<Resource, string>>>> = {
  martinez: {
    finance_db:    "HR Analysts do not handle financial data — Finance DB access violates separation of duties.",
    admin_console: "Administrative console access is restricted to IT staff — HR Analysts have no legitimate need.",
  },
  thompson: {
    hr_portal: "Finance Analysts should not have access to employee HR records — this violates privacy and separation of duties.",
  },
  rivera: {
    hr_portal: "IT Support staff troubleshoot infrastructure, not HR data. Access to the HR Portal is not required for this role.",
  },
  singh: {
    vpn: "Developers require VPN access to securely connect to development environments from remote locations.",
  },
};

/* ════════════════════════════ TASK DEFINITIONS ════════════════════════════ */

const Q4_TASKS = [
  {
    key: "t1_viewedAnyUser" as keyof Q4Scores,
    label: "Task 1 — Opened a user account to review their permissions",
    correctExplanation:
      "You clicked on a user account to review their current permissions. Access control audits begin by examining the permission assignments of each user individually, comparing what they currently have against the minimum required by their role (the principle of least privilege). Viewing user permissions is the essential first step before identifying violations.",
    incorrectExplanation:
      "You did not open any user account to review permissions. An access control audit requires individually examining each user's permissions against their role requirements. Click any user in the left panel to begin the review — the right panel shows their current permissions and highlights any violations of the principle of least privilege.",
  },
  {
    key: "t2_revokedRiveraAdminConsole" as keyof Q4Scores,
    label: "Task 2 — Revoked J. Rivera's (IT Support) access to the HR Portal",
    correctExplanation:
      "You correctly revoked J. Rivera's HR Portal access. IT Support staff are responsible for infrastructure maintenance, helpdesk operations, and system administration — none of which require access to employee HR records. Granting IT Support personnel access to HR data creates an unnecessary data exposure risk and violates separation of duties. HR Portal access should be limited to HR department staff only.",
    incorrectExplanation:
      "You did not revoke J. Rivera's HR Portal access. Rivera is an IT Support technician — their role requires File Server, Email, VPN, and Admin Console access, but NOT access to HR data. Granting infrastructure staff access to sensitive HR records violates the principle of least privilege and separation of duties. This is a critical finding in the access audit.",
  },
  {
    key: "t3_revokedMartinezFinanceDb" as keyof Q4Scores,
    label: "Task 3 — Revoked R. Martinez's (HR Analyst) access to the Finance DB",
    correctExplanation:
      "You correctly revoked R. Martinez's Finance DB access. HR Analysts work exclusively with employee data in the HR Portal — they have no legitimate business need to access financial databases. This access violates separation of duties and could enable insider access to confidential compensation benchmarking, payroll, or financial reporting data that falls outside the HR Analyst's defined job function.",
    incorrectExplanation:
      "You did not revoke R. Martinez's Finance DB access. R. Martinez is an HR Analyst — their role requires HR Portal and File Server access only. Access to the Finance DB is outside the scope of their role definition and violates the principle of least privilege. Excess permissions like this are a common finding in access control audits and represent a material insider threat risk.",
  },
  {
    key: "t4_grantedSinghVpn" as keyof Q4Scores,
    label: "Task 4 — Granted A. Singh (Developer) missing VPN access",
    correctExplanation:
      "You correctly granted VPN access to A. Singh. Developers regularly work from remote locations and require VPN connectivity to securely access development environments, internal repositories, and application servers. The absence of VPN access for a developer is a gap that forces the use of insecure workarounds or prevents legitimate remote work entirely. Granting necessary permissions is as important as revoking excessive ones.",
    incorrectExplanation:
      "You did not grant VPN access to A. Singh. A. Singh is a Developer who requires VPN to securely connect to internal development environments from remote locations. Missing permissions — where a user lacks access they legitimately need — are identified during access audits alongside excess permissions. Both types of finding require remediation to ensure users can perform their required duties securely.",
  },
  {
    key: "t5_submittedAudit" as keyof Q4Scores,
    label: "Task 5 — Submitted the access control audit report",
    correctExplanation:
      "You submitted the audit report. Access control audit submissions create the formal record of identified violations, required changes, and the authorization trail for each permission modification. This documentation satisfies compliance requirements under frameworks such as SOC 2, ISO 27001, and PCI DSS, which mandate periodic access reviews with documented evidence of review and remediation.",
    incorrectExplanation:
      "You did not submit the audit report. After completing the access review — revoking excess permissions and granting missing ones — submitting the formal audit report is mandatory. The report creates the documented evidence required by compliance frameworks (SOC 2, ISO 27001, PCI DSS) to prove that access controls were reviewed, violations were identified, and remediation was authorized and completed.",
  },
];

/* ════════════════════════════ LEFT PANEL ════════════════════════════ */

function LeftPanel4({ open, onClose }: { open: boolean; onClose: () => void }) {
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
            Following the security incidents at Meridian Financial Group — the brute force compromise of the 'hradmin' account and the vulnerability scan results — the CISO has ordered an immediate review of all user access rights across the organization.
          </p>
          <p style={{ fontSize: "12.5px", lineHeight: "1.75", color: "#1e293b", marginBottom: "12px" }}>
            The internal audit team identified five user accounts with potential access control violations. You have been assigned as the security analyst responsible for auditing these accounts and remediating any violations of the principle of least privilege.
          </p>
          <p style={{ fontSize: "12.5px", lineHeight: "1.75", color: "#1e293b" }}>
            Users with excess permissions must have those permissions revoked. Users with missing required permissions must have those permissions granted. M. Nakamura's permissions are correctly configured and require no changes.
          </p>
        </div>
        <div>
          <h2 style={{ fontSize: "11px", fontWeight: 800, letterSpacing: "0.1em", color: "#0A1628", margin: "0 0 12px", borderBottom: "2px solid #F5A623", paddingBottom: "6px", textTransform: "uppercase" }}>Instructions</h2>
          <ol style={{ margin: 0, padding: "0 0 0 18px" }}>
            {[
              "Click each user in the left panel to review their current permissions.",
              "Permissions highlighted in red are excessive — they exceed the minimum required for the user's role and must be revoked.",
              "Permissions highlighted in orange are missing — they are required for the user's role and must be granted.",
              "Click a permission badge to toggle it (grant or revoke). Use the rationale displayed to guide your decisions.",
              "When all violations have been remediated, submit the audit report.",
            ].map((s, i) => <li key={i} style={{ fontSize: "12.5px", lineHeight: "1.7", color: "#1e293b", marginBottom: "10px" }}>{s}</li>)}
          </ol>
          <p style={{ fontSize: "11.5px", fontStyle: "italic", color: "#64748b", marginTop: "16px", lineHeight: "1.6" }}>
            Principle of least privilege: every user should have access to only the resources and permissions explicitly required to perform their defined job function — nothing more.
          </p>
        </div>
      </div>
    </div>
  );
}

/* ════════════════════════════ USER LIST ════════════════════════════ */

function UserList({ users, selected, permissions }: { users: UserProfile[]; selected: UserId | null; onSelect: (id: UserId) => void; permissions: AllPermissions }) {
  return null; // unused stub — inlined below
}

/* ════════════════════════════ PERMISSION PANEL ════════════════════════════ */

function getViolations(userId: UserId, perms: AllPermissions): { excess: Resource[]; missing: Resource[] } {
  const cur = perms[userId];
  const correct = CORRECT_PERMISSIONS[userId];
  const excess: Resource[] = [];
  const missing: Resource[] = [];
  RESOURCES.forEach((r) => {
    if (cur[r] && !correct[r]) excess.push(r);
    if (!cur[r] && correct[r]) missing.push(r);
  });
  return { excess, missing };
}

function totalViolations(perms: AllPermissions): number {
  let count = 0;
  (Object.keys(perms) as UserId[]).forEach((uid) => {
    const v = getViolations(uid, perms);
    count += v.excess.length + v.missing.length;
  });
  return count;
}

/* ════════════════════════════ FINISH TASK LIST ════════════════════════════ */

const Q4_FINISH_TASKS = [
  { key: "t1_viewedAnyUser" as keyof Q4Scores },
  { key: "t2_revokedRiveraAdminConsole" as keyof Q4Scores },
  { key: "t3_revokedMartinezFinanceDb" as keyof Q4Scores },
  { key: "t4_grantedSinghVpn" as keyof Q4Scores },
  { key: "t5_submittedAudit" as keyof Q4Scores },
];

/* ════════════════════════════ RESULTS PANEL ════════════════════════════ */

function ResultsPanel4({ scores, onExit, onNext }: { scores: Q4Scores; onExit: () => void; onNext?: () => void }) {
  const total = Object.values(scores).filter(Boolean).length;
  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 60, backgroundColor: "rgba(0,0,0,0.55)", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ backgroundColor: "white", borderRadius: "12px", boxShadow: "0 24px 60px rgba(0,0,0,0.35)", overflow: "hidden", minWidth: "360px", maxWidth: "480px", width: "100%" }}>
        <div style={{ backgroundColor: "#0A1628", padding: "28px 32px 24px", textAlign: "center" }}>
          <div style={{ width: "64px", height: "64px", borderRadius: "50%", backgroundColor: total >= 4 ? "#2E7D32" : total >= 2 ? "#E65100" : "#C62828", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px", boxShadow: "0 0 0 6px rgba(255,255,255,0.12)" }}>
            {total >= 3 ? <svg width="30" height="30" viewBox="0 0 24 24" fill="none"><polyline points="20,6 9,17 4,12" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" /></svg> : <svg width="28" height="28" viewBox="0 0 24 24" fill="none"><line x1="18" y1="6" x2="6" y2="18" stroke="white" strokeWidth="2.5" strokeLinecap="round" /><line x1="6" y1="6" x2="18" y2="18" stroke="white" strokeWidth="2.5" strokeLinecap="round" /></svg>}
          </div>
          <div style={{ color: "white", fontSize: "24px", fontWeight: 800, letterSpacing: "-0.02em" }}>{total} out of {Q4_TASKS.length} correct</div>
          <div style={{ display: "flex", justifyContent: "center", gap: "6px", marginTop: "14px", flexWrap: "wrap" }}>
            {Q4_TASKS.map((t, i) => {
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

export default function Question4() {
  const [leftPanelOpen, setLeftPanelOpen] = useState(true);
  const [selectedUser, setSelectedUser] = useState<UserId | null>(null);
  const [permissions, setPermissions] = useState<AllPermissions>(INITIAL_PERMISSIONS);
  const [auditSubmitted, setAuditSubmitted] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [finishFeedback, setFinishFeedback] = useState(false);
  const [t1_viewedAnyUser, setT1] = useState(false);

  const scores: Q4Scores = {
    t1_viewedAnyUser,
    t2_revokedRiveraAdminConsole: !permissions.rivera.hr_portal,
    t3_revokedMartinezFinanceDb: !permissions.martinez.finance_db,
    t4_grantedSinghVpn: permissions.singh.vpn,
    t5_submittedAudit: auditSubmitted,
  };

  function togglePermission(userId: UserId, resource: Resource) {
    setPermissions((prev) => ({
      ...prev,
      [userId]: { ...prev[userId], [resource]: !prev[userId][resource] },
    }));
  }

  function handleReset() {
    setPermissions(INITIAL_PERMISSIONS);
    setSelectedUser(null);
    setAuditSubmitted(false);
    setSubmitted(false);
    setFinishFeedback(false);
    setT1(false);
    setLeftPanelOpen(true);
  }

  const violations = selectedUser ? getViolations(selectedUser, permissions) : null;
  const remainingViolations = totalViolations(permissions);

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
          <h1 style={{ fontSize: "20px", fontWeight: 800, color: "#0A1628", margin: "0 0 4px", letterSpacing: "-0.025em" }}>Question 4 — Identity and Access Management Audit</h1>
          <p style={{ fontSize: "12.5px", color: "#64748B", margin: 0 }}>Review user permissions, remediate least-privilege violations, and submit the access control audit.</p>
        </div>
        <button onClick={() => setSubmitted(true)} style={{ backgroundColor: "#0066CC", color: "white", border: "none", borderRadius: "6px", padding: "10px 26px", fontSize: "13.5px", fontWeight: 700, cursor: "pointer", whiteSpace: "nowrap", flexShrink: 0, boxShadow: "0 2px 8px rgba(0,102,204,0.3)", marginTop: "4px" }}>
          Submit
        </button>
      </header>

      {/* ════ MAIN ════ */}
      <div style={{ display: "flex", flex: 1, overflow: "hidden" }}>
        <LeftPanel4 open={leftPanelOpen} onClose={() => setLeftPanelOpen(false)} />

        <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden", minWidth: 0 }}>
          {/* Toolbar */}
          <div style={{ position: "relative", zIndex: 20, padding: "7px 14px", borderBottom: "1px solid #DDDDDD", display: "flex", alignItems: "center", gap: "8px", backgroundColor: "#FAFAFA", flexShrink: 0 }}>
            {[
              { label: "Show Question", action: () => setLeftPanelOpen((v) => !v) },
              { label: "Reset All Answers", action: handleReset },
            ].map((b) => (
              <button key={b.label} onClick={b.action} style={{ display: "flex", alignItems: "center", gap: "6px", backgroundColor: "white", border: "1px solid #DDDDDD", borderRadius: "20px", padding: "5px 13px", fontSize: "12px", fontWeight: 600, color: "#374151", cursor: "pointer" }}>
                {b.label}
              </button>
            ))}
            {remainingViolations > 0 && (
              <span style={{ marginLeft: "8px", backgroundColor: "#FEF2F2", color: "#DC2626", border: "1px solid #FECACA", borderRadius: "12px", padding: "3px 10px", fontSize: "11.5px", fontWeight: 700 }}>
                {remainingViolations} violation{remainingViolations !== 1 ? "s" : ""} remaining
              </span>
            )}
            {remainingViolations === 0 && (
              <span style={{ marginLeft: "8px", backgroundColor: "#F0FDF4", color: "#16A34A", border: "1px solid #BBF7D0", borderRadius: "12px", padding: "3px 10px", fontSize: "11.5px", fontWeight: 700 }}>
                ✓ All violations remediated
              </span>
            )}
            <div style={{ flex: 1 }} />
            <button onClick={() => { window.location.href = "/question3"; }} style={{ display: "flex", alignItems: "center", gap: "5px", backgroundColor: "white", color: "#374151", border: "1px solid #DDDDDD", borderRadius: "20px", padding: "5px 14px", fontSize: "12px", fontWeight: 600, cursor: "pointer" }}>← Previous</button>
            <button onClick={() => { window.location.href = "/question5"; }} style={{ display: "flex", alignItems: "center", gap: "5px", backgroundColor: "#0066CC", color: "white", border: "none", borderRadius: "20px", padding: "5px 14px", fontSize: "12px", fontWeight: 600, cursor: "pointer" }}>Next →</button>
          </div>

          {/* IAM content */}
          <div style={{ flex: 1, overflow: "auto", backgroundColor: "#F1F5F9", padding: "20px", display: "flex", gap: "16px" }}>
            {/* User list */}
            <div style={{ width: "220px", flexShrink: 0, display: "flex", flexDirection: "column", gap: "8px" }}>
              <div style={{ fontSize: "11px", fontWeight: 700, color: "#64748B", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "4px" }}>User Accounts</div>
              {USERS.map((user) => {
                const v = getViolations(user.id, permissions);
                const violationCount = v.excess.length + v.missing.length;
                const isSelected = selectedUser === user.id;
                return (
                  <button
                    key={user.id}
                    onClick={() => { setSelectedUser(user.id); setT1(true); }}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      padding: "10px 12px",
                      backgroundColor: isSelected ? "white" : "#F8FAFC",
                      border: `2px solid ${isSelected ? "#3B82F6" : violationCount > 0 ? "#FECACA" : "#E2E8F0"}`,
                      borderRadius: "8px",
                      cursor: "pointer",
                      textAlign: "left",
                      width: "100%",
                    }}
                  >
                    <div>
                      <div style={{ fontSize: "13px", fontWeight: 700, color: "#0A1628", marginBottom: "2px" }}>{user.name}</div>
                      <div style={{ fontSize: "11px", color: "#64748B" }}>{user.role}</div>
                    </div>
                    {violationCount > 0 ? (
                      <span style={{ backgroundColor: "#FEF2F2", color: "#DC2626", border: "1px solid #FECACA", borderRadius: "10px", padding: "2px 7px", fontSize: "10.5px", fontWeight: 700, flexShrink: 0 }}>{violationCount}</span>
                    ) : (
                      <span style={{ backgroundColor: "#F0FDF4", color: "#16A34A", borderRadius: "10px", padding: "2px 7px", fontSize: "10.5px", fontWeight: 700, flexShrink: 0 }}>✓</span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Permission detail */}
            <div style={{ flex: 1 }}>
              {!selectedUser ? (
                <div style={{ backgroundColor: "white", border: "1px solid #E2E8F0", borderRadius: "8px", padding: "40px", textAlign: "center" }}>
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" style={{ margin: "0 auto 12px", display: "block" }}>
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" stroke="#CBD5E1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <circle cx="12" cy="7" r="4" stroke="#CBD5E1" strokeWidth="2" />
                  </svg>
                  <div style={{ fontSize: "15px", fontWeight: 600, color: "#94A3B8", marginBottom: "6px" }}>Select a user to review permissions</div>
                  <div style={{ fontSize: "13px", color: "#CBD5E1" }}>Click any user in the left panel to see their current access rights and remediate violations.</div>
                </div>
              ) : (
                (() => {
                  const user = USERS.find((u) => u.id === selectedUser)!;
                  const v = violations!;
                  const perms = permissions[selectedUser];
                  const correct = CORRECT_PERMISSIONS[selectedUser];
                  return (
                    <div>
                      {/* User header */}
                      <div style={{ backgroundColor: "white", border: "1px solid #E2E8F0", borderRadius: "8px", padding: "16px 20px", marginBottom: "12px", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "12px" }}>
                        <div>
                          <div style={{ fontSize: "18px", fontWeight: 800, color: "#0A1628" }}>{user.name}</div>
                          <div style={{ fontSize: "13px", color: "#64748B" }}>{user.role} — {user.department}</div>
                        </div>
                        {v.excess.length + v.missing.length === 0 ? (
                          <span style={{ backgroundColor: "#F0FDF4", color: "#16A34A", border: "1px solid #BBF7D0", borderRadius: "8px", padding: "6px 14px", fontSize: "12.5px", fontWeight: 700 }}>✓ No violations</span>
                        ) : (
                          <span style={{ backgroundColor: "#FEF2F2", color: "#DC2626", border: "1px solid #FECACA", borderRadius: "8px", padding: "6px 14px", fontSize: "12.5px", fontWeight: 700 }}>
                            {v.excess.length} excess · {v.missing.length} missing
                          </span>
                        )}
                      </div>

                      {/* Permissions grid */}
                      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "10px" }}>
                        {RESOURCES.map((resource) => {
                          const hasPermission = perms[resource];
                          const needsPermission = correct[resource];
                          const isExcess = hasPermission && !needsPermission;
                          const isMissing = !hasPermission && needsPermission;
                          const isCorrectAndHas = hasPermission && needsPermission;
                          const isCorrectAndLacks = !hasPermission && !needsPermission;
                          const rationale = PERMISSION_RATIONALE[selectedUser]?.[resource];
                          let borderColor = "#E2E8F0";
                          let bgColor = "white";
                          let statusLabel = "";
                          let statusColor = "";
                          if (isExcess)        { borderColor = "#FCA5A5"; bgColor = "#FEF2F2"; statusLabel = "EXCESS — Click to Revoke"; statusColor = "#DC2626"; }
                          if (isMissing)       { borderColor = "#FCD34D"; bgColor = "#FFFBEB"; statusLabel = "MISSING — Click to Grant"; statusColor = "#D97706"; }
                          if (isCorrectAndHas) { borderColor = "#BBF7D0"; bgColor = "#F0FDF4"; statusLabel = "Correctly Granted"; statusColor = "#16A34A"; }
                          return (
                            <div
                              key={resource}
                              onClick={() => { if (isExcess || isMissing) togglePermission(selectedUser, resource); }}
                              style={{
                                backgroundColor: bgColor,
                                border: `2px solid ${borderColor}`,
                                borderRadius: "8px",
                                padding: "12px 14px",
                                cursor: isExcess || isMissing ? "pointer" : "default",
                                transition: "all 0.12s",
                              }}
                              onMouseEnter={(e) => { if (isExcess || isMissing) (e.currentTarget as HTMLDivElement).style.opacity = "0.85"; }}
                              onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.opacity = "1"; }}
                            >
                              <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: rationale ? "6px" : "0" }}>
                                <span style={{ fontSize: "18px" }}>{RESOURCE_LABELS[resource].icon}</span>
                                <div>
                                  <div style={{ fontSize: "13px", fontWeight: 700, color: "#1E293B" }}>{RESOURCE_LABELS[resource].label}</div>
                                  {statusLabel && (
                                    <div style={{ fontSize: "10.5px", fontWeight: 700, color: statusColor, marginTop: "1px" }}>{statusLabel}</div>
                                  )}
                                  {isCorrectAndLacks && (
                                    <div style={{ fontSize: "10.5px", color: "#94A3B8", marginTop: "1px" }}>Not required for this role</div>
                                  )}
                                </div>
                                <div style={{ marginLeft: "auto" }}>
                                  {hasPermission ? (
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" fill={isExcess ? "#DC2626" : "#16A34A"} /><polyline points="8,12 11,15 16,9" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                                  ) : (
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" fill={isMissing ? "#D97706" : "#E2E8F0"} /><line x1="8" y1="12" x2="16" y2="12" stroke="white" strokeWidth="2.5" strokeLinecap="round" /></svg>
                                  )}
                                </div>
                              </div>
                              {rationale && (
                                <div style={{ fontSize: "11.5px", color: isExcess ? "#991B1B" : "#92400E", lineHeight: "1.5", backgroundColor: isExcess ? "#FEE2E2" : "#FEF3C7", borderRadius: "4px", padding: "5px 8px", marginTop: "4px" }}>
                                  {rationale}
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })()
              )}

              {/* Submit audit */}
              <div style={{ marginTop: "16px", backgroundColor: "white", border: "1px solid #E2E8F0", borderRadius: "8px", padding: "14px 16px", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "12px" }}>
                <div>
                  <div style={{ fontSize: "13px", fontWeight: 700, color: "#0A1628", marginBottom: "3px" }}>Access Control Audit Report</div>
                  <div style={{ fontSize: "12px", color: "#64748B" }}>When all violations have been remediated, submit the formal access control audit report.</div>
                </div>
                {auditSubmitted ? (
                  <div style={{ display: "flex", alignItems: "center", gap: "8px", color: "#16A34A", fontSize: "13px", fontWeight: 600 }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" fill="#16A34A" /><polyline points="8,12 11,15 16,9" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                    Audit report submitted
                  </div>
                ) : (
                  <button onClick={() => setAuditSubmitted(true)} style={{ backgroundColor: "#0A1628", color: "white", border: "none", borderRadius: "6px", padding: "9px 22px", fontSize: "13px", fontWeight: 700, cursor: "pointer" }}>
                    Submit Audit Report
                  </button>
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
          {finishFeedback && Q4_FINISH_TASKS.map((t, i) => {
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

      {/* ════ OVERLAYS ════ */}
      {submitted && <ResultsPanel4 scores={scores} onExit={() => { window.location.href = "/"; }} onNext={() => { window.location.href = "/question5"; }} />}
    </div>
  );
}
