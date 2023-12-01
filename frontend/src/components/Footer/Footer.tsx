import "./Footer.css";

function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer>
      <div className="footer-text">
        &copy; {currentYear} Nicolas Descamps All Rights Reserved
      </div>
    </footer>
  );
}

export default Footer;
