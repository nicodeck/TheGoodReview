import { Link } from "react-router-dom";
import "./NavbarItem.css";

interface NavbarItemProps {
  children: string;
  name: string;
}

function NavbarItem({ children, name }: NavbarItemProps) {
  return (
    <Link to={"/" + name} className="navbar-item">
      <div className="navbar-item-name">{children}</div>
    </Link>
  );
}

export default NavbarItem;
