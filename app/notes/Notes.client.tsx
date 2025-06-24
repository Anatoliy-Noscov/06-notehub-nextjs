"use client";

import { useQuery } from "@tanstack/react-query";
import { getNotes } from "../../lib/api";
import NoteList from "../../components/NoteList/NoteList";
import SearchBox from "../../components/SearchBox/SearchBox";
import Pagination from "../../components/Pagination/Pagination";
import { NoteModal } from "../../components/NoteModal/NoteModal";
import NoteForm from "../../components/NoteForm/NoteForm";
import { useState } from "react";
import { useEffect } from "react";

export function NotesClient() {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [debouncedQuery, setDebouncedQuery] = useState(query);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedQuery(query), 500);
    return () => clearTimeout(timer);
  }, [query]);

  const { data: notesData } = useQuery({
    queryKey: ["notes", debouncedQuery, page],
    queryFn: () => getNotes(debouncedQuery, page),
  });

  return (
    <>
      <SearchBox value={query} onChange={setQuery} />
      <button onClick={() => setIsModalOpen(true)}>Create Note</button>
      <NoteList notes={notesData?.notes || []} />
      <Pagination
        currentPage={page}
        totalPages={notesData?.totalPages || 10} // Прямая подстановка без лишней переменной
        onPageChange={setPage}
      />
      <NoteModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <NoteForm
          onSuccess={() => setIsModalOpen(false)}
          onClose={() => setIsModalOpen(false)}
        />
      </NoteModal>
    </>
  );
}
