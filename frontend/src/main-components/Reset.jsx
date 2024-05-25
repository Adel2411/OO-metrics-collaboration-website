import { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import url from "../url.json";

function Reset() {
  const [inputs, setInputs] = useState({
    email: "",
  });
  const [emailSent, setEmailSent] = useState(false);

  const { email } = inputs;
  const handleChange = (e) => {
    setInputs({
      email: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    // e.preventDefault();
    // try {
    //   const body = { email };
    //
    //   const response = await fetch(`${url.current}/auth/login`, {
    //     method: "POST",
    //     headers: { "Content-Type": "application/json" },
    //     body: JSON.stringify(body),
    //   });
    //
    //   const jsonResponse = await response.json();
    //
    //   if (jsonResponse.status === 200) {
    //     localStorage.setItem("token", jsonResponse.response);
    //     setAuth(true);
    //     toast.success("Login successfully");
    //   } else {
    //     setAuth(false);
    //     toast.error(jsonResponse.response);
    //   }
    // } catch (err) {
    //   console.error(err.message);
    // }
  };

  return (
    <Fragment>
      <div className="flex items-center justify-center h-screen">
        <div className="fixed flex justify-center sm:flex-none overflow-auto w-screen h-screen bg-first lg:shadow-2xl lg:w-1/2 lg:h-auto xl:w-1/3 lg:rounded-box">
          {emailSent ? (
            <div className="sm:mt-20 w-full flex flex-col justify-center items-center gap-10 md:mt-0 px-5 py-10">
              <div className="w-full flex flex-col items-center gap-3">
                <h1 className="documentation-right-title">
                  Email Sent Succesfully !
                </h1>
                <h1>{email}</h1>
              </div>
              <div className="w-full flex flex-col items-center">
                <div className="flex flex-row gap-3">
                  <p>Wrong email ?</p>
                  <Link
                    className="link link-info"
                    onClick={() => setEmailSent(false)}
                  >
                    change email
                  </Link>
                </div>
                <div className="flex flex-row gap-3">
                  <p>Don't receive email ?</p>
                  <Link className="link link-info">Resend</Link>
                </div>
              </div>
            </div>
          ) : (
            <div className="sm:mt-20 w-full flex flex-col justify-center items-center gap-5 md:mt-0 px-5 py-10">
              <h1 className="component-title">Password Reset</h1>
              <form onSubmit={handleSubmit}>
                <input
                  type="email"
                  name="email"
                  placeholder="email"
                  className="input input-bordered w-full my-2 bg-second"
                  value={email}
                  onChange={handleChange}
                />
                <div className="flex items-center justify-center my-5">
                  <button
                    className="btn border-none bg-fourth text-white hover:bg-third"
                    onClick={() => setEmailSent(true)}
                  >
                    Send Email
                  </button>
                </div>
                <div className="my-5 flex flex-row gap-3">
                  <p>Remember the password ?</p>
                  <Link className="link link-info" to="/login">
                    Login
                  </Link>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </Fragment>
  );
}

export default Reset;
