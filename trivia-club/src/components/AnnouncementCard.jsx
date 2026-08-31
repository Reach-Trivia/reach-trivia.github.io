/**
 * AnnouncementCard — a single post in the announcements feed.
 *
 * Props:
 *   date, badge, title, body, attachmentUrl
 */
export default function AnnouncementCard({
  date,
  badge,
  title,
  body,
  attachmentUrl,
}) {
  const badgeClass = {
    Meeting: "badge badge-meeting",
    Important: "badge badge-important",
    Event: "badge badge-event",
  };

  const formatDate = (iso) => {
    const d = new Date(iso + "T00:00:00");
    return d.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <article className="announcement-card">
      <div className="announcement-meta">
        <span>{formatDate(date)}</span>
        <span className={badgeClass[badge] || "badge"}>{badge}</span>
      </div>
      <h3 className="announcement-title">{title}</h3>
      <p className="announcement-body">{body}</p>
      {attachmentUrl && (
        <a
          href={attachmentUrl}
          className="announcement-attachment"
          target="_blank"
          rel="noopener noreferrer"
        >
          📎 Attachment
        </a>
      )}
    </article>
  );
}
