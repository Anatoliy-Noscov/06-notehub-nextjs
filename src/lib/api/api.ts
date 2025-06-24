import axios from "axios";
import { type Note, type CreateNoteValues } from "@/types/note";
import toast from "react-hot-toast";

const apiClient = axios.create({
  baseURL: "https://notehub-public.goit.study/api",
});

// const API_TOKEN = `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InN2b2RudXk3Nzc3QGdtYWlsLmNvbSIsImlhdCI6MTc0OTc1OTcxOH0.57DaCmA2P8lLZOjkTKLSOECzkqHJpwzECB_QymOUK5k`;

const API_TOKEN = `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`;

// const API_TOKEN = `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InN2b2RudXk3Nzc3QGdtYWlsLmNvbSIsImlhdCI6MTc0OTc1OTcxOH0.57DaCmA2P8lLZOjkTKLSOECzkqHJpwzECB_QymOUK5k`;

apiClient.interceptors.request.use((config) => {
  config.headers.Authorization = API_TOKEN;
  return config;
});

interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

export async function fetchNotes(
  search: string,
  page: number,
): Promise<FetchNotesResponse | undefined> {
  try {
    const params = {
      page,
      perPage: 12,
      ...(search.trim() && { search }),
    };

    const { data } = await apiClient.get<FetchNotesResponse>("/notes", {
      params,
    });
    return data;
  } catch (error) {
    handleApiError(error);
    return undefined;
  }
}

export const fetchNoteById = async (id: number): Promise<Note> => {
  try {
    const { data } = await apiClient.get<Note>(`/notes/${id}`);
    return data;
  } catch (error) {
    console.error("API Error:", error);
    throw new Error("Failed to fetch note");
  }
};

export async function createNote(
  noteData: CreateNoteValues,
): Promise<Note | undefined> {
  try {
    const { data } = await apiClient.post<Note>("/notes", noteData);
    toast.success("Note created successfully!");
    return data;
  } catch (error) {
    handleApiError(error);
    return undefined;
  }
}

export async function deleteNote(id: number): Promise<void> {
  try {
    await apiClient.delete(`/notes/${id}`);
    toast.success("Note deleted successfully!");
  } catch (error) {
    handleApiError(error);
  }
}

function handleApiError(error: unknown) {
  const message =
    error instanceof Error ? error.message : "Unknown error occurred";
  toast.error(message);
  console.error("API Error:", error);
}

export const showToast = (message: string, type: "success" | "error") => {
  if (typeof window === "undefined") return;
  if (type === "success") {
    toast.success(message);
  } else {
    toast.error(message);
  }
};
