import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "node",
    include: ["cycles/**/*.ts"],
    passWithNoTests: true,
  },
});
