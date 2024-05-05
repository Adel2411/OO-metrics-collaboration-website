import { useState } from "react";

function Users() {
  const [users, setUser] = useState([
    "user1",
    "user2",
    "user3",
    "user4",
    "user5",
    "user6",
    "user7",
    "user8",
  ]);
  const [currentRole, setCurrentRole] = useState("3");

  const handleDelete = (e) => {
    e.preventDefault();
    const user = e.target.parentElement.children[0].innerText;
    setUser(users.filter((u) => u !== user));
  };

  return (
    <div className="h-full pt-16">
      <div className="fixed overflow-auto w-full flex flex-col items-center h-full">
        <h1 className="h-1/4 component-title pt-4 underline">Users</h1>
        <div className="h-3/4 w-full px-36 flex justify-center">
          <ul className="w-full flex flex-col items-center gap-5">
            {users.map((user) => (
              <li
                key={user}
                className="bg-second w-full h-20 rounded-box flex justify-between items-center px-10"
              >
                <p className="metrics-title">{user}</p>
                <div className="dropdown">
                  <div
                    tabIndex={0}
                    role="button"
                    className="btn btn-ghost bg-third hover:bg-fourth"
                  >
                    {currentRole === 1
                      ? "Moudir"
                      : currentRole === 2
                        ? "Joueur"
                        : "Bnadem"}
                  </div>
                  <ul
                    tabIndex={0}
                    className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-third rounded-box w-52"
                  >
                    <li>
                      <a onClick={() => setCurrentRole(1)}>Moudir</a>
                    </li>
                    <li>
                      <a onClick={() => setCurrentRole(2)}>Joueur</a>
                    </li>
                    <li>
                      <a onClick={() => setCurrentRole(3)}>Bnadem</a>
                    </li>
                  </ul>
                </div>
                <button onClick={handleDelete} className="btn btn-ghost">
                  Delete
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Users;
