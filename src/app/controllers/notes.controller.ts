import express from "express";
import { Note } from "../models/notes.model";
import type { Request, Response } from "express";

export const notesRouter = express.Router();

notesRouter.post("/create-note", async (req: Request, res: Response) => {
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

notesRouter.get("/", async (req: Request, res: Response) => {
  try {
    const notes = await Note.find({}).populate("user");
    res.status(200).json({
      success: true,
      message: "Notes fetched successfully",
      notes: notes,
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching note", error });
  }
});

notesRouter.get("/:noteId", async (req: Request, res: Response) => {
  const noteId = req.params.noteId;
  try {
    const note = await Note.findById(noteId);
    // const note = await Note.findOne({ _id: noteId });
    res.status(200).json({
      success: true,
      message: "Single note fetched successfully",
      note,
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching note", error });
  }
});

notesRouter.patch("/update/:noteId", async (req: Request, res: Response) => {
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

notesRouter.delete("/delete/:noteId", async (req: Request, res: Response) => {
  const noteId = req.params.noteId;
  try {
    const note = await Note.findByIdAndDelete(noteId);
    res.status(201).json({
      success: true,
      message: "Note Deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ message: "Error deleting note", error });
  }
});
