import {
  type Match,
  type MatchInput,
  type MatchStatus,
  type Player,
  type Team,
  type TeamInput,
  type Tournament,
  type TournamentInput,
  type TournamentStatus,
  type UserProfile,
  createActor,
} from "@/backend";
import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const queryKeys = {
  tournaments: ["tournaments"] as const,
  tournament: (id: bigint) => ["tournament", id.toString()] as const,
  teams: ["teams"] as const,
  team: (id: bigint) => ["team", id.toString()] as const,
  matches: (tournamentId: bigint) =>
    ["matches", tournamentId.toString()] as const,
  profile: ["currentUserProfile"] as const,
};

/* ------------------------------- Queries ------------------------------- */

export function useTournaments() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: queryKeys.tournaments,
    queryFn: async (): Promise<Array<Tournament>> => {
      if (!actor) return [];
      return actor.listTournaments();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useTournament(id: bigint) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: queryKeys.tournament(id),
    queryFn: async (): Promise<Tournament | null> => {
      if (!actor) return null;
      return actor.getTournament(id);
    },
    enabled: !!actor && !isFetching,
  });
}

export function useTeams() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: queryKeys.teams,
    queryFn: async (): Promise<Array<Team>> => {
      if (!actor) return [];
      return actor.listTeams();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useTeam(id: bigint) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: queryKeys.team(id),
    queryFn: async (): Promise<Team | null> => {
      if (!actor) return null;
      return actor.getTeam(id);
    },
    enabled: !!actor && !isFetching,
  });
}

export function useMatches(
  tournamentId: bigint,
  options?: { enabled?: boolean },
) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: queryKeys.matches(tournamentId),
    queryFn: async (): Promise<Array<Match>> => {
      if (!actor) return [];
      return actor.listMatches(tournamentId);
    },
    enabled: (options?.enabled ?? true) && !!actor && !isFetching,
  });
}

export function useProfile() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: queryKeys.profile,
    queryFn: async (): Promise<UserProfile | null> => {
      if (!actor) return null;
      return actor.getCallerUserProfile();
    },
    enabled: !!actor && !isFetching,
    retry: false,
  });
}

/* ------------------------------ Mutations ------------------------------ */

export function useSaveProfile() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (profile: UserProfile) => {
      if (!actor) throw new Error("Backend belum siap");
      return actor.saveCallerUserProfile(profile);
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: queryKeys.profile });
    },
  });
}

export function useCreateTournament() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (input: TournamentInput): Promise<Tournament> => {
      if (!actor) throw new Error("Backend belum siap");
      return actor.createTournament(input);
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: queryKeys.tournaments });
    },
  });
}

export function useUpdateTournament() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      id,
      input,
    }: {
      id: bigint;
      input: TournamentInput;
    }): Promise<Tournament | null> => {
      if (!actor) throw new Error("Backend belum siap");
      return actor.updateTournament(id, input);
    },
    onSuccess: (_data, variables) => {
      void queryClient.invalidateQueries({ queryKey: queryKeys.tournaments });
      void queryClient.invalidateQueries({
        queryKey: queryKeys.tournament(variables.id),
      });
    },
  });
}

export function useDeleteTournament() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: bigint): Promise<boolean> => {
      if (!actor) throw new Error("Backend belum siap");
      return actor.deleteTournament(id);
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: queryKeys.tournaments });
    },
  });
}

export function useSetTournamentStatus() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      id,
      status,
    }: {
      id: bigint;
      status: TournamentStatus;
    }): Promise<Tournament | null> => {
      if (!actor) throw new Error("Backend belum siap");
      return actor.setTournamentStatus(id, status);
    },
    onSuccess: (_data, variables) => {
      void queryClient.invalidateQueries({ queryKey: queryKeys.tournaments });
      void queryClient.invalidateQueries({
        queryKey: queryKeys.tournament(variables.id),
      });
    },
  });
}

export function useAddTeamToTournament() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      id,
      teamId,
    }: {
      id: bigint;
      teamId: bigint;
    }): Promise<Tournament | null> => {
      if (!actor) throw new Error("Backend belum siap");
      return actor.addTeamToTournament(id, teamId);
    },
    onSuccess: (_data, variables) => {
      void queryClient.invalidateQueries({ queryKey: queryKeys.tournaments });
      void queryClient.invalidateQueries({
        queryKey: queryKeys.tournament(variables.id),
      });
      void queryClient.invalidateQueries({ queryKey: queryKeys.teams });
    },
  });
}

export function useRemoveTeamFromTournament() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      id,
      teamId,
    }: {
      id: bigint;
      teamId: bigint;
    }): Promise<Tournament | null> => {
      if (!actor) throw new Error("Backend belum siap");
      return actor.removeTeamFromTournament(id, teamId);
    },
    onSuccess: (_data, variables) => {
      void queryClient.invalidateQueries({ queryKey: queryKeys.tournaments });
      void queryClient.invalidateQueries({
        queryKey: queryKeys.tournament(variables.id),
      });
      void queryClient.invalidateQueries({ queryKey: queryKeys.teams });
    },
  });
}

export function useCreateTeam() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (input: TeamInput): Promise<Team> => {
      if (!actor) throw new Error("Backend belum siap");
      return actor.createTeam(input);
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: queryKeys.teams });
    },
  });
}

export function useUpdateTeam() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      id,
      input,
    }: { id: bigint; input: TeamInput }): Promise<Team | null> => {
      if (!actor) throw new Error("Backend belum siap");
      return actor.updateTeam(id, input);
    },
    onSuccess: (_data, variables) => {
      void queryClient.invalidateQueries({ queryKey: queryKeys.teams });
      void queryClient.invalidateQueries({
        queryKey: queryKeys.team(variables.id),
      });
    },
  });
}

export function useDeleteTeam() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: bigint): Promise<boolean> => {
      if (!actor) throw new Error("Backend belum siap");
      return actor.deleteTeam(id);
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: queryKeys.teams });
    },
  });
}

export function useSetRoster() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      id,
      roster,
    }: { id: bigint; roster: Array<Player> }): Promise<Team | null> => {
      if (!actor) throw new Error("Backend belum siap");
      return actor.setRoster(id, roster);
    },
    onSuccess: (_data, variables) => {
      void queryClient.invalidateQueries({ queryKey: queryKeys.teams });
      void queryClient.invalidateQueries({
        queryKey: queryKeys.team(variables.id),
      });
    },
  });
}

export function useCreateMatch() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      tournamentId,
      input,
    }: {
      tournamentId: bigint;
      input: MatchInput;
    }): Promise<Match> => {
      if (!actor) throw new Error("Backend belum siap");
      return actor.createMatch(tournamentId, input);
    },
    onSuccess: (_data, variables) => {
      void queryClient.invalidateQueries({
        queryKey: queryKeys.matches(variables.tournamentId),
      });
    },
  });
}

export function useUpdateMatch() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (variables: {
      id: bigint;
      input: MatchInput;
      tournamentId: bigint;
    }): Promise<Match | null> => {
      if (!actor) throw new Error("Backend belum siap");
      return actor.updateMatch(variables.id, variables.input);
    },
    onSuccess: (_data, variables) => {
      void queryClient.invalidateQueries({
        queryKey: queryKeys.matches(variables.tournamentId),
      });
    },
  });
}

export function useDeleteMatch() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (variables: {
      id: bigint;
      tournamentId: bigint;
    }): Promise<boolean> => {
      if (!actor) throw new Error("Backend belum siap");
      return actor.deleteMatch(variables.id);
    },
    onSuccess: (_data, variables) => {
      void queryClient.invalidateQueries({
        queryKey: queryKeys.matches(variables.tournamentId),
      });
    },
  });
}

export function useRecordScore() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (variables: {
      id: bigint;
      scoreA: bigint;
      scoreB: bigint;
      tournamentId: bigint;
    }): Promise<Match | null> => {
      if (!actor) throw new Error("Backend belum siap");
      return actor.recordScore(
        variables.id,
        variables.scoreA,
        variables.scoreB,
      );
    },
    onSuccess: (_data, variables) => {
      void queryClient.invalidateQueries({
        queryKey: queryKeys.matches(variables.tournamentId),
      });
    },
  });
}

export function useSetMatchStatus() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (variables: {
      id: bigint;
      status: MatchStatus;
      tournamentId: bigint;
    }): Promise<Match | null> => {
      if (!actor) throw new Error("Backend belum siap");
      return actor.setMatchStatus(variables.id, variables.status);
    },
    onSuccess: (_data, variables) => {
      void queryClient.invalidateQueries({
        queryKey: queryKeys.matches(variables.tournamentId),
      });
    },
  });
}

export function useSetMatchWinner() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (variables: {
      id: bigint;
      winnerId: bigint;
      tournamentId: bigint;
    }): Promise<Match | null> => {
      if (!actor) throw new Error("Backend belum siap");
      return actor.setMatchWinner(variables.id, variables.winnerId);
    },
    onSuccess: (_data, variables) => {
      void queryClient.invalidateQueries({
        queryKey: queryKeys.matches(variables.tournamentId),
      });
    },
  });
}
