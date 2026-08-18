import { useEffect } from "react";
import "./reusable-components.css";
import StatCards from "./stat-cards";

const EMBED_SCRIPT = "https://www.instagram.com/embed.js";

// Same split layout as text-image-split, with an Instagram post in the media
// column instead of an image.
export default function InstagramSplit({
  tagline,
  title,
  text,
  permalink,
  caption,
  // Same cards as a standalone stat-cards section, scaled down by the CSS to
  // fit the text column rather than the full content width.
  stats = [],
  textPosition = "left",
}) {
  // Instagram's script swaps every unprocessed .instagram-media blockquote on
  // the page for an iframe. It's loaded once per session; process() is what
  // picks up a blockquote that mounted afterwards, which is every client-side
  // route change into this page.
  useEffect(() => {
    if (!permalink) return;

    const process = () => window.instgrm?.Embeds?.process();

    if (document.querySelector(`script[src="${EMBED_SCRIPT}"]`)) {
      process();
      return;
    }

    const script = document.createElement("script");
    script.src = EMBED_SCRIPT;
    script.async = true;
    script.onload = process;
    document.body.appendChild(script);
  }, [permalink]);

  if (!permalink) return null;

  return (
    <section
      className={`text-image-split text-image-split-embed project-section-margin${
        textPosition === "right" ? " text-image-split-reverse" : ""
      }`}
    >
      <div className="text-image-split-text">
        {tagline && <span className="text-image-split-tagline">{tagline}</span>}
        {title && <h2>{title}</h2>}
        {text && <p>{text}</p>}
        {stats.length > 0 && <StatCards stats={stats} columns={2} />}
      </div>

      <div className="text-image-split-media instagram-embed-media">
        {/* Everything inside the blockquote is fallback: it's what shows if
            Instagram's script is blocked or still loading. */}
        {/* Captioned variant: the caption carries the numbers this section is
            about, so it's worth the extra height it adds under the video. */}
        <blockquote
          className="instagram-media"
          data-instgrm-captioned=""
          data-instgrm-permalink={permalink}
          data-instgrm-version="14"
        >
          <a href={permalink} target="_blank" rel="noopener noreferrer">
            {caption || "View this post on Instagram"}
          </a>
        </blockquote>
      </div>
    </section>
  );
}
