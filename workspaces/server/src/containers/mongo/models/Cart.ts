import type { ICart } from "../../../domain";

import { Schema, model } from "mongoose";
import { productSchema } from "./Product";
import { userSchema } from "./User";

const cartSchema = new Schema<ICart>(
  {
    user: userSchema,
    products: [productSchema],
    createdAt: { type: Date, required: false },
    updatedAt: { type: Date, required: false },
  },
  { versionKey: false }
)
  .pre("save", function (next) {
    this.createdAt = new Date();
    this.updatedAt = new Date();
    next();
  })
  .pre("updateOne", function (next) {
    this.updatedAt = new Date();
    next();
  });

export default model<ICart>("Cart", cartSchema);
