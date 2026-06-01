"use client";

interface LeftPanelProps {
  open: boolean;
  onClose: () => void;
}

export default function LeftPanel({ open, onClose }: LeftPanelProps) {
  return (
    <div
      style={{
        width: open ? "280px" : "0px",
        minWidth: open ? "280px" : "0px",
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
          minWidth: "280px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          {/* Document icon */}
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path
              d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"
              stroke="white"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <polyline
              points="14,2 14,8 20,8"
              stroke="white"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <line
              x1="16"
              y1="13"
              x2="8"
              y2="13"
              stroke="white"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
            <line
              x1="16"
              y1="17"
              x2="8"
              y2="17"
              stroke="white"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
            <polyline
              points="10,9 9,9 8,9"
              stroke="white"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
          </svg>
          <span
            style={{ fontSize: "12px", fontWeight: 700, letterSpacing: "0.06em" }}
          >
            TEST QUESTION
          </span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          {/* External link icon */}
          <button
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: "2px",
              opacity: 0.7,
            }}
            title="Open in new window"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <path
                d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <polyline
                points="15,3 21,3 21,9"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <line
                x1="10"
                y1="14"
                x2="21"
                y2="3"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </button>
          {/* Close button */}
          <button
            onClick={onClose}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: "2px",
              opacity: 0.8,
              lineHeight: 1,
            }}
            title="Close panel"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
              <line
                x1="18"
                y1="6"
                x2="6"
                y2="18"
                stroke="white"
                strokeWidth="2.2"
                strokeLinecap="round"
              />
              <line
                x1="6"
                y1="6"
                x2="18"
                y2="18"
                stroke="white"
                strokeWidth="2.2"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Scrollable content */}
      <div
        className="panel-scroll"
        style={{
          flex: 1,
          overflowY: "auto",
          overflowX: "hidden",
          padding: "18px 16px 24px",
          minWidth: "280px",
        }}
      >
        {/* SCENARIO */}
        <div style={{ marginBottom: "20px" }}>
          <h2
            style={{
              fontSize: "11px",
              fontWeight: 800,
              letterSpacing: "0.1em",
              color: "#0A1628",
              marginBottom: "12px",
              borderBottom: "2px solid #F5A623",
              paddingBottom: "6px",
              textTransform: "uppercase",
            }}
          >
            Scenario
          </h2>

          <p
            style={{
              fontSize: "12.5px",
              lineHeight: "1.75",
              color: "#1e293b",
              marginBottom: "12px",
            }}
          >
            GlobalTech Industries, a mid-sized financial services firm
            headquartered in Austin, Texas, recently suffered a series of
            coordinated cyberattacks targeting their public-facing web
            infrastructure. Over the course of three weeks, the organization's
            external web servers were subjected to multiple intrusion attempts,
            resulting in unauthorized data access affecting approximately 4,200
            customer records. The board of directors, led by CEO Margaret
            Holloway, mandated an immediate and comprehensive security overhaul
            of all network-facing systems.
          </p>

          <p
            style={{
              fontSize: "12.5px",
              lineHeight: "1.75",
              color: "#1e293b",
              marginBottom: "12px",
            }}
          >
            In response, IT Director James Whitfield engaged a certified
            security consultant who implemented a full Demilitarized Zone (DMZ)
            architecture, physically and logically separating the
            organization&apos;s public-facing servers from the internal corporate
            network. The DMZ was configured with dedicated subnets, updated
            Access Control Lists on the perimeter router, and new firewall
            policies designed to restrict unauthorized lateral movement. The
            implementation was completed and signed off on a Friday evening.
          </p>

          <p
            style={{
              fontSize: "12.5px",
              lineHeight: "1.75",
              color: "#1e293b",
              marginBottom: "0",
            }}
          >
            Two weeks after the reconfiguration, executive assistant Sandra
            Park reported that senior executive Mr. David Chen on the second
            floor is unable to access any external websites, including
            https://certificationbody.org, a regulatory compliance portal used
            daily in his role. Mr. Chen confirmed he can still send and receive
            internal email, access the company intranet, use shared network
            drives, and print to the local network printer. All other second
            floor staff have not reported issues. IT Director Whitfield suspects
            the issue may be related to the ACL rules configured on the
            perimeter router during the DMZ implementation and has escalated to
            your team for immediate resolution.
          </p>
        </div>

        {/* INSTRUCTIONS */}
        <div>
          <h2
            style={{
              fontSize: "11px",
              fontWeight: 800,
              letterSpacing: "0.1em",
              color: "#0A1628",
              marginBottom: "12px",
              borderBottom: "2px solid #F5A623",
              paddingBottom: "6px",
              textTransform: "uppercase",
            }}
          >
            Instructions
          </h2>

          <ol
            style={{
              margin: 0,
              padding: "0 0 0 18px",
              listStyleType: "decimal",
            }}
          >
            {[
              "Click each workstation to open its command prompt terminal. Run appropriate network diagnostic commands to determine which workstation is experiencing the connectivity issue and identify exactly where in the network path the failure occurs.",
              "Click the Router to open its configuration panel. Review the interface addresses to understand the network topology. Then review the Access Control List rules to identify which rule is incorrectly blocking legitimate traffic.",
              "Modify only the rule that is causing the connectivity issue. Do not change any other rules. The router implements an implicit deny on all unmatched traffic.",
              "After correcting the ACL, verify your fix makes logical sense given the interface addressing scheme.",
              "Click Submit when you have completed your changes.",
            ].map((step, i) => (
              <li
                key={i}
                style={{
                  fontSize: "12.5px",
                  lineHeight: "1.7",
                  color: "#1e293b",
                  marginBottom: "10px",
                }}
              >
                {step}
              </li>
            ))}
          </ol>

          <p
            style={{
              fontSize: "11.5px",
              fontStyle: "italic",
              color: "#64748b",
              marginTop: "16px",
              lineHeight: "1.6",
            }}
          >
            If at any time you would like to return this question to its initial
            state, click the Reset All Answers button.
          </p>
        </div>
      </div>
    </div>
  );
}
