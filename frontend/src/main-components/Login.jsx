import { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import url from "../url.json";

const Login = ({ setAuth }) => {
  const [inputs, setInputs] = useState({
    username: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const { username, password } = inputs;
  const handleChange = (e) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const body = { username, password };

      const response = await fetch(`${url.current}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const jsonResponse = await response.json();

      if (jsonResponse.status === 200) {
        localStorage.setItem("token", jsonResponse.response);
        setAuth(true);
        toast.success("Login successfully");
      } else {
        setAuth(false);
        toast.error(jsonResponse.response);
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <Fragment>
      <div className="flex items-center justify-center h-screen">
        <div className="fixed flex justify-center sm:flex-none overflow-auto w-screen h-screen bg-first lg:shadow-2xl lg:w-1/2 lg:h-auto xl:w-1/3 lg:rounded-box">
          <div className="sm:mt-20 w-full flex flex-col justify-center items-center gap-5 md:mt-0 px-5 py-10">
            <h1 className="title">Log in</h1>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="50"
              height="50"
              fill="currentColor"
              className="bi bi-person-circle"
              viewBox="0 0 16 16"
            >
              <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
              <path
                fillRule="evenodd"
                d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"
              />
            </svg>
            <form onSubmit={handleSubmit} className="w-full">
              <div className="flex flex-col gap-3">
                <input
                  type="text"
                  name="username"
                  placeholder="username"
                  className="input input-bordered w-full bg-second"
                  value={username}
                  onChange={handleChange}
                />
                <div className="input input-bordered w-full bg-second flex justify-between items-center">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="password"
                    value={password}
                    onChange={handleChange}
                  />
                  <span
                    className="text-xs text-gray-500 btn btn-ghost btn-circle"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="size-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88"
                        />
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="size-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                        />
                      </svg>
                    )}
                  </span>
                </div>
              </div>
              <div className="flex items-center justify-center my-6">
                <button className="btn border-none bg-fourth text-white hover:bg-third">
                  Sign in
                </button>
              </div>
              <div className="flex flex-col">
                <div className="flex flex-row gap-5">
                  <p>Don't have an account ?</p>
                  <Link className="link link-info" to="/register">
                    Register
                  </Link>
                </div>
                <div className="flex flex-row gap-3">
                  <p>Forget Password ?</p>
                  <Link className="link link-info" to="/reset-password">
                    Reset
                  </Link>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Login;
