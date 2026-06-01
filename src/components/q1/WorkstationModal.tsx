"use client";

import { useEffect, useRef, useState } from "react";
import type { TerminalEntry, WorkstationId } from "./types";

interface WorkstationModalProps {
  workstation: WorkstationId;
  history: TerminalEntry[];
  onClose: () => void;
  onAddEntry: (entry: TerminalEntry) => void;
  onIpconfig: () => void;
  onPingKnownExternal: () => void;
}

const WS_CONFIG = {
  ws1: {
    title: "Workstation 1",
    hostname: "EXEC-PC-CHEN",
    ip: "192.168.0.65",
    mac: "00-1A-2B-3C-4D-5E",
    gateway: "192.168.0.94",
    subnet: "255.255.255.224",
    network: "192.168.0.64",
    dns1: "192.168.0.35",
    dns2: "8.8.8.8",
  },
  ws2: {
    title: "Workstation 2",
    hostname: "EXEC-PC-HARRIS",
    ip: "192.168.0.70",
    mac: "00-1A-2B-3C-4D-6F",
    gateway: "192.168.0.94",
    subnet: "255.255.255.224",
    network: "192.168.0.64",
    dns1: "192.168.0.35",
    dns2: "8.8.8.8",
  },
} as const;

function isExternalAddress(addr: string): boolean {
  const a = addr.toLowerCase().trim();
  if (a === "localhost" || a === "") return false;
  if (a.startsWith("192.168.") || a.startsWith("10.") || a.startsWith("127.")) return false;
  if (a.startsWith("172.16.") || a.startsWith("172.17.") || a.startsWith("172.18.") || a.startsWith("172.19.") || a.startsWith("172.2") || a.startsWith("172.3")) return false;
  return true;
}

/* Only these two targets count for Task 2 — they are the only external
   addresses a student can learn from the simulation itself. */
const KNOWN_EXTERNAL_TARGETS = new Set([
  "203.0.113.1",
  "certificationbody.org",
]);

function isKnownExternalTarget(addr: string): boolean {
  return KNOWN_EXTERNAL_TARGETS.has(addr.toLowerCase().trim());
}

function processCommand(
  raw: string,
  ws: WorkstationId,
  cfg: (typeof WS_CONFIG)[WorkstationId],
): string {
  const trimmed = raw.trim();
  const lower = trimmed.toLowerCase();

  if (lower === "") return "";

  // ipconfig
  if (lower === "ipconfig") {
    return [
      "Windows IP Configuration\r\n",
      "Ethernet adapter Ethernet:\r\n",
      `   Connection-specific DNS Suffix  . : globaltech.local`,
      `   IPv4 Address. . . . . . . . . . . : ${cfg.ip}`,
      `   Subnet Mask . . . . . . . . . . . : ${cfg.subnet}`,
      `   Default Gateway . . . . . . . . . : ${cfg.gateway}`,
    ].join("\r\n");
  }

  if (lower === "ipconfig /all") {
    return [
      "Windows IP Configuration\r\n",
      `   Host Name . . . . . . . . . . . . : ${cfg.hostname}`,
      "   Primary Dns Suffix  . . . . . . . : globaltech.local",
      "   Node Type . . . . . . . . . . . . : Hybrid",
      "   IP Routing Enabled. . . . . . . . : No",
      "   WINS Proxy Enabled. . . . . . . . : No",
      "   DNS Suffix Search List. . . . . . : globaltech.local\r\n",
      "Ethernet adapter Ethernet:\r\n",
      "   Connection-specific DNS Suffix  . : globaltech.local",
      "   Description . . . . . . . . . . . : Intel(R) Ethernet Connection I217-LM",
      `   Physical Address. . . . . . . . . : ${cfg.mac}`,
      "   DHCP Enabled. . . . . . . . . . . : No",
      "   Autoconfiguration Enabled . . . . : Yes",
      `   IPv4 Address. . . . . . . . . . . : ${cfg.ip}(Preferred)`,
      `   Subnet Mask . . . . . . . . . . . : ${cfg.subnet}`,
      `   Default Gateway . . . . . . . . . : ${cfg.gateway}`,
      `   DNS Servers . . . . . . . . . . . : ${cfg.dns1}`,
      `                                        ${cfg.dns2}`,
      "   NetBIOS over Tcpip. . . . . . . . : Enabled",
    ].join("\r\n");
  }

  // ping
  if (lower.startsWith("ping ")) {
    const target = trimmed.slice(5).trim();
    const ext = isExternalAddress(target);
    const isWs1 = ws === "ws1";

    if (isWs1 && ext) {
      return [
        `Pinging ${target} with 32 bytes of data:`,
        "Request timed out.",
        "Request timed out.",
        "Request timed out.",
        "Request timed out.",
        "",
        `Ping statistics for ${target}:`,
        "    Packets: Sent = 4, Received = 0, Lost = 4 (100% loss),",
      ].join("\r\n");
    }

    const replyIp = target.match(/^\d+\.\d+\.\d+\.\d+$/) ? target : cfg.gateway;
    const ttl = ext ? 118 : 128;
    const times = ext ? ["18ms", "16ms", "17ms", "15ms"] : ["1ms", "<1ms", "1ms", "<1ms"];
    const avg = ext ? "16ms" : "0ms";
    const min = ext ? "15ms" : "0ms";
    const max = ext ? "18ms" : "1ms";
    return [
      `Pinging ${target} with 32 bytes of data:`,
      `Reply from ${replyIp}: bytes=32 time=${times[0]} TTL=${ttl}`,
      `Reply from ${replyIp}: bytes=32 time=${times[1]} TTL=${ttl}`,
      `Reply from ${replyIp}: bytes=32 time=${times[2]} TTL=${ttl}`,
      `Reply from ${replyIp}: bytes=32 time=${times[3]} TTL=${ttl}`,
      "",
      `Ping statistics for ${replyIp}:`,
      "    Packets: Sent = 4, Received = 4, Lost = 0 (0% loss),",
      "Approximate round trip times in milli-seconds:",
      `    Minimum = ${min}, Maximum = ${max}, Average = ${avg}`,
    ].join("\r\n");
  }

  // tracert
  if (lower.startsWith("tracert ")) {
    const target = trimmed.slice(8).trim();
    const ext = isExternalAddress(target);
    const isWs1 = ws === "ws1";

    if (isWs1 && ext) {
      return [
        `Tracing route to ${target} over a maximum of 30 hops`,
        "",
        `  1     1 ms     1 ms     1 ms  ${cfg.gateway}`,
        "  2     *        *        *     Request timed out.",
        "  3     *        *        *     Request timed out.",
        "  4     *        *        *     Request timed out.",
        "",
        "Trace complete.",
      ].join("\r\n");
    }

    if (ext) {
      return [
        `Tracing route to ${target} over a maximum of 30 hops`,
        "",
        `  1     1 ms     1 ms     1 ms  ${cfg.gateway}`,
        "  2    12 ms    11 ms    10 ms  203.0.113.1",
        "  3    18 ms    17 ms    16 ms  72.14.194.1",
        `  4    20 ms    19 ms    20 ms  ${target}`,
        "",
        "Trace complete.",
      ].join("\r\n");
    }

    const replyIp = target.match(/^\d+\.\d+\.\d+\.\d+$/) ? target : cfg.gateway;
    return [
      `Tracing route to ${replyIp} over a maximum of 30 hops`,
      "",
      `  1    <1 ms    <1 ms    <1 ms  ${replyIp}`,
      "",
      "Trace complete.",
    ].join("\r\n");
  }

  // nslookup
  if (lower.startsWith("nslookup")) {
    const parts = trimmed.split(/\s+/);
    const target = parts[1] || "";
    if (!target) {
      return [
        "Default Server:  dns.globaltech.local",
        `Address:  ${cfg.dns1}`,
        "",
        "> ",
      ].join("\r\n");
    }
    const isExternal = isExternalAddress(target);
    const resolvedIp = isExternal ? "52.84.16.240" : target.match(/^\d/) ? target : cfg.gateway;
    return [
      "Server:  dns.globaltech.local",
      `Address:  ${cfg.dns1}`,
      "",
      `Name:    ${target}`,
      `Address:  ${resolvedIp}`,
    ].join("\r\n");
  }

  // netstat
  if (lower === "netstat" || lower === "netstat -an") {
    const localIp = cfg.ip;
    return [
      "Active Connections",
      "",
      "  Proto  Local Address          Foreign Address        State",
      "  TCP    0.0.0.0:135            0.0.0.0:0              LISTENING",
      "  TCP    0.0.0.0:445            0.0.0.0:0              LISTENING",
      "  TCP    0.0.0.0:3389           0.0.0.0:0              LISTENING",
      `  TCP    ${localIp}:139       0.0.0.0:0              LISTENING`,
      `  TCP    ${localIp}:49152     ${cfg.gateway}:80    ESTABLISHED`,
      `  TCP    ${localIp}:49160     ${cfg.dns1}:53      TIME_WAIT`,
      "  UDP    0.0.0.0:123            *:*",
      `  UDP    ${localIp}:137       *:*`,
      `  UDP    ${localIp}:138       *:*`,
      "  UDP    0.0.0.0:5355           *:*",
    ].join("\r\n");
  }

  // arp
  if (lower === "arp" || lower === "arp -a") {
    return [
      `Interface: ${cfg.ip} --- 0x4`,
      "  Internet Address      Physical Address      Type",
      `  ${cfg.gateway}          00-1a-2b-3c-4d-01    dynamic`,
      "  192.168.0.35          00-1a-2b-3c-4d-20    dynamic",
      "  192.168.0.255         ff-ff-ff-ff-ff-ff    static",
      "  224.0.0.22            01-00-5e-00-00-16    static",
    ].join("\r\n");
  }

  // route print
  if (lower === "route print") {
    return [
      "===========================================================================",
      "Interface List",
      `  4...${cfg.mac} ......Intel(R) Ethernet Connection I217-LM`,
      "  1...........................Software Loopback Interface 1",
      "===========================================================================\r\n",
      "IPv4 Route Table",
      "===========================================================================",
      "Active Routes:",
      "Network Destination        Netmask          Gateway       Interface  Metric",
      `          0.0.0.0          0.0.0.0      ${cfg.gateway}    ${cfg.ip}     25`,
      `        127.0.0.0        255.0.0.0         On-link        127.0.0.1    331`,
      `        127.0.0.1  255.255.255.255         On-link        127.0.0.1    331`,
      `  127.255.255.255  255.255.255.255         On-link        127.0.0.1    331`,
      `    ${cfg.network}  255.255.255.224         On-link     ${cfg.ip}     25`,
      `    ${cfg.ip}  255.255.255.255         On-link     ${cfg.ip}    281`,
      `  192.168.0.95  255.255.255.255         On-link     ${cfg.ip}    281`,
      `  255.255.255.255  255.255.255.255         On-link     ${cfg.ip}    281`,
      "===========================================================================",
    ].join("\r\n");
  }

  // cls / clear
  if (lower === "cls" || lower === "clear") {
    return "__CLEAR__";
  }

  return `'${trimmed}' is not recognized as an internal or external command,\noperable program or batch file.`;
}

export default function WorkstationModal({
  workstation,
  history,
  onClose,
  onAddEntry,
  onIpconfig,
  onPingKnownExternal,
}: WorkstationModalProps) {
  const cfg = WS_CONFIG[workstation];
  const [input, setInput] = useState("");
  const [localHistory, setLocalHistory] = useState<TerminalEntry[]>(history);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setLocalHistory(history);
  }, [history]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [localHistory]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!input.trim()) return;

    const lower = input.trim().toLowerCase();
    const output = processCommand(input, workstation, cfg);

    if (lower === "ipconfig" || lower === "ipconfig /all") {
      onIpconfig();
    }
    if (lower.startsWith("ping ") || lower.startsWith("tracert ")) {
      const target = lower.startsWith("ping ")
        ? lower.slice(5).trim()
        : lower.slice(8).trim();
      if (isKnownExternalTarget(target)) onPingKnownExternal();
    }

    if (output === "__CLEAR__") {
      const cleared: TerminalEntry[] = [];
      setLocalHistory(cleared);
      setInput("");
      return;
    }

    const entry: TerminalEntry = { command: input.trim(), output };
    setLocalHistory((prev) => [...prev, entry]);
    onAddEntry(entry);
    setInput("");
  }

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 50,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgba(0,0,0,0.55)",
        backdropFilter: "blur(2px)",
      }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div
        style={{
          width: "760px",
          maxWidth: "95vw",
          height: "520px",
          borderRadius: "6px",
          overflow: "hidden",
          boxShadow: "0 24px 64px rgba(0,0,0,0.5)",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Modal header */}
        <div
          style={{
            backgroundColor: "#0066CC",
            padding: "0 16px",
            height: "42px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexShrink: 0,
          }}
        >
          <span
            style={{ color: "white", fontWeight: 700, fontSize: "14px" }}
          >
            {cfg.title}
          </span>
          <button
            onClick={onClose}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              color: "white",
              fontSize: "20px",
              lineHeight: 1,
              padding: "0 2px",
              opacity: 0.9,
            }}
          >
            ✕
          </button>
        </div>

        {/* Terminal body */}
        <div
          style={{
            flex: 1,
            backgroundColor: "#0C0C0C",
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
          }}
          onClick={() => inputRef.current?.focus()}
        >
          {/* Scrollable history */}
          <div
            className="terminal-scroll"
            style={{
              flex: 1,
              overflowY: "auto",
              padding: "14px 16px 8px",
              fontFamily: "ui-monospace, 'Courier New', Consolas, monospace",
              fontSize: "13px",
              lineHeight: "1.6",
              color: "#C8C8C8",
              cursor: "text",
            }}
          >
            {/* Boot banner */}
            <div style={{ marginBottom: "10px", color: "#C8C8C8" }}>
              Microsoft Windows [Version 10.0.19045.4651]
              <br />
              (c) Microsoft Corporation. All rights reserved.
            </div>

            {localHistory.map((entry, i) => (
              <div key={i} style={{ marginBottom: "4px" }}>
                <div>
                  <span style={{ color: "#CCCCCC" }}>C:\Users\admin</span>
                  <span style={{ color: "#00D4FF" }}>&gt; </span>
                  <span style={{ color: "#FFFFFF" }}>{entry.command}</span>
                </div>
                {entry.output && (
                  <pre
                    style={{
                      margin: "4px 0 8px",
                      fontFamily: "inherit",
                      fontSize: "inherit",
                      whiteSpace: "pre-wrap",
                      wordBreak: "break-word",
                      color: "#C8C8C8",
                    }}
                  >
                    {entry.output}
                  </pre>
                )}
              </div>
            ))}
            <div ref={bottomRef} />
          </div>

          {/* Input line */}
          <form
            onSubmit={handleSubmit}
            style={{
              display: "flex",
              alignItems: "center",
              padding: "6px 16px 12px",
              backgroundColor: "#0C0C0C",
              borderTop: "1px solid #1a1a1a",
              flexShrink: 0,
              fontFamily: "ui-monospace, 'Courier New', Consolas, monospace",
              fontSize: "13px",
            }}
          >
            <span style={{ color: "#CCCCCC", whiteSpace: "nowrap" }}>
              C:\Users\admin
            </span>
            <span style={{ color: "#00D4FF" }}>&gt;&nbsp;</span>
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              style={{
                flex: 1,
                background: "transparent",
                border: "none",
                outline: "none",
                color: "#FFFFFF",
                fontFamily: "inherit",
                fontSize: "inherit",
                caretColor: "#00D4FF",
              }}
              autoComplete="off"
              autoCorrect="off"
              spellCheck={false}
            />
          </form>
        </div>
      </div>
    </div>
  );
}
