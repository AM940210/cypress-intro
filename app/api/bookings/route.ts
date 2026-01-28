import { NextResponse } from "next/server";
import { db } from "@/prisma/db";

// GET /api/bookings
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
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Failed to fetch bookings" },
      { status: 500 }
    );
  }
}

// POST /api/bookings
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, date, time, service } = body;

    if (!name || !date || !time || !service) {
      return NextResponse.json(
        { success: false, message: "Missing required fields" },
        { status: 400 }
      );
    }

    const booking = await db.booking.create({
      data: {
        name,
        time,
        service,
        date: new Date(date),
      },
    });

    return NextResponse.json({ success: true, booking }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}
