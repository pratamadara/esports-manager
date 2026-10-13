import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Cell {
    value: Value;
    name: string;
}
export type Error_ = {
    __kind__: "FrontendOriginsNotConfigured";
    FrontendOriginsNotConfigured: null;
} | {
    __kind__: "MixedSsoSources";
    MixedSsoSources: {
        otherKeys: Array<string>;
        ssoKeys: Array<string>;
    };
} | {
    __kind__: "Stale";
    Stale: {
        ageNs: bigint;
    };
} | {
    __kind__: "MalformedCandid";
    MalformedCandid: null;
} | {
    __kind__: "AmbiguousAttribute";
    AmbiguousAttribute: {
        field: string;
        sources: Array<string>;
    };
} | {
    __kind__: "NoAttributes";
    NoAttributes: null;
} | {
    __kind__: "UnknownNonce";
    UnknownNonce: null;
} | {
    __kind__: "UntrustedSsoSource";
    UntrustedSsoSource: {
        domain: string;
    };
} | {
    __kind__: "MissingField";
    MissingField: string;
} | {
    __kind__: "FrontendOriginMismatch";
    FrontendOriginMismatch: {
        got: string;
        expected: Array<string>;
    };
};
export interface Match {
    id: MatchId;
    status: MatchStatus;
    winnerId?: TeamId;
    scoreA?: bigint;
    scoreB?: bigint;
    teamAId?: TeamId;
    teamBId?: TeamId;
    updatedAt: Timestamp;
    tournamentId: TournamentId;
    round: string;
    scheduledAt?: Timestamp;
}
export type MatchId = bigint;
export interface MatchInput {
    teamAId?: TeamId;
    teamBId?: TeamId;
    round: string;
    scheduledAt?: Timestamp;
}
export interface Player {
    id: bigint;
    name: string;
    role: string;
}
export interface Result {
    hasMore: boolean;
    rows: Array<Array<Cell>>;
}
export type Result__1 = {
    __kind__: "ok";
    ok: null;
} | {
    __kind__: "err";
    err: Error_;
};
export interface ScheduleEntry {
    id: bigint;
    startAt: Timestamp;
    endAt: Timestamp;
    caption: string;
}
export interface Team {
    id: TeamId;
    game: string;
    name: string;
    createdAt: Timestamp;
    description: string;
    updatedAt: Timestamp;
    logoUrl: string;
    tournamentIds: Array<TournamentId>;
    roster: Array<Player>;
}
export type TeamId = bigint;
export interface TeamInput {
    game: string;
    name: string;
    description: string;
    logoUrl: string;
}
export type Timestamp = bigint;
export interface Tournament {
    id: TournamentId;
    status: TournamentStatus;
    game: string;
    name: string;
    createdAt: Timestamp;
    teamIds: Array<TeamId>;
    description: string;
    updatedAt: Timestamp;
    schedule: Array<ScheduleEntry>;
    prizePool: string;
    format: string;
}
export type TournamentId = bigint;
export interface TournamentInput {
    status: TournamentStatus;
    game: string;
    name: string;
    description: string;
    schedule: Array<ScheduleEntry>;
    prizePool: string;
    format: string;
}
export interface UserProfile {
    displayName: string;
}
export type Value = {
    __kind__: "int";
    int: bigint;
} | {
    __kind__: "nat";
    nat: bigint;
} | {
    __kind__: "float";
    float: number;
} | {
    __kind__: "bool";
    bool: boolean;
} | {
    __kind__: "null";
    null: null;
} | {
    __kind__: "text";
    text: string;
};
export enum MatchStatus {
    dijadwalkan = "dijadwalkan",
    selesai = "selesai",
    berlangsung = "berlangsung"
}
export enum TournamentStatus {
    selesai = "selesai",
    berlangsung = "berlangsung",
    akanDatang = "akanDatang"
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    addTeamToTournament(id: TournamentId, teamId: TeamId): Promise<Tournament | null>;
    addTournamentToTeam(id: TeamId, tournamentId: TournamentId): Promise<Team | null>;
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    createMatch(tournamentId: TournamentId, input: MatchInput): Promise<Match>;
    createTeam(input: TeamInput): Promise<Team>;
    createTournament(input: TournamentInput): Promise<Tournament>;
    deleteMatch(id: MatchId): Promise<boolean>;
    deleteTeam(id: TeamId): Promise<boolean>;
    deleteTournament(id: TournamentId): Promise<boolean>;
    execute(qJson: string): Promise<Result>;
    getApiDoc(): Promise<string>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getMatch(id: MatchId): Promise<Match | null>;
    getTeam(id: TeamId): Promise<Team | null>;
    getTournament(id: TournamentId): Promise<Tournament | null>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    isCallerAdmin(): Promise<boolean>;
    listMatches(tournamentId: TournamentId): Promise<Array<Match>>;
    listTeams(): Promise<Array<Team>>;
    listTournaments(): Promise<Array<Tournament>>;
    recordScore(id: MatchId, scoreA: bigint, scoreB: bigint): Promise<Match | null>;
    removeTeamFromTournament(id: TournamentId, teamId: TeamId): Promise<Tournament | null>;
    removeTournamentFromTeam(id: TeamId, tournamentId: TournamentId): Promise<Team | null>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    schema(): Promise<string>;
    setMatchStatus(id: MatchId, status: MatchStatus): Promise<Match | null>;
    setMatchWinner(id: MatchId, winnerId: TeamId): Promise<Match | null>;
    setRoster(id: TeamId, roster: Array<Player>): Promise<Team | null>;
    setTournamentStatus(id: TournamentId, status: TournamentStatus): Promise<Tournament | null>;
    updateMatch(id: MatchId, input: MatchInput): Promise<Match | null>;
    updateTeam(id: TeamId, input: TeamInput): Promise<Team | null>;
    updateTournament(id: TournamentId, input: TournamentInput): Promise<Tournament | null>;
}
