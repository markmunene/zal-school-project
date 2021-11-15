import React from "react";

import { Route, Link, Switch, BrowserRouter as Router } from "react-router-dom";
import "./Navbar.css";


export default function Navbar() {
    return (
        <>
            <div className="navWrapper">
                <nav className="navbar navbar-expand-lg navbar-light bg-light navbar-sticky">
                    <Link className="navbar-brand" to="#">
                        <img
                            src="./images/zal_log2.png"
                            alt=""
                            className="brandLogo img-fluid"
                        />
                    </Link>
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-toggle="collapse"
                        data-target="#navbarNavDropdown"
                        aria-controls="navbarNavDropdown"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div
                        className="collapse navbar-collapse"
                        id="navbarNavDropdown"
                    >
                        <ul className="navbar-nav  ml-auto">
                            <li className="nav-item active">
                                <Link className="nav-link react-link" to="/">
                                    Home
                                    <span className="sr-only">(current)</span>
                                </Link>
                            </li>
                            <li className="nav-item dropdown">
                                <Link
                                    className="nav-link react-link "
                                    to="#"
                                    id="navbarDropdownMenuLink"
                                    data-toggle="dropdown"
                                    aria-haspopup="true"
                                    aria-expanded="false"
                                >
                                    About Us
                                </Link>
                                <div
                                    className="dropdown-menu"
                                    aria-labelledby="navbarDropdownMenuLink"
                                >
                                    <Link
                                        className="dropdown-item"
                                        to="/mission"
                                    >
                                        <i className="icofont-paper-plane pr-2"></i>
                                        History/mission/vison
                                    </Link>
                                    <div className="dropdown-divider"></div>
                                    <Link className="dropdown-item" to="/staff">
                                        <i className="icofont-paper-plane pr-2"></i>
                                        School staff
                                    </Link>
                                    <div className="dropdown-divider"></div>
                                    <Link
                                        className="dropdown-item"
                                        to="/accomplishment"
                                    >
                                        <i className="icofont-paper-plane"></i>
                                        Accomplishment
                                    </Link>
                                </div>
                            </li>

                            <li className="nav-item dropdown">
                                <Link
                                    
                                    className="nav-link react-link "
                                    to="#"
                                    id="navbarDropdownMenuLink"
                                    data-toggle="dropdown"
                                    aria-haspopup="true"
                                    aria-expanded="false"
                                >
                                    Department
                                </Link>
                                <div
                                    className="dropdown-menu"
                                    aria-labelledby="navbarDropdownMenuLink"
                                >
                                    <Link className="dropdown-item" to="/ict">
                                        <i className="icofont-paper-plane pr-2"></i>
                                        ICT
                                    </Link>
                                    <div className="dropdown-divider"></div>
                                    <Link
                                        className="dropdown-item"
                                        to="/bigdata"
                                    >
                                        <i className="icofont-paper-plane pr-2"></i>
                                        Big data
                                    </Link>
                                    <div className="dropdown-divider"></div>
                                    <Link
                                        className="dropdown-item"
                                        to="/finance"
                                    >
                                        <i className="icofont-paper-plane pr-2"></i>
                                        Finance
                                    </Link>
                                </div>
                            </li>

                           
                            <li className="nav-item dropdown">
                                <Link to ="#"
                                    className="nav-link react-link "
                                   
                                    id="navbarDropdownMenuLink"
                                    data-toggle="dropdown"
                                    aria-haspopup="true"
                                    aria-expanded="false"
                                >
                                    More
                                </Link>
                                <div
                                    className="dropdown-menu"
                                    aria-labelledby="navbarDropdownMenuLink"
                                >
                                    <Link className="dropdown-item" to="/news">
                                        <i className="icofont-paper-plane pr-2"></i>
                                        News & Events
                                    </Link>
                                </div>
                            </li>

                           
                        
                            <li className="nav-item">
                                <Link
                                    className="nav-link react-link"
                                    to="/contact"
                                >
                                    Contact Us
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link
                                    className="nav-link react-link btn register  "
                                    to="/register"
                                >
                                    <i className="icofont-people"></i>
                                    Register
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link
                                    className="nav-link react-link btn loginbtn  mr-2"
                                    to="/login"
                                >
                                    <i className="icofont-lock"></i>Login
                                </Link>
                            </li>
                        </ul>
                    </div>
                </nav>

                <div className="widgetleft ">
                    <a href="" style={{ backgroundColor: " #1da1f2" }}>
                        <i className="fab fa-twitter" aria-hidden="true"></i>
                    </a>
                    <a href="" style={{ backgroundColor: "#4267b2" }}>
                        <i className="fab fa-facebook " aria-hidden="true"></i>
                    </a>

                    <a href="" style={{ backgroundColor: "red" }}>
                        <i className="fab fa-youtube " aria-hidden="true"></i>
                    </a>
                </div>

                <div className="widgetright">
                    <a href="">
                        <i className="fa fa-address-book "> </i>
                        <br />
                        enroll
                    </a>
                    <a href="">
                        <i className="fa fa-plus "></i>
                        <br />
                        Apply
                    </a>

                    <a href="">
                        <i className="fa fa-file-signature"></i>
                        <br /> Join Us
                    </a>
                </div>
            </div>
        </>
    );
}
