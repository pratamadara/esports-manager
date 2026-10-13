import { PocketIc, createIdentity } from "@dfinity/pic";
import type { Actor, CanisterFixture } from "@dfinity/pic";
import { afterAll, beforeAll, expect, it } from "vitest";

import { idlFactory } from "../../src/frontend/src/declarations/backend.did.js";
import type { _SERVICE } from "../../src/frontend/src/declarations/backend.did";

const PIC_URL = process.env.POCKET_IC_URL ?? "";
const BACKEND_WASM = process.env.BACKEND_WASM ?? "";

// The first authenticated caller becomes the app's admin, so the lane calls as a
// deterministic identity rather than as the anonymous principal.
const admin = createIdentity("arenaid-admin");

let pic: PocketIc | undefined;
let actor: Actor<_SERVICE>;
let canisterId: CanisterFixture<_SERVICE>["canisterId"];

beforeAll(async () => {
  pic = await PocketIc.create(PIC_URL);
  ({ actor, canisterId } = await pic.setupCanister<_SERVICE>({
    idlFactory,
    wasm: BACKEND_WASM,
  }));
  actor.setIdentity(admin);
  // The platform authorization mixin registers the first principal that calls
  // `_initialize_access_control` as admin; without it `isCallerAdmin` traps
  // with "User is not registered".
  await actor._initialize_access_control();
});

afterAll(async () => {
  await pic?.tearDown();
});

it("bootstraps the first authenticated caller as admin", async () => {
  await expect(actor.isCallerAdmin()).resolves.toBe(true);
});

it("answers empty-state reads instead of trapping", async () => {
  await expect(actor.listTournaments()).resolves.toEqual([]);
  await expect(actor.listTeams()).resolves.toEqual([]);
  await expect(actor.getCallerUserProfile()).resolves.toEqual([]);
});

it("round-trips a tournament through the real canister", async () => {
  const created = await actor.createTournament({
    name: "MLBB Championship",
    game: "Mobile Legends",
    description: "Turnamen uji.",
    format: "Single Elimination",
    prizePool: "Rp10.000.000",
    schedule: [],
    status: { akanDatang: null },
  });
  expect(created.name).toBe("MLBB Championship");

  const tournaments = await actor.listTournaments();
  expect(tournaments).toHaveLength(1);
  expect(tournaments[0]).toMatchObject({
    id: created.id,
    name: "MLBB Championship",
    game: "Mobile Legends",
  });

  const fetched = await actor.getTournament(created.id);
  expect(fetched).toHaveLength(1);
  expect(fetched[0]?.name).toBe("MLBB Championship");
});

it("round-trips a team and its roster through the real canister", async () => {
  const team = await actor.createTeam({
    name: "Garuda Prime",
    game: "Mobile Legends",
    description: "Tim uji.",
    logoUrl: "",
  });
  expect(team.name).toBe("Garuda Prime");

  const updated = await actor.setRoster(team.id, [
    { id: 1n, name: "Pemain Satu", role: "Jungler" },
  ]);
  expect(updated).toHaveLength(1);
  expect(updated[0]?.roster).toHaveLength(1);

  const fetched = await actor.getTeam(team.id);
  expect(fetched).toHaveLength(1);
  expect(fetched[0]?.roster[0]).toMatchObject({
    name: "Pemain Satu",
    role: "Jungler",
  });
});

it("records a match and its score through the real canister", async () => {
  const tournament = await actor.createTournament({
    name: "Valorant Open",
    game: "Valorant",
    description: "Turnamen uji.",
    format: "Single Elimination",
    prizePool: "Rp5.000.000",
    schedule: [],
    status: { berlangsung: null },
  });

  const match = await actor.createMatch(tournament.id, {
    round: "Semifinal",
    teamAId: [],
    teamBId: [],
    scheduledAt: [],
  });
  expect(match.round).toBe("Semifinal");

  const scored = await actor.recordScore(match.id, 13n, 7n);
  expect(scored).toHaveLength(1);
  expect(scored[0]).toMatchObject({ scoreA: [13n], scoreB: [7n] });

  const matches = await actor.listMatches(tournament.id);
  expect(matches).toHaveLength(1);
  expect(matches[0]).toMatchObject({ id: match.id, round: "Semifinal" });
});

it("saves and reads the caller profile", async () => {
  await actor.saveCallerUserProfile({ displayName: "Rian Cast" });
  await expect(actor.getCallerUserProfile()).resolves.toEqual([
    { displayName: "Rian Cast" },
  ]);
});

it("rejects an anonymous caller from the admin-gated mutations", async () => {
  const guest = pic!.createActor<_SERVICE>(idlFactory, canisterId);
  await expect(
    guest.createTournament({
      name: "Unauthorized",
      game: "Mobile Legends",
      description: "",
      format: "",
      prizePool: "",
      schedule: [],
      status: { akanDatang: null },
    }),
  ).rejects.toThrow();
});
