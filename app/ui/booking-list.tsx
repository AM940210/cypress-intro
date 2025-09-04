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

    const [newBooking, setNewBooking] = useState<Booking>({
        id: "",
        name: "",
        date: "",
        time: "",
        service: "",
    });

    const formatDateTime = (date: string, time: string) => {
        if (!date || !time) return "Invalid date";

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

        // TODO: call API (DELETE)
        // await fetch(`/api/bookings/${id}`, { method: "DELETE"});

    };

    const handleAddBooking = async () => {
        if (!newBooking.name || !newBooking.date || !newBooking.time) {
            alert("Please fill in all required fields.");
            return;
        }

        const bookingWithId = { ...newBooking, id: crypto.randomUUID() };

        // Optimistic UI update
        setBookings((prev) => [...prev, bookingWithId]);

        // Reset form
        setNewBooking({ id: "", name: "", date: "", time: "", service: ""});


        // TODO: Call API (POST)
        // await fetch(`/api/bookings`, {
        // method: "POST",
        // headers: { "Content-Type": "application/json"},
        // body: JSON.stringify(bookingWithId),
        // });
    };

    return (
        <div className="space-y-6">
            {/* New Booking Form */}
            <div className="border p-4 rounded bg-gray-50">
                <h2 className="font-semibold mb-2">Add New Booking</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <input 
                        type="text"
                        placeholder="Name"
                        value={newBooking.name} 
                        onChange={(e) => 
                            setNewBooking({ ...newBooking, name: e.target.value })
                        }
                        className="border px-2 py-1 rounded"
                    />
                    <input 
                        type="text"
                        placeholder="Service"
                        value={newBooking.service}
                        onChange={(e) => 
                            setNewBooking({ ...newBooking, service: e.target.value })
                        }
                        className="border px-2 py-1 rounded"
                    />
                    <input 
                        type="date"
                        value={newBooking.date}
                        onChange={(e) => 
                            setNewBooking({ ...newBooking, date: e.target.value })
                        }
                        className="border px-2 py-1 rounded"
                    />
                    <input 
                        type="time"
                        value={newBooking.time}
                        onChange={(e) => 
                            setNewBooking({ ...newBooking, time: e.target.value })
                        }
                        className="border px-2 py-1 rounded"
                    />
                </div>
                <button
                    onClick={handleAddBooking}
                    className="mt-3 bg-blue-600 text-white px-3 py-1 rounded"
                >
                    Add Booking
                </button>
            </div>
            {/* Booking List */}
            {bookings.length === 0 ? (
                <p>No bookings found.</p>
            ) : (
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
            )}
        </div>
    );
}