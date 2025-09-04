"use client";

import { useState } from "react";

type Booking = {
    id: string;
    name: string;
    date: string;
    time: string;
    service: string;
};

type Props = {
    defaultBookings: Booking[];
};

export default function BookingList({ defaultBookings }: Props) {
    
    const [bookings, setBookings] = useState(defaultBookings);

    const formatDateTime = (date: string, time: string) => {
        if (!date || !time) return "Invalid date";

        // Ensure valid ISO string
        const [h, m] = time.split(":");
        const hours = h?.padStart(2, "0") ?? "00";
        const minutes = m?.padStart(2, "0") ?? "00";

        const isoString = `${date}T${time}:${minutes}:00`;
        const parsed = new Date(isoString);

        if (isNaN(parsed.getTime())) return "Invalid date";

        return new Intl.DateTimeFormat("sv-SE", {
            dateStyle: "medium",
            timeStyle: "short",
        }).format(parsed);
    };

    const handleEdit = (booking: Booking) => {
        alert(`Edit ${booking.name}`);
        // later: open a modal, or navigate to edit page
    }

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this booking?")) return;

        // Optimistic UI update (remove from list immediately)
        setBookings((prev) => prev.filter((b) => b.id !== id));

        // call API
        const res = await fetch(`/api/bookings/${id}`, { method: "DELETE"});

        if (!res.ok) {
            alert("Failed to delete booking.");

            setBookings(defaultBookings);
        }
    };

    if (bookings.length === 0) return <p>No bookings found.</p>;

    return (
        <ul className="space-y-2">
            {bookings.map((booking) => (
                <li key={booking.id} className="border p-4 rounded">
                        <strong>{booking.name}</strong> booked a{" "}
                        <em>{booking.service}</em> on{" "} 
                        {formatDateTime(booking.date, booking.time)}

                        <button 
                            onClick={() => handleEdit(booking)} 
                            className="ml-4 rounded text-blue-500 border border-blue-500 px-2 py-1 hover:gb-blue-50"
                        >
                            Edit
                        </button>
                        <button 
                            onClick={() => handleDelete(booking.id)} 
                            className="ml-2 rounded text-red-500 border border-red-500 px-3 py-1 hover:gb-red-50"
                        >
                            Delete
                        </button>
                </li>
            ))}
        </ul>
    );
}