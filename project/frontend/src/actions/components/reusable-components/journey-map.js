import { Fragment } from "react";
import graphIcon from "../../../resources/graph-icon.png";
import "./reusable-components.css";

export default function JourneyMap({ rows = [] }) {
  const colCount = rows.reduce((max, row) => Math.max(max, row.cells.length), 0);

  return (
    <section className="journey-map-section">
      <div className="journey-map-scroll">
        <div
          className="journey-map-table"
          style={{ gridTemplateColumns: `clamp(36px, 8%, 60px) repeat(${colCount}, minmax(0, 1fr))` }}
        >
          {rows.map((row, ri) => (
            <Fragment key={ri}>
              <div className="journey-map-cell journey-map-label">
                <span>{row.label}</span>
              </div>
              {row.merged ? (
                <div
                  className={[
                    "journey-map-cell",
                    "journey-map-merged",
                    row.tall ? "journey-map-tall" : "",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                  style={{ gridColumn: `span ${colCount}` }}
                >
                  {row.cells[0] || ""}

                  <img src={graphIcon} alt="journey-graph" className="journey-map-graph-img" />
                </div>
              ) : (
                Array.from({ length: colCount }).map((_, ci) => (
                  <div
                    key={ci}
                    className={[
                      "journey-map-cell",
                      row.head ? "journey-map-head" : "",
                      row.italic ? "journey-map-speech" : "",
                      row.tall ? "journey-map-tall" : "",
                    ]
                      .filter(Boolean)
                      .join(" ")}
                  >
                    {row.cells[ci] || ""}
                  </div>
                ))
              )}
            </Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}
