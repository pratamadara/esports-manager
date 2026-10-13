import { makeActor, renderRoute } from "@/__tests__/helpers";
import TournamentEditor from "@/pages/TournamentEditor";
import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

function renderCreate() {
  const actor = makeActor({
    isCallerAdmin: vi.fn().mockResolvedValue(true),
  });
  const result = renderRoute({
    path: "/kelola/turnamen/$id",
    component: TournamentEditor,
    initialEntry: "/kelola/turnamen/baru",
    isAuthenticated: true,
    actor,
  });
  return { ...result, actor };
}

describe("editor turnamen", () => {
  it("membuat turnamen baru dari formulir admin", async () => {
    const user = userEvent.setup();
    const { actor } = renderCreate();

    const nameInput = await screen.findByLabelText("Nama Turnamen");
    await user.type(nameInput, "MLBB Championship");
    await user.type(screen.getByLabelText("Game"), "Mobile Legends");

    await user.click(screen.getByRole("button", { name: /buat turnamen/i }));

    await waitFor(() => {
      expect(actor.createTournament).toHaveBeenCalledTimes(1);
    });
    expect(actor.createTournament).toHaveBeenCalledWith(
      expect.objectContaining({
        name: "MLBB Championship",
        game: "Mobile Legends",
      }),
    );
  });

  it("menolak pengguna yang belum masuk", async () => {
    renderRoute({
      path: "/kelola/turnamen/$id",
      component: TournamentEditor,
      initialEntry: "/kelola/turnamen/baru",
      isAuthenticated: false,
      actor: makeActor(),
    });

    expect(
      await screen.findByText("Anda bukan administrator"),
    ).toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: /buat turnamen/i }),
    ).not.toBeInTheDocument();
  });
});
