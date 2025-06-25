export interface Note {
  id: number;
  title: string;
  content: string;
  tag: Tag;
  createdAt: string;
  updatedAt: string;
}

export type Tag = "low" | "medium" | "high";

export interface CreateNoteValues {
  title: string;
  content: string;
  tag: Tag;
}
