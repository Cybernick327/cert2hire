"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { UserButton } from "@clerk/nextjs";
import { useState } from "react";

const NAV = [
  { href: "/dashboard", label: "Overview", icon: "⊞" },
  { href: "/dashboard/video", label: "Video Lessons", icon: "▶" },
  { href: "/dashboard/ebook", label: "Study eBook", icon: "📖" },
  { href: "/dashboard/exam", label: "Practice Exam", icon: "✎" },
  { href: "/dashboard/pbq", label: "PBQ Lab", icon: "⌨" },
  { href: "/dashboard/progress", label: "My Progress", icon: "◎" },
  { href: "/dashboard/resources", label: "Resources", icon: "↓" },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div style={{ display: "flex", minHeight: "100vh", backgroundColor: "#080F24", fontFamily: '"Inter", system-ui, sans-serif' }}>

      {/* Sidebar */}
      <aside style={{ width: collapsed ? "64px" : "240px", backgroundColor: "#0D1B3E", borderRight: "1px solid #1E3265", display: "flex", flexDirection: "column", transition: "width 0.2s", flexShrink: 0 }}>
        <div style={{ padding: collapsed ? "20px 12px" : "20px 20px", borderBottom: "1px solid #1E3265", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          {!collapsed && <img src="/logo.png" height={32} style={{ width: "auto" }} alt="Cert2Hire" />}
          <button onClick={() => setCollapsed(!collapsed)} style={{ background: "none", border: "none", color: "#8A9BBF", cursor: "pointer", fontSize: "18px", lineHeight: 1 }}>
            {collapsed ? "→" : "←"}
          </button>
        </div>

        <nav style={{ flex: 1, padding: "16px 0" }}>
          {NAV.map((item) => {
            const active = pathname === item.href;
            return (
              <Link key={item.href} href={item.href} style={{ display: "flex", alignItems: "center", gap: "12px", padding: collapsed ? "12px 20px" : "12px 20px", color: active ? "#C9A44A" : "#8A9BBF", textDecoration: "none", backgroundColor: active ? "rgba(201,164,74,0.08)" : "transparent", borderLeft: active ? "3px solid #C9A44A" : "3px solid transparent", fontSize: "14px", fontWeight: active ? 600 : 400, transition: "all 0.15s", whiteSpace: "nowrap", overflow: "hidden" }}
                onMouseEnter={(e) => { if (!active) (e.currentTarget as HTMLElement).style.backgroundColor = "rgba(255,255,255,0.04)"; }}
                onMouseLeave={(e) => { if (!active) (e.currentTarget as HTMLElement).style.backgroundColor = "transparent"; }}>
                <span style={{ fontSize: "16px", flexShrink: 0 }}>{item.icon}</span>
                {!collapsed && item.label}
              </Link>
            );
          })}
        </nav>

        <div style={{ padding: "16px 20px", borderTop: "1px solid #1E3265", display: "flex", alignItems: "center", gap: "10px" }}>
          <UserButton />
          {!collapsed && <span style={{ fontSize: "13px", color: "#8A9BBF" }}>Account</span>}
        </div>
      </aside>

      {/* Main */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "auto" }}>
        {/* Top bar */}
        <header style={{ backgroundColor: "#0D1B3E", borderBottom: "1px solid #1E3265", padding: "0 32px", height: "60px", display: "flex", alignItems: "center", justifyContent: "space-between", flexShrink: 0 }}>
          <span style={{ fontSize: "13px", color: "#4A5C80" }}>CompTIA Security+ SY0-701 (Security+)</span>
          <Link href="/cart" style={{ display: "flex", alignItems: "center", gap: "8px", backgroundColor: "#C9A44A", color: "#0D1B3E", textDecoration: "none", borderRadius: "8px", padding: "7px 16px", fontSize: "13px", fontWeight: 700 }}>
            🛒 Shop
          </Link>
        </header>

        <main style={{ flex: 1, padding: "32px" }}>
          {children}
        </main>
      </div>
    </div>
  );
}
