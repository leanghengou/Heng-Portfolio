import "./reusable-components.css";

// Inspiration references side by side: artwork on top, then a numbered
// eyebrow, heading and copy, with a rule between the columns. Replaces the
// sticky card stack this section used to be — the references read better
// compared at a glance than revealed one pinned card at a time.

// Numbered rather than counted with CSS so the eyebrow reads as words
// ("Inspiration two"); past six it falls back to the digit.
const ORDINALS = ["one", "two", "three", "four", "five", "six"];

export default function InspirationGrid({ title, description, cards = [] }) {
  return (
    <section className="inspiration-grid project-section-margin">
      {(title || description) && (
        <div className="rich-text-project">
          {title ? <h2>{title}</h2> : null}
          {description ? <p>{description}</p> : null}
        </div>
      )}

      <div className="inspiration-grid__items">
        {cards.map((card, i) => (
          <article className="inspiration-grid__item" key={card.title || i}>
            {card.image && (
              <div className="inspiration-grid__media">
                <img src={card.image} alt={card.title || ""} />
              </div>
            )}

            <span className="inspiration-grid__eyebrow">
              Inspiration {ORDINALS[i] || i + 1}
            </span>

            {card.title && (
              <h3 className="inspiration-grid__title">{card.title}</h3>
            )}
            {card.text && (
              <p className="inspiration-grid__text">{card.text}</p>
            )}
          </article>
        ))}
      </div>
    </section>
  );
}
