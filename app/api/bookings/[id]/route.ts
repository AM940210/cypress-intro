import { NextResponse } from "next/server";
import { db } from "@/prisma/db";

// DELETE booking
export async function DELETE(
    req: Request,
    { params }: { params: { id: string } }
) {
    try {
        await db.booking.delete({
            where: { id: params.id },
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Delete failed:", error);
        return NextResponse.json({ success: false, error: "Failed to delete"}, { status: 500});
    }
}