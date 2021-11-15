import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";

import { Link, Router, Switch, Route, withRouter } from "react-router-dom";

import Sethome from "./Sethome.jsx";
import SetHomeMarketting from "./setHomeMarketting.js";
import RowMarketingSection from "./RowMarketingSection.jsx";
import SetNews from "./SetNewsAndEvents.jsx";
import "./backend.css";
import { Redirect } from "react-router-dom";

const HomeBackEnd = (props) => {
    const [user, setUser] = useState([]);
    useEffect(() => {
        fetchUser();
    }, []);

    const fetchUser = async () => {
        await axios
            .get("/api/user")
            .then((res) => {
                if (res.status == 200) {
                    setUser(res.data);
                } else if (res.status == 401) {
                    setUser([]);
                }
            })
            .catch((error) => {
                console.log(error);
            });
    };
    return (
        <>
            <div className="wrapper">
                {/* <!-- Preloader --/> */}
                {/* <div className="preloader flex-column justify-content-center align-items-center">
                    <img
                        className="animation__shake"
                        src="dist/img/AdminLTELogo.png"
                        alt="AdminLTELogo"
                        height="60"
                        width="60"
                    />
                </div> */}
                <nav className="main-header navbar navbar-expand navbar-white navbar-light">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <a
                                className="nav-link"
                                data-widget="pushmenu"
                                href="#"
                                role="button"
                            >
                                <i className="fas fa-bars"></i>
                            </a>
                        </li>
                    </ul>
                </nav>
                {/* <!-- Main Sidebar Container --> */}
                <aside className="main-sidebar sidebar-dark-primary elevation-4">
                    {/* <!-- Brand Logo --> */}
                    <a href="index3.html" className="brand-link">
                        <img
                            src="dist/img/AdminLTELogo.png"
                            alt="AdminLTE Logo"
                            className="brand-image img-circle elevation-3"
                            style={{ opacity: 0.8 }}
                        />
                        <span className="brand-text font-weight-light">
                            ZALEGO ACADEMY
                        </span>
                    </a>

                    {/* <!-- Sidebar --> */}
                    <div className="sidebar">
                        {/* <!-- Sidebar user panel (optional) --> */}
                        <div className="user-panel mt-3 pb-3 mb-3 d-flex">
                            <div className="image">
                                <img
                                    src="dist/img/user2-160x160.jpg"
                                    className="img-circle elevation-2"
                                    alt="User Image"
                                />
                            </div>
                            <div className="info">
                                <a href="#" className="d-block">
                                    {user.name}
                                </a>
                            </div>
                        </div>

                        {/* <!-- Sidebar Menu --> */}

                        {/* tabs nag\viigation */}

                        <nav className="mt-2">
                            <ul
                                className="nav  nav-sidebar flex-column nav-tabs"
                                data-widget="treeview"
                                role="menu"
                                data-accordion="true"
                            >
                                <li className="nav-item">
                                    <a
                                        href="#hometab"
                                        className="nav-link active show "
                                        data-toggle="tab"
                                    >
                                        <i className="nav-icon fas fa-home"></i>
                                        <p>Home</p>
                                    </a>
                                </li>
                                {/* about us */}
                                <li class="nav-item">
                                    <Link to="#" className="nav-link">
                                        <i className="nav-icon fas fa-book"></i>
                                        <p>
                                            About Us
                                            <i className="fas fa-angle-left right"></i>
                                        </p>
                                    </Link>

                                    <ul className="nav nav-treeview nav-tabs">
                                        <li className="nav-item">
                                            <a
                                                href="#missionTab"
                                                className="nav-link"
                                                data-toggle="tab"
                                            >
                                                <i className="far fa-circle nav-icon"></i>
                                                <p>Mission/vison</p>
                                            </a>
                                        </li>
                                        <li className="nav-item">
                                            <a
                                                href="#staffTab"
                                                className="nav-link"
                                                data-toggle="tab"
                                            >
                                                <i className="far fa-circle nav-icon"></i>
                                                <p>Staff</p>
                                            </a>
                                        </li>
                                        <li className="nav-item">
                                            <a
                                                href="#AccomplishmentTab"
                                                className="nav-link"
                                                data-toggle="tab"
                                            >
                                                <i className="far fa-circle nav-icon"></i>
                                                <p> Accomplishment </p>
                                            </a>
                                        </li>
                                    </ul>
                                </li>
                                {/* departmennts */}
                                <li className="nav-item">
                                    <Link
                                        to="#hometab"
                                        className="nav-link"
                                        data-toggle="tab"
                                    >
                                        <i className="nav-icon fas fa-book"></i>
                                        <p>
                                            Departments
                                            <i className="fas fa-angle-left right"></i>
                                        </p>
                                    </Link>
                                    <ul className="nav nav-treeview ">
                                        <li className="nav-item">
                                            <a
                                                href="#ictTab"
                                                className="nav-link"
                                                data-toggle="tab"
                                            >
                                                <i className="far fa-circle nav-icon"></i>
                                                <p>Ict</p>
                                            </a>
                                        </li>
                                        <li className="nav-item">
                                            <a
                                                href="#bigdataTab"
                                                className="nav-link"
                                                data-toggle="tab"
                                            >
                                                <i className="far fa-circle nav-icon"></i>
                                                <p>Big Data</p>
                                            </a>
                                        </li>
                                        <li className="nav-item">
                                            <a
                                                href="#financeTab"
                                                className="nav-link"
                                                data-toggle="tab"
                                            >
                                                <i className="far fa-circle nav-icon"></i>
                                                <p> Finance </p>
                                            </a>
                                        </li>
                                    </ul>
                                </li>

                                {/* more */}

                                <li className="nav-item">
                                    <a
                                        href="#newsTab"
                                        className="nav-link"
                                        data-toggle="tab"
                                    >
                                        <i className="nav-icon fas fa-book"></i>
                                        <p>News And Events</p>
                                    </a>
                                </li>

                                {/* end of more */}

                                {/* contact use */}
                                <li className="nav-item">
                                    <a
                                        href="#ContactusTab"
                                        className="nav-link"
                                        data-toggle="tab"
                                    >
                                        <i className="nav-icon fas fa-book"></i>
                                        <p>Contact Us</p>
                                    </a>
                                </li>
                                {/* logout */}
                                <li className="nav-item">
                                    <button
                                        className="btn  btn-sm btn-danger nav-link"
                                        onClick={() => {
                                            {
                                                axios.defaults.withCredentials = true;
                                                axios
                                                    .get("/sanctum/csrf-cookie")
                                                    .then((response) => {
                                                        axios
                                                            .post("/logout")
                                                            .then(
                                                                (response) => {
                                                                    props.history.push(
                                                                        "/"
                                                                    );
                                                                }
                                                            );
                                                    });
                                            }
                                        }}
                                    >
                                        <div className="d-flex">
                                            <i className="nav-icon fas fa-sign-out-alt mr-1"></i>
                                            <p> Log out</p>
                                        </div>
                                    </button>
                                </li>
                            </ul>
                        </nav>
                        {/* <!-- /.sidebar-menu --> */}
                    </div>
                    {/* <!-- /.sidebar --> */}
                </aside>
                {/* <!-- Content Wrapper. Contains page content --> */}
                <div className="content-wrapper">
                    {/* <!-- Content Header (Page header) --> */}
                    <div className="content-header">
                        <div className="container-fluid">
                            <div className="row mb-2">
                                <div className="col-sm-6">
                                    <h1 className="m-0">Zalego Academy</h1>
                                </div>
                                <div className="col-sm-6">
                                    <ol className="breadcrumb float-sm-right">
                                        <li className="breadcrumb-item">
                                            <a href="#">Home</a>
                                        </li>
                                        <li className="breadcrumb-item active">
                                            Dashboard
                                        </li>
                                    </ol>
                                </div>
                                {/* <!-- /.col --> */}
                            </div>
                            {/* <!-- /.row --> */}
                        </div>
                        {/* <!-- /.container-fluid --> */}
                    </div>
                    <section className="content">
                        <div className="container-fluid">
                            {/* <!--==================menu container section======================--> */}
                            <div className="tab-content">
                                <div className="tab-pane active " id="hometab">
                                    <Sethome />

                                    {/* marketting  */}
                                    <SetHomeMarketting />

                                    {/* row marketting */}
                                    <RowMarketingSection />
                                </div>

                                <div className="tab-pane" id="missionTab">
                                    <h1>fathila bana</h1>
                                </div>
                                <div className="tab-pane" id="staffTab"></div>
                                <div
                                    className="tab-pane"
                                    id="AccomplishmentTab"
                                ></div>
                                <div className="tab-pane" id="ictTab"></div>
                                <div className="tab-pane" id="bigdataTab"></div>
                                <div className="tab-pane" id="newsTab">
                                    {/* news and events component men! */}

                                    <SetNews />
                                </div>
                                <div
                                    className="tab-pane"
                                    id="ContactusTab"
                                ></div>
                            </div>
                        </div>
                    </section>

                    {/* <!-- /.content-header --> */}
                </div>
                {/* <!-- /.content-wrapper --> */}

                <footer className="main-footer">
                    <strong>
                        Copyright &copy; 2014-2021{" "}
                        <Link to="#">Zalego Academy</Link>.
                    </strong>
                    All rights reserved.
                    <div className="float-right d-none d-sm-inline-block">
                        <b>Version</b> 3.2.
                    </div>
                </footer>

                {/* <!-- Control Sidebar --> */}
                <aside className="control-sidebar control-sidebar-dark">
                    {/* <!-- Control sidebar content goes here --> */}
                </aside>
                {/* <!-- /.control-sidebar --> */}
            </div>
        </>
    );
};
export default withRouter(HomeBackEnd);
