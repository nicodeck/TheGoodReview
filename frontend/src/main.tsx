import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.tsx";
import ErrorPage from "./scenes/ErrorPage/ErrorPage.tsx";
import "./index.css";
import Homepage from "./scenes/Homepage/Homepage.tsx";
import LoginPage from "scenes/LoginPage/LoginPage.tsx";
import { ProvideAuth } from "@hooks/useAuth.tsx";
import LogoutPage from "scenes/LogoutPage/LogoutPage.tsx";

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
