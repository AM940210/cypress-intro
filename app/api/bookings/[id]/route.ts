import { NextResponse } from "next/server";
import { db } from "@/prisma/db";

type Params = {
    params: { id: string };
};

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