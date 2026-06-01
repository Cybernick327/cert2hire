export interface AclRule {
  id: number;
  source: string;
  destination: string;
  protocol: string;
  port: string;
  access: "Accept" | "Deny";
  isImplicitDeny: boolean;
}

export interface TerminalEntry {
  command: string;
  output: string;
}

export type WorkstationId = "ws1" | "ws2";

export interface ScoreState {
  t1_ranIpconfig: boolean;
  t2_ranPingExternal: boolean;
  t3_openedWS1: boolean;
  t4_openedRouterACL: boolean;
}

export const INITIAL_ACL_RULES: AclRule[] = [
  {
    id: 1,
    source: "192.168.0.64/27",
    destination: "192.168.0.32/27",
    protocol: "ANY",
    port: "ANY",
    access: "Accept",
    isImplicitDeny: false,
  },
  {
    id: 2,
    source: "192.168.0.64/27",
    destination: "ANY",
    protocol: "TCP",
    port: "443",
    access: "Deny",
    isImplicitDeny: false,
  },
  {
    id: 3,
    source: "ANY",
    destination: "192.168.0.32/27",
    protocol: "TCP",
    port: "80, 443",
    access: "Accept",
    isImplicitDeny: false,
  },
  {
    id: 4,
    source: "ANY",
    destination: "192.168.0.32/27",
    protocol: "ICMP",
    port: "ANY",
    access: "Deny",
    isImplicitDeny: false,
  },
  {
    id: 5,
    source: "192.168.0.80/28",
    destination: "ANY",
    protocol: "ANY",
    port: "ANY",
    access: "Deny",
    isImplicitDeny: false,
  },
  {
    id: 6,
    source: "192.168.0.32/27",
    destination: "ANY",
    protocol: "TCP/UDP",
    port: "22, 3389",
    access: "Deny",
    isImplicitDeny: false,
  },
  {
    id: 7,
    source: "192.168.0.64/27",
    destination: "ANY",
    protocol: "UDP",
    port: "161",
    access: "Deny",
    isImplicitDeny: false,
  },
  {
    id: 8,
    source: "192.168.0.64/27",
    destination: "ANY",
    protocol: "TCP/UDP",
    port: "25, 465",
    access: "Deny",
    isImplicitDeny: false,
  },
  {
    id: 9,
    source: "192.168.0.64/27",
    destination: "ANY",
    protocol: "ANY",
    port: "ANY",
    access: "Accept",
    isImplicitDeny: false,
  },
  {
    id: 10,
    source: "ANY",
    destination: "ANY",
    protocol: "ANY",
    port: "ANY",
    access: "Deny",
    isImplicitDeny: true,
  },
];
