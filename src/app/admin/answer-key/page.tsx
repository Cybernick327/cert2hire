/* Admin Answer Key — Question 1: Network Diagram Multi-Skill
   Internal use only. Students never see this page.
   Route: /admin/answer-key */

const NAVY = "#0A1628";
const GOLD = "#F5A623";
const GREEN = "#1B5E20";
const GREEN_BG = "#E8F5E9";
const RED = "#B71C1C";
const RED_BG = "#FFEBEE";
const AMBER = "#7B3F00";
const AMBER_BG = "#FFF8E1";

interface TaskCardProps {
  number: number;
  title: string;
  accepted: string[];
  rejected: string[];
  technicalReasoning: string;
  howToDefend: string;
  scoringNote?: string;
}

function TaskCard({
  number,
  title,
  accepted,
  rejected,
  technicalReasoning,
  howToDefend,
  scoringNote,
}: TaskCardProps) {
  return (
    <div
      style={{
        backgroundColor: "white",
        border: "1px solid #DDDDDD",
        borderRadius: "10px",
        overflow: "hidden",
        marginBottom: "28px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
      }}
    >
      {/* Task header */}
      <div
        style={{
          backgroundColor: NAVY,
          padding: "14px 20px",
          display: "flex",
          alignItems: "center",
          gap: "12px",
        }}
      >
        <div
          style={{
            width: "32px",
            height: "32px",
            borderRadius: "50%",
            backgroundColor: GOLD,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "15px",
            fontWeight: 900,
            color: NAVY,
            flexShrink: 0,
          }}
        >
          {number}
        </div>
        <span
          style={{
            color: "white",
            fontWeight: 700,
            fontSize: "15px",
          }}
        >
          {title}
        </span>
      </div>

      <div style={{ padding: "20px 24px" }}>
        {/* Accepted actions */}
        <Section label="✓ Accepted Actions" color={GREEN} bg={GREEN_BG}>
          <ul style={{ margin: 0, padding: "0 0 0 18px" }}>
            {accepted.map((a, i) => (
              <li
                key={i}
                style={{
                  fontSize: "13.5px",
                  lineHeight: "1.7",
                  color: "#1B5E20",
                  marginBottom: "4px",
                  fontFamily:
                    a.startsWith("`") || a.includes("192.168") || a.includes("ipconfig") || a.includes("ping") || a.includes("tracert")
                      ? "ui-monospace, 'Courier New', monospace"
                      : "inherit",
                }}
              >
                {a}
              </li>
            ))}
          </ul>
        </Section>

        {/* Rejected actions */}
        <Section label="✕ Rejected — Does NOT Count" color={RED} bg={RED_BG}>
          <ul style={{ margin: 0, padding: "0 0 0 18px" }}>
            {rejected.map((r, i) => (
              <li
                key={i}
                style={{
                  fontSize: "13.5px",
                  lineHeight: "1.7",
                  color: "#B71C1C",
                  marginBottom: "4px",
                }}
              >
                {r}
              </li>
            ))}
          </ul>
        </Section>

        {/* Technical reasoning */}
        <Section label="Technical Reasoning" color="#1e40af" bg="#EFF6FF">
          <p
            style={{
              margin: 0,
              fontSize: "13.5px",
              lineHeight: "1.75",
              color: "#1e3a8a",
            }}
          >
            {technicalReasoning}
          </p>
        </Section>

        {/* How to defend */}
        <Section label="How to Defend This Score in a Dispute" color={AMBER} bg={AMBER_BG}>
          <p
            style={{
              margin: 0,
              fontSize: "13.5px",
              lineHeight: "1.75",
              color: AMBER,
            }}
          >
            {howToDefend}
          </p>
        </Section>

        {/* Optional scoring note */}
        {scoringNote && (
          <div
            style={{
              marginTop: "14px",
              padding: "10px 14px",
              backgroundColor: "#F5F7FA",
              borderRadius: "6px",
              borderLeft: `3px solid ${GOLD}`,
              fontSize: "12.5px",
              color: "#374151",
              lineHeight: "1.65",
            }}
          >
            <strong style={{ color: NAVY }}>Scoring note:</strong> {scoringNote}
          </div>
        )}
      </div>
    </div>
  );
}

function Section({
  label,
  color,
  bg,
  children,
}: {
  label: string;
  color: string;
  bg: string;
  children: React.ReactNode;
}) {
  return (
    <div
      style={{
        marginBottom: "14px",
        borderRadius: "6px",
        overflow: "hidden",
        border: `1px solid ${color}22`,
      }}
    >
      <div
        style={{
          backgroundColor: bg,
          padding: "6px 12px",
          fontSize: "11px",
          fontWeight: 800,
          letterSpacing: "0.07em",
          textTransform: "uppercase",
          color,
        }}
      >
        {label}
      </div>
      <div
        style={{
          padding: "10px 14px",
          backgroundColor: "white",
        }}
      >
        {children}
      </div>
    </div>
  );
}

export default function AdminAnswerKey() {
  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#F5F7FA",
        fontFamily: "system-ui, -apple-system, sans-serif",
      }}
    >
      {/* Admin banner */}
      <div
        style={{
          backgroundColor: "#B71C1C",
          padding: "8px 24px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "10px",
        }}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
          <path
            d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <span
          style={{
            color: "white",
            fontWeight: 800,
            fontSize: "12px",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
          }}
        >
          Cert2Hire Internal — Admin Use Only — Not Visible to Students
        </span>
      </div>

      {/* Page header */}
      <div
        style={{
          backgroundColor: NAVY,
          padding: "32px 40px 28px",
        }}
      >
        <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "8px" }}>
            <div
              style={{
                width: "10px",
                height: "10px",
                borderRadius: "50%",
                backgroundColor: GOLD,
              }}
            />
            <span
              style={{
                color: GOLD,
                fontWeight: 700,
                fontSize: "12px",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
              }}
            >
              Question 1 of 6 — Network Diagram Multi-Skill
            </span>
          </div>
          <h1
            style={{
              color: "white",
              fontSize: "28px",
              fontWeight: 900,
              margin: "0 0 6px",
              letterSpacing: "-0.02em",
            }}
          >
            Admin Answer Key
          </h1>
          <p style={{ color: "#94A3B8", fontSize: "14px", margin: 0 }}>
            Scenario: GlobalTech Industries — ACL misconfiguration blocking HTTPS
            access for executive user Mr. David Chen
          </p>
        </div>
      </div>

      <div style={{ maxWidth: "1000px", margin: "0 auto", padding: "36px 40px 60px" }}>
        {/* Network topology reference */}
        <div
          style={{
            backgroundColor: "white",
            border: "1px solid #DDDDDD",
            borderRadius: "10px",
            padding: "20px 24px",
            marginBottom: "36px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
          }}
        >
          <h2
            style={{
              fontSize: "13px",
              fontWeight: 800,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: NAVY,
              marginBottom: "16px",
              paddingBottom: "8px",
              borderBottom: `2px solid ${GOLD}`,
            }}
          >
            Network Topology Reference (as presented in the simulation)
          </h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "20px",
            }}
          >
            {/* Interfaces */}
            <div>
              <div
                style={{
                  fontSize: "11.5px",
                  fontWeight: 700,
                  color: "#374151",
                  marginBottom: "10px",
                  textTransform: "uppercase",
                  letterSpacing: "0.06em",
                }}
              >
                Router Interfaces
              </div>
              {[
                {
                  name: "eth1",
                  address: "192.168.0.94",
                  network: "192.168.0.64/27",
                  desc: "Floor 2 Executive Offices gateway",
                },
                {
                  name: "eth2",
                  address: "192.168.0.62",
                  network: "192.168.0.32/27",
                  desc: "DMZ subnet gateway",
                },
                {
                  name: "eth3",
                  address: "203.0.113.1",
                  network: "203.0.113.0/24",
                  desc: "External / Internet-facing interface",
                },
                {
                  name: "h1",
                  address: "192.168.0.1",
                  network: "192.168.0.0/24",
                  desc: "Management / host interface",
                },
              ].map((iface) => (
                <div
                  key={iface.name}
                  style={{
                    display: "flex",
                    gap: "10px",
                    marginBottom: "8px",
                    padding: "8px 10px",
                    backgroundColor: "#F8FAFC",
                    borderRadius: "5px",
                    border: "1px solid #E5E7EB",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "ui-monospace, 'Courier New', monospace",
                      fontWeight: 700,
                      color: NAVY,
                      fontSize: "12.5px",
                      minWidth: "32px",
                    }}
                  >
                    {iface.name}
                  </span>
                  <div>
                    <div
                      style={{
                        fontFamily: "ui-monospace, 'Courier New', monospace",
                        fontSize: "12px",
                        color: "#374151",
                      }}
                    >
                      {iface.address} ({iface.network})
                    </div>
                    <div style={{ fontSize: "11px", color: "#6B7280" }}>
                      {iface.desc}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Key identities */}
            <div>
              <div
                style={{
                  fontSize: "11.5px",
                  fontWeight: 700,
                  color: "#374151",
                  marginBottom: "10px",
                  textTransform: "uppercase",
                  letterSpacing: "0.06em",
                }}
              >
                Key Host Identities
              </div>
              {[
                {
                  label: "Affected User",
                  value: "Mr. David Chen",
                  sub: "Senior Executive, Floor 2",
                },
                {
                  label: "Affected Workstation",
                  value: "Workstation 1 (EXEC-PC-CHEN)",
                  sub: "IP: 192.168.0.65 — subnet 192.168.0.64/27",
                },
                {
                  label: "Workstation 2",
                  value: "EXEC-PC-HARRIS",
                  sub: "IP: 192.168.0.70 — same subnet, not affected in scenario",
                },
                {
                  label: "Default Gateway",
                  value: "192.168.0.94 (Router eth1)",
                  sub: "Gateway for all Floor 2 devices",
                },
                {
                  label: "Reported Unreachable Site",
                  value: "certificationbody.org",
                  sub: "HTTPS (TCP 443) blocked by Rule 2",
                },
                {
                  label: "External Router IP",
                  value: "203.0.113.1 (Router eth3)",
                  sub: "Only external IP visible in simulation",
                },
              ].map((item) => (
                <div
                  key={item.label}
                  style={{
                    marginBottom: "8px",
                    padding: "8px 10px",
                    backgroundColor: "#F8FAFC",
                    borderRadius: "5px",
                    border: "1px solid #E5E7EB",
                  }}
                >
                  <div
                    style={{
                      fontSize: "10.5px",
                      fontWeight: 700,
                      color: "#6B7280",
                      textTransform: "uppercase",
                      letterSpacing: "0.05em",
                    }}
                  >
                    {item.label}
                  </div>
                  <div
                    style={{ fontSize: "12.5px", fontWeight: 600, color: NAVY }}
                  >
                    {item.value}
                  </div>
                  <div style={{ fontSize: "11px", color: "#6B7280" }}>
                    {item.sub}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Root cause ACL rule */}
          <div
            style={{
              marginTop: "20px",
              padding: "14px 16px",
              backgroundColor: "#FFF3E0",
              border: "2px solid #E65100",
              borderRadius: "8px",
            }}
          >
            <div
              style={{
                fontSize: "11px",
                fontWeight: 800,
                color: "#E65100",
                textTransform: "uppercase",
                letterSpacing: "0.07em",
                marginBottom: "8px",
              }}
            >
              Root Cause — ACL Rule 2 (The Bug)
            </div>
            <div
              style={{
                fontFamily: "ui-monospace, 'Courier New', monospace",
                fontSize: "13px",
                color: "#7F1D1D",
                backgroundColor: "white",
                padding: "10px 14px",
                borderRadius: "5px",
                border: "1px solid #FECACA",
              }}
            >
              Rule 2 | Source: 192.168.0.64/27 | Destination: ANY | Protocol: TCP | Port: 443 | Action: <strong>DENY</strong>
            </div>
            <p
              style={{
                margin: "8px 0 0",
                fontSize: "12.5px",
                color: "#7F1D1D",
                lineHeight: "1.65",
              }}
            >
              This rule explicitly denies all TCP port 443 (HTTPS) traffic sourced from the executive
              floor subnet (192.168.0.64/27). Mr. Chen&apos;s workstation at 192.168.0.65 falls within this
              subnet. Because ACLs are evaluated top-down and the first match wins, Rule 2 fires before
              Rule 9&apos;s catch-all Accept, silently dropping every HTTPS request from the entire executive
              floor. The correct remediation is to change Rule 2&apos;s action to Accept, or delete it entirely.
            </p>
          </div>
        </div>

        {/* Divider */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            marginBottom: "28px",
          }}
        >
          <div style={{ flex: 1, height: "1px", backgroundColor: "#DDDDDD" }} />
          <span
            style={{
              fontSize: "11px",
              fontWeight: 800,
              color: "#6B7280",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
            }}
          >
            Task-by-Task Scoring Criteria
          </span>
          <div style={{ flex: 1, height: "1px", backgroundColor: "#DDDDDD" }} />
        </div>

        {/* Task 1 */}
        <TaskCard
          number={1}
          title="Ran ipconfig or ipconfig /all in a workstation terminal"
          accepted={[
            "ipconfig — typed in Workstation 1 or Workstation 2 terminal",
            "ipconfig /all — typed in Workstation 1 or Workstation 2 terminal",
          ]}
          rejected={[
            "Any other command, even if diagnostic in nature (ping, tracert, netstat, arp, nslookup, route print)",
            "Simply opening a workstation terminal without typing a command",
            "Viewing the router Interfaces tab (that shows interface IPs, not workstation IPs)",
          ]}
          technicalReasoning="ipconfig is the canonical Windows command for displaying a host's IP configuration. It returns the IPv4 address, subnet mask, and default gateway — the minimum information needed to determine which ACL subnet the workstation belongs to. Without this step, a student cannot correctly identify the source subnet in the ACL rules. ipconfig /all provides the same core data plus DNS servers, MAC address, and DHCP status, and is equally valid. No other command reveals the workstation's IP address in this simulation."
          howToDefend="If a student claims another command should count: only ipconfig and ipconfig /all display the workstation's own IP address and subnet mask. Commands like ping, tracert, netstat, and arp do not produce the host's IP configuration — they test connectivity or display cached data. The task specifically requires confirming the workstation's own IP. The simulation accepts either ipconfig or ipconfig /all from either workstation terminal."
          scoringNote="This task is workstation-agnostic. Credit is awarded whether the student runs ipconfig on Workstation 1, Workstation 2, or both. Task 3 separately verifies that the student specifically investigated Workstation 1."
        />

        {/* Task 2 */}
        <TaskCard
          number={2}
          title="Tested reachability of a known external address using ping or tracert"
          accepted={[
            "ping 203.0.113.1 — from Workstation 1 or Workstation 2",
            "tracert 203.0.113.1 — from Workstation 1 or Workstation 2",
            "ping certificationbody.org — from Workstation 1 or Workstation 2",
            "tracert certificationbody.org — from Workstation 1 or Workstation 2",
          ]}
          rejected={[
            "ping or tracert to any other IP address, including private-range IPs (192.168.x.x), loopback (127.x), or any external IP not provided in the simulation",
            "nslookup certificationbody.org — DNS resolution alone does not test reachability",
            "Pinging the default gateway (192.168.0.94) — that is an internal address",
            "Pinging any DMZ server IP (192.168.0.35, .38, .41, .44) — those are internal",
          ]}
          technicalReasoning="The simulation provides exactly two external addresses a student can discover from within the scenario: (1) 203.0.113.1 — the router's eth3 external interface IP, visible in the Interfaces tab; and (2) certificationbody.org — the website Mr. Chen reported as unreachable, stated in the scenario text. Any other IP address is either internal or not derivable from information provided in the simulation. Accepting arbitrary external IPs would allow a student to receive credit for guessing rather than for applying diagnostic knowledge from the scenario. The commands ping and tracert are the correct tools for reachability testing at the ICMP/network layer."
          howToDefend="If a student disputes that their ping to a different external IP should count: only 203.0.113.1 and certificationbody.org are external addresses that can be derived from information provided within this simulation. 203.0.113.1 appears in the router Interfaces tab as the eth3 address. certificationbody.org is stated in the scenario text. Any other external IP the student may have typed is not discoverable from the simulation content, which means the student was not applying information from the scenario — they were guessing or using outside knowledge."
          scoringNote="Credit is awarded for any one of the four accepted commands regardless of which workstation terminal it is typed in."
        />

        {/* Task 3 */}
        <TaskCard
          number={3}
          title="Confirmed Workstation 1 (192.168.0.65) as Mr. Chen's affected machine by running ipconfig"
          accepted={[
            "ipconfig — typed in the Workstation 1 terminal specifically, returning IP 192.168.0.65",
            "ipconfig /all — typed in the Workstation 1 terminal specifically, returning IP 192.168.0.65",
          ]}
          rejected={[
            "Opening only Workstation 2's terminal (even if ipconfig was run there)",
            "Opening Workstation 1 but not running ipconfig — simply opening the terminal does not confirm the host identity",
            "Running any other command in Workstation 1 (ping, tracert, etc.)",
            "Inferring Workstation 1's IP from the router Interfaces tab or diagram labels without running ipconfig in the terminal",
          ]}
          technicalReasoning="The scenario identifies Mr. David Chen as the affected user. Workstation 1 is labeled as his machine (hostname EXEC-PC-CHEN, IP 192.168.0.65). A professionally conducted troubleshooting workflow requires positively confirming the affected host's IP address at the host level — not inferring it from a diagram label. Running ipconfig on Workstation 1 produces the output showing 192.168.0.65, which falls within the 192.168.0.64/27 subnet governed by the ACL rules. This is the step that closes the logical chain: affected user → affected workstation → affected subnet → matching ACL rule."
          howToDefend="If a student claims they identified WS1 another way: the task requires both (a) opening Workstation 1's terminal and (b) running ipconfig to receive IP address output. Opening Workstation 2 is insufficient because it belongs to a different user (EXEC-PC-HARRIS). Simply observing the device label in the diagram is insufficient because that is passive observation, not active verification. A student who ran ipconfig on WS2 only has confirmed the wrong machine. The system records which terminal the ipconfig command was run in."
          scoringNote="This task is satisfied by running either ipconfig or ipconfig /all specifically inside the Workstation 1 terminal. It does not require the student to run any additional commands beyond that."
        />

        {/* Task 4 */}
        <TaskCard
          number={4}
          title="Opened the Access Control List tab on the router modal"
          accepted={[
            "Clicked the 'Access Control List' tab inside the Router modal — any tab click counts, regardless of whether changes were made",
          ]}
          rejected={[
            "Opening the Router modal but staying on the Interfaces tab only — the Interfaces tab shows IP addressing, not ACL rules",
            "Not opening the Router modal at all",
          ]}
          technicalReasoning="The bug in this simulation is an incorrect ACL rule. The Interfaces tab shows router interface IP addresses and subnets — useful for understanding topology but not for finding the rule that blocks traffic. The Access Control List tab is where the 10-rule policy is displayed, including the Rule 2 that denies TCP 443 from the executive subnet. A student who never opens the ACL tab cannot have found the root cause through the intended diagnostic path."
          howToDefend="If a student argues they understood the issue without clicking the ACL tab: the task requires demonstrated interaction with the ACL tab specifically, because the scenario instructs students to 'review the Access Control List rules to identify which rule is incorrectly blocking legitimate traffic.' The system records the tab click event. Clicking the Interfaces tab alone is not equivalent — it does not display the rule set."
          scoringNote="Credit is awarded upon first click of the ACL tab. The student does not need to make any changes to the rule table for this task — viewing it is sufficient."
        />

        {/* Task 5 */}
        <TaskCard
          number={5}
          title="Corrected Rule 2 — the rule blocking HTTPS from the executive subnet"
          accepted={[
            "Changed Rule 2 action from 'Deny' to 'Accept' — direct correction of the offending rule",
            "Deleted Rule 2 entirely — removes the block; Rule 9 then applies and allows all traffic from the executive subnet",
          ]}
          rejected={[
            "Modifying any rule other than Rule 2 (Rules 1, 3–9 are not the cause of this issue)",
            "Changing Rule 2's source, destination, protocol, or port without changing the action to Accept",
            "Deleting Rule 9 (the catch-all Accept) — this would make the problem worse",
            "Adding a new rule without fixing or removing Rule 2 — Rule 2 will still match first",
            "Changing Rule 10 (implicit deny) — it cannot be deleted and modifying it does not fix Rule 2",
            "Leaving Rule 2 as Deny and submitting",
          ]}
          technicalReasoning="Rule 2 is: source 192.168.0.64/27 → destination ANY → protocol TCP → port 443 → action Deny. ACLs are evaluated sequentially, top to bottom. The first matching rule wins. Mr. Chen's workstation (192.168.0.65) belongs to the 192.168.0.64/27 subnet. When he attempts HTTPS (TCP 443) to certificationbody.org, the packet matches Rule 2 — source subnet matches, protocol matches, port matches — and is immediately denied. Execution never reaches Rule 9 (which would Accept). The fix is either: (a) change Rule 2's action to Accept, making it explicitly allow the traffic, or (b) delete Rule 2 entirely, allowing Rule 9 to match and Accept all traffic from the executive subnet. Both are valid because the intent of Rule 9 is to allow general outbound traffic from the executive floor, and there is no security justification in the scenario for blocking HTTPS from that subnet."
          howToDefend="If a student modified a different rule and claims it should count: only modifying or deleting Rule 2 addresses the root cause. Rules 1 and 3–9 govern different traffic patterns (DMZ access, ICMP, SNMP, SMTP, RDP, etc.) and have no effect on the specific TCP 443 traffic from the executive subnet that is causing Mr. Chen's issue. If a student added a new Accept rule before Rule 2: Rule 2 would still match first unless the new rule is more specific and positioned above Rule 2. However, the simulation does not allow rule reordering, so adding a rule without removing Rule 2 does not resolve the conflict. The correct and only accepted remediations are changing Rule 2 to Accept or deleting it."
          scoringNote="T5 is computed at submit time by checking the current state of the ACL rule table. If Rule 2 no longer exists, or if Rule 2 exists with action='Accept', the task is marked correct. All other states are marked incorrect regardless of any other changes made to the table."
        />

        {/* Footer */}
        <div
          style={{
            marginTop: "48px",
            paddingTop: "24px",
            borderTop: "1px solid #DDDDDD",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div style={{ fontSize: "12px", color: "#9CA3AF" }}>
            Cert2Hire — Question 1 Admin Answer Key
          </div>
          <div style={{ fontSize: "12px", color: "#9CA3AF" }}>
            Internal use only — © Cert2Hire. All Rights Reserved.
          </div>
        </div>
      </div>
    </div>
  );
}
