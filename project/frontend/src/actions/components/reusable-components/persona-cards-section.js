import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "./reusable-components.css";

function PersonaList({ title, items = [] }) {
  return (
    <div className="persona-card-list">
      <h4>{title}</h4>
      <ul>
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

function PersonaCard({ persona }) {
  return (
    <article className="persona-card">
      <div className="persona-card-header">
        <div className="persona-card-profile">
          <div className="persona-card-avatar">
            {persona.image ? <img src={persona.image} alt={persona.name} /> : null}
          </div>
          <div>
            <h3>{persona.name}</h3>
            <p>{persona.age}</p>
            <p>{persona.role}</p>
            <p>{persona.gender}</p>
          </div>
        </div>
        <blockquote>{persona.quote}</blockquote>
      </div>

      <div className="persona-card-body">
        <PersonaList title="Goals & Interests" items={persona.goals} />
        <PersonaList title="Personality" items={persona.personality} />
        <PersonaList title="Motivations to Exercise" items={persona.motivations} />
        <PersonaList title="Pain Points" items={persona.painPoints} />
      </div>
    </article>
  );
}

export default function PersonaCardsSection({ personas = [] }) {
  return (
    <section className="persona-cards-section">
      <div className="persona-cards-grid">
        {personas.map((persona) => (
          <PersonaCard persona={persona} key={persona.name} />
        ))}
      </div>

      <div className="persona-cards-swiper">
        <Swiper spaceBetween={16} slidesPerView={1.12}>
          {personas.map((persona) => (
            <SwiperSlide key={persona.name}>
              <PersonaCard persona={persona} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
