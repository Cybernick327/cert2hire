import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { supabaseAdmin } from "@/lib/supabase";
import Stripe from "stripe";

export async function POST(req: NextRequest) {
  const body = await req.text();
  const sig = req.headers.get("stripe-signature")!;

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET!);
  } catch {
    return NextResponse.json({ error: "Webhook signature verification failed" }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const userId = session.metadata?.clerk_user_id;
    const productIds = session.metadata?.product_ids?.split(",") || [];

    if (userId && productIds.length > 0) {
      const rows = productIds.map((product_id: string) => ({
        clerk_user_id: userId,
        product_id,
        stripe_session_id: session.id,
      }));
      await supabaseAdmin.from("purchases").insert(rows);
    }
  }

  return NextResponse.json({ received: true });
}
