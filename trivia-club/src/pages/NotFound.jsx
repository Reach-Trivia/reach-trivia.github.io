import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <main id="main-content" className="page-container">
      <h1 className="page-title">Page not found</h1>
      <p>That page does not exist.</p>
      <Link to="/">Return to Home</Link>
    </main>
  );
}
