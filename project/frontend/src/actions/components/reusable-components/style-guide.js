import "./reusable-components.css";

export default function StyleGuide() {
  return (
    <section className="style-guide project-section-margin">
      <div className="style-guide-block">
        <div className="rich-text-project">
          <h2>Colors</h2>
          <p>
            Light green is the brand color of StartNow, and it being used most
            frequent as the visual color. Black and white are the supporting
            colors behind the green.
          </p>
        </div>

        <div className="color-palette">
          <div
            className="color-swatch color-swatch-primary"
            style={{ backgroundColor: "#2DE215" }}
          >
            <span style={{ color: "#ffffff" }}>2DE215</span>
          </div>

          <div className="color-swatch-secondary">
            <div className="color-swatch" style={{ backgroundColor: "#ffffff" }}>
              <span style={{ color: "#000000" }}>000000</span>
            </div>
            <div className="color-swatch" style={{ backgroundColor: "#000000" }}>
              <span style={{ color: "#ffffff" }}>FFFFFF</span>
            </div>
          </div>
        </div>
      </div>

      <div className="style-guide-block">
        <div className="rich-text-project">
          <h2>Typography</h2>
          <p>
            Roboto is choosen as the main font. Its clean, geometric letterforms
            stay highly legible at small sizes on mobile screens, and the wide
            range of weights gives a clear visual hierarchy across headings and
            body text. Being a familiar, neutral sans-serif, it keeps the focus
            on the workout content while feeling modern and approachable.
          </p>
        </div>

        <div className="typography-font">
          <h3 className="typography-name">Roboto</h3>
          <p className="typography-weights">Bold, Regular, Light</p>
        </div>

        <div className="typography-specimens">
          {[
            { name: "Heading 1", font: "Roboto Bold", size: "32px" },
            { name: "Heading 2", font: "Roboto Medium", size: "24px" },
            { name: "Body", font: "Roboto Regular", size: "16px" },
            { name: "Caption", font: "Roboto Light", size: "12px" },
          ].map((sp, i) => (
            <div className="typography-specimen" key={i}>
              <h5>{sp.name}</h5>
              <p>{sp.font}</p>
              <p>{sp.size}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
