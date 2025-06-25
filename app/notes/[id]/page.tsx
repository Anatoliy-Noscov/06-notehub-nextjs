import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import { getQueryClient } from "../../../lib/react-query";
import { fetchNoteById } from "../../../lib/api";
import NoteDetailsClient from "./NoteDetails.client";

export default async function NotePage({ params }: { params: { id: string } }) {
  const queryClient = getQueryClient();
  const id = Number(params.id);

  if (isNaN(id)) {
    return <div>Invalid note ID</div>;
  }

  await queryClient.prefetchQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NoteDetailsClient id={id} />
    </HydrationBoundary>
  );
}
