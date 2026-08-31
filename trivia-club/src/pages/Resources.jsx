import { useState } from "react";
import Flashcard from "../components/Flashcard";
import { resources, flashcards, externalLinks } from "../data/mockData";

export default function Resources() {
  const [search, setSearch] = useState("");

  const filtered = resources.filter((r) => {
    const q = search.toLowerCase();
    return (
      r.title.toLowerCase().includes(q) ||
      r.description.toLowerCase().includes(q) ||
      r.tags.some((t) => t.toLowerCase().includes(q))
    );
  });

  return (
    <main className="page-container">
      {/* ── Study Guides ──────────────────────────────────────────── */}
      <section>
        <div className="section-header">
          <h2 className="section-title">Lessons</h2>
        </div>

        <div className="search-bar-wrapper">
          <input
            type="text"
            placeholder="Search by title, subject, or tag…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="search-input"
          />
        </div>

        <div className="study-guides-scroll-area custom-scrollbar">
          {filtered.length === 0 ? (
            <div className="search-empty-card">
              <p className="search-empty-text">
                No guides matching "<span className="text-neutral-200">{search}</span>"
              </p>
              <button
                onClick={() => setSearch("")}
                className="search-clear-button"
              >
                Clear search
              </button>
            </div>
          ) : (
            <div className="study-guides-grid">
              {filtered.map((r) => (
                <div key={r.id} className="resource-card group">
                  <h3 className="resource-card-title group-hover:text-[#00A63E]">
                    {r.title}
                  </h3>
                  <p className="resource-card-desc">{r.description}</p>
                  <div className="resource-tags-wrapper">
                    {r.tags.map((tag) => (
                      <span key={tag} className="resource-tag">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <a
                    href={r.pdfUrl}
                    className="resource-download"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    ↓ Download PDF
                  </a>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── Flashcards ────────────────────────────────────────────── */}
      <section>
        <div className="section-header">
          <h2 className="section-title">Flashcards</h2>
        </div>

        <div className="flashcards-grid">
          {flashcards.map((card) => (
            <Flashcard key={card.id} front={card.front} back={card.back} />
          ))}
        </div>
      </section>

      {/* ── External Links ────────────────────────────────────────── */}
      <section>
        <div className="section-header">
          <h2 className="section-title">External Resources</h2>
        </div>

        <div className="external-links-grid">
          {externalLinks.map((link) => (
            <a
              key={link.url}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="external-link-card group"
            >
              <h3 className="external-link-title group-hover:underline">
                {link.title} ↗
              </h3>
              <p className="external-link-desc">
                {link.description}
              </p>
            </a>
          ))}
        </div>
      </section>
    </main>
  );
}
