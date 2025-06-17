import { Types } from "mongoose";

export interface INote {
  title: string;
  content?: string;
  category?: "work" | "personal" | "study" | "other";
  pinned?: boolean;
  tags: {
    label: string;
    color?: string;
  };
  user: Types.ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
}
