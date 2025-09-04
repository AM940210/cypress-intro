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
    const [editing, setEditing] = useState<Booking | null>(null);

    const formatDateTime = (date: string, time: string) => {
        if (!date || !time) return "Invalid date";

        // Ensure valid ISO string
        const isoString = `${date}T${time}`;
        const parsed = new Date(isoString);

        if (isNaN(parsed.getTime())) return "Invalid date";

        return new Intl.DateTimeFormat("sv-SE", {
            dateStyle: "medium",
            timeStyle: "short",
        }).format(parsed);
    };

    const handleEdit = (booking: Booking) => {
        setEditing(booking);
    };

    const handleSave = async () => {
        if (!editing) return;

        // Optimistic UI update
        setBookings((prev) => 
            prev.map((b) => (b.id === editing.id ? editing : b))
        );

        // TODO: Call API here (PUT /api/booking/[ud])
        // await fetch(`/api/bookings/${editing.id}`, {
        // method: "PUT",
        // headers: {"Content-Type": "application/json"},
        // body: JSON.stringify(editing),
        // });

        setEditing(null); // close edit mode
    };

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
                    {editing?.id === booking.id ? (
                        // Edit mode
                        <div className="space-y-2">
                            <input 
                                type="text"
                                value={editing.name}
                                onChange={(e) => 
                                    setEditing({ ...editing, name: e.target.value })
                                }
                                className="border px-2 py-1 rounded w-full"
                            />
                            <input 
                                type="text"
                                value={editing.time}
                                onChange={(e) =>
                                    setEditing({ ... editing, time: e.target.value })
                                }
                                className="border px-2 py-1 rounded w-full"
                            />
                            <input 
                                type="text"
                                value={editing.service}
                                onChange={(e) => 
                                    setEditing({ ...editing, service: e.target.value })
                                }
                            />
                            <div className="flex gap-2">
                                <button
                                    onClick={handleSave}
                                    className="text-green-600 border border-green-600 px-3 py-1 rounded"
                                >
                                    Save
                                </button>
                                <button
                                    onClick={() => setEditing(null)}
                                    className="text-gray-600 border border-gray-600 px-3 py-1 rounded"
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    ) : (
                        // View mode
                        <div>
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
                        </div>
                    )}      
                </li>
            ))}
        </ul>
    );
}