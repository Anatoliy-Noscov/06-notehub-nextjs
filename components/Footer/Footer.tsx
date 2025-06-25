"use client";

import css from "../Footer/Footer.module.css";

export default function Footer() {
  return (
    <footer className={css.footer}>
      <p>
        Contact us: <a href="mailto:student@notehub.app">student@notehub.app</a>
      </p>
      <p>&copy; 2025 NoteHub.</p>
    </footer>
  );
}
