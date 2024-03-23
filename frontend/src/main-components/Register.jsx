import React, {Fragment, useState} from "react";
import {Link} from "react-router-dom";
import {toast} from "react-toastify";
import url from "../url.json";

const Register = ({setAuth}) => {

    const [inputs, setInputs] = useState({
        username: "",
        email: "",
        password: ""
    });

    const {username, email, password} = inputs;
    const handleChange = (e) => {
        setInputs({
            ...inputs,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const body = {username, email, password};

            const response = await fetch(`${url.local}/auth/register`, {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(body)
            });

            const jsonResponse = await response.json();

            if (jsonResponse.status === 200) {
                localStorage.setItem("token", jsonResponse.response);
                setAuth(true);
                toast.success("successfully registered!");
            } else {
                setAuth(false);
                toast.error(jsonResponse.response);
            }

        }catch(err){
            console.error(err.message);
        }
    }

    return (
        <Fragment>
            <div className="h-screen flex justify-center items-center">
                <div
                    className="fixed flex justify-center sm:flex-none overflow-auto w-screen h-screen bg-first lg:shadow-2xl lg:w-1/2 lg:h-auto xl:w-1/3 lg:rounded-box">
                    <div className="sm:mt-32 w-full flex flex-col justify-center items-center gap-5 md:mt-0 px-5 py-10">
                        <h1 className="title">Register</h1>
                        <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="currentColor"
                             className="bi bi-person-circle" viewBox="0 0 16 16">
                            <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0"/>
                            <path fillRule="evenodd"
                                  d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"/>
                        </svg>
                        <form onSubmit={handleSubmit}>
                            <input
                                type="text"
                                name="username"
                                placeholder="username"
                                className="input input-bordered w-full my-2 bg-second"
                                value={username}
                                onChange={handleChange}
                            />
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
                                <button className="btn border-none bg-fourth text-white hover:bg-third">Sign up</button>
                            </div>
                            <div className="my-5 flex flex-row gap-3">
                                <p>Already have an account ?</p>
                                <Link className="link link-info" to="/login">Log in</Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </Fragment>
    );
}

export default Register;