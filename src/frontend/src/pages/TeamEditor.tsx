import type { Player, TeamInput } from "@/backend";
import { EmptyState } from "@/components/EmptyState";
import { PageHeader } from "@/components/PageHeader";
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
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/hooks/use-auth";
import {
  useAddTeamToTournament,
  useCreateTeam,
  useDeleteTeam,
  useRemoveTeamFromTournament,
  useSetRoster,
  useTeam,
  useTournaments,
  useUpdateTeam,
} from "@/lib/api";
import { formatNumber } from "@/lib/format";
import { ExternalBlob } from "@caffeineai/object-storage";
import { Link, useNavigate, useParams } from "@tanstack/react-router";
import {
  ArrowLeft,
  Gamepad2,
  ImagePlus,
  Loader2,
  Save,
  ShieldAlert,
  Trash2,
  Trophy,
  UserPlus,
  Users,
} from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { toast } from "sonner";

const CREATE_SENTINEL = "baru";

type RosterDraft = {
  id: bigint;
  name: string;
  role: string;
};

function nextPlayerId(roster: Array<RosterDraft>): bigint {
  let max = 0n;
  for (const player of roster) {
    if (player.id > max) max = player.id;
  }
  return max + 1n;
}

function AdminGate() {
  return (
    <div className="container py-16">
      <EmptyState
        icon={ShieldAlert}
        title="Akses khusus admin"
        description="Halaman ini hanya dapat diakses oleh administrator. Masuk dengan akun admin untuk mengelola tim."
        action={
          <Button type="button" asChild>
            <Link to="/tim">Kembali ke daftar tim</Link>
          </Button>
        }
      />
    </div>
  );
}

function EditorSkeleton() {
  return (
    <div data-ocid="loading_state" className="container py-10">
      <Skeleton className="h-8 w-64" />
      <Skeleton className="mt-3 h-4 w-96" />
      <div className="mt-8 grid gap-6 lg:grid-cols-[2fr_1fr]">
        <Skeleton className="h-96 rounded-lg" />
        <Skeleton className="h-96 rounded-lg" />
      </div>
    </div>
  );
}

export default function TeamEditor() {
  const { id } = useParams({ from: "/kelola/tim/$id" });
  const navigate = useNavigate();
  const { isAdmin, isAdminLoading } = useAuth();
  const isCreate = id === CREATE_SENTINEL;
  const teamId = isCreate ? null : BigInt(id);

  const { data: team, isLoading: teamLoading } = useTeam(teamId ?? 0n);
  const { data: tournaments } = useTournaments();

  const createTeam = useCreateTeam();
  const updateTeam = useUpdateTeam();
  const deleteTeam = useDeleteTeam();
  const setRosterMutation = useSetRoster();
  const addTeamToTournament = useAddTeamToTournament();
  const removeTeamFromTournament = useRemoveTeamFromTournament();

  const [name, setName] = useState("");
  const [game, setGame] = useState("");
  const [description, setDescription] = useState("");
  const [logoUrl, setLogoUrl] = useState("");
  const [roster, setRoster] = useState<Array<RosterDraft>>([]);
  const [tournamentIds, setTournamentIds] = useState<Array<bigint>>([]);
  const [uploadProgress, setUploadProgress] = useState<number | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [initialized, setInitialized] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isCreate || !team || initialized) return;
    setName(team.name);
    setGame(team.game);
    setDescription(team.description);
    setLogoUrl(team.logoUrl);
    setRoster(
      team.roster.map((player) => ({
        id: player.id,
        name: player.name,
        role: player.role,
      })),
    );
    setTournamentIds(team.tournamentIds);
    setInitialized(true);
  }, [isCreate, team, initialized]);

  const isSaving =
    createTeam.isPending || updateTeam.isPending || setRosterMutation.isPending;

  const sortedTournaments = useMemo(
    () =>
      [...(tournaments ?? [])].sort((a, b) =>
        a.name.localeCompare(b.name, "id"),
      ),
    [tournaments],
  );

  async function handleLogoChange(file: File) {
    setIsUploading(true);
    setUploadProgress(0);
    try {
      const bytes = new Uint8Array(await file.arrayBuffer());
      const blob = ExternalBlob.fromBytes(
        bytes,
        file.type,
        file.name,
      ).withUploadProgress((pct) => setUploadProgress(pct));
      setLogoUrl(blob.getDirectURL());
      setUploadProgress(100);
      toast.success("Logo berhasil diunggah");
    } catch {
      setUploadProgress(null);
      toast.error("Gagal mengunggah logo. Coba lagi.");
    } finally {
      setIsUploading(false);
    }
  }

  function handleAddPlayer() {
    setRoster((current) => [
      ...current,
      { id: nextPlayerId(current), name: "", role: "" },
    ]);
  }

  function handleUpdatePlayer(
    playerId: bigint,
    field: "name" | "role",
    value: string,
  ) {
    setRoster((current) =>
      current.map((player) =>
        player.id === playerId ? { ...player, [field]: value } : player,
      ),
    );
  }

  function handleRemovePlayer(playerId: bigint) {
    setRoster((current) => current.filter((player) => player.id !== playerId));
  }

  function handleToggleTournament(tournamentTeamId: bigint) {
    if (teamId === null) return;
    const isMember = tournamentIds.includes(tournamentTeamId);
    const mutation = isMember ? removeTeamFromTournament : addTeamToTournament;
    mutation.mutate(
      { id: tournamentTeamId, teamId },
      {
        onSuccess: () => {
          setTournamentIds((current) =>
            isMember
              ? current.filter((item) => item !== tournamentTeamId)
              : [...current, tournamentTeamId],
          );
          toast.success(
            isMember
              ? "Tim dikeluarkan dari turnamen"
              : "Tim ditambahkan ke turnamen",
          );
        },
        onError: () => {
          toast.error("Gagal memperbarui keikutsertaan turnamen");
        },
      },
    );
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const trimmedName = name.trim();
    const trimmedGame = game.trim();
    if (trimmedName === "" || trimmedGame === "") {
      toast.error("Nama dan game tim wajib diisi");
      return;
    }

    const input: TeamInput = {
      name: trimmedName,
      game: trimmedGame,
      description: description.trim(),
      logoUrl,
    };

    if (isCreate) {
      createTeam.mutate(input, {
        onSuccess: (createdTeam) => {
          const cleanedRoster: Array<Player> = roster
            .filter((player) => player.name.trim() !== "")
            .map((player) => ({
              id: player.id,
              name: player.name.trim(),
              role: player.role.trim(),
            }));

          if (cleanedRoster.length === 0) {
            toast.success("Tim berhasil dibuat");
            void navigate({ to: "/kelola" });
            return;
          }

          setRosterMutation.mutate(
            { id: createdTeam.id, roster: cleanedRoster },
            {
              onSuccess: () => {
                toast.success("Tim berhasil dibuat");
                void navigate({ to: "/kelola" });
              },
              onError: () => {
                toast.error("Tim tersimpan, tetapi roster gagal disimpan");
                void navigate({
                  to: `/kelola/tim/${createdTeam.id.toString()}`,
                });
              },
            },
          );
        },
        onError: () => {
          toast.error("Gagal membuat tim");
        },
      });
      return;
    }

    if (teamId === null) return;
    updateTeam.mutate(
      { id: teamId, input },
      {
        onSuccess: () => {
          const cleanedRoster: Array<Player> = roster
            .filter((player) => player.name.trim() !== "")
            .map((player) => ({
              id: player.id,
              name: player.name.trim(),
              role: player.role.trim(),
            }));
          setRosterMutation.mutate(
            { id: teamId, roster: cleanedRoster },
            {
              onSuccess: () => {
                toast.success("Tim berhasil diperbarui");
                void navigate({ to: "/kelola" });
              },
              onError: () => {
                toast.error("Data tim tersimpan, tetapi roster gagal disimpan");
              },
            },
          );
        },
        onError: () => {
          toast.error("Gagal memperbarui tim");
        },
      },
    );
  }

  function handleDelete() {
    if (teamId === null) return;
    deleteTeam.mutate(teamId, {
      onSuccess: () => {
        toast.success("Tim berhasil dihapus");
        void navigate({ to: "/kelola" });
      },
      onError: () => {
        toast.error("Gagal menghapus tim");
      },
    });
  }

  if (isAdminLoading) {
    return <EditorSkeleton />;
  }

  if (!isAdmin) {
    return <AdminGate />;
  }

  if (!isCreate && teamLoading) {
    return <EditorSkeleton />;
  }

  if (!isCreate && !team) {
    return (
      <div className="container py-16">
        <EmptyState
          icon={Users}
          title="Tim tidak ditemukan"
          description="Tim yang Anda cari mungkin telah dihapus atau tautannya tidak valid."
          action={
            <Button type="button" asChild>
              <Link to="/kelola">Kembali ke panel kelola</Link>
            </Button>
          }
        />
      </div>
    );
  }

  return (
    <div className="container py-10">
      <Button
        type="button"
        variant="ghost"
        size="sm"
        asChild
        className="mb-4 -ml-2"
      >
        <Link to="/kelola" data-ocid="team_editor.back_button">
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          Kembali ke Kelola
        </Link>
      </Button>

      <PageHeader
        eyebrow="Panel Admin"
        title={isCreate ? "Tim Baru" : `Ubah ${team?.name ?? "Tim"}`}
        description={
          isCreate
            ? "Lengkapi data tim, unggah logo, dan atur roster pemain."
            : "Perbarui data tim, logo, roster pemain, dan keikutsertaan turnamen."
        }
      />

      <form
        onSubmit={handleSubmit}
        data-ocid="team_editor.form"
        className="mt-8 grid gap-6 lg:grid-cols-[2fr_1fr]"
      >
        <div className="flex flex-col gap-6">
          <Card className="gap-5 rounded-lg border border-border bg-card p-6 shadow-none">
            <div className="flex items-center gap-2">
              <Gamepad2 className="h-4 w-4 text-primary" aria-hidden="true" />
              <h2 className="font-display text-base font-semibold text-foreground">
                Informasi Tim
              </h2>
            </div>

            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="team-name">Nama Tim</Label>
                <Input
                  id="team-name"
                  data-ocid="team_editor.name_input"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  placeholder="Contoh: Garuda Prime"
                  required
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="team-game">Game</Label>
                <Input
                  id="team-game"
                  data-ocid="team_editor.game_input"
                  value={game}
                  onChange={(event) => setGame(event.target.value)}
                  placeholder="Contoh: Mobile Legends"
                  required
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="team-description">Deskripsi</Label>
                <Textarea
                  id="team-description"
                  data-ocid="team_editor.description_textarea"
                  value={description}
                  onChange={(event) => setDescription(event.target.value)}
                  placeholder="Ceritakan tentang tim ini…"
                  rows={4}
                />
              </div>
            </div>
          </Card>

          <Card className="gap-5 rounded-lg border border-border bg-card p-6 shadow-none">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-primary" aria-hidden="true" />
                <h2 className="font-display text-base font-semibold text-foreground">
                  Roster Pemain
                </h2>
              </div>
              <Button
                type="button"
                variant="outline"
                size="sm"
                data-ocid="team_editor.add_player_button"
                onClick={handleAddPlayer}
              >
                <UserPlus className="h-4 w-4" aria-hidden="true" />
                Tambah Pemain
              </Button>
            </div>

            {roster.length === 0 ? (
              <p className="rounded-md border border-dashed border-border bg-muted/40 px-4 py-6 text-center text-sm text-muted-foreground">
                Belum ada pemain. Tambahkan pemain beserta perannya.
              </p>
            ) : (
              <ul className="flex flex-col gap-3">
                {roster.map((player, index) => (
                  <li
                    key={player.id.toString()}
                    data-ocid={`team_editor.player.${index + 1}`}
                    className="flex flex-col gap-3 rounded-md border border-border bg-background/40 p-3 sm:flex-row sm:items-center"
                  >
                    <Input
                      data-ocid={`team_editor.player_name_input.${index + 1}`}
                      value={player.name}
                      onChange={(event) =>
                        handleUpdatePlayer(
                          player.id,
                          "name",
                          event.target.value,
                        )
                      }
                      placeholder="Nama pemain"
                      aria-label={`Nama pemain ${index + 1}`}
                      className="sm:flex-1"
                    />
                    <Input
                      data-ocid={`team_editor.player_role_input.${index + 1}`}
                      value={player.role}
                      onChange={(event) =>
                        handleUpdatePlayer(
                          player.id,
                          "role",
                          event.target.value,
                        )
                      }
                      placeholder="Peran (mis. Jungler)"
                      aria-label={`Peran pemain ${index + 1}`}
                      className="sm:w-48"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      data-ocid={`team_editor.remove_player_button.${index + 1}`}
                      aria-label={`Hapus pemain ${index + 1}`}
                      onClick={() => handleRemovePlayer(player.id)}
                    >
                      <Trash2 className="h-4 w-4" aria-hidden="true" />
                    </Button>
                  </li>
                ))}
              </ul>
            )}

            {isCreate ? (
              <p className="text-xs text-muted-foreground">
                Roster akan tersimpan otomatis setelah tim dibuat.
              </p>
            ) : null}
          </Card>
        </div>

        <div className="flex flex-col gap-6">
          <Card className="gap-5 rounded-lg border border-border bg-card p-6 shadow-none">
            <div className="flex items-center gap-2">
              <ImagePlus className="h-4 w-4 text-primary" aria-hidden="true" />
              <h2 className="font-display text-base font-semibold text-foreground">
                Logo Tim
              </h2>
            </div>

            <div className="flex items-center gap-4">
              {logoUrl.trim() !== "" ? (
                <img
                  src={logoUrl}
                  alt="Pratinjau logo tim"
                  className="h-16 w-16 shrink-0 rounded-md border border-border bg-muted object-cover"
                />
              ) : (
                <div
                  aria-hidden="true"
                  className="flex h-16 w-16 shrink-0 items-center justify-center rounded-md border border-dashed border-border bg-muted text-muted-foreground"
                >
                  <ImagePlus className="h-6 w-6" />
                </div>
              )}
              <div className="min-w-0 flex-1">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(event) => {
                    const file = event.target.files?.[0];
                    if (file) void handleLogoChange(file);
                    event.target.value = "";
                  }}
                />
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  data-ocid="team_editor.upload_button"
                  disabled={isUploading}
                  onClick={() => fileInputRef.current?.click()}
                >
                  {isUploading ? (
                    <Loader2
                      className="h-4 w-4 animate-spin"
                      aria-hidden="true"
                    />
                  ) : (
                    <ImagePlus className="h-4 w-4" aria-hidden="true" />
                  )}
                  {isUploading ? "Mengunggah…" : "Pilih Logo"}
                </Button>
                <p className="mt-2 text-xs text-muted-foreground">
                  Format PNG, JPG, atau WEBP.
                </p>
              </div>
            </div>

            {uploadProgress !== null ? (
              <div data-ocid="team_editor.upload_progress">
                <Progress value={uploadProgress} />
                <p className="mt-1.5 font-mono text-xs text-muted-foreground">
                  {formatNumber(uploadProgress)}%
                </p>
              </div>
            ) : null}
          </Card>

          <Card className="gap-5 rounded-lg border border-border bg-card p-6 shadow-none">
            <div className="flex items-center gap-2">
              <Trophy className="h-4 w-4 text-primary" aria-hidden="true" />
              <h2 className="font-display text-base font-semibold text-foreground">
                Turnamen yang Diikuti
              </h2>
            </div>

            {isCreate ? (
              <p className="rounded-md border border-dashed border-border bg-muted/40 px-4 py-6 text-center text-sm text-muted-foreground">
                Simpan tim terlebih dahulu untuk mengatur keikutsertaan
                turnamen.
              </p>
            ) : sortedTournaments.length === 0 ? (
              <p className="rounded-md border border-dashed border-border bg-muted/40 px-4 py-6 text-center text-sm text-muted-foreground">
                Belum ada turnamen yang tersedia.
              </p>
            ) : (
              <ul className="flex flex-col gap-2">
                {sortedTournaments.map((tournament, index) => {
                  const isMember = tournamentIds.includes(tournament.id);
                  return (
                    <li key={tournament.id.toString()}>
                      <Button
                        type="button"
                        variant={isMember ? "default" : "outline"}
                        size="sm"
                        data-ocid={`team_editor.tournament_toggle.${index + 1}`}
                        aria-pressed={isMember}
                        className="h-auto w-full justify-start whitespace-normal py-2.5 text-left"
                        onClick={() => handleToggleTournament(tournament.id)}
                      >
                        <span className="flex flex-col items-start gap-0.5">
                          <span className="font-medium">{tournament.name}</span>
                          <span className="font-mono text-[11px] uppercase tracking-wider opacity-70">
                            {tournament.game}
                          </span>
                        </span>
                      </Button>
                    </li>
                  );
                })}
              </ul>
            )}
          </Card>

          <div className="flex flex-col gap-3">
            <Button
              type="submit"
              data-ocid="team_editor.submit_button"
              disabled={isSaving}
            >
              {isSaving ? (
                <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
              ) : (
                <Save className="h-4 w-4" aria-hidden="true" />
              )}
              {isCreate ? "Simpan Tim" : "Perbarui Tim"}
            </Button>

            {!isCreate ? (
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button
                    type="button"
                    variant="destructive"
                    data-ocid="team_editor.delete_button"
                    disabled={deleteTeam.isPending}
                  >
                    {deleteTeam.isPending ? (
                      <Loader2
                        className="h-4 w-4 animate-spin"
                        aria-hidden="true"
                      />
                    ) : (
                      <Trash2 className="h-4 w-4" aria-hidden="true" />
                    )}
                    Hapus Tim
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent data-ocid="team_editor.delete_dialog">
                  <AlertDialogHeader>
                    <AlertDialogTitle className="font-display">
                      Hapus tim ini?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      Tindakan ini permanen. Tim beserta rosternya akan dihapus
                      dan tidak dapat dikembalikan.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel data-ocid="team_editor.cancel_button">
                      Batal
                    </AlertDialogCancel>
                    <AlertDialogAction
                      data-ocid="team_editor.confirm_button"
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
