import React, { PureComponent } from "react";
import NavBar from "../../components/UI/Nav-Bar/Nav-Bar";
import { Link } from "react-router-dom";
import SideBar from "../../components/UI/SideBar/SideBar";
import "./PageWrapper.css";
const PageWrapper = props => {
  return (
    <div>
      <NavBar></NavBar>

      <div className="d-flex" id="wrapper">
        <SideBar></SideBar>
        <div className="container-fluid" id="page-content-wrapper">
          {props.children}
        </div>
      </div>
    </div>
  );
};

export default PageWrapper;
