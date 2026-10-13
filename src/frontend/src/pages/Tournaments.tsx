import { TournamentStatus } from "@/backend";
import { EmptyState } from "@/components/EmptyState";
import { PageHeader } from "@/components/PageHeader";
import { SearchInput } from "@/components/SearchInput";
import { StatusBadge } from "@/components/StatusBadge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { useTournaments } from "@/lib/api";
import { formatPrizePool, tournamentStatusLabels } from "@/lib/format";
import { Link, useNavigate, useSearch } from "@tanstack/react-router";
import { Gamepad2, RotateCcw, SearchX, Trophy } from "lucide-react";
import { useMemo } from "react";

const ALL = "semua";

const statusOptions = [
  { value: ALL, label: "Semua Status" },
  {
    value: TournamentStatus.akanDatang,
    label: tournamentStatusLabels[TournamentStatus.akanDatang],
  },
  {
    value: TournamentStatus.berlangsung,
    label: tournamentStatusLabels[TournamentStatus.berlangsung],
  },
  {
    value: TournamentStatus.selesai,
    label: tournamentStatusLabels[TournamentStatus.selesai],
  },
];

const skeletonIds = Array.from(
  { length: 6 },
  (_, index) => `tournament-skeleton-${index}`,
);

export default function Tournaments() {
  const { data: tournaments, isPending } = useTournaments();
  const search = useSearch({ from: "/turnamen" });
  const navigate = useNavigate({ from: "/turnamen" });

  const query = search.q ?? "";
  const gameFilter = search.game ?? ALL;
  const statusFilter = search.status ?? ALL;

  const games = useMemo(() => {
    const unique = new Set<string>();
    for (const tournament of tournaments ?? []) {
      if (tournament.game.trim() !== "") unique.add(tournament.game);
    }
    return Array.from(unique).sort((a, b) => a.localeCompare(b));
  }, [tournaments]);

  const filtered = useMemo(() => {
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

  const hasActiveFilters =
    query !== "" || gameFilter !== ALL || statusFilter !== ALL;

  function setFilter(patch: { q?: string; game?: string; status?: string }) {
    void navigate({ search: (prev) => ({ ...prev, ...patch }), replace: true });
  }

  function clearFilters() {
    void navigate({ search: {}, replace: true });
  }

  return (
    <div className="container py-10">
      <PageHeader
        eyebrow="Katalog"
        title="Turnamen"
        description="Jelajahi turnamen esports, saring berdasarkan game dan status, lalu bagikan tautannya."
      />

      <div className="mt-6 flex flex-col gap-3 lg:flex-row lg:items-center">
        <SearchInput
          id="tournament-search"
          value={query}
          onChange={(value) => setFilter({ q: value })}
          placeholder="Cari nama turnamen…"
          className="lg:max-w-sm"
        />
        <div className="flex flex-col gap-3 sm:flex-row">
          <Select
            value={gameFilter}
            onValueChange={(value) => setFilter({ game: value })}
          >
            <SelectTrigger
              data-ocid="tournament.game_select"
              className="w-full sm:w-52"
              aria-label="Filter game"
            >
              <SelectValue placeholder="Semua Game" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={ALL}>Semua Game</SelectItem>
              {games.map((game) => (
                <SelectItem key={game} value={game}>
                  {game}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select
            value={statusFilter}
            onValueChange={(value) => setFilter({ status: value })}
          >
            <SelectTrigger
              data-ocid="tournament.status_select"
              className="w-full sm:w-52"
              aria-label="Filter status"
            >
              <SelectValue placeholder="Semua Status" />
            </SelectTrigger>
            <SelectContent>
              {statusOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {hasActiveFilters ? (
            <Button
              type="button"
              variant="ghost"
              data-ocid="tournament.clear_button"
              onClick={clearFilters}
            >
              <RotateCcw className="h-4 w-4" aria-hidden="true" />
              Reset
            </Button>
          ) : null}
        </div>
      </div>

      {!isPending && tournaments ? (
        <p
          data-ocid="tournament.results_count"
          className="mt-6 font-mono text-xs uppercase tracking-wider text-muted-foreground"
        >
          {filtered.length} dari {tournaments.length} turnamen
        </p>
      ) : null}

      {isPending ? (
        <div
          data-ocid="tournament.loading_state"
          className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
        >
          {skeletonIds.map((id) => (
            <Skeleton key={id} className="h-44 rounded-lg" />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <EmptyState
          className="mt-6"
          icon={SearchX}
          title="Tidak ada turnamen yang cocok"
          description={
            hasActiveFilters
              ? "Coba ubah kata kunci atau reset filter untuk melihat semua turnamen."
              : "Belum ada turnamen yang terdaftar. Turnamen baru akan muncul di sini setelah penyelenggara menambahkannya."
          }
          action={
            hasActiveFilters ? (
              <Button
                type="button"
                variant="outline"
                data-ocid="tournament.empty_reset_button"
                onClick={clearFilters}
              >
                <RotateCcw className="h-4 w-4" aria-hidden="true" />
                Reset Filter
              </Button>
            ) : undefined
          }
        />
      ) : (
        <div
          data-ocid="tournament.list"
          className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
        >
          {filtered.map((tournament, index) => (
            <Link
              key={tournament.id.toString()}
              to="/turnamen/$id"
              params={{ id: tournament.id.toString() }}
              data-ocid={`tournament.item.${index + 1}`}
              className="group block rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <Card className="h-full rounded-lg border-border bg-card shadow-none transition-smooth group-hover:border-primary/50 group-hover:shadow-elevated">
                <CardHeader className="gap-3">
                  <div className="flex items-start justify-between gap-3">
                    <CardTitle className="min-w-0 font-display text-base font-semibold leading-snug text-foreground">
                      {tournament.name}
                    </CardTitle>
                    <StatusBadge status={tournament.status} />
                  </div>
                </CardHeader>
                <CardContent className="flex flex-col gap-3">
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted-foreground">
                    <span className="inline-flex items-center gap-1.5">
                      <Gamepad2 className="h-4 w-4" aria-hidden="true" />
                      {tournament.game}
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <Trophy className="h-4 w-4" aria-hidden="true" />
                      {formatPrizePool(tournament.prizePool)}
                    </span>
                  </div>
                  <p className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
                    Format: {tournament.format}
                  </p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
