import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { error } from "console";

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

    // Hantera båda UI-format och ISO-format 
    let bookingDate: Date;

    if (date.includes("T")) {
      bookingDate = new Date(date);
    } else {
      bookingDate = new Date(`${date}T${time}:00`);
    }

    const booking = await db.booking.create({
      data: {
        name,
        service,
        date: bookingDate,
        time: time.toString(),
      },
    });

    return NextResponse.json(
      { message: "Booking created", booking }, 
      { status: 201 }
    );
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { message: "Server error" },
      { status: 500 }
    );
  }
}
