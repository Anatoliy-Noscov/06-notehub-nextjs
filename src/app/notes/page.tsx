import { fetchNotes } from "@/lib/api/api";
import NotesClient from "./Notes.client";
import { QueryClient} from "@tanstack/react-query";

export default async function NotesPage() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["notes", "", 1],
    queryFn: () => fetchNotes("", 1),
  });

  return (
    <NotesClient
      initialQuery=""
      initialPage={1}
    />
  );
}
