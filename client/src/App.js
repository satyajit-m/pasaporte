import React from "react";
import "tailwindcss/tailwind.css";

import {  toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { AuthProvider } from "./provider/AuthContext";

import { Routes } from "./routes/Routes";

toast.configure();

function App() {
  return (
    <AuthProvider>
      <Routes />
    </AuthProvider>
  );
}

export default App;
