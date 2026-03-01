import { db } from "../db";

export async function reseedBookings() {
  await db.booking.deleteMany(); // 🔥 rensa först

  await db.booking.createMany({
    data: [
      {
        name: "Testperson",
        service: "Klippning",
        date: new Date("2025-09-01T10:00:00"),
      },
      {
        name: "Anna",
        service: "Färgning",
        date: new Date("2025-09-01T11:00:00"),
      },
      {
        name: "Jonas",
        service: "Rakning",
        date: new Date("2025-09-01T12:00:00"),
      },
    ],
  });
}