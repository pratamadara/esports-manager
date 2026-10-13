import { makeActor, renderRoute } from "@/__tests__/helpers";
import TeamEditor from "@/pages/TeamEditor";
import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

function renderEditor() {
  return renderRoute({
    path: "/kelola/tim/$id",
    component: TeamEditor,
    initialEntry: "/kelola/tim/baru",
    isAuthenticated: true,
    actor: makeActor({ isCallerAdmin: vi.fn().mockResolvedValue(true) }),
  });
}

describe("unggah logo tim", () => {
  it("menampilkan progres dan pratinjau logo setelah unggah", async () => {
    const user = userEvent.setup();
    const { container } = renderEditor();

    // The editor is only reachable for an admin.
    expect(
      await screen.findByRole("button", { name: /pilih logo/i }),
    ).toBeInTheDocument();

    const fileInput =
      container.querySelector<HTMLInputElement>('input[type="file"]');
    expect(fileInput).not.toBeNull();

    const file = new File([new Uint8Array([1, 2, 3])], "logo.png", {
      type: "image/png",
    });
    await user.upload(fileInput as HTMLInputElement, file);

    // Progress feedback is shown.
    expect(await screen.findByText("100%")).toBeInTheDocument();

    // The uploaded logo is previewed.
    await waitFor(() => {
      expect(
        screen.getByRole("img", { name: /pratinjau logo tim/i }),
      ).toBeInTheDocument();
    });
  });
});
