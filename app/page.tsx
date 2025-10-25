import { db } from "@/prisma/db";
import BookingList from "./ui/booking-list";

export default async function Home() {
  const bookings = await db.booking.findMany({
    orderBy: { date: "asc" },
  });

  // Convert Date => string (use ISO to reliably get YYYY-MM-DD)
  const safeBookings = bookings.map((b) => ({
    ...b,
    date: b.date instanceof Date ? b.date.toISOString().split("T")[0] : String(b.date),
  }));

  return (
    <main className="">
      <BookingList defaultBookings={safeBookings} />
    </main>
  );
}
