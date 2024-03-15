import React, {Fragment, useState} from "react";
import {Link} from "react-router-dom";
import {toast} from "react-toastify";

const Register = ({setAuth}) => {

    const [inputs, setInputs] = useState({
        name: "",
        email: "",
        password: ""
    });

    const {name, email, password} = inputs;
    const handleChange = (e) => {
        setInputs({
            ...inputs,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const body = {name, email, password};

            const response = await fetch("http://localhost:8000/auth/register", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(body)
            });

            const jsonResponse = await response.json();

            if (jsonResponse.token) {
                localStorage.setItem("token", jsonResponse.token);
                setAuth(true);
                toast.success("successfully registered!");
            } else {
                setAuth(false);
                toast.error(jsonResponse);
            }

        }catch(err){
            console.error(err.message);
        }
    }

    return (
        <Fragment>
            <div className="container mt-5 pt-5">
                <div className="row">
                    <div className="col-12 col-sm-8 m-auto">
                        <div className="card border-0 shadow">
                            <div className="card-body text-center">
                                <h1 className="my-5">Register</h1>
                                <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="currentColor"
                                     className="bi bi-person-circle my-3" viewBox="0 0 16 16">
                                    <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0"/>
                                    <path fill-rule="evenodd"
                                          d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"/>
                                </svg>
                                <form onSubmit={handleSubmit}>
                                    <input
                                        type="text"
                                        name="name"
                                        placeholder="user name"
                                        className="form-control my-4 py-2"
                                        value={name}
                                        onChange={handleChange}
                                    />
                                    <input
                                        type="email"
                                        name="email"
                                        placeholder="email"
                                        className="form-control my-4 py-2"
                                        value={email}
                                        onChange={handleChange}
                                    />
                                    <input
                                        type="password"
                                        name="password"
                                        placeholder="password"
                                        className="form-control my-4 py-2"
                                        value={password}
                                        onChange={handleChange}
                                    />
                                    <button className="btn-info btn">Sign up</button>
                                    <div className="d-flex my-5">
                                        <p>Already have an account ?</p>
                                        <Link to="/login">Log in</Link>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
}

export default Register;