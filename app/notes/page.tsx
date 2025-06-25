import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import { getQueryClient } from "../../lib/react-query";
import { fetchNotes } from "../../lib/api";
import NotesClient from "./Notes.client";
import { FetchNotesResponse } from "types/note";

export default async function NotesPage() {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["notes"],
    queryFn: () => fetchNotes("", 1),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient
        initialData={queryClient.getQueryData(["notes"]) as FetchNotesResponse}
      />
    </HydrationBoundary>
  );
}
