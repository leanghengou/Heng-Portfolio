import "./reusable-components.css";

export default function BorderedTextCards({ cards }) {
  return (
    <section className="bordered-cards-container">
      <div className="bordered-cards-grid">
        {cards.map((card, key) => (
          <div className="bordered-card-item" key={key}>
            <h3 className="bordered-card-title">{card.title}</h3>
            <ul className="bordered-card-body">
              {(Array.isArray(card.body) ? card.body : [card.body]).map(
                (text, i) => (
                  <li key={i}>{text}</li>
                )
              )}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
