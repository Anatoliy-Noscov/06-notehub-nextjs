import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import { getNoteById } from "../../../lib/api";
import { getQueryClient } from "../../../lib/api";
import NoteDetailsClient from "./NoteDetails.client";

export default async function NoteDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  const queryClient = getQueryClient();
  const id = Number(params.id);

  await queryClient.prefetchQuery({
    queryKey: ["note", id],
    queryFn: () => getNoteById(id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NoteDetailsClient initialId={id} />
    </HydrationBoundary>
  );
}
