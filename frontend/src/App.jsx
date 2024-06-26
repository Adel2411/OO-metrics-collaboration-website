import "./App.css";
import { Fragment, useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { ToastContainer, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import url from "./url.json";

//Components :
import Dashboard from "./main-components/Dashboard";
import Login from "./main-components/Login";
import Register from "./main-components/Register";
import LoadingPage from "./main-components/LoadingPage";
import Reset from "./main-components/Reset";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  // Redirect the user to "/" when he refreshes the page
  useEffect(() => {
    const handleBeforeUnload = (event) => {
      event.preventDefault();
      event.returnValue = "";
      window.location.href = "/dashboard";
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  const setAuth = (boolean) => {
    setIsAuthenticated(boolean);
  };
  const setLoad = (boolean) => {
    setLoading(boolean);
  };

  async function isAuthorized() {
    try {
      await fetch(`${url.current}/hello`).then((response) => {
        if (response.status === 200) {
          setLoad(false);
        }
      });

      const response = await fetch(`${url.current}/auth/verify`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: localStorage.getItem("token") }),
      });

      if (response.status !== 200) {
        localStorage.removeItem("token");
      } else {
        setAuth(true);
      }
    } catch (err) {
      console.error(err.message);
      localStorage.removeItem("token");
    }
  }

  useEffect(() => {
    isAuthorized();
  }, []);

  return (
    <Fragment>
      {loading ? (
        <LoadingPage /> // Render the loading page if loading is true
      ) : (
        <Router basename="/">
          <div className="Router customScrollbar bg-third text-white">
            <ToastContainer
              theme="colored"
              transition={Slide}
              position="bottom-right"
            />
            <Routes>
              <Route path="/*" element=<Navigate to={"/dashboard"} /> />
              <Route
                path="/dashboard"
                element={
                  isAuthenticated ? (
                    <Dashboard setAuth={setAuth} />
                  ) : (
                    <Navigate to={"/login"} />
                  )
                }
              />
              <Route
                path="/login"
                element={
                  isAuthenticated ? (
                    <Navigate to="/dashboard" />
                  ) : (
                    <Login setAuth={setAuth} />
                  )
                }
              />
              <Route
                path="/register"
                element={
                  isAuthenticated ? (
                    <Navigate to="/dashboard" />
                  ) : (
                    <Register setAuth={setAuth} />
                  )
                }
              />
              <Route
                path="/"
                element={
                  isAuthenticated ? (
                    <Navigate to="/dashboard" />
                  ) : (
                    <Navigate to="/login" />
                  )
                }
              />
              <Route
                path="/reset-password"
                element={
                  isAuthenticated ? <Navigate to="/dashboard" /> : <Reset />
                }
              />
            </Routes>
          </div>
        </Router>
      )}
    </Fragment>
  );
}

export default App;
