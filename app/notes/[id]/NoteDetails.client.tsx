"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchNoteById } from "../../../lib/api";
import Loader from "../../loading";
import { useParams } from "next/navigation";
import ErrorMessage from "./error";
import css from "./NoteDetails.module.css";

export default function NoteDetailsClient({ id }: { id: number }) {
  const params = useParams();
  const noteId = id || Number(params.id);

  const {
    data: note,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["note", noteId],
    queryFn: () => fetchNoteById(noteId),
    enabled: !!noteId,
  });

  if (isLoading) return <Loader />;
  if (isError) return <ErrorMessage error={error} />;
  if (!note) return <ErrorMessage error={new Error("Note not found")} />;

  return (
    <div className={css.container}>
      <div className={css.item}>
        <div className={css.header}>
          <h2>{note.title}</h2>
          <p className={css.tag}>{note.tag}</p>
          <button className={css.editBtn}>Edit note</button>
        </div>
        <p className={css.content}>{note.content}</p>
        <p className={css.date}>
          Created: {new Date(note.createdAt).toLocaleDateString()}
        </p>
      </div>
    </div>
  );
}
