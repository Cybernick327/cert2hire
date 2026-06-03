import { auth } from "@clerk/nextjs/server";
import { supabaseAdmin } from "@/lib/supabase";
import { hasAccess } from "@/lib/stripe";
import Link from "next/link";
import ExamEngine from "./ExamEngine";

export default async function ExamPage() {
  const { userId } = await auth();
  const { data: purchaseRows } = await supabaseAdmin.from("purchases").select("product_id").eq("clerk_user_id", userId!);
  const purchases = (purchaseRows || []).map((p: { product_id: string }) => p.product_id);
  const unlocked = hasAccess(purchases, "mcq");

  if (!unlocked) {
    return (
      <div style={{ maxWidth: "600px" }}>
        <h1 style={{ fontSize: "24px", fontWeight: 800, color: "#F0F4FF", margin: "0 0 12px" }}>MCQ Practice Exam</h1>
        <p style={{ color: "#8A9BBF", marginBottom: "24px" }}>Purchase the Practice Exam Package or Complete Package to access 500+ CompTIA Security+ SY0-701 (Security+) practice questions.</p>
        <Link href="/cart" style={{ backgroundColor: "#C9A44A", color: "#0D1B3E", textDecoration: "none", borderRadius: "8px", padding: "12px 24px", fontWeight: 800, fontSize: "14px" }}>Unlock Now →</Link>
      </div>
    );
  }

  const { data: questions } = await supabaseAdmin
    .from("questions")
    .select("*, domains(name)")
    .eq("type", "mcq")
    .limit(90);

  return <ExamEngine questions={questions || []} userId={userId!} />;
}
