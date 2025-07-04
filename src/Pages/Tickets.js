import React, { useEffect, useState } from 'react';
import { db, collection, getDocs } from '../firebase';

function Tickets() {
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    const fetchTickets = async () => {
      const snapshot = await getDocs(collection(db, 'contacts'));
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setTickets(data);
    };
    fetchTickets();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-blue-50 to-blue-100 py-10 px-4">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-blue-700 mb-8 border-b pb-2">
          📨 Submitted Tickets
        </h2>

        {tickets.length === 0 ? (
          <p className="text-center text-gray-500 text-lg">No tickets found.</p>
        ) : (
          <div className="space-y-6">
            {tickets.map((ticket) => (
              <div
                key={ticket.id}
                className="bg-white border-l-4 border-green-500 shadow-md rounded-lg p-6"
              >
                <p className="text-lg">
                  <span className="font-semibold text-gray-700">👤 Name:</span> {ticket.name}
                </p>
                <p className="text-lg">
                  <span className="font-semibold text-gray-700">📧 Email:</span> {ticket.email}
                </p>
                <p className="text-lg">
                  <span className="font-semibold text-gray-700">💬 Message:</span> {ticket.message}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Tickets;
