# Project Guidance

## User Preferences

- Antarmuka dan konten dalam Bahasa Indonesia
- Navigasi jelas dengan hierarki informasi yang padat
- Desain responsif untuk desktop dan mobile

## Verified Commands

- **typecheck**: `mops check --fix`
- **build**: `mops build`

## Learnings

- The app is a full-stack Caffeine project: Motoko backend at src/backend/ and React 19 + TypeScript + Tailwind v3 frontend at src/frontend/.
- Backend exports listTournaments, getTournament, createTournament, updateTournament, deleteTournament, setTournamentStatus, addTeamToTournament, removeTeamFromTournament, listTeams, getTeam, createTeam, updateTeam, deleteTeam, setRoster, addTeamToTournament, removeTeamFromTournament, listMatches, getMatch, createMatch, updateMatch, deleteMatch, recordScore, setMatchStatus, setMatchWinner, getCallerUserProfile, saveCallerUserProfile, getUserProfile, getApiDoc.
- The 6 public reads are query funcs; all 18 mutations are admin-gated. First-user admin bootstrap is provided by the authorization mixin.
- OQL Expose registers tournament, team, match, and profile entities, each with .sample(...).
- Frontend routes: /, /turnamen, /turnamen/$id, /tim, /tim/$id, /kelola, /kelola/turnamen/$id, /kelola/tim/$id, /profil. The /kelola/turnamen/$id and /kelola/tim/$id routes use the sentinel 'baru' for create.
- URL-persisted filters are on /turnamen and /tim via TanStack Router validateSearch/useSearch.
- The object-storage logo uploader uses ExternalBlob.fromBytes(...).withUploadProgress(...) and stores getDirectURL() in logoUrl.
- The migration chain has exactly one pending init migration (migrations/00000000_000000.mo) with check-limit = 1; its NewActor fields must match main.mo's stable fields exactly.
- Time.now() returns Int; a Timestamp = Nat field needs Time.now().toNat().
- 'label' is a reserved keyword in Motoko and cannot be a record field; the ScheduleEntry field is named caption.
- All UI text is in Indonesian. The app name is ArenaID.
- src/frontend/index.html carries SEO/social meta tags per AGENTS.md — update them, never remove them.
- A cover attempt installed vitest@3.1.4 jsdom@26 @testing-library/react@16 @testing-library/jest-dom@6 @testing-library/user-event@14, added a frontend test script (vitest run --environment jsdom) and a root test script (pnpm --dir src/frontend test), and wrote src/frontend/src/__tests__/setup.ts and src/frontend/vitest.config.ts. The @caffeineai/core-infrastructure mock and the actual *.test.tsx files were never finished, so the suite does not run.
- The create-team flow persists the roster via setRoster on the new team id. The tournament description renders as sanitized HTML via a sanitizeHtml helper in lib/utils.ts.
- A test suite was added under src/frontend/src/__tests__/ with vitest.config.ts; it is test-only and does not change production behavior.
- The test suite lives at src/frontend/src/__tests__/ and test/pocketic/ with src/frontend/vitest.config.ts; run it with pnpm --dir app test. The PocketIC lane bootstraps admin via actor._initialize_access_control() before isCallerAdmin().
