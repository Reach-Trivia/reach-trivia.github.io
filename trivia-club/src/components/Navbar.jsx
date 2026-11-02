import { useRef, useState } from "react";
import { NavLink, Link, useLocation } from "react-router-dom";
import triviaLogo from "../assets/trivia-logo.webp";

const links = [
  { to: "/", label: "Home" },
  { to: "/scores", label: "Scores" },
  { to: "/resources", label: "Resources" },
  { to: "/contact", label: "Contact" },
];

function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const menuButton = useRef(null);

  return (
    <header
      className="site-header"
      onKeyDown={(event) => {
        if (event.key === "Escape" && isOpen) {
          setIsOpen(false);
          menuButton.current?.focus();
        }
      }}
    >
      <Link
        to="/"
        className="site-logo"
        aria-label="Reach Trivia home"
        onClick={() => setIsOpen(false)}
      >
        <img src={triviaLogo} alt="Reach Trivia" width="80" height="80" />
      </Link>
      <button
        ref={menuButton}
        type="button"
        className="menu-button"
        onClick={() => setIsOpen((open) => !open)}
        aria-label="Toggle menu"
        aria-expanded={isOpen}
        aria-controls="main-navigation"
      >
        ☰
      </button>
      <nav
        id="main-navigation"
        className={`site-nav${isOpen ? " is-open" : ""}`}
        aria-label="Main navigation"
      >
        {links.map(({ to, label }) => (
          <NavLink
            key={to}
            to={to}
            end={to === "/"}
            onClick={() => setIsOpen(false)}
          >
            {label}
          </NavLink>
        ))}
      </nav>
    </header>
  );
}

export default function Navbar() {
  const { pathname } = useLocation();
  return <Navigation key={pathname} />;
}
