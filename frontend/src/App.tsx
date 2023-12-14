import { ProvideAuth } from "hooks/useAuth";
import { Outlet } from "react-router";

function App() {
  return (
    <ProvideAuth>
      <Outlet />
    </ProvideAuth>
  );
}

export default App;
