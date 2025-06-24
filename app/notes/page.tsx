import { fetchNotes } from "@/lib/api/api";
import NotesClient from "./Notes.client";
import {
  dehydrate,
  HydrationBoundary,
  keepPreviousData,
  QueryClient,
} from "@tanstack/react-query";

export default async function Notes() {
  const initialQuery = "";
  const initialPage = 1;
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["notes", initialQuery, initialPage],
    queryFn: () => fetchNotes(initialQuery, initialPage),
    initialData: keepPreviousData,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient initialQuery={initialQuery} initialPage={initialPage} />
    </HydrationBoundary>
  );
}
