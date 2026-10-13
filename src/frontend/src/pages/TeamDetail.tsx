import { EmptyState } from "@/components/EmptyState";
import { PageHeader } from "@/components/PageHeader";
import { StatusBadge } from "@/components/StatusBadge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useTeam, useTournaments } from "@/lib/api";
import { formatDate, formatPrizePool } from "@/lib/format";
import { Link, useParams } from "@tanstack/react-router";
import { CalendarDays, Gamepad2, Trophy, Users } from "lucide-react";

export default function TeamDetail() {
  const { id } = useParams({ from: "/tim/$id" });
  const teamId = BigInt(id);
  const { data: team, isLoading } = useTeam(teamId);
  const { data: tournaments, isLoading: isLoadingTournaments } =
    useTournaments();

  if (isLoading) {
    return (
      <div data-ocid="loading_state" className="container py-10">
        <div className="h-8 w-64 animate-pulse rounded-md bg-muted" />
        <div className="mt-4 h-4 w-96 animate-pulse rounded-md bg-muted" />
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 3 }, (_, i) => `skeleton-${i}`).map((key) => (
            <div key={key} className="h-40 animate-pulse rounded-lg bg-muted" />
          ))}
        </div>
      </div>
    );
  }

  if (!team) {
    return (
      <div className="container py-10">
        <EmptyState
          icon={Users}
          title="Tim tidak ditemukan"
          description="Tim yang Anda cari mungkin telah dihapus atau tautannya tidak valid."
          action={
            <Button asChild type="button">
              <Link to="/tim">Kembali ke daftar tim</Link>
            </Button>
          }
        />
      </div>
    );
  }

  const participatedTournaments = (tournaments ?? []).filter((tournament) =>
    team.tournamentIds.some((tid) => tid === tournament.id),
  );

  return (
    <div className="container py-10">
      <PageHeader
        eyebrow="Tim"
        title={team.name}
        description={team.game}
        actions={
          <Button asChild variant="outline" type="button">
            <Link to="/tim">Semua Tim</Link>
          </Button>
        }
      />

      <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
        <div className="space-y-8">
          <Card data-ocid="team.card">
            <CardContent className="flex flex-col gap-6 p-6 sm:flex-row sm:items-start">
              <div className="flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-border bg-muted">
                {team.logoUrl ? (
                  <img
                    src={team.logoUrl}
                    alt={`Logo ${team.name}`}
                    className="h-full w-full object-cover"
                    onError={(event) => {
                      event.currentTarget.style.display = "none";
                    }}
                  />
                ) : (
                  <Gamepad2
                    className="h-8 w-8 text-muted-foreground"
                    aria-hidden="true"
                  />
                )}
              </div>
              <div className="min-w-0 flex-1">
                <h2 className="font-display text-xl font-bold text-foreground">
                  {team.name}
                </h2>
                <p className="mt-1 flex items-center gap-2 text-sm text-muted-foreground">
                  <Gamepad2 className="h-4 w-4" aria-hidden="true" />
                  {team.game}
                </p>
                <p className="mt-4 whitespace-pre-line text-sm leading-relaxed text-foreground/90">
                  {team.description || "Belum ada deskripsi untuk tim ini."}
                </p>
              </div>
            </CardContent>
          </Card>

          <section data-ocid="team.roster.section">
            <div className="mb-4 flex items-center gap-2">
              <Users className="h-5 w-5 text-primary" aria-hidden="true" />
              <h2 className="font-display text-lg font-semibold text-foreground">
                Roster
              </h2>
              <span className="font-mono text-xs text-muted-foreground">
                {team.roster.length} pemain
              </span>
            </div>
            {team.roster.length === 0 ? (
              <EmptyState
                icon={Users}
                title="Roster masih kosong"
                description="Belum ada pemain yang terdaftar pada tim ini."
              />
            ) : (
              <ul
                data-ocid="team.roster.list"
                className="divide-y divide-border overflow-hidden rounded-lg border border-border bg-card"
              >
                {team.roster.map((player, index) => (
                  <li
                    key={player.id.toString()}
                    data-ocid={`team.roster.item.${index + 1}`}
                    className="flex items-center justify-between gap-4 px-4 py-3"
                  >
                    <span className="min-w-0 truncate font-medium text-foreground">
                      {player.name}
                    </span>
                    <span className="shrink-0 rounded-full border border-border bg-muted px-2.5 py-0.5 font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
                      {player.role}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </section>
        </div>

        <aside data-ocid="team.tournaments.section" className="space-y-4">
          <div className="flex items-center gap-2">
            <Trophy className="h-5 w-5 text-primary" aria-hidden="true" />
            <h2 className="font-display text-lg font-semibold text-foreground">
              Turnamen Diikuti
            </h2>
          </div>
          {isLoadingTournaments ? (
            <div className="space-y-3">
              {Array.from({ length: 2 }, (_, i) => `tskeleton-${i}`).map(
                (key) => (
                  <div
                    key={key}
                    className="h-28 animate-pulse rounded-lg bg-muted"
                  />
                ),
              )}
            </div>
          ) : participatedTournaments.length === 0 ? (
            <EmptyState
              icon={Trophy}
              title="Belum mengikuti turnamen"
              description="Tim ini belum terdaftar pada turnamen apa pun."
            />
          ) : (
            <div className="space-y-3">
              {participatedTournaments.map((tournament, index) => (
                <Link
                  key={tournament.id.toString()}
                  to="/turnamen/$id"
                  params={{ id: tournament.id.toString() }}
                  data-ocid={`team.tournament.item.${index + 1}`}
                  className="block rounded-lg border border-border bg-card p-4 transition-smooth hover:border-primary/50 hover:bg-card/80"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="truncate font-display font-semibold text-foreground">
                        {tournament.name}
                      </p>
                      <p className="mt-0.5 truncate text-xs text-muted-foreground">
                        {tournament.game}
                      </p>
                    </div>
                    <StatusBadge status={tournament.status} />
                  </div>
                  <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
                    <span className="inline-flex items-center gap-1.5">
                      <CalendarDays
                        className="h-3.5 w-3.5"
                        aria-hidden="true"
                      />
                      {formatDate(tournament.createdAt)}
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <Trophy className="h-3.5 w-3.5" aria-hidden="true" />
                      {formatPrizePool(tournament.prizePool)}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </aside>
      </div>
    </div>
  );
}
