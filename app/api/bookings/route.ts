import { NextResponse } from "next/server";
import { db } from "@/lib/db";

// GET ALL BOOKINGS
export async function GET() {
  try {
    const bookings = await db.booking.findMany({
      orderBy: {
        date: "asc",
      },
    });

    return NextResponse.json(bookings, { 
      status: 200,
      headers: {
        "Cache-Control": "no-store",
      },
    });
  } catch {
    return NextResponse.json(
      { message: "Failed to fetch bookings" },
      { status: 500 }
    );
  }
}

// CREATE BOOKING
export async function POST(req: Request) {
  try {
    const body = await req.json();    
    const { name, date, time, service } = body;

    if (!name || !date || !time || !service) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    const bookingDate = new Date(`${date}T${time}:00`);

    const booking = await db.booking.create({
      data: {
        name,
        service,
        date: bookingDate,
      },
    });

    return NextResponse.json(
      { message: "Booking created", booking }, 
      { status: 201 }
    );
  } catch {
    return NextResponse.json(
      { message: "Server error" },
      { status: 500 }
    );
  }
}
