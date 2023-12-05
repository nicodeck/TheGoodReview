import "./Navbar.css";
import { useState, useEffect } from "react";

import { IoMenuSharp, IoChevronUpSharp } from "react-icons/io5";

import NavbarItem from "./components/NavbarItem/NavbarItem";
import Logo from "./components/Logo/Logo";
import { Link } from "react-router-dom";

interface NavbarProps {
  backgroundChangesOnScroll: boolean;
}

function Navbar({ backgroundChangesOnScroll }: NavbarProps) {
  const [navbarMenuIsOpen, setNavbarMenuIsOpen] = useState(false);

  const [scrollTop, setScrollTop] = useState(window.scrollY);

  // useEffect to update scrollTop
  useEffect(() => {
    if (backgroundChangesOnScroll) {
      const handleScroll = () => {
        setScrollTop(window.scrollY);
      };

      window.addEventListener("scroll", handleScroll);

      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    }
  }, [backgroundChangesOnScroll]);

  return (
    <div
      className={
        "navbar-container" +
        (!navbarMenuIsOpen ? " navbar-items-container-is-hidden" : "") +
        (backgroundChangesOnScroll && scrollTop < 50
          ? " navbar-transparent"
          : "")
      }
      id="navbar-container"
    >
      <div className="navbar-logo-container">
        <Link to={"/"}>
          <Logo />
        </Link>
      </div>
      <div className={"navbar-items-container"}>
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
