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
            <h1 className="text-center my-5">Login</h1>
            <form onSubmit={handleSubmit}>
                <input
                    name="email"
                    placeholder="email"
                    type="email"
                    className="form-control my-3"
                    defaultValue={email}
                    onChange={handleChange}
                />
                <input
                    name="password"
                    placeholder="password"
                    type="password"
                    className="form-control my-3"
                    defaultValue={password}
                    onChange={handleChange}
                />
                <button className="btn btn-dark btn-block">Submit</button>
                <div className="d-flex justify-content-around">
                    <p>Don't have an account ?</p>
                    <Link to="/register">Register</Link>
                </div>
            </form>
        </Fragment>
    );
}

export default Login;