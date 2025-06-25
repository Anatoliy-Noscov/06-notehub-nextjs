"use client";

import css from "./error.module.css";

interface ErrorMessageProps {
  error: Error;
}

export default function ErrorMessage({ error }: ErrorMessageProps) {
  return (
    <div className={css.error}>
      <strong>⚠️ Error</strong>
      <p>{error.message}</p>
    </div>
  );
}
