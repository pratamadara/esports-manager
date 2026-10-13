import { u as useSearch, a as useNavigate, r as reactExports, j as jsxRuntimeExports, B as Button, L as Link } from "./index-jTlOkBZI.js";
import { E as EmptyState, a as formatNumber } from "./format-D6UPf0rn.js";
import { P as PageHeader } from "./PageHeader-CIKRaHnN.js";
import { S as SearchInput, a as Search } from "./SearchInput-BTtnsRTC.js";
import { C as Card } from "./card-Qdusxlrz.js";
import { S as Skeleton } from "./skeleton-gNCiuuGS.js";
import { a as useTeams } from "./api-CChFdPeg.js";
import { G as Gamepad2 } from "./gamepad-2-B43dl_oV.js";
import { U as Users } from "./users-BBJwGzXS.js";
import "./input-DlJjTPCB.js";
function readSearch(search) {
  return {
    q: typeof search.q === "string" ? search.q : "",
    game: typeof search.game === "string" ? search.game : ""
  };
}
function TeamLogo({ team }) {
  if (team.logoUrl.trim() !== "") {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      "img",
      {
        src: team.logoUrl,
        alt: `Logo ${team.name}`,
        loading: "lazy",
        className: "h-12 w-12 shrink-0 rounded-md border border-border bg-muted object-cover"
      }
    );
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      "aria-hidden": "true",
      className: "flex h-12 w-12 shrink-0 items-center justify-center rounded-md border border-border bg-muted font-display text-lg font-bold text-muted-foreground",
      children: team.name.trim().charAt(0).toUpperCase() || "?"
    }
  );
}
function TeamCard({ team, index }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Link,
    {
      to: "/tim/$id",
      params: { id: team.id.toString() },
      "data-ocid": `team.item.${index + 1}`,
      className: "group block rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "flex h-full flex-col gap-4 rounded-lg border border-border bg-card p-5 shadow-none transition-smooth group-hover:border-primary/50 group-hover:bg-card/80", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(TeamLogo, { team }),
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
function TeamCardSkeleton() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "flex h-full flex-col gap-4 rounded-lg border border-border bg-card p-5 shadow-none", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-12 w-12 rounded-md" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 space-y-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-3/4" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-3 w-1/2" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-24" })
  ] });
}
function Teams() {
  const search = useSearch({ strict: false });
  const navigate = useNavigate();
  const { q, game } = readSearch(search);
  const { data: teams, isLoading } = useTeams();
  const games = reactExports.useMemo(() => {
    const set = /* @__PURE__ */ new Set();
    for (const team of teams ?? []) {
      if (team.game.trim() !== "") set.add(team.game);
    }
    return Array.from(set).sort((a, b) => a.localeCompare(b, "id"));
  }, [teams]);
  const filtered = reactExports.useMemo(() => {
    const query = (q ?? "").trim().toLowerCase();
    return (teams ?? []).filter((team) => {
      const matchesName = query === "" || team.name.toLowerCase().includes(query);
      const matchesGame = (game ?? "") === "" || team.game === game;
      return matchesName && matchesGame;
    });
  }, [teams, q, game]);
  function updateSearch(next) {
    void navigate({
      to: "/tim",
      search: (prev) => ({
        ...prev,
        ...next
      }),
      replace: true
    });
  }
  const hasFilters = (q ?? "") !== "" || (game ?? "") !== "";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container py-10", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      PageHeader,
      {
        eyebrow: "Katalog",
        title: "Tim",
        description: "Jelajahi tim esports yang terdaftar, cari berdasarkan nama, dan saring menurut game."
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        SearchInput,
        {
          value: q ?? "",
          onChange: (value) => updateSearch({ q: value }),
          placeholder: "Cari nama tim…",
          className: "w-full lg:max-w-sm"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          "data-ocid": "team.filter.tab",
          className: "flex flex-wrap items-center gap-2",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                type: "button",
                variant: (game ?? "") === "" ? "default" : "outline",
                size: "sm",
                onClick: () => updateSearch({ game: "" }),
                children: "Semua Game"
              }
            ),
            games.map((item) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                type: "button",
                variant: game === item ? "default" : "outline",
                size: "sm",
                onClick: () => updateSearch({ game: item }),
                children: item
              },
              item
            ))
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-8", children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        "data-ocid": "loading_state",
        className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
        children: Array.from({ length: 8 }, (_, i) => `team-skeleton-${i}`).map(
          (id) => /* @__PURE__ */ jsxRuntimeExports.jsx(TeamCardSkeleton, {}, id)
        )
      }
    ) : filtered.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(
      EmptyState,
      {
        icon: Search,
        title: hasFilters ? "Tidak ada tim yang cocok" : "Belum ada tim",
        description: hasFilters ? "Coba ubah kata kunci pencarian atau pilih game lain untuk menemukan tim." : "Belum ada tim yang terdaftar. Tim akan muncul di sini setelah ditambahkan.",
        action: hasFilters ? /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            type: "button",
            variant: "outline",
            onClick: () => updateSearch({ q: "", game: "" }),
            children: "Hapus Filter"
          }
        ) : void 0
      }
    ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4", children: filtered.map((team, index) => /* @__PURE__ */ jsxRuntimeExports.jsx(TeamCard, { team, index }, team.id.toString())) }) })
  ] });
}
export {
  Teams as default
};
