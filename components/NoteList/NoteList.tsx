import css from "./NoteList.module.css";
import type { Note } from "../../types/note";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteNote } from "../../lib/api";
import toast, { Toaster } from "react-hot-toast";
import Link from "next/link";

interface NoteListProps {
  notes: Note[];
}

export default function NoteList({ notes }: NoteListProps) {
  const queryClient = useQueryClient();
  const mutationDelete = useMutation({
    mutationFn: deleteNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      toast.success("Done! The note has been deleted.");
    },
    onError: () => {
      toast.error("Oops! Something went wrong — the note wasn't deleted.");
    },
  });

  function handleDelete(noteId: number) {
    mutationDelete.mutate(noteId);
  }
  return (
    <>
      <ul className={css.list}>
        {notes.length > 0 &&
          notes.map((note) => (
            <li className={css.listItem} key={note.id}>
              <h2 className={css.title}>{note.title}</h2>
              <p className={css.content}>{note.content}</p>
              <div className={css.footer}>
                <span className={css.tag}>{note.tag}</span>
                <Link href={`notes/${note.id}`} className={css.link}>
                  View details
                </Link>
                <button
                  className={css.button}
                  onClick={() => {
                    handleDelete(note.id);
                  }}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
      </ul>
      <Toaster />
    </>
  );
}
