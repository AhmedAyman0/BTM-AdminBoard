import React, { PureComponent } from 'react';
import {Link} from 'react-router-dom';

const NavBar = ()=>{
    const navStyle={
        "marginBottom":"17px",
    }
    const aStyle={
        "ontVariant": "all-small-caps"
    }
    return (
        <nav  className="navbar navbar-expand-md bg-dark navbar-dark sticky-top">
    <Link style={aStyle} className="navbar-brand" >BTM-Admin Board</Link>
    <button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navb" aria-expanded="true">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div id="navb" className="navbar-collapse collapse hide">

      <ul className="nav navbar-nav ml-auto">

        <li className="nav-item">
        <Link to="/categories" className="list-group-item list-group-item-action bg-light">
        <i className="fas fa-layer-group"></i> Categories
        </Link>
        </li>
        <li className="nav-item">
        <Link to="/users" className="list-group-item list-group-item-action bg-light">
        <i className="fas fa-users"></i>Users
        </Link>
        </li>

      </ul>
    </div>
  </nav>
    )
}

export default NavBar;