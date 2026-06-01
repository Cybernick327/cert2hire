"use client";

import { useState } from "react";
import type { AclRule } from "./types";

interface RouterModalProps {
  aclRules: AclRule[];
  onClose: () => void;
  onOpenACL: () => void;
  onUpdateRule: (id: number, field: keyof AclRule, value: string) => void;
  onDeleteRule: (id: number) => void;
  onAddRule: () => void;
  t5Feedback?: boolean;
}

const INTERFACES_TEXT = `eth1
    Address:   192.168.0.94
    Netmask:   255.255.255.224
    Network:   192.168.0.64
    Broadcast: 192.168.0.95

eth2
    Address:   192.168.0.62
    Netmask:   255.255.255.224
    Network:   192.168.0.32
    Broadcast: 192.168.0.63

eth3
    Address:   203.0.113.1
    Netmask:   255.255.255.0
    Network:   203.0.113.0
    Broadcast: 203.0.113.255

h1
    Address:   192.168.0.1
    Netmask:   255.255.255.0
    Network:   192.168.0.0
    Broadcast: 192.168.0.255`;

export default function RouterModal({
  aclRules,
  onClose,
  onOpenACL,
  onUpdateRule,
  onDeleteRule,
  onAddRule,
  t5Feedback,
}: RouterModalProps) {
  const [activeTab, setActiveTab] = useState<"interfaces" | "acl">(
    "interfaces",
  );

  const [aclTabEverOpened, setAclTabEverOpened] = useState(false);

  function handleTabClick(tab: "interfaces" | "acl") {
    setActiveTab(tab);
    if (tab === "acl" && !aclTabEverOpened) {
      setAclTabEverOpened(true);
      onOpenACL();
    }
  }

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 50,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgba(0,0,0,0.55)",
        backdropFilter: "blur(2px)",
      }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div
        style={{
          width: "860px",
          maxWidth: "96vw",
          height: "580px",
          borderRadius: "6px",
          overflow: "hidden",
          boxShadow: "0 24px 64px rgba(0,0,0,0.5)",
          display: "flex",
          flexDirection: "column",
          backgroundColor: "white",
        }}
      >
        {/* Modal header */}
        <div
          style={{
            backgroundColor: "#0066CC",
            padding: "0 16px",
            height: "44px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexShrink: 0,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            {/* Router icon */}
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <rect x="2" y="9" width="20" height="10" rx="2" stroke="white" strokeWidth="1.8" />
              <circle cx="6" cy="14" r="1.5" fill="white" />
              <circle cx="10" cy="14" r="1.5" fill="white" />
              <path d="M15 5 L18 2 M18 2 L21 5 M18 2 V9" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span style={{ color: "white", fontWeight: 700, fontSize: "14px" }}>
              Router
            </span>
          </div>
          <button
            onClick={onClose}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              color: "white",
              fontSize: "20px",
              lineHeight: 1,
              padding: "0 2px",
            }}
          >
            ✕
          </button>
        </div>

        {/* Tabs */}
        <div
          style={{
            display: "flex",
            borderBottom: "2px solid #E5E7EB",
            backgroundColor: "#F9FAFB",
            flexShrink: 0,
          }}
        >
          {(["interfaces", "acl"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => handleTabClick(tab)}
              style={{
                padding: "10px 20px",
                fontSize: "13px",
                fontWeight: 600,
                color: activeTab === tab ? "#0066CC" : "#6B7280",
                borderTop: "none",
                borderLeft: "none",
                borderRight: "none",
                borderBottom:
                  activeTab === tab ? "2px solid #0066CC" : "2px solid transparent",
                marginBottom: "-2px",
                background: "none",
                cursor: "pointer",
                letterSpacing: "0.02em",
                transition: "color 0.15s",
              }}
            >
              {tab === "interfaces" ? "Interfaces" : "Access Control List"}
            </button>
          ))}
        </div>

        {/* Content */}
        <div style={{ flex: 1, overflow: "hidden", display: "flex", flexDirection: "column" }}>
          {activeTab === "interfaces" ? (
            <InterfacesTab />
          ) : (
            <ACLTab
              rules={aclRules}
              onUpdate={onUpdateRule}
              onDelete={onDeleteRule}
              onAdd={onAddRule}
              t5Feedback={t5Feedback}
            />
          )}
        </div>
      </div>
    </div>
  );
}

function InterfacesTab() {
  return (
    <div
      style={{
        flex: 1,
        backgroundColor: "#0C0C0C",
        padding: "20px 24px",
        overflowY: "auto",
      }}
      className="terminal-scroll"
    >
      <pre
        style={{
          fontFamily: "ui-monospace, 'Courier New', Consolas, monospace",
          fontSize: "13.5px",
          lineHeight: "1.8",
          color: "#C8C8C8",
          margin: 0,
          whiteSpace: "pre",
        }}
      >
        {INTERFACES_TEXT}
      </pre>
    </div>
  );
}

interface ACLTabProps {
  rules: AclRule[];
  onUpdate: (id: number, field: keyof AclRule, value: string) => void;
  onDelete: (id: number) => void;
  onAdd: () => void;
  t5Feedback?: boolean;
}

function ACLTab({ rules, onUpdate, onDelete, onAdd, t5Feedback }: ACLTabProps) {
  const cols = [
    { key: "source", label: "Source", width: "17%" },
    { key: "destination", label: "Destination", width: "17%" },
    { key: "protocol", label: "Protocol", width: "11%" },
    { key: "port", label: "Port", width: "12%" },
    { key: "access", label: "Access", width: "11%" },
  ] as const;

  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
      {/* Table header */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "44px 17% 17% 11% 12% 11% 40px",
          backgroundColor: "#0A1628",
          color: "white",
          fontSize: "11px",
          fontWeight: 700,
          letterSpacing: "0.06em",
          textTransform: "uppercase",
          padding: "8px 0",
          flexShrink: 0,
        }}
      >
        <div style={{ textAlign: "center" }}>#</div>
        {cols.map((c) => (
          <div key={c.key} style={{ padding: "0 8px" }}>
            {c.label}
          </div>
        ))}
        <div />
      </div>

      {/* Table rows */}
      <div style={{ flex: 1, overflowY: "auto" }} className="panel-scroll">
        {rules.map((rule, idx) => {
          const isEven = idx % 2 === 0;
          const isImplicit = rule.isImplicitDeny;
          const isRule2 = rule.id === 2;
          const showRule2Feedback = isRule2 && t5Feedback !== undefined;
          return (
            <div
              key={rule.id}
              style={{
                display: "grid",
                gridTemplateColumns: "44px 17% 17% 11% 12% 11% 40px",
                backgroundColor: showRule2Feedback
                  ? (t5Feedback ? "#F0FDF4" : "#FEF2F2")
                  : isImplicit
                    ? "#FFF8F0"
                    : isEven
                      ? "#FFFFFF"
                      : "#F8FAFC",
                borderBottom: showRule2Feedback
                  ? `2px solid ${t5Feedback ? "#16A34A" : "#DC2626"}`
                  : "1px solid #E5E7EB",
                outline: showRule2Feedback
                  ? `2px solid ${t5Feedback ? "#16A34A" : "#DC2626"}`
                  : "none",
                outlineOffset: "-2px",
                alignItems: "center",
                minHeight: "36px",
                position: "relative",
              }}
            >
              {showRule2Feedback && (
                <div style={{ position: "absolute", right: 6, top: "50%", transform: "translateY(-50%)", zIndex: 2 }}>
                  {t5Feedback ? (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" fill="#16A34A" /><polyline points="8,12 11,15 16,9" stroke="white" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  ) : (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" fill="#DC2626" /><line x1="8" y1="8" x2="16" y2="16" stroke="white" strokeWidth="2.8" strokeLinecap="round" /><line x1="16" y1="8" x2="8" y2="16" stroke="white" strokeWidth="2.8" strokeLinecap="round" /></svg>
                  )}
                </div>
              )}
              {/* Rule number */}
              <div
                style={{
                  textAlign: "center",
                  fontSize: "12px",
                  fontWeight: 600,
                  color: isImplicit ? "#92400E" : "#6B7280",
                  padding: "6px 4px",
                }}
              >
                {rule.id}
              </div>

              {/* Editable fields */}
              {cols.map((col) => {
                if (col.key === "access") {
                  return (
                    <div key={col.key} style={{ padding: "4px 8px" }}>
                      {isImplicit ? (
                        <span
                          style={{
                            fontSize: "11.5px",
                            fontWeight: 700,
                            color: "#C62828",
                            backgroundColor: "#FDECEA",
                            padding: "2px 8px",
                            borderRadius: "10px",
                          }}
                        >
                          Deny
                        </span>
                      ) : (
                        <select
                          className="acl-select"
                          value={rule.access}
                          onChange={(e) =>
                            onUpdate(rule.id, "access", e.target.value)
                          }
                          style={{
                            color: rule.access === "Accept" ? "#2E7D32" : "#C62828",
                            fontWeight: 700,
                            fontSize: "11.5px",
                            backgroundColor:
                              rule.access === "Accept" ? "#E8F5E9" : "#FDECEA",
                            padding: "2px 6px",
                            borderRadius: "10px",
                          }}
                        >
                          <option value="Accept">Accept</option>
                          <option value="Deny">Deny</option>
                        </select>
                      )}
                    </div>
                  );
                }
                return (
                  <div key={col.key} style={{ padding: "4px 8px" }}>
                    {isImplicit ? (
                      <span
                        style={{
                          fontSize: "12px",
                          color: "#92400E",
                          fontFamily: "ui-monospace, 'Courier New', monospace",
                        }}
                      >
                        {rule[col.key]}
                      </span>
                    ) : (
                      <input
                        className="acl-cell-input"
                        value={rule[col.key]}
                        onChange={(e) =>
                          onUpdate(rule.id, col.key, e.target.value)
                        }
                        title={`Edit ${col.label}`}
                      />
                    )}
                  </div>
                );
              })}

              {/* Delete button */}
              <div style={{ textAlign: "center", padding: "4px" }}>
                {!isImplicit && (
                  <button
                    onClick={() => onDelete(rule.id)}
                    title="Delete rule"
                    style={{
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      color: "#E65100",
                      fontSize: "16px",
                      lineHeight: 1,
                      padding: "2px",
                      fontWeight: 700,
                      opacity: 0.85,
                      transition: "opacity 0.15s",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.opacity = "1")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.opacity = "0.85")
                    }
                  >
                    ✕
                  </button>
                )}
              </div>
            </div>
          );
        })}

        {/* Implicit deny note */}
        <div
          style={{
            padding: "8px 12px",
            fontSize: "11px",
            color: "#92400E",
            backgroundColor: "#FFFBEB",
            borderTop: "1px solid #FDE68A",
            fontStyle: "italic",
          }}
        >
          Rule 10 is the implicit deny. It cannot be deleted and must always be the last rule.
        </div>
      </div>

      {/* Add rule button */}
      <div
        style={{
          padding: "10px 14px",
          borderTop: "1px solid #E5E7EB",
          backgroundColor: "#F9FAFB",
          flexShrink: 0,
        }}
      >
        <button
          onClick={onAdd}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "6px",
            backgroundColor: "#0A1628",
            color: "white",
            border: "none",
            borderRadius: "4px",
            padding: "7px 14px",
            fontSize: "12.5px",
            fontWeight: 600,
            cursor: "pointer",
          }}
        >
          <span style={{ fontSize: "16px", lineHeight: 1 }}>+</span>
          Add Rule
        </button>
      </div>
    </div>
  );
}
