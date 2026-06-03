import { auth } from "@clerk/nextjs/server";
import { supabaseAdmin } from "@/lib/supabase";
import { hasAccess } from "@/lib/stripe";
import Link from "next/link";

export default async function EbookPage() {
  const { userId } = await auth();
  const { data: purchaseRows } = await supabaseAdmin.from("purchases").select("product_id").eq("clerk_user_id", userId!);
  const purchases = (purchaseRows || []).map((p: { product_id: string }) => p.product_id);
  const unlocked = hasAccess(purchases, "ebook");

  if (!unlocked) {
    return (
      <div style={{ maxWidth: "600px" }}>
        <h1 style={{ fontSize: "24px", fontWeight: 800, color: "#F0F4FF", margin: "0 0 12px" }}>Study eBook</h1>
        <p style={{ color: "#8A9BBF", marginBottom: "24px" }}>Purchase the eBook or Complete Package to access the CompTIA Security+ SY0-701 (Security+) Study eBook.</p>
        <Link href="/cart" style={{ backgroundColor: "#C9A44A", color: "#0D1B3E", textDecoration: "none", borderRadius: "8px", padding: "12px 24px", fontWeight: 800, fontSize: "14px" }}>Unlock Now →</Link>
      </div>
    );
  }

  const CHAPTERS = [
    { num: 1, title: "General Security Concepts", domain: "Domain 1" },
    { num: 2, title: "Cryptography & PKI", domain: "Domain 1" },
    { num: 3, title: "Threats, Attacks & Vulnerabilities", domain: "Domain 2" },
    { num: 4, title: "Social Engineering & Malware", domain: "Domain 2" },
    { num: 5, title: "Security Architecture & Design", domain: "Domain 3" },
    { num: 6, title: "Network Security", domain: "Domain 3" },
    { num: 7, title: "Identity & Access Management", domain: "Domain 4" },
    { num: 8, title: "Security Operations & Incident Response", domain: "Domain 4" },
    { num: 9, title: "Risk Management & Compliance", domain: "Domain 5" },
    { num: 10, title: "Security Program Governance", domain: "Domain 5" },
  ];

  return (
    <div style={{ maxWidth: "900px" }}>
      <h1 style={{ fontSize: "24px", fontWeight: 800, color: "#F0F4FF", margin: "0 0 4px" }}>Study eBook</h1>
      <p style={{ color: "#8A9BBF", marginBottom: "32px", fontSize: "14px" }}>CompTIA Security+ SY0-701 (Security+) — all chapters</p>

      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        {CHAPTERS.map((ch) => (
          <div key={ch.num} style={{ backgroundColor: "#111F3F", border: "1px solid #1E3265", borderRadius: "10px", padding: "18px 24px", display: "flex", alignItems: "center", gap: "16px" }}>
            <div style={{ width: "36px", height: "36px", backgroundColor: "rgba(201,164,74,0.1)", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <span style={{ fontSize: "13px", fontWeight: 800, color: "#C9A44A" }}>{ch.num}</span>
            </div>
            <div style={{ flex: 1 }}>
              <p style={{ margin: 0, fontSize: "14px", fontWeight: 600, color: "#F0F4FF" }}>{ch.title}</p>
              <p style={{ margin: 0, fontSize: "12px", color: "#4A5C80" }}>{ch.domain}</p>
            </div>
            <span style={{ fontSize: "12px", color: "#4A5C80", border: "1px solid #1E3265", padding: "4px 10px", borderRadius: "20px" }}>Coming soon</span>
          </div>
        ))}
      </div>

      <div style={{ marginTop: "24px", backgroundColor: "rgba(201,164,74,0.06)", border: "1px solid rgba(201,164,74,0.2)", borderRadius: "10px", padding: "16px 20px" }}>
        <p style={{ margin: 0, fontSize: "13px", color: "#8A9BBF" }}>
          📖 The full interactive eBook with chapter quizzes will be available here. Your purchase grants permanent access.
        </p>
      </div>
    </div>
  );
}
