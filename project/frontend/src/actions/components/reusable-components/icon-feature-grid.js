import "./reusable-components.css";

/* Stroke-icon set, drawn at 24×24 in currentColor so each cell inherits the
   section's text color. Add a key here to expose a new icon to the data layer,
   which selects one by name: `{ icon: "cart", title, description }`. */
export const ICONS = {
  megaphone: (
    <>
      <path d="M4 10v4a1 1 0 0 0 1 1h3l6 4V5L8 9H5a1 1 0 0 0-1 1z" />
      <path d="M18 9.5a4 4 0 0 1 0 5" />
    </>
  ),
  sparkle: (
    <>
      <path d="M11 3.5l1.7 4.8 4.8 1.7-4.8 1.7L11 16.5l-1.7-4.8L4.5 10l4.8-1.7L11 3.5z" />
      <path d="M18 15l.8 2.2 2.2.8-2.2.8L18 21l-.8-2.2-2.2-.8 2.2-.8L18 15z" />
    </>
  ),
  cart: (
    <>
      <path d="M2.5 4H5l2.4 10.4a1.5 1.5 0 0 0 1.5 1.1h7.7a1.5 1.5 0 0 0 1.5-1.1L20 7.5H5.6" />
      <circle cx="9.5" cy="19.3" r="1.2" />
      <circle cx="17" cy="19.3" r="1.2" />
    </>
  ),
  mail: (
    <>
      <rect x="3" y="5.5" width="18" height="13" rx="2" />
      <path d="M3.8 7.5l8.2 5.8 8.2-5.8" />
    </>
  ),
  devices: (
    <>
      <rect x="2.5" y="5" width="13" height="9.5" rx="1.5" />
      <path d="M6 18h6.5" />
      <rect x="16.5" y="9.5" width="5" height="9" rx="1.5" />
    </>
  ),
  repeat: (
    <>
      <path d="M20 12a8 8 0 1 1-2.6-5.9" />
      <path d="M20.5 3.5V8h-4.5" />
    </>
  ),
  lock: (
    <>
      <rect x="4.5" y="10.5" width="15" height="10" rx="2" />
      <path d="M8 10.5V7.5a4 4 0 0 1 8 0v3" />
    </>
  ),
  search: (
    <>
      <circle cx="11" cy="11" r="6.5" />
      <path d="M15.8 15.8L20.5 20.5" />
    </>
  ),
  chart: (
    <>
      <path d="M4 20V4" />
      <path d="M4 20h16" />
      <path d="M8 20v-6M13 20V8M18 20v-9" />
    </>
  ),
  bolt: <path d="M13.5 2.5L5 13.5h6l-.5 8L19 10.5h-6l.5-8z" />,
  clock: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7v5.3l3.4 2" />
    </>
  ),
  users: (
    <>
      <circle cx="9.5" cy="8.5" r="3.5" />
      <path d="M3.5 19.5a6 6 0 0 1 12 0" />
      <path d="M16 5.5a3.5 3.5 0 0 1 0 6M17.5 19.5a6 6 0 0 0-2.2-4.6" />
    </>
  ),
  code: (
    <>
      <path d="M8.5 8L4 12l4.5 4" />
      <path d="M15.5 8L20 12l-4.5 4" />
      <path d="M13.5 4.5l-3 15" />
    </>
  ),
  link: (
    <>
      <path d="M10.6 13.4a3.6 3.6 0 0 0 5.1 0l3-3a3.6 3.6 0 0 0-5.1-5.1l-1.6 1.6" />
      <path d="M13.4 10.6a3.6 3.6 0 0 0-5.1 0l-3 3a3.6 3.6 0 0 0 5.1 5.1l1.6-1.6" />
    </>
  ),
  layout: (
    <>
      <rect x="3" y="4.5" width="18" height="15" rx="2" />
      <path d="M3 9.5h18" />
      <path d="M9.5 9.5v10" />
    </>
  ),
  layers: (
    <>
      <path d="M12 3.2l8.5 4.6-8.5 4.6-8.5-4.6L12 3.2z" />
      <path d="M3.5 12.4l8.5 4.6 8.5-4.6" />
      <path d="M3.5 16.4l8.5 4.4 8.5-4.4" />
    </>
  ),
  money: (
    <>
      <rect x="2.5" y="6" width="19" height="12" rx="2.5" />
      <circle cx="12" cy="12" r="2.6" />
      <path d="M6 12h.01M18 12h.01" />
    </>
  ),
  trending: (
    <>
      <path d="M3 16.5l5.5-5.5 3.5 3.5L20 6.5" />
      <path d="M14.5 6.5H20V12" />
    </>
  ),
};

/* Bordered icon grid: one hairline-separated cell per item, `columns` wide.
   Each cell draws its own right and bottom rule, so the interior lines and the
   outer right/bottom edges come out of the cells themselves; the frame adds the
   remaining top and left edges. That holds at any item or column count without
   an :nth-child rule, and every line is a real border rather than a clipped
   overhang, which is what kept the bottom rule from painting on some displays. */
export default function IconFeatureGrid({
  title,
  description,
  columns = 4,
  items = [],
}) {
  return (
    <section className="icon-feature-section">
      {(title || description) && (
        <div className="rich-text-project icon-feature-intro">
          {title ? <h2>{title}</h2> : null}
          {description ? <p>{description}</p> : null}
        </div>
      )}

      <div className="icon-feature-frame">
        <div
          className="icon-feature-grid"
          style={{ "--icon-feature-columns": columns }}
        >
          {items.map((item, i) => (
            <div className="icon-feature-item" key={i}>
              {ICONS[item.icon] ? (
                <span className="icon-feature-icon" aria-hidden="true">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    {ICONS[item.icon]}
                  </svg>
                </span>
              ) : null}

              <h3 className="icon-feature-title">{item.title}</h3>
              {item.description ? (
                <p className="icon-feature-text">{item.description}</p>
              ) : null}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
