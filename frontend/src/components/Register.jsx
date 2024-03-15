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
            <h1 className="my-5 text-center">Register</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    className="form-control my-3"
                    value={name}
                    onChange={handleChange}
                />
                <input
                    type="email"
                    name="email"
                    placeholder="email"
                    className="form-control my-3"
                    value={email}
                    onChange={handleChange}
                />
                <input
                    type="password"
                    name="password"
                    placeholder="password"
                    className="form-control my-3"
                    value={password}
                    onChange={handleChange}
                />
                <button className="btn-dark btn-block btn">Submit</button>
                <div className="d-flex justify-content-around my-5">
                    <p>Already have an account ?</p>
                    <Link to="/login">Log in</Link>
                </div>
            </form>
        </Fragment>
    );
}

export default Register;