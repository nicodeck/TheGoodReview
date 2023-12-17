import { Outlet } from "react-router";
import { useAuth } from "@hooks/useAuth";
import { useEffect } from "react";

function App() {
  const { autoLogin } = useAuth();

  useEffect(() => {
    try {
      autoLogin();
    } catch (error) {
      console.log(error);
    }
  }, []);

  return <Outlet />;
}

export default App;
