export interface Note {
  id: number;
  title: string;
  content: string;
  tag: Tag;
  createdAt: string;
  updatedAt: string;
}

export type Tag = "Todo" | "Work" | "Personal" | "Meeting" | "Shopping";

export interface CreateNoteValues {
  title: string;
  content: string;
  tag: Tag;
}

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}
