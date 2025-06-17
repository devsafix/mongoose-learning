import express from "express";
import type { Request, Response } from "express";
import { User } from "../models/users.model";
import { z } from "zod";

export const usersRouter = express.Router();

const createUserZodSchema = z.object({
  firstName: z
    .string()
    .min(5, "First name must be at least 5 characters")
    .max(10, "First name must be at most 10 characters")
    .trim(),
  lastName: z
    .string()
    .min(5, "Last name must be at least 5 characters")
    .max(10, "Last name must be at most 10 characters")
    .trim(),
  email: z
    .string()
    .email("Invalid email address")
    .regex(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "Invalid email format"
    )
    .trim()
    .toLowerCase(),
  role: z
    .enum(["USER", "ADMIN"])
    .default("USER")
    .transform((val) => val.toUpperCase()), // since mongoose stores it uppercase
  age: z
    .number({
      required_error: "Age is required",
      invalid_type_error: "Age must be a number",
    })
    .min(18, "Age must be at least 18")
    .max(60, "Age must be at most 60"),
  password: z.string().min(1, "Password is required").trim(),
});

usersRouter.post("/create-user", async (req: Request, res: Response) => {
  const userData = await createUserZodSchema.parseAsync(req.body);
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
