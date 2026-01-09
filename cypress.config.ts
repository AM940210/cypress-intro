import { defineConfig } from "cypress";
import { reseedDatabase } from "./cypress/tasks/db";

export default defineConfig({
  e2e: {
    baseUrl: "http://localhost:3000",

    setupNodeEvents(on, config) {
      on("task", {
        async reseed() {
          await reseedDatabase();
          return null;
        },
      });
    },
  },
});
