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
    "user9",
    "user10",
    "user11",
    "user12",
    "user13",
    "user14",
    "user15",
    "user16",
    "user17",
    "user18",
    "user19",
    "user20",
  ]);

  const [roles, setRoles] = useState({}); // New state for roles

  const handleDelete = (e) => {
    e.preventDefault();
    const user = e.target.parentElement.children[0].innerText;
    setUser(users.filter((u) => u !== user));

    // Remove the user's role when the user is deleted
    setRoles((prevRoles) => {
      const newRoles = { ...prevRoles };
      delete newRoles[user];
      return newRoles;
    });
  };

  const handleRoleChange = (user, role) => {
    setRoles((prevRoles) => ({ ...prevRoles, [user]: role }));
  };

  return (
    <div className="h-full pt-16">
      <div className="overflow-auto w-full flex flex-col items-center h-full">
        <h1 className="component-title pt-4 underline">Users</h1>
        <div className="py-32 w-full h-fit px-3 lg:px-36 flex justify-center">
          <ul className="w-full flex flex-col items-center gap-3">
            {users.map((user) => (
              <li
                key={user}
                className="bg-second w-full h-20 rounded-box flex justify-between items-center px-3 lg:px-10"
              >
                <p className="metrics-title">{user}</p>
                <div className="flex justify-center items-center">
                  <p className="hidden lg:block">role: </p>
                  <details className="dropdown">
                    <summary className="m-1 btn btn-ghost bg-first text-xs lg:text-sm w-32">
                      {roles[user] === 1
                        ? "Moudir"
                        : roles[user] === 2
                          ? "Joueur"
                          : "Bnadem"}
                    </summary>
                    <ul className="p-2 shadow menu dropdown-content z-[1] bg-fourth rounded-box w-32 lg:w-52">
                      <li
                        className={
                          roles[user] === 1
                            ? "flex items-center rounded-box bg-second btn btn-ghost hover:bg-second"
                            : "flex items-center rounded-box btn btn-ghost"
                        }
                        onClick={() => handleRoleChange(user, 1)}
                      >
                        Moudir
                      </li>
                      <li
                        className={
                          roles[user] === 2
                            ? "flex items-center rounded-box bg-second btn btn-ghost hover:bg-second"
                            : "flex items-center rounded-box btn btn-ghost"
                        }
                        onClick={() => handleRoleChange(user, 2)}
                      >
                        Joueur
                      </li>
                      <li
                        className={
                          roles[user] === 3
                            ? "flex items-center rounded-box bg-second btn btn-ghost hover:bg-second"
                            : "flex items-center rounded-box btn btn-ghost"
                        }
                        onClick={() => handleRoleChange(user, 3)}
                      >
                        Bnadem
                      </li>
                    </ul>
                  </details>
                </div>
                <button
                  onClick={handleDelete}
                  className="btn btn-ghost bg-red-500 text-xs lg:text-sm"
                >
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
