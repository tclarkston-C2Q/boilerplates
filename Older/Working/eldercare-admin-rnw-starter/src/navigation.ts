export type ViewId =
  | "dashboard"
  | "patients"
  | "appointments"
  | "medications"
  | "vitals"
  | "team"
  | "reports"
  | "settings";

export function viewFromPath(pathname: string | null): ViewId {
  if (!pathname || pathname === "/") return "dashboard";
  if (pathname.startsWith("/patients")) return "patients";
  if (pathname.startsWith("/appointments")) return "appointments";
  if (pathname.startsWith("/medications")) return "medications";
  if (pathname.startsWith("/vitals")) return "vitals";
  if (pathname.startsWith("/team")) return "team";
  if (pathname.startsWith("/reports")) return "reports";
  if (pathname.startsWith("/settings")) return "settings";
  return "dashboard";
}

export function pathForView(view: ViewId): string {
  switch (view) {
    case "dashboard":
      return "/";
    case "patients":
      return "/patients";
    case "appointments":
      return "/appointments";
    case "medications":
      return "/medications";
    case "vitals":
      return "/vitals";
    case "team":
      return "/team";
    case "reports":
      return "/reports";
    case "settings":
      return "/settings";
    default:
      return "/";
  }
}
