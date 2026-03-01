import { db } from "@/lib/db";

export async function reseedBookings() {
  await db.booking.deleteMany();

  await db.booking.createMany({
    data: [
      {
        name: "Testperson",
        service: "Klippning",
        date: new Date("2025-09-01T08:00:00.000Z"),
        time: "08:00",
      },
      {
        name: "Anna",
        service: "Färgning",
        date: new Date("2025-09-01T09:00:00.000Z"),
        time: "09:00",
      },
      {
        name: "Jonas",
        service: "Rakning",
        date: new Date("2025-09-01T10:00:00.000Z"),
        time: "10:00",
      },
    ],
  });
}