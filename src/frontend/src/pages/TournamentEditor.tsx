import {
  type ScheduleEntry,
  type TournamentInput,
  type TournamentStatus,
  TournamentStatus as TournamentStatusEnum,
} from "@/backend";
import { EmptyState } from "@/components/EmptyState";
import { PageHeader } from "@/components/PageHeader";
import { StatusBadge } from "@/components/StatusBadge";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
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
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/hooks/use-auth";
import {
  useAddTeamToTournament,
  useCreateTournament,
  useDeleteTournament,
  useRemoveTeamFromTournament,
  useTeams,
  useTournament,
  useUpdateTournament,
} from "@/lib/api";
import { formatDateTime, tournamentStatusLabels } from "@/lib/format";
import { cn } from "@/lib/utils";
import { useNavigate, useParams } from "@tanstack/react-router";
import {
  Bold,
  CalendarClock,
  Italic,
  List,
  Lock,
  Plus,
  Save,
  ShieldAlert,
  Trash2,
  Users,
  X,
} from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { toast } from "sonner";

const CREATE_SENTINEL = "baru";

type ScheduleDraft = {
  key: string;
  caption: string;
  startAt: string;
  endAt: string;
};

type FormState = {
  name: string;
  game: string;
  format: string;
  prizePool: string;
  status: TournamentStatus;
  description: string;
  schedule: Array<ScheduleDraft>;
};

const emptyForm: FormState = {
  name: "",
  game: "",
  format: "",
  prizePool: "",
  status: TournamentStatusEnum.akanDatang,
  description: "",
  schedule: [],
};

/** Convert a bigint nanosecond timestamp to a `datetime-local` value. */
function timestampToLocalInput(timestamp: bigint | undefined): string {
  if (timestamp === undefined) return "";
  const date = new Date(Number(timestamp / 1_000_000n));
  if (Number.isNaN(date.getTime())) return "";
  const pad = (n: number) => n.toString().padStart(2, "0");
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(
    date.getDate(),
  )}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
}

/** Convert a `datetime-local` value to a bigint nanosecond timestamp. */
function localInputToTimestamp(value: string): bigint {
  const ms = new Date(value).getTime();
  if (Number.isNaN(ms)) return 0n;
  return BigInt(ms) * 1_000_000n;
}

function scheduleToDrafts(
  schedule: Array<ScheduleEntry>,
): Array<ScheduleDraft> {
  return schedule.map((entry) => ({
    key: entry.id.toString(),
    caption: entry.caption,
    startAt: timestampToLocalInput(entry.startAt),
    endAt: timestampToLocalInput(entry.endAt),
  }));
}

function draftsToSchedule(drafts: Array<ScheduleDraft>): Array<ScheduleEntry> {
  return drafts
    .filter((draft) => draft.caption.trim() !== "")
    .map((draft, index) => ({
      id: BigInt(index + 1),
      caption: draft.caption.trim(),
      startAt: localInputToTimestamp(draft.startAt),
      endAt: localInputToTimestamp(draft.endAt),
    }));
}

/* ----------------------------- Rich editor ----------------------------- */

function RichTextEditor({
  value,
  onChange,
}: {
  value: string;
  onChange: (html: string) => void;
}) {
  const editorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = editorRef.current;
    if (node && node.innerHTML !== value) {
      node.innerHTML = value;
    }
  }, [value]);

  const exec = useCallback(
    (command: string) => {
      editorRef.current?.focus();
      document.execCommand(command);
      if (editorRef.current) {
        onChange(editorRef.current.innerHTML);
      }
    },
    [onChange],
  );

  return (
    <div className="overflow-hidden rounded-md border border-input bg-background">
      <div className="flex items-center gap-1 border-b border-border bg-muted/50 p-1.5">
        <Button
          type="button"
          variant="ghost"
          size="icon"
          data-ocid="tournament.editor.bold_button"
          aria-label="Tebalkan teks"
          onClick={() => exec("bold")}
        >
          <Bold className="h-4 w-4" aria-hidden="true" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          data-ocid="tournament.editor.italic_button"
          aria-label="Miringkan teks"
          onClick={() => exec("italic")}
        >
          <Italic className="h-4 w-4" aria-hidden="true" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          data-ocid="tournament.editor.list_button"
          aria-label="Buat daftar berpoin"
          onClick={() => exec("insertUnorderedList")}
        >
          <List className="h-4 w-4" aria-hidden="true" />
        </Button>
      </div>
      <div
        ref={editorRef}
        contentEditable
        role="textbox"
        tabIndex={0}
        aria-multiline="true"
        aria-label="Deskripsi turnamen"
        data-ocid="tournament.editor"
        onInput={(event) => onChange(event.currentTarget.innerHTML)}
        className="min-h-[140px] px-3 py-2 text-sm text-foreground outline-none [&_ul]:list-disc [&_ul]:pl-5"
      />
    </div>
  );
}

/* ------------------------------- Page ------------------------------- */

export default function TournamentEditor() {
  const { id } = useParams({ from: "/kelola/turnamen/$id" });
  const navigate = useNavigate();
  const { isAdmin, isAdminLoading, isAuthenticated } = useAuth();

  const isCreate = id === CREATE_SENTINEL;
  const tournamentId = useMemo(() => {
    if (isCreate) return null;
    try {
      return BigInt(id);
    } catch {
      return null;
    }
  }, [id, isCreate]);

  const tournamentQuery = useTournament(tournamentId ?? 0n);
  const teamsQuery = useTeams();
  const createTournament = useCreateTournament();
  const updateTournament = useUpdateTournament();
  const deleteTournament = useDeleteTournament();
  const addTeam = useAddTeamToTournament();
  const removeTeam = useRemoveTeamFromTournament();

  const [form, setForm] = useState<FormState>(emptyForm);
  const [initialized, setInitialized] = useState(false);

  const tournament = tournamentQuery.data ?? null;

  useEffect(() => {
    if (isCreate || initialized || !tournament) return;
    setForm({
      name: tournament.name,
      game: tournament.game,
      format: tournament.format,
      prizePool: tournament.prizePool,
      status: tournament.status,
      description: tournament.description,
      schedule: scheduleToDrafts(tournament.schedule),
    });
    setInitialized(true);
  }, [isCreate, initialized, tournament]);

  const isSaving = createTournament.isPending || updateTournament.isPending;

  const updateField = <K extends keyof FormState>(
    key: K,
    value: FormState[K],
  ) => {
    setForm((current) => ({ ...current, [key]: value }));
  };

  const addScheduleEntry = () => {
    setForm((current) => ({
      ...current,
      schedule: [
        ...current.schedule,
        {
          key: `baru-${Date.now()}`,
          caption: "",
          startAt: "",
          endAt: "",
        },
      ],
    }));
  };

  const updateScheduleEntry = (key: string, patch: Partial<ScheduleDraft>) => {
    setForm((current) => ({
      ...current,
      schedule: current.schedule.map((entry) =>
        entry.key === key ? { ...entry, ...patch } : entry,
      ),
    }));
  };

  const removeScheduleEntry = (key: string) => {
    setForm((current) => ({
      ...current,
      schedule: current.schedule.filter((entry) => entry.key !== key),
    }));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (form.name.trim() === "") {
      toast.error("Nama turnamen wajib diisi.");
      return;
    }
    const input: TournamentInput = {
      name: form.name.trim(),
      game: form.game.trim(),
      format: form.format.trim(),
      prizePool: form.prizePool.trim(),
      status: form.status,
      description: form.description,
      schedule: draftsToSchedule(form.schedule),
    };

    if (isCreate) {
      createTournament.mutate(input, {
        onSuccess: () => {
          toast.success("Turnamen berhasil dibuat.");
          void navigate({ to: "/kelola" });
        },
        onError: () => toast.error("Gagal membuat turnamen."),
      });
      return;
    }

    if (tournamentId === null) {
      toast.error("ID turnamen tidak valid.");
      return;
    }
    updateTournament.mutate(
      { id: tournamentId, input },
      {
        onSuccess: () => {
          toast.success("Perubahan turnamen disimpan.");
          void navigate({ to: "/kelola" });
        },
        onError: () => toast.error("Gagal menyimpan turnamen."),
      },
    );
  };

  const handleDelete = () => {
    if (tournamentId === null) return;
    deleteTournament.mutate(tournamentId, {
      onSuccess: () => {
        toast.success("Turnamen dihapus.");
        void navigate({ to: "/kelola" });
      },
      onError: () => toast.error("Gagal menghapus turnamen."),
    });
  };

  const handleToggleTeam = (teamId: bigint, isMember: boolean) => {
    if (tournamentId === null) {
      toast.error("Simpan turnamen terlebih dahulu untuk mengelola tim.");
      return;
    }
    if (isMember) {
      removeTeam.mutate(
        { id: tournamentId, teamId },
        {
          onSuccess: () => toast.success("Tim dikeluarkan dari turnamen."),
          onError: () => toast.error("Gagal mengeluarkan tim."),
        },
      );
      return;
    }
    addTeam.mutate(
      { id: tournamentId, teamId },
      {
        onSuccess: () => toast.success("Tim ditambahkan ke turnamen."),
        onError: () => toast.error("Gagal menambahkan tim."),
      },
    );
  };

  /* ----------------------------- Gates ----------------------------- */

  if (!isAuthenticated || (!isAdminLoading && !isAdmin)) {
    return (
      <div className="container py-10">
        <PageHeader
          eyebrow="Panel Admin"
          title="Akses Terbatas"
          description="Halaman ini hanya dapat diakses oleh administrator."
        />
        <div className="mt-8">
          <EmptyState
            icon={ShieldAlert}
            title="Anda bukan administrator"
            description="Masuk dengan akun administrator untuk mengelola turnamen."
            action={
              <Button
                type="button"
                variant="outline"
                data-ocid="tournament.editor.back_button"
                onClick={() => void navigate({ to: "/kelola" })}
              >
                Kembali ke Panel
              </Button>
            }
          />
        </div>
      </div>
    );
  }

  if (isAdminLoading) {
    return (
      <div className="container py-10" data-ocid="loading_state">
        <Skeleton className="h-9 w-64" />
        <Skeleton className="mt-6 h-96 w-full" />
      </div>
    );
  }

  if (!isCreate && tournamentQuery.isPending) {
    return (
      <div className="container py-10" data-ocid="loading_state">
        <Skeleton className="h-9 w-64" />
        <Skeleton className="mt-6 h-96 w-full" />
      </div>
    );
  }

  if (!isCreate && !tournament) {
    return (
      <div className="container py-10">
        <PageHeader
          eyebrow="Panel Admin"
          title="Turnamen Tidak Ditemukan"
          description="Turnamen yang Anda cari tidak tersedia."
        />
        <div className="mt-8">
          <EmptyState
            icon={CalendarClock}
            title="Turnamen tidak ditemukan"
            description="Turnamen mungkin telah dihapus atau tautannya tidak valid."
            action={
              <Button
                type="button"
                data-ocid="tournament.editor.back_button"
                onClick={() => void navigate({ to: "/kelola" })}
              >
                Kembali ke Panel
              </Button>
            }
          />
        </div>
      </div>
    );
  }

  const teams = teamsQuery.data ?? [];
  const memberIds = tournament?.teamIds ?? [];

  return (
    <div className="container py-10">
      <PageHeader
        eyebrow="Panel Admin"
        title={isCreate ? "Turnamen Baru" : "Ubah Turnamen"}
        description={
          isCreate
            ? "Lengkapi detail turnamen, jadwal, dan tim peserta."
            : "Perbarui detail turnamen, jadwal, dan tim peserta."
        }
        actions={
          <Button
            type="button"
            variant="outline"
            data-ocid="tournament.editor.cancel_button"
            onClick={() => void navigate({ to: "/kelola" })}
          >
            Batal
          </Button>
        }
      />

      <form
        onSubmit={handleSubmit}
        data-ocid="tournament.editor.form"
        className="mt-8 grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]"
      >
        <div className="flex flex-col gap-6">
          {/* Detail */}
          <section
            data-ocid="tournament.editor.detail_section"
            className="rounded-lg border border-border bg-card p-5 shadow-subtle"
          >
            <h2 className="font-display text-lg font-semibold text-foreground">
              Detail Turnamen
            </h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <div className="flex flex-col gap-2 sm:col-span-2">
                <Label htmlFor="tournament-name">Nama Turnamen</Label>
                <Input
                  id="tournament-name"
                  data-ocid="tournament.editor.name_input"
                  value={form.name}
                  onChange={(event) => updateField("name", event.target.value)}
                  placeholder="Contoh: ArenaID Mobile Legends Championship"
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="tournament-game">Game</Label>
                <Input
                  id="tournament-game"
                  data-ocid="tournament.editor.game_input"
                  value={form.game}
                  onChange={(event) => updateField("game", event.target.value)}
                  placeholder="Mobile Legends"
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="tournament-format">Format</Label>
                <Input
                  id="tournament-format"
                  data-ocid="tournament.editor.format_input"
                  value={form.format}
                  onChange={(event) =>
                    updateField("format", event.target.value)
                  }
                  placeholder="Single Elimination, Bo3"
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="tournament-prize">Hadiah</Label>
                <Input
                  id="tournament-prize"
                  data-ocid="tournament.editor.prize_input"
                  value={form.prizePool}
                  onChange={(event) =>
                    updateField("prizePool", event.target.value)
                  }
                  placeholder="Rp50.000.000"
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="tournament-status">Status</Label>
                <Select
                  value={form.status}
                  onValueChange={(value) =>
                    updateField("status", value as TournamentStatus)
                  }
                >
                  <SelectTrigger
                    id="tournament-status"
                    data-ocid="tournament.editor.status_select"
                  >
                    <SelectValue placeholder="Pilih status" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.values(TournamentStatusEnum).map((status) => (
                      <SelectItem key={status} value={status}>
                        {tournamentStatusLabels[status]}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-col gap-2 sm:col-span-2">
                <Label htmlFor="tournament-description">Deskripsi</Label>
                <RichTextEditor
                  value={form.description}
                  onChange={(html) => updateField("description", html)}
                />
              </div>
            </div>
          </section>

          {/* Schedule */}
          <section
            data-ocid="tournament.editor.schedule_section"
            className="rounded-lg border border-border bg-card p-5 shadow-subtle"
          >
            <div className="flex items-center justify-between gap-3">
              <h2 className="font-display text-lg font-semibold text-foreground">
                Jadwal Turnamen
              </h2>
              <Button
                type="button"
                variant="outline"
                size="sm"
                data-ocid="tournament.editor.add_schedule_button"
                onClick={addScheduleEntry}
              >
                <Plus className="h-4 w-4" aria-hidden="true" />
                Tambah Jadwal
              </Button>
            </div>

            {form.schedule.length === 0 ? (
              <p className="mt-4 rounded-md border border-dashed border-border px-4 py-6 text-center text-sm text-muted-foreground">
                Belum ada jadwal. Tambahkan sesi seperti pembukaan, kualifikasi,
                atau babak final.
              </p>
            ) : (
              <ul className="mt-4 flex flex-col gap-3">
                {form.schedule.map((entry, index) => (
                  <li
                    key={entry.key}
                    data-ocid={`tournament.editor.schedule_item.${index + 1}`}
                    className="rounded-md border border-border bg-background p-3"
                  >
                    <div className="grid gap-3 sm:grid-cols-2">
                      <div className="flex flex-col gap-2 sm:col-span-2">
                        <Label htmlFor={`schedule-caption-${entry.key}`}>
                          Keterangan
                        </Label>
                        <Input
                          id={`schedule-caption-${entry.key}`}
                          data-ocid={`tournament.editor.schedule_caption_input.${index + 1}`}
                          value={entry.caption}
                          onChange={(event) =>
                            updateScheduleEntry(entry.key, {
                              caption: event.target.value,
                            })
                          }
                          placeholder="Babak Penyisihan"
                        />
                      </div>
                      <div className="flex flex-col gap-2">
                        <Label htmlFor={`schedule-start-${entry.key}`}>
                          Mulai
                        </Label>
                        <Input
                          id={`schedule-start-${entry.key}`}
                          type="datetime-local"
                          data-ocid={`tournament.editor.schedule_start_input.${index + 1}`}
                          value={entry.startAt}
                          onChange={(event) =>
                            updateScheduleEntry(entry.key, {
                              startAt: event.target.value,
                            })
                          }
                        />
                      </div>
                      <div className="flex flex-col gap-2">
                        <Label htmlFor={`schedule-end-${entry.key}`}>
                          Selesai
                        </Label>
                        <Input
                          id={`schedule-end-${entry.key}`}
                          type="datetime-local"
                          data-ocid={`tournament.editor.schedule_end_input.${index + 1}`}
                          value={entry.endAt}
                          onChange={(event) =>
                            updateScheduleEntry(entry.key, {
                              endAt: event.target.value,
                            })
                          }
                        />
                      </div>
                    </div>
                    <div className="mt-3 flex items-center justify-between gap-3">
                      <span className="font-mono text-xs text-muted-foreground">
                        {entry.startAt
                          ? formatDateTime(localInputToTimestamp(entry.startAt))
                          : "Jadwal belum ditentukan"}
                      </span>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        data-ocid={`tournament.editor.remove_schedule_button.${index + 1}`}
                        onClick={() => removeScheduleEntry(entry.key)}
                      >
                        <X className="h-4 w-4" aria-hidden="true" />
                        Hapus
                      </Button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </section>
        </div>

        {/* Sidebar */}
        <div className="flex flex-col gap-6">
          <section
            data-ocid="tournament.editor.teams_section"
            className="rounded-lg border border-border bg-card p-5 shadow-subtle"
          >
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-primary" aria-hidden="true" />
              <h2 className="font-display text-lg font-semibold text-foreground">
                Tim Peserta
              </h2>
            </div>

            {isCreate ? (
              <p className="mt-4 rounded-md border border-dashed border-border px-4 py-6 text-center text-sm text-muted-foreground">
                Simpan turnamen terlebih dahulu untuk memilih tim peserta.
              </p>
            ) : teamsQuery.isPending ? (
              <div className="mt-4 flex flex-col gap-2">
                {Array.from({ length: 4 }, (_, i) => `team-skeleton-${i}`).map(
                  (key) => (
                    <Skeleton key={key} className="h-12 w-full" />
                  ),
                )}
              </div>
            ) : teams.length === 0 ? (
              <p className="mt-4 rounded-md border border-dashed border-border px-4 py-6 text-center text-sm text-muted-foreground">
                Belum ada tim terdaftar.
              </p>
            ) : (
              <ul className="mt-4 flex flex-col gap-2">
                {teams.map((team, index) => {
                  const isMember = memberIds.some(
                    (memberId) => memberId === team.id,
                  );
                  return (
                    <li key={team.id.toString()}>
                      <button
                        type="button"
                        data-ocid={`tournament.editor.team_toggle.${index + 1}`}
                        aria-pressed={isMember}
                        onClick={() => handleToggleTeam(team.id, isMember)}
                        className={cn(
                          "flex w-full items-center justify-between gap-3 rounded-md border px-3 py-2.5 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                          isMember
                            ? "border-primary/50 bg-primary/10"
                            : "border-border bg-background hover:bg-muted",
                        )}
                      >
                        <span className="min-w-0">
                          <span className="block truncate text-sm font-medium text-foreground">
                            {team.name}
                          </span>
                          <span className="block truncate font-mono text-xs text-muted-foreground">
                            {team.game}
                          </span>
                        </span>
                        <span
                          className={cn(
                            "shrink-0 rounded-full border px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider",
                            isMember
                              ? "border-primary/50 bg-primary/15 text-primary"
                              : "border-border bg-muted text-muted-foreground",
                          )}
                        >
                          {isMember ? "Peserta" : "Tambah"}
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            )}
          </section>

          {!isCreate && tournament ? (
            <section
              data-ocid="tournament.editor.meta_section"
              className="rounded-lg border border-border bg-card p-5 shadow-subtle"
            >
              <h2 className="font-display text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                Ringkasan
              </h2>
              <div className="mt-3 flex items-center gap-2">
                <StatusBadge status={tournament.status} />
              </div>
              <dl className="mt-4 flex flex-col gap-2 text-sm">
                <div className="flex items-center justify-between gap-3">
                  <dt className="text-muted-foreground">Dibuat</dt>
                  <dd className="font-mono text-xs text-foreground">
                    {formatDateTime(tournament.createdAt)}
                  </dd>
                </div>
                <div className="flex items-center justify-between gap-3">
                  <dt className="text-muted-foreground">Diperbarui</dt>
                  <dd className="font-mono text-xs text-foreground">
                    {formatDateTime(tournament.updatedAt)}
                  </dd>
                </div>
              </dl>
            </section>
          ) : null}

          <div className="flex flex-col gap-3">
            <Button
              type="submit"
              data-ocid="tournament.editor.save_button"
              disabled={isSaving}
              className="w-full"
            >
              <Save className="h-4 w-4" aria-hidden="true" />
              {isSaving
                ? "Menyimpan…"
                : isCreate
                  ? "Buat Turnamen"
                  : "Simpan Perubahan"}
            </Button>

            {!isCreate ? (
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button
                    type="button"
                    variant="destructive"
                    data-ocid="tournament.editor.delete_button"
                    className="w-full"
                  >
                    <Trash2 className="h-4 w-4" aria-hidden="true" />
                    Hapus Turnamen
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent data-ocid="tournament.editor.delete_dialog">
                  <AlertDialogHeader>
                    <AlertDialogTitle>Hapus turnamen ini?</AlertDialogTitle>
                    <AlertDialogDescription>
                      Tindakan ini tidak dapat dibatalkan. Seluruh data turnamen
                      akan dihapus permanen.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel data-ocid="tournament.editor.delete_cancel_button">
                      Batal
                    </AlertDialogCancel>
                    <AlertDialogAction
                      data-ocid="tournament.editor.delete_confirm_button"
                      onClick={handleDelete}
                    >
                      Hapus
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            ) : null}
          </div>
        </div>
      </form>
    </div>
  );
}
