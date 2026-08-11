import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { Draggable } from "gsap/Draggable";
import { InertiaPlugin } from "gsap/InertiaPlugin";
import { CustomEase } from "gsap/CustomEase";
import "./spatial-slider.css";
import startnowImg from "../../../resources/startnow-intro-img.png";
import saintEmberImg from "../../../resources/Mask-group-8.webp";
import insperUImg from "../../../resources/insper-u.png";
import daysChallengeImg from "../../../resources/30days-challange-img.webp";
import iagreeAiImg from "../../../resources/iagree-ai.png";

gsap.registerPlugin(Draggable, InertiaPlugin, CustomEase);
if (!CustomEase.get("spatial")) CustomEase.create("spatial", "0.25, 0.1, 0, 1");

const CARDS = [
  {
    img: startnowImg,
    title: "Start Now Fitness App",
    desc: "First UX case study — research, strategy and visual design.",
    tags: ["Design", "UI/UX"],
  },
  {
    img: saintEmberImg,
    title: "Saint Embers",
    desc: "Shopify storefront with custom sections and a tuned checkout.",
    tags: ["eCommerce", "Shopify"],
  },
  {
    img: insperUImg,
    title: "Insper U",
    desc: "Learning platform concept focused on course discovery.",
    tags: ["Design"],
  },
  {
    img: daysChallengeImg,
    title: "30 Days Challenges",
    desc: "Case studies, final designs and prototypes I've built.",
    tags: ["Design", "Creative"],
  },
  {
    img: iagreeAiImg,
    title: "iAgree AI",
    desc: "Product design for an AI agreement assistant.",
    tags: ["Design", "Web Dev"],
  },
];

const slideDuration = 1;
const clickEase = "spatial";

function debounceOnWidthChange(fn, ms) {
  let lastWidth = window.innerWidth;
  let timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => {
      if (window.innerWidth === lastWidth) return;
      lastWidth = window.innerWidth;
      fn.apply(this, args);
    }, ms);
  };
}

// Sets up (or re-inits) one spatial slider on `container`. Faithful port of the
// Osmo init; it first tears down any previous instance stored on the container.
function initSpatialSlider(container) {
  if (container._spatialSliderDraggable) container._spatialSliderDraggable.kill();
  if (container._spatialSliderImageObserver)
    container._spatialSliderImageObserver.disconnect();
  if (container._spatialSliderProxy) {
    gsap.killTweensOf(container._spatialSliderProxy);
    container._spatialSliderProxy.remove();
  }

  const collection = container.querySelector("[data-spatial-slider-collection]");
  const track = container.querySelector("[data-spatial-slider-list]");
  if (!collection || !track) return;

  gsap.set(track, { clearProps: "transform" });
  container.querySelectorAll("[data-spatial-slider-item]").forEach((item) => {
    gsap.set(item, { clearProps: "transform" });
  });
  container
    .querySelectorAll("[data-spatial-slider-clone]")
    .forEach((el) => el.remove());

  const originalItems = Array.from(
    track.querySelectorAll(
      ":scope > [data-spatial-slider-item]:not([data-spatial-slider-clone])"
    )
  );
  if (!originalItems.length) return;

  container.setAttribute("role", "region");
  container.setAttribute("aria-roledescription", "carousel");
  container.setAttribute(
    "aria-label",
    container.getAttribute("aria-label") || "Spatial Cards Slider"
  );
  track.setAttribute("role", "group");
  track.setAttribute("aria-label", "Slides");

  const dotsWrap = container.querySelector("[data-spatial-slider-generate-dots]");
  if (dotsWrap) {
    const dots = Array.from(
      dotsWrap.querySelectorAll("[data-spatial-slider-control]")
    );
    if (dots.length) {
      const template = dots[0];
      dots.slice(1).forEach((dot) => dot.remove());
      for (let i = 1; i <= originalItems.length; i++) {
        const dot = i === 1 ? template : template.cloneNode(true);
        dot.setAttribute("data-spatial-slider-control", String(i));
        dot.setAttribute("data-spatial-slider-control-status", "not-active");
        if (i > 1) dotsWrap.appendChild(dot);
      }
    }
  }

  const controls = Array.from(
    container.querySelectorAll("[data-spatial-slider-control]")
  );
  const totalEl = container.querySelector("[data-spatial-slider-total-slide]");
  const indicators = Array.from(
    container.querySelectorAll("[data-spatial-slider-active-slide]")
  );
  const mod = (value, total) => ((value % total) + total) % total;
  const formatNumber = (value) => (value < 10 ? "0" + value : String(value));

  if (totalEl) totalEl.textContent = formatNumber(originalItems.length);

  originalItems.forEach((item, index) => {
    item.removeAttribute("data-spatial-slider-item-status");
    item.removeAttribute("aria-hidden");
    item.setAttribute("role", "group");
    item.setAttribute(
      "aria-label",
      `Slide ${index + 1} of ${originalItems.length}`
    );
  });

  controls.forEach((btn) => {
    const value = btn.getAttribute("data-spatial-slider-control");
    if (value === "prev") btn.setAttribute("aria-label", "Previous slide");
    if (value === "next") btn.setAttribute("aria-label", "Next slide");
    if (/^\d+$/.test(value)) {
      btn.setAttribute("aria-label", `Go to slide ${value}`);
      btn.setAttribute("aria-current", "false");
    }
  });

  const containerStyles = getComputedStyle(container);
  const trackStyles = getComputedStyle(track);
  const curve =
    Math.abs(parseFloat(containerStyles.getPropertyValue("--slider-curve"))) ||
    12;
  const directionValue = parseFloat(
    containerStyles.getPropertyValue("--slider-direction")
  );
  const direction = directionValue < 0 ? -1 : 1;
  const gap = parseFloat(trackStyles.columnGap) || 0;
  const curveRadians = (curve * Math.PI) / 180;

  const firstRect = originalItems[0].getBoundingClientRect();
  const itemWidth = firstRect.width;
  const itemHeight = firstRect.height;

  const perspectiveValue = parseFloat(getComputedStyle(track).perspective);
  const perspective = Number.isFinite(perspectiveValue)
    ? perspectiveValue
    : 1200;

  const getProjectedEdgeX = (radius, angle, side) => {
    const radians = (angle * Math.PI) / 180;
    const rotation = -direction * radians;
    const localX = (side * itemWidth) / 2;
    const centerX = Math.sin(radians) * radius;
    const centerZ = direction * radius * (1 - Math.cos(radians));
    const x = centerX + localX * Math.cos(rotation);
    const z = centerZ - localX * Math.sin(rotation);
    return (x * perspective) / (perspective - z);
  };

  let spatialRadius = itemWidth / Math.sin(curveRadians);
  for (let i = 0; i < 8; i++) {
    const nextLeft = getProjectedEdgeX(spatialRadius, curve, -1);
    const currentRight = itemWidth / 2;
    const currentGap = nextLeft - currentRight;
    const correction = gap - currentGap;
    spatialRadius += correction / Math.sin(curveRadians);
  }

  const stepDistance = Math.sin(curveRadians) * spatialRadius;
  const tangentRatio =
    (-direction * spatialRadius) / (perspective - direction * spatialRadius);
  const edgeAngle =
    (Math.acos(gsap.utils.clamp(-1, 1, tangentRatio)) * 180) / Math.PI;
  const maxSideItems = Math.ceil(edgeAngle / curve);
  const maxLoopItems = maxSideItems * 2;

  const getSpatialPosition = (offset) => {
    const angle = gsap.utils.clamp(-edgeAngle, edgeAngle, offset * curve);
    const radians = (angle * Math.PI) / 180;
    return {
      x: Math.sin(radians) * spatialRadius,
      z: direction * spatialRadius * (1 - Math.cos(radians)),
      rotationY: -direction * angle,
    };
  };

  const containerRect = container.getBoundingClientRect();
  const trackRect = track.getBoundingClientRect();
  const originX = trackRect.left + trackRect.width / 2;
  const leftLimit = containerRect.left - originX;
  const rightLimit = containerRect.right - originX;

  const isOffsetInside = (offset) => {
    if (Math.abs(offset * curve) >= edgeAngle) return false;
    const position = getSpatialPosition(offset);
    const scale = perspective / (perspective - position.z);
    const radians = (Math.abs(position.rotationY) * Math.PI) / 180;
    const halfWidth = (Math.abs(Math.cos(radians)) * itemWidth * scale) / 2;
    const x = position.x * scale;
    return x + halfWidth >= leftLimit && x - halfWidth <= rightLimit;
  };

  const getVisibleCount = () => {
    let left = 0;
    let right = 0;
    for (let i = 1; i < maxSideItems && isOffsetInside(i); i++) right = i;
    for (let i = 1; i < maxSideItems && isOffsetInside(-i); i++) left = i;
    return Math.min(maxLoopItems, 1 + left + right + 2);
  };

  const minItemsNeeded = getVisibleCount();
  const neededItems =
    originalItems.length >= minItemsNeeded
      ? originalItems.length
      : Math.ceil(minItemsNeeded / originalItems.length) * originalItems.length;

  for (let i = originalItems.length; i < neededItems; i++) {
    const clone = originalItems[i % originalItems.length].cloneNode(true);
    clone.setAttribute("data-spatial-slider-clone", "");
    clone.setAttribute("aria-hidden", "true");
    track.appendChild(clone);
  }

  const items = Array.from(
    track.querySelectorAll(":scope > [data-spatial-slider-item]")
  );
  const totalItems = items.length;

  track.style.height = itemHeight + "px";
  container.setAttribute("data-spatial-slider-drag-status", "grab");
  items.forEach((item) =>
    item.setAttribute("data-spatial-slider-item-status", "not-active")
  );

  const proxy = document.createElement("div");
  proxy.setAttribute("data-spatial-slider-proxy", "");
  Object.assign(proxy.style, {
    position: "absolute",
    width: "1px",
    height: "1px",
    pointerEvents: "none",
    opacity: "0",
  });
  container.appendChild(proxy);
  container._spatialSliderProxy = proxy;
  gsap.set(proxy, { x: 0 });

  const setX = items.map((item) => gsap.quickSetter(item, "x", "px"));
  const setZ = items.map((item) => gsap.quickSetter(item, "z", "px"));
  const setRotationY = items.map((item) =>
    gsap.quickSetter(item, "rotationY", "deg")
  );

  const getIndex = () => -gsap.getProperty(proxy, "x") / stepDistance;

  const nearestDelta = (index, realIndex) => {
    const loop = Math.round((realIndex - index) / totalItems);
    return index - (realIndex - loop * totalItems);
  };

  const getSlideDelta = (target, realIndex) => {
    let bestDelta = 0;
    let bestDistance = Infinity;
    items.forEach((item, index) => {
      if (index % originalItems.length !== target) return;
      const delta = nearestDelta(index, realIndex);
      const distance = Math.abs(delta);
      if (distance < bestDistance) {
        bestDelta = delta;
        bestDistance = distance;
      }
    });
    return bestDelta;
  };

  let lastActiveIndex = null;
  const updateActiveUI = (activeIndex, activeSlideIndex) => {
    if (activeIndex === lastActiveIndex) return;
    items.forEach((item, index) => {
      item.setAttribute(
        "data-spatial-slider-item-status",
        index === activeIndex ? "active" : "inview"
      );
    });
    indicators.forEach(
      (el) => (el.textContent = formatNumber(activeSlideIndex + 1))
    );
    controls.forEach((btn) => {
      const value = btn.getAttribute("data-spatial-slider-control");
      if (!/^\d+$/.test(value)) return;
      const isActive = parseInt(value, 10) - 1 === activeSlideIndex;
      btn.setAttribute(
        "data-spatial-slider-control-status",
        isActive ? "active" : "not-active"
      );
      btn.setAttribute("aria-current", isActive ? "true" : "false");
    });
    lastActiveIndex = activeIndex;
  };

  const render = () => {
    const realIndex = getIndex();
    const activeIndex = mod(Math.round(realIndex), totalItems);
    const activeSlideIndex = activeIndex % originalItems.length;
    items.forEach((item, index) => {
      const position = getSpatialPosition(nearestDelta(index, realIndex));
      setX[index](position.x);
      setZ[index](position.z);
      setRotationY[index](position.rotationY);
    });
    updateActiveUI(activeIndex, activeSlideIndex);
  };

  controls.forEach((btn) => {
    const value = btn.getAttribute("data-spatial-slider-control");
    btn.disabled = false;
    btn.onclick = () => {
      gsap.killTweensOf(proxy);
      const currentIndex = getIndex();
      let targetIndex;
      if (value === "next" || value === "prev") {
        targetIndex = Math.round(currentIndex) + (value === "next" ? 1 : -1);
      } else if (/^\d+$/.test(value)) {
        const targetSlide = Math.max(
          0,
          Math.min(originalItems.length - 1, parseInt(value, 10) - 1)
        );
        targetIndex = currentIndex + getSlideDelta(targetSlide, currentIndex);
      } else {
        return;
      }
      gsap.to(proxy, {
        x: -targetIndex * stepDistance,
        duration: slideDuration,
        ease: clickEase,
        onUpdate: render,
      });
    };
  });

  container._spatialSliderDraggable = Draggable.create(proxy, {
    type: "x",
    trigger: collection,
    inertia: true,
    throwResistance: 2000,
    dragResistance: 0.05,
    maxDuration: 1,
    minDuration: 0.5,
    edgeResistance: 0.75,
    overshootTolerance: 0,
    snap: (value) => Math.round(value / stepDistance) * stepDistance,
    onDrag: render,
    onThrowUpdate: render,
    onThrowComplete: () => {
      container.setAttribute("data-spatial-slider-drag-status", "grab");
      render();
    },
    onPress: () =>
      container.setAttribute("data-spatial-slider-drag-status", "grabbing"),
    onDragStart: () =>
      container.setAttribute("data-spatial-slider-drag-status", "grabbing"),
    onRelease: () =>
      container.setAttribute("data-spatial-slider-drag-status", "grab"),
  })[0];

  render();

  // Fix for lazy-loading images on Safari
  container._spatialSliderImageObserver = new IntersectionObserver(
    ([entry], observer) => {
      if (!entry.isIntersecting) return;
      container
        .querySelectorAll('[data-spatial-slider-item] img[loading="lazy"]')
        .forEach((img) => {
          img.loading = "eager";
        });
      observer.disconnect();
    }
  );
  container._spatialSliderImageObserver.observe(container);
}

const SpatialSlider = () => {
  const rootRef = useRef(null);

  useEffect(() => {
    const container = rootRef.current?.querySelector(
      "[data-spatial-slider-init]"
    );
    if (!container) return undefined;

    initSpatialSlider(container);

    const onResize = debounceOnWidthChange(
      () => initSpatialSlider(container),
      200
    );
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
      if (container._spatialSliderDraggable)
        container._spatialSliderDraggable.kill();
      if (container._spatialSliderImageObserver)
        container._spatialSliderImageObserver.disconnect();
      if (container._spatialSliderProxy) {
        gsap.killTweensOf(container._spatialSliderProxy);
        container._spatialSliderProxy.remove();
      }
    };
  }, []);

  return (
    <section className="demo-section" ref={rootRef}>
      <div
        data-spatial-slider-init
        data-spatial-slider-drag-status="grab"
        className="spatial-gsap-slider"
      >
        <div
          data-spatial-slider-collection
          className="spatial-gsap-slider__collection"
        >
          <div data-spatial-slider-list className="spatial-gsap-slider__list">
            {CARDS.map((card, i) => (
              <div
                data-spatial-slider-item
                data-spatial-slider-item-status={i === 0 ? "active" : "inview"}
                className="spatial-gsap-slider__item"
                key={i}
              >
                <div className="demo-card">
                  <div className="demo-card__media">
                    <img
                      src={card.img}
                      loading="lazy"
                      alt={card.title}
                      className="cover-image"
                    />
                  </div>
                  <div className="demo-card__info">
                    <h3 className="demo-card__h">{card.title}</h3>
                    <p className="demo-card__desc">{card.desc}</p>
                    <div className="demo-card__tags">
                      {card.tags.map((tag, ti) => (
                        <span className="demo-card__tag" key={ti}>
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="spatial-gsap-slider__controls">
          <button
            data-spatial-slider-control="prev"
            className="spatial-gsap-slider__control-btn"
          >
            Prev
          </button>
          <div
            data-spatial-slider-generate-dots
            className="spatial-gsap-slider__dots"
          >
            {CARDS.map((_, i) => (
              <button
                data-spatial-slider-control={String(i + 1)}
                data-spatial-slider-control-status={
                  i === 0 ? "active" : "not-active"
                }
                className="spatial-gsap-slider__control-dot"
                key={i}
              />
            ))}
          </div>
          <button
            data-spatial-slider-control="next"
            className="spatial-gsap-slider__control-btn is--next"
          >
            Next
          </button>
        </div>
      </div>
    </section>
  );
};

export default SpatialSlider;
