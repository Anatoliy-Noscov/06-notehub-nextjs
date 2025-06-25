"use client";

import { fetchNoteById } from "../../../lib/api";
import Loader from "../../loading";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import ErrorMessage from "./error";
import css from "./NoteDetails.module.css";

interface NoteDetailsClientProps {
  initialId?: number;
}

export default function NoteDetailsClient({
  initialId,
}: NoteDetailsClientProps) {
  const { id } = useParams<{ id: string }>();
  const noteId = initialId !== undefined ? initialId : Number(id);
  const {
    data: note,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["note", noteId],
    queryFn: () => fetchNoteById(noteId),
    refetchOnMount: false,
    enabled: !isNaN(noteId),
  });

  if (isNaN(noteId)) {
    return <ErrorMessage error={new Error("Invalid note ID")} />;
  }

  if (isLoading) return <Loader />;
  if (isError && !note) {
    return <p>Something went wrong.</p>;
  }

  if (!note) return <ErrorMessage error={new Error("Note not found")} />;

  return (
    <div className={css.container}>
      <div className={css.item}>
        <div className={css.header}>
          <h2>{note.title}</h2>
          <p className={css.tag}>{String(note.tag)}</p>
          <button className={css.editBtn}>Edit note</button>
        </div>
        <p className={css.content}>{note.content}</p>
        <p className={css.date}>Created date: {note.createdAt}</p>
      </div>
    </div>
  );
}
