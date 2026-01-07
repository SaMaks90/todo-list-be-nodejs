import type { Config } from "@jest/types";

const config: Config.InitialOptions = {
  preset: "ts-jest",
  testEnvironment: "node",
  verbose: true,
  setupFilesAfterEnv: ["./test/setup.ts"],
  testPathIgnorePatterns: ["/node_modules/", "/dist/"],
  clearMocks: true,
  resetModules: true,
  restoreMocks: true,
  maxWorkers: "1",
  detectOpenHandles: true,
};

export default config;
