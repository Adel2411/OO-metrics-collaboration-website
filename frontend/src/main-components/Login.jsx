import React, {Fragment, useState} from "react";
import {Link} from "react-router-dom";
import {toast} from "react-toastify";

const Login = ({setAuth}) => {

    const [inputs, setInputs] = useState({
        email: "",
        password: ""
    });

    const {email, password} = inputs;
    const handleChange = (e) => {
        setInputs({
            ...inputs,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const body = {email, password}

            const response = await fetch("http://localhost:8000/auth/login", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(body)
            })

            const jsonResponse = await response.json();

            if(jsonResponse.token){
                localStorage.setItem("token", jsonResponse.token);
                setAuth(true);
                toast.success("Login successfully");
            } else {
                setAuth(false);
                toast.error(jsonResponse);
            }

        } catch(err) {
            console.error(err.message);
        }
    }

    return (
        <Fragment>
            <div className="flex items-center justify-center h-screen">
                <div className="card sm:w-1/2 xl:w-1/3 bg-first shadow-xl">
                    <div className="card-body flex justify-center items-center">
                        <h1 className="my-5 title">Log in</h1>
                        <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="currentColor"
                             className="bi bi-person-circle my-3" viewBox="0 0 16 16">
                            <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0"/>
                            <path fillRule="evenodd"
                                  d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"/>
                        </svg>
                        <form onSubmit={handleSubmit}>
                            <input
                                type="email"
                                name="email"
                                placeholder="email"
                                className="input input-bordered w-full my-2 bg-second"
                                value={email}
                                onChange={handleChange}
                            />
                            <input
                                type="password"
                                name="password"
                                placeholder="password"
                                className="input input-bordered w-full my-2 bg-second"
                                value={password}
                                onChange={handleChange}
                            />
                            <div className="flex items-center justify-center my-5">
                                <button className="btn border-none bg-fourth text-white hover:bg-third">Sign in</button>
                            </div>
                            <div className="my-5 flex flex-row">
                                <p>Don't have an account ?</p>
                                <Link className="link link-info" to="/register">Register</Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </Fragment>
    );
}

export default Login;