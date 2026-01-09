import { PrismaClient } from "@prisma/client";
import { reseedBookings } from "../../prisma/seed/booking";

const db = new PrismaClient();

export async function reseedDatabase() {
  await db.booking.deleteMany();
  await reseedBookings();
}
