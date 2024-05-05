import "./App.css";
import React, { Fragment, useEffect, useState } from "react";
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

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  const setAuth = (boolean) => {
    setIsAuthenticated(boolean);
  };
  const setLoad = (boolean) => {
    setLoading(boolean);
  };

  async function isAuthorized() {
    try {
      await fetch(`${url.host}/app/documents`);
      setLoad(false);

      const response = await fetch(`${url.host}/auth/verify`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: localStorage.getItem("token") }),
      });

      const jsonResponse = await response.json();

      if (!jsonResponse || jsonResponse.status !== 200) {
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
        <Router>
          <div className="Router bg-third text-white">
            <ToastContainer
              theme="colored"
              transition={Slide}
              position="bottom-right"
            />
            <Routes>
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
            </Routes>
          </div>
        </Router>
      )}
    </Fragment>
  );
}

export default App;
