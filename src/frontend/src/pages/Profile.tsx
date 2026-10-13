import { PageHeader } from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuth } from "@/hooks/use-auth";
import { useProfile, useSaveProfile } from "@/lib/api";
import {
  Check,
  Copy,
  LogIn,
  Pencil,
  ShieldAlert,
  UserRound,
} from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

function ProfileSkeleton() {
  return (
    <div
      data-ocid="profile.loading_state"
      className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]"
    >
      <Card className="rounded-lg shadow-none">
        <CardHeader>
          <Skeleton className="h-5 w-40" />
          <Skeleton className="h-4 w-64" />
        </CardHeader>
        <CardContent className="space-y-4">
          <Skeleton className="h-9 w-full" />
          <Skeleton className="h-9 w-32" />
        </CardContent>
      </Card>
      <Card className="rounded-lg shadow-none">
        <CardHeader>
          <Skeleton className="h-5 w-32" />
        </CardHeader>
        <CardContent className="space-y-3">
          <Skeleton className="h-9 w-full" />
          <Skeleton className="h-9 w-24" />
        </CardContent>
      </Card>
    </div>
  );
}

function SignInPrompt() {
  const { login, isInitializing, isLoggingIn } = useAuth();

  return (
    <Card
      data-ocid="profile.signin_prompt"
      className="mx-auto max-w-lg rounded-lg shadow-none"
    >
      <CardHeader className="items-center text-center">
        <span className="mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
          <ShieldAlert className="h-6 w-6 text-primary" aria-hidden="true" />
        </span>
        <CardTitle className="font-display text-xl">
          Masuk untuk melihat profil
        </CardTitle>
        <CardDescription>
          Profil Anda tersimpan dengan aman di Internet Identity. Masuk untuk
          mengatur nama tampilan dan melihat principal Anda.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex justify-center">
        <Button
          type="button"
          data-ocid="profile.login_button"
          onClick={login}
          disabled={isInitializing || isLoggingIn}
        >
          <LogIn className="h-4 w-4" aria-hidden="true" />
          {isInitializing ? "Memuat…" : isLoggingIn ? "Masuk…" : "Masuk"}
        </Button>
      </CardContent>
    </Card>
  );
}

function PrincipalField({ principal }: { principal: string }) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const timer = window.setTimeout(() => setCopied(false), 2000);
    return () => window.clearTimeout(timer);
  }, [copied]);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(principal);
      setCopied(true);
      toast.success("Principal disalin ke papan klip");
    } catch {
      toast.error("Gagal menyalin principal");
    }
  }

  return (
    <div className="space-y-2">
      <Label htmlFor="principal">Principal Anda</Label>
      <div className="flex items-center gap-2">
        <Input
          id="principal"
          data-ocid="profile.principal_input"
          readOnly
          value={principal}
          onFocus={(event) => event.currentTarget.select()}
          className="font-mono text-xs"
        />
        <Button
          type="button"
          variant="outline"
          size="icon"
          data-ocid="profile.copy_principal_button"
          aria-label="Salin principal"
          onClick={handleCopy}
        >
          {copied ? (
            <Check className="h-4 w-4 text-success" aria-hidden="true" />
          ) : (
            <Copy className="h-4 w-4" aria-hidden="true" />
          )}
        </Button>
      </div>
      <p className="text-xs text-muted-foreground">
        Bagikan principal ini agar admin dapat memberikan peran kepada Anda.
      </p>
    </div>
  );
}

export default function Profile() {
  const { isAuthenticated, isInitializing, principal } = useAuth();
  const profileQuery = useProfile();
  const saveProfile = useSaveProfile();

  const [displayName, setDisplayName] = useState("");
  const [initialized, setInitialized] = useState(false);

  const savedName = profileQuery.data?.displayName ?? "";
  const hasName = savedName.trim() !== "";

  // One-time initialization of the draft from the loaded profile.
  useEffect(() => {
    if (initialized || !profileQuery.isSuccess) return;
    setDisplayName(savedName);
    setInitialized(true);
  }, [initialized, profileQuery.isSuccess, savedName]);

  const trimmed = displayName.trim();
  const isDirty = trimmed !== savedName.trim();
  const canSubmit = trimmed !== "" && isDirty && !saveProfile.isPending;

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!canSubmit) return;
    saveProfile.mutate(
      { displayName: trimmed },
      {
        onSuccess: () => {
          toast.success("Nama tampilan diperbarui");
        },
        onError: () => {
          toast.error("Gagal menyimpan nama tampilan");
        },
      },
    );
  }

  if (isInitializing) {
    return (
      <div className="container py-10">
        <PageHeader
          eyebrow="Akun"
          title="Profil"
          description="Kelola profil pengguna Anda."
        />
        <div className="mt-8">
          <ProfileSkeleton />
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="container py-10">
        <PageHeader
          eyebrow="Akun"
          title="Profil"
          description="Kelola profil pengguna Anda."
        />
        <div className="mt-8">
          <SignInPrompt />
        </div>
      </div>
    );
  }

  const principalText = principal ? principal.toText() : "";

  return (
    <div className="container py-10">
      <PageHeader
        eyebrow="Akun"
        title="Profil"
        description="Kelola nama tampilan dan identitas Anda di ArenaID."
      />

      <div className="mt-8">
        {profileQuery.isPending ? (
          <ProfileSkeleton />
        ) : profileQuery.isError ? (
          <Card
            data-ocid="profile.error_state"
            className="rounded-lg shadow-none"
          >
            <CardHeader>
              <CardTitle className="font-display">
                Gagal memuat profil
              </CardTitle>
              <CardDescription>
                Terjadi kesalahan saat mengambil profil Anda. Coba muat ulang
                halaman ini.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button
                type="button"
                variant="outline"
                data-ocid="profile.retry_button"
                onClick={() => void profileQuery.refetch()}
              >
                Coba lagi
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
            <div className="space-y-6">
              {!hasName ? (
                <Card
                  data-ocid="profile.first_login_prompt"
                  className="rounded-lg border-primary/40 bg-primary/5 shadow-none"
                >
                  <CardHeader>
                    <span className="mb-1 flex h-10 w-10 items-center justify-center rounded-full bg-primary/15">
                      <UserRound
                        className="h-5 w-5 text-primary"
                        aria-hidden="true"
                      />
                    </span>
                    <CardTitle className="font-display text-lg">
                      Selamat datang! Atur nama tampilan Anda
                    </CardTitle>
                    <CardDescription>
                      Ini pertama kali Anda masuk. Masukkan nama tampilan agar
                      Anda dikenali di seluruh ArenaID.
                    </CardDescription>
                  </CardHeader>
                </Card>
              ) : null}

              <Card className="rounded-lg shadow-none">
                <CardHeader>
                  <CardTitle className="font-display text-lg">
                    Nama tampilan
                  </CardTitle>
                  <CardDescription>
                    Nama ini tampil pada aktivitas dan catatan Anda.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="displayName">Nama tampilan</Label>
                      <Input
                        id="displayName"
                        data-ocid="profile.display_name_input"
                        value={displayName}
                        onChange={(event) => setDisplayName(event.target.value)}
                        placeholder="Contoh: Rian Cast"
                        autoComplete="nickname"
                        maxLength={60}
                        aria-invalid={trimmed === ""}
                      />
                      {trimmed === "" ? (
                        <p
                          data-ocid="profile.display_name_error"
                          className="text-xs text-destructive"
                        >
                          Nama tampilan tidak boleh kosong.
                        </p>
                      ) : null}
                    </div>
                    <Button
                      type="submit"
                      data-ocid="profile.save_button"
                      disabled={!canSubmit}
                    >
                      <Pencil className="h-4 w-4" aria-hidden="true" />
                      {saveProfile.isPending
                        ? "Menyimpan…"
                        : hasName
                          ? "Simpan perubahan"
                          : "Simpan nama"}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            <Card className="h-fit rounded-lg shadow-none">
              <CardHeader>
                <CardTitle className="font-display text-lg">
                  Identitas
                </CardTitle>
                <CardDescription>
                  Principal Internet Identity Anda.
                </CardDescription>
              </CardHeader>
              <CardContent>
                {principalText ? (
                  <PrincipalField principal={principalText} />
                ) : (
                  <p className="text-sm text-muted-foreground">
                    Principal belum tersedia.
                  </p>
                )}
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
