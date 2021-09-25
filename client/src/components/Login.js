import React, { Fragment, memo, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const Login = ({ setAuth }) => {
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });

  const { email, password } = inputs;
  const [loading, setLoading] = useState(false);

  const onChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const onSubmitForm = async (e) => {
    setLoading(true);
    e.preventDefault();

    try {
      const body = { email, password };
      const response = await fetch("http://localhost:5000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const parseRes = await response.json();

      if (parseRes.token) {
        localStorage.setItem("token", parseRes.token);
        toast.success(`Welcome ${email}`);
        setAuth(true);
      } else {
        toast.error(parseRes);
        setAuth(false);
      }
    } catch (err) {
      console.error(err.message);
    }
    setLoading(false);
  };
  return (
    <Fragment>
      <div className="flex justify-center bg-gray-100 min-h-screen ">
        <div className="container sm:mt-20 mt-12 my-auto max-w-md border-2 border-gray-200 p-3 bg-white rounded-lg shadow-md">
          <div className="text-center my-6">
            <h1 className="text-3xl font-semibold text-gray-700">Sign in</h1>
            <p className="text-gray-500">Sign in to access your account</p>
          </div>
          <div className="m-6">
            <form className="mb-4" onSubmit={onSubmitForm}>
              <div className="mb-6">
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm text-gray-600 dark:text-gray-400"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Your email address"
                  className="w-full px-3 py-2 rounded-md bg-gray-100"
                  value={email}
                  onChange={(e) => onChange(e)}
                />
              </div>
              <div className="mb-6">
                <div className="flex justify-between mb-2">
                  <label
                    htmlFor="password"
                    className="text-sm text-gray-600 dark:text-gray-400"
                  >
                    Password
                  </label>
                </div>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Your password"
                  className="w-full px-3 py-2 rounded-md bg-gray-100"
                  value={password}
                  onChange={(e) => onChange(e)}
                />
              </div>
              <div className="mb-6">
                <button
                  type="submit"
                  className={
                    "w-full px-3 py-4 text-white bg-indigo-500 rounded-md hover:bg-indigo-600 focus:outline-none duration-100 ease-in-out " +
                    (loading ? "cursor-not-allowed" : "")
                  }
                  disabled={loading}
                >
                  {loading == false ? (
                    "Sign In"
                  ) : (
                    <div className="flex justify-center">
                      <svg
                        class="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          stroke-width="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Processing
                    </div>
                  )}
                </button>
              </div>
              <p className="text-sm text-center text-gray-400">
                Don&#x27;t have an account yet?
                <Link to="/register" className="underline text-indigo-400">
                  Register
                </Link>
                .
              </p>
            </form>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default memo(Login);
