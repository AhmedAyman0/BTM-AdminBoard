import React from "react";
import "./SideBar.css";
import {Link} from 'react-router-dom';
const SideBar = () => {
  return (
    <div className="bg-light border-right" id="sidebar-wrapper">
      <div className="list-group list-group-flush">
        <Link href="#" className="list-group-item list-group-item-action bg-light">
          Dashboard
        </Link>
        <Link href="#" className="list-group-item list-group-item-action bg-light">
          Shortcuts
        </Link>
        <Link href="#" className="list-group-item list-group-item-action bg-light">
          Overview
        </Link>
        <Link href="#" className="list-group-item list-group-item-action bg-light">
          Events
        </Link>
        <Link href="#" className="list-group-item list-group-item-action bg-light">
          Profile
        </Link> 
        <Link href="#" className="list-group-item list-group-item-action bg-light">
          Status
        </Link>
      </div>
    </div>
  );
};

export default SideBar;
