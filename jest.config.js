module.exports = {
    testEnvironment: "node",
    setupFiles: ["dotenv/config"], // Only loads dotenv, no database setup here
    setupFilesAfterEnv: ["<rootDir>/tests/setup.js"], // Moves MongoDB setup here
    testTimeout: 10000,
  };
  