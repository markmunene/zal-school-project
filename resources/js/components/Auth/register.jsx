import React, { useState } from "react";
import { Link, withRouter ,Redirect } from "react-router-dom";
import ReactDOM from "react-dom";


const Register = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setpassword] = useState("");
    const [password_confirmation, setconpassword] = useState("");
    const [errors, setErrors] = useState([]);

    const handleSubmit = (e) => {
        e.preventDefault();

        const regData = new FormData();

        regData.append("name", name);
        regData.append("email", email);
        regData.append("password", password);
        regData.append("password_confirmation", password_confirmation);

        axios.defaults.withCredentials = true;

        axios.get("/sanctum/csrf-cookie").then((response) => {
            axios
                .post("/register", regData)
                .then((response) => {
                   <Redirect to= '/backend' />
                })
                .catch((err) => {
                    setErrors(err.response.data.errors);
                });
        });
    };
    const hasErrorFor = (field) => {
        return !!errors[field];
    };

    const renderErrorFor = (field) => {
        if (hasErrorFor(field)) {
            return (
                <span className="invalid-feedback">
                    <strong>{errors[field][0]}</strong>
                </span>
            );
        }
    };

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-header">
                            <h2 className="text-center text-info">Register</h2>
                        </div>

                        <div className="card-body">
                            <div
                                className="text-center mb-5"
                                style={{
                                  display: "grid",
                                  placeItems : "center",
                                }}
                            >
                                <img
                                    src="./images/img/avatar.png"
                                    alt=""
                                    className="img-fluid "
                                    style={{
                                        borderRadius: "50%",
                                        width: "200px",
                                        height: "200px",
                                    }}
                                />
                            </div>

                            <form onSubmit={handleSubmit}>
                                <div className="form-group">
                                    <input
                                        id="name"
                                        type="text"
                                        placeholder="Name"
                                        className={`form-control ${
                                            hasErrorFor("name")
                                                ? "is-invalid"
                                                : ""
                                        }`}
                                        required
                                        value={name}
                                        onChange={(e) => {
                                            setName(e.target.value);
                                        }}
                                    />
                                    {renderErrorFor("name")}
                                </div>
                                <div className="form-group">
                                    <input
                                        id="email"
                                        type="email"
                                        name="email"
                                        placeholder="E-mail"
                                        className={`form-control ${
                                            hasErrorFor("email")
                                                ? "is-invalid"
                                                : ""
                                        }`}
                                        required
                                        value={email}
                                        onChange={(e) => {
                                            setEmail(e.target.value);
                                        }}
                                    />
                                    {renderErrorFor("email")}
                                </div>
                                <div className="form-group">
                                    <input
                                        id="password"
                                        type="password"
                                        name="password"
                                        placeholder="Password"
                                        className={`form-control ${
                                            hasErrorFor("password")
                                                ? "is-invalid"
                                                : ""
                                        }`}
                                        required
                                        value={password}
                                        onChange={(e) => {
                                            setpassword(e.target.value);
                                        }}
                                    />
                                    {renderErrorFor("password")}
                                </div>
                                <div className="form-group">
                                    <input
                                        id="password_confirmation"
                                        type="password"
                                        name="password_confirmation"
                                        placeholder="Confirm Password"
                                        className={`form-control ${
                                            hasErrorFor("password_confirmation")
                                                ? "is-invalid"
                                                : ""
                                        }`}
                                        required
                                        value={password_confirmation}
                                        onChange={(e) => {
                                            setconpassword(e.target.value);
                                        }}
                                    />
                                    {renderErrorFor("password_confirmation")}
                                </div>
                                <button
                                    type="submit"
                                    className="btn btn-outline-success"
                                >
                                    register
                                </button>
                            </form>
                            <p className="text-dark">
                                Already have an account?
                                <Link to="/login" className="text-yellow">
                                  
                                    LogIn
                                </Link>{" "}
                                |
                                <span className="pull-right">
                                    <Link to="/backend" className="text-success">
                                        Back to Home
                                    </Link>
                                </span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
