import React from 'react'

import './department.css'
export default function ict() {
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
                        <h2 className="">ICT</h2>
                        <h5 className="">Home/ICT</h5>
                    </div>
                </div>
                <div>
                    <div className="departmentBody">
                        <div className="depHeadeer">
                            <h1>ICT Department</h1>
                            <div className="divider"></div>
                        </div>
                        <div className="depRow1">
                            <div className="row ">
                                <div className="col-md-5">
                                    <div className="depImagewrapper">
                                        <img
                                            src="./images/dep/card3.jpg"
                                            alt=""
                                            className="depImage img-fluid w-100"
                                        />
                                    </div>
                                </div>
                                <div className="col-md-7">
                                    <div className="mt-3">
                                        <h4 className="pb-3">State of the Art Tech Hubs</h4>
                                        <p>
                                            Tech Lab adds new, state-of-the-art
                                            facilities that will attract
                                            companies and researchers from
                                            around the globe to work on new
                                            projects in engineering and digital
                                            transformation. UTS Tech Lab is a
                                            unique research facility in
                                            Australia, where academics and
                                            researchers from diverse fields will
                                            work in tandem with industry and
                                            government to develop innovative
                                            solutions, taking new technologies
                                            from early readiness to commercial
                                            viability.
                                        </p>
                                        <div className="accoRow1Header">
                                            <strong>
                                                Headed By: Professor Matteo
                                                Riondatto,
                                            </strong>
                                            <p>
                                                PhD Computer Science &
                                                BlockChain Mining.
                                            </p>
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
