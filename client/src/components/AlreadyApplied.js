import React from "react";

const AlreadyApplied = ({ verifStatus }) => {
  return (
    <div className="flex  justify-center">
      <div className="bg-white w-1/5 shadow-xl rounded-xl px-8 pt-6 pb-8 mb-4 my-4 mx-2 text-xl font-bold">
        Application Has Been Submitted
      </div>
      <div className="bg-white w-1/5 shadow-xl rounded-xl px-8 pt-6 pb-8 mb-4 my-4 mx-2 divide-y divide-gray-300">
        <p className=" text-xl font-bold">Status</p>
        <div className="flex mt-5 py-2">
          <div className="w-1/2">Police Verification</div>
          <div
            className={`px-4 shadow-sm rounded-md text-center bg-yellow-100 
              ${
                verifStatus["policeVer"] === "pending"
                  ? "bg-yellow-200"
                  : verifStatus["policeVer"] === "accepted"
                  ? "bg-green-200"
                  : "bg-red-200"
              }`}
          >
            {verifStatus["policeVer"]}
          </div>
        </div>
        <div className="flex mt-5 py-2">
          <div className="w-1/2">Admin Verification</div>
          <div
            className={`px-4 shadow-sm rounded-md text-center bg-yellow-100 
              ${
                verifStatus["adminVer"] === "pending"
                  ? "bg-yellow-200"
                  : verifStatus["adminVer"] === "accepted"
                  ? "bg-green-200"
                  : "bg-red-200"
              }`}
          >
            {verifStatus["adminVer"]}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlreadyApplied;
