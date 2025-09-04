import { db } from "@/prisma/db";
import BookingList from "./ui/booking-list";

export default async function Home() {
  const bookings = await db.booking.findMany({
    orderBy: { date: "asc" },
  });

  // Convert Date => string, so it can be serialized and passed to client
  const safeBookings = bookings.map((b) => ({
    ...b,
    date: b.date.toString().split("T")[0],
  }));

  return (
    <main className="p-4">
      <h1 className="text-2xl font-bold mb-4">Booking List</h1>
      <BookingList defaultBookings={safeBookings} />
    </main>
  );
}
