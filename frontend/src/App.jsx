import "./App.css";
import React, {Fragment, useEffect, useState} from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate
} from "react-router-dom";
import {ToastContainer, Slide} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

//Components :
import Dashboard from "./main-components/Dashboard";
import Login from "./main-components/Login";
import Register from "./main-components/Register";


function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const setAuth = boolean => {
        setIsAuthenticated(boolean);
    }

    async function isAuthorized() {
        try {
            const response = await fetch("http://localhost:8080/api/v1/auth/verify", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({token: localStorage.getItem("token")}),
            });

            const jsonResponse = await response.json();

            if (!jsonResponse || jsonResponse.status !== 200) {
                localStorage.removeItem("token");
            } else {
                setAuth(true);
            }

        } catch (err) {
            console.error(err.message)
            localStorage.removeItem("token");
        }
    }

    useEffect( () => {
        isAuthorized();
    }, []);

    return (<Fragment>
        <Router>
            <div className="Router bg-third text-white">
                <ToastContainer theme="colored" transition={Slide} position="bottom-right"/>
                <Routes>
                    <Route path="/dashboard" element={isAuthenticated ? <Dashboard setAuth={setAuth}/> : <Navigate to={'/login'} />} />
                    <Route path="/login" element={isAuthenticated ? <Navigate to="/dashboard" /> : <Login setAuth={setAuth} />} />
                    <Route path="/register" element={isAuthenticated ? <Navigate to="/dashboard" /> : <Register setAuth={setAuth}/>} />
                    <Route path="/" element={isAuthenticated ? <Navigate to="/dashboard" /> : <Navigate to="/login" />} />
                </Routes>
            </div>
        </Router>
    </Fragment> );
}

export default App;