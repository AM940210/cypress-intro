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
    onDelete?: (id: string) => void;
    onEdit?: (booking: Booking) => void;
};

export default function BookingList({ defaultBookings, onDelete, onEdit }: Props) {
    if (defaultBookings.length === 0) {
        return (
            <p className="next-gray-500 italic text-center mt-4">
                No bookings found.
            </p>
        );
    }  

    const formatDateTime = (date: string, time: string) => {
        const isoString = `${date}T${time}`;
        return new Intl.DateTimeFormat("sv-SE", {
            dateStyle: "medium",
            timeStyle: "short",
        }).format(new Date(isoString));
    };

    return (
        <ul className="space-y-2">
            {defaultBookings.map((booking) => (
                <li key={booking.id} className="border p-4 rounded">
                    <strong>{booking.name}</strong> booked a{" "}
                    <em>{booking.service}</em> on{" "}
                    {formatDateTime(booking.date, booking.time)}
                    {onEdit && (
                        <button onClick={() => onEdit(booking)} 
                        className="ml-4 rounded text-blue-500 border border-blue-500 px-2 py-1 hover:gb-blue-50">
                            Edit
                        </button>
                    )}
                    {onDelete && (
                        <button onClick={() => onDelete(booking.id)} 
                        className="ml-2 rounded text-red-500 border border-red-500 px-2 py-1 hover:gb-red-50">
                            Delete
                        </button>
                    )}
                </li>
            ))}
        </ul>
    );
}