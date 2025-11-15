import './AdminDashboard.css';
import React, { useState } from "react";

import {
  BsCursor,
  BsGrid1X2Fill,
  BsTicketPerforatedFill,
  BsPeopleFill,
  BsHeadset,
  BsBuilding,
  BsBarChartFill,
  BsFillGearFill,
  BsBoxArrowRight,
} from "react-icons/bs";

function Sidebar({ openSidebarToggle, OpenSidebar }) {

  const [showTicketMenu, setShowTicketMenu] = useState(false);

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
        <li className="sidebar-list-item">
          <a href="">
            <BsGrid1X2Fill className="icon" /> Dashboard
          </a>
        </li>
        <li className="sidebar-list-item">
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              setShowTicketMenu(!showTicketMenu);
            }}
          >
            <BsTicketPerforatedFill className="icon" /> Ticket Management
          </a>
          <ul className={`submenu ${showTicketMenu ? "open" : ""}`}>
            <li className="submenu-item">
              <a href="/create-ticket">Create Ticket</a>
            </li>
            <li className="submenu-item">
              <a href="/pending-tickets">Pending Tickets</a>
            </li>
            <li className="submenu-item">
              <a href="/assigned-status">Assigned Tickets</a>
            </li>
            <li className="submenu-item">
              <a href="/resolved-status">Resolved Tickets</a>
            </li>
          </ul>
        </li>

        <li className="sidebar-list-item">
          <a href="">
            <BsPeopleFill className="icon" /> Users
          </a>
        </li>
        <li className="sidebar-list-item">
          <a href="">
            <BsHeadset className="icon" /> Support Staff
          </a>
        </li>
        <li className="sidebar-list-item">
          <a href="/department">
            <BsBuilding className="icon" /> Departments
          </a>
        </li>
        <li className="sidebar-list-item">
          <a href="">
            <BsBarChartFill className="icon" /> Reports
          </a>
        </li>
        <li className="sidebar-list-item">
          <a href="">
            <BsFillGearFill className="icon" /> Settings
          </a>
        </li>
        <li className="sidebar-list-item">
          <a href="">
            <BsBoxArrowRight className="icon" /> Logout
          </a>
        </li>
      </ul>
    </aside>
  );
}

export default Sidebar;