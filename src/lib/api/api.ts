import axios from "axios";
import { type Note, type CreateNoteValues } from "@/types/note";

axios.defaults.baseURL = "https://notehub-public.goit.study/api";
axios.defaults.headers.common.Authorization = `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`;

export interface NotesResponse {
  notes: Note[];
  totalPages: number;
}

export const fetchNotes = async (
  search: string,
  page: number,
): Promise<NotesResponse> => {
  const params = {
    page,
    perPage: 12,
    ...(search && { search }),
  };

  const { data } = await axios.get<NotesResponse>("/notes", { params });
  return data;
};

export const fetchNoteById = async (id: number): Promise<Note> => {
  const { data } = await axios.get<Note>(`/notes/${id}`);
  return data;
};

export const createNote = async (noteData: CreateNoteValues): Promise<Note> => {
  const { data } = await axios.post<Note>("/notes", noteData);
  return data;
};

export const deleteNote = async (id: number): Promise<void> => {
  await axios.delete(`/notes/${id}`);
};

export const showToast = (message: string, type: "success" | "error") => {
  if (typeof window !== "undefined") {
    if (type === "success") {
      alert(`✅ ${message}`);
    } else {
      alert(`❌ ${message}`);
    }
  }
};

// NEXT_PUBLIC_NOTEHUB_TOKEN =
//   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InN2b2RudXk3Nzc3QGdtYWlsLmNvbSIsImlhdCI6MTc0OTc1OTcxOH0.57DaCmA2P8lLZOjkTKLSOECzkqHJpwzECB_QymOUK5k";

// ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}
