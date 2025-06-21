import axios from "axios";
import { type Note } from "../../app/types/note";

// export type Note = {
//   id: string;
//   title: string;
//   content: string;
//   categoryId: string;
//   userId: string;
//   createdAt: string;
//   updatedAt: string;
// };

// export type NoteListResponse = {
//   notes: Note[];
//   total: number;
// };

// axios.defaults.baseURL = "https://next-docs-api.onrender.com";

// const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// export const getNotes = async () => {
//   await delay(2000);
//   const res = await axios.get<NoteListResponse>("/notes");
//   return res.data;
// };

export const getSingleNote = async (id: string) => {
  const res = await axios.get<Note>(`/notes/${id}`);
  return res.data;
};

axios.defaults.baseURL = "https://notehub-public.goit.study/api";

export interface FetchNotesParams {
  page?: number;
  perPage?: number;
  search?: string;
}

export interface NotesResponse {
  notes: Note[];
  totalPages: number;
  currentPage: number;
}

export interface NewNote {
  title: string;
  content: string;
  tag: "Todo" | "Work" | "Personal" | "Meeting" | "Shopping";
}

export const getNotes = async (params: FetchNotesParams = {}) => {
  const requestParams: FetchNotesParams = {
    page: params.page || 1,
    perPage: 12,
  };

  if (params.search && params.search.trim() !== "") {
    requestParams.search = params.search.trim();
  }

  const response = await axios.get<NotesResponse>("/notes", {
    params: requestParams,
    headers: {
      Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InN2b2RudXk3Nzc3QGdtYWlsLmNvbSIsImlhdCI6MTc0OTc1OTcxOH0.57DaCmA2P8lLZOjkTKLSOECzkqHJpwzECB_QymOUK5k`,
    },
  });

  return response.data;
};

export const deleteNote = async (id: number) => {
  await axios.delete(`/notes/${id}`, {
    headers: {
      Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InN2b2RudXk3Nzc3QGdtYWlsLmNvbSIsImlhdCI6MTc0OTc1OTcxOH0.57DaCmA2P8lLZOjkTKLSOECzkqHJpwzECB_QymOUK5k`,
    },
  });
};

export const addNote = async (noteData: NewNote) => {
  const response = await axios.post<Note>("/notes", noteData, {
    headers: {
      Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InN2b2RudXk3Nzc3QGdtYWlsLmNvbSIsImlhdCI6MTc0OTc1OTcxOH0.57DaCmA2P8lLZOjkTKLSOECzkqHJpwzECB_QymOUK5k`,
    },
  });
  return response.data;
};

// NEXT_PUBLIC_NOTEHUB_TOKEN =
//   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InN2b2RudXk3Nzc3QGdtYWlsLmNvbSIsImlhdCI6MTc0OTc1OTcxOH0.57DaCmA2P8lLZOjkTKLSOECzkqHJpwzECB_QymOUK5k";

// ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}
