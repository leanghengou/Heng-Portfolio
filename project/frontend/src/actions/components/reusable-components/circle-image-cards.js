import "./reusable-components.css";

export default function CircleImageCards({cards }) {
  return (
    <section className="circle-cards-container project-section-margin">
   
      <div className="circle-cards-grid">
        {cards.map((card, key) => (
          <div className="circle-card-item" key={key}>
            <div className="circle-card-img">
              <img src={card.image} alt={card.title} />
            </div>
            <h4 className="circle-card-title">{card.title}</h4>
            <p className="circle-card-subtitle">{card.subtitle}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
