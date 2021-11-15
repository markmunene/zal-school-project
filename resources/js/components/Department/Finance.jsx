import React from "react";

import "./department.css";
export default function Finance() {
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
                        <h2 className="">Finance</h2>
                        <h5 className="">Home/Finance</h5>
                    </div>
                </div>
                <div>
                    <div
                        className="departmentBody"
                        style={{ padding: "70px !importmant" }}
                    >
                        <div className="depHeadeer mb-5">
                            <h1>Finance Department</h1>
                            <div className="divider"></div>
                        </div>
                        <div className="depRow1">
                            <div className="row ">
                                <div className="col-md-5">
                                    <div
                                        className="depImagewrapper"
                                        style={{
                                            height: "400px",
                                            width: "100%",
                                        }}
                                    >
                                        <img
                                            src="./images/dep/finance.jpg"
                                            alt=""
                                            className="depImage img-fluid"
                                            height="400px"
                                        />
                                    </div>
                                </div>
                                <div className="col-md-7">
                                    <div className="mt-3 ">
                                        <h4 className="pb-3">
                                            Outstanding finance tutors
                                        </h4>
                                        <p>
                                            This is the most basic function of
                                            the finance department. It involves
                                            the day-to-day recording, analysis
                                            and interpretation of a company’s
                                            financial transactions. This will
                                            include the tracking of all expenses
                                            (purchases, payments etc.) and sales
                                            of finished products. In some
                                            startup companies, this role is
                                            often carried out by a bookkeeper
                                            who might be replaced by more
                                            specialized payables and receivables
                                            clerks as the company grows or
                                            expands its operations.
                                        </p>
                                        <div className="accoRow1Header">
                                            <strong>
                                                Headed By: Kristina Martinez,
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
