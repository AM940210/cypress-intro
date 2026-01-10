import { NextResponse } from "next/server";
import { db } from "@/prisma/db";

type Params = {
    params: { id: string };
};

// GET /api/bookings/:id
export async function GET(
    req: Request,
    { params }: Params
) {
    try {
        const booking = await db.booking.findUnique({
            where: { id: params.id },
        });

        if (!booking) {
            return NextResponse.json(
                { succes: false, message: "Booking not found" },
                { status: 404 }
            );
        }

        return NextResponse.json(booking, { status: 200 });
    } catch {
        return NextResponse.json(
            { success: false, message: "Failed to fetch booking"},
            { status: 500 }
        );
    }
}

// DELETE /api/bookings/:id
export async function DELETE(
    req: Request,
    { params }: Params
) {
    try {
        const { id } = params;

        await db.booking.delete({
            where: { id },
        });

        return NextResponse.json(
            { success: true,
              message: "Booking deleted successfully",  
            },
            { status: 200 }
        );
    } catch {
        return NextResponse.json(
            { succes: false, message: "Booking not found" },
            { status: 404 }
        );
    }
}