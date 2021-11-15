import React from "react";

import "./footer.css";
export default function Footer() {
    return (
        <>
            <footer
                className="footer w-100"
                style={{
                    backgroundImage: 'url("./images/background.jpg")',
                    backgroundSize: "100%",
                }}
            >
                <div className="footerrow">
                    <div className="row ">
                        <div className="col ">
                            <h2>GET IN TOUCH</h2>
                            <p>Monday- Friday: 08:30pm to 05.00pm </p>
                            <p>Saturday 08.30 to 2.00pm</p>
                            <p>Saturday 08.30 to 2.00pm</p>
                            <p>Sunday closed</p>
                            <p>Follow us on:</p>
                            <div className=" icons ">
                                <a href="">
                                    <i className="icofont-twitter sLinks"></i>
                                </a>
                                <a href="">
                                    <i className="icofont-facebook sLinks"></i>
                                </a>
                                <a href="">
                                    <i className="icofont-instagram sLinks"></i>
                                </a>
                                <a href="">
                                    <i className="icofont-linkedin sLinks"></i>
                                </a>

                                <a href="">
                                    <i className="icofont-skype sLinks"></i>
                                </a>
                            </div>
                        </div>
                        <div className="col ">
                            <h2>QUICK LINKS</h2>
                            <div>Contact Us</div>
                            <div>Apply</div>
                            <div>Bussiness Portifolio</div>
                        </div>
                        <div className="col ">
                            <h2>CONTACT US</h2>
                            <p>
                                <strong>
                                    <i className="mr-1 fas fa-map-marker-alt"></i>
                                </strong>
                                Home Ground Floor, Nairobi
                            </p>
                            <p>
                                <i className=" mr-1 fas fa-phone "> </i>
                                <strong> Phone</strong>: +254715950481
                            </p>
                            <p>
                                <i className=" mr-1 fas fa-envelope-open-text"></i>
                                <strong>Email</strong>: markmunene72@gmail.com,
                                munenemark72@gmail.com.
                            </p>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    );
}
