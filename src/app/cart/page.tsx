"use client";

import { useState } from "react";
import { PRODUCTS, ProductId } from "@/lib/stripe";
import Link from "next/link";

const CATALOG = [
  { key: "video" as ProductId, highlight: false },
  { key: "ebook" as ProductId, highlight: false },
  { key: "mcq" as ProductId, highlight: false },
  { key: "pbq" as ProductId, highlight: false },
  { key: "practice_pack" as ProductId, highlight: false },
  { key: "complete" as ProductId, highlight: true },
];

export default function CartPage() {
  const [cart, setCart] = useState<ProductId[]>([]);
  const [loading, setLoading] = useState(false);

  const toggle = (id: ProductId) => {
    setCart((prev) => prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]);
  };

  const total = cart.reduce((sum, id) => sum + PRODUCTS[id].price, 0);

  const checkout = async () => {
    if (cart.length === 0) return;
    setLoading(true);
    const res = await fetch("/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ items: cart }),
    });
    const data = await res.json();
    if (data.url) window.location.href = data.url;
    else setLoading(false);
  };

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#080F24", fontFamily: '"Inter", system-ui, sans-serif', padding: "60px 40px" }}>
      <div style={{ maxWidth: "900px", margin: "0 auto" }}>

        <Link href="/" style={{ fontSize: "13px", color: "#8A9BBF", textDecoration: "none", display: "inline-block", marginBottom: "32px" }}>← Back to home</Link>

        <h1 style={{ fontSize: "32px", fontWeight: 900, color: "#F0F4FF", letterSpacing: "-0.03em", margin: "0 0 8px" }}>
          CompTIA Security+ SY0-701 (Security+)
        </h1>
        <p style={{ fontSize: "15px", color: "#8A9BBF", marginBottom: "40px" }}>Select what you want. Lifetime access. No subscriptions.</p>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "40px" }}>
          {CATALOG.map(({ key, highlight }) => {
            const product = PRODUCTS[key];
            const inCart = cart.includes(key);
            return (
              <div key={key} onClick={() => toggle(key)} style={{ cursor: "pointer", backgroundColor: "#111F3F", border: `2px solid ${inCart ? "#C9A44A" : highlight ? "rgba(201,164,74,0.3)" : "#1E3265"}`, borderRadius: "14px", padding: "24px", position: "relative", transition: "border-color 0.15s", boxShadow: inCart ? "0 0 24px rgba(201,164,74,0.15)" : "none" }}>
                {highlight && (
                  <span style={{ position: "absolute", top: "-11px", right: "16px", backgroundColor: "#C9A44A", color: "#0D1B3E", fontSize: "10px", fontWeight: 800, padding: "3px 12px", borderRadius: "20px" }}>BEST VALUE</span>
                )}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "8px" }}>
                  <span style={{ fontSize: "14px", fontWeight: 700, color: "#F0F4FF" }}>{product.name.replace("CompTIA Security+ SY0-701 (Security+) ", "")}</span>
                  <span style={{ fontSize: "22px", fontWeight: 900, color: "#C9A44A", flexShrink: 0, marginLeft: "12px" }}>
                    {product.price === 0 ? "FREE" : `$${(product.price / 100).toFixed(0)}`}
                  </span>
                </div>
                <p style={{ fontSize: "13px", color: "#8A9BBF", margin: "0 0 16px", lineHeight: 1.5 }}>{product.description}</p>
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <div style={{ width: "18px", height: "18px", border: `2px solid ${inCart ? "#C9A44A" : "#1E3265"}`, borderRadius: "4px", backgroundColor: inCart ? "#C9A44A" : "transparent", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    {inCart && <span style={{ fontSize: "11px", color: "#0D1B3E", fontWeight: 800 }}>✓</span>}
                  </div>
                  <span style={{ fontSize: "13px", color: inCart ? "#C9A44A" : "#8A9BBF" }}>{inCart ? "Added to order" : "Add to order"}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Order summary */}
        <div style={{ backgroundColor: "#111F3F", border: "1px solid #1E3265", borderRadius: "14px", padding: "28px" }}>
          <h3 style={{ fontSize: "16px", fontWeight: 700, color: "#F0F4FF", margin: "0 0 20px" }}>Order Summary</h3>
          {cart.length === 0 ? (
            <p style={{ color: "#4A5C80", fontSize: "14px" }}>No items selected.</p>
          ) : (
            cart.map((id) => (
              <div key={id} style={{ display: "flex", justifyContent: "space-between", fontSize: "14px", color: "#8A9BBF", marginBottom: "10px" }}>
                <span>{PRODUCTS[id].name.replace("CompTIA Security+ SY0-701 (Security+) ", "")}</span>
                <span style={{ color: "#F0F4FF", fontWeight: 600 }}>
                  {PRODUCTS[id].price === 0 ? "FREE" : `$${(PRODUCTS[id].price / 100).toFixed(0)}`}
                </span>
              </div>
            ))
          )}
          <div style={{ borderTop: "1px solid #1E3265", marginTop: "16px", paddingTop: "16px", display: "flex", justifyContent: "space-between", fontSize: "18px", fontWeight: 800, color: "#C9A44A" }}>
            <span>Total</span>
            <span>${(total / 100).toFixed(2)}</span>
          </div>
          <button onClick={checkout} disabled={cart.length === 0 || loading} style={{ marginTop: "20px", width: "100%", backgroundColor: cart.length === 0 ? "#1E3265" : "#C9A44A", color: cart.length === 0 ? "#4A5C80" : "#0D1B3E", border: "none", borderRadius: "9px", padding: "14px", fontSize: "15px", fontWeight: 800, cursor: cart.length === 0 ? "not-allowed" : "pointer" }}>
            {loading ? "Redirecting to checkout..." : "Proceed to Checkout →"}
          </button>
          <p style={{ textAlign: "center", fontSize: "12px", color: "#4A5C80", marginTop: "12px" }}>Secured by Stripe. Lifetime access. No recurring charges.</p>
        </div>
      </div>
    </div>
  );
}
