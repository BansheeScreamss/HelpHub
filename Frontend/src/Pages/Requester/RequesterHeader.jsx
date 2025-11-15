import { useState } from "react";
import "./RequesterDashboard.css";
import {
  BsFillBellFill,
  BsFillEnvelopeFill,
  BsPersonCircle,
  BsSearch,
  BsJustify,
} from "react-icons/bs";

function Header({ OpenSidebar }) {
  const [showSearch, setShowSearch] = useState(false);

  return (
    <header className="header">
      <div className="menu-icon">
        <BsJustify className="icon" onClick={OpenSidebar} />
      </div>
      <div className="header-left">
        <BsSearch className="icon" onClick={() => setShowSearch(!showSearch)} />
        {showSearch && (
          <input
            type="text"
            placeholder="Search..."
            className={`search-input ${showSearch ? "show" : ""}`}
          />
        )}
      </div>
      <div className="header-right">
        <BsFillBellFill className="icon" />
        <BsFillEnvelopeFill className="icon" />
        <BsPersonCircle className="icon" />
      </div>
    </header>
  );
}

export default Header;
