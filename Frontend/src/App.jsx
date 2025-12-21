
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./Pages/Admin/AdminDashboard/Dashboard.jsx";
import Login from "./Pages/Auth/Login.jsx";
import Ticket from "./Pages/Ticket/Ticket.jsx";
import Department from "./Pages/Admin/Department/Department.jsx"
import Profile from "./Pages/UserProfile/Profile.jsx";
import PendingTickets from "./Pages/Ticket/PendingTicket.jsx"; 
import RequesterDashboard from "./Pages/Requester/RequesterDashboard.jsx";


function App() {

  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/auth" element={<Login />} />
          <Route path="/create-ticket" element={<Ticket />} />
          <Route path="/pending-tickets" element={<PendingTickets />} />
          <Route path="/department" element={<Department />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/requester-dashboard" element={<RequesterDashboard />} />
          
        </Routes>
      </Router>
    </div>
  );
}

export default App;
