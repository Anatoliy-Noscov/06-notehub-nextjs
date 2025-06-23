"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchNoteById } from "@/lib/api/api";
import css from "./NoteDetails.module.css";

export default function NoteDetails({ id }: { id: string }) {
  const {
    data: note,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(Number(id)),
  });

  if (isLoading) return <p>Loading...</p>;
  if (isError || !note) return <p>Error loading note</p>;

  return (
    <div className={css.container}>
      <div className={css.header}>
        <h2>{note.title}</h2>
        <span className={css.tag}>{note.tag}</span>
      </div>
      <p className={css.content}>{note.content}</p>
      <p className={css.date}>
        Created: {new Date(note.createdAt).toLocaleDateString()}
      </p>
    </div>
  );
}
