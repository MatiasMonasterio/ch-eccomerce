import type { IUser } from "../../../domain";

import { Schema, model } from "mongoose";
import { bcrypt } from "../../../utilities";

export const userSchema = new Schema<IUser>(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    name: { type: String, required: false },
    address: { type: String, required: false },
    age: { type: Number, required: false },
    phone: { type: String, required: false },
    image: { type: String, required: false },
    createdAt: { type: Date, required: false },
    updatedAt: { type: Date, required: false },
  },
  { versionKey: false }
)
  .pre("save", async function (next) {
    this.password = await bcrypt.hash(this.password);
    this.createdAt = new Date();
    this.updatedAt = new Date();
    next();
  })
  .pre("updateOne", function (next) {
    this.updatedAt = new Date();
    next();
  });

userSchema.methods.isValidPassword = async function (password: string) {
  return await bcrypt.compare(password, this.password);
};

export default model<IUser>("User", userSchema);
