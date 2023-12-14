import axios from "axios";
import { createContext, useContext, useState } from "react";

interface useAuthInterface {
  user: User | null;
  login: (username: string, password: string) => void;
  getLocalToken: () => string | null;
}

interface User {
  username: string;
  email?: string;
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
  const [user, setUser] = useState<User | null>(null);

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
          setUser({ username: response.data.username });
          console.log("Login successful!");
        }
      })
      .catch((error) => {
        console.log("Error logging in: ");
        console.error(error);
      });
  };

  const getLocalToken = () => {
    const localToken = localStorage.getItem("token");

    if (localToken) {
      return localToken;
    }

    return null;
  };

  return {
    user,
    login,
    getLocalToken,
  };
};
