import { useState } from "react";
import { externalLinks } from "../data/resources.js";
import useDriveLessons from "../hooks/useDriveLessons.js";
import "../styles/resources.css";

export default function Resources() {
  const [search, setSearch] = useState("");
  const { lessons, refreshFailed } = useDriveLessons();
  const query = search.trim().toLowerCase();
  const filtered = lessons.filter(({ title, description, tags }) =>
    [title, description, ...tags].some((text) =>
      text.toLowerCase().includes(query),
    ),
  );

  return (
    <main id="main-content" className="page-container">
      <section aria-labelledby="lessons-title">
        <div className="section-header">
          <h1 id="lessons-title" className="section-title">
            Lessons
          </h1>
        </div>
        <div className="search-bar">
          <label className="sr-only" htmlFor="lesson-search">
            Search lessons by title, subject, or tag
          </label>
          <input
            id="lesson-search"
            type="search"
            placeholder="Search by title, subject, or tag…"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            className="search-input"
          />
        </div>
        {refreshFailed && (
          <p className="muted" role="status">
            Showing saved lessons. Updates are temporarily unavailable.
          </p>
        )}
        <div className="study-guides-scroll-area">
          {filtered.length ? (
            <div className="study-guides-grid">
              {filtered.map((resource) => (
                <article key={resource.id} className="card resource-card">
                  <h2 className="card-title">{resource.title}</h2>
                  <p className="muted">{resource.description}</p>
                  <div className="resource-tags">
                    {resource.tags.map((tag) => (
                      <span key={tag} className="resource-tag">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <a
                    href={resource.slideUrl || resource.pdfUrl}
                    className="resource-link"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Open ${resource.title}`}
                  >
                    ↗ Open
                  </a>
                </article>
              ))}
            </div>
          ) : (
            <div className="search-empty" role="status">
              <p>
                No lessons matching “<strong>{search}</strong>”
              </p>
              <button
                type="button"
                onClick={() => setSearch("")}
                className="text-button"
              >
                Clear search
              </button>
            </div>
          )}
        </div>
      </section>
      <section aria-labelledby="external-title">
        <div className="section-header">
          <h2 id="external-title" className="section-title">
            External Resources
          </h2>
        </div>
        <div className="external-links-grid">
          {externalLinks.map((link) => (
            <a
              key={link.url}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="card external-link-card"
            >
              <h3 className="card-title">{link.title} ↗</h3>
              <p className="muted">{link.description}</p>
            </a>
          ))}
        </div>
      </section>
    </main>
  );
}
