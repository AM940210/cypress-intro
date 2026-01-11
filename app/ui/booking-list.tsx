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

    const timeWithSeconds = time.length === 5 ? `${time}:00` : time;
    const parsed = new Date(`${date}T${timeWithSeconds}`);

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

    setBookings((prev) =>
      prev.map((b) => (b.id === editing.id ? editing : b))
    );

    setEditing(null);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Är du säker på att du vill ta bort bokningen?")) return;

    setBookings((prev) => prev.filter((b) => b.id !== id));
  };

  const handleAddBooking = async () => {
    if (!newBooking.name || !newBooking.date || !newBooking.time || !newBooking.service) {
      alert("Fyll i alla fält.");
      return;
    }

    const bookingWithId = { ...newBooking, id: crypto.randomUUID() };

    setBookings((prev) => [...prev, bookingWithId]);

    setNewBooking({ id: "", name: "", date: "", time: "", service: "" });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-100 to-neutral-200 flex items-center justify-center px-4">
      <div className="w-full max-w-xl bg-white rounded-xl shadow-lg p-6">

        {/* Header */}
        <h1 className="text-2xl font-bold text-center">Boka tid hos frisör</h1>
        <p className="text-center text-gray-500 mb-6">
          Boka din tid snabbt och enkelt
        </p>

        {/* Add booking form */}
        <div className="border rounded-lg p-4 bg-gray-50 mb-6">
          <h2 className="font-semibold mb-3">Ny bokning</h2>

          <div className="grid grid-cols-1 gap-2">
            <input
              type="text"
              placeholder="Namn"
              value={newBooking.name}
              onChange={(e) =>
                setNewBooking({ ...newBooking, name: e.target.value })
              }
              className="border px-3 py-2 rounded-lg"
            />

            <select
              value={newBooking.service}
              onChange={(e) =>
                setNewBooking({ ...newBooking, service: e.target.value })
              }
              className="border px-3 py-2 rounded-lg"
            >
              <option value="">Välj tjänst</option>
              <option value="Klippning">Klippning</option>
              <option value="Skäggtrimning">Skäggtrimning</option>
              <option value="Färgning">Färgning</option>
            </select>

            <input
              type="date"
              value={newBooking.date}
              onChange={(e) =>
                setNewBooking({ ...newBooking, date: e.target.value })
              }
              className="border px-3 py-2 rounded-lg"
            />

            <input
              type="time"
              value={newBooking.time}
              onChange={(e) =>
                setNewBooking({ ...newBooking, time: e.target.value })
              }
              className="border px-3 py-2 rounded-lg"
            />
          </div>

          <button
            onClick={handleAddBooking}
            className="mt-4 w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800 transition"
          >
            Boka tid
          </button>
        </div>

        {/* Booking list */}
        {bookings.length === 0 ? (
          <p className="text-center text-gray-500">Inga bokningar ännu.</p>
        ) : (
          <ul className="space-y-3">
            {bookings.map((booking) => (
              <li
                key={booking.id}
                className="border rounded-lg p-4 bg-gray-50 shadow-sm"
              >
                {editing?.id === booking.id ? (
                  <div className="space-y-2">
                    <input
                      type="text"
                      value={editing.name}
                      onChange={(e) =>
                        setEditing({ ...editing, name: e.target.value })
                      }
                      className="border px-3 py-2 rounded-lg w-full"
                    />

                    <select
                      value={editing.service}
                      onChange={(e) =>
                        setEditing({ ...editing, service: e.target.value })
                      }
                      className="border px-3 py-2 rounded-lg w-full"
                    >
                      <option value="Klippning">Klippning</option>
                      <option value="Skäggtrimning">Skäggtrimning</option>
                      <option value="Färgning">Färgning</option>
                    </select>

                    <input
                      type="time"
                      value={editing.time}
                      onChange={(e) =>
                        setEditing({ ...editing, time: e.target.value })
                      }
                      className="border px-3 py-2 rounded-lg w-full"
                    />

                    <div className="flex gap-2">
                      <button
                        onClick={handleSave}
                        className="flex-1 bg-green-600 text-white py-1 rounded-lg"
                      >
                        Spara
                      </button>
                      <button
                        onClick={() => setEditing(null)}
                        className="flex-1 border py-1 rounded-lg"
                      >
                        Avbryt
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">
                        {booking.name} – {booking.service}
                      </p>
                      <p className="text-sm text-gray-500">
                        {formatDateTime(booking.date, booking.time)}
                      </p>
                    </div>

                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(booking)}
                        className="text-sm border px-3 py-1 rounded-lg hover:bg-gray-100"
                      >
                        Ändra
                      </button>
                      <button
                        onClick={() => handleDelete(booking.id)}
                        className="text-sm text-red-600 border border-red-300 px-3 py-1 rounded-lg hover:bg-red-50"
                      >
                        Ta bort
                      </button>
                    </div>
                  </div>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
