import React from "react";

import "./department.css";
export default function Bigdata() {
    return (
        <>
            <div className="ictWrapper">
                <div
                    className="missionHeader "
                    style={{
                        backgroundImage: 'url("./images/aboutUs/banner1.jpg")',
                    }}
                >
                    <div className="headText">
                        <h2 className="">Big data</h2>
                        <h5 className="">Home/Big Data</h5>
                    </div>
                </div>
                <div>
                    <div
                        className="departmentBody"
                        style={{ padding: "70px !importmant" }}
                     >
                        <div className="depHeadeer">
                            <h1>Big Data Department</h1>
                            <div className="divider"></div>
                        </div>
                        <div className="depRow1">
                            <div className="row ">
                                <div className="col-md-5">
                                    <div
                                        className="depImagewrapper"
                                        style={{
                                            height: "350px",
                                            width: "100%",
                                        }}
                                    >
                                        <img
                                            src="./images/dep/bigdata.jpg"
                                            alt=""
                                            className="depImage img-fluid"
                                        />
                                    </div>
                                </div>
                                <div className="col-md-7">
                                    <div className="mt-3 ">
                                        <h4 className="pb-3">
                                            State of the art Mining techniques
                                        </h4>
                                        <p>
                                            The Big data is well â€“ equipped
                                            with comfortable furniture. The
                                            books are classified and displayed
                                            clearly. It is well lit and
                                            ventilated. Internet and
                                            photocopying facilities are
                                            available throughout the working
                                            hours. Safe drinking water is
                                            provided in the Big data. The chief
                                            librarian and his staff are
                                            courteous and ever willing to help.
                                            The Big data makes arrangements for
                                            the differently abled students to
                                            utilize the facilities. The Big data
                                            is well maintained and is one of the
                                            largest libraries of under graduate
                                            educational institutions in
                                            Karnataka.
                                        </p>
                                        <div className="accoRow1Header">
                                            <strong>
                                                <div>
                                                    Headed By: Kristina
                                                    Martinez,
                                                </div>
                                                <p>
                                                    Msc artificila intelligence,
                                                    Harvard College
                                                </p>
                                            </strong>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
