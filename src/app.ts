import express, { Application, Request, Response } from "express";
import { model, Schema } from "mongoose";

const app: Application = express();
app.use(express.json());

const noteSchema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    content: { type: String, default: "" },
    category: {
      type: String,
      enum: ["work", "personal", "study", "other"],
      default: "personal",
    },
    pinned: { type: Boolean, default: false },
    tags: {
      label: { type: String, required: true },
      color: { type: String, default: "blue" },
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const Note = model("Note", noteSchema);



app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to note app!");
});

export default app;
