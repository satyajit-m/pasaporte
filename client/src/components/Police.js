import React, { useState, useEffect } from "react";
import PassortApi from "../apis/PassortApi";
import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/solid";

export default function Police() {
  const [records, setRecords] = useState(null);

  async function getVerified() {
    try {
      const response = await PassortApi.get("/police/unverified");
      console.log(response.data.data.verifiedRecords);
      setRecords(response.data.data.verifiedRecords);
    } catch (err) {
      console.error(err.message);
    }
  }

  useEffect(() => {
    getVerified();
  }, []);

  const handleApprove = async (e, id) => {
    e.stopPropagation();
    console.log(id+ " Approve");
    try {
      const body = { id };
        const response = await fetch("http://localhost:5000/police/approve", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });
    } catch (err) {
      console.log(err);
    }
  };
  const handleReject = async (e, id) => {
    e.stopPropagation();
    console.log(id+" Reject");
    // try {
    //   const response = await RestaurantFinder.delete(`/${id}`);
    //   setRestaurants(
    //     restaurants.filter((restaurant) => {
    //       return restaurant.id !== id;
    //     })
    //   );
    // } catch (err) {
    //   console.log(err);
    // }
  };
  return (
    <div className="flex justify-center py-4 my-20">
      <div className="container flex justify-center mx-auto">
        <div className="flex flex-col">
          <div className="w-full">
            <div className="border-b border-gray-200 shadow">
              <table className="divide-y divide-gray-300 ">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-2 text-xs text-gray-500">
                      Application ID
                    </th>
                    <th className="px-6 py-2 text-xs text-gray-500">Name</th>
                    <th className="px-6 py-2 text-xs text-gray-500">DOB</th>
                    <th className="px-6 py-2 text-xs text-gray-500">Gender</th>
                    <th className="px-6 py-2 text-xs text-gray-500">Address</th>
                    <th className="px-6 py-2 text-xs text-gray-500">Status</th>
                    <th className="px-6 py-2 text-xs text-gray-500">Approve</th>
                    <th className="px-6 py-2 text-xs text-gray-500">Deny</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-300">
                  {records &&
                    records.map((records) => {
                      return (
                        <tr className="whitespace-nowrap" key={records.id}>
                          <td className="px-6 py-4 text-sm text-gray-500">
                            {records.appl_id}
                          </td>
                          <td className="px-6 py-4">
                            <div className="text-sm text-gray-900">
                              {records.fullname}
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="text-sm text-gray-500">
                              {records.dob}
                            </div>
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-500">
                            {records.gender}
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-500">
                            {records.address}
                          </td>
                          <td className="px-6 py-4">
                            <a
                              href="#"
                              className="px-4 py-1 text-sm text-yellow-500 bg-yellow-100 rounded-lg "
                            >
                              {records.police_ver}
                            </a>
                          </td>
                          <td className="px-6 py-4">
                            <button
                              onClick={(e) => handleApprove(e, records.appl_id)}
                              className="btn btn-danger"
                            >
                              <CheckCircleIcon className="text-green-300 h-8 w-8" />
                            </button>
                          </td>
                          <td className="px-6 py-4">
                            <button
                              onClick={(e) => handleReject(e, records.appl_id)}
                              className="btn btn-danger"
                            >
                              <XCircleIcon className="text-red-400 h-8 w-8" />
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
