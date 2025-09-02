import { db } from "@/prisma/db";
import BookingList from "./ui/booking-list";

export default async function Home() {
  const bookings = await db.booking.findMany({
    orderBy: { date: "asc" },
  });
  
  return (
    <main>
      <h1 className="text-2xl font-bold mb-4">Booking List</h1>
      <BookingList defaultBookings={bookings}/>
    </main>
  );
}
