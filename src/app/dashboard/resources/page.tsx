export default function ResourcesPage() {
  return (
    <div style={{ maxWidth: "700px" }}>
      <h1 style={{ fontSize: "24px", fontWeight: 800, color: "#F0F4FF", margin: "0 0 4px" }}>Resources</h1>
      <p style={{ color: "#8A9BBF", marginBottom: "32px", fontSize: "14px" }}>CompTIA Security+ SY0-701 (Security+) — official documents</p>

      <div style={{ backgroundColor: "#111F3F", border: "1px solid #1E3265", borderRadius: "14px", padding: "28px" }}>
        <h3 style={{ fontSize: "13px", fontWeight: 700, color: "#C9A44A", letterSpacing: "0.06em", margin: "0 0 20px" }}>OFFICIAL COMPTIA DOCUMENTS</h3>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "18px 0", borderBottom: "1px solid #1E3265" }}>
          <div>
            <p style={{ margin: "0 0 4px", fontSize: "15px", fontWeight: 600, color: "#F0F4FF" }}>
              CompTIA Security+ SY0-701 (Security+) Exam Objectives
            </p>
            <p style={{ margin: 0, fontSize: "13px", color: "#8A9BBF" }}>Official exam blueprint — all domains, objectives, and sub-objectives</p>
          </div>
          <a href="https://www.comptia.org/content/dam/comptia/en/media/docs/comptia-security-exam-objectives-sy0-701.pdf"
            target="_blank" rel="noopener noreferrer"
            style={{ flexShrink: 0, marginLeft: "20px", backgroundColor: "#C9A44A", color: "#0D1B3E", textDecoration: "none", borderRadius: "8px", padding: "10px 18px", fontSize: "13px", fontWeight: 700, whiteSpace: "nowrap" }}>
            ↓ Download PDF
          </a>
        </div>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "18px 0" }}>
          <div>
            <p style={{ margin: "0 0 4px", fontSize: "15px", fontWeight: 600, color: "#F0F4FF" }}>
              CompTIA Security+ SY0-701 (Security+) Exam Details
            </p>
            <p style={{ margin: 0, fontSize: "13px", color: "#8A9BBF" }}>Exam format, question types, number of questions, passing score</p>
          </div>
          <a href="https://www.comptia.org/certifications/security"
            target="_blank" rel="noopener noreferrer"
            style={{ flexShrink: 0, marginLeft: "20px", border: "1px solid #1E3265", color: "#8A9BBF", textDecoration: "none", borderRadius: "8px", padding: "10px 18px", fontSize: "13px", fontWeight: 600, whiteSpace: "nowrap" }}>
            View Page →
          </a>
        </div>
      </div>
    </div>
  );
}
