import type { ReactNode } from "react";

/**
 * Test double for `@caffeineai/core-infrastructure`.
 *
 * The real module creates an HttpAgent and talks to the IC. Tests configure a
 * typed local actor here instead, so no network is touched. `useActor` returns
 * whatever the current test installed via `setMockActor`; `useInternetIdentity`
 * returns the auth state installed via `setMockIdentity`.
 */

export type MockActor = Record<string, unknown>;

export type MockIdentityState = {
  isAuthenticated: boolean;
  isInitializing: boolean;
  isLoggingIn: boolean;
  identity: { getPrincipal: () => unknown } | null;
  login: () => void;
  clear: () => void;
};

let currentActor: MockActor | null = null;
let currentIdentity: MockIdentityState = {
  isAuthenticated: false,
  isInitializing: false,
  isLoggingIn: false,
  identity: null,
  login: () => {},
  clear: () => {},
};

export function setMockActor(actor: MockActor | null): void {
  currentActor = actor;
}

export function setMockIdentity(state: Partial<MockIdentityState>): void {
  currentIdentity = { ...currentIdentity, ...state };
}

export function resetMockCoreInfrastructure(): void {
  currentActor = null;
  currentIdentity = {
    isAuthenticated: false,
    isInitializing: false,
    isLoggingIn: false,
    identity: null,
    login: () => {},
    clear: () => {},
  };
}

export function useActor<T>(_createActor: unknown, _options?: unknown) {
  return { actor: currentActor as T | null, isFetching: false };
}

export function useInternetIdentity() {
  return {
    identity: currentIdentity.identity ?? undefined,
    login: currentIdentity.login,
    clear: currentIdentity.clear,
    loginStatus: currentIdentity.isAuthenticated ? "success" : "idle",
    isInitializing: currentIdentity.isInitializing,
    isLoginIdle: !currentIdentity.isAuthenticated,
    isLoggingIn: currentIdentity.isLoggingIn,
    isLoginSuccess: currentIdentity.isAuthenticated,
    isLoginError: false,
    isSessionExpired: false,
    isAuthenticated: currentIdentity.isAuthenticated,
  };
}

export function InternetIdentityProvider({
  children,
}: { children: ReactNode }) {
  return <>{children}</>;
}
