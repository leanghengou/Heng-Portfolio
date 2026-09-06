import React, { useRef } from "react";
import { Link } from "react-router-dom";
import "./directional-list.css";

// A list whose rows fill on hover with a tile that enters from the edge the
// pointer actually crossed, and leaves through the edge it exits by. The tile
// is moved with inline transforms rather than classes: the entry position has
// to be set and then animated away within the same event, which needs a forced
// reflow between the two writes.

const TRANSFORMS = {
  top: "translateY(-100%)",
  bottom: "translateY(100%)",
  left: "translateX(-100%)",
  right: "translateX(100%)",
};

// `type` narrows the answer: "y" only ever reports top/bottom, "x" left/right,
// anything else picks whichever edge the pointer is nearest.
const getDirection = (event, el, type) => {
  const { left, top, width: w, height: h } = el.getBoundingClientRect();
  const x = event.clientX - left;
  const y = event.clientY - top;

  if (type === "y") return y < h / 2 ? "top" : "bottom";
  if (type === "x") return x < w / 2 ? "left" : "right";

  const distances = { top: y, right: w - x, bottom: h - y, left: x };

  return Object.entries(distances).reduce((a, b) => (a[1] < b[1] ? a : b))[0];
};

// Columns are positional: the first is the lead, the last is the trailing
// meta column, and everything between them flexes. Three is the shape this was
// drawn for, but two or four still lay out.
const roleFor = (index, total) => {
  if (index === 0) return "lead";
  if (index === total - 1 && total > 1) return "meta";
  return "main";
};

// The behaviour on its own, for rows that want the wipe but not this markup —
// the project listing drives its own layout through it. Put `hoverRef` on the
// element the pointer enters and `tileRef` on the panel that slides; they can
// be different elements, since only the outer one's box decides the edge.
export const useDirectionalHover = (type = "y") => {
  const hoverRef = useRef(null);
  const tileRef = useRef(null);

  const slide = (event, phase) => {
    const el = hoverRef.current;
    const tile = tileRef.current;
    if (!el || !tile) return;

    const dir = getDirection(event, el, type);
    el.dataset.status = `${phase}-${dir}`;

    if (phase === "leave") {
      tile.style.transform = TRANSFORMS[dir] || "translate(0, 0)";
      return;
    }

    // Park the tile off the entry edge with no transition, flush that write,
    // then hand the transition back so the slide in is the only animated step.
    tile.style.transition = "none";
    tile.style.transform = TRANSFORMS[dir] || "translate(0, 0)";
    void tile.offsetHeight;
    tile.style.transition = "";
    tile.style.transform = "translate(0%, 0%)";
  };

  return {
    hoverRef,
    tileRef,
    onMouseEnter: (event) => slide(event, "enter"),
    onMouseLeave: (event) => slide(event, "leave"),
  };
};

const DirectionalListItem = ({ item, columns, type }) => {
  const { hoverRef, tileRef, onMouseEnter, onMouseLeave } =
    useDirectionalHover(type);

  const content = (
    <>
      <div className="directional-list__hover-tile" ref={tileRef} aria-hidden="true" />
      <div className="directional-list__border is--item" aria-hidden="true" />

      {columns.map((column, i) => (
        <div
          key={column.key || column.label || i}
          className={`directional-list__col is--${roleFor(i, columns.length)}`}
        >
          <p className="directional-list__p">{item.cells[i]}</p>
        </div>
      ))}
    </>
  );

  const props = {
    ref: hoverRef,
    className: "directional-list__item",
    // Carries per-row custom properties (--tile-img) through to the tile.
    style: item.style,
    onMouseEnter,
    onMouseLeave,
  };

  // An external link opens in a new tab; an internal one routes through the
  // router so the page transition still plays. Neither is required — an item
  // with no destination renders as plain text.
  if (item.href) {
    return (
      <a {...props} href={item.href} target="_blank" rel="noopener noreferrer">
        {content}
      </a>
    );
  }

  if (item.to) {
    return (
      <Link {...props} to={item.to}>
        {content}
      </Link>
    );
  }

  return <div {...props}>{content}</div>;
};

const DirectionalList = ({ columns, items, type = "y", className = "" }) => (
  <div className={`directional-list ${className}`.trim()} data-type={type}>
    {/* Label row only when the columns are actually named — unlabelled
        columns would render as an empty band above the first row. */}
    {columns.some((column) => column.label) && (
      <div className="directional-list__info">
        {columns.map((column, i) => (
          <div
            key={column.key || column.label || i}
            className={`directional-list__col is--${roleFor(i, columns.length)}`}
          >
            <p className="directional-list__eyebrow">{column.label}</p>
          </div>
        ))}
      </div>
    )}

    <div className="directional-list__collection">
      <div className="directional-list__list">
        {items.map((item, i) => (
          <DirectionalListItem
            key={item.key || i}
            item={item}
            columns={columns}
            type={type}
          />
        ))}
      </div>
    </div>

    <div className="directional-list__border" aria-hidden="true" />
  </div>
);

export default DirectionalList;
