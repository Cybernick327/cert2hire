import { auth } from "@clerk/nextjs/server";
import { supabaseAdmin } from "@/lib/supabase";
import { hasAccess } from "@/lib/stripe";
import Link from "next/link";

export default async function PBQPage() {
  const { userId } = await auth();
  const { data: purchaseRows } = await supabaseAdmin.from("purchases").select("product_id").eq("clerk_user_id", userId!);
  const purchases = (purchaseRows || []).map((p: { product_id: string }) => p.product_id);
  const unlocked = hasAccess(purchases, "pbq");

  if (!unlocked) {
    return (
      <div style={{ maxWidth: "600px" }}>
        <h1 style={{ fontSize: "24px", fontWeight: 800, color: "#F0F4FF", margin: "0 0 12px" }}>PBQ Simulation Lab</h1>
        <p style={{ color: "#8A9BBF", marginBottom: "24px" }}>Purchase the Practice Exam Package or Complete Package to access CompTIA Security+ SY0-701 (Security+) PBQ simulations.</p>
        <Link href="/cart" style={{ backgroundColor: "#C9A44A", color: "#0D1B3E", textDecoration: "none", borderRadius: "8px", padding: "12px 24px", fontWeight: 800, fontSize: "14px" }}>Unlock Now →</Link>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: "900px" }}>
      <h1 style={{ fontSize: "24px", fontWeight: 800, color: "#F0F4FF", margin: "0 0 4px" }}>PBQ Simulation Lab</h1>
      <p style={{ color: "#8A9BBF", marginBottom: "32px", fontSize: "14px" }}>CompTIA Security+ SY0-701 (Security+) — performance-based questions</p>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: "16px" }}>
        {[
          { title: "Network Security Configuration", domain: "Domain 3", difficulty: "Medium", href: "/question1" },
          { title: "SIEM Log Analysis", domain: "Domain 4", difficulty: "Hard", href: "/question2" },
          { title: "IAM Policy Audit", domain: "Domain 4", difficulty: "Medium", href: "/question3" },
          { title: "Firewall Rule Configuration", domain: "Domain 3", difficulty: "Easy", href: "/question4" },
          { title: "Incident Response Triage", domain: "Domain 4", difficulty: "Hard", href: "/question5" },
          { title: "Cryptography Implementation", domain: "Domain 1", difficulty: "Medium", href: "/question6" },
          { title: "Vulnerability Scan Analysis", domain: "Domain 2", difficulty: "Medium", href: "/question7" },
          { title: "Access Control Configuration", domain: "Domain 4", difficulty: "Easy", href: "/question8" },
        ].map((scenario) => (
          <Link key={scenario.title} href={scenario.href} style={{ backgroundColor: "#111F3F", border: "1px solid #1E3265", borderRadius: "12px", padding: "24px", textDecoration: "none", display: "block", transition: "border-color 0.15s" }}
            onMouseEnter={(e) => (e.currentTarget.style.borderColor = "#C9A44A")}
            onMouseLeave={(e) => (e.currentTarget.style.borderColor = "#1E3265")}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px" }}>
              <span style={{ fontSize: "11px", color: "#C9A44A", fontWeight: 700 }}>{scenario.domain}</span>
              <span style={{ fontSize: "11px", color: scenario.difficulty === "Hard" ? "#EF4444" : scenario.difficulty === "Medium" ? "#F59E0B" : "#10B981", border: `1px solid currentColor`, borderRadius: "20px", padding: "2px 8px" }}>{scenario.difficulty}</span>
            </div>
            <h3 style={{ fontSize: "14px", fontWeight: 700, color: "#F0F4FF", margin: "0 0 8px" }}>{scenario.title}</h3>
            <p style={{ fontSize: "12px", color: "#4A5C80", margin: 0 }}>Interactive simulation →</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
