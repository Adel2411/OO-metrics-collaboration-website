function Navbar({ name, role, logout, setPage }) {
  function displayListElement(page, title) {
    return (
      <li className="h-full">
        <a
          onClick={() => setPage(page)}
          className="border-2 btn btn-ghost navbar-options"
        >
          {title}
        </a>
      </li>
    );
  }

  return (
    <div className="navbar bg-first z-10 top-0 fixed grid grid-cols-2 xl:grid-cols-5">
      <div>
        <div className="dropdown visible xl:hidden">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h7"
              />
            </svg>
          </div>

          {role === "USER" && (
              <ul
                  tabIndex={0}
                  className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-second rounded-box w-52"
              >
                <li>
                  <a onClick={() => setPage(1)} className="navbar-options">
                    Documentation
                  </a>
                </li>
                <li>
                  <a onClick={() => setPage(5)} className="navbar-options">
                    Test
                  </a>
                </li>
              </ul>
          )}

            {role === "ADMIN" && (
                <ul
                    tabIndex={0}
                    className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-second rounded-box w-52"
                >
                  <li>
                    <a onClick={() => setPage(1)} className="navbar-options">
                      Documentation
                    </a>
                  </li>
                  <li>
                    <a onClick={() => setPage(2)} className="navbar-options">
                      Metrics
                    </a>
                  </li>
                  <li>
                    <a onClick={() => setPage(3)} className="navbar-options">
                      Researches
                    </a>
                  </li>
                  <li>
                    <a onClick={() => setPage(4)} className="navbar-options">
                      Implementations
                    </a>
                  </li>
                  <li>
                    <a onClick={() => setPage(5)} className="navbar-options">
                      Test
                    </a>
                  </li>
                </ul>
            )}

          {role === "SUPER_ADMIN" && (
              <ul
                  tabIndex={0}
                  className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-second rounded-box w-52"
              >
                <li>
                  <a onClick={() => setPage(1)} className="navbar-options">
                    Documentation
                  </a>
                </li>
                <li>
                  <a onClick={() => setPage(2)} className="navbar-options">
                    Metrics
                  </a>
                </li>
                <li>
                  <a onClick={() => setPage(3)} className="navbar-options">
                    Researches
                  </a>
                </li>
                <li>
                  <a onClick={() => setPage(4)} className="navbar-options">
                    Implementations
                  </a>
                </li>
                <li>
                  <a onClick={() => setPage(5)} className="navbar-options">
                    Test
                  </a>
                </li>
                <li>
                  <a onClick={() => setPage(6)} className="navbar-options">
                    Users
                  </a>
                </li>
              </ul>
          )}
        </div>
        <div>
          <a
            onClick={() => setPage(1)}
            className="btn btn-ghost text-xl navbar-logo"
          >
            OO-Metrics
          </a>
        </div>
      </div>

      <div className="hidden xl:flex justify-center h-full col-span-3">
        {role === "USER" && (
          <ul className="flex h-full items-center gap-5">
            {displayListElement(1, "Documentation")}
            {displayListElement(5, "Test")}
          </ul>
        )}

        {role === "ADMIN" && (
            <ul className="flex h-full items-center gap-5">
                {displayListElement(1, "Documentation")}
                {displayListElement(2, "Metrics")}
                {displayListElement(3, "Researches")}
                {displayListElement(4, "Implementations")}
                {displayListElement(5, "Test")}
            </ul>
            )}

        {role === "SUPER_ADMIN" && (
            <ul className="flex h-full items-center gap-5">
                {displayListElement(1, "Documentation")}
                {displayListElement(2, "Metrics")}
                {displayListElement(3, "Researches")}
                {displayListElement(4, "Implementations")}
                {displayListElement(5, "Test")}
                {displayListElement(6, "Users")}
            </ul>
            )}
      </div>

      <div className="flex justify-end pr-5 xl:pr-10">
        <p className="hidden xl:flex navbar-options">{name}</p>

        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-8 h-8"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content z-[1] p-2 shadow bg-red-500 rounded-box w-34"
          >
            <li>
              <button onClick={logout} className="navbar-options">
                Logout
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
