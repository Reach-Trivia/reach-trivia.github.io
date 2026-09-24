import { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import triviaLogo from "../assets/trivia_logo.png";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const close = () => setIsOpen(false);

  return (
    <header>
      <Link to="/" id="logo" className="flex items-center py-0">
        <img
          src={triviaLogo}
          alt="Trivia Club Logo"
          className="h-16 md:h-20 w-auto object-contain hover:scale-105 transition-transform"
        />
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
        <NavLink to="/scores">Scores</NavLink>
        <NavLink to="/resources">Resources</NavLink>
        <NavLink to="/contact">Contact</NavLink>
      </nav>

      {/* Mobile nav */}
      <div className={`mobile-nav ${isOpen ? "nav-open" : "nav-closed"}`}>
        <NavLink to="/" end onClick={close}>Home</NavLink>
        <NavLink to="/scores" onClick={close}>Scores</NavLink>
        <NavLink to="/resources" onClick={close}>Resources</NavLink>
        <NavLink to="/contact" onClick={close}>Contact</NavLink>
      </div>
    </header>
  );
}
