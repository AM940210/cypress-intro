import { defineConfig } from "cypress";
import { db } from "./prisma/db";
import { reseedBookings } from "./prisma/seed/booking";

export default defineConfig({
  e2e: {
    baseUrl: "http://localhost:3000",
    setupNodeEvents(on, config) {
      // implement node event listeners here
      on("task", {
        async reseed() {
          try {
            await db.booking.deleteMany();
            await reseedBookings();
            return null;
          } catch (err) {
            console.error("cypress task reseed failed:", err);
            throw err;
          }
        },
      });
    },
  },
});
