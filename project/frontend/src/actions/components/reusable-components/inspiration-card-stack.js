import "./reusable-components.css";

// Sticky card stack (Osmo). Each card pins below the one before it, and where
// the browser supports view timelines the outgoing card tilts back and dims as
// the next one covers it. Without that support it degrades to plain sticky
// cards, and under 900px to a normal stacked list — see the CSS for why.
//
// A card with an `image` lays out as illustration-left / copy-right; without
// one it keeps the original shape: heading beside copy, tinted block beneath.
export default function InspirationCardStack({ title, description, cards = [] }) {
  return (
    <section className="inspiration-section project-section-margin">
      {(title || description) && (
        <div className="rich-text-project">
          {title ? <h2>{title}</h2> : null}
          {description ? <p>{description}</p> : null}
        </div>
      )}

      <div className="card-stack">
        {cards.map((card, i) => (
          <div
            key={i}
            // Palettes cycle every five cards; the first uses the base colours.
            className={`card-stack__item${i ? ` is--${(i % 5) + 1}` : ""}${
              card.image ? " has--media" : ""
            }`}
            // Drives the card's animation range. Inline so a stack of any
            // length works, rather than nth-child rules capped at five.
            style={{ "--stack-i": i + 1 }}
          >
            <div className="card-stack__item-inner">
              {card.image && (
                <div className="card-stack__item-media">
                  <img src={card.image} alt={card.title || ""} />
                </div>
              )}

              <div className="card-stack__item-top">
                {card.title && <h3 className="card-stack__item-h">{card.title}</h3>}
                {card.text && <p className="card-stack__item-p">{card.text}</p>}
              </div>

              {!card.image && <div className="card-stack__item-bottom" />}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
