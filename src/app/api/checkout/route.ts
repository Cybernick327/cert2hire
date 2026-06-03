import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { stripe, PRODUCTS, ProductId } from "@/lib/stripe";

export async function POST(req: NextRequest) {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { items }: { items: ProductId[] } = await req.json();
  if (!items || items.length === 0) return NextResponse.json({ error: "No items" }, { status: 400 });

  const line_items = items
    .filter((id) => PRODUCTS[id].price > 0)
    .map((id) => ({
      price_data: {
        currency: "usd",
        product_data: { name: PRODUCTS[id].name, description: PRODUCTS[id].description },
        unit_amount: PRODUCTS[id].price,
      },
      quantity: 1,
    }));

  if (line_items.length === 0) {
    return NextResponse.json({ url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard` });
  }

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    payment_method_types: ["card"],
    line_items,
    metadata: { clerk_user_id: userId, product_ids: items.join(",") },
    success_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard?success=1`,
    cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/cart`,
  });

  return NextResponse.json({ url: session.url });
}
