import { defineConfig } from "cypress";
import { db } from "./prisma/db";
import { reseedBookings } from "./prisma/seed/booking";

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
      on("task", {
        async reseed() {
          await db.booking.deleteMany();
          await reseedBookings();
          return null;
        },
      });
    },
  },
});
