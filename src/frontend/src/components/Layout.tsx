import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Toaster } from "@/components/ui/sonner";
import { useAuth } from "@/hooks/use-auth";
import { cn } from "@/lib/utils";
import { Link, useRouterState } from "@tanstack/react-router";
import { LogIn, LogOut, Menu, Shield, Swords } from "lucide-react";
import { type ReactNode, useState } from "react";

type NavItem = {
  to: string;
  label: string;
  adminOnly?: boolean;
};

const navItems: Array<NavItem> = [
  { to: "/turnamen", label: "Turnamen" },
  { to: "/tim", label: "Tim" },
  { to: "/kelola", label: "Kelola", adminOnly: true },
];

function Wordmark() {
  return (
    <Link
      to="/"
      data-ocid="nav.home_link"
      className="group flex items-center gap-2.5 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
    >
      <span className="flex h-9 w-9 items-center justify-center rounded-md bg-gradient-primary shadow-subtle">
        <Swords
          className="h-5 w-5 text-primary-foreground"
          aria-hidden="true"
        />
      </span>
      <span className="flex flex-col leading-none">
        <span className="font-display text-base font-bold tracking-tight text-foreground">
          ARENA<span className="text-primary">ID</span>
        </span>
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
          Command Center
        </span>
      </span>
    </Link>
  );
}

function NavLinks({ onNavigate }: { onNavigate?: () => void }) {
  const { isAdmin } = useAuth();
  const routerState = useRouterState();
  const currentPath = routerState.location.pathname;

  return (
    <>
      {navItems
        .filter((item) => !item.adminOnly || isAdmin)
        .map((item) => {
          const isActive = currentPath.startsWith(item.to);
          return (
            <Link
              key={item.to}
              to={item.to}
              onClick={onNavigate}
              data-ocid={`nav.${item.label.toLowerCase()}_link`}
              className={cn(
                "rounded-md px-3 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                isActive
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground",
              )}
            >
              {item.label}
            </Link>
          );
        })}
    </>
  );
}

function AuthButton({ className }: { className?: string }) {
  const { isAuthenticated, isInitializing, isLoggingIn, login, logout } =
    useAuth();

  if (isAuthenticated) {
    return (
      <Button
        type="button"
        variant="outline"
        size="sm"
        data-ocid="nav.logout_button"
        onClick={logout}
        className={className}
      >
        <LogOut className="h-4 w-4" aria-hidden="true" />
        Keluar
      </Button>
    );
  }

  return (
    <Button
      type="button"
      size="sm"
      data-ocid="nav.login_button"
      onClick={login}
      disabled={isInitializing || isLoggingIn}
      className={className}
    >
      <LogIn className="h-4 w-4" aria-hidden="true" />
      {isInitializing ? "Memuat…" : isLoggingIn ? "Masuk…" : "Masuk"}
    </Button>
  );
}

function MobileMenu() {
  const [open, setOpen] = useState(false);
  const { isAuthenticated } = useAuth();

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          data-ocid="nav.mobile_menu_button"
          aria-label="Buka menu navigasi"
          className="md:hidden"
        >
          <Menu className="h-5 w-5" aria-hidden="true" />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" data-ocid="nav.mobile_menu">
        <SheetHeader>
          <SheetTitle className="font-display">Navigasi</SheetTitle>
        </SheetHeader>
        <nav className="mt-6 flex flex-col gap-1">
          <NavLinks onNavigate={() => setOpen(false)} />
        </nav>
        <div className="mt-6 border-t border-border pt-6">
          {isAuthenticated ? (
            <Link
              to="/profil"
              onClick={() => setOpen(false)}
              data-ocid="nav.profile_link"
              className="mb-3 flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground"
            >
              <Shield className="h-4 w-4" aria-hidden="true" />
              Profil
            </Link>
          ) : null}
          <AuthButton className="w-full" />
        </div>
      </SheetContent>
    </Sheet>
  );
}

export function Layout({ children }: { children: ReactNode }) {
  const { isAuthenticated } = useAuth();

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <header className="sticky top-0 z-40 border-b border-border bg-card/95 shadow-subtle backdrop-blur supports-[backdrop-filter]:bg-card/80">
        <div className="container flex h-16 items-center justify-between gap-4">
          <Wordmark />
          <nav
            className="hidden items-center gap-1 md:flex"
            aria-label="Navigasi utama"
          >
            <NavLinks />
          </nav>
          <div className="hidden items-center gap-2 md:flex">
            {isAuthenticated ? (
              <Link
                to="/profil"
                data-ocid="nav.profile_link"
                className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              >
                Profil
              </Link>
            ) : null}
            <AuthButton />
          </div>
          <MobileMenu />
        </div>
      </header>

      <main className="flex-1 bg-background">{children}</main>

      <Toaster position="top-right" richColors closeButton />

      <footer className="border-t border-border bg-card">
        <div className="container flex flex-col items-center justify-between gap-3 py-6 sm:flex-row">
          <p className="font-mono text-xs text-muted-foreground">
            Platform manajemen turnamen esports
          </p>
          <a
            href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
            target="_blank"
            rel="noreferrer"
            className="font-mono text-xs text-muted-foreground transition-colors hover:text-primary"
          >
            © {new Date().getFullYear()}. Built with love using caffeine.ai
          </a>
        </div>
      </footer>
    </div>
  );
}
