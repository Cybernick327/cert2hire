"use client";

import { useState } from "react";

interface Scores {
  t1_ranIpconfig: boolean;
  t2_ranPingExternal: boolean;
  t3_openedWS1: boolean;
  t4_openedRouterACL: boolean;
  t5_fixedRule2: boolean;
}

interface ResultsPanelProps {
  scores: Scores;
  onExit: () => void;
}

const TASKS = [
  {
    key: "t1_ranIpconfig" as keyof Scores,
    label: "Task 1 — Ran ipconfig or ipconfig /all in a workstation terminal",
    correctExplanation:
      "You ran ipconfig (or ipconfig /all) on a workstation, confirming its IP address, subnet mask, and default gateway. This is the required first diagnostic step — knowing the IP address maps the workstation to its ACL-matched subnet and tells you exactly which rules on the router apply to its traffic.",
    incorrectExplanation:
      "You did not run ipconfig or ipconfig /all on either workstation terminal. This command is the required first diagnostic step. Without confirming IP addressing, you cannot map the workstation to its subnet or correctly determine which ACL rules govern its traffic. No other command satisfies this task.",
  },
  {
    key: "t2_ranPingExternal" as keyof Scores,
    label: "Task 2 — Tested reachability of a known external address using ping or tracert",
    correctExplanation:
      "You used ping or tracert to test reachability of a known external address (203.0.113.1 or certificationbody.org). These are the only external addresses identified within this simulation — the router's eth3 interface at 203.0.113.1 and the site Mr. Chen reported he cannot access. Running this test confirms that the failure is outbound from the workstation, pointing squarely at an ACL or routing rule.",
    incorrectExplanation:
      "You did not run ping or tracert against either of the external addresses available in this simulation: 203.0.113.1 (the router's external interface, visible in the Interfaces tab) or certificationbody.org (the site reported as unreachable in the scenario). Only these two addresses count for this task because they are the only external addresses a student can discover from information provided within the simulation.",
  },
  {
    key: "t3_openedWS1" as keyof Scores,
    label: "Task 3 — Confirmed Workstation 1 (192.168.0.65) as Mr. Chen's affected machine",
    correctExplanation:
      "You opened Workstation 1's terminal and ran ipconfig, confirming the IP address 192.168.0.65 — the machine assigned to Mr. David Chen. Positively identifying the affected host by its IP address is essential before any upstream investigation. Running ipconfig on Workstation 1 specifically is the only action that satisfies this task.",
    incorrectExplanation:
      "You did not open Workstation 1's terminal and run ipconfig to confirm IP 192.168.0.65. The scenario identifies Mr. David Chen as the affected user. His workstation is Workstation 1 at 192.168.0.65. Opening only Workstation 2 does not satisfy this task. You must open Workstation 1 and run ipconfig to positively confirm the affected host identity.",
  },
  {
    key: "t4_openedRouterACL" as keyof Scores,
    label: "Task 4 — Opened the Access Control List tab on the router",
    correctExplanation:
      "You clicked the Access Control List tab inside the Router modal, directly examining the rule set that governs all traffic through the perimeter router. The scenario states that IT Director Whitfield suspects an ACL misconfiguration from the recent DMZ implementation. Navigating to the ACL tab is the required step to identify the offending rule.",
    incorrectExplanation:
      "You did not open the Access Control List tab on the router. Opening the Router modal and viewing the Interfaces tab alone does not satisfy this task — the Interfaces tab shows interface addressing only. You must click the Access Control List tab to review the rule set, because the bug exists there, not in the interface configuration.",
  },
  {
    key: "t5_fixedRule2" as keyof Scores,
    label: "Task 5 — Corrected Rule 2 (the rule blocking HTTPS from the executive subnet)",
    correctExplanation:
      "You identified and corrected Rule 2: source 192.168.0.64/27 → destination ANY → protocol TCP → port 443 → action Deny. This rule explicitly blocks all HTTPS (TCP 443) traffic from the executive floor subnet, which includes Mr. Chen's workstation at 192.168.0.65. You changed the action to Accept, or deleted the rule entirely. Either action is correct — Rule 9 already provides a catch-all Accept for the executive subnet, but Rule 2 was evaluated first and overrode it for TCP 443 specifically.",
    incorrectExplanation:
      "You did not correct Rule 2 (source 192.168.0.64/27 → destination ANY → TCP → port 443 → Deny). This is the sole rule causing the reported issue. Modifying any other rule does not fix the problem. Rule 2 is matched before Rule 9's catch-all Accept because ACLs are evaluated top-down and the first match wins. The correct remediation is to change Rule 2's action to Accept, or to delete Rule 2 entirely.",
  },
];

function TaskRow({ task, correct }: { task: (typeof TASKS)[0]; correct: boolean }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "flex-start",
        gap: "12px",
        padding: "14px 0",
        borderBottom: "1px solid #E5E7EB",
      }}
    >
      {/* Icon */}
      <div style={{ flexShrink: 0, marginTop: "1px" }}>
        {correct ? (
          <div
            style={{
              width: "24px",
              height: "24px",
              borderRadius: "50%",
              backgroundColor: "#2E7D32",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
              <polyline
                points="20,6 9,17 4,12"
                stroke="white"
                strokeWidth="2.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        ) : (
          <div
            style={{
              width: "24px",
              height: "24px",
              borderRadius: "50%",
              backgroundColor: "#C62828",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
              <line
                x1="18"
                y1="6"
                x2="6"
                y2="18"
                stroke="white"
                strokeWidth="2.8"
                strokeLinecap="round"
              />
              <line
                x1="6"
                y1="6"
                x2="18"
                y2="18"
                stroke="white"
                strokeWidth="2.8"
                strokeLinecap="round"
              />
            </svg>
          </div>
        )}
      </div>

      {/* Content */}
      <div style={{ flex: 1 }}>
        <div
          style={{
            fontSize: "13.5px",
            fontWeight: 700,
            color: correct ? "#2E7D32" : "#C62828",
            marginBottom: "6px",
          }}
        >
          {task.label}
        </div>
        <div
          style={{
            fontSize: "13px",
            lineHeight: "1.65",
            color: "#374151",
          }}
        >
          {correct ? task.correctExplanation : task.incorrectExplanation}
        </div>
      </div>
    </div>
  );
}

export default function ResultsPanel({ scores, onExit }: ResultsPanelProps) {
  const [showDetails, setShowDetails] = useState(true);
  const total = Object.values(scores).filter(Boolean).length;
  const outOf = TASKS.length;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 60,
        backgroundColor: "rgba(0,0,0,0.6)",
        backdropFilter: "blur(3px)",
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "center",
        overflowY: "auto",
        padding: "40px 20px 60px",
      }}
    >
      <div
        style={{
          backgroundColor: "white",
          borderRadius: "12px",
          width: "100%",
          maxWidth: "720px",
          boxShadow: "0 32px 80px rgba(0,0,0,0.4)",
          overflow: "hidden",
        }}
      >
        {/* Header band */}
        <div
          style={{
            backgroundColor: "#0A1628",
            padding: "28px 32px 24px",
            textAlign: "center",
          }}
        >
          {/* Large checkmark / X based on score */}
          <div
            style={{
              width: "72px",
              height: "72px",
              borderRadius: "50%",
              backgroundColor: total >= 4 ? "#2E7D32" : total >= 2 ? "#E65100" : "#C62828",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 18px",
              boxShadow: "0 0 0 8px rgba(255,255,255,0.12)",
            }}
          >
            {total >= 3 ? (
              <svg width="34" height="34" viewBox="0 0 24 24" fill="none">
                <polyline
                  points="20,6 9,17 4,12"
                  stroke="white"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            ) : (
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                <line x1="18" y1="6" x2="6" y2="18" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
                <line x1="6" y1="6" x2="18" y2="18" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
              </svg>
            )}
          </div>

          <div
            style={{
              color: "white",
              fontSize: "26px",
              fontWeight: 800,
              letterSpacing: "-0.02em",
            }}
          >
            You got {total} out of {outOf} correct
          </div>

          {/* Task tracker pills */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "8px",
              marginTop: "16px",
              flexWrap: "wrap",
            }}
          >
            {TASKS.map((t, i) => {
              const ok = scores[t.key];
              return (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "5px",
                    backgroundColor: ok
                      ? "rgba(46,125,50,0.3)"
                      : "rgba(198,40,40,0.3)",
                    borderRadius: "20px",
                    padding: "4px 10px 4px 7px",
                    fontSize: "11.5px",
                    color: ok ? "#A5D6A7" : "#FFCDD2",
                    fontWeight: 600,
                  }}
                >
                  {ok ? (
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                      <polyline points="20,6 9,17 4,12" stroke="#A5D6A7" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  ) : (
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none">
                      <line x1="18" y1="6" x2="6" y2="18" stroke="#FFCDD2" strokeWidth="2.8" strokeLinecap="round" />
                      <line x1="6" y1="6" x2="18" y2="18" stroke="#FFCDD2" strokeWidth="2.8" strokeLinecap="round" />
                    </svg>
                  )}
                  Task {i + 1}
                </div>
              );
            })}
          </div>
        </div>

        {/* Body */}
        <div style={{ padding: "24px 32px 28px" }}>
          {/* Toggle */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: showDetails ? "4px" : "0",
            }}
          >
            <div
              style={{
                fontSize: "15px",
                fontWeight: 700,
                color: "#0A1628",
              }}
            >
              Task Breakdown &amp; Explanations
            </div>
            <button
              onClick={() => setShowDetails(!showDetails)}
              style={{
                background: "none",
                border: "1px solid #DDDDDD",
                borderRadius: "6px",
                padding: "5px 12px",
                fontSize: "12.5px",
                fontWeight: 600,
                color: "#374151",
                cursor: "pointer",
              }}
            >
              {showDetails ? "Show Less" : "Show More"}
            </button>
          </div>

          {showDetails && (
            <div style={{ marginTop: "4px" }}>
              {TASKS.map((t) => (
                <TaskRow key={t.key} task={t} correct={scores[t.key]} />
              ))}
            </div>
          )}

          {/* Disclaimer */}
          <p
            style={{
              fontSize: "12px",
              fontStyle: "italic",
              color: "#6B7280",
              marginTop: "24px",
              lineHeight: "1.65",
              borderTop: "1px solid #E5E7EB",
              paddingTop: "18px",
            }}
          >
            In a real certification exam you will not receive a score upon
            submission of performance-based questions. Cert2Hire provides this
            detailed scoring and explanation exclusively to accelerate your
            learning, build real hands-on skills, and ensure you are fully
            prepared for both your certification exam and your first day on the
            job.
          </p>

          {/* Exit button */}
          <div style={{ textAlign: "center", marginTop: "22px" }}>
            <button
              onClick={onExit}
              style={{
                backgroundColor: "#0A1628",
                color: "white",
                border: "none",
                borderRadius: "6px",
                padding: "12px 36px",
                fontSize: "14px",
                fontWeight: 700,
                cursor: "pointer",
                letterSpacing: "0.03em",
              }}
            >
              Exit Question
            </button>
          </div>

          {/* Copyright */}
          <div
            style={{
              textAlign: "center",
              fontSize: "11px",
              color: "#9CA3AF",
              marginTop: "20px",
            }}
          >
            © Cert2Hire. All Rights Reserved.
          </div>
        </div>
      </div>
    </div>
  );
}
