
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./Pages/Admin/AdminDashboard/Dashboard.jsx";
import Login from "./Pages/Auth/Login.jsx";
import Ticket from "./Pages/Ticket/Ticket.jsx";
import Department from "./Pages/Admin/Department/Department.jsx"

function App() {

  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/auth" element={<Login />} />
          <Route path="/create-ticket" element={<Ticket />} />
          <Route path="/department" element={<Department/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
