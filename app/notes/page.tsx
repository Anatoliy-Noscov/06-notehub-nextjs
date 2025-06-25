import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import { getQueryClient } from "../../lib/react-query";
import { fetchNotes } from "../../lib/api";
import NotesClient from "./Notes.client";
import type { FetchNotesResponse } from "../../lib/api";

export default async function NotesPage() {
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery<FetchNotesResponse>({
    queryKey: ["notes", { query: "", page: 1 }],
    queryFn: () => fetchNotes("", 1),
  });

  const data = queryClient.getQueryData<FetchNotesResponse>([
    "notes",
    { query: "", page: 1 },
  ]);

  const initialNotes = data?.notes || [];

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient
        initialNotes={initialNotes}
        initialQuery=""
        initialPage={1}
      />
    </HydrationBoundary>
  );
}
