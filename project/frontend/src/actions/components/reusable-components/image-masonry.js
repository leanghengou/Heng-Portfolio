import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "./reusable-components.css";

// Process/exploration gallery. Desktop lays the images out as a balanced
// two-column masonry so each one keeps its natural height; under 786px the same
// images become a swipeable carousel (same grid/swiper swap the survey cards use).
export default function ImageMasonry({ title, description, images = [] }) {
  const imageList = Array.isArray(images) ? images : images ? [images] : [];
  const label = (i) => (title ? `${title} ${i + 1}` : "");

  return (
    <section className="image-masonry-section project-section-margin">
      {(title || description) && (
        <div className="rich-text-project">
          {title ? <h2>{title}</h2> : null}
          {description ? <p>{description}</p> : null}
        </div>
      )}

      {imageList.length > 0 && (
        <>
          <div className="image-masonry-grid">
            {imageList.map((img, i) => (
              <img className="image-masonry-item" key={i} src={img} alt={label(i)} />
            ))}
          </div>

          <div className="image-masonry-swiper">
            <Swiper spaceBetween={16} slidesPerView={1.08}>
              {imageList.map((img, i) => (
                <SwiperSlide key={i}>
                  <img src={img} alt={label(i)} />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </>
      )}
    </section>
  );
}
