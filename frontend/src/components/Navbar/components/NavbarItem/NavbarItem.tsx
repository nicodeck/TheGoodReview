import "./NavbarItem.css";

interface NavbarItemProps {
  children: string;
}

function NavbarItem({ children }: NavbarItemProps) {
  return (
    <div className="navbar-item">
      <div className="navbar-item-name">{children}</div>
    </div>
  );
}

export default NavbarItem;
