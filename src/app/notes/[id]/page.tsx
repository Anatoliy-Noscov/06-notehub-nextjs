import { fetchNoteById } from "@/lib/api/api"
import { QueryClient } from "@tanstack/react-query";
import NoteDetails from "./NoteDetails.client";

export default async function NotePage({ params }: { params: { id: string } }) {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["note", params.id],
    queryFn: () => fetchNoteById(Number(params.id)),
  });

  return <NoteDetails id={params.id} />;
}
