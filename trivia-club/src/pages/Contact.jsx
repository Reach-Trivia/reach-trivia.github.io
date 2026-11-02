import { execs, socials } from "../data/users.js";
import instagramIcon from "../assets/Instagram.svg";
import gmailIcon from "../assets/Gmail.svg";
import discordIcon from "../assets/Discord.svg";
import "../styles/contact.css";

const socialLinks = [
  {
    label: "Instagram",
    value: "@ehss_trivia",
    href: socials.instagram,
    icon: instagramIcon,
  },
  {
    label: "Gmail",
    value: "Email Us",
    href: `mailto:${socials.email}`,
    icon: gmailIcon,
  },
  {
    label: "Discord",
    value: "Join Discord",
    href: socials.discord,
    icon: discordIcon,
  },
];

export default function Contact() {
  return (
    <main id="main-content" className="page-container">
      <section aria-labelledby="meetings-title">
        <div className="section-header">
          <h1 id="meetings-title" className="section-title">
            Meetings &amp; Location
          </h1>
          <p className="muted">When and where to find us</p>
        </div>
        <div className="card meetings-card">
          <div className="meeting-row">
            <span aria-hidden="true">📍</span>
            <div>
              <p className="eyebrow">Location</p>
              <p>{socials.meetingLocation}</p>
            </div>
          </div>
          <div className="meeting-row">
            <span aria-hidden="true">⏰</span>
            <div>
              <p className="eyebrow">Schedule</p>
              <p>{socials.meetingSchedule}</p>
            </div>
          </div>
        </div>
      </section>
      <section aria-labelledby="socials-title">
        <div className="section-header">
          <h2 id="socials-title" className="section-title">
            Socials &amp; Community
          </h2>
          <p className="muted">Stay connected with all our announcements</p>
        </div>
        <div className="socials-grid">
          {socialLinks.map(({ label, value, href, icon }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith("mailto:") ? undefined : "_blank"}
              rel="noopener noreferrer"
              className="card contact-card"
            >
              <img
                src={icon}
                alt=""
                width="40"
                height="40"
                className="contact-icon"
              />
              <span className="eyebrow">{label}</span>
              <span className="contact-value">{value}</span>
            </a>
          ))}
        </div>
      </section>
      <section aria-labelledby="execs-title">
        <div className="section-header">
          <h2 id="execs-title" className="section-title">
            Executive Team
          </h2>
          <p className="muted">Meet the club leadership team</p>
        </div>
        <div className="execs-grid">
          {execs.map(({ name, role }) => (
            <article key={name} className="card exec-card">
              <div className="exec-avatar" aria-hidden="true">
                {name.charAt(0)}
              </div>
              <h3 className="exec-name">{name}</h3>
              <span className="badge">{role}</span>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
