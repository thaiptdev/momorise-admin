export interface Painting {
  id: string;
  title: string;
  author: string;
  style: "horizontal" | "vertical";
  thumbnail: string;
  content: string;
}

export type FilterStyle = "all" | "horizontal" | "vertical";
export type ModalType = "view" | "edit" | "delete" | "add" | null;
