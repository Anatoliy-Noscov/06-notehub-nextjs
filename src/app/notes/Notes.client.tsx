"use client";

import { useQuery } from "@tanstack/react-query";
import NoteList from "@/components/NoteList/NoteList";
import Pagination from "@/components/Pagination/Pagination";
import SearchBox from "@/components/SearchBox/SearchBox";
import NoteModal from "@/components/NoteModal/NoteModal";
import { fetchNotes } from "@/lib/api/api";
import { useState } from "react";
import { useDebounce } from "use-debounce";
import css from "./Note.client.module.css";
import NoteForm from "@/components/NoteForm/NoteForm";
import { keepPreviousData } from "@tanstack/react-query";
import { AnimatePresence } from "framer-motion";
interface NotesClientProps {
  initialQuery: string;
  initialPage: number;
}

export default function NotesClient({
  initialQuery,
  initialPage,
}: NotesClientProps) {
  const [searchTerm, setSearchTerm] = useState(initialQuery);
  const [page, setPage] = useState(initialPage);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [debouncedSearch] = useDebounce(searchTerm, 500);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["notes", debouncedSearch, page],
    queryFn: () => fetchNotes(debouncedSearch, page),
    placeholderData: keepPreviousData,
  });

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    setPage(1);
  };

  return (
    <div className={css.container}>
      <div className={css.toolbar}>
        <SearchBox value={searchTerm} onChange={handleSearchChange} />

        {data?.totalPages && data.totalPages > 1 && (
          <Pagination
            currentPage={page}
            totalPages={data.totalPages}
            onPageChange={setPage}
          />
        )}

        <button className={css.button} onClick={() => setIsModalOpen(true)}>
          Create note +
        </button>
      </div>

      {isLoading && <p>Loading...</p>}
      {isError && <p>Error: {error.message}</p>}
      {data && <NoteList notes={data.notes} />}

      <AnimatePresence>
        {isModalOpen && (
          <NoteModal onClose={() => setIsModalOpen(false)}>
            <NoteForm onSuccess={() => setIsModalOpen(false)} />
          </NoteModal>
        )}
      </AnimatePresence>
    </div>
  );
}
