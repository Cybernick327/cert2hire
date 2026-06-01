"use client";

import { useState } from "react";

/* ════════════════════════════ TYPES ════════════════════════════ */

type HashAlgorithm = "MD5" | "SHA-1" | "bcrypt";
type HashStatus = "CRACKED" | "NOT_CRACKED";
type HashStrength = "VERY_WEAK" | "WEAK" | "STRONG";

interface HashEntry {
  id: string;
  username: string;
  algorithm: HashAlgorithm;
  hashValue: string;
  strength: HashStrength;
  status: HashStatus;
  crackedPassword?: string;
  note?: string;
}

interface Q5Scores {
  t1_identifiedMd5: boolean;
  t2_countedCompromised: boolean;
  t3_selectedBcrypt: boolean;
  t4_flaggedHradmin: boolean;
  t5_submittedPolicy: boolean;
}

/* ════════════════════════════ HASH DATA ════════════════════════════ */

const HASH_DB: HashEntry[] = [
  {
    id: "h01",
    username: "hradmin",
    algorithm: "MD5",
    hashValue: "5f4dcc3b5aa765d61d8327deb882cf99",
    strength: "VERY_WEAK",
    status: "CRACKED",
    crackedPassword: "password",
    note: "PREVIOUSLY COMPROMISED — brute force attack 2026-06-01 08:47 UTC",
  },
  {
    id: "h02",
    username: "sysadmin",
    algorithm: "MD5",
    hashValue: "e10adc3949ba59abbe56e057f20f883e",
    strength: "VERY_WEAK",
    status: "CRACKED",
    crackedPassword: "123456",
  },
  {
    id: "h03",
    username: "jsmith",
    algorithm: "MD5",
    hashValue: "098f6bcd4621d373cade4e832627b4f6",
    strength: "VERY_WEAK",
    status: "CRACKED",
    crackedPassword: "test",
  },
  {
    id: "h04",
    username: "lpark",
    algorithm: "SHA-1",
    hashValue: "40bd001563085fc35165329ea1ff5c5ecbdbbeef",
    strength: "VERY_WEAK",
    status: "CRACKED",
    crackedPassword: "password",
  },
  {
    id: "h05",
    username: "mkwong",
    algorithm: "MD5",
    hashValue: "827ccb0eea8a706c4c34a16891f84e7b",
    strength: "VERY_WEAK",
    status: "CRACKED",
    crackedPassword: "12345",
  },
  {
    id: "h06",
    username: "rjohnson",
    algorithm: "MD5",
    hashValue: "a8bca5da6e16e3e41c78b38695b90a62",
    strength: "WEAK",
    status: "NOT_CRACKED",
  },
  {
    id: "h07",
    username: "dchen",
    algorithm: "SHA-1",
    hashValue: "7c222fb2927d828af22f592170b42d6ec3b7f9b4",
    strength: "WEAK",
    status: "NOT_CRACKED",
  },
  {
    id: "h08",
    username: "mpark",
    algorithm: "bcrypt",
    hashValue: "$2b$12$LQv3c1yqBWVHxkd0LH/eUetL9h1SXsBnNHiMgbB4Qx3aGUP5n0K6",
    strength: "STRONG",
    status: "NOT_CRACKED",
    note: "New account — uses updated policy",
  },
  {
    id: "h09",
    username: "newuser1",
    algorithm: "bcrypt",
    hashValue: "$2b$14$PtaB3zC8yJqA12bGF9me/uVpAXmq3wFj6lBkNsRuY5XdW7GcI0K8",
    strength: "STRONG",
    status: "NOT_CRACKED",
    note: "New account — uses updated policy",
  },
];

const ALGORITHM_OPTIONS = [
  { value: "",        label: "— Select algorithm —" },
  { value: "MD5",     label: "MD5 (Message Digest 5)" },
  { value: "SHA-1",   label: "SHA-1 (Secure Hash Algorithm 1)" },
  { value: "SHA-256", label: "SHA-256" },
  { value: "SHA-512", label: "SHA-512" },
  { value: "bcrypt",  label: "bcrypt" },
  { value: "Argon2",  label: "Argon2" },
  { value: "scrypt",  label: "scrypt" },
];

const COMPROMISED_COUNT_OPTIONS = ["2", "3", "5", "7", "9"];

/* ════════════════════════════ TASK DEFINITIONS ════════════════════════════ */

const Q5_TASKS = [
  {
    key: "t1_identifiedMd5" as keyof Q5Scores,
    label: "Task 1 — Identified MD5 as the primary insecure hashing algorithm",
    correctExplanation:
      "You correctly identified MD5 as the primary insecure algorithm. MD5 was broken as a cryptographic hash function by 2004 (Wang & Yu collision attacks) and is entirely unsuitable for password storage. Its 128-bit digest is trivially reversible using rainbow tables or GPU-accelerated dictionary attacks. The HASH_DB contains 6 MD5-hashed accounts — 5 of which were already cracked within this breach, including the previously compromised hradmin account.",
    incorrectExplanation:
      "You did not identify MD5 as the primary insecure algorithm. Of the 9 accounts in the database, 6 use MD5, which has been cryptographically broken since 2004. MD5 hashes are reversible in seconds using modern GPU-accelerated cracking tools and rainbow tables. SHA-1 is also insecure for password storage, but MD5 is the primary algorithm in this database and the root cause of 5 of the 5 compromised accounts.",
  },
  {
    key: "t2_countedCompromised" as keyof Q5Scores,
    label: "Task 2 — Correctly identified 5 compromised accounts",
    correctExplanation:
      "You correctly identified 5 compromised accounts. Five credentials were successfully cracked from the database: hradmin (password), sysadmin (123456), jsmith (test), lpark (password), and mkwong (12345). All five used either MD5 or SHA-1 with trivially guessable passwords. The two MD5 accounts that were not cracked (rjohnson, dchen) likely used longer passwords, but their hashes remain permanently at risk from continued cracking attempts.",
    incorrectExplanation:
      "You did not correctly identify the number of compromised accounts. Review the CRACKED entries in the hash table — exactly 5 accounts were successfully reversed by the attacker: hradmin, sysadmin, jsmith, lpark, and mkwong. The 2 bcrypt accounts (mpark, newuser1) and 2 uncracked MD5/SHA-1 accounts (rjohnson, dchen) remain unconfirmed, but the 5 cracked accounts represent definite credential compromise.",
  },
  {
    key: "t3_selectedBcrypt" as keyof Q5Scores,
    label: "Task 3 — Selected bcrypt as the recommended password hashing algorithm",
    correctExplanation:
      "You correctly recommended bcrypt. Unlike MD5 and SHA-256, bcrypt is intentionally slow and computationally expensive due to its work factor (cost parameter). This means that even with modern GPU hardware, bcrypt significantly limits the rate of brute force and dictionary attacks. bcrypt also uses a per-password salt automatically, preventing rainbow table attacks. Argon2 and scrypt are also acceptable modern choices, but bcrypt is the most widely tested and is the standard answer on Security+ examinations.",
    incorrectExplanation:
      "You did not select bcrypt (or an equivalent adaptive hashing function). MD5, SHA-1, SHA-256, and SHA-512 are general-purpose cryptographic hash functions designed to be fast — making them unsuitable for password storage. bcrypt (and alternatives Argon2, scrypt) are designed specifically for password hashing: they are computationally slow, use an adjustable work factor, and automatically salt each hash. The Security+ exam expects bcrypt as the recommended password hashing algorithm.",
  },
  {
    key: "t4_flaggedHradmin" as keyof Q5Scores,
    label: "Task 4 — Flagged hradmin as the highest-risk compromised account",
    correctExplanation:
      "You correctly flagged hradmin as the highest-risk compromised account. The hradmin account was the direct target of a successful brute force attack on 2026-06-01 (documented in the SIEM incident), used the trivially weak password 'password', and provides administrative access to the HR Portal containing sensitive employee records. Among the 5 cracked accounts, hradmin carries the highest risk due to its privileged access level and its already-confirmed active exploitation.",
    incorrectExplanation:
      "You did not flag hradmin as the highest-risk account. While all 5 cracked accounts require immediate password resets, hradmin is the most critical: it was actively exploited in a confirmed brute force attack on 2026-06-01, it holds administrative privileges on the HR Portal (sensitive employee data), and its password was 'password' — the most common password in existence. Highest-risk accounts are prioritized by: (1) confirmed active exploitation, (2) privilege level, (3) data sensitivity.",
  },
  {
    key: "t5_submittedPolicy" as keyof Q5Scores,
    label: "Task 5 — Submitted the password policy recommendation",
    correctExplanation:
      "You submitted the password policy recommendation. The formal policy document triggers the remediation workflow: immediate forced password resets for all 5 compromised accounts, migration of all legacy MD5/SHA-1 hashes to bcrypt on next login, and enforcement of a minimum password complexity and length requirement. Without a formal policy submission, the organization remains exposed to further credential-based attacks.",
    incorrectExplanation:
      "You did not submit the password policy recommendation. After identifying compromised accounts and selecting the correct hashing algorithm, submitting the formal policy recommendation is the required final step. The policy triggers mandatory password resets for all compromised accounts, migration of legacy hashes to bcrypt, and enforcement of complexity requirements — closing the vulnerability that led to the breach.",
  },
];

/* ════════════════════════════ LEFT PANEL ════════════════════════════ */

function LeftPanel5({ open, onClose }: { open: boolean; onClose: () => void }) {
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
            Post-breach forensic analysis of the Meridian Financial Group incident has revealed that the attacker gained access to the organization's credential database after compromising the HR Portal server. The database contains hashed passwords for all internal application accounts.
          </p>
          <p style={{ fontSize: "12.5px", lineHeight: "1.75", color: "#1e293b", marginBottom: "12px" }}>
            The attacker successfully cracked several password hashes using offline dictionary attacks. The security team has retrieved the hash database for analysis. Note that the hradmin account — the account confirmed compromised in the SIEM investigation — appears in this database.
          </p>
          <p style={{ fontSize: "12.5px", lineHeight: "1.75", color: "#1e293b" }}>
            You must assess the scope of credential compromise, identify the insecure hashing algorithms in use, and recommend a secure password policy for immediate implementation.
          </p>
        </div>
        <div>
          <h2 style={{ fontSize: "11px", fontWeight: 800, letterSpacing: "0.1em", color: "#0A1628", margin: "0 0 12px", borderBottom: "2px solid #F5A623", paddingBottom: "6px", textTransform: "uppercase" }}>Instructions</h2>
          <ol style={{ margin: 0, padding: "0 0 0 18px" }}>
            {[
              "Review the hash database. Identify which hashing algorithm is most widely used and most insecure across the database.",
              "Count how many accounts have confirmed cracked (compromised) passwords.",
              "In the Algorithm Summary panel, select MD5 as the primary insecure algorithm to confirm your finding.",
              "Flag the highest-risk compromised account using the Flag button in the hash table.",
              "Complete the Password Policy Recommendation form — select the correct modern hashing algorithm and confirm the compromised account count. Click Submit Policy.",
            ].map((s, i) => <li key={i} style={{ fontSize: "12.5px", lineHeight: "1.7", color: "#1e293b", marginBottom: "10px" }}>{s}</li>)}
          </ol>
          <p style={{ fontSize: "11.5px", fontStyle: "italic", color: "#64748b", marginTop: "16px", lineHeight: "1.6" }}>
            MD5 and SHA-1 are cryptographically broken for password storage. Bcrypt, Argon2, and scrypt are purpose-built adaptive hashing functions designed for passwords.
          </p>
        </div>
      </div>
    </div>
  );
}

/* ════════════════════════════ HASH TABLE ════════════════════════════ */

const STRENGTH_STYLE: Record<HashStrength, { bg: string; text: string; label: string }> = {
  VERY_WEAK: { bg: "#FEF2F2", text: "#DC2626", label: "Very Weak" },
  WEAK:      { bg: "#FFF7ED", text: "#C2410C", label: "Weak" },
  STRONG:    { bg: "#F0FDF4", text: "#15803D", label: "Strong" },
};

const ALGO_STYLE: Record<HashAlgorithm, { bg: string; text: string }> = {
  "MD5":    { bg: "#FEF2F2", text: "#DC2626" },
  "SHA-1":  { bg: "#FFF7ED", text: "#C2410C" },
  "bcrypt": { bg: "#F0FDF4", text: "#15803D" },
};

function HashTable({ flaggedId, onFlag, identifiedAlgo, onIdentifyAlgo }: {
  flaggedId: string;
  onFlag: (id: string) => void;
  identifiedAlgo: string;
  onIdentifyAlgo: (algo: string) => void;
}) {
  return (
    <div style={{ border: "1px solid #2A3A50", borderRadius: "8px", overflow: "hidden" }}>
      {/* Table header */}
      <div style={{ display: "grid", gridTemplateColumns: "100px 80px 1fr 80px 160px 90px", backgroundColor: "#0D1B2A", borderBottom: "1px solid #2A3A50", padding: "9px 14px", gap: "0" }}>
        {["Username", "Algorithm", "Hash Value", "Strength", "Status", "Action"].map((h) => (
          <div key={h} style={{ fontSize: "10px", fontWeight: 700, color: "#6B8099", letterSpacing: "0.07em", textTransform: "uppercase" }}>{h}</div>
        ))}
      </div>

      {HASH_DB.map((entry, idx) => {
        const isCracked = entry.status === "CRACKED";
        const isFlagged = flaggedId === entry.id;
        const algoSt = ALGO_STYLE[entry.algorithm];
        const strengthSt = STRENGTH_STYLE[entry.strength];
        const rowBg = isCracked ? "rgba(220,38,38,0.07)" : entry.algorithm === "bcrypt" ? "rgba(22,163,74,0.05)" : "transparent";

        return (
          <div
            key={entry.id}
            style={{ display: "grid", gridTemplateColumns: "100px 80px 1fr 80px 160px 90px", padding: "10px 14px", borderBottom: idx < HASH_DB.length - 1 ? "1px solid #1E2E40" : "none", backgroundColor: isFlagged ? "rgba(220,38,38,0.12)" : rowBg, alignItems: "start", gap: "0" }}
          >
            <div>
              <span style={{ fontFamily: "ui-monospace, monospace", fontSize: "12px", color: "#C8D8E8", fontWeight: 600 }}>
                {entry.username}
                {isFlagged && <span style={{ marginLeft: "5px" }}>🚩</span>}
              </span>
              {entry.note && (
                <div style={{ fontSize: "9.5px", color: isCracked ? "#F87171" : "#6B8099", marginTop: "2px", lineHeight: "1.3" }}>{entry.note}</div>
              )}
            </div>
            <div>
              <span
                style={{ display: "inline-block", backgroundColor: algoSt.bg + "33", color: algoSt.text, border: `1px solid ${algoSt.text}55`, borderRadius: "4px", padding: "2px 7px", fontSize: "10.5px", fontWeight: 700, fontFamily: "ui-monospace, monospace", cursor: entry.algorithm === "MD5" ? "pointer" : "default" }}
                onClick={() => { if (entry.algorithm === "MD5") onIdentifyAlgo("MD5"); }}
                title={entry.algorithm === "MD5" ? "Click to flag MD5 as insecure" : undefined}
              >
                {entry.algorithm}
              </span>
            </div>
            <div style={{ overflow: "hidden" }}>
              <span style={{ fontFamily: "ui-monospace, monospace", fontSize: "10px", color: "#6B8099", wordBreak: "break-all" }}>{entry.hashValue}</span>
            </div>
            <div>
              <span style={{ display: "inline-block", backgroundColor: strengthSt.bg + "33", color: strengthSt.text, borderRadius: "4px", padding: "2px 6px", fontSize: "10.5px", fontWeight: 600 }}>
                {strengthSt.label}
              </span>
            </div>
            <div>
              {isCracked ? (
                <div>
                  <span style={{ backgroundColor: "#7F1D1D", color: "#FCA5A5", border: "1px solid #F87171", borderRadius: "4px", padding: "2px 7px", fontSize: "10.5px", fontWeight: 700 }}>CRACKED</span>
                  <div style={{ fontFamily: "ui-monospace, monospace", fontSize: "10px", color: "#F87171", marginTop: "3px" }}>→ &quot;{entry.crackedPassword}&quot;</div>
                </div>
              ) : (
                <span style={{ backgroundColor: "#14532D33", color: "#86EFAC", border: "1px solid #16A34A55", borderRadius: "4px", padding: "2px 7px", fontSize: "10.5px", fontWeight: 600 }}>Not cracked</span>
              )}
            </div>
            <div>
              {isCracked && (
                <button
                  onClick={() => onFlag(entry.id)}
                  style={{ backgroundColor: isFlagged ? "#7F1D1D" : "#1D3A5C", color: isFlagged ? "#FCA5A5" : "#93C5FD", border: `1px solid ${isFlagged ? "#F87171" : "#3B82F6"}`, borderRadius: "4px", padding: "3px 8px", fontSize: "10.5px", fontWeight: 600, cursor: "pointer", whiteSpace: "nowrap" }}
                >
                  {isFlagged ? "Flagged ✓" : "Flag Risk"}
                </button>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

/* ════════════════════════════ ALGORITHM SUMMARY ════════════════════════════ */

function AlgoSummary({ identifiedAlgo, onIdentify }: { identifiedAlgo: string; onIdentify: (algo: string) => void }) {
  const counts: Record<string, number> = {};
  HASH_DB.forEach((e) => { counts[e.algorithm] = (counts[e.algorithm] || 0) + 1; });
  const entries = Object.entries(counts).sort((a, b) => b[1] - a[1]);

  return (
    <div style={{ backgroundColor: "#1A2638", border: "1px solid #2A3A50", borderRadius: "8px", overflow: "hidden" }}>
      <div style={{ backgroundColor: "#0D1B2A", padding: "10px 14px", borderBottom: "1px solid #2A3A50" }}>
        <span style={{ color: "#8CA0B8", fontSize: "11px", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase" }}>Algorithm Distribution</span>
      </div>
      <div style={{ padding: "12px 14px", display: "flex", gap: "10px", flexWrap: "wrap" }}>
        {entries.map(([algo, count]) => {
          const isInsecure = algo === "MD5" || algo === "SHA-1";
          const isSelected = identifiedAlgo === algo;
          const algoSt = ALGO_STYLE[algo as HashAlgorithm] ?? { bg: "#1A2638", text: "#8CA0B8" };
          return (
            <div
              key={algo}
              onClick={() => { if (isInsecure) onIdentify(algo); }}
              style={{ display: "flex", alignItems: "center", gap: "10px", backgroundColor: isSelected ? "#1D3050" : "#0D1B2A", border: `2px solid ${isSelected ? "#F5A623" : isInsecure ? "#F8717155" : "#2A3A50"}`, borderRadius: "8px", padding: "10px 14px", cursor: isInsecure ? "pointer" : "default", flex: "1", minWidth: "140px" }}
            >
              <span style={{ fontFamily: "ui-monospace, monospace", fontSize: "22px", fontWeight: 800, color: isInsecure ? "#F87171" : "#86EFAC" }}>{count}</span>
              <div>
                <div style={{ fontFamily: "ui-monospace, monospace", fontSize: "13px", fontWeight: 700, color: isInsecure ? "#F87171" : "#86EFAC" }}>{algo}</div>
                <div style={{ fontSize: "10.5px", color: isInsecure ? "#F87171" : "#6B8099", marginTop: "1px" }}>
                  {isInsecure ? (isSelected ? "✓ Flagged as insecure" : "Click to flag as insecure") : "Secure (adaptive)"}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ════════════════════════════ POLICY FORM ════════════════════════════ */

function PolicyForm({ recommendedAlgo, setRecommendedAlgo, compromisedCount, setCompromisedCount, submitted, onSubmit }: {
  recommendedAlgo: string;
  setRecommendedAlgo: (v: string) => void;
  compromisedCount: string;
  setCompromisedCount: (v: string) => void;
  submitted: boolean;
  onSubmit: () => void;
}) {
  const inputBase: React.CSSProperties = {
    backgroundColor: "#0D1B2A", border: "1px solid #2A3A50", borderRadius: "5px", color: "#C8D8E8",
    padding: "7px 10px", fontSize: "12.5px", fontFamily: "ui-monospace, 'Courier New', monospace",
    outline: "none", width: "100%", boxSizing: "border-box", opacity: submitted ? 0.6 : 1,
  };

  return (
    <div style={{ backgroundColor: "#1A2638", border: "1px solid #2A3A50", borderRadius: "8px", overflow: "hidden" }}>
      <div style={{ backgroundColor: "#0D1B2A", padding: "10px 14px", borderBottom: "1px solid #2A3A50", display: "flex", alignItems: "center", gap: "10px" }}>
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" stroke="#F5A623" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /><polyline points="14,2 14,8 20,8" stroke="#F5A623" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /><line x1="16" y1="13" x2="8" y2="13" stroke="#F5A623" strokeWidth="1.8" strokeLinecap="round" /><line x1="16" y1="17" x2="8" y2="17" stroke="#F5A623" strokeWidth="1.8" strokeLinecap="round" /></svg>
        <span style={{ color: "#F5A623", fontSize: "12px", fontWeight: 700, letterSpacing: "0.07em", textTransform: "uppercase" }}>Password Policy Recommendation</span>
        {submitted && <span style={{ backgroundColor: "#14532D", color: "#86EFAC", borderRadius: "12px", padding: "2px 10px", fontSize: "10.5px", fontWeight: 700 }}>✓ Submitted</span>}
      </div>
      <div style={{ padding: "16px 14px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "14px" }}>
          <div>
            <label style={{ display: "block", fontSize: "10px", fontWeight: 700, color: "#6B8099", letterSpacing: "0.07em", textTransform: "uppercase", marginBottom: "5px" }}>
              Recommended Hashing Algorithm
            </label>
            <select value={recommendedAlgo} onChange={(e) => setRecommendedAlgo(e.target.value)} disabled={submitted} style={{ ...inputBase, cursor: submitted ? "default" : "pointer" }}>
              {ALGORITHM_OPTIONS.map((o) => (
                <option key={o.value} value={o.value} style={{ backgroundColor: "#0D1B2A", color: "#C8D8E8" }}>{o.label}</option>
              ))}
            </select>
            <p style={{ fontSize: "10.5px", color: "#4A6278", marginTop: "4px" }}>
              Select an algorithm designed specifically for password hashing
            </p>
          </div>
          <div>
            <label style={{ display: "block", fontSize: "10px", fontWeight: 700, color: "#6B8099", letterSpacing: "0.07em", textTransform: "uppercase", marginBottom: "5px" }}>
              Number of Compromised Accounts
            </label>
            <select value={compromisedCount} onChange={(e) => setCompromisedCount(e.target.value)} disabled={submitted} style={{ ...inputBase, cursor: submitted ? "default" : "pointer" }}>
              <option value="" style={{ backgroundColor: "#0D1B2A" }}>— Select count —</option>
              {COMPROMISED_COUNT_OPTIONS.map((o) => (
                <option key={o} value={o} style={{ backgroundColor: "#0D1B2A", color: "#C8D8E8" }}>{o} accounts</option>
              ))}
            </select>
            <p style={{ fontSize: "10.5px", color: "#4A6278", marginTop: "4px" }}>
              Count the CRACKED entries in the hash database above
            </p>
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          {submitted ? (
            <div style={{ display: "flex", alignItems: "center", gap: "8px", color: "#86EFAC", fontSize: "13px", fontWeight: 600 }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" fill="#16A34A" /><polyline points="8,12 11,15 16,9" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
              Policy recommendation submitted
            </div>
          ) : (
            <button onClick={onSubmit} style={{ backgroundColor: "#F5A623", color: "#0A1628", border: "none", borderRadius: "6px", padding: "9px 22px", fontSize: "13px", fontWeight: 700, cursor: "pointer" }}>
              Submit Policy
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

/* ════════════════════════════ FINISH TASK LIST ════════════════════════════ */

const Q5_FINISH_TASKS = [
  { key: "t1_identifiedMd5" as keyof Q5Scores },
  { key: "t2_countedCompromised" as keyof Q5Scores },
  { key: "t3_selectedBcrypt" as keyof Q5Scores },
  { key: "t4_flaggedHradmin" as keyof Q5Scores },
  { key: "t5_submittedPolicy" as keyof Q5Scores },
];

/* ════════════════════════════ RESULTS PANEL ════════════════════════════ */

function ResultsPanel5({ scores, onExit, onNext }: { scores: Q5Scores; onExit: () => void; onNext?: () => void }) {
  const total = Object.values(scores).filter(Boolean).length;
  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 60, backgroundColor: "rgba(0,0,0,0.55)", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ backgroundColor: "white", borderRadius: "12px", boxShadow: "0 24px 60px rgba(0,0,0,0.35)", overflow: "hidden", minWidth: "360px", maxWidth: "480px", width: "100%" }}>
        <div style={{ backgroundColor: "#0A1628", padding: "28px 32px 24px", textAlign: "center" }}>
          <div style={{ width: "64px", height: "64px", borderRadius: "50%", backgroundColor: total >= 4 ? "#2E7D32" : total >= 2 ? "#E65100" : "#C62828", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px", boxShadow: "0 0 0 6px rgba(255,255,255,0.12)" }}>
            {total >= 3 ? <svg width="30" height="30" viewBox="0 0 24 24" fill="none"><polyline points="20,6 9,17 4,12" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" /></svg> : <svg width="28" height="28" viewBox="0 0 24 24" fill="none"><line x1="18" y1="6" x2="6" y2="18" stroke="white" strokeWidth="2.5" strokeLinecap="round" /><line x1="6" y1="6" x2="18" y2="18" stroke="white" strokeWidth="2.5" strokeLinecap="round" /></svg>}
          </div>
          <div style={{ color: "white", fontSize: "24px", fontWeight: 800, letterSpacing: "-0.02em" }}>{total} out of {Q5_TASKS.length} correct</div>
          <div style={{ display: "flex", justifyContent: "center", gap: "6px", marginTop: "14px", flexWrap: "wrap" }}>
            {Q5_TASKS.map((t, i) => {
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

export default function Question5() {
  const [leftPanelOpen, setLeftPanelOpen] = useState(true);
  const [flaggedId, setFlaggedId] = useState("");
  const [identifiedAlgo, setIdentifiedAlgo] = useState("");
  const [recommendedAlgo, setRecommendedAlgo] = useState("");
  const [compromisedCount, setCompromisedCount] = useState("");
  const [policySubmitted, setPolicySubmitted] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [finishFeedback, setFinishFeedback] = useState(false);

  const scores: Q5Scores = {
    t1_identifiedMd5: identifiedAlgo === "MD5",
    t2_countedCompromised: compromisedCount === "5",
    t3_selectedBcrypt: recommendedAlgo === "bcrypt",
    t4_flaggedHradmin: flaggedId === "h01",
    t5_submittedPolicy: policySubmitted,
  };

  function handleReset() {
    setFlaggedId("");
    setIdentifiedAlgo("");
    setRecommendedAlgo("");
    setCompromisedCount("");
    setPolicySubmitted(false);
    setSubmitted(false);
    setFinishFeedback(false);
    setLeftPanelOpen(true);
  }

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
          <h1 style={{ fontSize: "20px", fontWeight: 800, color: "#0A1628", margin: "0 0 4px", letterSpacing: "-0.025em" }}>Question 5 — Password Security and Credential Breach Analysis</h1>
          <p style={{ fontSize: "12.5px", color: "#64748B", margin: 0 }}>Analyze the credential database, identify compromised accounts, and recommend a secure password policy.</p>
        </div>
        <button onClick={() => setSubmitted(true)} style={{ backgroundColor: "#0066CC", color: "white", border: "none", borderRadius: "6px", padding: "10px 26px", fontSize: "13.5px", fontWeight: 700, cursor: "pointer", whiteSpace: "nowrap", flexShrink: 0, boxShadow: "0 2px 8px rgba(0,102,204,0.3)", marginTop: "4px" }}>
          Submit
        </button>
      </header>

      {/* ════ MAIN ════ */}
      <div style={{ display: "flex", flex: 1, overflow: "hidden" }}>
        <LeftPanel5 open={leftPanelOpen} onClose={() => setLeftPanelOpen(false)} />

        <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden", minWidth: 0 }}>
          {/* Toolbar */}
          <div style={{ position: "relative", zIndex: 20, padding: "7px 14px", borderBottom: "1px solid #DDDDDD", display: "flex", alignItems: "center", gap: "8px", backgroundColor: "#FAFAFA", flexShrink: 0 }}>
            {[{ label: "Show Question", action: () => setLeftPanelOpen((v) => !v) }, { label: "Reset All Answers", action: handleReset }].map((b) => (
              <button key={b.label} onClick={b.action} style={{ display: "flex", alignItems: "center", gap: "6px", backgroundColor: "white", border: "1px solid #DDDDDD", borderRadius: "20px", padding: "5px 13px", fontSize: "12px", fontWeight: 600, color: "#374151", cursor: "pointer" }}>
                {b.label}
              </button>
            ))}
            <div style={{ flex: 1 }} />
            <button onClick={() => { window.location.href = "/question4"; }} style={{ display: "flex", alignItems: "center", gap: "5px", backgroundColor: "white", color: "#374151", border: "1px solid #DDDDDD", borderRadius: "20px", padding: "5px 14px", fontSize: "12px", fontWeight: 600, cursor: "pointer" }}>← Previous</button>
            <button onClick={() => { window.location.href = "/question6"; }} style={{ display: "flex", alignItems: "center", gap: "5px", backgroundColor: "#0066CC", color: "white", border: "none", borderRadius: "20px", padding: "5px 14px", fontSize: "12px", fontWeight: 600, cursor: "pointer" }}>Next →</button>
          </div>

          {/* Forensic content area — dark theme */}
          <div style={{ flex: 1, overflow: "auto", backgroundColor: "#0F1923", padding: "16px" }}>
            {/* Dark header */}
            <div style={{ backgroundColor: "#161B22", border: "1px solid #2A3A50", borderRadius: "8px", padding: "10px 16px", marginBottom: "14px", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "8px" }}>
              <div>
                <span style={{ color: "#F5A623", fontWeight: 800, fontSize: "13px", letterSpacing: "0.05em" }}>CREDENTIAL DATABASE FORENSIC ANALYSIS</span>
                <span style={{ color: "#4A6278", margin: "0 8px", fontSize: "12px" }}>·</span>
                <span style={{ color: "#6B8099", fontSize: "11.5px" }}>Meridian Financial Group — HR Portal auth.db — Retrieved 2026-06-02</span>
              </div>
              <div style={{ display: "flex", gap: "8px" }}>
                <span style={{ backgroundColor: "#7F1D1D33", color: "#F87171", border: "1px solid #F8717155", borderRadius: "12px", padding: "2px 9px", fontSize: "10.5px", fontWeight: 700 }}>5 CRACKED</span>
                <span style={{ backgroundColor: "#14532D33", color: "#86EFAC", border: "1px solid #86EFAC55", borderRadius: "12px", padding: "2px 9px", fontSize: "10.5px", fontWeight: 700 }}>4 SECURE</span>
              </div>
            </div>

            {/* Hash table */}
            <div style={{ marginBottom: "14px" }}>
              <HashTable flaggedId={flaggedId} onFlag={setFlaggedId} identifiedAlgo={identifiedAlgo} onIdentifyAlgo={setIdentifiedAlgo} />
            </div>

            {/* Algorithm summary */}
            <div style={{ marginBottom: "14px" }}>
              <AlgoSummary identifiedAlgo={identifiedAlgo} onIdentify={setIdentifiedAlgo} />
            </div>

            {/* Policy form */}
            <PolicyForm
              recommendedAlgo={recommendedAlgo}
              setRecommendedAlgo={setRecommendedAlgo}
              compromisedCount={compromisedCount}
              setCompromisedCount={setCompromisedCount}
              submitted={policySubmitted}
              onSubmit={() => setPolicySubmitted(true)}
            />
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
          {finishFeedback && Q5_FINISH_TASKS.map((t, i) => {
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
      {submitted && <ResultsPanel5 scores={scores} onExit={() => { window.location.href = "/"; }} onNext={() => { window.location.href = "/question6"; }} />}
    </div>
  );
}
