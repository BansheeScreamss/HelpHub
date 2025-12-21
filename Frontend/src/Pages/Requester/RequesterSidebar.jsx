import "./RequesterDashboard.css";
import React from "react";
import {
  BsCursor,
  BsGrid1X2Fill,
  BsTicketPerforatedFill,
  BsPersonCircle,
  BsFillGearFill,
  BsBoxArrowRight,
} from "react-icons/bs";
import { useNavigate } from "react-router-dom";

function RequesterSidebar({ openSidebarToggle, OpenSidebar }) {
  const navigate = useNavigate();

  return (
    <aside
      id="sidebar"
      className={openSidebarToggle ? "sidebar-responsive" : ""}
    >
      <div className="sidebar-title">
        <div className="sidebar-brand">
          <BsCursor className="icon-header" />
          HelpHub
        </div>
        <span className="icon close_icon" onClick={OpenSidebar}>
          X
        </span>
      </div>

      <ul className="sidebar-list">
        {/* Dashboard */}
        <li
          className="sidebar-list-item"
          onClick={() => navigate("/requester-dashboard")}
        >
          <BsGrid1X2Fill className="icon" /> Dashboard
        </li>

        {/* Create Ticket */}
        <li
          className="sidebar-list-item"
          onClick={() => navigate("/create-ticket")}
        >
          <BsTicketPerforatedFill className="icon" /> Create Ticket
        </li>

        {/* Profile */}
        <li className="sidebar-list-item" onClick={() => navigate("/profile")}>
          <BsPersonCircle className="icon" /> Profile
        </li>

        {/* Settings */}
        <li className="sidebar-list-item" onClick={() => navigate("/settings")}>
          <BsFillGearFill className="icon" /> Settings
        </li>

        {/* Logout */}
        <li
          className="sidebar-list-item"
          onClick={() => {
            // 🔹 Backend logout logic later (clear token/session)
            navigate("/login");
          }}
        >
          <BsBoxArrowRight className="icon" /> Logout
        </li>
      </ul>
    </aside>
  );
}

export default RequesterSidebar;
