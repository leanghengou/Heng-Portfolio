import React from "react";
import { Link } from "react-router-dom";
import InfiniteGrid from "../actions/components/infinite-grid/infinite-grid";
import "./posters-gallery.css";

import postersImg from "../resources/30days-challange-img.webp";

// TODO: drop the real poster files into src/resources/ and list them here —
// one entry per poster. `landscape` widens a card for non-square artwork.
// The grid clones this list to fill the viewport, so the count is up to you.
const POSTERS = [
  { src: postersImg, alt: "30 Days of Daily Posters" },
  { src: postersImg, alt: "30 Days of Daily Posters", landscape: true },
  { src: postersImg, alt: "30 Days of Daily Posters" },
];

const PostersGallery = () => {
  return (
    <section className="posters-gallery">
      <div className="posters-gallery-overlay">
        <Link
          className="posters-gallery-back"
          to="/project/30-days-of-daily-posters"
        >
          <span aria-hidden="true">←</span> Back to case study
        </Link>
        <p className="posters-gallery-title">30 Days of Daily Posters</p>
        <p className="posters-gallery-hint">Drag or scroll to explore</p>
      </div>

      <InfiniteGrid items={POSTERS} />
    </section>
  );
};

export default PostersGallery;
