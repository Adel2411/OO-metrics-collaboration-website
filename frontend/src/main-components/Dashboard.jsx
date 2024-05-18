import { Fragment, useEffect, useState } from "react";
import { toast } from "react-toastify";
import url from "../url.json";

//Dashboard component
import Documentation from "../dashboard-components/Documentation.jsx";
import Implement from "../dashboard-components/Implement.jsx";
import Navbar from "../dashboard-components/Navbar.jsx";
import Metric from "../dashboard-components/Metric.jsx";
import Research from "../dashboard-components/Research.jsx";
import Test from "../dashboard-components/Test.jsx";
import Users from "../dashboard-components/Users.jsx";

const Dashboard = ({ setAuth }) => {
  const [name, setName] = useState("");
  const [role, setRole] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  function setPage(page) {
    setCurrentPage(page);
  }

  async function getName() {
    try {
      const response = await fetch(`${url.current}/client/getuser`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify({ token: localStorage.getItem("token") }),
      });

        const jsonResponse = await response.json();

      if (response.status !== 200) {
        toast.error("An error occurred, please try again");
      } else {
        setName(jsonResponse.username);
        setRole(jsonResponse.role);
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
        <Navbar name={name} role={role} logout={Logout} setPage={setPage} />
        {currentPage === 1 && <Documentation />}
        {currentPage === 2 && <Metric />}
        {currentPage === 3 && <Research />}
        {currentPage === 4 && <Implement />}
        {currentPage === 5 && <Test />}
        {currentPage === 6 && <Users />}
      </div>
    </Fragment>
  );
};

export default Dashboard;
