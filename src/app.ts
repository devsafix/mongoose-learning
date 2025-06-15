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

app.post("/notes/create-note", async (req: Request, res: Response) => {
  const noteData = req.body;
  try {
    const note = await Note.create(noteData);
    res.status(201).json({
      success: true,
      message: "Note created successfully",
      note,
    });
  } catch (error) {
    res.status(500).json({ message: "Error creating note", error });
  }
});

app.get("/notes", async (req: Request, res: Response) => {
  try {
    const note = await Note.find({});
    res.status(201).json({
      success: true,
      message: "Notes fetched successfully",
      notes: note,
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching note", error });
  }
});

app.get("/notes/:noteId", async (req: Request, res: Response) => {
  const noteId = req.params.noteId;
  try {
    const note = await Note.findById(noteId);
    // const note = await Note.findOne({ _id: noteId });
    res.status(201).json({
      success: true,
      message: "Single Notes fetched successfully",
      note: note,
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching note", error });
  }
});

app.patch("/notes/update/:noteId", async (req: Request, res: Response) => {
  const updatedNoteData = req.body;
  const noteId = req.params.noteId;
  try {
    const note = await Note.findByIdAndUpdate(noteId, updatedNoteData, {
      new: true,
    });
    res.status(201).json({
      success: true,
      message: "Single Note updated successfully",
      note: note,
    });
  } catch (error) {
    res.status(500).json({ message: "Error updating note", error });
  }
});



app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to note app!");
});

export default app;
