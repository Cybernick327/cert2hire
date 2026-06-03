import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";

export const metadata: Metadata = {
  title: "Cert2Hire | CompTIA Security+ SY0-701 (Security+)",
  description: "Pass your CompTIA Security+ SY0-701 exam. Every resource on one platform.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body style={{ margin: 0, padding: 0 }}>{children}</body>
      </html>
    </ClerkProvider>
  );
}
