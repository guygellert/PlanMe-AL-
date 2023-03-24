import React, { useState, useEffect, useContext, createContext, ReactNode } from "react"
import { authObj } from "../types/authType"
import { UserType } from "../types/user"

export const AuthState = {
  UnAuthenticated: 1,
  InProgress: 2,
  Authenticated: 3,
  LoggedOut: 4,
}

const login = async () => {
}

const logout = async () => {
}

export const authContext = createContext<authObj>({
  login: login,
  logout: logout,
})

export const useAuth = () => useContext(authContext)

type props = {
  children: ReactNode;
}

export const AuthProvider: React.FC<props> = ({ children }) => {
  const [authState, setAuthState] = useState<number>()
  const [user, setUser] = useState<UserType>()
  const [accessToken, setAccessToken] = useState<String>()

  // useEffect(() => {
  //   handleAuth()
  // }, [])

  // const getAccessToken = async (clickToken?: string) => {
  //   if (accessToken) {
  //     return accessToken
  //   } else {
  //     return await fetch("http://localhost:5000/login", {
  //       credentials: "include",
  //       headers: { Authorization: `Bearer ${clickToken}` },
  //     })
  //       .then((resp) => resp.json())
  //       .then((data) => {
  //         return data.token;
  //       })
  //       .catch((err) => {
  //         //TODO: LOG!
  //         return null;
  //       });
  //   }
  // };

  // const handleAuth = async () => {
  //   try {
  //     setAuthState(AuthState.InProgress)

  //     if (msalProps) {
  //       //Creating an access token for the user
  //       const token = await getAccessToken(msalProps?.idToken);
  //       if (token) {
  //         setAccessToken(token);
  //         setUser(publicClient.getAllAccounts()[0]);
  //         setAuthState(AuthState.Authenticated);
  //       } else {
  //         setAuthState(AuthState.UnAuthenticated);
  //       }
  //     } else {
  //       setAuthState(AuthState.LoggedOut);
  //     }
  //   } catch (error) {
  //     setAuthState(AuthState.LoggedOut);
  //   }
  // };

  return (
    <authContext.Provider value={{ authState, user, login, logout, accessToken }}>
      {children}
    </authContext.Provider>
  )
}
