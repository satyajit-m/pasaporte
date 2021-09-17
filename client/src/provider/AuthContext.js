import React, { useContext, useState, useEffect } from "react";
import jwt_decode from "jwt-decode";

const AuthContext = React.createContext();
const UpdateAuthContext = React.createContext();
const RoleContext = React.createContext();
const UserContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function useUpdateAuth() {
  return useContext(UpdateAuthContext);
}

export function useRole() {
  return useContext(RoleContext);
}

export function useUser() {
  return useContext(UserContext);
}
export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const setAuth = (bval) => {
    setIsAuthenticated(bval);
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
        console.log(parseRes)
        if (parseRes === true) {
          setIsAuthenticated(true);
          var decoded = jwt_decode(localStorage.token);
          setRole(decoded["type"]);
          setUserId(decoded["user"]);
        } else {
          localStorage.clear();
          setIsAuthenticated(false);
          setRole("Blank");
        }
      }
    } catch (err) {
      console.error(err.message);
    }
  }
  useEffect(() => {
    isAuth();
  }, []);

  return (
    <AuthContext.Provider value={isAuthenticated}>
      <UpdateAuthContext.Provider value={setAuth}>
        <RoleContext.Provider value={role}>
          <UserContext.Provider value={userId}>{children}</UserContext.Provider>{" "}
        </RoleContext.Provider>
      </UpdateAuthContext.Provider>
    </AuthContext.Provider>
  );
}
