import { db } from "../db"

export async function reseedBookings() {

    await db.booking.createMany({
        data: [
            {
                name: "Testperson",
                date: new Date("2025-09-01T10:00:00Z"),
                time: "10:00",
                service: "Klippning",
            },
            {
                name: "Anna",
                date: new Date("2025-09-01T11:00:00Z"),
                time: "11:00",
                service: "Färgning",
            },
            {
                name: "Jonas",
                date: new Date("2025-09-01T12:00:00Z"),
                time: "12:00",
                service: "Rakning",
            },
        ],
    });
};