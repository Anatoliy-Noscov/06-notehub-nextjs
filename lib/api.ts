import axios from "axios";
import type { CreateNoteValues, Note } from "@/types/note";
import toast from "react-hot-toast";

axios.defaults.baseURL = process.env.NEXT_PUBLIC_NOTEHUB_API_URL;
axios.defaults.headers.common["Authorization"] =
  `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`;

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

export async function fetchNotes(
  query: string,
  page: number,
): Promise<FetchNotesResponse> {
  try {
    const res = await axios.get("/notes", {
      params: {
        query: query.trim(),
        page,
        perPage: 10,
      },
    });
    return res.data;
  } catch (error) {
    toast.error(error instanceof Error ? error.message : String(error));
    throw error;
  }
}

export async function fetchNoteById(id: number): Promise<Note> {
  try {
    const res = await axios.get(`/notes/${id}`);
    return res.data;
  } catch (error) {
    toast.error(error instanceof Error ? error.message : String(error));
    throw error;
  }
}

export async function createNote(values: CreateNoteValues): Promise<Note> {
  try {
    const res = await axios.post("/notes", values);
    return res.data;
  } catch (error) {
    toast.error(error instanceof Error ? error.message : String(error));
    throw error;
  }
}

export async function updateNote(
  id: number,
  values: CreateNoteValues,
): Promise<Note> {
  try {
    const res = await axios.put(`/notes/${id}`, values);
    return res.data;
  } catch (error) {
    toast.error(error instanceof Error ? error.message : String(error));
    throw error;
  }
}

export async function deleteNote(id: number): Promise<void> {
  try {
    await axios.delete(`/notes/${id}`);
  } catch (error) {
    toast.error(error instanceof Error ? error.message : String(error));
    throw error;
  }
}

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InN2b2RudXk3Nzc3QGdtYWlsLmNvbSIsImlhdCI6MTc0OTc1OTcxOH0.57DaCmA2P8lLZOjkTKLSOECzkqHJpwzECB_QymOUK5k

// `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`
