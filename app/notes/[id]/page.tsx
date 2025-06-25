import React from "react";
import { notFound } from "next/navigation";
import NotesClient from "./NoteDetails.client";
import { prefetchQuery } from "../../../lib/queryClient";
import { fetchNoteById } from "lib/api";
import { HydrationBoundary } from "@tanstack/react-query";

interface Params {
  params: { id: string };
}

export default async function NoteDetailsPage({
  params,
}: Params): Promise<React.JSX.Element> {
  const id = parseInt(params.id, 10);
  if (isNaN(id)) notFound();

  const queryClient = await prefetchQuery(["note", id], () =>
    fetchNoteById(id),
  );

  return (
    <HydrationBoundary state={queryClient.getQueryData(["note", id])}>
      <NotesClient initialId={id} />
    </HydrationBoundary>
  );
}
