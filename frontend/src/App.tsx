import { Outlet } from "react-router";
import { useAuth } from "@hooks/useAuth";
import { useEffect } from "react";

function App() {
  const { autoLogin } = useAuth();

  useEffect(() => {
    autoLogin();
  }, []);

  return <Outlet />;
}

export default App;
