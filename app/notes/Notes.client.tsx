"use client";

import { keepPreviousData, useQuery } from "@tanstack/react-query";
import NoteList from "../../components/NoteList/NoteList";
import Pagination from "../../components/Pagination/Pagination";
import SearchBox from "../../components/SearchBox/SearchBox";
import css from "./NotePage.module.css";
import { fetchNotes } from "../../lib/api";
import { useState } from "react";
import { useDebounce } from "use-debounce";
import NoteModal from "../../components/NoteModal/NoteModal";
import Loader from "../loading";
import ErrorMessage from "./error";
import { Note } from "types/note";

interface NotesClientProps {
  initialNotes: Note[];
  initialQuery: string;
  initialPage: number;
  initialTotalPages: number;
}

export default function NotesClient({
  initialNotes,
  initialQuery,
  initialPage,
  initialTotalPages,
}: NotesClientProps) {
  const [query, setQuery] = useState<string>(initialQuery);
  const [currentPage, setCurrentPage] = useState<number>(initialPage);
  const [debouncedQuery] = useDebounce(query, 500);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["notes", debouncedQuery, currentPage],
    queryFn: () => fetchNotes(debouncedQuery, currentPage),
    placeholderData: keepPreviousData,
    initialData: { notes: initialNotes, totalPages: initialTotalPages },
    refetchOnMount: false,
  });

  const notes = data?.notes ?? initialNotes;
  const totalPages = data?.totalPages ?? initialTotalPages;

  function toggleModal() {
    setIsModalOpen(!isModalOpen);
  }

  function closeModal() {
    setIsModalOpen(false);
  }

  function handleChange(newQuery: string) {
    setQuery(newQuery);
    setCurrentPage(1);
  }

  return (
    <div className={css.app}>
      <div className={css.toolbar}>
        <SearchBox value={query} onChange={handleChange} />
        {totalPages > 1 && (
          <Pagination
            totalPages={totalPages}
            currentPage={currentPage}
            setPage={setCurrentPage}
          />
        )}
        <button className={css.button} onClick={toggleModal}>
          Create note +
        </button>
      </div>

      {isLoading && <Loader />}
      {isError && <ErrorMessage error={error} />}
      {!isLoading && !isError && <NoteList notes={notes} />}
      {isModalOpen && <NoteModal onClose={closeModal} />}
    </div>
  );
}
