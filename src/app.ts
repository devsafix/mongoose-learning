import express, { Application, Request, Response } from "express";
import { Note } from "./app/models/notes.model";
import { notesRouter } from "./app/controllers/notes.controller";

const app: Application = express();
app.use(express.json());

//  Importing router
app.use("/notes", notesRouter);

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to note app!");
});

export default app;
