interface SvgProps {
  size?: number;
}

export function PrinterSVG({ size = 52 }: SvgProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 60 60"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Output paper tray */}
      <rect x="16" y="7" width="28" height="9" rx="1" fill="white" stroke="#BDBDBD" strokeWidth="0.8" />
      <line x1="20" y1="11" x2="40" y2="11" stroke="#E0E0E0" strokeWidth="1" />
      {/* Printer body */}
      <rect x="6" y="18" width="48" height="24" rx="4" fill="#CFD8DC" />
      <rect x="6" y="18" width="48" height="6" rx="4" fill="#B0BEC5" />
      {/* Paper slot */}
      <rect x="14" y="26" width="32" height="5" rx="1" fill="#78909C" />
      {/* Control panel */}
      <circle cx="42" cy="33" r="3.5" fill="#4CAF50" />
      <circle cx="34" cy="33" r="2" fill="#90A4AE" />
      <circle cx="28" cy="33" r="2" fill="#90A4AE" />
      {/* Base */}
      <rect x="12" y="42" width="36" height="8" rx="3" fill="#ECEFF1" stroke="#CFD8DC" strokeWidth="0.8" />
      <rect x="18" y="45" width="8" height="2" rx="1" fill="#B0BEC5" />
      <rect x="29" y="45" width="14" height="2" rx="1" fill="#B0BEC5" />
      {/* Feet */}
      <rect x="14" y="49" width="6" height="3" rx="1.5" fill="#B0BEC5" />
      <rect x="40" y="49" width="6" height="3" rx="1.5" fill="#B0BEC5" />
    </svg>
  );
}

export function SwitchSVG({ size = 52 }: SvgProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 60 60"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Main body */}
      <rect x="3" y="19" width="54" height="22" rx="3" fill="#1565C0" />
      <rect x="3" y="19" width="54" height="7" rx="3" fill="#1976D2" />
      {/* Rack ears */}
      <rect x="0" y="21" width="4" height="18" rx="2" fill="#0D47A1" />
      <rect x="56" y="21" width="4" height="18" rx="2" fill="#0D47A1" />
      {/* Port group 1 */}
      <rect x="8" y="25" width="5" height="7" rx="1" fill="#BBDEFB" />
      <rect x="15" y="25" width="5" height="7" rx="1" fill="#4CAF50" />
      <rect x="22" y="25" width="5" height="7" rx="1" fill="#4CAF50" />
      <rect x="29" y="25" width="5" height="7" rx="1" fill="#4CAF50" />
      <rect x="36" y="25" width="5" height="7" rx="1" fill="#4CAF50" />
      <rect x="43" y="25" width="5" height="7" rx="1" fill="#BBDEFB" />
      {/* Status LEDs */}
      <circle cx="11" cy="36" r="2.5" fill="#4CAF50" />
      <circle cx="19" cy="36" r="2.5" fill="#4CAF50" />
      <circle cx="27" cy="36" r="2.5" fill="#FFC107" />
      <circle cx="35" cy="36" r="2.5" fill="#4CAF50" />
      <circle cx="43" cy="36" r="2.5" fill="#4CAF50" />
      {/* Uplink port */}
      <rect x="50" y="25" width="5" height="7" rx="1" fill="#F5A623" />
    </svg>
  );
}

export function WorkstationSVG({ size = 52 }: SvgProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 60 60"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Monitor bezel */}
      <rect x="7" y="4" width="46" height="34" rx="3" fill="#37474F" />
      {/* Screen */}
      <rect x="10" y="7" width="40" height="28" rx="2" fill="#0D47A1" />
      {/* Screen content: code lines */}
      <rect x="13" y="11" width="22" height="2" rx="1" fill="#4FC3F7" opacity="0.9" />
      <rect x="13" y="15" width="30" height="2" rx="1" fill="#81D4FA" opacity="0.6" />
      <rect x="13" y="19" width="18" height="2" rx="1" fill="#4FC3F7" opacity="0.9" />
      <rect x="13" y="23" width="26" height="2" rx="1" fill="#81D4FA" opacity="0.6" />
      <rect x="13" y="27" width="20" height="2" rx="1" fill="#4FC3F7" opacity="0.9" />
      {/* Monitor base neck */}
      <rect x="25" y="38" width="10" height="5" rx="1" fill="#546E7A" />
      {/* Monitor stand */}
      <rect x="17" y="43" width="26" height="3" rx="1.5" fill="#455A64" />
      {/* Tower case */}
      <rect x="19" y="46" width="22" height="10" rx="2" fill="#546E7A" />
      <rect x="21" y="48" width="8" height="2" rx="1" fill="#455A64" />
      <circle cx="37" cy="50" r="1.5" fill="#4CAF50" />
      <rect x="35" y="52" width="4" height="1.5" rx="0.75" fill="#455A64" />
    </svg>
  );
}

export function RouterSVG({ size = 52 }: SvgProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 60 60"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Antennas */}
      <line x1="18" y1="22" x2="14" y2="8" stroke="#1565C0" strokeWidth="2.5" strokeLinecap="round" />
      <circle cx="14" cy="7" r="3" fill="#42A5F5" />
      <line x1="42" y1="22" x2="46" y2="8" stroke="#1565C0" strokeWidth="2.5" strokeLinecap="round" />
      <circle cx="46" cy="7" r="3" fill="#42A5F5" />
      {/* Main body */}
      <rect x="4" y="22" width="52" height="20" rx="4" fill="#1565C0" />
      <rect x="4" y="22" width="52" height="7" rx="4" fill="#1976D2" />
      {/* Rack ears */}
      <rect x="0" y="24" width="5" height="16" rx="2" fill="#0D47A1" />
      <rect x="55" y="24" width="5" height="16" rx="2" fill="#0D47A1" />
      {/* Ports */}
      <rect x="9" y="27" width="5" height="5" rx="1" fill="#BBDEFB" />
      <rect x="16" y="27" width="5" height="5" rx="1" fill="#4CAF50" />
      <rect x="23" y="27" width="5" height="5" rx="1" fill="#4CAF50" />
      <rect x="30" y="27" width="5" height="5" rx="1" fill="#4CAF50" />
      <rect x="37" y="27" width="5" height="5" rx="1" fill="#BBDEFB" />
      {/* Status LEDs */}
      <circle cx="12" cy="38" r="2.5" fill="#4CAF50" />
      <circle cx="20" cy="38" r="2.5" fill="#4CAF50" />
      <circle cx="28" cy="38" r="2.5" fill="#FFC107" />
      {/* Uplink / WAN port */}
      <rect x="44" y="27" width="7" height="5" rx="1" fill="#F5A623" />
      <circle cx="48" cy="38" r="2.5" fill="#4CAF50" />
      {/* Feet */}
      <rect x="10" y="42" width="8" height="3" rx="1.5" fill="#90CAF9" />
      <rect x="42" y="42" width="8" height="3" rx="1.5" fill="#90CAF9" />
    </svg>
  );
}

export function ServerSVG({ size = 52, color = "#263238" }: SvgProps & { color?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 60 60"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Rack frame */}
      <rect x="4" y="6" width="52" height="48" rx="2" fill={color} />
      {/* Rack ears */}
      <rect x="0" y="6" width="5" height="48" rx="1" fill="#1C2830" />
      <rect x="55" y="6" width="5" height="48" rx="1" fill="#1C2830" />
      {/* Server unit 1 */}
      <rect x="8" y="10" width="44" height="9" rx="1" fill="#37474F" />
      <rect x="11" y="12" width="24" height="5" rx="1" fill="#455A64" />
      <circle cx="49" cy="14.5" r="2" fill="#4CAF50" />
      <circle cx="44" cy="14.5" r="2" fill="#4CAF50" />
      {/* Server unit 2 */}
      <rect x="8" y="21" width="44" height="9" rx="1" fill="#37474F" />
      <rect x="11" y="23" width="24" height="5" rx="1" fill="#455A64" />
      <circle cx="49" cy="25.5" r="2" fill="#4CAF50" />
      <circle cx="44" cy="25.5" r="2" fill="#FFC107" />
      {/* Server unit 3 */}
      <rect x="8" y="32" width="44" height="9" rx="1" fill="#37474F" />
      <rect x="11" y="34" width="24" height="5" rx="1" fill="#455A64" />
      <circle cx="49" cy="36.5" r="2" fill="#4CAF50" />
      <circle cx="44" cy="36.5" r="2" fill="#4CAF50" />
      {/* Server unit 4 */}
      <rect x="8" y="43" width="44" height="9" rx="1" fill="#37474F" />
      <rect x="11" y="45" width="24" height="5" rx="1" fill="#455A64" />
      <circle cx="49" cy="47.5" r="2" fill="#4CAF50" />
      <circle cx="44" cy="47.5" r="2" fill="#4CAF50" />
    </svg>
  );
}
