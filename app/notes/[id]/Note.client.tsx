"use client";
import { useQuery } from "@tanstack/react-query";
import { fetchNoteById } from "@/lib/api/api";
import { Note } from "@/types/note";
import Link from "next/link";
import css from "./NoteDetails.module.css";

interface NoteDetailsClientProps {
  initialNote: Note;
}

export default function NoteDetailsClient({
  initialNote,
}: NoteDetailsClientProps) {
  const {
    data: note,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["note", initialNote.id],
    queryFn: () => fetchNoteById(initialNote.id),
    initialData: initialNote,
  });

  if (isLoading) return <p>Loading, please wait...</p>;
  if (error) return <p>Error: {error.message}</p>;
  if (!note) return <p>Note not found</p>;

  return (
    <div className={css.container}>
      <div className={css.item}>
        <div className={css.header}>
          <h2>{note.title}</h2>
          <Link href={`/notes`} className={css.editBtn}>
            Back to notes
          </Link>
        </div>
        <p className={css.content}>{note.content}</p>
        <p className={css.date}>
          {new Date(note.createdAt).toLocaleDateString()}
        </p>
      </div>
    </div>
  );
}
