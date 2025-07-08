export interface Painting {
  id: string;
  title: string;
  author: string;
  style: "horizontal" | "vertical";
  thumbnail: string;
  content: string;
  status: {
    active: boolean;
    order: number;
  };
}

export type FilterStyle = "all" | "horizontal" | "vertical";
export type FilterStatus = "all" | "active" | "inactive";
export type ModalType = "view" | "edit" | "delete" | "add" | null;
