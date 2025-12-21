import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  BsFillBellFill,
  BsPersonCircle,
  BsJustify,
  BsSearch,
} from "react-icons/bs";
import "./RequesterDashboard.css";

function RequesterHeader({ OpenSidebar }) {
  const navigate = useNavigate();

  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // 🔹 Backend-ready search handler
  const handleSearch = (e) => {
    e.preventDefault();

    console.log("Searching for:", searchQuery);

    /*
      🔗 BACKEND CONNECTION (later):
      fetch(`/api/tickets/search?q=${searchQuery}`)
      .then(res => res.json())
      .then(data => setTickets(data))
    */

    if (!searchQuery.trim()) return;
  };

  return (
    <header className="header">
      <div className="menu-icon">
        <BsJustify className="icon" onClick={OpenSidebar} />
      </div>

      {/* Search Section */}
      <div className="header-left">
        <BsSearch className="icon" onClick={() => setShowSearch(!showSearch)} />

        {showSearch && (
          <form onSubmit={handleSearch}>
            <input
              type="text"
              placeholder="Search tickets..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input show"
            />
          </form>
        )}
      </div>

      <div className="header-right">
        <BsFillBellFill className="icon" />
        <BsPersonCircle className="icon" onClick={() => navigate("/profile")} />
      </div>
    </header>
  );
}

export default RequesterHeader;
