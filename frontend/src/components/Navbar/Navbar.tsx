import "./Navbar.css";
import { useState, useEffect } from "react";

import { IoMenuSharp, IoChevronUpSharp } from "react-icons/io5";

import NavbarItem from "./components/NavbarItem/NavbarItem";
import Logo from "./components/Logo/Logo";
import { Link } from "react-router-dom";
import { useAuth } from "@hooks/useAuth";

interface NavbarProps {
  backgroundChangesOnScroll: boolean;
  forceNavbarVisible: boolean;
}

function Navbar({
  backgroundChangesOnScroll,
  forceNavbarVisible,
}: NavbarProps) {
  const [navbarMenuIsOpen, setNavbarMenuIsOpen] = useState(false);

  const [scrollTop, setScrollTop] = useState(window.scrollY);

  const { username } = useAuth();

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
        (backgroundChangesOnScroll && !forceNavbarVisible && scrollTop < 50
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
        {username ? <NavbarItem name="my-games">My Games</NavbarItem> : null}
        {username ? (
          <>
            <NavbarItem name="logout">Log Out</NavbarItem>
          </>
        ) : (
          <>
            <NavbarItem name="login">Log In</NavbarItem>
            <NavbarItem name="register">Register</NavbarItem>
          </>
        )}
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
