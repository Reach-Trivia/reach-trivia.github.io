import { execs, socials } from "../data/mockData";

export default function Contact() {
  return (
    <main className="page-container">
      {/* ── Page Header ───────────────────────────────────────────── */}
      <section className="text-center">
        <div className="section-header">
          <h1 className="section-title text-2xl md:text-4xl">
            Contact &amp; Socials
          </h1>
          <p className="section-subtitle">
            FOLLOW THE INSTA!!!!!!!
          </p>
        </div>
      </section>

      {/* ── Social Links ──────────────────────────────────────────── */}
      <section>
        <div className="socials-grid">
          <a
            href={socials.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="contact-card no-underline group"
          >
            <span className="contact-icon">📸</span>
            <span className="contact-card-title">Instagram</span>
            <span className="contact-card-value text-[#00A63E] group-hover:underline">
              @triviaclub
            </span>
          </a>

          <a
            href={`mailto:${socials.email}`}
            className="contact-card no-underline group"
          >
            <span className="contact-icon">✉️</span>
            <span className="contact-card-title">Email</span>
            <span className="contact-card-value text-neutral-200 group-hover:underline">
              {socials.email}
            </span>
          </a>

          <a
            href={`mailto:${socials.email}`}
            className="contact-card no-underline group"
          >
            <span className="contact-icon">✉️</span>
            <span className="contact-card-title">Email</span>
            <span className="contact-card-value text-neutral-200 group-hover:underline">
              {socials.email}
            </span>
          </a>
        </div>
      </section>

      {/* ── Execs ─────────────────────────────────────────────────── */}
      <section>
        <div className="section-header">
          <h2 className="section-title">Execs</h2>
          <p className="section-subtitle">Meet the club leadership team</p>
        </div>
        <div className="execs-grid">
          {execs.map((exec) => (
            <div key={exec.name} className="exec-card group">
              <div className="exec-avatar">
                {exec.name.charAt(0)}
              </div>
              <p className="exec-name">{exec.name}</p>
              <span className="badge badge-meeting">{exec.role}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── Meeting Info ──────────────────────────────────── */}
      <section>
        <div className="section-header">
          <h2 className="section-title">Meetings &amp; Logistics</h2>
          <p className="section-subtitle">When and where to find us</p>
        </div>
        <div className="meetings-card">
          <div className="meeting-row">
            <span className="meeting-icon">📍</span>
            <div>
              <p className="meeting-label">Location</p>
              <p className="meeting-value">{socials.meetingLocation}</p>
            </div>
          </div>
          <div className="meeting-row meeting-divider">
            <span className="meeting-icon">⏰</span>
            <div>
              <p className="meeting-label">Schedule</p>
              <p className="meeting-value">{socials.meetingSchedule}</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
