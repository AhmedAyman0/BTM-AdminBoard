import React from "react";
import "./SideBar.css";
import {Link} from 'react-router-dom';
const SideBar = () => {
  return (
    <div className="bg-light border-right" id="sidebar-wrapper">
      <div className="list-group list-group-flush">
        <Link href="#" className="list-group-item list-group-item-action bg-light">
        <i className="fas fa-chart-line"></i> Dashboard
        </Link>
        <Link to="/shops" className="list-group-item list-group-item-action bg-light">
        <i className="fas fa-store-alt"></i> Shops
        </Link>
        <Link to="/users" className="list-group-item list-group-item-action bg-light">
        <i className="fas fa-users"></i>Users
        </Link>
      </div>
    </div>
  );
};

export default SideBar;
