import type { Team, Tournament } from "@/backend";
import { EmptyState } from "@/components/EmptyState";
import { StatusBadge } from "@/components/StatusBadge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useTeams, useTournaments } from "@/lib/api";
import { formatNumber, formatPrizePool } from "@/lib/format";
import { Link } from "@tanstack/react-router";
import { ArrowRight, Gamepad2, Swords, Trophy, Users } from "lucide-react";

const PREVIEW_LIMIT = 3;

const tournamentSkeletonIds = Array.from(
  { length: PREVIEW_LIMIT },
  (_, index) => `tournament-preview-${index}`,
);

const teamSkeletonIds = Array.from(
  { length: PREVIEW_LIMIT },
  (_, index) => `team-preview-${index}`,
);

function SectionHeading({
  eyebrow,
  title,
  to,
  linkLabel,
}: {
  eyebrow: string;
  title: string;
  to: string;
  linkLabel: string;
}) {
  return (
    <div className="flex items-end justify-between gap-4">
      <div>
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-primary">
          {eyebrow}
        </p>
        <h2 className="mt-1 font-display text-xl font-bold tracking-tight text-foreground sm:text-2xl">
          {title}
        </h2>
      </div>
      <Button asChild variant="ghost" size="sm">
        <Link to={to}>
          {linkLabel}
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      </Button>
    </div>
  );
}

function TournamentPreviewCard({
  tournament,
  index,
}: {
  tournament: Tournament;
  index: number;
}) {
  return (
    <Link
      to="/turnamen/$id"
      params={{ id: tournament.id.toString() }}
      data-ocid={`home.tournament.item.${index + 1}`}
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
  );
}

function TeamPreviewCard({ team, index }: { team: Team; index: number }) {
  return (
    <Link
      to="/tim/$id"
      params={{ id: team.id.toString() }}
      data-ocid={`home.team.item.${index + 1}`}
      className="group block rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
    >
      <Card className="flex h-full flex-col gap-4 rounded-lg border border-border bg-card p-5 shadow-none transition-smooth group-hover:border-primary/50 group-hover:bg-card/80">
        <div className="flex items-start gap-4">
          {team.logoUrl.trim() !== "" ? (
            <img
              src={team.logoUrl}
              alt={`Logo ${team.name}`}
              loading="lazy"
              className="h-12 w-12 shrink-0 rounded-md border border-border bg-muted object-cover"
            />
          ) : (
            <div
              aria-hidden="true"
              className="flex h-12 w-12 shrink-0 items-center justify-center rounded-md border border-border bg-muted font-display text-lg font-bold text-muted-foreground"
            >
              {team.name.trim().charAt(0).toUpperCase() || "?"}
            </div>
          )}
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

function PreviewSkeleton() {
  return <Skeleton className="h-40 rounded-lg" />;
}

export default function Home() {
  const { data: tournaments, isPending: tournamentsPending } = useTournaments();
  const { data: teams, isPending: teamsPending } = useTeams();

  const tournamentPreview = (tournaments ?? []).slice(0, PREVIEW_LIMIT);
  const teamPreview = (teams ?? []).slice(0, PREVIEW_LIMIT);

  return (
    <div className="container py-10">
      <section
        data-ocid="home.hero"
        className="relative overflow-hidden rounded-xl border border-border bg-card px-6 py-12 sm:px-10 sm:py-16"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-primary/10 blur-3xl"
        />
        <div className="relative max-w-2xl">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-primary">
            Arena ID
          </p>
          <h1 className="mt-3 font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Pusat Komando Turnamen Esports
          </h1>
          <p className="mt-4 text-sm text-muted-foreground sm:text-base">
            Jelajahi turnamen dan tim esports dalam satu katalog. Saring
            berdasarkan game dan status, lalu buka detailnya untuk melihat
            susunan dan pertandingan.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg" data-ocid="home.tournaments_link">
              <Link to="/turnamen">
                <Trophy className="h-4 w-4" aria-hidden="true" />
                Jelajahi Turnamen
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              data-ocid="home.teams_link"
            >
              <Link to="/tim">
                <Users className="h-4 w-4" aria-hidden="true" />
                Lihat Tim
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="mt-12">
        <SectionHeading
          eyebrow="Katalog"
          title="Turnamen Terbaru"
          to="/turnamen"
          linkLabel="Semua Turnamen"
        />
        <div className="mt-6">
          {tournamentsPending ? (
            <div
              data-ocid="home.tournaments_loading"
              className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
            >
              {tournamentSkeletonIds.map((id) => (
                <PreviewSkeleton key={id} />
              ))}
            </div>
          ) : tournamentPreview.length === 0 ? (
            <EmptyState
              icon={Trophy}
              title="Belum ada turnamen"
              description="Turnamen akan muncul di sini setelah penyelenggara menambahkannya ke katalog."
            />
          ) : (
            <div
              data-ocid="home.tournaments_list"
              className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
            >
              {tournamentPreview.map((tournament, index) => (
                <TournamentPreviewCard
                  key={tournament.id.toString()}
                  tournament={tournament}
                  index={index}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="mt-12">
        <SectionHeading
          eyebrow="Katalog"
          title="Tim Terbaru"
          to="/tim"
          linkLabel="Semua Tim"
        />
        <div className="mt-6">
          {teamsPending ? (
            <div
              data-ocid="home.teams_loading"
              className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
            >
              {teamSkeletonIds.map((id) => (
                <PreviewSkeleton key={id} />
              ))}
            </div>
          ) : teamPreview.length === 0 ? (
            <EmptyState
              icon={Swords}
              title="Belum ada tim"
              description="Tim akan muncul di sini setelah ditambahkan ke katalog."
            />
          ) : (
            <div
              data-ocid="home.teams_list"
              className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
            >
              {teamPreview.map((team, index) => (
                <TeamPreviewCard
                  key={team.id.toString()}
                  team={team}
                  index={index}
                />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
