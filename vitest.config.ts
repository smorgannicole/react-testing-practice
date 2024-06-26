// this config file's purpose is to tell vitest to use jsdom as the testing environment
// sidenote: when chaning vitest configs, vitest has to be restarted
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "jsdom",
  },
});
