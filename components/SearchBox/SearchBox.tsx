import React from "react";
import css from "./SearchBox.module.css";

interface SearchBoxProps {
  onChange: (query: string) => void;
  value: string;
}

export default function SearchBox({ value, onChange }: SearchBoxProps) {
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    onChange(e.target.value);
  }

  return (
    <input
      className={css.input}
      type="text"
      placeholder="Search notes"
      value={value}
      onChange={handleChange}
    />
  );
}
