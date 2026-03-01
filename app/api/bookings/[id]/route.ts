import { NextResponse } from "next/server";
import { db } from "@/prisma/db";

type Params = {
  params: { id: string };
};

// GET single booking
export async function GET(req: Request, { params }: Params) {
  try {
    const booking = await db.booking.findUnique({
      where: { id: params.id },
    });

    if (!booking) {
      return NextResponse.json(
        { message: "Booking not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(booking, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Server error" },
      { status: 500 }
    );
  }
}

// PUT update booking
export async function PUT(req: Request, { params }: Params) {
  try {
    const body = await req.json();
    const { name, date, time, service } = body;

    if (!name || !date || !time || !service) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    const updatedBooking = await db.booking.update({
      where: { id: params.id },
      data: {
        name,
        date: new Date(date),
        time,
        service,
      },
    });

    return NextResponse.json(
      { message: "Booking updated", booking: updatedBooking },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Server error" },
      { status: 500 }
    );
  }
}

// DELETE booking
export async function DELETE(req: Request, { params }: Params) {
  try {
    await db.booking.delete({
      where: { id: params.id },
    });

    return NextResponse.json(
      { message: "Booking deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Server error" },
      { status: 500 }
    );
  }
}