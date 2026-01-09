import { NextResponse } from "next/server";
import { db } from "@/prisma/db";

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
