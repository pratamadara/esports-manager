import { Layout } from "@/components/Layout";
import {
  Outlet,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import { Suspense, lazy } from "react";

const HomePage = lazy(() => import("@/pages/Home"));
const TournamentsPage = lazy(() => import("@/pages/Tournaments"));
const TournamentDetailPage = lazy(() => import("@/pages/TournamentDetail"));
const TeamsPage = lazy(() => import("@/pages/Teams"));
const TeamDetailPage = lazy(() => import("@/pages/TeamDetail"));
const ManagePage = lazy(() => import("@/pages/Manage"));
const TournamentEditorPage = lazy(() => import("@/pages/TournamentEditor"));
const TeamEditorPage = lazy(() => import("@/pages/TeamEditor"));
const ProfilePage = lazy(() => import("@/pages/Profile"));

function PageFallback() {
  return (
    <div data-ocid="loading_state" className="container py-16">
      <div className="h-8 w-64 animate-pulse rounded-md bg-muted" />
      <div className="mt-4 h-4 w-96 animate-pulse rounded-md bg-muted" />
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }, (_, i) => `skeleton-${i}`).map((id) => (
          <div key={id} className="h-40 animate-pulse rounded-lg bg-muted" />
        ))}
      </div>
    </div>
  );
}

function RootComponent() {
  return (
    <Layout>
      <Suspense fallback={<PageFallback />}>
        <Outlet />
      </Suspense>
    </Layout>
  );
}

const rootRoute = createRootRoute({ component: RootComponent });

const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: HomePage,
});

const tournamentsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/turnamen",
  validateSearch: (
    search: Record<string, unknown>,
  ): { q?: string; game?: string; status?: string } => ({
    q: typeof search.q === "string" && search.q !== "" ? search.q : undefined,
    game:
      typeof search.game === "string" && search.game !== ""
        ? search.game
        : undefined,
    status:
      typeof search.status === "string" && search.status !== ""
        ? search.status
        : undefined,
  }),
  component: TournamentsPage,
});

const tournamentDetailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/turnamen/$id",
  component: TournamentDetailPage,
});

const teamsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/tim",
  component: TeamsPage,
});

const teamDetailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/tim/$id",
  component: TeamDetailPage,
});

const manageRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/kelola",
  component: ManagePage,
});

const tournamentEditorRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/kelola/turnamen/$id",
  component: TournamentEditorPage,
});

const teamEditorRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/kelola/tim/$id",
  component: TeamEditorPage,
});

const profileRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/profil",
  component: ProfilePage,
});

const routeTree = rootRoute.addChildren([
  homeRoute,
  tournamentsRoute,
  tournamentDetailRoute,
  teamsRoute,
  teamDetailRoute,
  manageRoute,
  tournamentEditorRoute,
  teamEditorRoute,
  profileRoute,
]);

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return <RouterProvider router={router} />;
}
