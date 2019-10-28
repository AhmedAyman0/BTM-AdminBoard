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
          <Link className="nav-link"><span className="fas fa-user"></span> Sign Up</Link>
        </li>
        <li className="nav-item">
            <Link className="nav-link" ><span className="fas fa-sign-in-alt"></span> Login </Link>
        </li>

      </ul>
    </div>
  </nav>
    )
}

export default NavBar;