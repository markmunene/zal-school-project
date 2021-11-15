import React from 'react'


export default function Mission() {
    return (
        <>
            <div className="missionWrapper">
                <div
                    className="missionHeader "
                    style={{
                        backgroundImage: 'url("./images/aboutUs/banner1.jpg")',
                    }}
                >
                    <div className="headText">
                        <h2 className="">About Us</h2>
                        <h5 className="">Home/About Us</h5>
                    </div>
                </div>
                <div className="missionBody ">
                    <div className="row">
                        <div className="col-md-4">
                            <div className="imageMainWrapper">
                                <img
                                    src="./images/aboutUs/pillar5.jpg"
                                    alt=""
                                    className="missionImage img-fluid"
                                />
                            </div>
                        </div>
                        <div className="col-md-8">
                            <div className="headers">
                                <div className="textContent">
                                    <h2>Our Story</h2>
                                    <div className="border"></div>
                                </div>

                                <div className="dates mt-4">
                                    <h6>From 1989-now</h6>
                                </div>
                                <div className="rowText">
                                    Lorem Ipsum is simply dummy text of the
                                    printing and typesetting industry. Lorem
                                    Ipsum has been the industry's standard dummy
                                    text ever Lorem Ipsum is simply dummy text
                                    of the printing and typesetting industry.
                                    Lorem Ipsum has been the industry's standard
                                    dummy text ever Lorem Ipsum is simply dummy
                                    text of the printing and typesetting
                                    industry. Lorem Ipsum has been the
                                    industry's standard dummy text ever Lorem
                                    Ipsum is simply dummy text of the printing
                                    and typesetting industry. Lorem Ipsum has
                                    been the industry's standard dummy text ever
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* values section */}
                <div className="valuesSection">
                    <div className="mainHeader">
                        <h1>Values</h1>
                        <div className="border"></div>
                    </div>
                    <div className="valuesMainBody">
                        <div className="row">
                            <div className="col-md-4">
                                <center>
                                    <i className="fa fas fa-hands-helping fa-3x"></i>

                                    <h2 className="mt-5 text-center">
                                        <strong>Mission</strong>
                                    </h2>
                                    <div className="border"></div>
                                    <p>
                                        Lorem ipsum dolor sit, amet consectetur
                                        adipisicing elit. Error voluptate quo
                                        fugit, ipsum, sunt veritatis, possimus
                                        autem ut cupiditate ducimus consectetur
                                        odit. Excepturi molestias nemo
                                        voluptatem minima amet eligendi
                                        deserunt.
                                    </p>
                                </center>
                            </div>
                            <div className="col-md-4">
                                <center>
                                    <i className="fa fas fa-hands-helping fa-3x"></i>

                                    <h2 className="mt-5 text-center">
                                        <strong>Vision</strong>
                                    </h2>
                                    <div className="border"></div>
                                    <p>
                                        Lorem ipsum dolor sit, amet consectetur
                                        adipisicing elit. Error voluptate quo
                                        fugit, ipsum, sunt veritatis, possimus
                                        autem ut cupiditate ducimus consectetur
                                        odit. Excepturi molestias nemo
                                        voluptatem minima amet eligendi
                                        deserunt.
                                    </p>
                                </center>
                            </div>
                            <div className="col-md-4">
                                <center>
                                    <i className="fa fas fa-hands-helping fa-3x"></i>

                                    <h2 className="mt-5 text-center">
                                        <strong>Motto</strong>
                                    </h2>
                                    <div className="border"></div>
                                    <p>
                                        Lorem ipsum dolor sit, amet consectetur
                                        adipisicing elit. Error voluptate quo
                                        fugit, ipsum, sunt veritatis, possimus
                                        autem ut cupiditate ducimus consectetur
                                        odit. Excepturi molestias nemo
                                        voluptatem minima amet eligendi
                                        deserunt.
                                    </p>
                                </center>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="AboutFooter ">
                    <div className="row ">
                        <div className="col-md-4">
                            <div className="col-content">
                                <h2 className="mt-5 text-center">
                                    <strong>1200</strong>
                                </h2>
                                <div className="border"></div>
                                <p>
                                    <strong>Students</strong>
                                </p>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="col-content">
                                <h2 className="mt-5 text-center">
                                    <strong>171</strong>
                                </h2>
                                <div className="border"></div>
                                <p>
                                    <strong>
                                        <p>
                                            <strong>Teachers</strong>
                                        </p>
                                    </strong>
                                </p>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="col-content">
                                <h2 className="mt-5 text-center display-5">
                                    <strong>39</strong>
                                </h2>
                                <div className="border"></div>
                                <p>
                                    <strong>Departments</strong>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
