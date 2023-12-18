import { useState } from "react";
import { Link, Form } from "react-router-dom";
import Logo from "@components/Navbar/components/Logo/Logo";
import "./RegisterPage.css";

function RegisterPage() {
  const [formUsername, setFormUsername] = useState("");
  const [formEmail, setFormEmail] = useState("");
  const [formPassword, setFormPassword] = useState("");

  const [missingUsername, setMissingUsername] = useState(false);
  const [missingEmail, setMissingEmail] = useState(false);
  const [missingPassword, setMissingPassword] = useState(false);

  const handleSubmit = () => {
    if (!formUsername) {
      setMissingUsername(true);
    }
    if (!formEmail) {
      setMissingEmail(true);
    }
    if (!formPassword) {
      setMissingPassword(true);
    }
  };

  return (
    <div className="register-page-container">
      <div className="register-page-logo">
        <Link to="/">
          <Logo />
        </Link>
      </div>
      {missingEmail || missingUsername || missingPassword ? (
        <div className="register-error-container">
          Unvalid username or password.
        </div>
      ) : null}
      <Form className="register-page-form" onSubmit={handleSubmit}>
        <label
          className={
            "register-page-form-label" +
            (missingUsername ? " register-page-missing-field" : "")
          }
          htmlFor="username"
        >
          Username
        </label>
        <input
          className="register-page-form-input"
          type="text"
          id="username"
          name="username"
          value={formUsername}
          onChange={(e) => setFormUsername(e.target.value)}
          autoFocus
        />
        <label className="register-page-form-label" htmlFor="email">
          Email
        </label>
        <input
          className={
            "register-page-form-input" +
            (missingEmail ? " register-page-missing-field" : "")
          }
          type="text"
          id="email"
          name="email"
          value={formEmail}
          onChange={(e) => setFormEmail(e.target.value)}
        />
        <label className="register-page-form-label" htmlFor="password">
          Password
        </label>
        <input
          className={
            "register-page-form-input" +
            (missingEmail ? " register-page-missing-field" : "")
          }
          type="password"
          id="password"
          name="password"
          value={formPassword}
          onChange={(e) => setFormPassword(e.target.value)}
        />
        <button className="register-page-form-submit-button" type="submit">
          Register
        </button>
      </Form>
    </div>
  );
}

export default RegisterPage;
