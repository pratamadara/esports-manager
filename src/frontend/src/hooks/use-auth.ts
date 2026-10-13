import { createActor } from "@/backend";
import { useActor, useInternetIdentity } from "@caffeineai/core-infrastructure";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";

export function useAuth() {
  const {
    login,
    clear,
    isAuthenticated,
    isInitializing,
    isLoggingIn,
    identity,
  } = useInternetIdentity();
  const { actor, isFetching: actorFetching } = useActor(createActor);
  const queryClient = useQueryClient();

  const adminQuery = useQuery({
    queryKey: ["isCallerAdmin"],
    queryFn: async () => {
      if (!actor) return false;
      return actor.isCallerAdmin();
    },
    enabled: !!actor && !actorFetching && isAuthenticated,
    retry: false,
  });

  const handleLogin = useCallback(() => {
    login();
  }, [login]);

  const handleLogout = useCallback(() => {
    clear();
    queryClient.clear();
  }, [clear, queryClient]);

  return {
    isAuthenticated,
    isInitializing,
    isLoggingIn,
    isAdmin: adminQuery.data ?? false,
    isAdminLoading: adminQuery.isLoading,
    principal: identity ? identity.getPrincipal() : null,
    login: handleLogin,
    logout: handleLogout,
  };
}
