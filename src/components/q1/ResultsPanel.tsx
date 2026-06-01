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
    label: "Task 1 — Ran a network diagnostic command on a workstation",
    correctExplanation:
      "You ran ipconfig to enumerate the workstation's IP configuration. This is the correct first diagnostic step — confirming the IP address and default gateway allows you to map the workstation to its subnet and verify which ACL rules would apply to its traffic.",
    incorrectExplanation:
      "You did not run ipconfig (or ipconfig /all) on either workstation. In a real troubleshooting scenario, confirming IP addressing is the mandatory first step. Without knowing the workstation's subnet, you cannot correctly interpret which ACL rules are relevant.",
  },
  {
    key: "t2_ranPingExternal" as keyof Scores,
    label: "Task 2 — Tested external reachability using ping or tracert",
    correctExplanation:
      "You used ping or tracert to an external address to confirm that outbound connectivity is failing from the affected workstation. This test identifies exactly where in the network path the failure occurs — a timeout at the router hop immediately points to an ACL or routing issue rather than a DNS or application-layer problem.",
    incorrectExplanation:
      "You did not run a ping or tracert to an external address. Reachability testing is a critical step in isolating whether the issue is local (NIC, IP stack), on-path (ACL, routing), or remote (destination). Without this test, you are guessing at the root cause.",
  },
  {
    key: "t3_openedWS1" as keyof Scores,
    label: "Task 3 — Identified Workstation 1 as the affected workstation",
    correctExplanation:
      "You opened and investigated Workstation 1 (EXEC-PC-CHEN, 192.168.0.65). This is the correct workstation to focus on — it is the machine assigned to Mr. David Chen, whose connectivity issue was reported. Identifying the specific affected host is essential before examining any upstream device.",
    incorrectExplanation:
      "You did not open Workstation 1's terminal during your investigation. Workstation 1 belongs to Mr. Chen (192.168.0.65) and is the source of the reported issue. Focusing investigation on the correct endpoint first is a fundamental troubleshooting discipline.",
  },
  {
    key: "t4_openedRouterACL" as keyof Scores,
    label: "Task 4 — Reviewed the router Access Control List",
    correctExplanation:
      "You navigated to the ACL tab on the perimeter router and reviewed the rule set. This is the correct action — the scenario explicitly states the IT Director suspects an ACL misconfiguration, and examining the rule table directly reveals the conflicting entry.",
    incorrectExplanation:
      "You did not open the ACL tab on the router. The core of this exercise is reading and interpreting firewall ACL rules. Without reviewing the rule table, you cannot identify which rule is incorrectly blocking legitimate HTTPS traffic.",
  },
  {
    key: "t5_fixedRule2" as keyof Scores,
    label: "Task 5 — Corrected the rule blocking HTTPS traffic from the executive subnet",
    correctExplanation:
      "You identified and corrected Rule 2: source 192.168.0.64/27 → destination ANY → TCP → port 443 → Deny. This rule incorrectly blocked all outbound HTTPS traffic originating from the executive floor subnet, including Mr. Chen's workstation. Changing the action to Accept (or removing the rule entirely) restores HTTPS connectivity while leaving all other security rules intact. Rule 9 already provides a general accept for the executive subnet, but the more specific Rule 2 was evaluated first and overrode it.",
    incorrectExplanation:
      "You did not correct Rule 2 (TCP port 443 Deny from 192.168.0.64/27 to ANY). This is the root cause of the reported issue. Rule 2 is evaluated before Rule 9's catch-all Accept, meaning all HTTPS requests from the executive subnet are silently dropped. The correct fix is to change Rule 2's action to Accept, or to delete it entirely and rely on Rule 9.",
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
