import { db } from "../db";

export async function reseedBookings() {
    await db.booking.createMany({
        data: [
            {
                name: "Testperson",
                date: "2025-09-01",
                time: "10:00",
                service: "Klippning",
            },
            {
                name: "Anna",
                date: "2025-09-01",
                time: "11:00",
                service: "Färgning",
            },
            {
                name: "Jonas",
                date: "2025-09-01",
                time: "12:00",
                service: "Rakning",
            },
        ],
    });
};