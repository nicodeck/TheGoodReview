import axios from "axios";
import { createContext, useContext, useState } from "react";
import fetchData from "services/fetchData";

interface useAuthInterface {
  username: string | null;
  login: (username: string, password: string) => void;
  autoLogin: () => void;
  getLocalToken: () => string | null;
}

const authContext = createContext({} as useAuthInterface);

export function ProvideAuth({
  children,
}: {
  children: JSX.Element | JSX.Element[];
}) {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export const useAuth: () => useAuthInterface = () => {
  return useContext(authContext);
};

const useProvideAuth: () => useAuthInterface = () => {
  const [username, setUsername] = useState<string | null>(null);

  const login = (username: string, password: string) => {
    console.log("Attempting login...");
    axios
      .post(
        import.meta.env.VITE_BACKEND_URL +
          ":" +
          import.meta.env.VITE_BACKEND_PORT +
          "/auth/login",
        {
          username: username,
          password: password,
        }
      )
      .then((response) => {
        console.log("Login response: ");
        console.log(response.data);
        if (response.data.token) {
          sessionStorage.setItem("token", response.data.token);
          setUsername(response.data.username);
          console.log("Login successful!");
        }
      })
      .catch((error) => {
        console.log("Error logging in: ");
        console.error(error);
      });
  };

  const autoLogin = () => {
    const localToken = sessionStorage.getItem("token");

    if (localToken) {
      fetchData({
        route: "/auth/autologin",
        method: "post",
        headers: {
          Authorization: "Bearer " + localToken,
        },
      })
        .then((response) => {
          if (response.data.username) {
            setUsername(response.data.username);
          }
        })
        .catch((error) => {
          console.log("Error auto-logging in: ");
          console.error(error);
        });
    }
    console.log("Auto-login, username: ", username);
  };

  const getLocalToken = () => {
    const localToken = localStorage.getItem("token");

    if (localToken) {
      return localToken;
    }

    return null;
  };

  return {
    username,
    login,
    autoLogin,
    getLocalToken,
  };
};
