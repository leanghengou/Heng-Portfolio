import React, { useEffect, useRef, useState } from "react";
import "./contact-slide-panel.css";

// Where submissions are sent. There's no backend in this project, so the form
// hands the message off to the visitor's mail client via a mailto: draft —
// swap this for the address you want to receive on.
const CONTACT_EMAIL = "hello@example.com";

const EMPTY = { name: "", email: "", subject: "", message: "" };

// Deliberately loose: the point is to catch typos like a missing "@", not to
// police valid-but-unusual addresses.
const isEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());

const validate = (values) => {
  const errors = {};
  if (!values.name.trim()) errors.name = "Please add your name.";
  if (!values.email.trim()) errors.email = "Please add your email.";
  else if (!isEmail(values.email)) errors.email = "That email doesn't look right.";
  if (!values.message.trim()) errors.message = "Please add a message.";
  return errors;
};

const ContactSlidePanel = ({ open, onClose }) => {
  const [values, setValues] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [sent, setSent] = useState(false);
  const firstFieldRef = useRef(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  // Lock the page (stop Lenis + freeze html/body) while the panel is open
  useEffect(() => {
    if (!open) return;
    const lenis = window.__lenis;
    const html = document.documentElement;
    const body = document.body;
    const prevHtml = html.style.overflow;
    const prevBody = body.style.overflow;

    lenis?.stop();
    html.style.overflow = "hidden";
    body.style.overflow = "hidden";

    return () => {
      lenis?.start();
      html.style.overflow = prevHtml;
      body.style.overflow = prevBody;
    };
  }, [open]);

  // Opening focuses the first field once the slide-in has finished — focusing
  // it while the panel is still off-screen makes the browser scroll to it.
  // Closing resets the form, delayed past the slide-out so the wipe isn't seen.
  useEffect(() => {
    if (open) {
      const id = setTimeout(() => firstFieldRef.current?.focus(), 420);
      return () => clearTimeout(id);
    }
    const id = setTimeout(() => {
      setValues(EMPTY);
      setErrors({});
      setSent(false);
    }, 450);
    return () => clearTimeout(id);
  }, [open]);

  const onChange = (e) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
    // Clear a field's error as soon as it's being fixed; re-checked on submit.
    setErrors((prev) => (prev[name] ? { ...prev, [name]: undefined } : prev));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const found = validate(values);
    setErrors(found);
    if (Object.keys(found).length > 0) return;

    const subject =
      values.subject.trim() || `Portfolio enquiry — ${values.name.trim()}`;
    const body = `${values.message.trim()}\n\n—\n${values.name.trim()}\n${values.email.trim()}`;

    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;

    setSent(true);
  };

  return (
    <div
      className={`contact-panel-root ${open ? "is-open" : ""}`}
      aria-hidden={!open}
    >
      <div
        className="contact-panel-backdrop"
        onClick={onClose}
        data-lenis-prevent
      />

      <aside
        className="contact-panel"
        role="dialog"
        aria-modal="true"
        aria-label="Contact Heng"
      >
        <button className="contact-panel-close" onClick={onClose}>
          Close tab <span aria-hidden="true">✕</span>
        </button>

        <div className="contact-panel-scroll" data-lenis-prevent>
          <section className="contact-panel-section">
            <span className="contact-panel-status">
              <span className="contact-panel-dot" aria-hidden="true" />
              Available for new work
            </span>
            <h3>Get in touch</h3>
            <p>
              Have a project, a role, or an idea you want to talk through? Send a
              note and I'll get back to you.
            </p>
          </section>

          <section className="contact-panel-section">
            {sent ? (
              <div className="contact-panel-sent" role="status">
                <h3>Your draft is ready</h3>
                <p>
                  Your mail app should have opened with the message filled in —
                  hit send there and it's on its way. Nothing happened? Write to{" "}
                  <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
                </p>
                <button
                  type="button"
                  className="contact-panel-again"
                  onClick={() => {
                    setValues(EMPTY);
                    setErrors({});
                    setSent(false);
                  }}
                >
                  Write another
                </button>
              </div>
            ) : (
              /* noValidate: the inputs keep their semantic types for mobile
                 keyboards and autofill, but the messages are ours so they match
                 the panel instead of the browser's native bubbles. */
              <form
                className="contact-panel-form"
                onSubmit={onSubmit}
                noValidate
              >
                <div className="contact-panel-row">
                  <div className="contact-panel-field">
                    <label htmlFor="contact-name">Name</label>
                    <input
                      ref={firstFieldRef}
                      id="contact-name"
                      name="name"
                      type="text"
                      autoComplete="name"
                      placeholder="Your name"
                      value={values.name}
                      onChange={onChange}
                      aria-invalid={errors.name ? "true" : undefined}
                    />
                    {errors.name && (
                      <span className="contact-panel-error">{errors.name}</span>
                    )}
                  </div>

                  <div className="contact-panel-field">
                    <label htmlFor="contact-email">Email</label>
                    <input
                      id="contact-email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      placeholder="you@company.com"
                      value={values.email}
                      onChange={onChange}
                      aria-invalid={errors.email ? "true" : undefined}
                    />
                    {errors.email && (
                      <span className="contact-panel-error">{errors.email}</span>
                    )}
                  </div>
                </div>

                <div className="contact-panel-field">
                  <label htmlFor="contact-subject">
                    Subject{" "}
                    <span className="contact-panel-optional">optional</span>
                  </label>
                  <input
                    id="contact-subject"
                    name="subject"
                    type="text"
                    placeholder="What's it about?"
                    value={values.subject}
                    onChange={onChange}
                  />
                </div>

                <div className="contact-panel-field">
                  <label htmlFor="contact-message">Message</label>
                  <textarea
                    id="contact-message"
                    name="message"
                    rows={6}
                    placeholder="Tell me about the project, the timeline, and what you need."
                    value={values.message}
                    onChange={onChange}
                    aria-invalid={errors.message ? "true" : undefined}
                  />
                  {errors.message && (
                    <span className="contact-panel-error">{errors.message}</span>
                  )}
                </div>

                <button type="submit" className="contact-panel-submit">
                  Send message <span aria-hidden="true">→</span>
                </button>
              </form>
            )}
          </section>
        </div>
      </aside>
    </div>
  );
};

export default ContactSlidePanel;
