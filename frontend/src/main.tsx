import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.tsx";
import ErrorPage from "./scenes/ErrorPage/ErrorPage";
import "./index.css";
import Homepage from "./scenes/Homepage/Homepage";
import LoginPage from "scenes/LoginPage/LoginPage";
import { ProvideAuth } from "@hooks/useAuth";
import LogoutPage from "scenes/LogoutPage/LogoutPage";
import RegisterPage from "scenes/RegisterPage/RegisterPage";
import MyGamesPage from "scenes/MyGamesPage/MyGamesPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Homepage />,
      },
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/logout",
        element: <LogoutPage />,
      },
      {
        path: "/register",
        element: <RegisterPage />,
      },
      {
        path: "my-games",
        element: <MyGamesPage />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ProvideAuth>
      <RouterProvider router={router} />
    </ProvideAuth>
  </React.StrictMode>
);
