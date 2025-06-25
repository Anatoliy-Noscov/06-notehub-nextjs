import axios from "axios";
import type { CreateNoteValues, Note } from "../types/note";
import toast from "react-hot-toast";

axios.defaults.baseURL = "https://notehub-public.goit.study/api";

interface ParamsTypes {
  page: number;
  perPage: number;
  search?: string;
}

interface FetchNotesValues {
  notes: Note[];
  totalPages: number;
}

export async function fetchNotes(
  search: string,
  page: number,
): Promise<FetchNotesValues | undefined> {
  try {
    const perPage = 12;
    const params: ParamsTypes = {
      page,
      perPage,
    };
    if (search?.trim()) {
      params.search = search;
    }
    const res = await axios.get<FetchNotesValues>("/notes", {
      params,
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`,
      },
    });
    return res.data;
  } catch (error) {
    toast.error(error instanceof Error ? error.message : String(error));
  }
}

export async function createNote({
  title,
  content,
  tag,
}: CreateNoteValues): Promise<Note | undefined> {
  try {
    const params: CreateNoteValues = {
      title,
      content,
      tag,
    };

    const res = await axios.post<Note>("/notes", params, {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`,
      },
    });
    return res.data;
  } catch (error) {
    toast.error(error instanceof Error ? error.message : String(error));
  }
}

export async function deleteNote(id: number): Promise<Note | undefined> {
  try {
    const res = await axios.delete<Note>(`/notes/${id}`, {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`,
      },
    });
    return res.data;
  } catch (error) {
    toast.error(error instanceof Error ? error.message : String(error));
  }
}

export default async function fetchNoteId(
  id: number,
): Promise<Note | undefined> {
  try {
    const res = await axios.get<Note>(`notes/${id}`, {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`,
      },
    });
    return res.data;
  } catch (error) {
    toast.error(error instanceof Error ? error.message : String(error));
  }
}
