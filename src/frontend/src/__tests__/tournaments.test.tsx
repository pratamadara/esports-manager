import { makeActor, makeTournament, renderRoute } from "@/__tests__/helpers";
import { TournamentStatus } from "@/backend";
import Tournaments from "@/pages/Tournaments";
import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

const validateSearch = (
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
});

const tournaments = [
  makeTournament({
    id: 1n,
    name: "MLBB Championship",
    game: "Mobile Legends",
    status: TournamentStatus.berlangsung,
  }),
  makeTournament({
    id: 2n,
    name: "Valorant Open",
    game: "Valorant",
    status: TournamentStatus.selesai,
  }),
  makeTournament({
    id: 3n,
    name: "MLBB Rookie Cup",
    game: "Mobile Legends",
    status: TournamentStatus.akanDatang,
  }),
];

function renderCatalog(initialEntry = "/turnamen") {
  return renderRoute({
    path: "/turnamen",
    component: Tournaments,
    validateSearch,
    initialEntry,
    actor: makeActor({
      listTournaments: vi.fn().mockResolvedValue(tournaments),
    }),
  });
}

describe("katalog turnamen", () => {
  it("menampilkan semua turnamen dan jumlahnya", async () => {
    renderCatalog();

    expect(await screen.findByText("MLBB Championship")).toBeInTheDocument();
    expect(screen.getByText("Valorant Open")).toBeInTheDocument();
    expect(screen.getByText("MLBB Rookie Cup")).toBeInTheDocument();
    expect(screen.getByText("3 dari 3 turnamen")).toBeInTheDocument();
  });

  it("menyaring berdasarkan kata kunci pencarian", async () => {
    const user = userEvent.setup();
    renderCatalog();

    await screen.findByText("MLBB Championship");
    await user.type(screen.getByRole("searchbox"), "Valorant");

    expect(await screen.findByText("Valorant Open")).toBeInTheDocument();
    expect(screen.queryByText("MLBB Championship")).not.toBeInTheDocument();
    expect(screen.getByText("1 dari 3 turnamen")).toBeInTheDocument();
  });

  it("memuat filter status dari URL dan menyimpannya kembali ke URL", async () => {
    const user = userEvent.setup();
    const { router } = renderCatalog("/turnamen?status=selesai");

    // Filter from the URL is applied on load.
    expect(await screen.findByText("Valorant Open")).toBeInTheDocument();
    expect(screen.queryByText("MLBB Championship")).not.toBeInTheDocument();

    // Clearing filters updates the URL so the view is shareable.
    await user.click(screen.getByRole("button", { name: /reset/i }));

    await waitFor(() => {
      expect(router.state.location.search).toEqual({});
    });
    expect(await screen.findByText("MLBB Championship")).toBeInTheDocument();
  });

  it("menampilkan status kosong saat filter tidak cocok", async () => {
    renderCatalog("/turnamen?q=tidak-ada");

    expect(
      await screen.findByText("Tidak ada turnamen yang cocok"),
    ).toBeInTheDocument();
  });
});
