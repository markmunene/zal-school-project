import React, { useState } from "react";
import { Link, withRouter } from "react-router-dom";

const Login = (props) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const handleSubmit = (e) => {
        e.preventDefault();
        axios.defaults.withCredentials = true;

        axios.get("/sanctum/csrf-cookie").then((response) => {
            axios
                .post("/login", {
                    email: email,
                    password: password,
                })
                .then((response) => {
                    setEmail("");
                    setPassword("");
                    props.history.push("/backend");
                });
        });
    };
    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-header">
                            <h2 className="text-center text-info">Login</h2>
                        </div>

                        <div className="card-body">
                            <div className="mx-auto mb-5">
                                <img
                                    src="./images/img/avatar.png"
                                    alt=""
                                    className="img-fluid "
                                    style={{
                                        borderRadius: "50%",
                                        width: "200px",
                                        position: "relative",
                                        left: "30%",
                                        height: "200px",
                                    }}
                                />
                            </div>

                            <form onSubmit={handleSubmit}>
                                <div className="input-group mb-3">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text">
                                            email
                                        </span>
                                    </div>
                                    <input
                                        className="form-control "
                                        type="email"
                                        name="email"
                                        placeholder="Email"
                                        value={email}
                                        onChange={(e) =>
                                            setEmail(e.target.value)
                                        }
                                        required
                                    />
                                </div>

                                <div className="input-group mb-3">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text">
                                            {" "}
                                            password
                                        </span>
                                    </div>
                                    <input
                                        className="form-control "
                                        type="password"
                                        name="password"
                                        placeholder="Password"
                                        value={password}
                                        onChange={(e) =>
                                            setPassword(e.target.value)
                                        }
                                        required
                                    />
                                </div>
                                <div
                                    className="mx-auto"
                                    style={{
                                        position: "relative",
                                        left: "40%",
                                    }}
                                >
                                    <input
                                        type="submit"
                                        className=" btn mr-3"
                                        value="login"
                                        name="login"
                                        style={{
                                            borderRadius: "25px",
                                            backgroundColor: "orangered",
                                            color: "white",
                                        }}
                                    />
                                    <Link to="/" className="  mr-4">
                                        forgot your password
                                    </Link>
                                </div>
                            </form>
                            <a href="#"></a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
