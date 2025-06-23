"use client";

import { keepPreviousData, useQuery } from "@tanstack/react-query";
import NoteList from "@/components/NoteList/NoteList";
import Pagination from "@/components/Pagination/Pagination";
import SearchBox from "@/components/SearchBox/SearchBox";
import css from "./Note.client.module.css";
import { fetchNotes } from "@/lib/api/api";
import { useState } from "react";
import { useDebounce } from "use-debounce";
import NoteModal from "@/components/NoteModal/NoteModal";
import Loader from "../loading";
import ErrorMessage from "../error";
import NoteForm from "@/components/NoteForm/NoteForm";

interface NotesClientProps {
  initialQuery: string;
  initialPage: number;
}

export default function NotesClient({
  initialQuery,
  initialPage,
}: NotesClientProps) {
  const [query, setQuery] = useState(initialQuery);
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [debounceQuery] = useDebounce(query, 500);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data, isLoading, isError, error, isSuccess } = useQuery({
    queryKey: ["notes", debounceQuery, currentPage],
    queryFn: () => fetchNotes(debounceQuery, currentPage),
    placeholderData: keepPreviousData,
    refetchOnMount: false,
  });

  const notes = data?.notes ?? [];
  const totalPages = data?.totalPages ?? 1;

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
            onPageChange={setCurrentPage}
          />
        )}
        <button className={css.button} onClick={toggleModal}>
          Create note +
        </button>
      </div>

      {isLoading && <Loader />}
      {isError && (
        <ErrorMessage
          message={error.message}
          onRetry={() => window.location.reload()}
        />
      )}
      {isSuccess && <NoteList notes={notes} />}

      {isModalOpen && (
        <NoteModal onClose={closeModal}>
          <NoteForm onSuccess={closeModal} />
        </NoteModal>
      )}
    </div>
  );
}
