import { auth } from "@clerk/nextjs/server";
import { supabaseAdmin } from "@/lib/supabase";
import { hasAccess } from "@/lib/stripe";
import Link from "next/link";

const VIDEOS = [
  { domain: "Domain 1: General Security Concepts", modules: [
    { title: "Security Controls & Frameworks", url: "https://www.youtube.com/watch?v=placeholder1" },
    { title: "Cryptography Basics", url: "https://www.youtube.com/watch?v=placeholder2" },
  ]},
  { domain: "Domain 2: Threats, Vulnerabilities & Mitigations", modules: [
    { title: "Malware Types & Attack Vectors", url: "https://www.youtube.com/watch?v=placeholder3" },
    { title: "Social Engineering", url: "https://www.youtube.com/watch?v=placeholder4" },
  ]},
  { domain: "Domain 3: Security Architecture", modules: [
    { title: "Network Security Design", url: "https://www.youtube.com/watch?v=placeholder5" },
  ]},
  { domain: "Domain 4: Security Operations", modules: [
    { title: "Incident Response", url: "https://www.youtube.com/watch?v=placeholder6" },
    { title: "SIEM & Log Analysis", url: "https://www.youtube.com/watch?v=placeholder7" },
  ]},
  { domain: "Domain 5: Security Program Management & Oversight", modules: [
    { title: "Risk Management", url: "https://www.youtube.com/watch?v=placeholder8" },
    { title: "Compliance & Regulations", url: "https://www.youtube.com/watch?v=placeholder9" },
  ]},
];

export default async function VideoPage() {
  const { userId } = await auth();
  const { data: purchaseRows } = await supabaseAdmin.from("purchases").select("product_id").eq("clerk_user_id", userId!);
  const purchases = (purchaseRows || []).map((p: { product_id: string }) => p.product_id);
  const unlocked = hasAccess(purchases, "video");

  if (!unlocked) {
    return (
      <div style={{ maxWidth: "600px" }}>
        <h1 style={{ fontSize: "24px", fontWeight: 800, color: "#F0F4FF", margin: "0 0 12px" }}>Video Lessons</h1>
        <p style={{ color: "#8A9BBF", marginBottom: "24px" }}>Purchase any package to access the full CompTIA Security+ SY0-701 (Security+) video course.</p>
        <Link href="/cart" style={{ backgroundColor: "#C9A44A", color: "#0D1B3E", textDecoration: "none", borderRadius: "8px", padding: "12px 24px", fontWeight: 800, fontSize: "14px" }}>Unlock Now →</Link>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: "900px" }}>
      <h1 style={{ fontSize: "24px", fontWeight: 800, color: "#F0F4FF", margin: "0 0 4px" }}>Video Lessons</h1>
      <p style={{ color: "#8A9BBF", marginBottom: "32px", fontSize: "14px" }}>CompTIA Security+ SY0-701 (Security+) — full course</p>

      {VIDEOS.map((section) => (
        <div key={section.domain} style={{ marginBottom: "32px" }}>
          <h2 style={{ fontSize: "14px", fontWeight: 700, color: "#C9A44A", letterSpacing: "0.04em", marginBottom: "12px", textTransform: "uppercase" }}>{section.domain}</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            {section.modules.map((mod) => (
              <a key={mod.title} href={mod.url} target="_blank" rel="noopener noreferrer" style={{ display: "flex", alignItems: "center", gap: "14px", backgroundColor: "#111F3F", border: "1px solid #1E3265", borderRadius: "10px", padding: "16px 20px", textDecoration: "none", transition: "border-color 0.15s" }}
                onMouseEnter={(e) => (e.currentTarget.style.borderColor = "#C9A44A")}
                onMouseLeave={(e) => (e.currentTarget.style.borderColor = "#1E3265")}>
                <div style={{ width: "36px", height: "36px", backgroundColor: "rgba(201,164,74,0.1)", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <span style={{ color: "#C9A44A", fontSize: "14px" }}>▶</span>
                </div>
                <span style={{ fontSize: "14px", color: "#F0F4FF", fontWeight: 500 }}>{mod.title}</span>
                <span style={{ marginLeft: "auto", fontSize: "12px", color: "#4A5C80" }}>YouTube →</span>
              </a>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
