import { defineConfig } from "cypress";
import { PrismaClient } from "@prisma/client";
const db = new PrismaClient();
import { reseedBookings } from "./prisma/seed/booking";

export default defineConfig({
  e2e: {
    baseUrl: "http://localhost:3000",

    setupNodeEvents(on, config) {
      // implement node event listeners here
      on("task", {
        async reseed() {
          console.log("Reseeding test database...");

          try {
            // Rensa tabellen
            await db.booking.deleteMany();

            // Återställ seed-data
            await reseedBookings();

            console.log(" Database reseeded successfully");
            return null;
          } catch (err) {
            console.error("Cypress task reseed failed:", err);
            throw err;
          }
        },
      });
    },
  },
});
