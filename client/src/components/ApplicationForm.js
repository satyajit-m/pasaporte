import React, { useState } from "react";
import { toast } from "react-toastify";
import { useUserId } from "../provider/AuthContext";

function ApplicationForm() {
  const user_id = useUserId();
  const [inputs, setInputs] = useState({
    fullName: "",
    dob: "",
    gender: "",
    fatherName: "",
    motherName: "",
    address: "",
    district: "",
    state: "",
    pinCode: "",
    mobileNumber: "",
  });

  const {
    fullName,
    dob,
    gender,
    fatherName,
    motherName,
    address,
    district,
    state,
    pinCode,
    mobileNumber,
  } = inputs;

  const onChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const onSubmitForm = async (e) => {
    e.preventDefault();

    try {
      const body = {
        fullName,
        dob,
        gender,
        fatherName,
        motherName,
        address,
        district,
        state,
        pinCode,
        mobileNumber,
        user_id,
      };
      console.log(body);
      const response = await fetch("http://localhost:5000/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const parseRes = await response.json();

      if (parseRes) {
        console.log(parseRes);

        //setAuth(true);

        toast.success("Registered Successfully");

        setTimeout(() => {
          window.location.reload();
        }, 4000);
      } else {
        //setAuth(false);
        toast.error(parseRes);
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <>
      <form
        class="bg-gray-50 shadow-lg rounded-xl px-8 pt-6 pb-8 mb-4 flex flex-col my-4 mx-2"
        onSubmit={onSubmitForm}
      >
        <div class="-mx-3 md:flex mb-6">
          <div class="md:w-1/2 px-3 mb-6 md:mb-0">
            <label
              class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
              for="fullName"
            >
              Full Name
            </label>
            <input
              class="appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded py-3 px-4 mb-3"
              name="fullName"
              type="text"
              placeholder="Adam Doe"
              required
              value={fullName}
              onChange={(e) => onChange(e)}
            />
          </div>
          <div class="md:w-1/2 px-3 mb-6 md:mb-0">
            <label
              class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
              for="dob"
            >
              Date Of Birth
            </label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg
                  class="w-5 h-5 text-gray-500"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
              </div>
              <input
                datepicker
                type="text"
                name="dob"
                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5"
                placeholder="Select date"
                required
                value={dob}
                onChange={(e) => onChange(e)}
              />
            </div>
          </div>
          <div class="md:w-1/2 px-3">
            <span class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2">
              Gender
            </span>
            <div class="mt-2">
              <label class="inline-flex items-center">
                <input
                  type="radio"
                  class="form-radio"
                  name="gender"
                  value="M"
                  required
                  onChange={(e) => onChange(e)}
                />
                <span class="ml-2">Male</span>
              </label>
              <label class="inline-flex items-center ml-6">
                <input
                  type="radio"
                  class="form-radio"
                  name="gender"
                  value="F"
                  onChange={(e) => onChange(e)}
                />
                <span class="ml-2">Female</span>
              </label>
            </div>
          </div>
        </div>
        <div class="-mx-3 md:flex mb-6">
          <div class="md:w-full px-3">
            <label
              class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
              for="grid-password"
            >
              Father's Name
            </label>
            <input
              class="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4 mb-3"
              name="fatherName"
              type="text"
              placeholder="John Doe"
              required
              value={fatherName}
              onChange={(e) => onChange(e)}
            />
          </div>

          <div class="md:w-full px-3">
            <label
              class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
              for="motherName"
            >
              Mother's Name
            </label>
            <input
              class="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4 mb-3"
              name="motherName"
              type="text"
              placeholder="Jane Doe"
              required
              value={motherName}
              onChange={(e) => onChange(e)}
            />
          </div>
          <div class="md:w-full px-3">
            <label
              class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
              for="mobileNumber"
            >
              Mobile number
            </label>
            <input
              class="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4 mb-3"
              name="mobileNumber"
              maxLength="10"
              minLength="10"
              type="number"
              placeholder="10 digit mobile number"
              required
              value={mobileNumber}
              onChange={(e) => onChange(e)}
            />
          </div>
        </div>
        <div className="-mx-3 md:flex mb-2">
          <div class="md:w-full px-3">
            <label
              class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
              for="address"
            >
              Address
            </label>
            <input
              class="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4 mb-3"
              name="address"
              type="text"
              required
              placeholder="1234 MG Road"
              required
              value={address}
              onChange={(e) => onChange(e)}
            />
          </div>
        </div>
        <div class="-mx-3 md:flex mb-2">
          <div class="md:w-1/2 px-3 mb-6 md:mb-0">
            <label
              class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
              for="district"
            >
              District
            </label>
            <input
              class="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4"
              name="district"
              type="text"
              placeholder="Khurda"
              required
              value={district}
              onChange={(e) => onChange(e)}
            />
          </div>
          <div class="md:w-1/2 px-3">
            <label
              class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
              for="state"
            >
              State
            </label>
            <div class="relative">
              <select
                class="block appearance-none w-full bg-grey-lighter border border-grey-lighter text-grey-darker py-3 px-4 pr-8 rounded"
                name="state"
                required
                value={state}
                onChange={(e) => onChange(e)}
              >
                <option>Andhra Pradesh</option>
                <option>Karnataka</option>
                <option>Kerala</option>
                <option>Odisha</option>
                <option>Tamil Nadu</option>
              </select>
              <div class="pointer-events-none absolute pin-y pin-r flex items-center px-2 text-grey-darker">
                <svg
                  class="h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </div>
            </div>
          </div>
          <div class="md:w-1/2 px-3">
            <label
              class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
              for="pinCode"
            >
              Pincode
            </label>
            <input
              class="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4"
              name="pinCode"
              type="text"
              required
              placeholder="560001"
              value={pinCode}
              onChange={(e) => onChange(e)}
            />
          </div>
        </div>
        <div className="flex justify-center mt-5">
          <button
            type="submit"
            className="w-1/6 px-3 py-4 text-white bg-indigo-500 rounded-md hover:bg-indigo-600 focus:outline-none duration-100 ease-in-out "
          >
            Apply
          </button>
        </div>
      </form>
    </>
  );
}

export default ApplicationForm;
