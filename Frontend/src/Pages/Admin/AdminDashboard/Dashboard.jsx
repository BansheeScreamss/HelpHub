import Header from "./Header.jsx";
import Sidebar from "./Sidebar.jsx";
import Home from "./Home.jsx";

import { useState } from "react";

function Dashboard(){

    const [openSidebarToggle, setOpenSidebarToggle] = useState(false);

    const OpenSidebar = () => {
          setOpenSidebarToggle(!openSidebarToggle);
          };

    return (
      <div className="grid-container">
        <Header OpenSidebar={OpenSidebar} />
        <Sidebar
          openSidebarToggle={openSidebarToggle}
          OpenSidebar={OpenSidebar}
        />
        <Home />
      </div>
    );
}

export default Dashboard;