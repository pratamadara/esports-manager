import { MatchStatus, TournamentStatus } from "@/backend";
import { matchStatusLabel, tournamentStatusLabel } from "@/lib/format";
import { cn } from "@/lib/utils";

type StatusBadgeProps = {
  status: TournamentStatus | MatchStatus;
  className?: string;
};

const statusStyles: Record<string, string> = {
  akanDatang: "border-accent/40 bg-accent/10 text-accent",
  dijadwalkan: "border-accent/40 bg-accent/10 text-accent",
  berlangsung: "border-primary/50 bg-primary/15 text-primary",
  selesai: "border-border bg-muted text-muted-foreground",
};

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const isTournament = Object.values(TournamentStatus).includes(
    status as TournamentStatus,
  );
  const label = isTournament
    ? tournamentStatusLabel(status as TournamentStatus)
    : matchStatusLabel(status as MatchStatus);
  const isLive =
    status === TournamentStatus.berlangsung ||
    status === MatchStatus.berlangsung;

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 font-mono text-[11px] font-medium uppercase tracking-wider",
        statusStyles[status] ?? "border-border bg-muted text-muted-foreground",
        className,
      )}
    >
      {isLive ? (
        <span
          className="h-1.5 w-1.5 rounded-full bg-primary"
          aria-hidden="true"
        />
      ) : null}
      {label}
    </span>
  );
}
