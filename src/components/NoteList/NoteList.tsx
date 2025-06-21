// import { Note } from "@/lib/api/api";
// import NoteItem from "../NoteItem/NoteItem";

// type Props = {
//   notes: Note[];
// };

// const NoteList = ({ notes }: Props) => {
//   return (
//     <ul>
//       {notes.map((note) => (
//         <NoteItem key={note.id} item={note} />
//       ))}
//     </ul>
//   );
// };

// export default NoteList;

import css from "./NoteList.module.css";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteNote } from "@/lib/api/api";
import { type Note } from "../../app/types/note";

interface NoteListProps {
  notes: Note[];
}

export default function NoteList({ notes }: NoteListProps) {
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: deleteNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
    },
  });

  return (
    <ul className={css.list}>
      {notes.map((note) => (
        <li key={note.id} className={css.listItem}>
          <h2 className={css.title}>{note.title}</h2>
          <p className={css.content}>{note.content}</p>
          <div className={css.footer}>
            <span className={css.tag}>{note.tag}</span>

            <button
              className={css.button}
              type="button"
              onClick={() => mutate(note.id)}
            >
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}
