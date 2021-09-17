import React, { Fragment, memo, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useUser } from "../provider/AuthContext";

function Applicant() {
  const userId = useUser();

  const [newApply, setNewApply ] = useState(false);
  const [loading, setLoading] = useState(true);
  const [inputs, setInputs] = useState({
    name: "",
    dob: "",
    gender: "",
    fname: "",
    mname: "",
    address: "",
    dist: "",
    state: "",
    pin: "000000",
    mobile: "",
  });

  const {
    name,
    dob,
    gender,
    fname,
    mname,
    address,
    dist,
    state,
    pin,
    mobile,
  } = inputs;
  const type = "applicant";
  const user_id = 0;

  const onChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const onSubmitForm = async (e) => {
    e.preventDefault();

    try {
      const body = {
        name,
        dob,
        gender,
        fname,
        mname,
        address,
        dist,
        state,
        pin,
        mobile,
        user_id,
      };
      const response = await fetch("http://localhost:5000/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const parseRes = await response.json();

      if (parseRes.token) {
        localStorage.setItem("token", parseRes.token);

        //setAuth(true);

        toast.success("Registered Successfully");
      } else {
        //setAuth(false);
        toast.error(parseRes);
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  async function isApplied() {
    try {
      if (userId != null) {
      const body = { userId };
      const response = await fetch("http://localhost:5000/apply/check", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const parseRes = await response.json();
      setLoading(false)
      console.log(parseRes)
      if(parseRes["applied"]){
        setNewApply(false)
      }
      else{
        setNewApply(true)
      }
      
      }
    } catch (err) {
      console.error(err.message);
    }
  }
  useEffect(() => {
    isApplied();
  }, [userId]);
  return (
    loading ? <div>Loading</div> : !newApply ? <div>Already Applied</div>:
    <Fragment>
      <p className="text-center text-2xl my-10">New Application</p>
      <div className="md:flex md:justify-center mb-4">
        <form className="space-y-3" onSubmit={onSubmitForm}>
          <input
            className="block rounded-md bg-gray-100 h-10 w-64 px-2"
            type="text"
            name="name"
            placeholder="Full Name"
            value={name}
            onChange={(e) => onChange(e)}
          />
          <input
            className="block rounded-md bg-gray-100 h-10 w-64 px-2"
            type="text"
            name="dob"
            placeholder="Date Of Birth"
            value={dob}
            onChange={(e) => onChange(e)}
          />
          <input
            className="block rounded-md bg-gray-100 h-10 w-64 px-2"
            type="text"
            name="gender"
            placeholder="Gender"
            value={gender}
            onChange={(e) => onChange(e)}
          />
          <input
            className="block rounded-md bg-gray-100 h-10 w-64 px-2"
            type="text"
            name="fname"
            placeholder="Father Name"
            value={fname}
            onChange={(e) => onChange(e)}
          />
          <input
            className="block rounded-md bg-gray-100 h-10 w-64 px-2"
            type="text"
            name="mname"
            placeholder="Mother Name"
            value={mname}
            onChange={(e) => onChange(e)}
          />
          <input
            className="block rounded-md bg-gray-100 h-10 w-64 px-2"
            type="text"
            name="address"
            placeholder="Address"
            value={address}
            onChange={(e) => onChange(e)}
          />
          <input
            className="block rounded-md bg-gray-100 h-10 w-64 px-2"
            type="text"
            name="dist"
            placeholder="District"
            value={dist}
            onChange={(e) => onChange(e)}
          />
          <input
            className="block rounded-md bg-gray-100 h-10 w-64 px-2"
            type="text"
            name="state"
            placeholder="State"
            value={state}
            onChange={(e) => onChange(e)}
          />

          <input
            className="block rounded-md bg-gray-100 h-10 w-64 px-2"
            type="number"
            name="pin"
            placeholder="Pincode"
            value={pin}
            onChange={(e) => onChange(e)}
          />
          <input
            className="block rounded-md bg-gray-100 h-10 w-64 px-2"
            type="text"
            name="mobile"
            placeholder="Mobile"
            value={mobile}
            onChange={(e) => onChange(e)}
          />
          <button className="block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full ">
            Apply
          </button>
        </form>
      </div>
    </Fragment>
  );
}

export default Applicant;
