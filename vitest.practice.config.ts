import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "node",
    include: ["cycles/**/*.test.ts"],
    // Cycle 001 preserves reviewed original attempts, including known failures.
    // Reproduce those separately with npm test; new attempts start in Cycle 002.
    exclude: ["cycles/cycle-001/**", "**/node_modules/**"],
    // The curriculum ships prompts, not completed learner submissions.
    passWithNoTests: true,
  },
});
