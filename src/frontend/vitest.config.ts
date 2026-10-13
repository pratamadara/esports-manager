import { fileURLToPath, URL } from "url";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      {
        find: "@caffeineai/core-infrastructure",
        replacement: fileURLToPath(
          new URL("./src/__tests__/mocks/core-infrastructure.tsx", import.meta.url),
        ),
      },
      {
        find: "@caffeineai/object-storage",
        replacement: fileURLToPath(
          new URL("./src/__tests__/mocks/object-storage.ts", import.meta.url),
        ),
      },
      {
        find: "declarations",
        replacement: fileURLToPath(new URL("../declarations", import.meta.url)),
      },
      {
        find: "@",
        replacement: fileURLToPath(new URL("./src", import.meta.url)),
      },
    ],
    dedupe: ["@icp-sdk/core"],
  },
  test: {
    environment: "jsdom",
    globals: true,
    pool: "forks",
    poolOptions: {
      forks: { singleFork: true },
    },
    setupFiles: ["./src/__tests__/setup.ts"],
    include: ["src/**/*.test.{ts,tsx}"],
  },
});
