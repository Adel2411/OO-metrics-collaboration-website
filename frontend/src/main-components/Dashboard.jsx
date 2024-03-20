import React, {Fragment, useEffect, useState} from "react";
import {toast} from "react-toastify";

//Dashboard component
import Documentation from "../dashboard-components/Documentation.jsx";
import Implement from "../dashboard-components/Implement.jsx";
import Search from "../dashboard-components/Search.jsx";
import Navbar from "../dashboard-components/Navbar.jsx";
import Metric from "../dashboard-components/Metric.jsx";

const Dashboard = ({setAuth}) => {
    const [name, setName] = useState("");

    const [currentPage, setCurrentPage] = useState(1);
    function setPage(page) {
        setCurrentPage(page);
    }

    const navbar = document.querySelector(".navbar");
    window.addEventListener("scroll", (e) => {
        if (window.scrollY > 0) {
            navbar.classList.add("fixed");
        } else {
            navbar.classList.remove("fixed");
        }
    })

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
                {currentPage === 2 && <Metric/>}
                {currentPage === 3 && <Search/>}
                {currentPage === 4 && <Implement/>}
            </div>
        </Fragment>
    );
}

export default Dashboard;