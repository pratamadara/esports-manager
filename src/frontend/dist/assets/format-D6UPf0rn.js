import { c as createLucideIcon, j as jsxRuntimeExports, e as cn, T as TournamentStatus, M as MatchStatus } from "./index-jTlOkBZI.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["polyline", { points: "22 12 16 12 14 15 10 15 8 12 2 12", key: "o97t9d" }],
  [
    "path",
    {
      d: "M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z",
      key: "oot6mr"
    }
  ]
];
const Inbox = createLucideIcon("inbox", __iconNode);
function EmptyState({
  title,
  description,
  icon: Icon = Inbox,
  action,
  className
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      "data-ocid": "empty_state",
      className: cn(
        "flex flex-col items-center justify-center rounded-lg border border-dashed border-border bg-card/50 px-6 py-16 text-center",
        className
      ),
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-4 flex h-14 w-14 items-center justify-center rounded-full border border-border bg-muted", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-6 w-6 text-muted-foreground", "aria-hidden": "true" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-lg font-semibold text-foreground", children: title }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1.5 max-w-md text-sm text-muted-foreground", children: description }),
        action ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-6", children: action }) : null
      ]
    }
  );
}
function timestampToDate(timestamp) {
  if (timestamp === void 0) return null;
  const date = new Date(Number(timestamp / 1000000n));
  return Number.isNaN(date.getTime()) ? null : date;
}
const dateFormatter = new Intl.DateTimeFormat("id-ID", {
  day: "numeric",
  month: "long",
  year: "numeric"
});
const dateTimeFormatter = new Intl.DateTimeFormat("id-ID", {
  day: "numeric",
  month: "short",
  year: "numeric",
  hour: "2-digit",
  minute: "2-digit"
});
const numberFormatter = new Intl.NumberFormat("id-ID");
function formatDate(timestamp) {
  const date = timestampToDate(timestamp);
  return date ? dateFormatter.format(date) : "Jadwal belum ditentukan";
}
function formatDateTime(timestamp) {
  const date = timestampToDate(timestamp);
  return date ? dateTimeFormatter.format(date) : "Belum dijadwalkan";
}
function formatNumber(value) {
  return numberFormatter.format(value);
}
function formatPrizePool(prizePool) {
  const trimmed = prizePool.trim();
  if (trimmed === "") return "Hadiah belum diumumkan";
  return trimmed;
}
const tournamentStatusLabels = {
  [TournamentStatus.akanDatang]: "Akan Datang",
  [TournamentStatus.berlangsung]: "Berlangsung",
  [TournamentStatus.selesai]: "Selesai"
};
const matchStatusLabels = {
  [MatchStatus.dijadwalkan]: "Dijadwalkan",
  [MatchStatus.berlangsung]: "Berlangsung",
  [MatchStatus.selesai]: "Selesai"
};
function tournamentStatusLabel(status) {
  return tournamentStatusLabels[status] ?? "Tidak diketahui";
}
function matchStatusLabel(status) {
  return matchStatusLabels[status] ?? "Tidak diketahui";
}
function formatScore(scoreA, scoreB) {
  if (scoreA === void 0 || scoreB === void 0) return "vs";
  return `${scoreA.toString()} – ${scoreB.toString()}`;
}
export {
  EmptyState as E,
  formatNumber as a,
  formatDate as b,
  formatScore as c,
  formatDateTime as d,
  tournamentStatusLabel as e,
  formatPrizePool as f,
  matchStatusLabel as m,
  tournamentStatusLabels as t
};
