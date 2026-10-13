import {
  makeActor,
  makeMatch,
  makeTeam,
  makeTournament,
  renderRoute,
} from "@/__tests__/helpers";
import { MatchStatus, TournamentStatus } from "@/backend";
import TournamentDetail from "@/pages/TournamentDetail";
import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

const garuda = makeTeam({
  id: 1n,
  name: "Garuda Prime",
  game: "Mobile Legends",
});

const tournament = makeTournament({
  id: 1n,
  name: "MLBB Championship",
  game: "Mobile Legends",
  status: TournamentStatus.berlangsung,
  format: "Single Elimination",
  prizePool: "Rp10.000.000",
  teamIds: [1n],
  schedule: [
    {
      id: 1n,
      caption: "Babak Grup",
      startAt: 1_700_000_000_000_000_000n,
      endAt: 1_700_000_100_000_000_000n,
    },
  ],
});

const matches = [
  makeMatch({
    id: 1n,
    tournamentId: 1n,
    round: "Semifinal",
    status: MatchStatus.selesai,
    teamAId: 1n,
    teamBId: 2n,
    scoreA: 13n,
    scoreB: 7n,
    winnerId: 1n,
  }),
];

function renderDetail() {
  return renderRoute({
    path: "/turnamen/$id",
    component: TournamentDetail,
    initialEntry: "/turnamen/1",
    actor: makeActor({
      getTournament: vi.fn().mockResolvedValue(tournament),
      listTeams: vi.fn().mockResolvedValue([garuda]),
      listMatches: vi.fn().mockResolvedValue(matches),
    }),
  });
}

describe("detail turnamen", () => {
  it("menampilkan jadwal dan bagan pertandingan", async () => {
    renderDetail();

    expect(await screen.findByText("MLBB Championship")).toBeInTheDocument();

    // Schedule entry.
    expect(screen.getByText("Babak Grup")).toBeInTheDocument();

    // Bracket round and score.
    expect(screen.getByText("Semifinal")).toBeInTheDocument();
    expect(screen.getByText("13 – 7")).toBeInTheDocument();

    // Participating team appears in both the bracket and the team list.
    expect(screen.getAllByText("Garuda Prime").length).toBeGreaterThan(0);
  });

  it("menyalin tautan halaman saat tombol bagikan ditekan", async () => {
    const user = userEvent.setup();
    const writeText = vi.fn().mockResolvedValue(undefined);
    Object.defineProperty(navigator, "clipboard", {
      configurable: true,
      value: { writeText },
    });

    renderDetail();
    await screen.findByText("MLBB Championship");

    await user.click(screen.getByRole("button", { name: /bagikan/i }));

    await waitFor(() => {
      expect(writeText).toHaveBeenCalledTimes(1);
    });
  });

  it("menampilkan status kosong saat turnamen tidak ditemukan", async () => {
    renderRoute({
      path: "/turnamen/$id",
      component: TournamentDetail,
      initialEntry: "/turnamen/99",
      actor: makeActor({ getTournament: vi.fn().mockResolvedValue(null) }),
    });

    expect(
      await screen.findByText("Turnamen tidak ditemukan"),
    ).toBeInTheDocument();
  });
});
