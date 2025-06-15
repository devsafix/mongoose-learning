import express from "express";
import type { Request, Response } from "express";
import { User } from "../models/users.model";

export const usersRouter = express.Router();

usersRouter.post("/create-user", async (req: Request, res: Response) => {
  const userData = req.body;
  try {
    const user = await User.create(userData);
    res.status(201).json({
      success: true,
      message: "user created successfully",
      user,
    });
  } catch (error) {
    res.status(500).json({ message: "Error creating user", error });
  }
});

usersRouter.get("/", async (req: Request, res: Response) => {
  try {
    const users = await User.find({});
    res.status(200).json({
      success: true,
      message: "users fetched successfully",
      users: users,
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching user", error });
  }
});

usersRouter.get("/:userId", async (req: Request, res: Response) => {
  const userId = req.params.userId;
  try {
    const user = await User.findById(userId);
    // const user = await user.findOne({ _id: userId });
    res.status(200).json({
      success: true,
      message: "Single user fetched successfully",
      user,
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching user", error });
  }
});

usersRouter.patch("/update/:userId", async (req: Request, res: Response) => {
  const updatedUserData = req.body;
  const userId = req.params.userId;
  try {
    const user = await User.findByIdAndUpdate(userId, updatedUserData, {
      new: true,
    });
    res.status(201).json({
      success: true,
      message: "Single user updated successfully",
      user: user,
    });
  } catch (error) {
    res.status(500).json({ message: "Error updating user", error });
  }
});

usersRouter.delete("/delete/:userId", async (req: Request, res: Response) => {
  const userId = req.params.userId;
  try {
    const user = await User.findByIdAndDelete(userId);
    res.status(201).json({
      success: true,
      message: "user Deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ message: "Error deleting user", error });
  }
});
