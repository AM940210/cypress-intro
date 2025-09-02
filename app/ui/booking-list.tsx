type Booking = {
    id: string;
    name: string;
    date: Date;
    time: string;
    service: string;
};

type Props = {
    defaultBookings: Booking[];
};

export default function BookingList({ defaultBookings }: Props) {
    if (defaultBookings.length === 0) return <p>No bookings found.</p>;

    return (
        <ul className="space-y-2">
            {defaultBookings.map((booking) => (
                <li key={booking.id} className="border p-4 rounded">
                    <strong>{booking.name}</strong> booked a{""}
                    <em>{booking.service}</em> on {booking.date.toLocaleDateString()} at {booking.time}
                </li>
            ))}
        </ul>
    );
}