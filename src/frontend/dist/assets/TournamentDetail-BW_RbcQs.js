import { c as createLucideIcon, b as useParams, j as jsxRuntimeExports, B as Button, L as Link, s as sanitizeHtml, d as ue, M as MatchStatus, e as cn } from "./index-jTlOkBZI.js";
import { E as EmptyState, f as formatPrizePool, a as formatNumber, b as formatDate, c as formatScore, d as formatDateTime } from "./format-D6UPf0rn.js";
import { P as PageHeader } from "./PageHeader-CIKRaHnN.js";
import { S as StatusBadge } from "./StatusBadge-CP8sgRJd.js";
import { C as Card, c as CardContent } from "./card-Qdusxlrz.js";
import { S as Skeleton } from "./skeleton-gNCiuuGS.js";
import { b as useTournament, a as useTeams, c as useMatches } from "./api-CChFdPeg.js";
import { T as Trophy } from "./trophy-DD0fy1fH.js";
import { G as Gamepad2 } from "./gamepad-2-B43dl_oV.js";
import { U as Users } from "./users-BBJwGzXS.js";
import { C as CalendarClock } from "./calendar-clock-B1_9Ne1v.js";
import { C as Check } from "./check-CueTr-9O.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["polyline", { points: "12 6 12 12 16 14", key: "68esgv" }]
];
const Clock = createLucideIcon("clock", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  [
    "path",
    {
      d: "M12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83z",
      key: "zw3jo"
    }
  ],
  [
    "path",
    {
      d: "M2 12a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 12",
      key: "1wduqc"
    }
  ],
  [
    "path",
    {
      d: "M2 17a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 17",
      key: "kqbvx6"
    }
  ]
];
const Layers = createLucideIcon("layers", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["circle", { cx: "18", cy: "5", r: "3", key: "gq8acd" }],
  ["circle", { cx: "6", cy: "12", r: "3", key: "w7nqdw" }],
  ["circle", { cx: "18", cy: "19", r: "3", key: "1xt0gg" }],
  ["line", { x1: "8.59", x2: "15.42", y1: "13.51", y2: "17.49", key: "47mynk" }],
  ["line", { x1: "15.41", x2: "8.59", y1: "6.51", y2: "10.49", key: "1n3mei" }]
];
const Share2 = createLucideIcon("share-2", __iconNode);
function MetaItem({
  icon: Icon,
  label,
  value
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3 rounded-lg border border-border bg-card/60 px-4 py-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-border bg-muted", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-4 w-4 text-primary", "aria-hidden": "true" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground", children: label }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-0.5 truncate font-display text-sm font-semibold text-foreground", children: value })
    ] })
  ] });
}
function SectionHeading({
  icon: Icon,
  title,
  count
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-4 flex items-center gap-2.5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-4 w-4 text-primary", "aria-hidden": "true" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-lg font-semibold tracking-tight text-foreground", children: title }),
    count !== void 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "rounded-full border border-border bg-muted px-2 py-0.5 font-mono text-[11px] text-muted-foreground", children: formatNumber(count) }) : null
  ] });
}
function TeamCard({ team }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    Link,
    {
      to: "/tim/$id",
      params: { id: team.id.toString() },
      "data-ocid": "tournament.team_link",
      className: "group flex items-center gap-3 rounded-lg border border-border bg-card px-4 py-3 transition-smooth hover:border-primary/50 hover:bg-card/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-md border border-border bg-muted font-display text-sm font-bold text-primary", children: team.logoUrl ? /* @__PURE__ */ jsxRuntimeExports.jsx(
          "img",
          {
            src: team.logoUrl,
            alt: "",
            className: "h-full w-full object-cover",
            loading: "lazy"
          }
        ) : team.name.charAt(0).toUpperCase() }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "truncate font-display text-sm font-semibold text-foreground group-hover:text-primary", children: team.name }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "truncate font-mono text-[11px] uppercase tracking-wider text-muted-foreground", children: team.game })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "shrink-0 font-mono text-[11px] text-muted-foreground", children: [
          formatNumber(team.roster.length),
          " pemain"
        ] })
      ]
    }
  );
}
function MatchRow({
  match,
  teamName
}) {
  const nameA = teamName(match.teamAId);
  const nameB = teamName(match.teamBId);
  const hasScore = match.scoreA !== void 0 && match.scoreB !== void 0;
  const isFinished = match.status === MatchStatus.selesai;
  const winnerIsA = match.winnerId !== void 0 && match.teamAId !== void 0 && match.winnerId === match.teamAId;
  const winnerIsB = match.winnerId !== void 0 && match.teamBId !== void 0 && match.winnerId === match.teamBId;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      "data-ocid": "tournament.match_item",
      className: "flex flex-col gap-3 rounded-lg border border-border bg-card px-4 py-3 sm:flex-row sm:items-center sm:justify-between",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex min-w-0 flex-1 items-center gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "span",
            {
              className: cn(
                "flex min-w-0 flex-1 items-center justify-end gap-1.5 truncate text-right font-display text-sm",
                winnerIsA ? "font-bold text-foreground" : "text-muted-foreground"
              ),
              children: [
                winnerIsA ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Check,
                  {
                    className: "h-3.5 w-3.5 shrink-0 text-primary",
                    "aria-hidden": "true"
                  }
                ) : null,
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate", children: nameA })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "shrink-0 rounded-md border border-border bg-muted px-2.5 py-1 font-mono text-xs font-semibold tabular-nums text-foreground", children: hasScore ? formatScore(match.scoreA, match.scoreB) : "vs" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "span",
            {
              className: cn(
                "flex min-w-0 flex-1 items-center gap-1.5 truncate font-display text-sm",
                winnerIsB ? "font-bold text-foreground" : "text-muted-foreground"
              ),
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate", children: nameB }),
                winnerIsB ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Check,
                  {
                    className: "h-3.5 w-3.5 shrink-0 text-primary",
                    "aria-hidden": "true"
                  }
                ) : null
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex shrink-0 items-center gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1.5 font-mono text-[11px] text-muted-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "h-3 w-3", "aria-hidden": "true" }),
            formatDateTime(match.scheduledAt)
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { status: match.status }),
          isFinished && match.winnerId === void 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-[11px] text-muted-foreground", children: "Tanpa pemenang" }) : null
        ] })
      ]
    }
  );
}
function DetailSkeleton() {
  const ids = Array.from({ length: 4 }, (_, i) => `detail-skeleton-${i}`);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { "data-ocid": "loading_state", className: "container py-10", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-6 w-32" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "mt-3 h-9 w-72" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "mt-3 h-4 w-full max-w-2xl" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4", children: ids.map((id) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-20 rounded-lg" }, id)) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-10 grid gap-8 lg:grid-cols-[1.6fr_1fr]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: ids.map((id) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-16 rounded-lg" }, `left-${id}`)) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: ids.map((id) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-16 rounded-lg" }, `right-${id}`)) })
    ] })
  ] });
}
function TournamentDetail() {
  const { id } = useParams({ from: "/turnamen/$id" });
  const tournamentId = BigInt(id);
  const tournamentQuery = useTournament(tournamentId);
  const teamsQuery = useTeams();
  const matchesQuery = useMatches(tournamentId);
  const tournament = tournamentQuery.data;
  const allTeams = teamsQuery.data ?? [];
  const matches = matchesQuery.data ?? [];
  const teamById = new Map(allTeams.map((team) => [team.id.toString(), team]));
  const teamName = (teamId) => {
    var _a;
    if (teamId === void 0) return "TBD";
    return ((_a = teamById.get(teamId.toString())) == null ? void 0 : _a.name) ?? `Tim #${teamId.toString()}`;
  };
  const participatingTeams = tournament ? tournament.teamIds.map((teamId) => teamById.get(teamId.toString())).filter((team) => team !== void 0) : [];
  const matchesByRound = matches.reduce(
    (acc, match) => {
      const round = match.round.trim() === "" ? "Babak" : match.round;
      const bucket = acc.get(round);
      if (bucket) {
        bucket.push(match);
      } else {
        acc.set(round, [match]);
      }
      return acc;
    },
    /* @__PURE__ */ new Map()
  );
  const handleShare = async () => {
    const url = window.location.href;
    try {
      await navigator.clipboard.writeText(url);
      ue.success("Tautan turnamen disalin", {
        description: "Bagikan tautan ini kepada tim peserta."
      });
    } catch {
      ue.error("Gagal menyalin tautan", {
        description: "Salin tautan dari bilah alamat peramban Anda."
      });
    }
  };
  if (tournamentQuery.isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(DetailSkeleton, {});
  }
  if (tournamentQuery.isError) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container py-10", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      EmptyState,
      {
        icon: Trophy,
        title: "Gagal memuat turnamen",
        description: "Terjadi kesalahan saat mengambil data turnamen. Coba muat ulang halaman.",
        action: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            type: "button",
            "data-ocid": "tournament.retry_button",
            onClick: () => void tournamentQuery.refetch(),
            children: "Coba lagi"
          }
        )
      }
    ) });
  }
  if (!tournament) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container py-10", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      EmptyState,
      {
        icon: Trophy,
        title: "Turnamen tidak ditemukan",
        description: `Tidak ada turnamen dengan ID #${id}. Turnamen mungkin telah dihapus.`,
        action: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "button", asChild: true, "data-ocid": "tournament.back_button", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/turnamen", children: "Kembali ke katalog" }) })
      }
    ) });
  }
  const rounds = Array.from(matchesByRound.entries());
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { "data-ocid": "tournament.page", className: "container py-10", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      PageHeader,
      {
        eyebrow: "Turnamen",
        title: tournament.name,
        description: tournament.game,
        actions: /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { status: tournament.status }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              type: "button",
              variant: "outline",
              size: "sm",
              "data-ocid": "tournament.share_button",
              onClick: () => void handleShare(),
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Share2, { className: "h-4 w-4", "aria-hidden": "true" }),
                "Bagikan"
              ]
            }
          )
        ] })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(MetaItem, { icon: Gamepad2, label: "Game", value: tournament.game }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(MetaItem, { icon: Layers, label: "Format", value: tournament.format }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        MetaItem,
        {
          icon: Trophy,
          label: "Prize Pool",
          value: formatPrizePool(tournament.prizePool)
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        MetaItem,
        {
          icon: Users,
          label: "Tim Peserta",
          value: `${formatNumber(participatingTeams.length)} tim`
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-10 grid gap-10 lg:grid-cols-[1.6fr_1fr]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-10", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { "data-ocid": "tournament.description_section", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(SectionHeading, { icon: Trophy, title: "Deskripsi" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "rounded-lg border-border bg-card shadow-none", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "pt-0", children: tournament.description.trim() === "" ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm leading-relaxed text-muted-foreground", children: "Penyelenggara belum menambahkan deskripsi untuk turnamen ini." }) : /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              "data-ocid": "tournament.description",
              className: "text-sm leading-relaxed text-muted-foreground [&_a]:text-primary [&_a]:underline [&_b]:font-semibold [&_b]:text-foreground [&_i]:italic [&_ol]:list-decimal [&_ol]:pl-5 [&_p]:mb-2 [&_p:last-child]:mb-0 [&_strong]:font-semibold [&_strong]:text-foreground [&_ul]:list-disc [&_ul]:pl-5",
              dangerouslySetInnerHTML: {
                __html: sanitizeHtml(tournament.description)
              }
            }
          ) }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { "data-ocid": "tournament.schedule_section", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            SectionHeading,
            {
              icon: CalendarClock,
              title: "Jadwal",
              count: tournament.schedule.length
            }
          ),
          tournament.schedule.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(
            EmptyState,
            {
              icon: CalendarClock,
              title: "Jadwal belum tersedia",
              description: "Penyelenggara belum menambahkan rangkaian jadwal untuk turnamen ini."
            }
          ) : /* @__PURE__ */ jsxRuntimeExports.jsx("ol", { className: "relative space-y-3 border-l border-border pl-6", children: tournament.schedule.map((entry) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "li",
            {
              "data-ocid": "tournament.schedule_item",
              className: "relative",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    className: "absolute -left-[1.9rem] top-4 h-2.5 w-2.5 rounded-full border-2 border-background bg-primary",
                    "aria-hidden": "true"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg border border-border bg-card px-4 py-3", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display text-sm font-semibold text-foreground", children: entry.caption }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-1 font-mono text-[11px] uppercase tracking-wider text-muted-foreground", children: [
                    formatDate(entry.startAt),
                    " — ",
                    formatDate(entry.endAt)
                  ] })
                ] })
              ]
            },
            entry.id.toString()
          )) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { "data-ocid": "tournament.bracket_section", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            SectionHeading,
            {
              icon: Layers,
              title: "Bagan Pertandingan",
              count: matches.length
            }
          ),
          matches.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(
            EmptyState,
            {
              icon: Layers,
              title: "Bagan belum disusun",
              description: "Belum ada pertandingan yang dijadwalkan untuk turnamen ini."
            }
          ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-6", children: rounds.map(([round, roundMatches]) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { "data-ocid": "tournament.round_group", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-2.5 flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-[11px] uppercase tracking-[0.18em] text-primary", children: round }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: "h-px flex-1 bg-border",
                  "aria-hidden": "true"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-mono text-[11px] text-muted-foreground", children: [
                formatNumber(roundMatches.length),
                " laga"
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: roundMatches.map((match) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              MatchRow,
              {
                match,
                teamName
              },
              match.id.toString()
            )) })
          ] }, round)) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("aside", { "data-ocid": "tournament.teams_section", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          SectionHeading,
          {
            icon: Users,
            title: "Tim Peserta",
            count: participatingTeams.length
          }
        ),
        participatingTeams.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(
          EmptyState,
          {
            icon: Users,
            title: "Belum ada tim peserta",
            description: "Penyelenggara belum mendaftarkan tim ke turnamen ini."
          }
        ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2.5", children: participatingTeams.map((team) => /* @__PURE__ */ jsxRuntimeExports.jsx(TeamCard, { team }, team.id.toString())) })
      ] })
    ] })
  ] });
}
export {
  TournamentDetail as default
};
