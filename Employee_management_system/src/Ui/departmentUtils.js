export const DEPARTMENT_OPTIONS = [
  { value: "fullstack", label: "Full Stack" },
  { value: "graphic design", label: "Graphic Design" },
  { value: "ui/ux design", label: "UI/UX Design" },
  { value: "video editing", label: "Video Editing" },
];

export function formatDepartmentName(dept) {
  if (!dept) return "Unassigned";
  const normalized = String(dept).trim().toLowerCase();
  const map = {
    fullstack: "Full Stack",
    "full stack": "Full Stack",
    "graphic design": "Graphic Design",
    "ui/ux design": "UI/UX Design",
    "ui/ux": "UI/UX Design",
    "video editing": "Video Editing",
  };
  if (map[normalized]) return map[normalized];
  return String(dept)
    .trim()
    .replace(/\b\w/g, (ch) => ch.toUpperCase());
}

export function getDepartmentBadgeClass(dept) {
  const normalized = String(dept || "").trim().toLowerCase();
  if (normalized.includes("full")) return "dept-fullstack";
  if (normalized.includes("ui") || normalized.includes("ux")) return "dept-uiux";
  if (normalized.includes("graphic")) return "dept-graphic";
  if (normalized.includes("video")) return "dept-video";
  return "dept-default";
}

export function getDepartmentColor(dept) {
  const normalized = String(dept || "").trim().toLowerCase();
  if (normalized.includes("full")) return "#2563eb";
  if (normalized.includes("ui") || normalized.includes("ux")) return "#7c3aed";
  if (normalized.includes("graphic")) return "#d97706";
  if (normalized.includes("video")) return "#10b981";
  return "#64748b";
}

export function getInitials(name) {
  if (!name) return "EM";
  const parts = String(name).trim().split(/\s+/);
  if (parts.length >= 2) {
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  }
  return String(name).trim().slice(0, 2).toUpperCase();
}

export function getAvatarPalette(name) {
  const palettes = [
    { bg: "#dbeafe", color: "#1e40af" },
    { bg: "#ede9fe", color: "#5b21b6" },
    { bg: "#fef3c7", color: "#92400e" },
    { bg: "#d1fae5", color: "#065f46" },
    { bg: "#fce7f3", color: "#9d174d" },
    { bg: "#e0f2fe", color: "#075985" },
  ];
  const str = String(name || "");
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  return palettes[Math.abs(hash) % palettes.length];
}

export function formatCurrencyINR(value) {
  const num = Number(value);
  if (Number.isNaN(num)) return "₹0";
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(num);
}
