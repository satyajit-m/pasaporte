import React, { Fragment, memo, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const Login = ({ setAuth }) => {
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });

  const { email, password } = inputs;

  const onChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const onSubmitForm = async (e) => {
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
        toast.success("LogIn Successful");
        setAuth(true);
      } else {
        toast.error(parseRes);
        setAuth(false);
      }
    } catch (err) {
      console.error(err.message);
    }
  };
  return (
    <Fragment>
      <p className="text-center text-2xl my-10">Login</p>
      <div className="md:flex justify-center mb-6">
        <form className="space-y-3" onSubmit={onSubmitForm}>
          <input
            className="block rounded-md bg-gray-100 h-10 sm:w-64 px-2 w-full"
            type="email"
            name="email"
            placeholder="Email"
            value={email}
            onChange={(e) => onChange(e)}
          />

          <input
            className="block rounded-md bg-gray-100 h-10 sm:w-64 px-2 w-full"
            type="password"
            name="password"
            placeholder="Password"
            value={password}
            onChange={(e) => onChange(e)}
          />

          <button className="block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full ">
            Login
          </button>
          <Link to="/register">Register</Link>
        </form>
      </div>
    </Fragment>
  );
};

export default memo(Login);
