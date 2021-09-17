import React, { Fragment, useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useRole } from "../provider/AuthContext";

const Dashboard = ({ setAuth }) => {
  const [name, setName] = useState("");
  const role = useRole();

  async function getName() {
    try {
      const response = await fetch("http://localhost:5000/dashboard", {
        method: "GET",
        headers: { token: localStorage.token },
      });

      const parseRes = await response.json();

      setName(parseRes.user_name);
    } catch (err) {
      console.error(err.message);
    }
  }

  const logOut = (e) => {
    e.preventDefault();
    localStorage.removeItem("token");
    setAuth(false);
    toast.success("Logout Success");
  };

  useEffect(() => {
    getName();
  }, []);
  return (
    <Fragment>
      <div>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={(e) => logOut(e)}
        >
          LogOut
        </button>
        {name}
        &nbsp; Role - {role}
      </div>
    </Fragment>
  );
};

export default Dashboard;
