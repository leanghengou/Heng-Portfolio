import React from "react";
import "./collaboration-cta.css";

import hengCharacterPc from "../../../resources/heng-character-pc.png";
import belleCharacter from "../../../resources/belle-character.png";

const CollaborationCta = () => {
  return (
    <section className="collaboration-cta" aria-labelledby="collaboration-cta-title">
      <div className="site-width-container collaboration-cta__inner">
        <div className="collaboration-cta__media" aria-hidden="true">
          <img src={hengCharacterPc} alt="" />
        </div>

        <div className="collaboration-cta__content">
          <img
            className="collaboration-cta__belle"
            src={belleCharacter}
            alt=""
            aria-hidden="true"
          />
          <p className="collaboration-cta__eyebrow">02 / Get in touch</p>
          <h2 id="collaboration-cta-title">Interested in collaboration?</h2>
          <p className="collaboration-cta__copy">
            Find out about my works: read through my case studies, have a look
            at final designs and try out prototypes I've built.
          </p>
          <a className="btn" href="/#projects">
            Get in touch
            <div className="arrow-wrapper">
              <div className="arrow"></div>
            </div>
          </a>
        </div>
      </div>
    </section>
  );
};

export default CollaborationCta;
