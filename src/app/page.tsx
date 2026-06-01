"use client";

import { useState } from "react";
import LeftPanel from "@/components/q1/LeftPanel";
import NetworkDiagram from "@/components/q1/NetworkDiagram";
import RouterModal from "@/components/q1/RouterModal";
import WorkstationModal from "@/components/q1/WorkstationModal";
import ResultsPanel from "@/components/q1/ResultsPanel";
import { INITIAL_ACL_RULES } from "@/components/q1/types";
import type { AclRule, TerminalEntry, WorkstationId } from "@/components/q1/types";

export default function Question1() {
  /* ── Panel & modal visibility ── */
  const [leftPanelOpen, setLeftPanelOpen] = useState(true);
  const [workstationModal, setWorkstationModal] = useState<WorkstationId | null>(null);
  const [routerOpen, setRouterOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  /* ── ACL rules (student-editable) ── */
  const [aclRules, setAclRules] = useState<AclRule[]>(INITIAL_ACL_RULES);

  /* ── Terminal history per workstation ── */
  const [ws1History, setWs1History] = useState<TerminalEntry[]>([]);
  const [ws2History, setWs2History] = useState<TerminalEntry[]>([]);

  /* ── Scoring trackers (T1–T4; T5 is computed) ── */
  const [t1_ranIpconfig, setT1] = useState(false);
  const [t2_ranPingExternal, setT2] = useState(false);
  const [t3_openedWS1, setT3] = useState(false);
  const [t4_openedRouterACL, setT4] = useState(false);

  /* T5: rule 2 changed to Accept or deleted entirely */
  const rule2 = aclRules.find((r) => r.id === 2);
  const t5_fixedRule2 = !rule2 || rule2.access === "Accept";

  /* ── ACL handlers ── */
  function handleUpdateRule(id: number, field: keyof AclRule, value: string) {
    setAclRules((prev) =>
      prev.map((r) => (r.id === id ? { ...r, [field]: value } : r)),
    );
  }

  function handleDeleteRule(id: number) {
    setAclRules((prev) => prev.filter((r) => r.id !== id));
  }

  function handleAddRule() {
    const maxId = Math.max(...aclRules.map((r) => r.id));
    const newRule: AclRule = {
      id: maxId + 1,
      source: "ANY",
      destination: "ANY",
      protocol: "ANY",
      port: "ANY",
      access: "Deny",
      isImplicitDeny: false,
    };
    setAclRules((prev) => {
      const lastIdx = prev.findIndex((r) => r.isImplicitDeny);
      const copy = [...prev];
      if (lastIdx >= 0) {
        copy.splice(lastIdx, 0, newRule);
      } else {
        copy.push(newRule);
      }
      return copy;
    });
  }

  /* ── Open workstation ── */
  function handleOpenWorkstation(id: WorkstationId) {
    setWorkstationModal(id);
  }

  /* ── Reset everything ── */
  function handleReset() {
    setAclRules(INITIAL_ACL_RULES);
    setWs1History([]);
    setWs2History([]);
    setT1(false);
    setT2(false);
    setT3(false);
    setT4(false);
    setWorkstationModal(null);
    setRouterOpen(false);
    setSubmitted(false);
  }

  const scores = {
    t1_ranIpconfig,
    t2_ranPingExternal,
    t3_openedWS1,
    t4_openedRouterACL,
    t5_fixedRule2,
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        overflow: "hidden",
        backgroundColor: "white",
      }}
    >
      {/* ════════════════════════════ PAGE HEADER ════════════════════════════ */}
      <header
        style={{
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
          {/* Brand row */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              marginBottom: "8px",
            }}
          >
            <div
              style={{
                width: "28px",
                height: "28px",
                borderRadius: "6px",
                backgroundColor: "#0A1628",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <span
                style={{
                  color: "#F5A623",
                  fontWeight: 900,
                  fontSize: "15px",
                  lineHeight: 1,
                }}
              >
                C
              </span>
            </div>
            <span
              style={{
                fontWeight: 800,
                fontSize: "14px",
                color: "#0A1628",
                letterSpacing: "0.01em",
              }}
            >
              Cert2Hire
            </span>
            <span
              style={{
                fontSize: "10.5px",
                color: "#94A3B8",
                fontWeight: 500,
              }}
            >
              Your Fastest Path to Certification
            </span>
          </div>

          <h1
            style={{
              fontSize: "20px",
              fontWeight: 800,
              color: "#0A1628",
              margin: "0 0 4px",
              letterSpacing: "-0.025em",
            }}
          >
            Welcome to the Cert2Hire Security+ Simulation
          </h1>
          <p style={{ fontSize: "12.5px", color: "#64748B", margin: 0 }}>
            Read the question carefully, follow all instructions, then click
            Submit.
          </p>
        </div>

        {/* Submit */}
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

      {/* ════════════════════════════ MAIN ROW ════════════════════════════ */}
      <div style={{ display: "flex", flex: 1, overflow: "hidden" }}>
        {/* Left scenario panel */}
        <LeftPanel
          open={leftPanelOpen}
          onClose={() => setLeftPanelOpen(false)}
        />

        {/* Workspace */}
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
            minWidth: 0,
          }}
        >
          {/* Toolbar */}
          <div
            style={{
              padding: "7px 14px",
              borderBottom: "1px solid #DDDDDD",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              backgroundColor: "#FAFAFA",
              flexShrink: 0,
            }}
          >
            <PillButton
              icon={<DocIcon />}
              onClick={() => setLeftPanelOpen((v) => !v)}
            >
              Show Question
            </PillButton>
            <PillButton icon={<ResetIcon />} onClick={handleReset}>
              Reset All Answers
            </PillButton>
          </div>

          {/* Diagram scroll area */}
          <div
            style={{
              flex: 1,
              overflow: "auto",
              backgroundColor: "#E8EEF4",
              padding: "24px",
            }}
          >
            <NetworkDiagram
              onOpenWorkstation={handleOpenWorkstation}
              onOpenRouter={() => setRouterOpen(true)}
            />
          </div>
        </div>
      </div>

      {/* ════════════════════════════ BOTTOM BAR ════════════════════════════ */}
      <div
        style={{
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
            display: "flex",
            alignItems: "center",
            gap: "6px",
            backgroundColor: "#F5F7FA",
            border: "1px solid #DDDDDD",
            borderRadius: "5px",
            padding: "6px 14px",
            fontSize: "12.5px",
            fontWeight: 600,
            color: "#374151",
            cursor: "pointer",
          }}
        >
          <DocIcon />
          Scenario
        </button>

        <div style={{ display: "flex", gap: "8px" }}>
          <button
            onClick={handleReset}
            style={{
              backgroundColor: "white",
              border: "1px solid #DDDDDD",
              borderRadius: "5px",
              padding: "6px 14px",
              fontSize: "12.5px",
              fontWeight: 600,
              color: "#374151",
              cursor: "pointer",
            }}
          >
            Reset All Answers
          </button>
          <button
            onClick={() => setSubmitted(true)}
            style={{
              backgroundColor: "#0A1628",
              color: "white",
              border: "none",
              borderRadius: "5px",
              padding: "6px 22px",
              fontSize: "12.5px",
              fontWeight: 700,
              cursor: "pointer",
            }}
          >
            Finish
          </button>
        </div>
      </div>

      {/* ════════════════════════════ MODALS ════════════════════════════ */}

      {workstationModal && (
        <WorkstationModal
          workstation={workstationModal}
          history={workstationModal === "ws1" ? ws1History : ws2History}
          onClose={() => setWorkstationModal(null)}
          onAddEntry={(entry) => {
            if (workstationModal === "ws1") {
              setWs1History((p) => [...p, entry]);
            } else {
              setWs2History((p) => [...p, entry]);
            }
          }}
          onIpconfig={(ws) => {
              setT1(true);
              if (ws === "ws1") setT3(true);
            }}
          onPingKnownExternal={() => setT2(true)}
        />
      )}

      {routerOpen && (
        <RouterModal
          aclRules={aclRules}
          onClose={() => setRouterOpen(false)}
          onOpenACL={() => setT4(true)}
          onUpdateRule={handleUpdateRule}
          onDeleteRule={handleDeleteRule}
          onAddRule={handleAddRule}
        />
      )}

      {submitted && (
        <ResultsPanel
          scores={scores}
          onExit={() => {
            setSubmitted(false);
            handleReset();
          }}
        />
      )}
    </div>
  );
}

/* ─── Small shared UI pieces ─── */

function PillButton({
  icon,
  onClick,
  children,
}: {
  icon: React.ReactNode;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      style={{
        display: "flex",
        alignItems: "center",
        gap: "6px",
        backgroundColor: "white",
        border: "1px solid #DDDDDD",
        borderRadius: "20px",
        padding: "5px 13px",
        fontSize: "12px",
        fontWeight: 600,
        color: "#374151",
        cursor: "pointer",
      }}
    >
      {icon}
      {children}
    </button>
  );
}

function DocIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
      <path
        d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"
        stroke="#374151"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <polyline
        points="14,2 14,8 20,8"
        stroke="#374151"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <line
        x1="16"
        y1="13"
        x2="8"
        y2="13"
        stroke="#374151"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <line
        x1="16"
        y1="17"
        x2="8"
        y2="17"
        stroke="#374151"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

function ResetIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
      <polyline
        points="1,4 1,10 7,10"
        stroke="#374151"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M3.51 15a9 9 0 1 0 .49-5.05"
        stroke="#374151"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
