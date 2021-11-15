import React from 'react'

import Test from './Test.jsx';

export default function Accomplishment() {
    return (
        <>
            <div className="accoWrapper">
                <div
                    className="missionHeader "
                    style={{
                        backgroundImage: 'url("./images/aboutUs/banner1.jpg")',
                    }}
                 >
                    <div className="headText">
                        <h2 className="">Accomplishments</h2>
                        <h5 className="">Home/Accomplishments</h5>
                    </div>
                </div>
                <div className="AccoBody">
                    <div className="accoBodyHeader">
                        <h1>Our Hall of Fame</h1>
                        <div className="divider"></div>
                    </div>

                    <div className="accoRow1">
                        <div className="row ">
                            <div className="col-md-3">
                                <img
                                    src="./images/aboutUs/trophy.jpg"
                                    alt=""
                                    className="accoImage img-fluid"
                                />
                            </div>
                            <div className="col-md-9">
                                <div className="mt-3">
                                    <h4>Science Congress Contest</h4>
                                    <p>
                                        In the 2020 Kenya National Science
                                        Olympiad, our school scooped a record 15
                                        accolades in Agriculture, Biology,
                                        Chemistry, ICT, Food Technology,
                                        Mathematics, Physics, Environmental
                                        Science, Technology, Engineering and
                                        Energy. This has set out our
                                        competitiveness and commitment to
                                        excellence ranking 1st in East Africa in
                                        the Outstanding Cambridge Learner
                                        Awards.
                                    </p>
                                    <div className="accoRow1Header">
                                        <strong>
                                            <i className="fa fa-calendar ml-1 "></i>
                                            Awarded on: 12th April, 2020
                                        </strong>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* row 2 */}
                    <div className="accoRow1">
                        <div className="row ">
                            <div className="col-md-9">
                                <div className="">
                                    <h4>Rugby Team</h4>
                                    <p>
                                        In the 2020 Kenya National Science
                                        Olympiad, our school scooped a record 15
                                        accolades in Agriculture, Biology,
                                        Chemistry, ICT, Food Technology,
                                        Mathematics, Physics, Environmental
                                        Science, Technology, Engineering and
                                        Energy. This has set out our
                                        competitiveness and commitment to
                                        excellence ranking 1st in East Africa in
                                        the Outstanding Cambridge Learner
                                        Awards.
                                    </p>
                                    <div className="accoRow1Header">
                                        <strong>
                                            <i className="fa fa-calendar ml-1 "></i>
                                            Awarded on: 14th June 2020
                                        </strong>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-3">
                                <img
                                    src="./images/aboutUs/trophy2.jpg"
                                    alt=""
                                    className="accoImage float-left img-fluid "
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
