import { execs, socials } from "../data/users";
import instagramIcon from "../assets/Instagram.svg";
import gmailIcon from "../assets/Gmail.svg";
import discordIcon from "../assets/Discord.svg";

export default function Contact() {
  return (
    <main className="page-container">
      {/* ── Meeting Info ───────────────────────────── */}
      <section>
        <div className="section-header">
          <h2 className="section-title">Meetings &amp; Location</h2>
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

      {/* ── Social Links ──────────────────────────────────────────── */}
      <section>
        <div className="section-header">
          <h2 className="section-title">Socials &amp; Community</h2>
          <p className="section-subtitle">Stay connected with all our announcements</p>
        </div>
        <div className="socials-grid">
          <a
            href={socials.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="contact-card no-underline group"
          >
            <img
              src={instagramIcon}
              alt="Instagram"
              className="w-10 h-10 object-contain contact-icon"
            />
            <span className="contact-card-title">Instagram</span>
            <span className="contact-card-value text-[#0074FF] group-hover:underline">
              @triviaclub
            </span>
          </a>

          <a
            href={`mailto:${socials.email}`}
            className="contact-card no-underline group"
          >
            <img
              src={gmailIcon}
              alt="Gmail"
              className="w-10 h-10 object-contain contact-icon"
            />
            <span className="contact-card-title">Gmail</span>
            <span className="contact-card-value text-[#111111] group-hover:underline">
              {socials.email}
            </span>
          </a>

          <a
            href={socials.discord || "https://discord.gg/triviaclub"}
            target="_blank"
            rel="noopener noreferrer"
            className="contact-card no-underline group"
          >
            <img
              src={discordIcon}
              alt="Discord"
              className="w-10 h-10 object-contain contact-icon"
            />
            <span className="contact-card-title">Discord</span>
            <span className="contact-card-value text-[#0074FF] group-hover:underline">
              Join Discord
            </span>
          </a>
        </div>
      </section>

      {/* ── Execs ─────────────────────────────────────────────────── */}
      <section>
        <div className="section-header">
          <h2 className="section-title">Executive Team</h2>
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
    </main>
  );
}
