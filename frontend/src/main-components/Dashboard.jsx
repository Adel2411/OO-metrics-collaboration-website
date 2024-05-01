import React, { Fragment, useEffect, useState } from "react";
import { toast } from "react-toastify";
import url from "../url.json";

//Dashboard component
import Documentation from "../dashboard-components/Documentation.jsx";
import Implement from "../dashboard-components/Implement.jsx";
import Navbar from "../dashboard-components/Navbar.jsx";
import Metric from "../dashboard-components/Metric.jsx";
import Research from "../dashboard-components/Research.jsx";
import Test from "../dashboard-components/Test.jsx";

const Dashboard = ({ setAuth }) => {
  const [name, setName] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  function setPage(page) {
    setCurrentPage(page);
  }

  async function getName() {
    try {
      const response = await fetch(`${url.host}/auth/getuser`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: localStorage.getItem("token") }),
      });

      const jsonResponse = await response.json();

      if (jsonResponse.status !== 200) {
        toast.error(jsonResponse.response);
      } else {
        setName(jsonResponse.response);
      }
    } catch (err) {
      console.error(err.message);
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
  }, []);

  return (
    <Fragment>
      <div className="h-screen">
        <Navbar name={name} logout={Logout} setPage={setPage} />
        {currentPage === 1 && <Documentation />}
        {currentPage === 2 && <Metric />}
        {currentPage === 3 && <Research />}
        {currentPage === 4 && <Implement />}
        {currentPage === 5 && <Test />}
      </div>
    </Fragment>
  );
};

export default Dashboard;
