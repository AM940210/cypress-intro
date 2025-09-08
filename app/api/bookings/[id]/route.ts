import { db } from "@/prisma/db";
import { NextResponse } from "next/server";

type Params = {
    params: { id: string }
};

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