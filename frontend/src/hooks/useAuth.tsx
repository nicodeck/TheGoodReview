import { createContext, useContext, useState } from "react";
import fetchData from "services/fetchData";

interface useAuthInterface {
  username: string | null;
  login: (username: string, password: string) => Promise<LoginResponse>;
  autoLogin: () => void;
  getLocalToken: () => string | null;
  logout: () => boolean;
}

interface LoginError {
  response?: {
    status: number;
  };
}

interface LoginResponse {
  isAuth: boolean;
  errorType?: number;
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

  const login = async (username: string, password: string) => {
    try {
      const loginResponse = await fetchData({
        route: "/auth/login",
        method: "post",
        data: {
          username: username,
          password: password,
        },
      });
      if (loginResponse.data.token) {
        sessionStorage.setItem("token", loginResponse.data.token);
        setUsername(loginResponse.data.username);

        return { isAuth: true };
      }
    } catch (error) {
      const loginError = error as LoginError;
      if (loginError.response) {
        if (loginError.response.status === 401) {
          return {
            isAuth: false,
            errorType: 401,
          };
        }
      }
    }

    return {
      isAuth: false,
    };
  };

  const autoLogin = () => {
    const localToken = sessionStorage.getItem("token");

    if (localToken) {
      fetchData({
        route: "/auth/autologin",
        method: "post",
      })
        .then((response) => {
          if (response.data.username) {
            setUsername(response.data.username);
            console.log("Auto-login, username: ", response.data.username);
          }
        })
        .catch((error) => {
          console.log("Error auto-logging in: ");
          console.error(error);
        });
    }
  };

  const getLocalToken = () => {
    const localToken = localStorage.getItem("token");

    if (localToken) {
      return localToken;
    }

    return null;
  };

  const logout = () => {
    try {
      sessionStorage.removeItem("token");
      setUsername(null);
    } catch (error) {
      return false;
    }

    return true;
  };

  return {
    username,
    login,
    autoLogin,
    getLocalToken,
    logout,
  };
};
