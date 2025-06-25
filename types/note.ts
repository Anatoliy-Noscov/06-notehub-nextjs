export interface Note {
  id: number;
  title: string;
  content: string;
  tag: Tag;
  createdAt: string;
  updatedAt: string;
}

export interface CreateNoteValues {
  title: string;
  content?: string;
  tag: Tag;
}

type Tag = "Work" | "Personal" | "Meeting" | "Shopping" | "Todo";
