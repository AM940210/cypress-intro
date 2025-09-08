import { db } from "@/prisma/db";
import { NextResponse } from "next/server";

type Params = {
    params: { id: string }
};


// Get/api/bookings:id
export async function GET(req: Request, { params }: Params) {
    try {
        const { id } = params;

        const booking = await db.booking.findUnique({
            where: { id },
        });

        if (!booking) {
            return NextResponse.json(
                { success: false, message: "Booking not found" },
                { status: 404 }
            );
        }

        return NextResponse.json(booking); // return booking object
    } catch (error) {
        return NextResponse.json(
            { success: false, message: "Failed to fetch booking"},
            { status: 500 }
        );
    }
}

// PUT/api/bookings/:id
export async function PUT(req: Request, { params }: Params) {
    try {
        const { id } = params;
        const body: {
            name?: string;
            date?: string;
            time?: string;
            service?: string;
        } = await req.json();

        const updateBooking = await db.booking.update({
            where: { id },
            data: {
                name: body.name,
                date: body.date,
                time: body.time,
                service: body.service,
            }
        });

        return NextResponse.json({
            success: true,
            message: "Booking update successfully",
            booking: updateBooking,
        });
    } catch (error) {
        return NextResponse.json(
            { success: false, message: "Failed to update booking"},
            { status: 500 }
        );
    }
}

export async function DELETE(req: Request, { params }: Params) {
    try {
        const { id } = params;

        await db.booking.delete({
            where: { id },
        });

        return NextResponse.json({
            success: true,
            message: "Booking deleted successfully", 
        });
    } catch (error) {
        return NextResponse.json(
            { success: false, error: "Failed to delete"}, 
            { status: 500}
        );
    }
}