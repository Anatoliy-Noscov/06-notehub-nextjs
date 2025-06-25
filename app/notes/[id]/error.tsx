"use client";

interface ErrorProps {
  error: Error;
}

export default function ErrorMessage({ error }: ErrorProps) {
  return (
    <div className="error">
      <h2>Error loading note</h2>
      <p>{error.message}</p>
    </div>
  );
}
