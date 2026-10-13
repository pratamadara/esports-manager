import { type Match, type MatchInput, MatchStatus } from "@/backend";
import { EmptyState } from "@/components/EmptyState";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  useCreateMatch,
  useDeleteMatch,
  useMatches,
  useRecordScore,
  useSetMatchStatus,
  useSetMatchWinner,
  useTeams,
  useTournaments,
  useUpdateMatch,
} from "@/lib/api";
import { formatDateTime, formatScore, matchStatusLabel } from "@/lib/format";
import { CalendarClock, Pencil, Plus, Trash2, Trophy } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

type MatchDraft = {
  round: string;
  teamAId: string;
  teamBId: string;
  scheduledAt: string;
};

const emptyDraft: MatchDraft = {
  round: "",
  teamAId: "",
  teamBId: "",
  scheduledAt: "",
};

function toLocalInput(timestamp?: bigint): string {
  if (timestamp === undefined) return "";
  const date = new Date(Number(timestamp / 1_000_000n));
  if (Number.isNaN(date.getTime())) return "";
  const offset = date.getTimezoneOffset() * 60_000;
  return new Date(date.getTime() - offset).toISOString().slice(0, 16);
}

function toTimestamp(value: string): bigint | undefined {
  if (value === "") return undefined;
  const ms = new Date(value).getTime();
  if (Number.isNaN(ms)) return undefined;
  return BigInt(ms) * 1_000_000n;
}

function draftToInput(draft: MatchDraft): MatchInput {
  return {
    round: draft.round.trim(),
    teamAId: draft.teamAId === "" ? undefined : BigInt(draft.teamAId),
    teamBId: draft.teamBId === "" ? undefined : BigInt(draft.teamBId),
    scheduledAt: toTimestamp(draft.scheduledAt),
  };
}

type MatchDialogProps = {
  tournamentId: bigint;
  match: Match | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

function MatchDialog({
  tournamentId,
  match,
  open,
  onOpenChange,
}: MatchDialogProps) {
  const { data: teams } = useTeams();
  const createMatch = useCreateMatch();
  const updateMatch = useUpdateMatch();
  const [draft, setDraft] = useState<MatchDraft>(emptyDraft);
  const [initializedFor, setInitializedFor] = useState<string | null>(null);

  const matchKey = match ? match.id.toString() : "baru";
  if (open && initializedFor !== matchKey) {
    setInitializedFor(matchKey);
    setDraft(
      match
        ? {
            round: match.round,
            teamAId: match.teamAId?.toString() ?? "",
            teamBId: match.teamBId?.toString() ?? "",
            scheduledAt: toLocalInput(match.scheduledAt),
          }
        : emptyDraft,
    );
  }

  const isPending = createMatch.isPending || updateMatch.isPending;
  const canSubmit = draft.round.trim() !== "" && !isPending;

  function handleSubmit() {
    if (!canSubmit) return;
    const input = draftToInput(draft);
    if (match) {
      updateMatch.mutate(
        { id: match.id, input, tournamentId },
        {
          onSuccess: () => {
            toast.success("Pertandingan diperbarui");
            onOpenChange(false);
          },
          onError: () => toast.error("Gagal memperbarui pertandingan"),
        },
      );
    } else {
      createMatch.mutate(
        { tournamentId, input },
        {
          onSuccess: () => {
            toast.success("Pertandingan ditambahkan");
            onOpenChange(false);
          },
          onError: () => toast.error("Gagal menambahkan pertandingan"),
        },
      );
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent data-ocid="match.dialog">
        <DialogHeader>
          <DialogTitle className="font-display">
            {match ? "Ubah Pertandingan" : "Pertandingan Baru"}
          </DialogTitle>
          <DialogDescription>
            Atur babak, tim, dan jadwal pertandingan.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-2">
          <div className="grid gap-2">
            <Label htmlFor="match-round">Babak</Label>
            <Input
              id="match-round"
              data-ocid="match.round_input"
              value={draft.round}
              onChange={(event) =>
                setDraft((current) => ({
                  ...current,
                  round: event.target.value,
                }))
              }
              placeholder="Contoh: Semifinal"
            />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="grid gap-2">
              <Label htmlFor="match-team-a">Tim A</Label>
              <Select
                value={draft.teamAId}
                onValueChange={(value) =>
                  setDraft((current) => ({ ...current, teamAId: value }))
                }
              >
                <SelectTrigger
                  id="match-team-a"
                  data-ocid="match.team_a_select"
                >
                  <SelectValue placeholder="Pilih tim" />
                </SelectTrigger>
                <SelectContent>
                  {(teams ?? []).map((team) => (
                    <SelectItem
                      key={team.id.toString()}
                      value={team.id.toString()}
                    >
                      {team.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="match-team-b">Tim B</Label>
              <Select
                value={draft.teamBId}
                onValueChange={(value) =>
                  setDraft((current) => ({ ...current, teamBId: value }))
                }
              >
                <SelectTrigger
                  id="match-team-b"
                  data-ocid="match.team_b_select"
                >
                  <SelectValue placeholder="Pilih tim" />
                </SelectTrigger>
                <SelectContent>
                  {(teams ?? []).map((team) => (
                    <SelectItem
                      key={team.id.toString()}
                      value={team.id.toString()}
                    >
                      {team.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="match-schedule">Jadwal</Label>
            <Input
              id="match-schedule"
              type="datetime-local"
              data-ocid="match.schedule_input"
              value={draft.scheduledAt}
              onChange={(event) =>
                setDraft((current) => ({
                  ...current,
                  scheduledAt: event.target.value,
                }))
              }
            />
          </div>
        </div>
        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            data-ocid="match.cancel_button"
            onClick={() => onOpenChange(false)}
          >
            Batal
          </Button>
          <Button
            type="button"
            data-ocid="match.save_button"
            onClick={handleSubmit}
            disabled={!canSubmit}
          >
            {isPending ? "Menyimpan…" : "Simpan"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

type ScoreDialogProps = {
  tournamentId: bigint;
  match: Match;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

function ScoreDialog({
  tournamentId,
  match,
  open,
  onOpenChange,
}: ScoreDialogProps) {
  const recordScore = useRecordScore();
  const [scoreA, setScoreA] = useState("");
  const [scoreB, setScoreB] = useState("");
  const [initializedFor, setInitializedFor] = useState<string | null>(null);

  if (open && initializedFor !== match.id.toString()) {
    setInitializedFor(match.id.toString());
    setScoreA(match.scoreA?.toString() ?? "");
    setScoreB(match.scoreB?.toString() ?? "");
  }

  const canSubmit =
    scoreA.trim() !== "" && scoreB.trim() !== "" && !recordScore.isPending;

  function handleSubmit() {
    if (!canSubmit) return;
    recordScore.mutate(
      {
        id: match.id,
        scoreA: BigInt(scoreA),
        scoreB: BigInt(scoreB),
        tournamentId,
      },
      {
        onSuccess: () => {
          toast.success("Skor dicatat");
          onOpenChange(false);
        },
        onError: () => toast.error("Gagal mencatat skor"),
      },
    );
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent data-ocid="score.dialog">
        <DialogHeader>
          <DialogTitle className="font-display">Catat Skor</DialogTitle>
          <DialogDescription>
            {match.round} — masukkan skor akhir pertandingan.
          </DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-2 gap-4 py-2">
          <div className="grid gap-2">
            <Label htmlFor="score-a">Skor Tim A</Label>
            <Input
              id="score-a"
              type="number"
              min={0}
              data-ocid="score.a_input"
              value={scoreA}
              onChange={(event) => setScoreA(event.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="score-b">Skor Tim B</Label>
            <Input
              id="score-b"
              type="number"
              min={0}
              data-ocid="score.b_input"
              value={scoreB}
              onChange={(event) => setScoreB(event.target.value)}
            />
          </div>
        </div>
        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            data-ocid="score.cancel_button"
            onClick={() => onOpenChange(false)}
          >
            Batal
          </Button>
          <Button
            type="button"
            data-ocid="score.save_button"
            onClick={handleSubmit}
            disabled={!canSubmit}
          >
            {recordScore.isPending ? "Menyimpan…" : "Simpan Skor"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export function MatchesPanel() {
  const { data: tournaments, isPending: tournamentsPending } = useTournaments();
  const [tournamentId, setTournamentId] = useState<string>("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingMatch, setEditingMatch] = useState<Match | null>(null);
  const [scoreMatch, setScoreMatch] = useState<Match | null>(null);

  const selectedId = tournamentId === "" ? null : BigInt(tournamentId);
  const { data: matches, isPending: matchesPending } = useMatches(
    selectedId ?? 0n,
    { enabled: selectedId !== null },
  );
  const { data: teams } = useTeams();
  const deleteMatch = useDeleteMatch();
  const setMatchStatus = useSetMatchStatus();
  const setMatchWinner = useSetMatchWinner();

  const teamName = (id?: bigint) => {
    if (id === undefined) return "Belum ditentukan";
    return teams?.find((team) => team.id === id)?.name ?? "Tim dihapus";
  };

  const visibleMatches = selectedId === null ? [] : (matches ?? []);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="grid w-full max-w-sm gap-2">
          <Label htmlFor="match-tournament">Pilih Turnamen</Label>
          <Select value={tournamentId} onValueChange={setTournamentId}>
            <SelectTrigger
              id="match-tournament"
              data-ocid="match.tournament_select"
            >
              <SelectValue placeholder="Pilih turnamen" />
            </SelectTrigger>
            <SelectContent>
              {(tournaments ?? []).map((tournament) => (
                <SelectItem
                  key={tournament.id.toString()}
                  value={tournament.id.toString()}
                >
                  {tournament.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <Button
          type="button"
          data-ocid="match.open_modal_button"
          onClick={() => {
            setEditingMatch(null);
            setDialogOpen(true);
          }}
          disabled={selectedId === null}
        >
          <Plus className="h-4 w-4" aria-hidden="true" />
          Pertandingan Baru
        </Button>
      </div>

      {tournamentsPending ? (
        <Skeleton data-ocid="loading_state" className="h-10 w-full" />
      ) : null}

      {selectedId === null ? (
        <EmptyState
          icon={Trophy}
          title="Belum ada turnamen dipilih"
          description="Pilih turnamen terlebih dahulu untuk melihat dan mengelola pertandingannya."
        />
      ) : matchesPending ? (
        <div data-ocid="loading_state" className="space-y-2">
          {Array.from({ length: 4 }, (_, i) => `match-skeleton-${i}`).map(
            (id) => (
              <Skeleton key={id} className="h-14 w-full" />
            ),
          )}
        </div>
      ) : visibleMatches.length === 0 ? (
        <EmptyState
          icon={CalendarClock}
          title="Belum ada pertandingan"
          description="Tambahkan pertandingan pertama untuk turnamen ini."
          action={
            <Button
              type="button"
              data-ocid="match.empty_add_button"
              onClick={() => {
                setEditingMatch(null);
                setDialogOpen(true);
              }}
            >
              <Plus className="h-4 w-4" aria-hidden="true" />
              Pertandingan Baru
            </Button>
          }
        />
      ) : (
        <div className="overflow-hidden rounded-lg border border-border bg-card">
          <Table data-ocid="match.table">
            <TableHeader>
              <TableRow>
                <TableHead>Babak</TableHead>
                <TableHead>Pertandingan</TableHead>
                <TableHead>Jadwal</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {visibleMatches.map((match, index) => (
                <TableRow
                  key={match.id.toString()}
                  data-ocid={`match.row.${index + 1}`}
                >
                  <TableCell className="font-medium">{match.round}</TableCell>
                  <TableCell>
                    <span className="font-mono text-sm">
                      {teamName(match.teamAId)}{" "}
                      {formatScore(match.scoreA, match.scoreB)}{" "}
                      {teamName(match.teamBId)}
                    </span>
                    {match.winnerId !== undefined ? (
                      <span className="ml-2 inline-flex items-center gap-1 text-xs text-primary">
                        <Trophy className="h-3 w-3" aria-hidden="true" />
                        {teamName(match.winnerId)}
                      </span>
                    ) : null}
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {formatDateTime(match.scheduledAt)}
                  </TableCell>
                  <TableCell>
                    <Select
                      value={match.status}
                      onValueChange={(value) =>
                        setMatchStatus.mutate(
                          {
                            id: match.id,
                            status: value as MatchStatus,
                            tournamentId: selectedId,
                          },
                          {
                            onSuccess: () => toast.success("Status diperbarui"),
                            onError: () =>
                              toast.error("Gagal memperbarui status"),
                          },
                        )
                      }
                    >
                      <SelectTrigger
                        className="h-8 w-[150px]"
                        data-ocid={`match.status_select.${index + 1}`}
                      >
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.values(MatchStatus).map((status) => (
                          <SelectItem key={status} value={status}>
                            {matchStatusLabel(status)}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-1">
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        data-ocid={`match.score_button.${index + 1}`}
                        aria-label={`Catat skor ${match.round}`}
                        onClick={() => setScoreMatch(match)}
                      >
                        <Trophy className="h-4 w-4" aria-hidden="true" />
                      </Button>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        data-ocid={`match.edit_button.${index + 1}`}
                        aria-label={`Ubah ${match.round}`}
                        onClick={() => {
                          setEditingMatch(match);
                          setDialogOpen(true);
                        }}
                      >
                        <Pencil className="h-4 w-4" aria-hidden="true" />
                      </Button>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        data-ocid={`match.delete_button.${index + 1}`}
                        aria-label={`Hapus ${match.round}`}
                        onClick={() =>
                          deleteMatch.mutate(
                            { id: match.id, tournamentId: selectedId },
                            {
                              onSuccess: () =>
                                toast.success("Pertandingan dihapus"),
                              onError: () => toast.error("Gagal menghapus"),
                            },
                          )
                        }
                      >
                        <Trash2 className="h-4 w-4" aria-hidden="true" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      {selectedId !== null ? (
        <MatchDialog
          tournamentId={selectedId}
          match={editingMatch}
          open={dialogOpen}
          onOpenChange={setDialogOpen}
        />
      ) : null}

      {selectedId !== null && scoreMatch ? (
        <ScoreDialog
          tournamentId={selectedId}
          match={scoreMatch}
          open={scoreMatch !== null}
          onOpenChange={(open) => {
            if (!open) setScoreMatch(null);
          }}
        />
      ) : null}

      {selectedId !== null && visibleMatches.length > 0 ? (
        <div className="rounded-lg border border-border bg-card p-4">
          <p className="mb-3 font-mono text-xs uppercase tracking-wider text-muted-foreground">
            Tandai Pemenang
          </p>
          <div className="flex flex-wrap gap-2">
            {visibleMatches
              .filter((match) => match.teamAId !== undefined)
              .map((match, index) => (
                <div
                  key={match.id.toString()}
                  className="flex items-center gap-2 rounded-md border border-border bg-background px-3 py-2"
                >
                  <span className="text-sm text-muted-foreground">
                    {match.round}:
                  </span>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    data-ocid={`match.winner_a_button.${index + 1}`}
                    onClick={() =>
                      setMatchWinner.mutate(
                        {
                          id: match.id,
                          winnerId: match.teamAId as bigint,
                          tournamentId: selectedId,
                        },
                        {
                          onSuccess: () => toast.success("Pemenang ditandai"),
                          onError: () => toast.error("Gagal menandai pemenang"),
                        },
                      )
                    }
                  >
                    {teamName(match.teamAId)}
                  </Button>
                  {match.teamBId !== undefined ? (
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      data-ocid={`match.winner_b_button.${index + 1}`}
                      onClick={() =>
                        setMatchWinner.mutate(
                          {
                            id: match.id,
                            winnerId: match.teamBId as bigint,
                            tournamentId: selectedId,
                          },
                          {
                            onSuccess: () => toast.success("Pemenang ditandai"),
                            onError: () =>
                              toast.error("Gagal menandai pemenang"),
                          },
                        )
                      }
                    >
                      {teamName(match.teamBId)}
                    </Button>
                  ) : null}
                </div>
              ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}
