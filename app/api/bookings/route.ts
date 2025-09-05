import { NextResponse } from "next/server";
import { db } from "@/prisma/db";

export async function GET() {
    try {
        let bookings = await db.booking.findMany({
            orderBy: { date: "asc"},
        });

        // Seed 3 default bookings if none exist
        if (bookings.length === 0) {
            bookings = await db.$transaction([
                db.booking.create({
                    data: {
                        name: "Alice",
                        service: "Haircut",
                        date: new Date("2025-09-05"),
                        time: "10:00",
                    },
                }),
                db.booking.create({
                    data: {
                        name: "Ahmad",
                        service: "Color",
                        date: new Date("2025-09-06"),
                        time: "14:00",
                    },
                }),
                db.booking.create({
                    data: {
                        name: "Ali",
                        service: "Haircut",
                        date: new Date("2025-09-07"),
                        time: "09:30",
                    },
                }),
            ]);
        }

        return NextResponse.json(bookings);
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { error: "Failed to fetch bookings"},
            { status: 500 }
        );
    }
}

// Post a new booking
export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { name, service, date, time } = body;

        if (!name || !service || !date || !time) {
            return NextResponse.json({ error: "Missing fields"}, { status: 400 });
        }

        const newBooking = await db.booking.create({
            data: {
                name,
                service,
                date: new Date(date),
                time,
            },
        });

        return NextResponse.json(newBooking, { status: 201 });
    } catch (error) {
        console.error("POST /api/bookings error:", error);
        return NextResponse.json({ error: "Failed to create booking"}, { status: 500 });
    }
}