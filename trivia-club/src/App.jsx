import "./App.css";
import Navbar from "./components/Navbar.jsx";
import { Outlet } from "react-router-dom";

export default function App() {
  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <Navbar />
      <Outlet />
    </>
  );
}
