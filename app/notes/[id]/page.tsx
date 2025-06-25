import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import { QueryClient } from "@tanstack/react-query";
import { fetchNoteById } from "../../../lib/api";
import NoteDetailsClient from "./NoteDetails.client";

export default async function NotePage({ params }: { params: { id: string } }) {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["note", params.id],
    queryFn: () => fetchNoteById(Number(params.id)),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NoteDetailsClient id={Number(params.id)} />
    </HydrationBoundary>
  );
}
