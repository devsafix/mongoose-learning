import express, { Application, Request, Response } from "express";
import { notesRouter } from "./app/controllers/notes.controller";
import { usersRouter } from "./app/controllers/users.controller";

const app: Application = express();
app.use(express.json());

//  Importing router
app.use("/notes", notesRouter);
app.use("/users", usersRouter);

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to note app!");
});

export default app;
