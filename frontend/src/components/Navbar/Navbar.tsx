import "./Navbar.css";
import logo from "/src/assets/logo.svg";
import { useState } from "react";

import { IoMenuSharp, IoChevronUpSharp } from "react-icons/io5";

import NavbarItem from "./components/NavbarItem/NavbarItem";

function Navbar() {
  const [navbarMenuIsOpen, setNavbarMenuIsOpen] = useState(false);

  return (
    <div className="navbar-container">
      <div className="navbar-logo-container">
        <img src={logo} alt="TheGoodReview logo" />
      </div>
      <div
        className={
          "navbar-items-container" + (navbarMenuIsOpen ? "" : " is-hidden")
        }
      >
        <NavbarItem name="">Accueil</NavbarItem>
        <NavbarItem name="profile">Profil</NavbarItem>
        <NavbarItem name="recommandations">Recommandations</NavbarItem>
      </div>
      <div
        className="navbar-hamburger"
        onClick={() => setNavbarMenuIsOpen(!navbarMenuIsOpen)}
      >
        {navbarMenuIsOpen ? (
          <IoChevronUpSharp size="1.9em" />
        ) : (
          <IoMenuSharp size="1.9em" />
        )}
      </div>
    </div>
  );
}

export default Navbar;
