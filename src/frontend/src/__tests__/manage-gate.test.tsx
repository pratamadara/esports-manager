import {
  makeActor,
  makeTeam,
  makeTournament,
  renderRoute,
} from "@/__tests__/helpers";
import Manage from "@/pages/Manage";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

describe("gerbang halaman kelola", () => {
  it("mengalihkan pengguna yang belum masuk ke ajakan login", async () => {
    renderRoute({
      path: "/kelola",
      component: Manage,
      isAuthenticated: false,
      actor: makeActor(),
    });

    expect(
      await screen.findByText("Masuk untuk mengakses panel admin"),
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /masuk/i })).toBeInTheDocument();
    // No management controls are exposed before login.
    expect(
      screen.queryByRole("button", { name: /turnamen baru/i }),
    ).not.toBeInTheDocument();
  });

  it("menolak pengguna yang masuk tetapi bukan admin", async () => {
    renderRoute({
      path: "/kelola",
      component: Manage,
      isAuthenticated: true,
      actor: makeActor({ isCallerAdmin: vi.fn().mockResolvedValue(false) }),
    });

    expect(await screen.findByText("Hanya admin")).toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: /turnamen baru/i }),
    ).not.toBeInTheDocument();
  });

  it("menampilkan panel kelola untuk admin", async () => {
    const user = userEvent.setup();
    renderRoute({
      path: "/kelola",
      component: Manage,
      isAuthenticated: true,
      actor: makeActor({
        isCallerAdmin: vi.fn().mockResolvedValue(true),
        listTournaments: vi
          .fn()
          .mockResolvedValue([makeTournament({ name: "MLBB Championship" })]),
        listTeams: vi
          .fn()
          .mockResolvedValue([makeTeam({ name: "Garuda Prime" })]),
      }),
    });

    expect(
      await screen.findByRole("button", { name: /turnamen baru/i }),
    ).toBeInTheDocument();
    expect(await screen.findByText("MLBB Championship")).toBeInTheDocument();

    // The team list lives on its own tab.
    await user.click(screen.getByRole("tab", { name: "Tim" }));
    expect(await screen.findByText("Garuda Prime")).toBeInTheDocument();
  });
});
