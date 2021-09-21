import React from "react";
import { Link } from "react-router-dom";

const Dropdown = ({ isOpen, toggle }) => {
  return (
    <div
      className={
        isOpen
          ? "grid grid-rows-4 text-center items-center bg-gray-200"
          : "hidden"
      }
      onClick={toggle}
    >
      <Link to="/register" className="p-4">
        Register
      </Link>
      <Link to="/login" className="p-4">
        Login
      </Link>
    </div>
  );
};

export default Dropdown;
