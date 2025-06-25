import css from "./SearchBox.module.css";

interface SearchBoxProps {
  onChange: (query: string) => void;
  value: string;
}

export default function SearchBox({ value, onChange }: SearchBoxProps) {
  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    onChange(event.target.value);
  }
  return (
    <>
      <input
        className={css.input}
        value={value}
        onChange={handleChange}
        type="text"
        placeholder="Search notes"
      />
    </>
  );
}
