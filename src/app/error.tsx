"use client";
import css from "../app/error.module.css";

export default function Error({
  message,
  onRetry,
}: {
  message: string;
  onRetry: () => void;
}) {
  return (
    <div className={css.toast}>
      <span>{message}</span>
      <button onClick={onRetry}>Retry</button>
    </div>
  );
}
