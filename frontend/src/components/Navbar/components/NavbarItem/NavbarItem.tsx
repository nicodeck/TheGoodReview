import { Link } from "react-router-dom";
import "./NavbarItem.css";

interface NavbarItemProps {
  children: string;
  name: string;
}

function NavbarItem({ children, name }: NavbarItemProps) {
  return (
    <div className="navbar-item">
      <Link to={name} className="navbar-item-name">
        {children}
      </Link>
    </div>
  );
}

export default NavbarItem;
