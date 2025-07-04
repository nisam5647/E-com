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
    <div style={{ maxWidth: '900px', margin: '50px auto', padding: '20px' }}>
      <h2 style={{
        textAlign: 'center',
        marginBottom: '30px',
        fontSize: '2rem',
        color: '#333',
        borderBottom: '2px solid #eee',
        paddingBottom: '10px'
      }}>
        Submitted Tickets
      </h2>

      {tickets.length === 0 ? (
        <p style={{ textAlign: 'center', color: '#666' }}>No tickets found.</p>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {tickets.map((ticket) => (
            <div key={ticket.id} style={{
              backgroundColor: '#fff',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
              padding: '20px',
              borderRadius: '10px',
              borderLeft: '5px solid #4CAF50'
            }}>
              <p><strong style={{ color: '#333' }}>Name:</strong> {ticket.name}</p>
              <p><strong style={{ color: '#333' }}>Email:</strong> {ticket.email}</p>
              <p><strong style={{ color: '#333' }}>Message:</strong> {ticket.message}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Tickets;
