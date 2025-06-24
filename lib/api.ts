import axios from "axios";
import { type Note, type CreateNoteValues } from "@/types/note";
import { QueryClient } from "@tanstack/react-query";

const api = axios.create({
  baseURL: "https://notehub-public.goit.study/api",
  headers: {
    Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InN2b2RudXk3Nzc3QGdtYWlsLmNvbSIsImlhdCI6MTc0OTc1OTcxOH0.57DaCmA2P8lLZOjkTKLSOECzkqHJpwzECB_QymOUK5k`,
  },
});

interface NotesResponse {
  notes: Note[];
  totalPages: number;
  currentPage: number;
}

export const getNotes = async (
  query: string = "",
  page: number = 1,
): Promise<NotesResponse> => {
  const response = await api.get<NotesResponse>("/notes", {
    params: {
      search: query,
      page,
      perPage: 12,
    },
  });
  return response.data;
};

export const getNoteById = async (id: number) => {
  const response = await api.get<Note>(`/notes/${id}`);
  return response.data;
};

export const createNote = async (values: CreateNoteValues) => {
  const response = await api.post<Note>("/notes", values);
  return response.data;
};

export const deleteNote = async (id: number) => {
  const response = await api.delete<Note>(`/notes/${id}`);
  return response.data;
};

export const fetchNoteById = async (id: number): Promise<Note> => {
  const response = await api.get(`/notes/${id}`);
  return response.data;
};

export const getQueryClient = () => new QueryClient();
// const API_TOKEN = `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`;

// const API_TOKEN = `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InN2b2RudXk3Nzc3QGdtYWlsLmNvbSIsImlhdCI6MTc0OTc1OTcxOH0.57DaCmA2P8lLZOjkTKLSOECzkqHJpwzECB_QymOUK5k`;
