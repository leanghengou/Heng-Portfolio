import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "./reusable-components.css";

function SurveyCard({ card }) {
  return (
    <article className="survey-card">
      <h3 className="survey-card-question">{card.question}</h3>
      <div className="survey-card-results">
        {(card.results || []).map((result, key) => (
          <div className="survey-card-result" key={key}>
            <strong>{result.percent}</strong>
            <span>{result.text}</span>
          </div>
        ))}
      </div>
    </article>
  );
}

export default function SurveyCardsCarousel({ cards = [] }) {
  return (
    <section className="survey-cards-carousel-section">
      <div className="survey-cards-grid">
        {cards.map((card, key) => (
          <SurveyCard card={card} key={key} />
        ))}
      </div>

      <div className="survey-cards-swiper">
        <Swiper spaceBetween={16} slidesPerView={1.08}>
          {cards.map((card, key) => (
            <SwiperSlide key={key}>
              <SurveyCard card={card} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
