import React, { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { Observer } from "gsap/Observer";
import "./infinite-grid.css";

gsap.registerPlugin(Observer);

const WHEEL_SPEED = 0.75; // wheel/trackpad speed
const DRAG_SPEED = 1.25; // drag speed

/**
 * Osmo "infinite draggable grid": a seamlessly wrapping canvas of cards you can
 * drag or scroll in any direction.
 *
 * `items` is [{ src, alt, landscape }]. The grid clones them to fill the
 * viewport, so a handful of images is enough — repetition is inherent to it.
 *
 * Ported from the vanilla snippet into a React effect. Two changes matter:
 * GSAP comes from the installed package rather than CDN <script> tags, and
 * every listener/observer/timeout is torn down on unmount (the original leaked
 * a window resize listener, which under StrictMode's double-invoke would stack
 * up duplicate handlers and rebuild the grid repeatedly).
 */
const InfiniteGrid = ({ items = [] }) => {
  const wrapperRef = useRef(null);
  const collectionRef = useRef(null);
  const sourceRef = useRef(null);

  useLayoutEffect(() => {
    const wrapper = wrapperRef.current;
    const collection = collectionRef.current;
    const sourceList = sourceRef.current?.querySelector(
      "[data-infinite-grid-list]"
    );
    if (!wrapper || !collection || !sourceList) return undefined;

    const originalItems = Array.from(
      sourceList.querySelectorAll("[data-infinite-grid-item]")
    );
    if (!originalItems.length) return undefined;

    let observer;
    let resizeTimer;
    let retryTimer;
    let scrollTimeout;
    let tileWidth = 0;
    let tileHeight = 0;
    let currentX = 0;
    let currentY = 0;
    let xTo;
    let yTo;

    const setStatus = (status) => {
      wrapper.setAttribute("data-infinite-grid-status", status);
    };

    function buildGrid() {
      // Bail if the wrapper has no layout yet: item width is intrinsic so it
      // still measures fine, and we'd silently build a 1-column grid.
      // The ResizeObserver below normally catches this, but it's driven by the
      // rendering steps and so is paused in background tabs — retry on a timer
      // too, otherwise loading the page in a background tab leaves it empty.
      if (!wrapper.clientWidth || !wrapper.clientHeight) {
        clearTimeout(retryTimer);
        retryTimer = setTimeout(buildGrid, 100);
        return;
      }

      if (observer) observer.kill();
      setStatus("loading");
      collection.innerHTML = "";

      // Measure a real (but hidden) item so column/row counts match the CSS.
      const measureItem = originalItems[0].cloneNode(true);
      measureItem.style.position = "absolute";
      measureItem.style.visibility = "hidden";
      measureItem.style.pointerEvents = "none";
      wrapper.appendChild(measureItem);

      const itemRect = measureItem.getBoundingClientRect();
      const itemWidth = itemRect.width;
      const itemHeight = itemRect.height;
      measureItem.remove();

      if (!itemWidth || !itemHeight) return;

      const columns = Math.max(
        1,
        Math.ceil(wrapper.clientWidth / itemWidth) + 1
      );
      const rows = Math.max(1, Math.ceil(wrapper.clientHeight / itemHeight) + 1);
      const requiredItems = columns * rows;
      const wantedItems = Math.max(requiredItems, originalItems.length);
      const itemsPerList = Math.ceil(wantedItems / columns) * columns;
      const fragment = document.createDocumentFragment();

      // 4 tiles (2x2) so the wrap never exposes an edge.
      for (let listIndex = 0; listIndex < 4; listIndex++) {
        const list = sourceList.cloneNode(false);
        list.style.setProperty("--grid-columns", columns);
        if (listIndex > 0) list.setAttribute("aria-hidden", "true");

        for (let itemIndex = 0; itemIndex < itemsPerList; itemIndex++) {
          const item =
            originalItems[itemIndex % originalItems.length].cloneNode(true);
          if (listIndex > 0) item.setAttribute("aria-hidden", "true");
          list.appendChild(item);
        }
        fragment.appendChild(list);
      }

      collection.appendChild(fragment);
      // Called directly rather than inside requestAnimationFrame: rAF is paused
      // in background tabs, so the grid would sit at opacity 0 until the tab is
      // focused. Reading getBoundingClientRect() in setGrid forces layout anyway.
      setGrid();
    }

    function setGrid() {
      const lists = Array.from(
        collection.querySelectorAll("[data-infinite-grid-list]")
      );
      const firstList = lists[0];
      if (!firstList) return;

      const firstItem = firstList.querySelector("[data-infinite-grid-item]");
      if (!firstItem) return;

      const listRect = firstList.getBoundingClientRect();
      const itemRect = firstItem.getBoundingClientRect();

      tileWidth = listRect.width;
      tileHeight = listRect.height;
      const itemHeight = itemRect.height;

      gsap.set(lists[0], { xPercent: 0, yPercent: 0 });
      gsap.set(lists[1], { xPercent: 100, yPercent: 0 });
      gsap.set(lists[2], { xPercent: 0, yPercent: 100 });
      gsap.set(lists[3], { xPercent: 100, yPercent: 100 });

      const wrapX = gsap.utils.wrap(-tileWidth, 0);
      const wrapY = gsap.utils.wrap(-tileHeight, 0);

      currentX = wrapX((wrapper.clientWidth - tileWidth) * 0.5);
      currentY = wrapY((wrapper.clientHeight - itemHeight) * 0.5);

      xTo = gsap.quickTo(collection, "x", {
        duration: 1.2,
        ease: "expo.out",
        modifiers: { x: gsap.utils.unitize(wrapX) },
      });

      yTo = gsap.quickTo(collection, "y", {
        duration: 1.2,
        ease: "expo.out",
        modifiers: { y: gsap.utils.unitize(wrapY) },
      });

      gsap.set(collection, { x: currentX, y: currentY });

      setStatus("idle");

      observer = Observer.create({
        target: wrapper,
        type: "wheel,touch,pointer",
        preventDefault: true,
        dragMinimum: 3,
        onPress() {
          setStatus("dragging");
        },
        onRelease() {
          setStatus("idle");
        },
        onStop() {
          setStatus("idle");
        },
        onChangeX(self) {
          handleMovement(self, "x");
        },
        onChangeY(self) {
          handleMovement(self, "y");
        },
      });
    }

    function handleMouseLeave() {
      setStatus("idle");
      if (observer) {
        observer.disable();
        observer.enable();
      }
    }

    function handleMovement(self, axis) {
      const isWheel = self.event.type === "wheel";

      if (isWheel) {
        setStatus("scrolling");
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => setStatus("idle"), 200);
      }

      const multiplier = isWheel ? WHEEL_SPEED : DRAG_SPEED;
      const delta = gsap.utils.clamp(
        -80,
        80,
        self[`delta${axis.toUpperCase()}`] * multiplier
      );

      if (axis === "x") {
        currentX += isWheel ? -delta : delta;
        xTo(currentX);
      } else {
        currentY += isWheel ? -delta : delta;
        yTo(currentY);
      }
    }

    // A ResizeObserver rather than a window resize listener: it also covers the
    // first paint, where the wrapper can still measure 0 wide. Building then
    // would compute a 1-column grid (item width is intrinsic, so it measures
    // fine either way and the bad column count goes unnoticed).
    let lastWidth = 0;
    let lastHeight = 0;

    const resizeObserver = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      if (!width || !height) return; // not laid out yet — wait for a real size
      if (
        Math.round(width) === lastWidth &&
        Math.round(height) === lastHeight
      ) {
        return;
      }
      lastWidth = Math.round(width);
      lastHeight = Math.round(height);

      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(buildGrid, 200);
    });

    document.documentElement.addEventListener("mouseleave", handleMouseLeave);
    resizeObserver.observe(wrapper);
    // Build straight away when layout is already available; the observer is the
    // fallback for the first-paint-with-no-width case and later resizes.
    lastWidth = Math.round(wrapper.clientWidth);
    lastHeight = Math.round(wrapper.clientHeight);
    buildGrid();

    return () => {
      clearTimeout(resizeTimer);
      clearTimeout(retryTimer);
      clearTimeout(scrollTimeout);
      resizeObserver.disconnect();
      document.documentElement.removeEventListener(
        "mouseleave",
        handleMouseLeave
      );
      if (observer) observer.kill();
      gsap.killTweensOf(collection);
      // Clones are plain DOM we created, so clearing here is safe — React
      // never rendered into .infinite-grid__collection.
      collection.innerHTML = "";
    };
  }, [items]);

  return (
    <section
      ref={wrapperRef}
      data-infinite-grid-status="loading"
      className="infinite-grid"
      data-lenis-prevent
    >
      {/* Template React owns; the effect clones items out of it. */}
      <div ref={sourceRef} className="infinite-grid__source" aria-hidden="true">
        <div data-infinite-grid-list className="infinite-grid__list">
          {items.map((item, i) => (
            <div
              key={i}
              data-infinite-grid-item
              className="infinite-grid__item"
            >
              <div
                className={`infinite-grid__card${
                  item.landscape ? " is--landscape" : ""
                }`}
              >
                <img
                  src={item.src}
                  loading="lazy"
                  alt={item.alt || ""}
                  className="infinite-grid__card-img"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div ref={collectionRef} className="infinite-grid__collection" />
    </section>
  );
};

export default InfiniteGrid;
