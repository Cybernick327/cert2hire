import Stripe from "stripe";

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2026-05-27.dahlia",
});

export const PRODUCTS = {
  ebook: {
    id: "ebook",
    name: "CompTIA Security+ SY0-701 (Security+) Study eBook",
    price: 2000,
    description: "Written from scratch with deep scaffolding and chapter quizzes. Lifetime access.",
  },
  practice_pack: {
    id: "practice_pack",
    name: "CompTIA Security+ SY0-701 (Security+) Practice Exam Package",
    price: 4900,
    description: "MCQ Practice Exam (500+ questions) + PBQ Simulation Lab (50+ scenarios). Lifetime access.",
  },
  complete: {
    id: "complete",
    name: "CompTIA Security+ SY0-701 (Security+) Complete Package",
    price: 6900,
    description: "Everything — Video, eBook, MCQ, PBQ. Lifetime access.",
  },
  mcq: {
    id: "mcq",
    name: "CompTIA Security+ SY0-701 (Security+) MCQ Practice Exam",
    price: 2500,
    description: "500+ exam-style questions across all 5 domains. Lifetime access.",
  },
  pbq: {
    id: "pbq",
    name: "CompTIA Security+ SY0-701 (Security+) PBQ Simulation Lab",
    price: 3500,
    description: "50+ full interactive PBQ scenarios. Lifetime access.",
  },
  video: {
    id: "video",
    name: "CompTIA Security+ SY0-701 (Security+) Video Lessons",
    price: 0,
    description: "Full video course access.",
  },
} as const;

export type ProductId = keyof typeof PRODUCTS;

export function hasAccess(purchases: string[], productId: ProductId): boolean {
  if (purchases.includes("complete")) return true;
  if (productId === "mcq" && purchases.includes("practice_pack")) return true;
  if (productId === "pbq" && purchases.includes("practice_pack")) return true;
  if (productId === "video" && purchases.length > 0) return true;
  return purchases.includes(productId);
}
