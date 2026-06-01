"use client";

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
  onNext?: () => void;
}

export default function ResultsPanel({ scores, onExit, onNext }: ResultsPanelProps) {
  const total = Object.values(scores).filter(Boolean).length;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 60,
        backgroundColor: "rgba(0,0,0,0.55)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          backgroundColor: "white",
          borderRadius: "12px",
          padding: "48px 56px",
          textAlign: "center",
          boxShadow: "0 24px 60px rgba(0,0,0,0.35)",
          minWidth: "340px",
        }}
      >
        <div
          style={{
            fontSize: "26px",
            fontWeight: 800,
            color: "#0A1628",
            marginBottom: "32px",
            letterSpacing: "-0.02em",
          }}
        >
          {total} out of 5 tasks completed
        </div>
        <div style={{ display: "flex", gap: "12px", justifyContent: "center" }}>
          <button
            onClick={onExit}
            style={{
              backgroundColor: "white",
              color: "#0A1628",
              border: "2px solid #0A1628",
              borderRadius: "7px",
              padding: "11px 28px",
              fontSize: "13.5px",
              fontWeight: 700,
              cursor: "pointer",
            }}
          >
            Back to Home
          </button>
          {onNext && (
            <button
              onClick={onNext}
              style={{
                backgroundColor: "#0066CC",
                color: "white",
                border: "none",
                borderRadius: "7px",
                padding: "12px 28px",
                fontSize: "13.5px",
                fontWeight: 700,
                cursor: "pointer",
              }}
            >
              Next Question →
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
