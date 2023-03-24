import { Configuration, LogLevel } from "@azure/msal-browser";
import { makeOperation } from "@urql/core";
import { AuthConfig } from "@urql/exchange-auth";
import { authObj } from "../types/authType";
import jwt_decode, { JwtPayload } from "jwt-decode";

// Config object to be passed to Msal on creation
export const msalConfig: Configuration = {
  auth: {
    clientId: process.env.REACT_APP_CLIENT_ID!,
    authority: `https://login.microsoftonline.com/${process.env.REACT_APP_TENANTID}`,
    redirectUri: process.env.REACT_APP_CLIENT_URL || "http://localhost:3000/",
    navigateToLoginRequestUrl: true,
    postLogoutRedirectUri: "/",
  },
  cache: {
    cacheLocation: "localStorage",
    storeAuthStateInCookie: false,
  },
  system: {
    loggerOptions: {
      logLevel: LogLevel.Verbose,
      piiLoggingEnabled: false,
    },
  },
};

export const loginScopes = {
  USER_READ: "User.Read",
};

// Add here scopes for id token to be used at MS Identity Platform endpoints.
export const loginRequest = {
  scopes: loginScopes.USER_READ,
};

type stateType = {
  token: string;
};

export const isTokenValid = (token: string) => {
  const { exp } = jwt_decode<JwtPayload>(token);
  if (exp) return exp * 1000 > new Date().getTime();
  return false;
};

export const getClientConfig = (authObject: authObj) => {
  //Adding the authorization header to each req to the server
  const authExchangeConfig: AuthConfig<stateType> = {
    addAuthToOperation: ({ authState, operation }) => {
      if (!authState || !authState.token) return operation;
      return makeOperation(operation.kind, operation, {
        ...operation.context,
        fetchOptions: {
          credentials: "include",
          headers: {
            Authorization: `Bearer ${authState.token}`,
          },
        },
      });
    },

    //Setting what is an error situation
    willAuthError: ({ authState }) => {
      //Checking if the token we have is not expired
      if (!(authState && isTokenValid(authState.token))) return true;
      return false;
    },
    getAuth: async ({ authState }) => {
      // for initial launch, fetch the auth state from state
      if (!authState) {
        const token = authObject.accessToken;
        if (token) {
          return { token };
        }
        return null;
      }

      /**
       * the following code gets executed when an auth error has occurred
       * we should refresh the token if possible and return a new auth state
       * If refresh fails, we should log out
       **/
      const server_url =
        process.env.REACT_APP_SERVER_URL || "http://localhost:5000";
      const result = await fetch(`${server_url}/refresh_token`, {
        credentials: "include",
      }).then((resp) => {
        return resp.json();
      });

      if (result) {
        authObject.accessToken = result.newToken;
        return { token: result.newToken };
      }

      // your app logout logic should trigger here
      authObject.logout();
      return null;
    },
  };
  return authExchangeConfig;
};
