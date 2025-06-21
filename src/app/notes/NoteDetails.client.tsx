"use client";

import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { getSingleNote } from "@/lib/api/api";

import React from "react";

const NoteDetailsClient = () => {
  const { id } = useParams<{ id: string }>();

  const {
    data: note,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["note", id],
    queryFn: () => getSingleNote(id),
    refetchOnMount: false,
  });

  if (isLoading) return <p>Loading, please wait...</p>;

  if (error || !note) return <p>Something went wrong.</p>;

  const formattedDate = note.updatedAt
    ? `Updated at: ${note.updatedAt}`
    : `Created at: ${note.createdAt}`;

  return (
    <div className={css.container}>
      <div className={css.item}>
        <div className={css.header}>
          <h2>Note title</h2>
          <button className={css.editBtn}>Edit note</button>
        </div>
        <p className={css.content}>Note content</p>
        <p className={css.date}>Created date</p>
      </div>
    </div>

    // <div>
    //   <h2>{note.title}</h2>
    //   <p>{note.content}</p>
    //   <p>{formattedDate}</p>
    // </div>
  );
};

export default NoteDetailsClient;
