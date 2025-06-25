"use client";

import fetchNoteId from "../../../lib/api";
import Loader from "../../loading";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import ErrorMessage from "../error";
import css from "./NoteDetails.module.css";

export default function NoteDetailsClient() {
  const { id } = useParams<{ id: string }>();
  const noteId = +id;
  const {
    data: note,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["note", noteId],
    queryFn: () => fetchNoteId(noteId),
    refetchOnMount: false,
  });

  return (
    <>
      {isLoading && <Loader />}
      {isError && !note && <ErrorMessage error={error} />}
      {note && (
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
      )}
    </>
  );
}
