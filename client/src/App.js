import React, { Fragment, useState, useEffect } from "react";
import "tailwindcss/tailwind.css";


import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { AuthProvider } from "./provider/AuthContext";

import {Routes} from "./routes/Routes"

toast.configure();

function App() {
  return (
    <AuthProvider>
      <Routes />
    </AuthProvider>
  );
}

export default App;
