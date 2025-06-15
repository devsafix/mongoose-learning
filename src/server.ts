import mongoose from "mongoose";
import { Server } from "http";
import app from "./app";

let server: Server;

const PORT = process.env.PORT || 3000;

async function main() {
  try {
    await mongoose.connect(
      "mongodb+srv://devsafix:practiiceDatabase@devsafix.4pkvz.mongodb.net/advance-note-app?retryWrites=true&w=majority&appName=devsafix"
    );
    console.log("Connected to MongoDB Using Mongoose!!");
    server = app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
}

main();
