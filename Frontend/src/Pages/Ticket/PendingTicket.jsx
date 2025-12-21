import React, { useEffect, useState } from "react";
import "./PendingTickets.css";

function PendingTickets() {
  const [tickets, setTickets] = useState([]);
  const [selectedTicket, setSelectedTicket] = useState(null);

  // Load tickets (later from backend)
  /*useEffect(() => {
  fetch("/api/tickets/pending")
    .then(res => res.json())
    .then(data => setTickets(data));
}, []);
*/

  useEffect(() => {
    const mockTickets = [
      {
        id: 1,
        title: "Computer not starting",
        requester: "John Doe",
        createdAt: "2025-01-20",
        priority: "High",
        description: "My desktop PC is not starting since morning.",
      },
      {
        id: 2,
        title: "Email not syncing",
        requester: "Mehnaj",
        createdAt: "2025-01-22",
        priority: "Medium",
        description: "Outlook is not syncing new emails.",
      },
    ];

    setTickets(mockTickets);
  }, []);

  // View ticket
  const handleView = (ticket) => {
    setSelectedTicket(ticket);
  };

  // Resolve ticket
  const handleResolve = async (id) => {
    // backend later:
    // await axios.post(`/api/tickets/${id}/resolve`);

    setTickets(tickets.filter((t) => t.id !== id));
    alert("Ticket resolved.");
  };

  // Delete ticket
  const handleDelete = async (id) => {
    // backend later:
    // await axios.delete(`/api/tickets/${id}`);

    const confirmDelete = window.confirm("Are you sure?");
    if (confirmDelete) {
      setTickets(tickets.filter((t) => t.id !== id));
    }
  };

  return (
    <div className="pending-page">
      <h2 className="title">Pending Tickets</h2>

      <table className="ticket-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Issue</th>
            <th>Requester</th>
            <th>Created</th>
            <th>Priority</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {tickets.length === 0 ? (
            <tr>
              <td colSpan="6" className="empty">
                No pending tickets.
              </td>
            </tr>
          ) : (
            tickets.map((ticket) => (
              <tr key={ticket.id}>
                <td>{ticket.id}</td>
                <td>{ticket.title}</td>
                <td>{ticket.requester}</td>
                <td>{ticket.createdAt}</td>
                <td className={`priority ${ticket.priority.toLowerCase()}`}>
                  {ticket.priority}
                </td>

                <td>
                  <button
                    className="view-btn"
                    onClick={() => handleView(ticket)}
                  >
                    View
                  </button>

                  <button
                    className="resolve-btn"
                    onClick={() => handleResolve(ticket.id)}
                  >
                    Resolve
                  </button>

                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(ticket.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* VIEW MODAL */}
      {selectedTicket && (
        <div className="modal-overlay" onClick={() => setSelectedTicket(null)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h3>{selectedTicket.title}</h3>
            <p>
              <strong>Requester:</strong> {selectedTicket.requester}
            </p>
            <p>
              <strong>Date:</strong> {selectedTicket.createdAt}
            </p>
            <p>
              <strong>Priority:</strong> {selectedTicket.priority}
            </p>
            <p>
              <strong>Description:</strong> {selectedTicket.description}
            </p>

            <button
              className="close-btn"
              onClick={() => setSelectedTicket(null)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default PendingTickets;
