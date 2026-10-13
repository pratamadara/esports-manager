import { c as createLucideIcon, j as jsxRuntimeExports, B as Button, L as Link, S as Swords } from "./index-jTlOkBZI.js";
import { E as EmptyState, f as formatPrizePool, a as formatNumber } from "./format-D6UPf0rn.js";
import { S as StatusBadge } from "./StatusBadge-CP8sgRJd.js";
import { C as Card, a as CardHeader, b as CardTitle, c as CardContent } from "./card-Qdusxlrz.js";
import { S as Skeleton } from "./skeleton-gNCiuuGS.js";
import { u as useTournaments, a as useTeams } from "./api-CChFdPeg.js";
import { T as Trophy } from "./trophy-DD0fy1fH.js";
import { U as Users } from "./users-BBJwGzXS.js";
import { G as Gamepad2 } from "./gamepad-2-B43dl_oV.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M5 12h14", key: "1ays0h" }],
  ["path", { d: "m12 5 7 7-7 7", key: "xquz4c" }]
];
const ArrowRight = createLucideIcon("arrow-right", __iconNode);
const PREVIEW_LIMIT = 3;
const tournamentSkeletonIds = Array.from(
  { length: PREVIEW_LIMIT },
  (_, index) => `tournament-preview-${index}`
);
const teamSkeletonIds = Array.from(
  { length: PREVIEW_LIMIT },
  (_, index) => `team-preview-${index}`
);
function SectionHeading({
  eyebrow,
  title,
  to,
  linkLabel
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-end justify-between gap-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-xs uppercase tracking-[0.2em] text-primary", children: eyebrow }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mt-1 font-display text-xl font-bold tracking-tight text-foreground sm:text-2xl", children: title })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, variant: "ghost", size: "sm", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to, children: [
      linkLabel,
      /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "h-4 w-4", "aria-hidden": "true" })
    ] }) })
  ] });
}
function TournamentPreviewCard({
  tournament,
  index
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Link,
    {
      to: "/turnamen/$id",
      params: { id: tournament.id.toString() },
      "data-ocid": `home.tournament.item.${index + 1}`,
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
    }
  );
}
function TeamPreviewCard({ team, index }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Link,
    {
      to: "/tim/$id",
      params: { id: team.id.toString() },
      "data-ocid": `home.team.item.${index + 1}`,
      className: "group block rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "flex h-full flex-col gap-4 rounded-lg border border-border bg-card p-5 shadow-none transition-smooth group-hover:border-primary/50 group-hover:bg-card/80", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-4", children: [
          team.logoUrl.trim() !== "" ? /* @__PURE__ */ jsxRuntimeExports.jsx(
            "img",
            {
              src: team.logoUrl,
              alt: `Logo ${team.name}`,
              loading: "lazy",
              className: "h-12 w-12 shrink-0 rounded-md border border-border bg-muted object-cover"
            }
          ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              "aria-hidden": "true",
              className: "flex h-12 w-12 shrink-0 items-center justify-center rounded-md border border-border bg-muted font-display text-lg font-bold text-muted-foreground",
              children: team.name.trim().charAt(0).toUpperCase() || "?"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "truncate font-display text-base font-semibold text-foreground", children: team.name }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-1 flex items-center gap-1.5 truncate text-xs text-muted-foreground", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Gamepad2, { className: "h-3.5 w-3.5 shrink-0", "aria-hidden": "true" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate", children: team.game })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-auto flex items-center justify-between border-t border-border pt-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1.5 font-mono text-xs text-muted-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "h-3.5 w-3.5", "aria-hidden": "true" }),
            formatNumber(team.roster.length),
            " pemain"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-xs uppercase tracking-wider text-primary opacity-0 transition-opacity group-hover:opacity-100", children: "Lihat" })
        ] })
      ] })
    }
  );
}
function PreviewSkeleton() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-40 rounded-lg" });
}
function Home() {
  const { data: tournaments, isPending: tournamentsPending } = useTournaments();
  const { data: teams, isPending: teamsPending } = useTeams();
  const tournamentPreview = (tournaments ?? []).slice(0, PREVIEW_LIMIT);
  const teamPreview = (teams ?? []).slice(0, PREVIEW_LIMIT);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container py-10", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "section",
      {
        "data-ocid": "home.hero",
        className: "relative overflow-hidden rounded-xl border border-border bg-card px-6 py-12 sm:px-10 sm:py-16",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              "aria-hidden": "true",
              className: "pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-primary/10 blur-3xl"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative max-w-2xl", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-xs uppercase tracking-[0.2em] text-primary", children: "Arena ID" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "mt-3 font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl", children: "Pusat Komando Turnamen Esports" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4 text-sm text-muted-foreground sm:text-base", children: "Jelajahi turnamen dan tim esports dalam satu katalog. Saring berdasarkan game dan status, lalu buka detailnya untuk melihat susunan dan pertandingan." }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-8 flex flex-col gap-3 sm:flex-row", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, size: "lg", "data-ocid": "home.tournaments_link", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/turnamen", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Trophy, { className: "h-4 w-4", "aria-hidden": "true" }),
                "Jelajahi Turnamen"
              ] }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  asChild: true,
                  size: "lg",
                  variant: "outline",
                  "data-ocid": "home.teams_link",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/tim", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "h-4 w-4", "aria-hidden": "true" }),
                    "Lihat Tim"
                  ] })
                }
              )
            ] })
          ] })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mt-12", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        SectionHeading,
        {
          eyebrow: "Katalog",
          title: "Turnamen Terbaru",
          to: "/turnamen",
          linkLabel: "Semua Turnamen"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-6", children: tournamentsPending ? /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          "data-ocid": "home.tournaments_loading",
          className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-3",
          children: tournamentSkeletonIds.map((id) => /* @__PURE__ */ jsxRuntimeExports.jsx(PreviewSkeleton, {}, id))
        }
      ) : tournamentPreview.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(
        EmptyState,
        {
          icon: Trophy,
          title: "Belum ada turnamen",
          description: "Turnamen akan muncul di sini setelah penyelenggara menambahkannya ke katalog."
        }
      ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          "data-ocid": "home.tournaments_list",
          className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-3",
          children: tournamentPreview.map((tournament, index) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            TournamentPreviewCard,
            {
              tournament,
              index
            },
            tournament.id.toString()
          ))
        }
      ) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mt-12", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        SectionHeading,
        {
          eyebrow: "Katalog",
          title: "Tim Terbaru",
          to: "/tim",
          linkLabel: "Semua Tim"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-6", children: teamsPending ? /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          "data-ocid": "home.teams_loading",
          className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-3",
          children: teamSkeletonIds.map((id) => /* @__PURE__ */ jsxRuntimeExports.jsx(PreviewSkeleton, {}, id))
        }
      ) : teamPreview.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(
        EmptyState,
        {
          icon: Swords,
          title: "Belum ada tim",
          description: "Tim akan muncul di sini setelah ditambahkan ke katalog."
        }
      ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          "data-ocid": "home.teams_list",
          className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-3",
          children: teamPreview.map((team, index) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            TeamPreviewCard,
            {
              team,
              index
            },
            team.id.toString()
          ))
        }
      ) })
    ] })
  ] });
}
export {
  Home as default
};
