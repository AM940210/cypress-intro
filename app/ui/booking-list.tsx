"use client";

import { useState } from "react";

type Booking = {
    id: string;
    name: string;
    date: string | Date;
    time: string;
    service: string;
};

type Props = {
    defaultBookings: Booking[];
    onEdit?: (booking: Booking) => void;
};

export default function BookingList({ defaultBookings, onEdit }: Props) {
    const [bookings, setBookings] = useState(defaultBookings);

    const handleDelete = async (id: string) => {
        const res = await fetch(`/api/bookings/${id}`, { method: "DELETE"});

        if (res.ok) {
            setBookings((prev) => prev.filter((b) => b.id !== id));
        } else {
            alert("Failed to delete booking");
        }
    };

    const formatDateTime = (date: string | Date, time: string) => {
        const isoDate = date instanceof Date ? date.toISOString().split("T")[0] : date;
        const isoString = `${date}T${time}`;
        return new Intl.DateTimeFormat("sv-SE", {
            dateStyle: "medium",
            timeStyle: "short",
        }).format(new Date(isoString));
    };

    if (bookings.length === 0) {
        return <p className="next-gray-500 italic text-center mt-4">No bookings found.</p>;
    }

    return (
        <ul className="space-y-2">
            {bookings.map((booking) => (
                <li key={booking.id} className="border p-4 rounded flex justify-between items-center">
                    <div>
                        <strong>{booking.name}</strong> booked a{" "}
                        <em>{booking.service}</em> on {formatDateTime(booking.date, booking.time)}
                    </div>
                    <div>
                        {onEdit && (
                            <button onClick={() => onEdit(booking)} 
                            className="ml-4 rounded text-blue-500 border border-blue-500 px-2 py-1 hover:gb-blue-50">
                                Edit
                            </button>
                        )}
                        <button 
                            onClick={() => handleDelete(booking.id)} 
                            className="ml-2 rounded text-red-500 border border-red-500 px-3 py-1 hover:gb-red-50">
                            Delete
                        </button>
                    </div>
                </li>
            ))}
        </ul>
    );
}