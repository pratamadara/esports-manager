import { type Match, MatchStatus, type Team, type Tournament } from "@/backend";
import { EmptyState } from "@/components/EmptyState";
import { PageHeader } from "@/components/PageHeader";
import { StatusBadge } from "@/components/StatusBadge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useMatches, useTeams, useTournament } from "@/lib/api";
import {
  formatDate,
  formatDateTime,
  formatNumber,
  formatPrizePool,
  formatScore,
} from "@/lib/format";
import { cn, sanitizeHtml } from "@/lib/utils";
import { Link, useParams } from "@tanstack/react-router";
import {
  CalendarClock,
  Check,
  Clock,
  Gamepad2,
  Layers,
  Share2,
  Trophy,
  Users,
} from "lucide-react";
import { toast } from "sonner";

/* ------------------------------ Sub-components ------------------------------ */

function MetaItem({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof Trophy;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start gap-3 rounded-lg border border-border bg-card/60 px-4 py-3">
      <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-border bg-muted">
        <Icon className="h-4 w-4 text-primary" aria-hidden="true" />
      </span>
      <div className="min-w-0">
        <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
          {label}
        </p>
        <p className="mt-0.5 truncate font-display text-sm font-semibold text-foreground">
          {value}
        </p>
      </div>
    </div>
  );
}

function SectionHeading({
  icon: Icon,
  title,
  count,
}: {
  icon: typeof Trophy;
  title: string;
  count?: number;
}) {
  return (
    <div className="mb-4 flex items-center gap-2.5">
      <Icon className="h-4 w-4 text-primary" aria-hidden="true" />
      <h2 className="font-display text-lg font-semibold tracking-tight text-foreground">
        {title}
      </h2>
      {count !== undefined ? (
        <span className="rounded-full border border-border bg-muted px-2 py-0.5 font-mono text-[11px] text-muted-foreground">
          {formatNumber(count)}
        </span>
      ) : null}
    </div>
  );
}

function TeamCard({ team }: { team: Team }) {
  return (
    <Link
      to="/tim/$id"
      params={{ id: team.id.toString() }}
      data-ocid="tournament.team_link"
      className="group flex items-center gap-3 rounded-lg border border-border bg-card px-4 py-3 transition-smooth hover:border-primary/50 hover:bg-card/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
    >
      <span className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-md border border-border bg-muted font-display text-sm font-bold text-primary">
        {team.logoUrl ? (
          <img
            src={team.logoUrl}
            alt=""
            className="h-full w-full object-cover"
            loading="lazy"
          />
        ) : (
          team.name.charAt(0).toUpperCase()
        )}
      </span>
      <div className="min-w-0 flex-1">
        <p className="truncate font-display text-sm font-semibold text-foreground group-hover:text-primary">
          {team.name}
        </p>
        <p className="truncate font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
          {team.game}
        </p>
      </div>
      <span className="shrink-0 font-mono text-[11px] text-muted-foreground">
        {formatNumber(team.roster.length)} pemain
      </span>
    </Link>
  );
}

function MatchRow({
  match,
  teamName,
}: {
  match: Match;
  teamName: (id: bigint | undefined) => string;
}) {
  const nameA = teamName(match.teamAId);
  const nameB = teamName(match.teamBId);
  const hasScore = match.scoreA !== undefined && match.scoreB !== undefined;
  const isFinished = match.status === MatchStatus.selesai;

  const winnerIsA =
    match.winnerId !== undefined &&
    match.teamAId !== undefined &&
    match.winnerId === match.teamAId;
  const winnerIsB =
    match.winnerId !== undefined &&
    match.teamBId !== undefined &&
    match.winnerId === match.teamBId;

  return (
    <div
      data-ocid="tournament.match_item"
      className="flex flex-col gap-3 rounded-lg border border-border bg-card px-4 py-3 sm:flex-row sm:items-center sm:justify-between"
    >
      <div className="flex min-w-0 flex-1 items-center gap-3">
        <span
          className={cn(
            "flex min-w-0 flex-1 items-center justify-end gap-1.5 truncate text-right font-display text-sm",
            winnerIsA ? "font-bold text-foreground" : "text-muted-foreground",
          )}
        >
          {winnerIsA ? (
            <Check
              className="h-3.5 w-3.5 shrink-0 text-primary"
              aria-hidden="true"
            />
          ) : null}
          <span className="truncate">{nameA}</span>
        </span>
        <span className="shrink-0 rounded-md border border-border bg-muted px-2.5 py-1 font-mono text-xs font-semibold tabular-nums text-foreground">
          {hasScore ? formatScore(match.scoreA, match.scoreB) : "vs"}
        </span>
        <span
          className={cn(
            "flex min-w-0 flex-1 items-center gap-1.5 truncate font-display text-sm",
            winnerIsB ? "font-bold text-foreground" : "text-muted-foreground",
          )}
        >
          <span className="truncate">{nameB}</span>
          {winnerIsB ? (
            <Check
              className="h-3.5 w-3.5 shrink-0 text-primary"
              aria-hidden="true"
            />
          ) : null}
        </span>
      </div>
      <div className="flex shrink-0 items-center gap-3">
        <span className="flex items-center gap-1.5 font-mono text-[11px] text-muted-foreground">
          <Clock className="h-3 w-3" aria-hidden="true" />
          {formatDateTime(match.scheduledAt)}
        </span>
        <StatusBadge status={match.status} />
        {isFinished && match.winnerId === undefined ? (
          <span className="font-mono text-[11px] text-muted-foreground">
            Tanpa pemenang
          </span>
        ) : null}
      </div>
    </div>
  );
}

/* --------------------------------- Loading --------------------------------- */

function DetailSkeleton() {
  const ids = Array.from({ length: 4 }, (_, i) => `detail-skeleton-${i}`);
  return (
    <div data-ocid="loading_state" className="container py-10">
      <Skeleton className="h-6 w-32" />
      <Skeleton className="mt-3 h-9 w-72" />
      <Skeleton className="mt-3 h-4 w-full max-w-2xl" />
      <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {ids.map((id) => (
          <Skeleton key={id} className="h-20 rounded-lg" />
        ))}
      </div>
      <div className="mt-10 grid gap-8 lg:grid-cols-[1.6fr_1fr]">
        <div className="space-y-3">
          {ids.map((id) => (
            <Skeleton key={`left-${id}`} className="h-16 rounded-lg" />
          ))}
        </div>
        <div className="space-y-3">
          {ids.map((id) => (
            <Skeleton key={`right-${id}`} className="h-16 rounded-lg" />
          ))}
        </div>
      </div>
    </div>
  );
}

/* ---------------------------------- Page ----------------------------------- */

export default function TournamentDetail() {
  const { id } = useParams({ from: "/turnamen/$id" });
  const tournamentId = BigInt(id);

  const tournamentQuery = useTournament(tournamentId);
  const teamsQuery = useTeams();
  const matchesQuery = useMatches(tournamentId);

  const tournament: Tournament | null | undefined = tournamentQuery.data;
  const allTeams: Array<Team> = teamsQuery.data ?? [];
  const matches: Array<Match> = matchesQuery.data ?? [];

  const teamById = new Map(allTeams.map((team) => [team.id.toString(), team]));
  const teamName = (teamId: bigint | undefined): string => {
    if (teamId === undefined) return "TBD";
    return teamById.get(teamId.toString())?.name ?? `Tim #${teamId.toString()}`;
  };

  const participatingTeams = tournament
    ? tournament.teamIds
        .map((teamId) => teamById.get(teamId.toString()))
        .filter((team): team is Team => team !== undefined)
    : [];

  const matchesByRound = matches.reduce<Map<string, Array<Match>>>(
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
    new Map(),
  );

  const handleShare = async () => {
    const url = window.location.href;
    try {
      await navigator.clipboard.writeText(url);
      toast.success("Tautan turnamen disalin", {
        description: "Bagikan tautan ini kepada tim peserta.",
      });
    } catch {
      toast.error("Gagal menyalin tautan", {
        description: "Salin tautan dari bilah alamat peramban Anda.",
      });
    }
  };

  if (tournamentQuery.isLoading) {
    return <DetailSkeleton />;
  }

  if (tournamentQuery.isError) {
    return (
      <div className="container py-10">
        <EmptyState
          icon={Trophy}
          title="Gagal memuat turnamen"
          description="Terjadi kesalahan saat mengambil data turnamen. Coba muat ulang halaman."
          action={
            <Button
              type="button"
              data-ocid="tournament.retry_button"
              onClick={() => void tournamentQuery.refetch()}
            >
              Coba lagi
            </Button>
          }
        />
      </div>
    );
  }

  if (!tournament) {
    return (
      <div className="container py-10">
        <EmptyState
          icon={Trophy}
          title="Turnamen tidak ditemukan"
          description={`Tidak ada turnamen dengan ID #${id}. Turnamen mungkin telah dihapus.`}
          action={
            <Button type="button" asChild data-ocid="tournament.back_button">
              <Link to="/turnamen">Kembali ke katalog</Link>
            </Button>
          }
        />
      </div>
    );
  }

  const rounds = Array.from(matchesByRound.entries());

  return (
    <div data-ocid="tournament.page" className="container py-10">
      <PageHeader
        eyebrow="Turnamen"
        title={tournament.name}
        description={tournament.game}
        actions={
          <>
            <StatusBadge status={tournament.status} />
            <Button
              type="button"
              variant="outline"
              size="sm"
              data-ocid="tournament.share_button"
              onClick={() => void handleShare()}
            >
              <Share2 className="h-4 w-4" aria-hidden="true" />
              Bagikan
            </Button>
          </>
        }
      />

      {/* Meta rail */}
      <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <MetaItem icon={Gamepad2} label="Game" value={tournament.game} />
        <MetaItem icon={Layers} label="Format" value={tournament.format} />
        <MetaItem
          icon={Trophy}
          label="Prize Pool"
          value={formatPrizePool(tournament.prizePool)}
        />
        <MetaItem
          icon={Users}
          label="Tim Peserta"
          value={`${formatNumber(participatingTeams.length)} tim`}
        />
      </div>

      <div className="mt-10 grid gap-10 lg:grid-cols-[1.6fr_1fr]">
        {/* Left column */}
        <div className="space-y-10">
          {/* Description */}
          <section data-ocid="tournament.description_section">
            <SectionHeading icon={Trophy} title="Deskripsi" />
            <Card className="rounded-lg border-border bg-card shadow-none">
              <CardContent className="pt-0">
                {tournament.description.trim() === "" ? (
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    Penyelenggara belum menambahkan deskripsi untuk turnamen
                    ini.
                  </p>
                ) : (
                  <div
                    data-ocid="tournament.description"
                    className="text-sm leading-relaxed text-muted-foreground [&_a]:text-primary [&_a]:underline [&_b]:font-semibold [&_b]:text-foreground [&_i]:italic [&_ol]:list-decimal [&_ol]:pl-5 [&_p]:mb-2 [&_p:last-child]:mb-0 [&_strong]:font-semibold [&_strong]:text-foreground [&_ul]:list-disc [&_ul]:pl-5"
                    // biome-ignore lint/security/noDangerouslySetInnerHtml: content is sanitized by sanitizeHtml, which strips scripts, event handlers, and non-formatting tags
                    dangerouslySetInnerHTML={{
                      __html: sanitizeHtml(tournament.description),
                    }}
                  />
                )}
              </CardContent>
            </Card>
          </section>

          {/* Schedule */}
          <section data-ocid="tournament.schedule_section">
            <SectionHeading
              icon={CalendarClock}
              title="Jadwal"
              count={tournament.schedule.length}
            />
            {tournament.schedule.length === 0 ? (
              <EmptyState
                icon={CalendarClock}
                title="Jadwal belum tersedia"
                description="Penyelenggara belum menambahkan rangkaian jadwal untuk turnamen ini."
              />
            ) : (
              <ol className="relative space-y-3 border-l border-border pl-6">
                {tournament.schedule.map((entry) => (
                  <li
                    key={entry.id.toString()}
                    data-ocid="tournament.schedule_item"
                    className="relative"
                  >
                    <span
                      className="absolute -left-[1.9rem] top-4 h-2.5 w-2.5 rounded-full border-2 border-background bg-primary"
                      aria-hidden="true"
                    />
                    <div className="rounded-lg border border-border bg-card px-4 py-3">
                      <p className="font-display text-sm font-semibold text-foreground">
                        {entry.caption}
                      </p>
                      <p className="mt-1 font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
                        {formatDate(entry.startAt)} — {formatDate(entry.endAt)}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            )}
          </section>

          {/* Bracket / matches */}
          <section data-ocid="tournament.bracket_section">
            <SectionHeading
              icon={Layers}
              title="Bagan Pertandingan"
              count={matches.length}
            />
            {matches.length === 0 ? (
              <EmptyState
                icon={Layers}
                title="Bagan belum disusun"
                description="Belum ada pertandingan yang dijadwalkan untuk turnamen ini."
              />
            ) : (
              <div className="space-y-6">
                {rounds.map(([round, roundMatches]) => (
                  <div key={round} data-ocid="tournament.round_group">
                    <div className="mb-2.5 flex items-center gap-2">
                      <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-primary">
                        {round}
                      </span>
                      <span
                        className="h-px flex-1 bg-border"
                        aria-hidden="true"
                      />
                      <span className="font-mono text-[11px] text-muted-foreground">
                        {formatNumber(roundMatches.length)} laga
                      </span>
                    </div>
                    <div className="space-y-2">
                      {roundMatches.map((match) => (
                        <MatchRow
                          key={match.id.toString()}
                          match={match}
                          teamName={teamName}
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>

        {/* Right column: teams */}
        <aside data-ocid="tournament.teams_section">
          <SectionHeading
            icon={Users}
            title="Tim Peserta"
            count={participatingTeams.length}
          />
          {participatingTeams.length === 0 ? (
            <EmptyState
              icon={Users}
              title="Belum ada tim peserta"
              description="Penyelenggara belum mendaftarkan tim ke turnamen ini."
            />
          ) : (
            <div className="space-y-2.5">
              {participatingTeams.map((team) => (
                <TeamCard key={team.id.toString()} team={team} />
              ))}
            </div>
          )}
        </aside>
      </div>
    </div>
  );
}
