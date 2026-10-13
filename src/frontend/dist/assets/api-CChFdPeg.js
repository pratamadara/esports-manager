var __typeError = (msg) => {
  throw TypeError(msg);
};
var __accessCheck = (obj, member, msg) => member.has(obj) || __typeError("Cannot " + msg);
var __privateGet = (obj, member, getter) => (__accessCheck(obj, member, "read from private field"), getter ? getter.call(obj) : member.get(obj));
var __privateAdd = (obj, member, value) => member.has(obj) ? __typeError("Cannot add the same private member more than once") : member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
var __privateSet = (obj, member, value, setter) => (__accessCheck(obj, member, "write to private field"), setter ? setter.call(obj, value) : member.set(obj, value), value);
var __privateMethod = (obj, member, method) => (__accessCheck(obj, member, "access private method"), method);
var _client, _currentResult, _currentMutation, _mutateOptions, _MutationObserver_instances, updateResult_fn, notify_fn, _a;
import { V as Subscribable, Y as shallowEqualObjects, Z as hashKey, _ as getDefaultState, $ as notifyManager, a0 as useQueryClient, r as reactExports, a1 as noop, a2 as shouldThrowError, a3 as useActor, a4 as useQuery, a5 as createActor } from "./index-jTlOkBZI.js";
var MutationObserver = (_a = class extends Subscribable {
  constructor(client, options) {
    super();
    __privateAdd(this, _MutationObserver_instances);
    __privateAdd(this, _client);
    __privateAdd(this, _currentResult);
    __privateAdd(this, _currentMutation);
    __privateAdd(this, _mutateOptions);
    __privateSet(this, _client, client);
    this.setOptions(options);
    this.bindMethods();
    __privateMethod(this, _MutationObserver_instances, updateResult_fn).call(this);
  }
  bindMethods() {
    this.mutate = this.mutate.bind(this);
    this.reset = this.reset.bind(this);
  }
  setOptions(options) {
    var _a2;
    const prevOptions = this.options;
    this.options = __privateGet(this, _client).defaultMutationOptions(options);
    if (!shallowEqualObjects(this.options, prevOptions)) {
      __privateGet(this, _client).getMutationCache().notify({
        type: "observerOptionsUpdated",
        mutation: __privateGet(this, _currentMutation),
        observer: this
      });
    }
    if ((prevOptions == null ? void 0 : prevOptions.mutationKey) && this.options.mutationKey && hashKey(prevOptions.mutationKey) !== hashKey(this.options.mutationKey)) {
      this.reset();
    } else if (((_a2 = __privateGet(this, _currentMutation)) == null ? void 0 : _a2.state.status) === "pending") {
      __privateGet(this, _currentMutation).setOptions(this.options);
    }
  }
  onUnsubscribe() {
    var _a2;
    if (!this.hasListeners()) {
      (_a2 = __privateGet(this, _currentMutation)) == null ? void 0 : _a2.removeObserver(this);
    }
  }
  onMutationUpdate(action) {
    __privateMethod(this, _MutationObserver_instances, updateResult_fn).call(this);
    __privateMethod(this, _MutationObserver_instances, notify_fn).call(this, action);
  }
  getCurrentResult() {
    return __privateGet(this, _currentResult);
  }
  reset() {
    var _a2;
    (_a2 = __privateGet(this, _currentMutation)) == null ? void 0 : _a2.removeObserver(this);
    __privateSet(this, _currentMutation, void 0);
    __privateMethod(this, _MutationObserver_instances, updateResult_fn).call(this);
    __privateMethod(this, _MutationObserver_instances, notify_fn).call(this);
  }
  mutate(variables, options) {
    var _a2;
    __privateSet(this, _mutateOptions, options);
    (_a2 = __privateGet(this, _currentMutation)) == null ? void 0 : _a2.removeObserver(this);
    __privateSet(this, _currentMutation, __privateGet(this, _client).getMutationCache().build(__privateGet(this, _client), this.options));
    __privateGet(this, _currentMutation).addObserver(this);
    return __privateGet(this, _currentMutation).execute(variables);
  }
}, _client = new WeakMap(), _currentResult = new WeakMap(), _currentMutation = new WeakMap(), _mutateOptions = new WeakMap(), _MutationObserver_instances = new WeakSet(), updateResult_fn = function() {
  var _a2;
  const state = ((_a2 = __privateGet(this, _currentMutation)) == null ? void 0 : _a2.state) ?? getDefaultState();
  __privateSet(this, _currentResult, {
    ...state,
    isPending: state.status === "pending",
    isSuccess: state.status === "success",
    isError: state.status === "error",
    isIdle: state.status === "idle",
    mutate: this.mutate,
    reset: this.reset
  });
}, notify_fn = function(action) {
  notifyManager.batch(() => {
    var _a2, _b, _c, _d, _e, _f, _g, _h;
    if (__privateGet(this, _mutateOptions) && this.hasListeners()) {
      const variables = __privateGet(this, _currentResult).variables;
      const onMutateResult = __privateGet(this, _currentResult).context;
      const context = {
        client: __privateGet(this, _client),
        meta: this.options.meta,
        mutationKey: this.options.mutationKey
      };
      if ((action == null ? void 0 : action.type) === "success") {
        try {
          (_b = (_a2 = __privateGet(this, _mutateOptions)).onSuccess) == null ? void 0 : _b.call(
            _a2,
            action.data,
            variables,
            onMutateResult,
            context
          );
        } catch (e) {
          void Promise.reject(e);
        }
        try {
          (_d = (_c = __privateGet(this, _mutateOptions)).onSettled) == null ? void 0 : _d.call(
            _c,
            action.data,
            null,
            variables,
            onMutateResult,
            context
          );
        } catch (e) {
          void Promise.reject(e);
        }
      } else if ((action == null ? void 0 : action.type) === "error") {
        try {
          (_f = (_e = __privateGet(this, _mutateOptions)).onError) == null ? void 0 : _f.call(
            _e,
            action.error,
            variables,
            onMutateResult,
            context
          );
        } catch (e) {
          void Promise.reject(e);
        }
        try {
          (_h = (_g = __privateGet(this, _mutateOptions)).onSettled) == null ? void 0 : _h.call(
            _g,
            void 0,
            action.error,
            variables,
            onMutateResult,
            context
          );
        } catch (e) {
          void Promise.reject(e);
        }
      }
    }
    this.listeners.forEach((listener) => {
      listener(__privateGet(this, _currentResult));
    });
  });
}, _a);
function useMutation(options, queryClient) {
  const client = useQueryClient();
  const [observer] = reactExports.useState(
    () => new MutationObserver(
      client,
      options
    )
  );
  reactExports.useEffect(() => {
    observer.setOptions(options);
  }, [observer, options]);
  const result = reactExports.useSyncExternalStore(
    reactExports.useCallback(
      (onStoreChange) => observer.subscribe(notifyManager.batchCalls(onStoreChange)),
      [observer]
    ),
    () => observer.getCurrentResult(),
    () => observer.getCurrentResult()
  );
  const mutate = reactExports.useCallback(
    (variables, mutateOptions) => {
      observer.mutate(variables, mutateOptions).catch(noop);
    },
    [observer]
  );
  if (result.error && shouldThrowError(observer.options.throwOnError, [result.error])) {
    throw result.error;
  }
  return { ...result, mutate, mutateAsync: result.mutate };
}
const queryKeys = {
  tournaments: ["tournaments"],
  tournament: (id) => ["tournament", id.toString()],
  teams: ["teams"],
  team: (id) => ["team", id.toString()],
  matches: (tournamentId) => ["matches", tournamentId.toString()],
  profile: ["currentUserProfile"]
};
function useTournaments() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: queryKeys.tournaments,
    queryFn: async () => {
      if (!actor) return [];
      return actor.listTournaments();
    },
    enabled: !!actor && !isFetching
  });
}
function useTournament(id) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: queryKeys.tournament(id),
    queryFn: async () => {
      if (!actor) return null;
      return actor.getTournament(id);
    },
    enabled: !!actor && !isFetching
  });
}
function useTeams() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: queryKeys.teams,
    queryFn: async () => {
      if (!actor) return [];
      return actor.listTeams();
    },
    enabled: !!actor && !isFetching
  });
}
function useTeam(id) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: queryKeys.team(id),
    queryFn: async () => {
      if (!actor) return null;
      return actor.getTeam(id);
    },
    enabled: !!actor && !isFetching
  });
}
function useMatches(tournamentId, options) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: queryKeys.matches(tournamentId),
    queryFn: async () => {
      if (!actor) return [];
      return actor.listMatches(tournamentId);
    },
    enabled: ((options == null ? void 0 : options.enabled) ?? true) && !!actor && !isFetching
  });
}
function useProfile() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: queryKeys.profile,
    queryFn: async () => {
      if (!actor) return null;
      return actor.getCallerUserProfile();
    },
    enabled: !!actor && !isFetching,
    retry: false
  });
}
function useSaveProfile() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (profile) => {
      if (!actor) throw new Error("Backend belum siap");
      return actor.saveCallerUserProfile(profile);
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: queryKeys.profile });
    }
  });
}
function useCreateTournament() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (input) => {
      if (!actor) throw new Error("Backend belum siap");
      return actor.createTournament(input);
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: queryKeys.tournaments });
    }
  });
}
function useUpdateTournament() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      id,
      input
    }) => {
      if (!actor) throw new Error("Backend belum siap");
      return actor.updateTournament(id, input);
    },
    onSuccess: (_data, variables) => {
      void queryClient.invalidateQueries({ queryKey: queryKeys.tournaments });
      void queryClient.invalidateQueries({
        queryKey: queryKeys.tournament(variables.id)
      });
    }
  });
}
function useDeleteTournament() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id) => {
      if (!actor) throw new Error("Backend belum siap");
      return actor.deleteTournament(id);
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: queryKeys.tournaments });
    }
  });
}
function useSetTournamentStatus() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      id,
      status
    }) => {
      if (!actor) throw new Error("Backend belum siap");
      return actor.setTournamentStatus(id, status);
    },
    onSuccess: (_data, variables) => {
      void queryClient.invalidateQueries({ queryKey: queryKeys.tournaments });
      void queryClient.invalidateQueries({
        queryKey: queryKeys.tournament(variables.id)
      });
    }
  });
}
function useAddTeamToTournament() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      id,
      teamId
    }) => {
      if (!actor) throw new Error("Backend belum siap");
      return actor.addTeamToTournament(id, teamId);
    },
    onSuccess: (_data, variables) => {
      void queryClient.invalidateQueries({ queryKey: queryKeys.tournaments });
      void queryClient.invalidateQueries({
        queryKey: queryKeys.tournament(variables.id)
      });
      void queryClient.invalidateQueries({ queryKey: queryKeys.teams });
    }
  });
}
function useRemoveTeamFromTournament() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      id,
      teamId
    }) => {
      if (!actor) throw new Error("Backend belum siap");
      return actor.removeTeamFromTournament(id, teamId);
    },
    onSuccess: (_data, variables) => {
      void queryClient.invalidateQueries({ queryKey: queryKeys.tournaments });
      void queryClient.invalidateQueries({
        queryKey: queryKeys.tournament(variables.id)
      });
      void queryClient.invalidateQueries({ queryKey: queryKeys.teams });
    }
  });
}
function useCreateTeam() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (input) => {
      if (!actor) throw new Error("Backend belum siap");
      return actor.createTeam(input);
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: queryKeys.teams });
    }
  });
}
function useUpdateTeam() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      id,
      input
    }) => {
      if (!actor) throw new Error("Backend belum siap");
      return actor.updateTeam(id, input);
    },
    onSuccess: (_data, variables) => {
      void queryClient.invalidateQueries({ queryKey: queryKeys.teams });
      void queryClient.invalidateQueries({
        queryKey: queryKeys.team(variables.id)
      });
    }
  });
}
function useDeleteTeam() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id) => {
      if (!actor) throw new Error("Backend belum siap");
      return actor.deleteTeam(id);
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: queryKeys.teams });
    }
  });
}
function useSetRoster() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      id,
      roster
    }) => {
      if (!actor) throw new Error("Backend belum siap");
      return actor.setRoster(id, roster);
    },
    onSuccess: (_data, variables) => {
      void queryClient.invalidateQueries({ queryKey: queryKeys.teams });
      void queryClient.invalidateQueries({
        queryKey: queryKeys.team(variables.id)
      });
    }
  });
}
function useCreateMatch() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      tournamentId,
      input
    }) => {
      if (!actor) throw new Error("Backend belum siap");
      return actor.createMatch(tournamentId, input);
    },
    onSuccess: (_data, variables) => {
      void queryClient.invalidateQueries({
        queryKey: queryKeys.matches(variables.tournamentId)
      });
    }
  });
}
function useUpdateMatch() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (variables) => {
      if (!actor) throw new Error("Backend belum siap");
      return actor.updateMatch(variables.id, variables.input);
    },
    onSuccess: (_data, variables) => {
      void queryClient.invalidateQueries({
        queryKey: queryKeys.matches(variables.tournamentId)
      });
    }
  });
}
function useDeleteMatch() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (variables) => {
      if (!actor) throw new Error("Backend belum siap");
      return actor.deleteMatch(variables.id);
    },
    onSuccess: (_data, variables) => {
      void queryClient.invalidateQueries({
        queryKey: queryKeys.matches(variables.tournamentId)
      });
    }
  });
}
function useRecordScore() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (variables) => {
      if (!actor) throw new Error("Backend belum siap");
      return actor.recordScore(
        variables.id,
        variables.scoreA,
        variables.scoreB
      );
    },
    onSuccess: (_data, variables) => {
      void queryClient.invalidateQueries({
        queryKey: queryKeys.matches(variables.tournamentId)
      });
    }
  });
}
function useSetMatchStatus() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (variables) => {
      if (!actor) throw new Error("Backend belum siap");
      return actor.setMatchStatus(variables.id, variables.status);
    },
    onSuccess: (_data, variables) => {
      void queryClient.invalidateQueries({
        queryKey: queryKeys.matches(variables.tournamentId)
      });
    }
  });
}
function useSetMatchWinner() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (variables) => {
      if (!actor) throw new Error("Backend belum siap");
      return actor.setMatchWinner(variables.id, variables.winnerId);
    },
    onSuccess: (_data, variables) => {
      void queryClient.invalidateQueries({
        queryKey: queryKeys.matches(variables.tournamentId)
      });
    }
  });
}
export {
  useTeams as a,
  useTournament as b,
  useMatches as c,
  useTeam as d,
  useDeleteMatch as e,
  useSetMatchStatus as f,
  useSetMatchWinner as g,
  useCreateMatch as h,
  useUpdateMatch as i,
  useRecordScore as j,
  useDeleteTournament as k,
  useDeleteTeam as l,
  useSetTournamentStatus as m,
  useCreateTournament as n,
  useUpdateTournament as o,
  useAddTeamToTournament as p,
  useRemoveTeamFromTournament as q,
  useCreateTeam as r,
  useUpdateTeam as s,
  useSetRoster as t,
  useTournaments as u,
  useProfile as v,
  useSaveProfile as w
};
