import { db } from "../../../prisma/db"
import { NextResponse } from "next/server";

// GET /api/bookings Lista alla bokningar
export async function GET() {
    try {
       const bookings = await db.booking.findMany({
        orderBy: { date: "asc"},
       });
       return NextResponse.json(bookings);
    } catch (error) {
        console.error("Failed to fetch bookings:", error);
        return NextResponse.json(
            { success: false, message: "Failed to fetch bookings"},
            { status: 500}
        );
    }
}

// Post a new booking
export async function POST(req: Request) {
    try {
        const body: {
            name: string;
            phone: string;
            date: string;
            service: string;
        } = await req.json();

        // Kontrollera obligatoriska fält
        if (!body.name || !body.phone || !body.date || !body.service) {
            return NextResponse.json(
                { success: false, message: "Missing required fields"},
                { status: 400 }
            );
        }

        // Skapa bokning i databasen
        const booking = await db.booking.create({
            data: {
                name: body.name,
                phone: body.phone,
                date: new Date(body.date),
                service: body.service,
            },
        });

        return NextResponse.json({ success: true, booking });
    } catch (error) {
        console.error("Failed to create booking:", error);
        return NextResponse.json(
            { success: false, message: "Failed to create booking"},
            { status: 500 }
        );
    }
}