import mongoose from "mongoose";
import mongoConfig from "../../config/mongo";

import { Cart, Product } from "./models";

export default class MongoContainer {
  cart = Cart;
  product = Product;

  constructor() {
    this.connect();
  }

  private async connect() {
    try {
      await mongoose.connect(mongoConfig.uri);
      console.log("MongoDB connection successful");
    } catch (error) {
      throw new Error(`MongoDB connection error ${error}`);
    }
  }

  async disconnect() {
    mongoose.disconnect();
  }
}
