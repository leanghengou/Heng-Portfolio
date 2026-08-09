import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { Draggable } from "gsap/Draggable";
import { InertiaPlugin } from "gsap/InertiaPlugin";
import "./image-slider.css";

gsap.registerPlugin(Draggable, InertiaPlugin);

const SLIDES = [
  {
    img: "https://cdn.prod.website-files.com/67696d1cd4b1d776a63f0f94/690b581ba59c96e073460cd1_Cinematic%20Motion%20Portrait.avif",
    label: "Image nº005",
  },
  {
    img: "https://cdn.prod.website-files.com/67696d1cd4b1d776a63f0f94/690b581b4e66ce6d99185126_Child%20in%20Sunset%20Meadow.avif",
    label: "Image nº001",
    active: true,
  },
  {
    img: "https://cdn.prod.website-files.com/67696d1cd4b1d776a63f0f94/690b581b644385ab3c4845f8_Woman%20in%20Coastal%20Field.avif",
    label: "Image nº002",
  },
  {
    img: "https://cdn.prod.website-files.com/67696d1cd4b1d776a63f0f94/690b581bae1e27262dcfe889_Runner%20at%20Golden%20Hour.avif",
    label: "Image nº003",
  },
  {
    img: "https://cdn.prod.website-files.com/67696d1cd4b1d776a63f0f94/690b581b7c6e8ac0e1960406_Golden%20Hour%20Serenity.avif",
    label: "Layout nº004",
  },
];

// ---- Osmo horizontalLoop helper (unmodified logic; exposes ctx cleanup) ----
function horizontalLoop(items, config) {
  let timeline;
  items = gsap.utils.toArray(items);
  config = config || {};
  const ctx = gsap.context(() => {
    let onChange = config.onChange,
      lastIndex = 0,
      tl = gsap.timeline({
        repeat: config.repeat,
        onUpdate:
          onChange &&
          function () {
            let i = tl.closestIndex();
            if (lastIndex !== i) {
              lastIndex = i;
              onChange(items[i], i);
            }
          },
        paused: config.paused,
        defaults: { ease: "none" },
        onReverseComplete: () =>
          tl.totalTime(tl.rawTime() + tl.duration() * 100),
      }),
      length = items.length,
      startX = items[0].offsetLeft,
      times = [],
      widths = [],
      spaceBefore = [],
      xPercents = [],
      curIndex = 0,
      indexIsDirty = false,
      center = config.center,
      pixelsPerSecond = (config.speed || 1) * 100,
      snap =
        config.snap === false ? (v) => v : gsap.utils.snap(config.snap || 1),
      timeOffset = 0,
      container =
        center === true
          ? items[0].parentNode
          : gsap.utils.toArray(center)[0] || items[0].parentNode,
      totalWidth,
      getTotalWidth = () =>
        items[length - 1].offsetLeft +
        (xPercents[length - 1] / 100) * widths[length - 1] -
        startX +
        spaceBefore[0] +
        items[length - 1].offsetWidth *
          gsap.getProperty(items[length - 1], "scaleX") +
        (parseFloat(config.paddingRight) || 0),
      populateWidths = () => {
        let b1 = container.getBoundingClientRect(),
          b2;
        items.forEach((el, i) => {
          widths[i] = parseFloat(gsap.getProperty(el, "width", "px"));
          xPercents[i] = snap(
            (parseFloat(gsap.getProperty(el, "x", "px")) / widths[i]) * 100 +
              gsap.getProperty(el, "xPercent")
          );
          b2 = el.getBoundingClientRect();
          spaceBefore[i] = b2.left - (i ? b1.right : b1.left);
          b1 = b2;
        });
        gsap.set(items, {
          xPercent: (i) => xPercents[i],
        });
        totalWidth = getTotalWidth();
      },
      timeWrap,
      populateOffsets = () => {
        timeOffset = center
          ? (tl.duration() * (container.offsetWidth / 2)) / totalWidth
          : 0;
        center &&
          times.forEach((t, i) => {
            times[i] = timeWrap(
              tl.labels["label" + i] +
                (tl.duration() * widths[i]) / 2 / totalWidth -
                timeOffset
            );
          });
      },
      getClosest = (values, value, wrap) => {
        let i = values.length,
          closest = 1e10,
          index = 0,
          d;
        while (i--) {
          d = Math.abs(values[i] - value);
          if (d > wrap / 2) {
            d = wrap - d;
          }
          if (d < closest) {
            closest = d;
            index = i;
          }
        }
        return index;
      },
      populateTimeline = () => {
        let i, item, curX, distanceToStart, distanceToLoop;
        tl.clear();
        for (i = 0; i < length; i++) {
          item = items[i];
          curX = (xPercents[i] / 100) * widths[i];
          distanceToStart = item.offsetLeft + curX - startX + spaceBefore[0];
          distanceToLoop =
            distanceToStart + widths[i] * gsap.getProperty(item, "scaleX");
          tl.to(
            item,
            {
              xPercent: snap(((curX - distanceToLoop) / widths[i]) * 100),
              duration: distanceToLoop / pixelsPerSecond,
            },
            0
          )
            .fromTo(
              item,
              {
                xPercent: snap(
                  ((curX - distanceToLoop + totalWidth) / widths[i]) * 100
                ),
              },
              {
                xPercent: xPercents[i],
                duration:
                  (curX - distanceToLoop + totalWidth - curX) / pixelsPerSecond,
                immediateRender: false,
              },
              distanceToLoop / pixelsPerSecond
            )
            .add("label" + i, distanceToStart / pixelsPerSecond);
          times[i] = distanceToStart / pixelsPerSecond;
        }
        timeWrap = gsap.utils.wrap(0, tl.duration());
      },
      refresh = (deep) => {
        let progress = tl.progress();
        tl.progress(0, true);
        populateWidths();
        deep && populateTimeline();
        populateOffsets();
        deep && tl.draggable
          ? tl.time(times[curIndex], true)
          : tl.progress(progress, true);
      },
      onResize = () => refresh(true),
      proxy;
    gsap.set(items, { x: 0 });
    populateWidths();
    populateTimeline();
    populateOffsets();
    window.addEventListener("resize", onResize);
    function toIndex(index, vars) {
      vars = vars || {};
      Math.abs(index - curIndex) > length / 2 &&
        (index += index > curIndex ? -length : length);
      let newIndex = gsap.utils.wrap(0, length, index),
        time = times[newIndex];
      if (time > tl.time() !== index > curIndex && index !== curIndex) {
        time += tl.duration() * (index > curIndex ? 1 : -1);
      }
      if (time < 0 || time > tl.duration()) {
        vars.modifiers = { time: timeWrap };
      }
      curIndex = newIndex;
      vars.overwrite = true;
      gsap.killTweensOf(proxy);
      return vars.duration === 0
        ? tl.time(timeWrap(time))
        : tl.tweenTo(time, vars);
    }
    tl.toIndex = (index, vars) => toIndex(index, vars);
    tl.closestIndex = (setCurrent) => {
      let index = getClosest(times, tl.time(), tl.duration());
      if (setCurrent) {
        curIndex = index;
        indexIsDirty = false;
      }
      return index;
    };
    tl.current = () => (indexIsDirty ? tl.closestIndex(true) : curIndex);
    tl.next = (vars) => toIndex(tl.current() + 1, vars);
    tl.previous = (vars) => toIndex(tl.current() - 1, vars);
    tl.refresh = refresh;
    tl.times = times;
    tl.progress(1, true).progress(0, true);
    if (config.reversed) {
      tl.vars.onReverseComplete();
      tl.reverse();
    }
    if (config.draggable && typeof Draggable === "function") {
      proxy = document.createElement("div");
      let wrap = gsap.utils.wrap(0, 1),
        ratio,
        startProgress,
        draggable,
        lastSnap,
        initChangeX,
        wasPlaying,
        align = () =>
          tl.progress(
            wrap(startProgress + (draggable.startX - draggable.x) * ratio)
          ),
        syncIndex = () => tl.closestIndex(true);
      typeof InertiaPlugin === "undefined" &&
        console.warn(
          "InertiaPlugin required for momentum-based scrolling and snapping. https://greensock.com/club"
        );
      draggable = Draggable.create(proxy, {
        trigger: items[0].parentNode,
        type: "x",
        allowContextMenu: true,
        onPressInit() {
          let x = this.x;
          gsap.killTweensOf(tl);
          wasPlaying = !tl.paused();
          tl.pause();
          startProgress = tl.progress();
          refresh();
          ratio = 1 / totalWidth;
          initChangeX = startProgress / -ratio - x;
          gsap.set(proxy, { x: startProgress / -ratio });
        },
        onDrag: align,
        onThrowUpdate: align,
        overshootTolerance: 0,
        inertia: true,
        snap(value) {
          if (Math.abs(startProgress / -ratio - this.x) < 10) {
            return lastSnap + initChangeX;
          }
          let time = -(value * ratio) * tl.duration(),
            wrappedTime = timeWrap(time),
            snapTime = times[getClosest(times, wrappedTime, tl.duration())],
            dif = snapTime - wrappedTime;
          Math.abs(dif) > tl.duration() / 2 &&
            (dif += dif < 0 ? tl.duration() : -tl.duration());
          lastSnap = (time + dif) / tl.duration() / -ratio;
          return lastSnap;
        },
        onRelease() {
          syncIndex();
          draggable.isThrowing && (indexIsDirty = true);
        },
        onThrowComplete: () => {
          syncIndex();
          wasPlaying && tl.play();
        },
      })[0];
      tl.draggable = draggable;
    }
    tl.closestIndex(true);
    lastIndex = curIndex;
    onChange && onChange(items[curIndex], curIndex);
    timeline = tl;
    return () => window.removeEventListener("resize", onResize);
  });
  // expose the context so callers can fully revert (listeners + draggable)
  timeline.contextRevert = () => ctx.revert();
  return timeline;
}

const ImageSlider = () => {
  const rootRef = useRef(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return undefined;

    const cleanups = [];
    const ctx = gsap.context(() => {
      const wrapper = root.querySelector('[data-slider="list"]');
      if (!wrapper) return;

      const slides = gsap.utils.toArray(root.querySelectorAll('[data-slider="slide"]'));
      const nextButton = root.querySelector('[data-slider-button="next"]');
      const prevButton = root.querySelector('[data-slider-button="prev"]');

      const totalElement = root.querySelector('[data-slide-count="total"]');
      const stepElement = root.querySelector('[data-slide-count="step"]');
      const stepsParent = stepElement?.parentElement;

      let activeElement;
      const totalSlides = slides.length;

      if (totalElement)
        totalElement.textContent =
          totalSlides < 10 ? `0${totalSlides}` : totalSlides;

      if (stepsParent && stepElement) {
        stepsParent.innerHTML = "";
        slides.forEach((_, index) => {
          const stepClone = stepElement.cloneNode(true);
          stepClone.textContent =
            index + 1 < 10 ? `0${index + 1}` : index + 1;
          stepsParent.appendChild(stepClone);
        });
      }
      const allSteps = stepsParent
        ? stepsParent.querySelectorAll('[data-slide-count="step"]')
        : [];

      const mq = window.matchMedia("(min-width: 992px)");
      let useNextForActive = mq.matches;
      const onMqChange = (e) => {
        useNextForActive = e.matches;
        if (currentEl) applyActive(currentEl, currentIndex, false);
      };
      mq.addEventListener("change", onMqChange);
      cleanups.push(() => mq.removeEventListener("change", onMqChange));

      let currentEl = null;
      let currentIndex = 0;

      function resolveActive(el) {
        return useNextForActive ? el.nextElementSibling || slides[0] : el;
      }

      function applyActive(el, index, animateNumbers = true) {
        if (activeElement) activeElement.classList.remove("active");
        const target = resolveActive(el);
        target.classList.add("active");
        activeElement = target;

        if (allSteps.length) {
          if (animateNumbers) {
            gsap.to(allSteps, {
              y: `${-100 * index}%`,
              ease: "power3",
              duration: 0.45,
            });
          } else {
            gsap.set(allSteps, { y: `${-100 * index}%` });
          }
        }
      }

      const loop = horizontalLoop(slides, {
        paused: true,
        draggable: true,
        center: false,
        onChange: (element, index) => {
          currentEl = element;
          currentIndex = index;
          applyActive(element, index, true);
        },
      });
      cleanups.push(() => loop.contextRevert && loop.contextRevert());

      function mapClickIndex(i) {
        return useNextForActive ? i - 1 : i;
      }
      slides.forEach((slide, i) => {
        const onClick = () => {
          if (slide.classList.contains("active")) return;
          loop.toIndex(mapClickIndex(i), { ease: "power3", duration: 0.725 });
        };
        slide.addEventListener("click", onClick);
        cleanups.push(() => slide.removeEventListener("click", onClick));
      });

      const onNext = () => loop.next({ ease: "power3", duration: 0.725 });
      const onPrev = () => loop.previous({ ease: "power3", duration: 0.725 });
      nextButton?.addEventListener("click", onNext);
      prevButton?.addEventListener("click", onPrev);
      cleanups.push(() => nextButton?.removeEventListener("click", onNext));
      cleanups.push(() => prevButton?.removeEventListener("click", onPrev));

      if (!currentEl && slides[0]) {
        currentEl = slides[0];
        currentIndex = 0;
        applyActive(currentEl, currentIndex, false);
      }

      // The loop caches its belt width at init; if the layout keeps settling
      // afterwards (images, fonts, hot-reload) that cached belt goes stale and
      // shows a seam gap. Re-measure once things have settled.
      const settle = () => loop.refresh && loop.refresh(true);
      const raf1 = requestAnimationFrame(() => requestAnimationFrame(settle));
      const settleTimer = setTimeout(settle, 400);
      const imgs = root.querySelectorAll(".slide__img");
      imgs.forEach((img) => {
        if (img.complete) return;
        const done = () => {
          img.removeEventListener("load", done);
          img.removeEventListener("error", done);
          settle();
        };
        img.addEventListener("load", done);
        img.addEventListener("error", done);
        cleanups.push(() => {
          img.removeEventListener("load", done);
          img.removeEventListener("error", done);
        });
      });
      cleanups.push(() => {
        cancelAnimationFrame(raf1);
        clearTimeout(settleTimer);
      });
    }, root);

    return () => {
      cleanups.forEach((fn) => fn());
      ctx.revert();
    };
  }, []);

  return (
    <div className="slider__section" ref={rootRef}>
      <div className="slider__overlay">
        <div className="slider__overlay-inner">
          <div className="slider__overlay-count">
            <div className="slider__count-col">
              <h2 data-slide-count="step" className="slider__count-heading">
                01
              </h2>
            </div>
            <div className="slider__count-divider" />
            <div className="slider__count-col">
              <h2 data-slide-count="total" className="slider__count-heading">
                04
              </h2>
            </div>
          </div>
          <div className="slider__overlay-nav">
            <button
              aria-label="previous slide"
              data-slider-button="prev"
              className="slider__btn"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="100%"
                viewBox="0 0 17 12"
                fill="none"
                className="slider__btn-arrow"
              >
                <path
                  d="M6.28871 12L7.53907 10.9111L3.48697 6.77778H16.5V5.22222H3.48697L7.53907 1.08889L6.28871 0L0.5 6L6.28871 12Z"
                  fill="currentColor"
                />
              </svg>
              <div className="slider__btn-overlay">
                <div className="slider__btn-overlay-corner" />
                <div className="slider__btn-overlay-corner top-right" />
                <div className="slider__btn-overlay-corner bottom-left" />
                <div className="slider__btn-overlay-corner bottom-right" />
              </div>
            </button>
            <button
              aria-label="next slide"
              data-slider-button="next"
              className="slider__btn"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="100%"
                viewBox="0 0 17 12"
                fill="none"
                className="slider__btn-arrow next"
              >
                <path
                  d="M6.28871 12L7.53907 10.9111L3.48697 6.77778H16.5V5.22222H3.48697L7.53907 1.08889L6.28871 0L0.5 6L6.28871 12Z"
                  fill="currentColor"
                />
              </svg>
              <div className="slider__btn-overlay">
                <div className="slider__btn-overlay-corner" />
                <div className="slider__btn-overlay-corner top-right" />
                <div className="slider__btn-overlay-corner bottom-left" />
                <div className="slider__btn-overlay-corner bottom-right" />
              </div>
            </button>
          </div>
        </div>
      </div>
      <div className="slider__main">
        <div className="slider__wrap">
          <div data-slider="list" className="slider__list">
            {SLIDES.map((slide, i) => (
              <div
                data-slider="slide"
                className={`slider__slide ${slide.active ? "active" : ""}`}
                key={i}
              >
                <div className="slider__slide-inner">
                  <img src={slide.img} alt={slide.label} className="slide__img" />
                  <div className="slide__caption">
                    <div className="slide__caption-dot" />
                    <p className="slide__caption-label">{slide.label}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageSlider;
