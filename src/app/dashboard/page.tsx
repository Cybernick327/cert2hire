import { auth, currentUser } from "@clerk/nextjs/server";
import { supabaseAdmin } from "@/lib/supabase";
import { PRODUCTS, hasAccess } from "@/lib/stripe";
import Link from "next/link";

export default async function DashboardPage() {
  const { userId } = await auth();
  const user = await currentUser();

  // Fetch purchases
  const { data: purchaseRows } = await supabaseAdmin
    .from("purchases")
    .select("product_id")
    .eq("clerk_user_id", userId!);

  const purchases = (purchaseRows || []).map((p: { product_id: string }) => p.product_id);

  const cards = [
    { id: "video", label: "Video Lessons", icon: "▶", href: "/dashboard/video", desc: "Full CompTIA Security+ SY0-701 (Security+) course" },
    { id: "ebook", label: "Study eBook", icon: "📖", href: "/dashboard/ebook", desc: "Deep-scaffolded eBook with chapter quizzes" },
    { id: "mcq", label: "MCQ Practice Exam", icon: "✎", href: "/dashboard/exam", desc: "500+ questions across all 5 domains" },
    { id: "pbq", label: "PBQ Simulation Lab", icon: "⌨", href: "/dashboard/pbq", desc: "50+ full interactive PBQ scenarios" },
  ] as const;

  return (
    <div style={{ maxWidth: "1000px" }}>
      <h1 style={{ fontSize: "26px", fontWeight: 800, color: "#F0F4FF", margin: "0 0 4px", letterSpacing: "-0.02em" }}>
        Welcome back{user?.firstName ? `, ${user.firstName}` : ""}
      </h1>
      <p style={{ fontSize: "14px", color: "#8A9BBF", marginBottom: "36px" }}>
        CompTIA Security+ SY0-701 (Security+) — your study hub
      </p>

      {purchases.length === 0 && (
        <div style={{ backgroundColor: "rgba(201,164,74,0.08)", border: "1px solid rgba(201,164,74,0.3)", borderRadius: "12px", padding: "20px 24px", marginBottom: "32px", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "12px" }}>
          <div>
            <p style={{ fontWeight: 700, color: "#C9A44A", margin: "0 0 4px", fontSize: "15px" }}>You haven't purchased anything yet</p>
            <p style={{ color: "#8A9BBF", margin: 0, fontSize: "13px" }}>Get the Complete Package — everything for $69, lifetime access.</p>
          </div>
          <Link href="/cart" style={{ backgroundColor: "#C9A44A", color: "#0D1B3E", textDecoration: "none", borderRadius: "8px", padding: "10px 20px", fontSize: "14px", fontWeight: 800 }}>
            View Packages →
          </Link>
        </div>
      )}

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: "20px" }}>
        {cards.map((card) => {
          const unlocked = hasAccess(purchases, card.id as any);
          return (
            <div key={card.id} style={{ backgroundColor: "#111F3F", border: `1px solid ${unlocked ? "#C9A44A" : "#1E3265"}`, borderRadius: "14px", padding: "24px", opacity: unlocked ? 1 : 0.6 }}>
              <div style={{ fontSize: "28px", marginBottom: "12px" }}>{card.icon}</div>
              <h3 style={{ fontSize: "15px", fontWeight: 700, color: "#F0F4FF", margin: "0 0 6px" }}>{card.label}</h3>
              <p style={{ fontSize: "13px", color: "#8A9BBF", margin: "0 0 16px", lineHeight: 1.5 }}>{card.desc}</p>
              {unlocked ? (
                <Link href={card.href} style={{ display: "block", textAlign: "center", backgroundColor: "#C9A44A", color: "#0D1B3E", textDecoration: "none", borderRadius: "8px", padding: "9px", fontSize: "13px", fontWeight: 700 }}>
                  Open →
                </Link>
              ) : (
                <Link href="/cart" style={{ display: "block", textAlign: "center", border: "1px solid #1E3265", color: "#8A9BBF", textDecoration: "none", borderRadius: "8px", padding: "9px", fontSize: "13px" }}>
                  Unlock →
                </Link>
              )}
            </div>
          );
        })}
      </div>

      <div style={{ marginTop: "32px" }}>
        <Link href="/dashboard/resources" style={{ display: "inline-flex", alignItems: "center", gap: "8px", color: "#C9A44A", textDecoration: "none", fontSize: "14px", fontWeight: 600 }}>
          ↓ Download CompTIA Security+ SY0-701 (Security+) Exam Objectives PDF
        </Link>
      </div>
    </div>
  );
}
