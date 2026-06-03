import { auth } from "@clerk/nextjs/server";
import { supabaseAdmin } from "@/lib/supabase";

export default async function ProgressPage() {
  const { userId } = await auth();

  const { data: scores } = await supabaseAdmin
    .from("student_scores")
    .select("is_correct, domain_id, domains(name)")
    .eq("clerk_user_id", userId!);

  const domainMap: Record<string, { correct: number; total: number; name: string }> = {};
  (scores || []).forEach((s: any) => {
    const name = s.domains?.name || "Unknown";
    if (!domainMap[name]) domainMap[name] = { correct: 0, total: 0, name };
    domainMap[name].total++;
    if (s.is_correct) domainMap[name].correct++;
  });

  const DOMAINS = [
    "General Security Concepts",
    "Threats, Vulnerabilities & Mitigations",
    "Security Architecture",
    "Security Operations",
    "Security Program Management & Oversight",
  ];

  const totalCorrect = Object.values(domainMap).reduce((s, d) => s + d.correct, 0);
  const totalAnswered = Object.values(domainMap).reduce((s, d) => s + d.total, 0);

  return (
    <div style={{ maxWidth: "800px" }}>
      <h1 style={{ fontSize: "24px", fontWeight: 800, color: "#F0F4FF", margin: "0 0 4px" }}>My Progress</h1>
      <p style={{ color: "#8A9BBF", marginBottom: "32px", fontSize: "14px" }}>CompTIA Security+ SY0-701 (Security+) — domain strength & weakness</p>

      {totalAnswered === 0 ? (
        <div style={{ backgroundColor: "#111F3F", border: "1px solid #1E3265", borderRadius: "14px", padding: "48px", textAlign: "center" }}>
          <p style={{ fontSize: "16px", color: "#8A9BBF", margin: "0 0 20px" }}>No exam data yet.</p>
          <p style={{ fontSize: "14px", color: "#4A5C80" }}>Complete a practice exam to see your domain scores here.</p>
        </div>
      ) : (
        <>
          <div style={{ backgroundColor: "#111F3F", border: "1px solid #1E3265", borderRadius: "14px", padding: "28px", marginBottom: "24px", display: "flex", gap: "32px" }}>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: "48px", fontWeight: 900, color: "#C9A44A", lineHeight: 1 }}>{totalAnswered > 0 ? Math.round((totalCorrect / totalAnswered) * 100) : 0}%</div>
              <div style={{ fontSize: "12px", color: "#8A9BBF", marginTop: "4px" }}>Overall Score</div>
            </div>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: "48px", fontWeight: 900, color: "#F0F4FF", lineHeight: 1 }}>{totalAnswered}</div>
              <div style={{ fontSize: "12px", color: "#8A9BBF", marginTop: "4px" }}>Questions Answered</div>
            </div>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: "48px", fontWeight: 900, color: "#10B981", lineHeight: 1 }}>{totalCorrect}</div>
              <div style={{ fontSize: "12px", color: "#8A9BBF", marginTop: "4px" }}>Correct</div>
            </div>
          </div>

          <div style={{ backgroundColor: "#111F3F", border: "1px solid #1E3265", borderRadius: "14px", padding: "28px" }}>
            <h3 style={{ fontSize: "13px", fontWeight: 700, color: "#C9A44A", letterSpacing: "0.06em", margin: "0 0 20px" }}>DOMAIN BREAKDOWN</h3>
            {DOMAINS.map((domain) => {
              const data = domainMap[domain];
              const pct = data ? Math.round((data.correct / data.total) * 100) : null;
              return (
                <div key={domain} style={{ marginBottom: "20px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px", alignItems: "center" }}>
                    <span style={{ fontSize: "14px", color: "#F0F4FF" }}>{domain}</span>
                    {pct !== null ? (
                      <span style={{ fontSize: "14px", fontWeight: 700, color: pct >= 75 ? "#10B981" : pct >= 50 ? "#F59E0B" : "#EF4444" }}>{pct}%</span>
                    ) : (
                      <span style={{ fontSize: "12px", color: "#4A5C80" }}>No data</span>
                    )}
                  </div>
                  <div style={{ backgroundColor: "#1E3265", borderRadius: "6px", height: "8px" }}>
                    {pct !== null && (
                      <div style={{ width: `${pct}%`, backgroundColor: pct >= 75 ? "#10B981" : pct >= 50 ? "#F59E0B" : "#EF4444", height: "8px", borderRadius: "6px", transition: "width 0.6s" }} />
                    )}
                  </div>
                  {data && (
                    <div style={{ fontSize: "12px", color: "#4A5C80", marginTop: "4px" }}>{data.correct}/{data.total} correct</div>
                  )}
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}
