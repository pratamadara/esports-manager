import { T as TournamentStatus, M as MatchStatus, j as jsxRuntimeExports, e as cn } from "./index-jTlOkBZI.js";
import { e as tournamentStatusLabel, m as matchStatusLabel } from "./format-D6UPf0rn.js";
const statusStyles = {
  akanDatang: "border-accent/40 bg-accent/10 text-accent",
  dijadwalkan: "border-accent/40 bg-accent/10 text-accent",
  berlangsung: "border-primary/50 bg-primary/15 text-primary",
  selesai: "border-border bg-muted text-muted-foreground"
};
function StatusBadge({ status, className }) {
  const isTournament = Object.values(TournamentStatus).includes(
    status
  );
  const label = isTournament ? tournamentStatusLabel(status) : matchStatusLabel(status);
  const isLive = status === TournamentStatus.berlangsung || status === MatchStatus.berlangsung;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "span",
    {
      className: cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 font-mono text-[11px] font-medium uppercase tracking-wider",
        statusStyles[status] ?? "border-border bg-muted text-muted-foreground",
        className
      ),
      children: [
        isLive ? /* @__PURE__ */ jsxRuntimeExports.jsx(
          "span",
          {
            className: "h-1.5 w-1.5 rounded-full bg-primary",
            "aria-hidden": "true"
          }
        ) : null,
        label
      ]
    }
  );
}
export {
  StatusBadge as S
};
