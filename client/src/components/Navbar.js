import React from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth, useRole, useUpdateAuth } from "../provider/AuthContext";

const Navbar = ({ toggle }) => {
  const isAuthenticated = useAuth();
  const role = useRole();
  const setAuth = useUpdateAuth();

  const logOut = (e) => {
    e.preventDefault();
    localStorage.removeItem("token");
    setAuth(false);
    toast.success("Logout Success");
  };

  return (
    <nav
      className="flex justify-between items-center h-16 bg-white text-black relative shadow-sm font-medium"
      role="navigation"
    >
      <Link to="/" className="pl-8">
        Pasaporte - Passport Automation System
      </Link>
      <div className="px-4 cursor-pointer md:hidden" onClick={toggle}>
        <svg
          className="w-8 h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </div>
      {!isAuthenticated ? (
        <div className="pr-8 md:block  hidden">
          <Link to="/register" className="p-4">
            Register
          </Link>
          <Link to="/login" className="p-4">
            Login
          </Link>
        </div>
      ) : (
        <div className="flex">
          <div className="flex justify-center"> Hello: {role}</div>
          <button
            className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded relative mr-8 ml-8"
            onClick={(e) => logOut(e)}
          >
            LogOut
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
