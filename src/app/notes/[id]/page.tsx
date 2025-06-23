// src/app/notes/[id]/page.tsx
import { fetchNoteById } from "@/lib/api/api";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import NoteDetailsClient from "./NoteDetails.client";

export default async function NotePage({ params }: { params: { id: string } }) {
  const queryClient = new QueryClient();
  const noteId = Number(params.id);

  try {
    await queryClient.prefetchQuery({
      queryKey: ["note", noteId],
      queryFn: () => fetchNoteById(noteId),
    });
  } catch (error) {
    console.error("Failed to fetch note:", error);
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NoteDetailsClient />
    </HydrationBoundary>
  );
}
