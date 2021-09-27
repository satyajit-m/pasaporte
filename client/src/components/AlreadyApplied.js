import React from "react";

const AlreadyApplied = ({ applied, verif, appl }) => {
  return (
    <div className="flex  justify-center">
      <div className="bg-white w-1/5 shadow-xl rounded-xl px-8 pt-6 pb-8 mb-4 my-4 mx-2 ">
        <p className="text-xl font-bold"> Application Has Been Submitted </p>
        <div>Application Id : {appl["appl_id"]}</div>
        <div>Full Name : {appl["fullname"]}</div>
        <div>DOB : {appl["dob"]}</div>
        <div>Mobile : {appl["mobilenumber"]}</div>
        <div>
          Address :{" "}
          {appl["address"] +
            ", " +
            appl["district"] +
            ", " +
            appl["state"] +
            ", " +
            appl["pincode"]}
        </div>
      </div>
      <div className="bg-white w-1/5 shadow-xl rounded-xl px-8 pt-6 pb-8 mb-4 my-4 mx-2 divide-y divide-gray-300">
        <p className=" text-xl font-bold">Status</p>
        <div className="flex mt-5 py-2">
          <div className="w-1/2">Police Verification</div>
          <div
            className={`px-4 shadow-sm rounded-md text-center bg-yellow-100 
              ${
                verif["police_ver"] === "pending"
                  ? "bg-yellow-200"
                  : verif["police_ver"] === "approved"
                  ? "bg-green-200"
                  : "bg-red-200"
              }`}
          >
            {verif["police_ver"]}
          </div>
        </div>
        <div className="flex mt-5 py-2">
          <div className="w-1/2">Admin Verification</div>
          <div
            className={`px-4 shadow-sm rounded-md text-center bg-yellow-100 
              ${
                verif["admin_ver"] === "pending"
                  ? "bg-yellow-200"
                  : verif["admin_ver"] === "approved"
                  ? "bg-green-200"
                  : "bg-red-200"
              }`}
          >
            {verif["admin_ver"]}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlreadyApplied;
