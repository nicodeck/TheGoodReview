import { useState } from "react";
import { Form, Link, useNavigate } from "react-router-dom";
import Logo from "@components/Navbar/components/Logo/Logo";
import { useAuth } from "@hooks/useAuth";

import "./LoginPage.css";

function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [loginError, setLoginError] = useState(false);

  const { login } = useAuth();

  const navigate = useNavigate();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const loginResponse = await login(username, password);
    if (loginResponse.isAuth) {
      navigate("/");
    }
    if (loginResponse.errorType === 401) {
      setLoginError(true);
    }
  }

  return (
    <div className="login-page-container">
      <div className="login-page-logo">
        <Link to="/">
          <Logo />
        </Link>
      </div>
      {loginError ? (
        <div className="login-error-container">
          Unvalid username or password.
        </div>
      ) : null}
      <Form className="login-page-form" onSubmit={handleSubmit}>
        <label className="login-page-form-label" htmlFor="username">
          Username
        </label>
        <input
          className="login-page-form-input"
          type="text"
          id="username"
          name="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          autoFocus
        />
        <label className="login-page-form-label" htmlFor="password">
          Password
        </label>
        <input
          className="login-page-form-input"
          type="password"
          id="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="login-page-form-submit-button" type="submit">
          Login
        </button>
      </Form>
    </div>
  );
}

export default LoginPage;
