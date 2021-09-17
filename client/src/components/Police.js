import React, { useState, useEffect } from "react";
import PassortApi from "../apis/PassortApi";

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
                    <th className="px-6 py-2 text-xs text-gray-500">Status</th>
                    <th className="px-6 py-2 text-xs text-gray-500">Delete</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-300">
                  {records &&
                    records.map((records) => {
                      return (
                        <tr className="whitespace-nowrap" key={records.id}>
                          <td className="px-6 py-4 text-sm text-gray-500">1</td>
                          <td className="px-6 py-4">
                            <div className="text-sm text-gray-900">
                              {records.name}
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
                          <td className="px-6 py-4">
                            <a
                              href="#"
                              className={"px-4 py-1 text-sm " + (!records.police_ver? "text-green-500 bg-green-100 rounded-full" : "text-red-500 bg-red-100 rounded-full")}
                            >
                              {records.police_ver ? <>Verified</> : <>Pending </>}
                            </a>
                          </td>
                          <td className="px-6 py-4">
                            <a
                              href="#"
                              className="px-4 py-1 text-sm text-red-400 bg-red-200 rounded-full"
                            >
                              Delete
                            </a>
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
