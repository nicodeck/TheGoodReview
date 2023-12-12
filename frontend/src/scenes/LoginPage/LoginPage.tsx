import { Form } from "react-router-dom";
import Logo from "@components/Navbar/components/Logo/Logo";
import "./LoginPage.css";

function LoginPage() {
  return (
    <div className="login-page-container">
      <div className="login-page-logo">
        <Logo />
      </div>
      <Form className="login-page-form" method="post" action="/login">
        <label className="login-page-form-label" htmlFor="username">
          Nom d'utilisateur
        </label>
        <input
          className="login-page-form-input"
          type="text"
          id="username"
          name="username"
        />
        <label className="login-page-form-label" htmlFor="password">
          Mot de passe
        </label>
        <input
          className="login-page-form-input"
          type="password"
          id="password"
          name="password"
        />
        <button className="login-page-form-submit-button" type="submit">
          Connexion
        </button>
      </Form>
    </div>
  );
}

export default LoginPage;
