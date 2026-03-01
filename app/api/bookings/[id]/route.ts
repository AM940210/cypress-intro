import { NextResponse } from "next/server";
import { db } from "@/lib/db";

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
export async function PUT(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const body = await req.json();
    const { name, date, time, service } = body;

    if (!name || !date || !time || !service) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    const updatedBooking = await db.booking.update({
      where: { id },
      data: {
        name,
        date: new Date(date),
        time,
        service,
      },
    });

    return NextResponse.json(
      { booking: updatedBooking },
      { status: 200 }
    );

  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Server error" },
      { status: 500 }
    );
  }
}

// DELETE booking
export async function DELETE(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;

    await db.booking.delete({
      where: { id },
    });

    return NextResponse.json(
      { message: "Booking deleted successfully" },
      { status: 200 }
    );

  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Server error" },
      { status: 500 }
    );
  }
}