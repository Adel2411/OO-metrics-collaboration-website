import React, {Fragment, useEffect, useState} from "react";
import {toast} from "react-toastify";

//Dashboard component
import Documentation from "../dashboard-components/documentation.jsx";
import Implement from "../dashboard-components/implement.jsx";
import Search from "../dashboard-components/search.jsx";
import Navbar from "../dashboard-components/navbar.jsx";

const Dashboard = ({setAuth}) => {
    const [name, setName] = useState("");

    const [currentPage, setCurrentPage] = useState(1);
    function setPage(page) {
        setCurrentPage(page);
    }

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
            <div className="h-screen">
               <Navbar name={name} logout={Logout} setPage={setPage}/>
                {currentPage === 1 && <Documentation/>}
                {currentPage === 2 && <Search/>}
                {currentPage === 3 && <Implement/>}
            </div>
        </Fragment>
    );
}

export default Dashboard;