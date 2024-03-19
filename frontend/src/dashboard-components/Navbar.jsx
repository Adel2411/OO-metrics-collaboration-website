import React from "react";

function Navbar({name, logout, setPage}) {
  return (
      <div className="navbar bg-first z-10">
          <div className="dropdown">
              <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24"
                       stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7"/>
                  </svg>
              </div>
              <ul tabIndex={0}
                  className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-second rounded-box w-52">
                  <li><a onClick={(e) => setPage(1)} className="menu-link">Documentation</a></li>
                  <li><a onClick={(e) => setPage(2)} className="menu-link">Search</a></li>
                  <li><a onClick={(e) => setPage(3)} className="menu-link">Implementation</a></li>
              </ul>
          </div>
          <div className="flex-1">
              <a onClick={(e) => setPage(1)} className="btn btn-ghost text-xl subtitle">OO-Metrics</a>
          </div>
          <div className="dropdown end-2">
              <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                       stroke="currentColor" className="w-8 h-8">
                      <path strokeLinecap="round" strokeLinejoin="round"
                            d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"/>
                  </svg>
              </div>
              <ul tabIndex={0}
                  className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-red-500 rounded-box w-34">
                  <li>
                      <button onClick={logout} className="menu-link">Logout</button>
                  </li>
              </ul>
          </div>

          <p>{name}</p>
      </div>
  );
}

export default Navbar;