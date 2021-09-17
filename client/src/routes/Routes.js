import React, { Fragment } from "react";
import { useAuth, useRole, useUpdateAuth } from "../provider/AuthContext";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

//components
import Dashboard from "../components/Dashboard";
import Login from "../components/Login";
import Register from "../components/Register";
import { Applicant, Police, Admin } from "../components";

export function Routes() {
  const isAuthenticated = useAuth();
  const setAuth = useUpdateAuth();
  const role = useRole();

  // const [isLoggedIn, setLoggedIn] = checkLogin

  return role === "NONE" ? (
    <div></div>
  ) : (
    <Fragment>
      <Router>
        <div className="">
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
        </div>
      </Router>
    </Fragment>
  );
}
