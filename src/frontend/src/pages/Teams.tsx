import type { Team } from "@/backend";
import { EmptyState } from "@/components/EmptyState";
import { PageHeader } from "@/components/PageHeader";
import { SearchInput } from "@/components/SearchInput";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useTeams } from "@/lib/api";
import { formatNumber } from "@/lib/format";
import { Link, useNavigate, useSearch } from "@tanstack/react-router";
import { Gamepad2, Search, Users } from "lucide-react";
import { useMemo } from "react";

type TeamsSearch = {
  q?: string;
  game?: string;
};

function readSearch(search: Record<string, unknown>): TeamsSearch {
  return {
    q: typeof search.q === "string" ? search.q : "",
    game: typeof search.game === "string" ? search.game : "",
  };
}

function TeamLogo({ team }: { team: Team }) {
  if (team.logoUrl.trim() !== "") {
    return (
      <img
        src={team.logoUrl}
        alt={`Logo ${team.name}`}
        loading="lazy"
        className="h-12 w-12 shrink-0 rounded-md border border-border bg-muted object-cover"
      />
    );
  }
  return (
    <div
      aria-hidden="true"
      className="flex h-12 w-12 shrink-0 items-center justify-center rounded-md border border-border bg-muted font-display text-lg font-bold text-muted-foreground"
    >
      {team.name.trim().charAt(0).toUpperCase() || "?"}
    </div>
  );
}

function TeamCard({ team, index }: { team: Team; index: number }) {
  return (
    <Link
      to="/tim/$id"
      params={{ id: team.id.toString() }}
      data-ocid={`team.item.${index + 1}`}
      className="group block rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
    >
      <Card className="flex h-full flex-col gap-4 rounded-lg border border-border bg-card p-5 shadow-none transition-smooth group-hover:border-primary/50 group-hover:bg-card/80">
        <div className="flex items-start gap-4">
          <TeamLogo team={team} />
          <div className="min-w-0 flex-1">
            <h3 className="truncate font-display text-base font-semibold text-foreground">
              {team.name}
            </h3>
            <p className="mt-1 flex items-center gap-1.5 truncate text-xs text-muted-foreground">
              <Gamepad2 className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
              <span className="truncate">{team.game}</span>
            </p>
          </div>
        </div>
        <div className="mt-auto flex items-center justify-between border-t border-border pt-3">
          <span className="flex items-center gap-1.5 font-mono text-xs text-muted-foreground">
            <Users className="h-3.5 w-3.5" aria-hidden="true" />
            {formatNumber(team.roster.length)} pemain
          </span>
          <span className="font-mono text-xs uppercase tracking-wider text-primary opacity-0 transition-opacity group-hover:opacity-100">
            Lihat
          </span>
        </div>
      </Card>
    </Link>
  );
}

function TeamCardSkeleton() {
  return (
    <Card className="flex h-full flex-col gap-4 rounded-lg border border-border bg-card p-5 shadow-none">
      <div className="flex items-start gap-4">
        <Skeleton className="h-12 w-12 rounded-md" />
        <div className="flex-1 space-y-2">
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-3 w-1/2" />
        </div>
      </div>
      <Skeleton className="h-4 w-24" />
    </Card>
  );
}

export default function Teams() {
  const search = useSearch({ strict: false }) as Record<string, unknown>;
  const navigate = useNavigate();
  const { q, game } = readSearch(search);
  const { data: teams, isLoading } = useTeams();

  const games = useMemo(() => {
    const set = new Set<string>();
    for (const team of teams ?? []) {
      if (team.game.trim() !== "") set.add(team.game);
    }
    return Array.from(set).sort((a, b) => a.localeCompare(b, "id"));
  }, [teams]);

  const filtered = useMemo(() => {
    const query = (q ?? "").trim().toLowerCase();
    return (teams ?? []).filter((team) => {
      const matchesName =
        query === "" || team.name.toLowerCase().includes(query);
      const matchesGame = (game ?? "") === "" || team.game === game;
      return matchesName && matchesGame;
    });
  }, [teams, q, game]);

  function updateSearch(next: Partial<TeamsSearch>) {
    void navigate({
      to: "/tim",
      search: (prev: Record<string, unknown>) => ({
        ...prev,
        ...next,
      }),
      replace: true,
    });
  }

  const hasFilters = (q ?? "") !== "" || (game ?? "") !== "";

  return (
    <div className="container py-10">
      <PageHeader
        eyebrow="Katalog"
        title="Tim"
        description="Jelajahi tim esports yang terdaftar, cari berdasarkan nama, dan saring menurut game."
      />

      <div className="mt-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <SearchInput
          value={q ?? ""}
          onChange={(value) => updateSearch({ q: value })}
          placeholder="Cari nama tim…"
          className="w-full lg:max-w-sm"
        />
        <div
          data-ocid="team.filter.tab"
          className="flex flex-wrap items-center gap-2"
        >
          <Button
            type="button"
            variant={(game ?? "") === "" ? "default" : "outline"}
            size="sm"
            onClick={() => updateSearch({ game: "" })}
          >
            Semua Game
          </Button>
          {games.map((item) => (
            <Button
              key={item}
              type="button"
              variant={game === item ? "default" : "outline"}
              size="sm"
              onClick={() => updateSearch({ game: item })}
            >
              {item}
            </Button>
          ))}
        </div>
      </div>

      <div className="mt-8">
        {isLoading ? (
          <div
            data-ocid="loading_state"
            className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
          >
            {Array.from({ length: 8 }, (_, i) => `team-skeleton-${i}`).map(
              (id) => (
                <TeamCardSkeleton key={id} />
              ),
            )}
          </div>
        ) : filtered.length === 0 ? (
          <EmptyState
            icon={Search}
            title={hasFilters ? "Tidak ada tim yang cocok" : "Belum ada tim"}
            description={
              hasFilters
                ? "Coba ubah kata kunci pencarian atau pilih game lain untuk menemukan tim."
                : "Belum ada tim yang terdaftar. Tim akan muncul di sini setelah ditambahkan."
            }
            action={
              hasFilters ? (
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => updateSearch({ q: "", game: "" })}
                >
                  Hapus Filter
                </Button>
              ) : undefined
            }
          />
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filtered.map((team, index) => (
              <TeamCard key={team.id.toString()} team={team} index={index} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
