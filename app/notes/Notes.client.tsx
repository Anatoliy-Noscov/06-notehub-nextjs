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

interface NotesClientProps {
  initialQuery: string;
  initialPage: number;
}

export default function NotesClient({
  initialQuery,
  initialPage,
}: NotesClientProps) {
  const [query, setQuery] = useState<string>(initialQuery);
  const [currentPage, setCurrentPage] = useState<number>(initialPage);
  const [debounceQuery] = useDebounce(query, 500);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const { data, isLoading, isError, error, isSuccess } = useQuery({
    queryKey: ["notes", debounceQuery, currentPage],
    queryFn: () => fetchNotes(debounceQuery, currentPage),
    placeholderData: keepPreviousData,
    refetchOnMount: false,
  });

  function toggleModal() {
    setIsModalOpen(!isModalOpen);
  }
  function closeModal() {
    setIsModalOpen(false);
  }

  const notesRequest = data?.notes ?? [];
  const totalPage = data?.totalPages ?? 1;

  function handleChange(newQuery: string) {
    setQuery(newQuery);
    setCurrentPage(1);
  }

  return (
    <div className={css.app}>
      <div className={css.toolbar}>
        <SearchBox value={query} onChange={handleChange} />
        {totalPage > 1 && (
          <Pagination
            totalPages={totalPage}
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
      {isSuccess && <NoteList notes={notesRequest} />}
      {isModalOpen && <NoteModal onClose={closeModal} />}
    </div>
  );
}
