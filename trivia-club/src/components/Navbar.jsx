import { useState } from "react";
import { NavLink, Link } from "react-router-dom";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const close = () => setIsOpen(false);

  return (
    <header>
      <Link to="/" id="logo">
        Trivia Club
      </Link>

      <button
        className="menu-button"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle Menu"
      >
        ☰
      </button>

      {/* Desktop nav */}
      <nav>
        <NavLink to="/" end>Home</NavLink>
        <NavLink to="/resources">Resources</NavLink>
        <NavLink to="/contact">Contact</NavLink>
      </nav>

      {/* Mobile nav */}
      <div className={`mobile-nav ${isOpen ? "nav-open" : "nav-closed"}`}>
        <NavLink to="/" end onClick={close}>Home</NavLink>
        <NavLink to="/resources" onClick={close}>Resources</NavLink>
        <NavLink to="/contact" onClick={close}>Contact</NavLink>
      </div>
    </header>
  );
}
