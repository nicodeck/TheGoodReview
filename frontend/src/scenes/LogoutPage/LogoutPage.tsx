import Logo from "@components/Navbar/components/Logo/Logo";
import { useEffect, useState } from "react";
import { useAuth } from "@hooks/useAuth";
import "./LogoutPage.css";
import { Link, useNavigate } from "react-router-dom";

function LogoutPage() {
  const [isLoggedOut, setIsLoggedOut] = useState(false);

  const { logout } = useAuth();

  const navigate = useNavigate();

  useEffect(() => {
    if (logout()) {
      setIsLoggedOut(true);
      setTimeout(() => {
        navigate("/");
      }, 2000);
    }
  }, []);

  return (
    <div className="logout-page-container">
      <div className="logout-page-logo">
        <Link to="/">
          <Logo />
        </Link>
      </div>
      <div className="logout-page-text">
        {isLoggedOut
          ? "You have successfully been logged out. Redirecting to homepage..."
          : "Disconnecting..."}
      </div>
    </div>
  );
}

export default LogoutPage;
