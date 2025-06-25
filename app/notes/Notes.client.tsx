"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchNotes } from "../../lib/api";
import NoteList from "../../components/NoteList/NoteList";
import SearchBox from "../../components/SearchBox/SearchBox";
import Pagination from "../../components/Pagination/Pagination";
import NoteModal from "../../components/NoteModal/NoteModal";
import { useState } from "react";
import { useDebounce } from "use-debounce";
import css from "./Note.client.module.css";
import { FetchNotesResponse } from "types/note";

interface NotesClientProps {
  initialData?: FetchNotesResponse;
  initialQuery?: string;
  initialPage?: number;
}

export default function NotesClient({
  initialData,
  initialQuery = "",
  initialPage = 1,
}: NotesClientProps) {
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [debouncedQuery] = useDebounce(searchQuery, 500);
  const [page, setPage] = useState(initialPage);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data: notesData } = useQuery<FetchNotesResponse>({
    queryKey: ["notes", { query: debouncedQuery, page }],
    queryFn: () => fetchNotes(debouncedQuery, page),
    initialData,
  });

  const notes = notesData?.notes || [];
  const totalPages = notesData?.totalPages || 1;

  return (
    <div className={css.app}>
      <div className={css.toolbar}>
        <SearchBox
          value={searchQuery}
          onChange={(value) => {
            setSearchQuery(value);
            setPage(1);
          }}
        />
        <button className={css.button} onClick={() => setIsModalOpen(true)}>
          Create note +
        </button>
      </div>

      <NoteList notes={notes} />

      {totalPages > 1 && (
        <Pagination
          totalPages={totalPages}
          currentPage={page}
          setPage={setPage}
        />
      )}

      <NoteModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}
