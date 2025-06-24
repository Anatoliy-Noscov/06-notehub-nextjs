// export type Tag = "Work" | "Personal" | "Meeting" | "Shopping" | "Todo";

// export interface Note {
//   id: number;
//   title: string;
//   content: string;
//   tag: Tag;
//   createdAt: string;
//   updatedAt: string;
// }

// export interface CreateNoteValues {
//   title: string;
//   content: string;
//   tag: Tag;
// }

// export interface NotesResponse {
//   notes: Note[];
//   totalPages: number;
//   currentPage: number;
// }

// export interface PaginationParams {
//   page: number;
//   perPage?: number;
//   search?: string;
// }
export type Tag =
  | "important"
  | "normal"
  | "critical"
  | "Work"
  | "Personal"
  | "Meeting"
  | "Shopping";

export interface Note {
  id: number;
  title: string;
  content: string;
  tag: Tag;
  createdAt?: string;
}

export interface CreateNoteValues {
  title: string;
  content: string;
  tag: Tag;
}
