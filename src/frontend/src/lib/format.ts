import { MatchStatus, TournamentStatus } from "@/backend";

/** Convert a Motoko nanosecond bigint timestamp to a Date, or null when invalid. */
export function timestampToDate(timestamp: bigint | undefined): Date | null {
  if (timestamp === undefined) return null;
  const date = new Date(Number(timestamp / 1_000_000n));
  return Number.isNaN(date.getTime()) ? null : date;
}

const dateFormatter = new Intl.DateTimeFormat("id-ID", {
  day: "numeric",
  month: "long",
  year: "numeric",
});

const dateTimeFormatter = new Intl.DateTimeFormat("id-ID", {
  day: "numeric",
  month: "short",
  year: "numeric",
  hour: "2-digit",
  minute: "2-digit",
});

const numberFormatter = new Intl.NumberFormat("id-ID");

export function formatDate(timestamp: bigint | undefined): string {
  const date = timestampToDate(timestamp);
  return date ? dateFormatter.format(date) : "Jadwal belum ditentukan";
}

export function formatDateTime(timestamp: bigint | undefined): string {
  const date = timestampToDate(timestamp);
  return date ? dateTimeFormatter.format(date) : "Belum dijadwalkan";
}

export function formatNumber(value: number | bigint): string {
  return numberFormatter.format(value);
}

export function formatPrizePool(prizePool: string): string {
  const trimmed = prizePool.trim();
  if (trimmed === "") return "Hadiah belum diumumkan";
  return trimmed;
}

export const tournamentStatusLabels: Record<TournamentStatus, string> = {
  [TournamentStatus.akanDatang]: "Akan Datang",
  [TournamentStatus.berlangsung]: "Berlangsung",
  [TournamentStatus.selesai]: "Selesai",
};

export const matchStatusLabels: Record<MatchStatus, string> = {
  [MatchStatus.dijadwalkan]: "Dijadwalkan",
  [MatchStatus.berlangsung]: "Berlangsung",
  [MatchStatus.selesai]: "Selesai",
};

export function tournamentStatusLabel(status: TournamentStatus): string {
  return tournamentStatusLabels[status] ?? "Tidak diketahui";
}

export function matchStatusLabel(status: MatchStatus): string {
  return matchStatusLabels[status] ?? "Tidak diketahui";
}

export function formatScore(scoreA?: bigint, scoreB?: bigint): string {
  if (scoreA === undefined || scoreB === undefined) return "vs";
  return `${scoreA.toString()} – ${scoreB.toString()}`;
}
