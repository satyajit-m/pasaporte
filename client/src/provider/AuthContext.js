import React, { useContext, useState, useEffect } from "react";
import jwt_decode from "jwt-decode";

const AuthContext = React.createContext();
const UpdateAuthContext = React.createContext();
const RoleContext = React.createContext();
const UpdateRoleContext = React.createContext();
const UserIdContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function useUpdateAuth() {
  return useContext(UpdateAuthContext);
}

export function useRole() {
  return useContext(RoleContext);
}

export function useUpdateRole() {
  return useContext(UpdateRoleContext);
}

export function useUserId() {
  return useContext(UserIdContext);
}
export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const setAuth = (bval) => {
    setIsAuthenticated(bval);
  };

  const setUserRole = (userRole) => {
    setRole(userRole);
  };

  const [role, setRole] = useState("NONE");
  const [userId, setUserId] = useState(null);

  async function isAuth() {
    try {
      const tkn = localStorage.token;
      // console.log(tkn);

      if (tkn == null) {
        console.log("Hello");
        setRole("");
      } else {
        const response = await fetch("http://localhost:5000/auth/is-verify", {
          method: "GET",
          headers: {
            token: tkn,
          },
        });

        const parseRes = await response.json();
        if (parseRes === true) {
          setIsAuthenticated(true);
          var decoded = jwt_decode(localStorage.token);
          setUserRole(decoded["type"]);
          setUserId(decoded["user"]);
        } else {
          localStorage.clear();
          setIsAuthenticated(false);
          setRole("NONE");
        }
      }
    } catch (err) {
      console.error(err.message);
    }
  }
  useEffect(() => {
    isAuth();
  }, [userId]);

  return (
    <AuthContext.Provider value={isAuthenticated}>
      <UpdateAuthContext.Provider value={setAuth}>
        <UpdateRoleContext.Provider value={setUserRole}>
          <RoleContext.Provider value={role}>
            <UserIdContext.Provider value={userId}>
              {children}
            </UserIdContext.Provider>
          </RoleContext.Provider>
        </UpdateRoleContext.Provider>
      </UpdateAuthContext.Provider>
    </AuthContext.Provider>
  );
}
