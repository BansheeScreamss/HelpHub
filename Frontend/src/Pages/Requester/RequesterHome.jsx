import "./RequesterDashboard.css";
import {
  BsTicketPerforatedFill,
  BsClockHistory,
  BsCheckCircleFill,
} from "react-icons/bs";
import { useEffect, useState } from "react";

function RequesterHome() {
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    resolved: 0,
  });

  const [recentTickets, setRecentTickets] = useState([]);

  useEffect(() => {
    // 🔹 Backend calls later
    // axios.get("/api/requester/stats")
    // axios.get("/api/requester/recent-tickets")

    setStats({
      total: 12,
      pending: 5,
      resolved: 7,
    });

    setRecentTickets([
      { id: 1, title: "Email not working", status: "Pending" },
      { id: 2, title: "VPN issue", status: "Resolved" },
    ]);
  }, []);

  return (
    <main className="main-container">
      <div className="main-title">
        <h3>REQUESTER DASHBOARD</h3>
      </div>

      <div className="main-cards">
        <div className="card blue">
          <div className="card-inner">
            <h3>TOTAL TICKETS</h3>
            <BsTicketPerforatedFill className="card_icon" />
          </div>
          <h1>{stats.total}</h1>
        </div>

        <div className="card orange">
          <div className="card-inner">
            <h3>PENDING</h3>
            <BsClockHistory className="card_icon" />
          </div>
          <h1>{stats.pending}</h1>
        </div>

        <div className="card green">
          <div className="card-inner">
            <h3>RESOLVED</h3>
            <BsCheckCircleFill className="card_icon" />
          </div>
          <h1>{stats.resolved}</h1>
        </div>
      </div>

      <div className="table-section">
        <h3>Recent Tickets</h3>

        <table className="ticket-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {recentTickets.map((ticket) => (
              <tr key={ticket.id}>
                <td>{ticket.id}</td>
                <td>{ticket.title}</td>
                <td>{ticket.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}

export default RequesterHome;
