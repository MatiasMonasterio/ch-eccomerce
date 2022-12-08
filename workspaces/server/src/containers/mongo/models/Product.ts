import type { IProduct } from "../../../domain";
import { Schema, model } from "mongoose";

export const productSchema = new Schema<IProduct>(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    code: { type: Number, required: true },
    image: { type: String, required: true },
    price: { type: Number, required: true },
    stock: { type: Number, required: true },
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

export default model<IProduct>("Product", productSchema);
