import { useEffect, useState } from "react";
import { Link, Form } from "react-router-dom";
import Logo from "@components/Navbar/components/Logo/Logo";
import "./RegisterPage.css";
import { IoCloseCircleOutline } from "react-icons/io5";
import fetchData from "services/fetchData";

function RegisterPage() {
  const [formUsername, setFormUsername] = useState("");
  const [formEmail, setFormEmail] = useState("");
  const [formPassword, setFormPassword] = useState("");

  const [missingUsername, setMissingUsername] = useState(false);
  const [missingEmail, setMissingEmail] = useState(false);
  const [missingPassword, setMissingPassword] = useState(false);

  const [validEmail, setValidEmail] = useState(true);

  const [registering, setRegistering] = useState(false);

  const [serverError, setServerError] = useState("");

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formUsername) {
      setMissingUsername(true);
    } else {
      setMissingUsername(false);
    }
    if (!formEmail) {
      setMissingEmail(true);
    } else {
      setMissingEmail(false);
    }
    if (!formPassword) {
      setMissingPassword(true);
    } else {
      setMissingPassword(false);
    }

    if (!formEmail || emailRegex.test(formEmail)) {
      setValidEmail(true);
    } else {
      setValidEmail(false);
    }

    setRegistering(true);
  };

  useEffect(() => {
    if (
      registering &&
      formUsername &&
      formEmail &&
      formPassword &&
      validEmail
    ) {
      fetchData({
        route: "/auth/register",
        method: "post",
        data: {
          username: formUsername,
          email: formEmail,
          password: formPassword,
        },
      })
        .then((res) => {
          setRegistering(false);
          console.log(res);
        })
        .catch((err) => {
          setRegistering(false);

          if ("response" in err && err.response.status === 400) {
            setServerError("Invalid fields");
          } else if ("response" in err && err.response.status === 500) {
            setServerError("Server error");
          } else if ("response" in err && err.response.status === 409) {
            const usernameExists = err.response.data.usernameExists;
            const emailExists = err.response.data.emailExists;
            if (usernameExists && emailExists) {
              setServerError("Username and email already exists");
            } else if (usernameExists) {
              setServerError("Username already exists");
            } else if (emailExists) {
              setServerError("Email already exists");
            }
          } else {
            setServerError("Unknown error");
          }
        });
    } else {
      setRegistering(false);
    }
  }, [registering, formUsername, formEmail, formPassword, validEmail]);

  return (
    <div className="register-page-container">
      <div className="register-page-logo">
        <Link to="/">
          <Logo />
        </Link>
      </div>
      {missingEmail || missingUsername || missingPassword || !validEmail ? (
        <div className="register-error-container">
          <div className="register-error-title">
            Invalid fields. Please fix the following:
          </div>

          <ul className="register-error-invalid-fields">
            {missingUsername ? <li>Enter username</li> : null}
            {missingEmail ? <li>Enter email</li> : null}
            {missingPassword ? <li>Enter password</li> : null}
            {!validEmail ? <li>Enter valid email</li> : null}
          </ul>
        </div>
      ) : null}
      {serverError ? (
        <div className="register-error-container">
          <div className="register-error-title">An error has occured:</div>
          <div className="register-error-invalid-fields">{serverError}</div>
        </div>
      ) : null}
      <Form className="register-page-form" onSubmit={handleSubmit}>
        <label className={"register-page-form-label"} htmlFor="username">
          Username
        </label>
        {missingUsername ? (
          <div className="register-page-invalid-field-alert">
            <IoCloseCircleOutline />
            Missing username
          </div>
        ) : null}
        <input
          className={
            "register-page-form-input" +
            (missingUsername ? " register-page-invalid-field" : "")
          }
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
        {missingEmail ? (
          <div className="register-page-invalid-field-alert">
            <IoCloseCircleOutline />
            Missing email
          </div>
        ) : null}
        {validEmail ? null : (
          <div className="register-page-invalid-field-alert">
            <IoCloseCircleOutline />
            Invalid email
          </div>
        )}
        <input
          className={
            "register-page-form-input" +
            (missingEmail || !validEmail ? " register-page-invalid-field" : "")
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
        {missingPassword ? (
          <div className="register-page-invalid-field-alert">
            <IoCloseCircleOutline />
            Missing password
          </div>
        ) : null}
        <input
          className={
            "register-page-form-input" +
            (missingPassword ? " register-page-invalid-field" : "")
          }
          type="password"
          id="password"
          name="password"
          value={formPassword}
          onChange={(e) => setFormPassword(e.target.value)}
        />
        <button
          className={
            "register-page-form-submit-button" +
            (registering ? " register-page-form-loading" : "")
          }
          type="submit"
        >
          {registering ? (
            <div className="register-page-form-submit-button-loading"></div>
          ) : (
            "Register"
          )}
        </button>
      </Form>
    </div>
  );
}

export default RegisterPage;
