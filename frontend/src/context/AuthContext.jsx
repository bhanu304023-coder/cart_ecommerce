import React, { createContext } from "react";

export const authDataContext = createContext();

function AuthContext({ children }) {
  const server_url = "http://localhost:1508";

  return (
    <authDataContext.Provider value={{ server_url }}>
      {children}
    </authDataContext.Provider>
  );
}

export default AuthContext;
