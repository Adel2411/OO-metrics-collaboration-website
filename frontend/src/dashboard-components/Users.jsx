import React, {useEffect, useState} from "react";
import url from "../url.json";
import {toast} from "react-toastify";

function Users() {
  const [users, setUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [inputs, setInputs] = React.useState({
    username: "",
    email: "",
    password: "",
  });
  let { username, email, password } = inputs;

  useEffect(() => {
    const token = localStorage.getItem("token");
    fetch(`${url.current}/manager/get/admins`, {
method: "GET",
      headers: {
          'Authorization': `Bearer ${token}`
      }
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setUsers(data);
      });
  }, []);

  const handleInputChange = (e) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });
  }

  const handleAddAdmin = () => {
    try {
      const token = localStorage.getItem("token");
      fetch(`${url.current}/manager/add/admin`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(inputs)
      })
          .then((response) => {
            if (!response.ok) {
              toast.error("Failed to add admin");
                throw new Error("Failed to add admin");
            }
            return response.json();
          })
          .then((data) => {
            toast.success(data.message);
          });
      username = "";
        email = "";
        password = "";
      setShowModal(false);
    } catch (err) {
      console.error(err.message);
    }
  }

  const handleDelete = (id) => {
    try {
      const token = localStorage.getItem("token");
      fetch(`${url.current}/manager/delete/admin/${id}`, {
        method: "DELETE",
        headers: {
          'Authorization': `Bearer ${token}`,
        }
      })
          .then((response) => {
            if (!response.ok) {
              toast.error("Failed to delete admin");
              throw new Error("Failed to delete admin");
            }
            return response.json();
          })
          .then((data) => {
            toast.success("Admin deleted successfully");
          });
      setUsers(users.filter((user) => user.id !== id));

      }catch (err) {
      console.error(err.message);
    }
  };

  return (
    <div className="h-full pt-16">
      <div className="overflow-auto w-full flex flex-col items-center h-full">
        <h1 className="component-title pt-4 underline">Users</h1>
        <div className="py-32 w-full h-fit px-3 lg:px-36 flex flex-col items-center gap-10">
          <ul className="w-full flex flex-col items-center gap-3">
            {users.map((user) => (
              <li
                key={user.id}
                className="bg-second w-full h-20 rounded-box flex justify-between items-center px-10 lg:px-16"
              >
                <p className="metrics-title">{user.username}</p>
                <button
                  onClick={() => handleDelete(user.id)}
                  className="btn btn-ghost bg-red-500 text-xs lg:text-sm"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
          <div className="flex justify-center pb-10 w-full">
            <button
                className="btn btn-success flex flex-row text-white w-1/3 sm:w-1/4 h-10 sm:h-16"
                onClick={() => setShowModal(true)}
            >
              <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-6 h-6"
              >
                <path
                    fillRule="evenodd"
                    d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 9a.75.75 0 0 0-1.5 0v2.25H9a.75.75 0 0 0 0 1.5h2.25V15a.75.75 0 0 0 1.5 0v-2.25H15a.75.75 0 0 0 0-1.5h-2.25V9Z"
                    clipRule="evenodd"
                />
              </svg>
              <span className="metrics-add-button">Add</span>
            </button>
          </div>
        </div>
      </div>

      {showModal ? (
          <>
            <div className="text-black justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
              <div className="relative w-auto my-6 mx-auto max-w-sm">
                <div className="border-0 rounded-lg shadow-md shadow-black relative flex flex-col bg-first text-white outline-none focus:outline-none">
                  <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                    <h3 className="text-3xl modal-title">Add Admin</h3>
                    <button
                        className="p-1 ml-auto text-red-600 border-0 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                        onClick={() => setShowModal(false)}
                    >
                    <span className=" h-6 w-6 text-2xl block outline-none focus:outline-none">
                      <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="w-6 h-6"
                      >
                        <path
                            fillRule="evenodd"
                            d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-1.72 6.97a.75.75 0 1 0-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 1 0 1.06 1.06L12 13.06l1.72 1.72a.75.75 0 1 0 1.06-1.06L13.06 12l1.72-1.72a.75.75 0 1 0-1.06-1.06L12 10.94l-1.72-1.72Z"
                            clipRule="evenodd"
                        />
                      </svg>
                    </span>
                    </button>
                  </div>
                  <div className="relative p-6 flex-auto">
                    <form>
                      <label
                          htmlFor="name"
                          className="label label-text modal-subtitle"
                      >
                        Admin username :
                      </label>
                      <input
                          type="text"
                          name="username"
                          placeholder="Admin username..."
                          value={username}
                          onChange={handleInputChange}
                          className="modal-input input input-bordered w-full my-2 bg-second"
                      />
                      <label
                          htmlFor="email"
                          className="label label-text modal-subtitle"
                      >
                        Admin email :
                      </label>
                      <input
                          type="text"
                          name="email"
                          placeholder="Admin email..."
                          value={email}
                          onChange={handleInputChange}
                          className="modal-input input input-bordered w-full my-2 bg-second"
                      />

                      <label
                          htmlFor="password"
                          className="label label-text modal-subtitle"
                      >
                        Admin email :
                      </label>
                      <input
                          type="text"
                          name="password"
                          placeholder="Admin password..."
                          value={password}
                          onChange={handleInputChange}
                          className="modal-input input input-bordered w-full my-2 bg-second"
                      />
                    </form>
                  </div>
                  <div
                      className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                    <button
                        className="modal-button bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        type="button"
                        onClick={handleAddAdmin}
                    >
                      Add
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
          </>
      ) : null}
    </div>
  );
}

export default Users;
