import React from "react";
import { Link } from "react-router-dom";
import InfiniteGrid from "../actions/components/infinite-grid/infinite-grid";
import "./posters-gallery.css";

// Every image in src/resources/30days-challange, resolved at build time, so a
// new poster only has to be dropped into that folder. Sorted by filename to
// keep the order stable across builds.
const posterFiles = require.context(
  "../resources/30days-challange",
  false,
  /\.(png|jpe?g|webp)$/
);

const POSTERS = posterFiles
  .keys()
  .sort()
  .map((key, i) => {
    const mod = posterFiles(key);
    return {
      // Asset modules hand back the URL directly; the `.default` covers the
      // ES-module shape some loader configs produce.
      src: mod.default || mod,
      alt: `30 Days of Daily Posters, poster ${i + 1}`,
    };
  });

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
