"use client";

import {
  PrinterSVG,
  RouterSVG,
  ServerSVG,
  SwitchSVG,
  WorkstationSVG,
} from "./DeviceSVGs";

interface NetworkDiagramProps {
  onOpenWorkstation: (id: "ws1" | "ws2") => void;
  onOpenRouter: () => void;
}

/* ─── Fixed diagram canvas ─────────────────────────────────────── */
const W = 1200;
const H = 570;
const DIVIDER_Y = 258;

/* ─── Device center positions ───────────────────────────────────── */
const DEV = {
  printer:   { x: 140, y: 128 },
  f2switch:  { x: 370, y: 128 },
  ws1:       { x: 620, y: 128 },
  ws2:       { x: 870, y: 128 },
  router:    { x: 148, y: 415 },
  dmzswitch: { x: 440, y: 385 },
  dns:       { x: 650, y: 325 },
  file:      { x: 870, y: 325 },
  email:     { x: 650, y: 480 },
  web:       { x: 870, y: 480 },
};

const CARD_W = 90;
const CARD_H = 110;
const CW2 = CARD_W / 2;
const CH2 = CARD_H / 2;

/* Edge helpers */
function top(k: keyof typeof DEV)    { return { x: DEV[k].x, y: DEV[k].y - CH2 }; }
function bot(k: keyof typeof DEV)    { return { x: DEV[k].x, y: DEV[k].y + CH2 }; }
function lft(k: keyof typeof DEV)    { return { x: DEV[k].x - CW2, y: DEV[k].y }; }
function rgt(k: keyof typeof DEV)    { return { x: DEV[k].x + CW2, y: DEV[k].y }; }

/* SVG cubic bezier shorthand */
function curve(
  x1: number, y1: number,
  cx1: number, cy1: number,
  cx2: number, cy2: number,
  x2: number, y2: number,
) {
  return `M ${x1} ${y1} C ${cx1} ${cy1} ${cx2} ${cy2} ${x2} ${y2}`;
}
function line(x1: number, y1: number, x2: number, y2: number) {
  return `M ${x1} ${y1} L ${x2} ${y2}`;
}

/* Connection paths */
const CONNECTIONS = [
  /* Printer → F2 Switch */
  line(rgt("printer").x, DEV.printer.y, lft("f2switch").x, DEV.f2switch.y),
  /* WS1 → F2 Switch */
  line(lft("ws1").x, DEV.ws1.y, rgt("f2switch").x, DEV.f2switch.y),
  /* WS2 → F2 Switch */
  line(lft("ws2").x, DEV.ws2.y, rgt("f2switch").x, DEV.f2switch.y),
  /* F2 Switch → Router (crosses floor boundary) */
  curve(
    DEV.f2switch.x, bot("f2switch").y,
    DEV.f2switch.x, 220,
    DEV.router.x, 345,
    DEV.router.x, top("router").y,
  ),
  /* Router → DMZ Switch */
  curve(
    rgt("router").x, DEV.router.y,
    260, DEV.router.y,
    340, DEV.dmzswitch.y,
    lft("dmzswitch").x, DEV.dmzswitch.y,
  ),
  /* DMZ Switch → DNS Server */
  curve(
    rgt("dmzswitch").x, DEV.dmzswitch.y - 12,
    520, DEV.dmzswitch.y - 12,
    590, DEV.dns.y,
    lft("dns").x, DEV.dns.y,
  ),
  /* DMZ Switch → File Server */
  curve(
    rgt("dmzswitch").x, DEV.dmzswitch.y,
    560, DEV.dmzswitch.y - 30,
    750, DEV.file.y,
    lft("file").x, DEV.file.y,
  ),
  /* DMZ Switch → Email Server */
  curve(
    rgt("dmzswitch").x, DEV.dmzswitch.y + 12,
    520, DEV.dmzswitch.y + 12,
    590, DEV.email.y,
    lft("email").x, DEV.email.y,
  ),
  /* DMZ Switch → Web Server */
  curve(
    rgt("dmzswitch").x, DEV.dmzswitch.y + 4,
    560, DEV.dmzswitch.y + 35,
    750, DEV.web.y,
    lft("web").x, DEV.web.y,
  ),
];

/* DMZ bounding box */
const DMZ = { x: 330, y: 272, w: 840, h: 272 };

interface DeviceCardProps {
  cx: number;
  cy: number;
  label: string;
  sublabel?: string;
  icon: React.ReactNode;
  onClick?: () => void;
  clickable?: boolean;
}

function DeviceCard({ cx, cy, label, sublabel, icon, onClick, clickable }: DeviceCardProps) {
  return (
    <div
      onClick={onClick}
      title={clickable ? `Click to open ${label}` : undefined}
      style={{
        position: "absolute",
        left: cx - CW2,
        top: cy - CH2,
        width: CARD_W,
        height: CARD_H,
        backgroundColor: "white",
        borderRadius: "10px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.14), 0 0 0 1px rgba(0,0,0,0.06)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "8px 4px 6px",
        cursor: clickable ? "pointer" : "default",
        border: clickable ? "1.5px solid transparent" : "1.5px solid transparent",
        transition: "border-color 0.15s, box-shadow 0.15s, transform 0.12s",
        userSelect: "none",
        zIndex: 2,
      }}
      onMouseEnter={(e) => {
        if (!clickable) return;
        const el = e.currentTarget;
        el.style.borderColor = "#0066CC";
        el.style.boxShadow = "0 4px 16px rgba(0,102,204,0.25), 0 0 0 1.5px #0066CC";
        el.style.transform = "translateY(-1px)";
      }}
      onMouseLeave={(e) => {
        if (!clickable) return;
        const el = e.currentTarget;
        el.style.borderColor = "transparent";
        el.style.boxShadow = "0 2px 8px rgba(0,0,0,0.14), 0 0 0 1px rgba(0,0,0,0.06)";
        el.style.transform = "translateY(0)";
      }}
    >
      <div style={{ flexShrink: 0 }}>{icon}</div>
      <div
        style={{
          marginTop: "6px",
          fontSize: "10.5px",
          fontWeight: 600,
          color: "#374151",
          textAlign: "center",
          lineHeight: "1.3",
        }}
      >
        {label}
      </div>
      {sublabel && (
        <div
          style={{
            fontSize: "9px",
            color: "#6B7280",
            textAlign: "center",
            marginTop: "2px",
            lineHeight: "1.2",
          }}
        >
          {sublabel}
        </div>
      )}
      {clickable && (
        <div
          style={{
            marginTop: "4px",
            fontSize: "8.5px",
            color: "#0066CC",
            fontWeight: 600,
            textTransform: "uppercase",
            letterSpacing: "0.04em",
          }}
        >
          Click to Open
        </div>
      )}
    </div>
  );
}

/* Interface label component */
function IfLabel({
  x,
  y,
  label,
}: {
  x: number;
  y: number;
  label: string;
}) {
  return (
    <g>
      <rect
        x={x - 16}
        y={y - 8}
        width={32}
        height={16}
        rx={3}
        fill="#0A1628"
        opacity={0.88}
      />
      <text
        x={x}
        y={y + 4.5}
        textAnchor="middle"
        fill="white"
        fontSize={9}
        fontFamily="ui-monospace, 'Courier New', monospace"
        fontWeight="700"
      >
        {label}
      </text>
    </g>
  );
}

export default function NetworkDiagram({
  onOpenWorkstation,
  onOpenRouter,
}: NetworkDiagramProps) {
  return (
    <div style={{ position: "relative", width: W, height: H }}>
      {/* ── SVG underlay: zones, connections, DMZ box ── */}
      <svg
        width={W}
        height={H}
        style={{ position: "absolute", inset: 0, zIndex: 0, pointerEvents: "none" }}
      >
        {/* Floor 2 background */}
        <rect x={0} y={0} width={W} height={DIVIDER_Y} fill="#EBF2FA" />
        {/* Floor 1 background */}
        <rect x={0} y={DIVIDER_Y} width={W} height={H - DIVIDER_Y} fill="#E4EDF6" />
        {/* Divider line */}
        <line
          x1={0}
          y1={DIVIDER_Y}
          x2={W}
          y2={DIVIDER_Y}
          stroke="#B8CEDE"
          strokeWidth={2}
        />

        {/* Zone labels */}
        <text x={16} y={22} fill="#475569" fontSize={11} fontWeight={700} letterSpacing={1.5} fontFamily="sans-serif" style={{ textTransform: "uppercase" }}>
          FLOOR 2 — EXECUTIVE OFFICES
        </text>
        <text x={16} y={DIVIDER_Y + 22} fill="#475569" fontSize={11} fontWeight={700} letterSpacing={1.5} fontFamily="sans-serif" style={{ textTransform: "uppercase" }}>
          FLOOR 1 — NETWORK CLOSET
        </text>

        {/* DMZ bounding box */}
        <rect
          x={DMZ.x}
          y={DMZ.y}
          width={DMZ.w}
          height={DMZ.h}
          rx={8}
          fill="rgba(245,166,35,0.04)"
          stroke="#F5A623"
          strokeWidth={2}
          strokeDasharray="8 4"
        />
        <text
          x={DMZ.x + 10}
          y={DMZ.y + 16}
          fill="#B45309"
          fontSize={10}
          fontWeight={800}
          fontFamily="sans-serif"
          letterSpacing={1.5}
        >
          DMZ
        </text>

        {/* Connection lines */}
        {CONNECTIONS.map((d, i) => (
          <path
            key={i}
            d={d}
            stroke="#2563EB"
            strokeWidth={2}
            fill="none"
            strokeLinecap="round"
          />
        ))}

        {/* Interface labels on router */}
        <IfLabel x={DEV.router.x} y={top("router").y - 10} label="eth1" />
        <IfLabel x={rgt("router").x + 14} y={DEV.router.y} label="eth2" />
        <IfLabel x={lft("router").x - 14} y={DEV.router.y} label="h1" />
        <IfLabel x={DEV.router.x} y={bot("router").y + 10} label="eth3" />
      </svg>

      {/* ── Device cards ── */}

      {/* Floor 2 */}
      <DeviceCard
        cx={DEV.printer.x}
        cy={DEV.printer.y}
        label="Printer"
        icon={<PrinterSVG size={48} />}
      />
      <DeviceCard
        cx={DEV.f2switch.x}
        cy={DEV.f2switch.y}
        label="Switch"
        sublabel="Floor 2"
        icon={<SwitchSVG size={48} />}
      />
      <DeviceCard
        cx={DEV.ws1.x}
        cy={DEV.ws1.y}
        label="Workstation 1"
        sublabel="192.168.0.65"
        icon={<WorkstationSVG size={48} />}
        onClick={() => onOpenWorkstation("ws1")}
        clickable
      />
      <DeviceCard
        cx={DEV.ws2.x}
        cy={DEV.ws2.y}
        label="Workstation 2"
        sublabel="192.168.0.70"
        icon={<WorkstationSVG size={48} />}
        onClick={() => onOpenWorkstation("ws2")}
        clickable
      />

      {/* Floor 1 */}
      <DeviceCard
        cx={DEV.router.x}
        cy={DEV.router.y}
        label="Router"
        sublabel="Perimeter"
        icon={<RouterSVG size={48} />}
        onClick={onOpenRouter}
        clickable
      />

      {/* DMZ devices */}
      <DeviceCard
        cx={DEV.dmzswitch.x}
        cy={DEV.dmzswitch.y}
        label="Switch"
        sublabel="DMZ"
        icon={<SwitchSVG size={48} />}
      />
      <DeviceCard
        cx={DEV.dns.x}
        cy={DEV.dns.y}
        label="DNS Server"
        sublabel="192.168.0.35"
        icon={<ServerSVG size={48} color="#1B3A5C" />}
      />
      <DeviceCard
        cx={DEV.file.x}
        cy={DEV.file.y}
        label="File Server"
        sublabel="192.168.0.38"
        icon={<ServerSVG size={48} color="#1A3D2E" />}
      />
      <DeviceCard
        cx={DEV.email.x}
        cy={DEV.email.y}
        label="Email Server"
        sublabel="192.168.0.41"
        icon={<ServerSVG size={48} color="#3D1A3A" />}
      />
      <DeviceCard
        cx={DEV.web.x}
        cy={DEV.web.y}
        label="Web Server"
        sublabel="192.168.0.44"
        icon={<ServerSVG size={48} color="#3D2A1A" />}
      />
    </div>
  );
}
