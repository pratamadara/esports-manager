import { TournamentStatus } from "@/backend";
import { EmptyState } from "@/components/EmptyState";
import { PageHeader } from "@/components/PageHeader";
import { MatchesPanel } from "@/components/manage/MatchesPanel";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/hooks/use-auth";
import {
  useDeleteTeam,
  useDeleteTournament,
  useSetTournamentStatus,
  useTeams,
  useTournaments,
} from "@/lib/api";
import {
  formatDate,
  formatPrizePool,
  tournamentStatusLabel,
} from "@/lib/format";
import { Link, useNavigate } from "@tanstack/react-router";
import {
  LogIn,
  Pencil,
  Plus,
  ShieldAlert,
  Trash2,
  Trophy,
  Users,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function Manage() {
  const { isAuthenticated, isInitializing, isAdmin, isAdminLoading, login } =
    useAuth();
  const navigate = useNavigate();
  const { data: tournaments, isPending: tournamentsPending } = useTournaments();
  const { data: teams, isPending: teamsPending } = useTeams();
  const deleteTournament = useDeleteTournament();
  const deleteTeam = useDeleteTeam();
  const setTournamentStatus = useSetTournamentStatus();
  const [pendingDelete, setPendingDelete] = useState<{
    kind: "turnamen" | "tim";
    id: bigint;
    name: string;
  } | null>(null);

  if (isInitializing || (isAuthenticated && isAdminLoading)) {
    return (
      <div className="container py-10">
        <Skeleton data-ocid="loading_state" className="h-10 w-64" />
        <Skeleton className="mt-4 h-4 w-96" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="container py-16">
        <EmptyState
          icon={LogIn}
          title="Masuk untuk mengakses panel admin"
          description="Halaman kelola hanya tersedia untuk pengguna yang sudah masuk dengan Internet Identity."
          action={
            <Button
              type="button"
              data-ocid="manage.login_button"
              onClick={login}
            >
              <LogIn className="h-4 w-4" aria-hidden="true" />
              Masuk
            </Button>
          }
        />
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="container py-16">
        <EmptyState
          icon={ShieldAlert}
          title="Hanya admin"
          description="Akun Anda tidak memiliki akses admin. Hubungi administrator untuk mendapatkan izin."
          action={
            <Button asChild variant="outline" data-ocid="manage.back_button">
              <Link to="/turnamen">Lihat Turnamen</Link>
            </Button>
          }
        />
      </div>
    );
  }

  return (
    <div className="container space-y-8 py-10">
      <PageHeader
        eyebrow="Panel Admin"
        title="Kelola"
        description="Kelola turnamen, tim, dan pertandingan dari satu pusat komando."
      />

      <Tabs defaultValue="turnamen" data-ocid="manage.tabs">
        <TabsList className="h-auto flex-wrap">
          <TabsTrigger value="turnamen" data-ocid="manage.turnamen_tab">
            Turnamen
          </TabsTrigger>
          <TabsTrigger value="tim" data-ocid="manage.tim_tab">
            Tim
          </TabsTrigger>
          <TabsTrigger value="pertandingan" data-ocid="manage.pertandingan_tab">
            Pertandingan
          </TabsTrigger>
        </TabsList>

        <TabsContent value="turnamen" className="mt-6">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-display text-lg font-semibold">
              Daftar Turnamen
            </h2>
            <Button
              type="button"
              data-ocid="tournament.create_button"
              onClick={() =>
                navigate({ to: "/kelola/turnamen/$id", params: { id: "baru" } })
              }
            >
              <Plus className="h-4 w-4" aria-hidden="true" />
              Turnamen Baru
            </Button>
          </div>
          {tournamentsPending ? (
            <div data-ocid="loading_state" className="space-y-2">
              {Array.from(
                { length: 4 },
                (_, i) => `tournament-skeleton-${i}`,
              ).map((id) => (
                <Skeleton key={id} className="h-14 w-full" />
              ))}
            </div>
          ) : (tournaments ?? []).length === 0 ? (
            <EmptyState
              icon={Trophy}
              title="Belum ada turnamen"
              description="Buat turnamen pertama untuk mulai mengelola kompetisi."
              action={
                <Button
                  type="button"
                  data-ocid="tournament.empty_add_button"
                  onClick={() =>
                    navigate({
                      to: "/kelola/turnamen/$id",
                      params: { id: "baru" },
                    })
                  }
                >
                  <Plus className="h-4 w-4" aria-hidden="true" />
                  Turnamen Baru
                </Button>
              }
            />
          ) : (
            <div className="overflow-hidden rounded-lg border border-border bg-card">
              <Table data-ocid="tournament.table">
                <TableHeader>
                  <TableRow>
                    <TableHead>Nama</TableHead>
                    <TableHead>Game</TableHead>
                    <TableHead>Jadwal</TableHead>
                    <TableHead>Hadiah</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Aksi</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {(tournaments ?? []).map((tournament, index) => (
                    <TableRow
                      key={tournament.id.toString()}
                      data-ocid={`tournament.row.${index + 1}`}
                    >
                      <TableCell className="font-medium">
                        {tournament.name}
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {tournament.game}
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {formatDate(tournament.schedule[0]?.startAt)}
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {formatPrizePool(tournament.prizePool)}
                      </TableCell>
                      <TableCell>
                        <Select
                          value={tournament.status}
                          onValueChange={(value) =>
                            setTournamentStatus.mutate(
                              {
                                id: tournament.id,
                                status: value as TournamentStatus,
                              },
                              {
                                onSuccess: () =>
                                  toast.success("Status turnamen diperbarui"),
                                onError: () =>
                                  toast.error("Gagal memperbarui status"),
                              },
                            )
                          }
                        >
                          <SelectTrigger
                            className="h-8 w-[150px]"
                            data-ocid={`tournament.status_select.${index + 1}`}
                          >
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {Object.values(TournamentStatus).map((status) => (
                              <SelectItem key={status} value={status}>
                                {tournamentStatusLabel(status)}
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
                            data-ocid={`tournament.edit_button.${index + 1}`}
                            aria-label={`Ubah ${tournament.name}`}
                            onClick={() =>
                              navigate({
                                to: "/kelola/turnamen/$id",
                                params: { id: tournament.id.toString() },
                              })
                            }
                          >
                            <Pencil className="h-4 w-4" aria-hidden="true" />
                          </Button>
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            data-ocid={`tournament.delete_button.${index + 1}`}
                            aria-label={`Hapus ${tournament.name}`}
                            onClick={() =>
                              setPendingDelete({
                                kind: "turnamen",
                                id: tournament.id,
                                name: tournament.name,
                              })
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
        </TabsContent>

        <TabsContent value="tim" className="mt-6">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-display text-lg font-semibold">Daftar Tim</h2>
            <Button
              type="button"
              data-ocid="team.create_button"
              onClick={() =>
                navigate({ to: "/kelola/tim/$id", params: { id: "baru" } })
              }
            >
              <Plus className="h-4 w-4" aria-hidden="true" />
              Tim Baru
            </Button>
          </div>
          {teamsPending ? (
            <div data-ocid="loading_state" className="space-y-2">
              {Array.from({ length: 4 }, (_, i) => `team-skeleton-${i}`).map(
                (id) => (
                  <Skeleton key={id} className="h-14 w-full" />
                ),
              )}
            </div>
          ) : (teams ?? []).length === 0 ? (
            <EmptyState
              icon={Users}
              title="Belum ada tim"
              description="Buat tim pertama untuk mulai mengelola roster pemain."
              action={
                <Button
                  type="button"
                  data-ocid="team.empty_add_button"
                  onClick={() =>
                    navigate({ to: "/kelola/tim/$id", params: { id: "baru" } })
                  }
                >
                  <Plus className="h-4 w-4" aria-hidden="true" />
                  Tim Baru
                </Button>
              }
            />
          ) : (
            <div className="overflow-hidden rounded-lg border border-border bg-card">
              <Table data-ocid="team.table">
                <TableHeader>
                  <TableRow>
                    <TableHead>Nama</TableHead>
                    <TableHead>Game</TableHead>
                    <TableHead>Roster</TableHead>
                    <TableHead>Turnamen</TableHead>
                    <TableHead className="text-right">Aksi</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {(teams ?? []).map((team, index) => (
                    <TableRow
                      key={team.id.toString()}
                      data-ocid={`team.row.${index + 1}`}
                    >
                      <TableCell className="font-medium">{team.name}</TableCell>
                      <TableCell className="text-muted-foreground">
                        {team.game}
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {team.roster.length} pemain
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {team.tournamentIds.length} turnamen
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-1">
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            data-ocid={`team.edit_button.${index + 1}`}
                            aria-label={`Ubah ${team.name}`}
                            onClick={() =>
                              navigate({
                                to: "/kelola/tim/$id",
                                params: { id: team.id.toString() },
                              })
                            }
                          >
                            <Pencil className="h-4 w-4" aria-hidden="true" />
                          </Button>
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            data-ocid={`team.delete_button.${index + 1}`}
                            aria-label={`Hapus ${team.name}`}
                            onClick={() =>
                              setPendingDelete({
                                kind: "tim",
                                id: team.id,
                                name: team.name,
                              })
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
        </TabsContent>

        <TabsContent value="pertandingan" className="mt-6">
          <MatchesPanel />
        </TabsContent>
      </Tabs>

      <AlertDialog
        open={pendingDelete !== null}
        onOpenChange={(open) => {
          if (!open) setPendingDelete(null);
        }}
      >
        <AlertDialogContent data-ocid="manage.delete_dialog">
          <AlertDialogHeader>
            <AlertDialogTitle className="font-display">
              Hapus {pendingDelete?.kind === "tim" ? "tim" : "turnamen"}?
            </AlertDialogTitle>
            <AlertDialogDescription>
              {pendingDelete?.name} akan dihapus permanen. Tindakan ini tidak
              dapat dibatalkan.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel data-ocid="manage.cancel_button">
              Batal
            </AlertDialogCancel>
            <AlertDialogAction
              data-ocid="manage.confirm_button"
              onClick={() => {
                if (!pendingDelete) return;
                if (pendingDelete.kind === "turnamen") {
                  deleteTournament.mutate(pendingDelete.id, {
                    onSuccess: () => toast.success("Turnamen dihapus"),
                    onError: () => toast.error("Gagal menghapus turnamen"),
                  });
                } else {
                  deleteTeam.mutate(pendingDelete.id, {
                    onSuccess: () => toast.success("Tim dihapus"),
                    onError: () => toast.error("Gagal menghapus tim"),
                  });
                }
              }}
            >
              Hapus
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
