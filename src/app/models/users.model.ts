import bcrypt from "bcryptjs";
import { Model, model, Schema } from "mongoose";
import {
  IAddress,
  IUser,
  UserInstanceMethods,
  UserStaticMethods,
} from "../interfaces/user.interface";
import { Note } from "./notes.model";

const addressSchema = new Schema<IAddress>(
  {
    street: { type: String, required: true, trim: true },
    city: { type: String, required: true, trim: true },
    zip: { type: Number, required: true },
  },
  {
    _id: false,
  }
);

const userSchema = new Schema<
  IUser,
  Model<IUser>,
  UserInstanceMethods,
  UserStaticMethods
>(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
      minlength: [5, `Last name must be at least 5 characters`],
      maxlength: 10,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
      minlength: [5, `Last name must be at least 5 characters`],
      maxlength: 10,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      trim: true,
      lowercase: true,
      validate: {
        validator: function (v: string) {
          return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(v);
        },
        message: (props: { value: string }) =>
          `${props.value} is not a valid email!`,
      },
    },
    role: {
      type: String,
      uppercase: true,
      enum: {
        values: ["USER", "ADMIN"],
        message: "{VALUE} is not a valid role",
      },
      default: "USER",
    },
    age: { type: Number, required: true, min: 18, max: 60 },
    password: { type: String, required: true, trim: true },
    address: {
      type: addressSchema,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

userSchema.method("hashPassword", async function (normalPassword: string) {
  const password = await bcrypt.hash(normalPassword, 10);
  return password;
});

userSchema.static("hashPassword", async function (normalPassword: string) {
  const password = await bcrypt.hash(normalPassword, 10);
  return password;
});

userSchema.pre("save", async function (next) {
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.post("save", function (doc, next) {
  console.log("User created successfully:", doc);
  next();
});

userSchema.post("findOneAndDelete", async function (doc, next) {
  if (doc) {
    await Note.deleteMany({ user: doc._id });
    console.log("All notes associated with the user have been deleted.");
  }
  next();
});

userSchema.virtual("fullName").get(function (this: IUser) {
  return `${this.firstName} ${this.lastName}`;
});

export const User = model<IUser, UserStaticMethods>("User", userSchema);
