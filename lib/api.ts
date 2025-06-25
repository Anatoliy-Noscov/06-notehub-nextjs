import axios from "axios";
import type { CreateNoteValues, Note } from "@/types/note";
import toast from "react-hot-toast";

axios.defaults.baseURL = process.env.NEXT_PUBLIC_NOTEHUB_API_URL;

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
): Promise<FetchNotesValues> {
  const perPage = 12;
  const params: ParamsTypes = { page, perPage };
  if (search?.trim()) {
    params.search = search.trim();
  }

  try {
    const res = await axios.get<FetchNotesValues>("/notes", {
      params,
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`,
      },
    });
    return res.data;
  } catch (error) {
    toast.error(error instanceof Error ? error.message : String(error));
    throw error; // важно пробросить ошибку дальше для React Query
  }
}

export async function fetchNoteById(id: number): Promise<Note> {
  try {
    const res = await axios.get<Note>(`/notes/${id}`, {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`,
      },
    });
    return res.data;
  } catch (error) {
    toast.error(error instanceof Error ? error.message : String(error));
    throw error;
  }
}

export async function createNote({
  title,
  content,
  tag,
}: CreateNoteValues): Promise<Note> {
  try {
    const res = await axios.post<Note>(
      "/notes",
      { title, content, tag },
      {
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`,
        },
      },
    );
    return res.data;
  } catch (error) {
    toast.error(error instanceof Error ? error.message : String(error));
    throw error;
  }
}

export async function deleteNote(id: number): Promise<Note> {
  try {
    const res = await axios.delete<Note>(`/notes/${id}`, {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`,
      },
    });
    return res.data;
  } catch (error) {
    toast.error(error instanceof Error ? error.message : String(error));
    throw error;
  }
}

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InN2b2RudXk3Nzc3QGdtYWlsLmNvbSIsImlhdCI6MTc0OTc1OTcxOH0.57DaCmA2P8lLZOjkTKLSOECzkqHJpwzECB_QymOUK5k

// `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`
