import React, {Fragment, useEffect, useState} from "react";
import {toast} from "react-toastify";

const Dashboard = ({setAuth}) => {
    const [name, setName] = useState("");

    async function getName() {
        try {
            const response = await fetch("http://localhost:8000/dashboard", {
                method: "GET",
                headers: {token: localStorage.getItem("token")}
            });

            const jsonResponse = await response.json();

            setName(jsonResponse.user_name);

        } catch (err) {
            console.error(err.message)
        }
    }

    function Logout(e) {
        e.preventDefault();
        localStorage.removeItem("token");
        setAuth(false);
        toast.success("Logout successfully, goodbye !");
    }

    useEffect(() => {
        getName();
    }, [])


    return (
        <Fragment>
            <h1 className="my-5 text-center">Welcome {name}</h1>
            <button className="btn btn-block btn-info" onClick={Logout}>Log out</button>
        </Fragment>
    );
}

export default Dashboard;