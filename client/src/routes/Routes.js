import React, { Fragment, useState, useEffect } from "react";
import { useAuth, useRole, useUpdateAuth } from "../provider/AuthContext";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { Navbar, Dropdown } from "../components";

//components
import Dashboard from "../components/Dashboard";
import Login from "../components/Login";
import Register from "../components/Register";
import { Applicant, Police, Admin } from "../components";

export function Routes() {
  const isAuthenticated = useAuth();
  const setAuth = useUpdateAuth();
  const role = useRole();

  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const hideMenu = () => {
      if (window.innerWidth > 768 && isOpen) {
        setIsOpen(false);
        console.log("i resized");
      }
    };

    window.addEventListener("resize", hideMenu);

    return () => {
      window.removeEventListener("resize", hideMenu);
    };
  });

  // const [isLoggedIn, setLoggedIn] = checkLogin

  return role === "NONE" ? (
    <div></div>
  ) : (
    <Fragment>
      <Router>
        <Navbar toggle={toggle} />
        <Dropdown isOpen={isOpen} toggle={toggle} />
        <Switch>
          <Route
            exact
            path="/"
            render={(props) =>
              !isAuthenticated ? (
                <Login {...props} setAuth={setAuth} />
              ) : (
                <Dashboard {...props} setAuth={setAuth} />
              )
            }
          />
          <Route
            exact
            path="/login"
            render={(props) =>
              !isAuthenticated ? (
                <Login {...props} setAuth={setAuth} />
              ) : (
                <Redirect to="/dashboard" />
              )
            }
          />
          <Route
            exact
            path="/register"
            render={(props) =>
              !isAuthenticated ? (
                <Register {...props} setAuth={setAuth} />
              ) : (
                <Redirect to="/dashboard" />
              )
            }
          />
          <Route
            exact
            path="/dashboard"
            render={(props) =>
              isAuthenticated ? (
                <Dashboard {...props} setAuth={setAuth} />
              ) : (
                <Redirect to="/login" />
              )
            }
          />
          <Route
            exact
            path="/police"
            render={(props) =>
              isAuthenticated && role === "police" ? (
                <Police />
              ) : (
                <Redirect to="/login" />
              )
            }
          />
          <Route
            exact
            path="/applicant"
            render={(props) =>
              isAuthenticated && role === "applicant" ? (
                <Applicant />
              ) : (
                <Redirect to="/login" />
              )
            }
          />
          <Route
            exact
            path="/admin"
            render={(props) =>
              isAuthenticated && role === "admin" ? (
                <Admin />
              ) : (
                <Redirect to="/login" />
              )
            }
          />
        </Switch>
      </Router>
    </Fragment>
  );
}
