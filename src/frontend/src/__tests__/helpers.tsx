import {
  type MockActor,
  setMockActor,
  setMockIdentity,
} from "@/__tests__/mocks/core-infrastructure";
import type { Match, Player, Team, Tournament, UserProfile } from "@/backend";
import { MatchStatus, TournamentStatus } from "@/backend";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  RouterProvider,
  createMemoryHistory,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import { render } from "@testing-library/react";
import type { ReactNode } from "react";
import { vi } from "vitest";

/* ------------------------------ Fixtures ------------------------------ */

export function makeTournament(
  overrides: Partial<Tournament> = {},
): Tournament {
  return {
    id: 1n,
    status: TournamentStatus.akanDatang,
    game: "Mobile Legends",
    name: "Turnamen Uji",
    createdAt: 1_700_000_000_000_000_000n,
    teamIds: [],
    description: "Deskripsi turnamen uji.",
    updatedAt: 1_700_000_000_000_000_000n,
    schedule: [],
    prizePool: "Rp10.000.000",
    format: "Single Elimination",
    ...overrides,
  };
}

export function makeTeam(overrides: Partial<Team> = {}): Team {
  return {
    id: 1n,
    game: "Mobile Legends",
    name: "Garuda Prime",
    createdAt: 1_700_000_000_000_000_000n,
    description: "Tim uji.",
    updatedAt: 1_700_000_000_000_000_000n,
    logoUrl: "",
    tournamentIds: [],
    roster: [],
    ...overrides,
  };
}

export function makePlayer(overrides: Partial<Player> = {}): Player {
  return { id: 1n, name: "Pemain Satu", role: "Jungler", ...overrides };
}

export function makeMatch(overrides: Partial<Match> = {}): Match {
  return {
    id: 1n,
    status: MatchStatus.dijadwalkan,
    updatedAt: 1_700_000_000_000_000_000n,
    tournamentId: 1n,
    round: "Semifinal",
    ...overrides,
  };
}

export function makeProfile(overrides: Partial<UserProfile> = {}): UserProfile {
  return { displayName: "Rian Cast", ...overrides };
}

/* ------------------------------- Actor -------------------------------- */

export type MockActorFns = {
  listTournaments: ReturnType<typeof vi.fn>;
  getTournament: ReturnType<typeof vi.fn>;
  createTournament: ReturnType<typeof vi.fn>;
  updateTournament: ReturnType<typeof vi.fn>;
  deleteTournament: ReturnType<typeof vi.fn>;
  setTournamentStatus: ReturnType<typeof vi.fn>;
  addTeamToTournament: ReturnType<typeof vi.fn>;
  removeTeamFromTournament: ReturnType<typeof vi.fn>;
  listTeams: ReturnType<typeof vi.fn>;
  getTeam: ReturnType<typeof vi.fn>;
  createTeam: ReturnType<typeof vi.fn>;
  updateTeam: ReturnType<typeof vi.fn>;
  deleteTeam: ReturnType<typeof vi.fn>;
  setRoster: ReturnType<typeof vi.fn>;
  listMatches: ReturnType<typeof vi.fn>;
  createMatch: ReturnType<typeof vi.fn>;
  updateMatch: ReturnType<typeof vi.fn>;
  deleteMatch: ReturnType<typeof vi.fn>;
  recordScore: ReturnType<typeof vi.fn>;
  setMatchStatus: ReturnType<typeof vi.fn>;
  setMatchWinner: ReturnType<typeof vi.fn>;
  getCallerUserProfile: ReturnType<typeof vi.fn>;
  saveCallerUserProfile: ReturnType<typeof vi.fn>;
  isCallerAdmin: ReturnType<typeof vi.fn>;
};

export function makeActor(overrides: Partial<MockActorFns> = {}): MockActorFns {
  return {
    listTournaments: vi.fn().mockResolvedValue([]),
    getTournament: vi.fn().mockResolvedValue(null),
    createTournament: vi.fn().mockResolvedValue(makeTournament()),
    updateTournament: vi.fn().mockResolvedValue(makeTournament()),
    deleteTournament: vi.fn().mockResolvedValue(true),
    setTournamentStatus: vi.fn().mockResolvedValue(makeTournament()),
    addTeamToTournament: vi.fn().mockResolvedValue(makeTournament()),
    removeTeamFromTournament: vi.fn().mockResolvedValue(makeTournament()),
    listTeams: vi.fn().mockResolvedValue([]),
    getTeam: vi.fn().mockResolvedValue(null),
    createTeam: vi.fn().mockResolvedValue(makeTeam()),
    updateTeam: vi.fn().mockResolvedValue(makeTeam()),
    deleteTeam: vi.fn().mockResolvedValue(true),
    setRoster: vi.fn().mockResolvedValue(makeTeam()),
    listMatches: vi.fn().mockResolvedValue([]),
    createMatch: vi.fn().mockResolvedValue(makeMatch()),
    updateMatch: vi.fn().mockResolvedValue(makeMatch()),
    deleteMatch: vi.fn().mockResolvedValue(true),
    recordScore: vi.fn().mockResolvedValue(makeMatch()),
    setMatchStatus: vi.fn().mockResolvedValue(makeMatch()),
    setMatchWinner: vi.fn().mockResolvedValue(makeMatch()),
    getCallerUserProfile: vi.fn().mockResolvedValue(null),
    saveCallerUserProfile: vi.fn().mockResolvedValue(undefined),
    isCallerAdmin: vi.fn().mockResolvedValue(false),
    ...overrides,
  };
}

/* ------------------------------ Providers ----------------------------- */

export function makeQueryClient(): QueryClient {
  return new QueryClient({
    defaultOptions: {
      queries: { retry: false, gcTime: 0, staleTime: 0 },
      mutations: { retry: false },
    },
  });
}

export function TestProviders({
  children,
  queryClient,
}: {
  children: ReactNode;
  queryClient?: QueryClient;
}) {
  return (
    <QueryClientProvider client={queryClient ?? makeQueryClient()}>
      {children}
    </QueryClientProvider>
  );
}

/* -------------------------------- Router ------------------------------- */

type RouteSpec = {
  path: string;
  component: () => ReactNode;
  validateSearch?: (search: Record<string, unknown>) => Record<string, unknown>;
};

/**
 * Render a page inside a real TanStack Router with memory history so
 * `useSearch`, `useParams`, `useNavigate`, and `Link` behave as in the app.
 * Only the routes a test needs are registered.
 */
export function renderRoute({
  path,
  component,
  validateSearch,
  initialEntry,
  actor,
  isAuthenticated = false,
  queryClient,
}: {
  path: string;
  component: () => ReactNode;
  validateSearch?: RouteSpec["validateSearch"];
  initialEntry?: string;
  actor?: MockActorFns;
  isAuthenticated?: boolean;
  queryClient?: QueryClient;
}) {
  setMockActor(actor ?? makeActor());
  setMockIdentity({ isAuthenticated });

  const rootRoute = createRootRoute();
  const pageRoute = createRoute({
    getParentRoute: () => rootRoute,
    path,
    component,
    ...(validateSearch ? { validateSearch } : {}),
  });
  const routeTree = rootRoute.addChildren([pageRoute]);
  const router = createRouter({
    routeTree,
    history: createMemoryHistory({ initialEntries: [initialEntry ?? path] }),
  });

  const client = queryClient ?? makeQueryClient();
  const result = render(
    <QueryClientProvider client={client}>
      <RouterProvider router={router} />
    </QueryClientProvider>,
  );
  return { ...result, router, queryClient: client };
}
