import { c as createLucideIcon, u as useSearch, a as useNavigate, r as reactExports, j as jsxRuntimeExports, T as TournamentStatus, B as Button, L as Link } from "./index-jTlOkBZI.js";
import { t as tournamentStatusLabels, E as EmptyState, f as formatPrizePool } from "./format-D6UPf0rn.js";
import { P as PageHeader } from "./PageHeader-CIKRaHnN.js";
import { S as SearchInput } from "./SearchInput-BTtnsRTC.js";
import { S as StatusBadge } from "./StatusBadge-CP8sgRJd.js";
import { C as Card, a as CardHeader, b as CardTitle, c as CardContent } from "./card-Qdusxlrz.js";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-BydKGdbU.js";
import { S as Skeleton } from "./skeleton-gNCiuuGS.js";
import { u as useTournaments } from "./api-CChFdPeg.js";
import { G as Gamepad2 } from "./gamepad-2-B43dl_oV.js";
import { T as Trophy } from "./trophy-DD0fy1fH.js";
import "./input-DlJjTPCB.js";
import "./check-CueTr-9O.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8", key: "1357e3" }],
  ["path", { d: "M3 3v5h5", key: "1xhq8a" }]
];
const RotateCcw = createLucideIcon("rotate-ccw", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "m13.5 8.5-5 5", key: "1cs55j" }],
  ["path", { d: "m8.5 8.5 5 5", key: "a8mexj" }],
  ["circle", { cx: "11", cy: "11", r: "8", key: "4ej97u" }],
  ["path", { d: "m21 21-4.3-4.3", key: "1qie3q" }]
];
const SearchX = createLucideIcon("search-x", __iconNode);
const ALL = "semua";
const statusOptions = [
  { value: ALL, label: "Semua Status" },
  {
    value: TournamentStatus.akanDatang,
    label: tournamentStatusLabels[TournamentStatus.akanDatang]
  },
  {
    value: TournamentStatus.berlangsung,
    label: tournamentStatusLabels[TournamentStatus.berlangsung]
  },
  {
    value: TournamentStatus.selesai,
    label: tournamentStatusLabels[TournamentStatus.selesai]
  }
];
const skeletonIds = Array.from(
  { length: 6 },
  (_, index) => `tournament-skeleton-${index}`
);
function Tournaments() {
  const { data: tournaments, isPending } = useTournaments();
  const search = useSearch({ from: "/turnamen" });
  const navigate = useNavigate({ from: "/turnamen" });
  const query = search.q ?? "";
  const gameFilter = search.game ?? ALL;
  const statusFilter = search.status ?? ALL;
  const games = reactExports.useMemo(() => {
    const unique = /* @__PURE__ */ new Set();
    for (const tournament of tournaments ?? []) {
      if (tournament.game.trim() !== "") unique.add(tournament.game);
    }
    return Array.from(unique).sort((a, b) => a.localeCompare(b));
  }, [tournaments]);
  const filtered = reactExports.useMemo(() => {
    const needle = query.trim().toLowerCase();
    return (tournaments ?? []).filter((tournament) => {
      if (needle !== "" && !tournament.name.toLowerCase().includes(needle)) {
        return false;
      }
      if (gameFilter !== ALL && tournament.game !== gameFilter) return false;
      if (statusFilter !== ALL && tournament.status !== statusFilter) {
        return false;
      }
      return true;
    });
  }, [tournaments, query, gameFilter, statusFilter]);
  const hasActiveFilters = query !== "" || gameFilter !== ALL || statusFilter !== ALL;
  function setFilter(patch) {
    void navigate({ search: (prev) => ({ ...prev, ...patch }), replace: true });
  }
  function clearFilters() {
    void navigate({ search: {}, replace: true });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container py-10", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      PageHeader,
      {
        eyebrow: "Katalog",
        title: "Turnamen",
        description: "Jelajahi turnamen esports, saring berdasarkan game dan status, lalu bagikan tautannya."
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 flex flex-col gap-3 lg:flex-row lg:items-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        SearchInput,
        {
          id: "tournament-search",
          value: query,
          onChange: (value) => setFilter({ q: value }),
          placeholder: "Cari nama turnamen…",
          className: "lg:max-w-sm"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-3 sm:flex-row", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Select,
          {
            value: gameFilter,
            onValueChange: (value) => setFilter({ game: value }),
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                SelectTrigger,
                {
                  "data-ocid": "tournament.game_select",
                  className: "w-full sm:w-52",
                  "aria-label": "Filter game",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Semua Game" })
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: ALL, children: "Semua Game" }),
                games.map((game) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: game, children: game }, game))
              ] })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Select,
          {
            value: statusFilter,
            onValueChange: (value) => setFilter({ status: value }),
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                SelectTrigger,
                {
                  "data-ocid": "tournament.status_select",
                  className: "w-full sm:w-52",
                  "aria-label": "Filter status",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Semua Status" })
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: statusOptions.map((option) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: option.value, children: option.label }, option.value)) })
            ]
          }
        ),
        hasActiveFilters ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            type: "button",
            variant: "ghost",
            "data-ocid": "tournament.clear_button",
            onClick: clearFilters,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(RotateCcw, { className: "h-4 w-4", "aria-hidden": "true" }),
              "Reset"
            ]
          }
        ) : null
      ] })
    ] }),
    !isPending && tournaments ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "p",
      {
        "data-ocid": "tournament.results_count",
        className: "mt-6 font-mono text-xs uppercase tracking-wider text-muted-foreground",
        children: [
          filtered.length,
          " dari ",
          tournaments.length,
          " turnamen"
        ]
      }
    ) : null,
    isPending ? /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        "data-ocid": "tournament.loading_state",
        className: "mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3",
        children: skeletonIds.map((id) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-44 rounded-lg" }, id))
      }
    ) : filtered.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(
      EmptyState,
      {
        className: "mt-6",
        icon: SearchX,
        title: "Tidak ada turnamen yang cocok",
        description: hasActiveFilters ? "Coba ubah kata kunci atau reset filter untuk melihat semua turnamen." : "Belum ada turnamen yang terdaftar. Turnamen baru akan muncul di sini setelah penyelenggara menambahkannya.",
        action: hasActiveFilters ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            type: "button",
            variant: "outline",
            "data-ocid": "tournament.empty_reset_button",
            onClick: clearFilters,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(RotateCcw, { className: "h-4 w-4", "aria-hidden": "true" }),
              "Reset Filter"
            ]
          }
        ) : void 0
      }
    ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        "data-ocid": "tournament.list",
        className: "mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3",
        children: filtered.map((tournament, index) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          Link,
          {
            to: "/turnamen/$id",
            params: { id: tournament.id.toString() },
            "data-ocid": `tournament.item.${index + 1}`,
            className: "group block rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "h-full rounded-lg border-border bg-card shadow-none transition-smooth group-hover:border-primary/50 group-hover:shadow-elevated", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "gap-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "min-w-0 font-display text-base font-semibold leading-snug text-foreground", children: tournament.name }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { status: tournament.status })
              ] }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "flex flex-col gap-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted-foreground", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1.5", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Gamepad2, { className: "h-4 w-4", "aria-hidden": "true" }),
                    tournament.game
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1.5", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Trophy, { className: "h-4 w-4", "aria-hidden": "true" }),
                    formatPrizePool(tournament.prizePool)
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-mono text-xs uppercase tracking-wider text-muted-foreground", children: [
                  "Format: ",
                  tournament.format
                ] })
              ] })
            ] })
          },
          tournament.id.toString()
        ))
      }
    )
  ] });
}
export {
  Tournaments as default
};
