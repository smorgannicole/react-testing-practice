// this config file's purpose is to tell vitest to use jsdom as the testing environment
// sidenote: when chaning vitest configs, vitest has to be restarted
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "jsdom",
    globals: true,
    // allows tester to not have to "import { it, expect, describe } from "vitest";" in every test file
    setupFiles: "tests/setup.ts",
    // this setup file is run before each test file- useful for configuring test environment
    // allows tester to not have to "import "@testing-library/jest-dom/vitest";" in every test file
  },
});
