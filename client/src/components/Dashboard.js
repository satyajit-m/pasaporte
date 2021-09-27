import React, { Fragment, useState, useEffect } from "react";
import { useRole, useUpdateRole } from "../provider/AuthContext";
import { Applicant, Police, Admin } from "../components";

const Dashboard = ({ setAuth }) => {
  const [name, setName] = useState("");
  const role = useRole();
  const updateRole = useUpdateRole();

  async function getName() {
    try {
      const response = await fetch("http://localhost:5000/dashboard", {
        method: "GET",
        headers: { token: localStorage.token },
      });

      const parseRes = await response.json();
      console.log(parseRes.user_name);
      setName(parseRes.user_name);
      updateRole(parseRes.user_type);
    } catch (err) {
      console.error(err.message);
    }
  }

  useEffect(() => {
    getName();
  }, []);
  return (
    <Fragment>
      {role === "police" ? (
        <Police />
      ) : role === "applicant" ? (
        <Applicant />
      ) : (
        <Admin />
      )}
      {/* <div>
        {name}
        &nbsp; Role - {role}
      </div> */}
    </Fragment>
  );
};

export default Dashboard;
