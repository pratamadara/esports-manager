import { c as createLucideIcon, b as useParams, j as jsxRuntimeExports, B as Button, L as Link } from "./index-jTlOkBZI.js";
import { E as EmptyState, b as formatDate, f as formatPrizePool } from "./format-D6UPf0rn.js";
import { P as PageHeader } from "./PageHeader-CIKRaHnN.js";
import { S as StatusBadge } from "./StatusBadge-CP8sgRJd.js";
import { C as Card, c as CardContent } from "./card-Qdusxlrz.js";
import { d as useTeam, u as useTournaments } from "./api-CChFdPeg.js";
import { U as Users } from "./users-BBJwGzXS.js";
import { G as Gamepad2 } from "./gamepad-2-B43dl_oV.js";
import { T as Trophy } from "./trophy-DD0fy1fH.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M8 2v4", key: "1cmpym" }],
  ["path", { d: "M16 2v4", key: "4m81vk" }],
  ["rect", { width: "18", height: "18", x: "3", y: "4", rx: "2", key: "1hopcy" }],
  ["path", { d: "M3 10h18", key: "8toen8" }],
  ["path", { d: "M8 14h.01", key: "6423bh" }],
  ["path", { d: "M12 14h.01", key: "1etili" }],
  ["path", { d: "M16 14h.01", key: "1gbofw" }],
  ["path", { d: "M8 18h.01", key: "lrp35t" }],
  ["path", { d: "M12 18h.01", key: "mhygvu" }],
  ["path", { d: "M16 18h.01", key: "kzsmim" }]
];
const CalendarDays = createLucideIcon("calendar-days", __iconNode);
function TeamDetail() {
  const { id } = useParams({ from: "/tim/$id" });
  const teamId = BigInt(id);
  const { data: team, isLoading } = useTeam(teamId);
  const { data: tournaments, isLoading: isLoadingTournaments } = useTournaments();
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { "data-ocid": "loading_state", className: "container py-10", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-8 w-64 animate-pulse rounded-md bg-muted" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4 h-4 w-96 animate-pulse rounded-md bg-muted" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3", children: Array.from({ length: 3 }, (_, i) => `skeleton-${i}`).map((key) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-40 animate-pulse rounded-lg bg-muted" }, key)) })
    ] });
  }
  if (!team) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container py-10", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      EmptyState,
      {
        icon: Users,
        title: "Tim tidak ditemukan",
        description: "Tim yang Anda cari mungkin telah dihapus atau tautannya tidak valid.",
        action: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, type: "button", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/tim", children: "Kembali ke daftar tim" }) })
      }
    ) });
  }
  const participatedTournaments = (tournaments ?? []).filter(
    (tournament) => team.tournamentIds.some((tid) => tid === tournament.id)
  );
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container py-10", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      PageHeader,
      {
        eyebrow: "Tim",
        title: team.name,
        description: team.game,
        actions: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, variant: "outline", type: "button", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/tim", children: "Semua Tim" }) })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-8 grid gap-8 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-8", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { "data-ocid": "team.card", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "flex flex-col gap-6 p-6 sm:flex-row sm:items-start", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-border bg-muted", children: team.logoUrl ? /* @__PURE__ */ jsxRuntimeExports.jsx(
            "img",
            {
              src: team.logoUrl,
              alt: `Logo ${team.name}`,
              className: "h-full w-full object-cover",
              onError: (event) => {
                event.currentTarget.style.display = "none";
              }
            }
          ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
            Gamepad2,
            {
              className: "h-8 w-8 text-muted-foreground",
              "aria-hidden": "true"
            }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-xl font-bold text-foreground", children: team.name }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-1 flex items-center gap-2 text-sm text-muted-foreground", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Gamepad2, { className: "h-4 w-4", "aria-hidden": "true" }),
              team.game
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4 whitespace-pre-line text-sm leading-relaxed text-foreground/90", children: team.description || "Belum ada deskripsi untuk tim ini." })
          ] })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { "data-ocid": "team.roster.section", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-4 flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "h-5 w-5 text-primary", "aria-hidden": "true" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-lg font-semibold text-foreground", children: "Roster" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-mono text-xs text-muted-foreground", children: [
              team.roster.length,
              " pemain"
            ] })
          ] }),
          team.roster.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(
            EmptyState,
            {
              icon: Users,
              title: "Roster masih kosong",
              description: "Belum ada pemain yang terdaftar pada tim ini."
            }
          ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
            "ul",
            {
              "data-ocid": "team.roster.list",
              className: "divide-y divide-border overflow-hidden rounded-lg border border-border bg-card",
              children: team.roster.map((player, index) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "li",
                {
                  "data-ocid": `team.roster.item.${index + 1}`,
                  className: "flex items-center justify-between gap-4 px-4 py-3",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "min-w-0 truncate font-medium text-foreground", children: player.name }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "shrink-0 rounded-full border border-border bg-muted px-2.5 py-0.5 font-mono text-[11px] uppercase tracking-wider text-muted-foreground", children: player.role })
                  ]
                },
                player.id.toString()
              ))
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("aside", { "data-ocid": "team.tournaments.section", className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Trophy, { className: "h-5 w-5 text-primary", "aria-hidden": "true" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-lg font-semibold text-foreground", children: "Turnamen Diikuti" })
        ] }),
        isLoadingTournaments ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: Array.from({ length: 2 }, (_, i) => `tskeleton-${i}`).map(
          (key) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "h-28 animate-pulse rounded-lg bg-muted"
            },
            key
          )
        ) }) : participatedTournaments.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(
          EmptyState,
          {
            icon: Trophy,
            title: "Belum mengikuti turnamen",
            description: "Tim ini belum terdaftar pada turnamen apa pun."
          }
        ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: participatedTournaments.map((tournament, index) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Link,
          {
            to: "/turnamen/$id",
            params: { id: tournament.id.toString() },
            "data-ocid": `team.tournament.item.${index + 1}`,
            className: "block rounded-lg border border-border bg-card p-4 transition-smooth hover:border-primary/50 hover:bg-card/80",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "truncate font-display font-semibold text-foreground", children: tournament.name }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-0.5 truncate text-xs text-muted-foreground", children: tournament.game })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { status: tournament.status })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    CalendarDays,
                    {
                      className: "h-3.5 w-3.5",
                      "aria-hidden": "true"
                    }
                  ),
                  formatDate(tournament.createdAt)
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Trophy, { className: "h-3.5 w-3.5", "aria-hidden": "true" }),
                  formatPrizePool(tournament.prizePool)
                ] })
              ] })
            ]
          },
          tournament.id.toString()
        )) })
      ] })
    ] })
  ] });
}
export {
  TeamDetail as default
};
