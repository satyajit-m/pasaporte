import React, { Fragment, memo, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const Register = ({ setAuth }) => {
  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { name, email, password } = inputs;
  const type = "applicant";

  const onChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const onSubmitForm = async (e) => {
    e.preventDefault();

    try {
      const body = { name, email, password, type };
      const response = await fetch("http://localhost:5000/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const parseRes = await response.json();

      if (parseRes.token) {
        localStorage.setItem("token", parseRes.token);

        setAuth(true);

        toast.success("Registered Successfully");
      } else {
        setAuth(false);
        toast.error(parseRes);
      }
    } catch (err) {
      console.error(err.message);
    }
  };
  return (
    <Fragment>
      <p className="text-center text-2xl my-10">Register</p>
      <div className="md:flex md:justify-center mb-6">
        <form className="space-y-3" onSubmit={onSubmitForm}>
          <input
            className="block rounded-md bg-gray-100 h-10 w-64 px-2"
            type="text"
            name="name"
            placeholder="Name"
            value={name}
            onChange={(e) => onChange(e)}
          />
          <input
            className="block rounded-md bg-gray-100 h-10 w-64 px-2"
            type="email"
            name="email"
            placeholder="Email"
            value={email}
            onChange={(e) => onChange(e)}
          />

          <input
            className="block rounded-md bg-gray-100 h-10 w-64 px-2"
            type="password"
            name="password"
            placeholder="Password"
            value={password}
            onChange={(e) => onChange(e)}
          />

          <button className="block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full ">
            Register
          </button>
          <Link to="/login">Login</Link>
        </form>
      </div>
    </Fragment>
  );
};

export default memo(Register);
